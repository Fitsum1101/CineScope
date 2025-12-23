// routes/userRoutes.js
const router = require("express").Router();
const userController = require("../controllers/userController");
const authenticate = require("../../../middleware/authMiddleware");
const authorize = require("../../../middleware/authorize");
const validate = require("../../../middleware/validatorMiddleware");
const userValidation = require("../validations/userValidation");

router
  .route("/role/:roleId")
  .get(
    authenticate,
    authorize(["admin"]),
    validate(userValidation.roleIdParam),
    userController.getUsersByRole
  );

router
  .route("/:id")
  .get(
    authorize(["admin", "user"]),
    validate(userValidation.userIdParam),
    userController.getUser
  )
  .put(
    authorize(["admin", "user"], { requireAll: false }),
    validate(userValidation.userIdParam),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    authorize(["admin", "user"]),
    validate(userValidation.userIdParam),
    userController.deleteUser
  );

router
  .route("/:id/deactivate")
  .patch(
    authorize(["admin"]),
    validate(userValidation.userIdParam),
    userController.deactivateUser
  );

router
  .route("/:id/reactivate")
  .patch(
    authorize(["admin"]),
    validate(userValidation.userIdParam),
    userController.reactivateUser
  );

// router
//   .route("/:id/permissions/:permissionId")
//   .post(
//     authorize(["user_update"]),
//     validate(userValidation.userIdParam),
//     userController.addCustomPermission
//   )
//   .delete(
//     authorize(["user_update"]),
//     validate(userValidation.userIdParam),
//     userController.removeCustomPermission
//   );

router
  .route("/check-username/:username")
  .get(authorize(["admin"]), userController.checkUsernameExists);

module.exports = router;
