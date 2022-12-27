const express = require("express");
const app = express();
const { errorHandlerController } = require("./Controller/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./Routes/authentication");
const teamRouter = require("./Routes/team");
const userRouter = require("./Routes/user");
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/profile", teamRouter);

app.use("/api/user", userRouter);

app.use(errorHandlerController);

module.exports = app;
