const authRouter = require("./Routes/authentication");
const profileRouter = require("./Routes/profile");
const userRouter = require("./Routes/user");
const serviceProductRouter = require("./Routes/service_product");
const taskRouter = require("./Routes/task");
const noteRouter = require("./Routes/note");
const reportRouter = require("./Routes/report");
const mainRouter = require("express").Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/profile", profileRouter);
mainRouter.use("/api/user", userRouter);
mainRouter.use("/api/service", serviceProductRouter);
mainRouter.use("/api/task", taskRouter);
mainRouter.use("/api/note", noteRouter);
mainRouter.use("/api/reports", reportRouter);

module.exports = mainRouter;
