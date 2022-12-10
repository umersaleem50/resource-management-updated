const express = require("express");
const { login, signUp, protected } = require("../Controller/authController");

const authRouter = new express.Router();

authRouter.get("/login", login);
authRouter.post("/signup", signUp);

module.exports = authRouter;
