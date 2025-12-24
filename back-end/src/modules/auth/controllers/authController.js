const ApiResponse = require("../../../utils/apiResponse");
const catchAsync = require("../../../utils/catchAsync");
const ApiError = require("../../../utils/apiError");
const authService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");

/**
 * Login user with username and password
 */
const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const { accessToken, refreshToken, user } = await authService.login(
    username,
    password
  );

  // Set HTTP-only refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Return both tokens in response
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { accessToken, refreshToken, user },
        "Login successful"
      )
    );
});

/**
 * Register a new user
 */

const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(StatusCodes.CREATED, user, "User registered successfully")
    );
});

/**
 * Logout user (blacklist refresh token)
 */
const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) await authService.blacklistRefreshToken(refreshToken);

  res.clearCookie("refreshToken");

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, null, "Logout successful"));
});

/**
 * Refresh JWT tokens using refresh token
 */
const refreshTokens = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token is required");

  const {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user,
  } = await authService.refreshTokens(refreshToken);

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { accessToken: newAccessToken, user },
        "Tokens refreshed successfully"
      )
    );
});

/**
 * Forgot password
 */
const forgotPassword = catchAsync(async (req, res) => {
  const { username } = req.body;
  const resetToken = await authService.forgotPassword(username);

  if (process.env.NODE_ENV === "production") {
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          null,
          "Password reset instructions sent to your email"
        )
      );
  } else {
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          { resetToken },
          "Password reset token generated"
        )
      );
  }
});

/**
 * Reset password
 */
const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Password must be at least 6 characters long"
    );
  }

  const { accessToken, refreshToken, user } = await authService.resetPassword(
    token,
    password
  );

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { accessToken, user },
        "Password reset successful"
      )
    );
});

/**
 * Change password (while logged in)
 */
const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!newPassword || newPassword.length < 6) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "New password must be at least 6 characters long"
    );
  }

  const { accessToken, refreshToken, user } = await authService.updatePassword(
    userId,
    currentPassword,
    newPassword
  );

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { accessToken, user },
        "Password changed successfully"
      )
    );
});

/**
 * Verify JWT access token
 */
const verifyToken = catchAsync(async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, "No token provided");

  const user = await authService.verifyToken(token);
  if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, { user }, "Token is valid"));
});

/**
 * Verify password reset token
 */
const verifyResetToken = catchAsync(async (req, res) => {
  const { token } = req.body;
  if (!token)
    throw new ApiError(StatusCodes.BAD_REQUEST, "Reset token is required");

  const user = await authService.verifyResetToken(token);
  if (!user)
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Invalid or expired reset token"
    );

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, { user }, "Reset token is valid"));
});

module.exports = {
  login,
  register,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyToken,
  verifyResetToken,
};
