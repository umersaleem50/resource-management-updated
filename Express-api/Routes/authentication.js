const express = require("express");
const authorization = require("../Controller/authController");
const profileController = require("../Controller/profileController");
const authRouter = new express.Router();

authRouter.post("/login", authorization.login);
authRouter.post("/signup", authorization.signup);

authRouter.post("/forget-password", authorization.forgetPassword);
authRouter.post("/reset-password/:token", authorization.resetPassword);

// PROTECTED ROUTES, ONLY WORKS IF THE USER IS LOGGED-IN
authRouter.use(authorization.protectedRoute);

authRouter.post("/sub-account", profileController.createSubAccounts);
authRouter
  .post(
    "/update-password",
    authorization.protectedRoute,
    profileController.checkIfHavePermission("update-account"),
    authorization.updatePassword
  )
  // UPDATE THE PASSWORD OF SUB ACCOUNT, ONLY WORKS IF THE :ID IS A TEAM MEMBER OF LOGGED-IN USER
  .post(
    "/update-password/:id",
    profileController.checkIfPartOfTeam,
    authorization.updatePassword
  );

module.exports = authRouter;
