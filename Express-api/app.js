const express = require("express");
const app = express();
const { errorHandlerController } = require("./Controller/errorHandler");
const cookieParser = require("cookie-parser");
const mainRouter = require("./mainRouter");
// const authRouter = require("./Routes/authentication");
// const teamRouter = require("./Routes/profile");
// const userRouter = require("./Routes/user");
// const service_product_router = require("./Routes/service_product");
app.use(express.json());
app.use(cookieParser());

app.use(mainRouter);

// app.use("/api/auth", authRouter);
// app.use("/api/profile", teamRouter);

// app.use("/api/user", userRouter);
// app.use("/api/service", service_product_router);

app.use(errorHandlerController);

module.exports = app;
