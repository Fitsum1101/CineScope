const { prisma } = require("../../../config/db");
const ApiError = require("../../../utils/apiError");

/**
 * Get all users with optional filters
 */
const getUsers = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    pagination = true,
    search,
    isActive = true,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 10;
  const parsedPagination = pagination === "false" ? false : Boolean(pagination);

  const where = {
    isActive:
      isActive === "false" ? false : isActive === "true" ? true : isActive,
    ...(search
      ? {
          OR: [
            { username: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const orderBy = {};
  orderBy[sortBy] = sortOrder === "desc" ? "desc" : "asc";

  if (parsedPagination) {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
        orderBy,
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / parsedLimit);
    return {
      users,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        totalPages,
        hasNext: parsedPage < totalPages,
        hasPrev: parsedPage > 1,
      },
    };
  } else {
    return await prisma.user.findMany({
      where,
      orderBy,
    });
  }
};

/**
 * Get a user by ID
 */
const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      role: { include: { permissions: true } },
      customPermissions: true,
      employee: {
        select: {
          fullName: true,
          employeeID: true,
          department: true,
          position: true,
          employmentStatus: true,
        },
      },
    },
  });
  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
  return user;
};

/**
 * Get a user by username
 */
const getUserByUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: { username: username.toLowerCase(), isActive: true },
  });
  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
  return user;
};

/**
 * Update a user by ID
 */
const updateUser = async (id, updateData) => {
  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
  return user;
};

/**
 * Soft delete a user
 */
const deleteUser = async (id) => {
  const user = await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
  return user;
};

/**
 * Utility methods
 */
const usernameExists = async (username) => {
  const user = await prisma.user.findFirst({
    where: { username: username.toLowerCase() },
  });
  return !!user;
};

/**
 * Password reset methods
 */

const createPasswordResetToken = async (userId) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordResetToken: hashedToken,
      passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    },
  });

  return resetToken;
};

const clearPasswordResetToken = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { passwordResetToken: null, passwordResetExpires: null },
  });
};

/**
 * Login attempts
 */
const incrementLoginAttempts = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { loginAttempts: { increment: 1 } },
  });
};

const resetLoginAttempts = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { loginAttempts: 0 },
  });
};

//  user growth per month

const userGrowthPerMonth = async (year) => {
  const growthData = await prisma.user.groupBy({
    by: ["createdAt"],
    where: {
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      },
    },
    _count: {
      id: true,
    },
  });

  const monthlyGrowth = Array(12).fill(0);

  growthData.forEach((data) => {
    const month = data.createdAt.getMonth();
    monthlyGrowth[month] += data._count.id;
  });

  return monthlyGrowth;
};

/**
 * Password change verification
 */
const changedPasswordAfter = async (userId, JWTTimestamp) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
  return (
    user.passwordChangedAt &&
    user.passwordChangedAt.getTime() / 1000 > JWTTimestamp
  );
};

module.exports = {
  getUsers,
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  usernameExists,
  createPasswordResetToken,
  clearPasswordResetToken,
  incrementLoginAttempts,
  resetLoginAttempts,
  changedPasswordAfter,
  userGrowthPerMonth,
};
