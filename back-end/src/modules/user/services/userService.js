const { prisma } = require("../../../config/db");
const ApiError = require("../../../utils/apiError");

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

/**
 * Get all users with optional filters
 */
const getUsers = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    pagination = true,
    search,
    department,
    position,
    employmentStatus,
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
    ...(department
      ? {
          employee: {
            department: { contains: department, mode: "insensitive" },
          },
        }
      : {}),
    ...(position
      ? { employee: { position: { contains: position, mode: "insensitive" } } }
      : {}),
    ...(employmentStatus ? { employee: { employmentStatus } } : {}),
    ...(search
      ? {
          OR: [
            { username: { contains: search, mode: "insensitive" } },
            {
              employee: { fullName: { contains: search, mode: "insensitive" } },
            },
            {
              employee: {
                employeeID: { contains: search, mode: "insensitive" },
              },
            },
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
 * Authenticate user by username and password
 */
const authenticateUser = async (username, password) => {
  const user = await getUserByUsername(username);

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    await prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: { increment: 1 } },
    });
    throw new ApiError(status.FORBIDDEN, "Incorrect username or password");
  }

  // Reset login attempts
  await prisma.user.update({
    where: { id: user.id },
    data: { loginAttempts: 0, lastLogin: new Date() },
  });

  // Generate tokens
  const tokens = generateTokens({
    id: user.id,
    username: user.username,
    role: user.role,
    permissions: user.customPermissions,
  });

  return { user, tokens };
};

/**
 * Update a user by ID
 */
const updateUser = async (id, updateData) => {
  const user = await prisma.user.update({
    where: { id },
    data: updateData,
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
 * Soft delete a user
 */
const deleteUser = async (id) => {
  const user = await prisma.user.update({
    where: { id },
    data: { isActive: false },
    include: { role: true, customPermissions: true },
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

const getUsersByRole = async (roleId) => {
  return await prisma.user.findMany({
    where: { roleId },
    include: { role: true, customPermissions: true },
  });
};

const userHasPermission = async (userId, permissionName) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: { include: { permissions: true } },
      customPermissions: true,
    },
  });
  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");

  const allPermissions = [
    ...(user.role?.permissions?.map((p) => p.name) || []),
    ...(user.customPermissions?.map((p) => p.name) || []),
  ];

  return allPermissions.includes(permissionName);
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
  createUser,
  getUsers,
  getUser,
  getUserByUsername,
  authenticateUser,
  updateUser,
  deleteUser,
  usernameExists,
  getUsersByRole,
  userHasPermission,
  createPasswordResetToken,
  clearPasswordResetToken,
  incrementLoginAttempts,
  resetLoginAttempts,
  changedPasswordAfter,
};
