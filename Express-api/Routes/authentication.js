const express = require("express");
const {
  login,
  signUp,
  protected,
  //   updatePassword,
} = require("../Controller/authController");

const authRouter = new express.Router();

authRouter.post("/login", login);
authRouter.post("/signup/:mainId", signUp);
// authRouter.post("/update-password", updatePassword);

module.exports = authRouter;
