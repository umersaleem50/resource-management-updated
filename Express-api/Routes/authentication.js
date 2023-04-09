const express = require("express");
const authController = require("../Controller/authController");
const profileController = require("../Controller/profileController");
const authRouter = new express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);

authRouter.post("/forget-password", authController.forgetPassword);
authRouter.post("/reset-password/:token", authController.resetPassword);

// PROTECTED ROUTES, ONLY WORKS IF THE USER IS LOGGED-IN
authRouter.use(authController.protectedRoute);

authRouter.post("/sub-account", profileController.createSubAccounts);

authRouter.use(authController.protectedRoute);
authRouter
  .post(
    "/update-password",
    profileController.checkIfHavePermission("update-account"),
    authController.updatePassword
  )
  // UPDATE THE PASSWORD OF SUB ACCOUNT, ONLY WORKS IF THE :ID IS A TEAM MEMBER OF LOGGED-IN USER
  .post(
    "/update-password/:id",
    profileController.checkIfPartOfTeam,
    authController.updatePassword
  );

authRouter
  .post("/deactivate", authController.deactiveAccount)
  .post(
    "/deactivate/:id",
    profileController.checkIfPartOfTeam,
    authController.deactiveAccount
  );

module.exports = authRouter;
