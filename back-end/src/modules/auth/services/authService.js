// src/modules/auth/services/authService.js
const { prisma } = require("../../../config/db");
const ApiError = require("../../../utils/apiError");
const { status } = require("http-status");

const {
  generateTokens,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../../../utils/jwtToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { password } = require("../../../utils/customJoi");

// In-memory blacklist for refresh tokens (replace with Redis/DB in production)
const blacklistedRefreshTokens = new Set();

/**
 * Helper: Check password match
 */
const isPasswordMatch = async (user, password) => {
  return await bcrypt.compare(password, user.passwordHash);
};

/**
 * Helper: Increment login attempts
 */
const incrementLoginAttempts = async (user) => {
  const maxAttempts = 5;
  let updates = { loginAttempts: { increment: 1 } };
  if ((user.loginAttempts || 0) + 1 >= maxAttempts) {
    updates.lockUntil = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  }
  await prisma.user.update({
    where: { id: user.id },
    data: updates,
  });
};

/**
 * Helper: Reset login attempts
 */
const resetLoginAttempts = async (user) => {
  await prisma.user.update({
    where: { id: user.id },
    data: { loginAttempts: 0, lockUntil: null },
  });
};

/**
 * Helper: Create password reset token
 */
const createPasswordResetToken = async (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordResetToken: hashedToken, passwordResetExpires: expires },
  });

  return resetToken;
};

/**
 * Helper: Check if password changed after JWT issued
 */
const changedPasswordAfter = (user, JWTTimestamp) => {
  if (!user.passwordChangedAt) return false;
  const changedTimestamp = parseInt(
    user.passwordChangedAt.getTime() / 1000,
    10
  );
  return JWTTimestamp < changedTimestamp;
};

/**
 * Login user
 */
const login = async (username, password) => {
  if (!username || !password) {
    throw new ApiError(
      status.BAD_REQUEST,
      "Please provide username and password"
    );
  }

  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
    omit: {
      createdAt: true,
      updatedAt: true,
      passwordResetToken: true,
      passwordResetExpires: true,
      lockUntil: true,
      loginAttempts: true,
    },
  });

  if (!user || !user.isActive)
    throw new ApiError(status.FORBIDDEN, "Incorrect username or password");

  // if (user.lockUntil && new Date() < user.lockUntil) {
  //   throw new ApiError(status.FORBIDDEN, "Account is locked");
  // }

  const match = await isPasswordMatch(user, password);

  if (!match) {
    await incrementLoginAttempts(user);
    throw new ApiError(status.FORBIDDEN, "Incorrect username or password");
  }

  // await resetLoginAttempts(user);
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  // Merge role + custom permissions

  const { accessToken, refreshToken } = generateTokens(user);

  return {
    accessToken,
    refreshToken,
    user: { ...user, password: undefined },
  };
};

/**
 * Register user
 */
const register = async (userData) => {
  const existingUser = await prisma.user.findUnique({
    where: { username: userData.username.toLowerCase() },
  });
  if (existingUser)
    throw new ApiError(status.CONFLICT, "Username already exists");
  const existingEmail = await prisma.user.findUnique({
    where: { email: userData.email.toLowerCase() },
  });
  if (existingEmail)
    throw new ApiError(status.CONFLICT, "Email already exists");

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  return await prisma.user.create({
    data: {
      email: userData.email,
      username: userData.username.toLowerCase(),
      passwordHash: hashedPassword,
    },
  });
};

/**
 * Forgot password
 */
const forgotPassword = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase(), isActive: true },
  });
  if (!user)
    return { message: "If the username exists, a reset link has been sent" };
  return await createPasswordResetToken(user);
};

/**
 * Reset password
 */
const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { gt: new Date() },
    },
  });

  if (!user)
    throw new ApiError(status.BAD_REQUEST, "Token is invalid or has expired");

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
  });

  const rolePermissions =
    user.role?.permissions?.map((p) => p.permission) || [];
  const customPermissions = user.customPermissions || [];
  const permissions = [...new Set([...rolePermissions, ...customPermissions])];

  const { accessToken, refreshToken } = generateTokens(user);

  return {
    accessToken,
    refreshToken,
    user: { ...user, password: undefined, permissions },
  };
};

/**
 * Update password while logged in
 */
const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");

  const match = await isPasswordMatch(user, currentPassword);
  if (!match)
    throw new ApiError(status.BAD_REQUEST, "Your current password is wrong");

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });

  const { accessToken, refreshToken } = generateTokens(user);
  return {
    accessToken,
    refreshToken,
    user: { ...user },
  };
};

/**
 * Refresh access token
 */
const refreshTokens = async (refreshToken) => {
  if (!refreshToken)
    throw new ApiError(status.UNAUTHORIZED, "Refresh token is required");
  if (blacklistedRefreshTokens.has(refreshToken))
    throw new ApiError(status.UNAUTHORIZED, "Refresh token is blacklisted");

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(status.UNAUTHORIZED, "Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: {
      role: { include: { permissions: { include: { permission: true } } } },
      customPermissions: true,
      employee: true,
    },
  });
  if (!user || !user.isActive)
    throw new ApiError(status.UNAUTHORIZED, "Invalid refresh token");

  const rolePermissions =
    user.role?.permissions?.map((p) => p.permission) || [];
  const customPermissions = user.customPermissions || [];
  const permissions = [...new Set([...rolePermissions, ...customPermissions])];

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generateTokens(user);
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: { ...user, permissions },
  };
};

/**
 * Blacklist refresh token (logout)
 */

const blacklistToken = async (refreshToken) => {
  blacklistedRefreshTokens.add(refreshToken);
};

/**
 * Verify access token
 */
const verifyToken = async (token) => {
  try {
    const decoded = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user || !user.isActive || changedPasswordAfter(user, decoded.iat))
      return null;
    return user;
  } catch {
    return null;
  }
};

/**
 * Verify password reset token
 */
const verifyResetToken = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { gt: new Date() },
    },
  });
  return user || null;
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  updatePassword,
  refreshTokens,
  blacklistRefreshToken: blacklistToken,
  verifyToken,
  verifyResetToken,
};
