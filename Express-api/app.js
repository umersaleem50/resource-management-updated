const express = require("express");
const app = express();
const { errorHandlerController } = require("./Controller/errorHandler");

const authRouter = require("./Routes/authentication");

app.use(express.json());

app.use("/auth", authRouter);

app.use(errorHandlerController);

module.exports = app;
