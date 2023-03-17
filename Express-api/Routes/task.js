const { protectedRoute } = require("../Controller/authController");
const { getAll } = require("../Controller/handlerFactory");
const {
  getAllTask,
  getOneTask,
  createOneTask,
  updateOneTask,
  deleteOneTask,
  reassignTask,
  getTaskStats,
} = require("../Controller/taskController");

const taskRouter = require("express").Router();

taskRouter.use(protectedRoute);

taskRouter.get("/", getAllTask);
taskRouter.get("/get-stats", getTaskStats);
taskRouter.get("/:id", getOneTask);
taskRouter.post("/:id", createOneTask);
taskRouter.patch("/:id", updateOneTask);
taskRouter.delete("/:id", deleteOneTask);
taskRouter.patch("/reassign/:taskId", reassignTask);

module.exports = taskRouter;
