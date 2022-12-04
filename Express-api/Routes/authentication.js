const express = require("express");
const { login, signUp } = require("../Controller/authController");

const authRouter = new express.Router();

authRouter.get("/", login);
authRouter.post("/signup", signUp);

module.exports = authRouter;
