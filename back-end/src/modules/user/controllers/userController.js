// userController code
const ApiResponse = require("../../../utils/apiResponse");
const catchAsync = require("../../../utils/catchAsync");
const ApiError = require("../../../utils/apiError");
const userService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(StatusCodes.CREATED, user, "User created successfully")
    );
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.query);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, users, "Users retrieved successfully")
    );
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUser(req.params.id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, user, "User retrieved successfully"));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, user, "User updated successfully"));
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, null, "User deleted successfully"));
});

// Additional User Controllers

const getUsersByRole = catchAsync(async (req, res) => {
  const { roleId } = req.params;
  const users = await userService.getUsersByRole(roleId);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        users,
        "Users by role retrieved successfully"
      )
    );
});

const checkUsernameExists = catchAsync(async (req, res) => {
  const { username } = req.params;
  const exists = await userService.usernameExists(username);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, { exists }, "Username check completed")
    );
});

const checkUserPermission = catchAsync(async (req, res) => {
  const { userId, permissionName } = req.params;
  const hasPermission = await userService.userHasPermission(
    userId,
    permissionName
  );
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        { hasPermission },
        "Permission check completed"
      )
    );
});

// Deactivate user
const deactivateUser = catchAsync(async (req, res) => {
  const user = await userService.deactivateUser(req.params.id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, user, "User deactivated successfully")
    );
});

// Reactivate user
const reactivateUser = catchAsync(async (req, res) => {
  const user = await userService.reactivateUser(req.params.id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, user, "User reactivated successfully")
    );
});

// Add custom permission
const addCustomPermission = catchAsync(async (req, res) => {
  const { id, permissionId } = req.params;
  const user = await userService.addCustomPermission(id, permissionId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        user,
        "Custom permission added successfully"
      )
    );
});

// Remove custom permission
const removeCustomPermission = catchAsync(async (req, res) => {
  const { id, permissionId } = req.params;
  const user = await userService.removeCustomPermission(id, permissionId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        user,
        "Custom permission removed successfully"
      )
    );
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersByRole,
  checkUsernameExists,
  checkUserPermission,
  deactivateUser,
  reactivateUser,
  addCustomPermission,
  removeCustomPermission,
};
