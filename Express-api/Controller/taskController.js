const { ApiError } = require("next/dist/server/api-utils");

// const { socket } = require("../../server");
const { Task, Tasks } = require("../Models/task");
const apiError = require("../Util/apiError");
const catchAsync = require("../Util/catchAsync");
const { getOne, updateOne, deleteOne, getAll } = require("./handlerFactory");

exports.getOneTask = getOne(Tasks, "tasks");
exports.updateOneTask = updateOne(Task);

exports.reassignTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await Tasks.findById(taskId).populate("tasks");
  if (!task) return next(new apiError("No task found with this id.", 404));
  if (task && task.status === "complete") {
    return next(
      new apiError("Task is already completed, Please assign new task.")
    );
  }
  const singleTask = await Task.create({ ...req.body });
  task.tasks.unshift(singleTask);
  await task.save();

  res.status(201).json({ status: "success", data: task });
});

exports.deleteOneTask = deleteOne(Task);

exports.getAllTask = catchAsync(async (req, res, next) => {
  const userId = req.user && req.user.id;
  if (!userId)
    return next(new apiError(400, "Please provide id of the account."));

  const tasks = await Tasks.find({ assignTo: userId })
    // .populate({
    //   path: "assignBy",
    //   select: "profilePicture firstName lastName",
    // });
    .populate("tasks")
    .populate({
      path: "assignBy",
      select: "profilePicture firstName lastName",
    });

  res
    .status(200)
    .json({ status: "success", results: tasks.length, data: tasks });
});

// exports.getAllTask = getAll(Task);

exports.createOneTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const adminId = req.user && req.user.id;
  const adminTeam = req.user && req.user.team;

  if (!adminId || !adminTeam.includes(id)) {
    return next(new ApiError(400, "You can't assign task to this member."));
  }

  const singleTask = await Task.create({
    ...req.body,
  });

  const givenTask = await Tasks.create({
    assignTo: id,
    assignBy: adminId,
  });

  if (givenTask) {
    givenTask.tasks.push(singleTask);
    await givenTask.save();
  }

  res.status(201).json({ status: "success", data: givenTask });
});

exports.getTaskStats = catchAsync(async (req, res, next) => {
  const stats = await Tasks.aggregate([
    {
      $match: { assignTo: req.user._id, status: "incomplete" },
    },
    {
      $group: {
        _id: { status: "$status" },
        total: { $sum: 1 },
        // tasks: "$tasks",
      },
    },
  ]);
  res.status(200).json({ message: "success", data: stats });
});
