const { status } = require("http-status");
const ApiError = require("../utils/apiError");

/**
 * Permission-Based Access Control middleware factory
 * Creates middleware that authorizes users based on their permissions
 *
 * @param {string[]} requiredPermissions - Array of permissions required to access the route
 * @returns {Function} Express middleware function
 */

const authorize = (requiredPermissions) => {
  return (req, res, next) => {
    try {
      // Check if user exists (should be set by authMiddleware)
      if (!req.user) {
        return next(
          new ApiError(status.UNAUTHORIZED, "Authentication required")
        );
      }

      // Check if user has all required permissions
      const hasAllPermissions = requiredPermissions.includes(req.user.role);

      if (!hasAllPermissions) {
        return next(
          new ApiError(
            status.FORBIDDEN,
            `Access denied. Required permissions: ${requiredPermissions.join(
              ", "
            )}. Your permissions: ${userPermissionNames.join(", ")}`,
            [{ requiredPermissions, userPermissions: userPermissionNames }]
          )
        );
      }

      // User has required permissions
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return next(
        new ApiError(
          status.INTERNAL_SERVER_ERROR,
          "Authorization process failed"
        )
      );
    }
  };
};

module.exports = authorize;
