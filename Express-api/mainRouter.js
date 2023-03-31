const authRouter = require("./Routes/authentication");
const profileRouter = require("./Routes/profile");
const userRouter = require("./Routes/user");
const serviceProductRouter = require("./Routes/service_product");
const taskRouter = require("./Routes/task");
const noteRouter = require("./Routes/note");
const reportRouter = require("./Routes/report");
const mainRouter = require("express").Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/profile", profileRouter);
// mainRouter.use("/user", userRouter);
mainRouter.use("/service", serviceProductRouter);
mainRouter.use("/task", taskRouter);
mainRouter.use("/note", noteRouter);
mainRouter.use("/reports", reportRouter);

module.exports = mainRouter;
