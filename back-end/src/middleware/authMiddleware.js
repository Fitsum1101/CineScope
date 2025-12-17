// middleware/auth.js
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiError");
const { verifyAccessToken } = require("../utils/jwtToken");
const userService = require("../modules/user/services/userService");
const User = require("../modules/user/models/userModel");
/**
 * Extract token from various sources in request
 * @param {Object} req - Express request object
 * @returns {string|null} The extracted token or null if not found
 */
function extractToken(req) {
  return (
    req.cookies?.token ||
    req.headers["authorization"]?.replace("Bearer ", "") ||
    req.headers["x-access-token"] ||
    null
  );
}

/**
 * Authentication middleware.
 * Verifies the JWT token and attaches the user object to the request.
 * Enhanced for permission-based authentication.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<Object>} - Passes control to the next middleware
 */

const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Access denied. No token provided"
        )
      );
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Fetch user data with properly populated permissions
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "User not found"));
    }

    if (!user.isActive) {
      return next(new ApiError(StatusCodes.FORBIDDEN, "Account is disabled"));
    }

    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Password changed. Please login again"
        )
      );
    }

    // Merge role + custom permissions to get full permission objects

    // Attach the user object to the request with permissions
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Token has expired"));
    } else if (err.name === "JsonWebTokenError") {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token"));
    }

    console.error("Authentication error:", err);
    return next(
      new ApiError(StatusCodes.UNAUTHORIZED, "Authentication failed")
    );
  }
};

module.exports = authenticate;
