const express = require("express");
const app = express();

const authRouter = require("./Routes/authentication");

app.use(express.json());

app.use("/auth", authRouter);

module.exports = app;
