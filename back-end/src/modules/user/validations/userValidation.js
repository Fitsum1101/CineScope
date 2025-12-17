// userValidation code
const Joi = require("joi");
const { id: uuid, username, password } = require("../../../utils/customJoi");

const createUser = {
  body: Joi.object()
    .keys({
      username: username().required().messages({
        "any.required": "Username is required",
        "string.pattern.base":
          "Username can only contain letters, numbers, and underscores",
      }),
      password: password().required().messages({
        "any.required": "Password is required",
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      }),
      employeeId: uuid.required().messages({
        "any.required": "Employee ID is required",
        "any.invalid": "Valid Employee ID is required",
      }),
      role: uuid.required().messages({
        "any.required": "Role ID is required",
        "any.invalid": "Valid Role ID is required",
      }),
      customPermissions: Joi.array().items(uuid).optional().messages({
        "any.invalid": "Valid Permission IDs are required",
      }),
      isActive: Joi.boolean().optional().default(true),
    })
    .required(),
};

const updateUser = {
  body: Joi.object()
    .keys({
      username: username().optional().messages({
        "string.pattern.base":
          "Username can only contain letters, numbers, and underscores",
      }),
      role: uuid.optional().messages({
        "any.invalid": "Valid Role ID is required",
      }),
      customPermissions: Joi.array().items(uuid).optional().messages({
        "any.invalid": "Valid Permission IDs are required",
      }),
      isActive: Joi.boolean().optional(),
    })
    .min(1)
    .required(),
};

const userIdParam = {
  params: Joi.object()
    .keys({
      id: uuid.required().messages({
        "any.required": "User ID is required",
        "any.invalid": "Valid User ID is required",
      }),
    })
    .required(),
};

const usernameParam = {
  params: Joi.object()
    .keys({
      username: username().required().messages({
        "any.required": "Username is required",
      }),
    })
    .required(),
};

const roleIdParam = {
  params: Joi.object()
    .keys({
      roleId: uuid.required().messages({
        "any.required": "Role ID is required",
        "any.invalid": "Valid Role ID is required",
      }),
    })
    .required(),
};

const addCustomPermission = {
  params: Joi.object()
    .keys({
      id: uuid.required().messages({
        "any.required": "User ID is required",
        "any.invalid": "Valid User ID is required",
      }),
      permissionId: uuid.required().messages({
        "any.required": "Permission ID is required",
        "any.invalid": "Valid Permission ID is required",
      }),
    })
    .required(),
};

const removeCustomPermission = {
  params: Joi.object()
    .keys({
      id: uuid.required().messages({
        "any.required": "User ID is required",
        "any.invalid": "Valid User ID is required",
      }),
      permissionId: uuid.required().messages({
        "any.required": "Permission ID is required",
        "any.invalid": "Valid Permission ID is required",
      }),
    })
    .required(),
};

const deactivateUser = {
  params: Joi.object()
    .keys({
      id: uuid.required().messages({
        "any.required": "User ID is required",
        "any.invalid": "Valid User ID is required",
      }),
    })
    .required(),
};

const reactivateUser = {
  params: Joi.object()
    .keys({
      id: uuid.required().messages({
        "any.required": "User ID is required",
        "any.invalid": "Valid User ID is required",
      }),
    })
    .required(),
};

const getUsers = {
  query: Joi.object()
    .keys({
      page: Joi.number().integer().min(1).optional().default(1),
      limit: Joi.number().integer().min(1).max(100).optional().default(10),
      pagination: Joi.boolean().optional().default(true),
      search: Joi.string().max(50).optional(),
      department: Joi.string().max(50).optional(),
      position: Joi.string().max(50).optional(),
      employmentStatus: Joi.string()
        .valid("Active", "Inactive", "Suspended", "Terminated")
        .optional(),
      role: uuid.optional().messages({
        "any.invalid": "Valid Role ID is required",
      }),
      isActive: Joi.boolean().optional(),
      sortBy: Joi.string()
        .valid(
          "username",
          "createdAt",
          "updatedAt",
          "lastLogin",
          "employeeId.fullName",
          "employeeId.department",
          "employeeId.position"
        )
        .optional()
        .default("createdAt"),
      sortOrder: Joi.string().valid("asc", "desc").optional().default("desc"),
    })
    .optional(),
};

module.exports = {
  createUser,
  updateUser,
  userIdParam,
  usernameParam,
  roleIdParam,
  addCustomPermission,
  removeCustomPermission,
  deactivateUser,
  reactivateUser,
  getUsers,
};
