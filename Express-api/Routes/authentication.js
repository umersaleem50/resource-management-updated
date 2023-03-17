const express = require("express");
const {
  login,
  protectedRoute,
  updatePassword,
  createAccount,
  signup,
  forgetPassword,
  resetPassword,
} = require("../Controller/authController");

const authRouter = new express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/signup/:mainId", createAccount);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.post("/update-password/:mainId", protectedRoute, updatePassword);

module.exports = authRouter;
