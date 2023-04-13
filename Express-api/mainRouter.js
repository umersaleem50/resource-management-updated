const authRouter = require("./Routes/authentication");
const profileRouter = require("./Routes/profile");
const serviceProductRouter = require("./Routes/service_product");
const taskRouter = require("./Routes/task");
const noteRouter = require("./Routes/note");
const reportRouter = require("./Routes/report");
const mainRouter = require("express").Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/profile", profileRouter);
mainRouter.use("/service", serviceProductRouter);
mainRouter.use("/tasks", taskRouter);
mainRouter.use("/notes", noteRouter);
mainRouter.use("/reports", reportRouter);

module.exports = mainRouter;
