const Member = require("../Models/member");
const { Report, Reports } = require("../Models/report");
const { Tasks } = require("../Models/task");
const apiError = require("../Util/apiError");
const catchAsync = require("../Util/catchAsync");
const { deleteOne, updateOne, getOne } = require("./handlerFactory");

exports.createOneReport = catchAsync(async (req, res, next) => {
  const adminId = req.params.id;
  const taskId = req.params.taskId;
  const reportSender = req.user.id;

  const admin = await Member.findById(adminId);

  if (!admin || !admin.team || !admin.team.includes(reportSender)) {
    return next(new apiError(`You can't send the report to this admin.`));
  }

  const mainTask = await Tasks.findOne({ _id: taskId, assignTo: reportSender });

  console.log(mainTask, "reportcontroller.js 26");

  if (!mainTask) {
    return next(new apiError(`You can't send report to this task.`));
  }

  const singleReport = await Report.create({
    ...req.body,
  });

  //CHECK IF THE REPORT IS ALREADY CREATED
  const checkReport = await Reports.findOne({
    reportTo: adminId,
    task: taskId,
  });

  if (checkReport) {
    checkReport.reports.unshift(singleReport.id);
    checkReport.save();
    return res.status(201).json({ status: "success", data: checkReport });
  }

  const mainReport = await Reports.create({
    reportBy: reportSender,
    reportTo: adminId,
    task: taskId,
  });

  if (mainReport) {
    mainReport.reports.push(singleReport);
    await mainReport.save();
  }

  res.status(201).json({ status: "success", data: mainReport });
});
exports.getAllReports = catchAsync(async (req, res, next) => {
  const userId = req.user && req.user.id;
  if (!userId)
    return next(new apiError(400, "Please provide id of the account."));
  //YOU WILL GET THE REPORT SENT TO LOGGED IN ADMIN
  const tasks = await Reports.find({ reportTo: userId })
    // .populate({
    //   path: "assignBy",
    //   select: "profilePicture firstName lastName",
    // });
    .populate("reports")
    .populate({ path: "task", populate: { path: "tasks" } })
    .populate({
      path: "reportBy",
      select: "profilePicture firstName lastName",
    });

  res
    .status(200)
    .json({ status: "success", results: tasks.length, data: tasks });
});
// exports.getOneReport = getOne(Reports, "reports reportBy");

exports.getOneReport = getOne(Reports, [
  { path: "reports" },
  { path: "reportBy", select: "firstName lastName profilePicture" },
]);
exports.deleteOneReport = deleteOne(Reports);
exports.updateOneReport = updateOne(Report);
