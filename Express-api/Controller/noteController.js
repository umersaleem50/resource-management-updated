const Note = require("../Models/note");
const apiError = require("../Util/apiError");
const ApiFeature = require("../Util/apiFeature");
const catchAsync = require("../Util/catchAsync");
const {
  createOne,
  deleteOne,
  getOne,
  updateOne,
  getAll,
} = require("./handlerFactory");

exports.createNote = catchAsync(async (req, res, next) => {
  const userId = req.user && req.user.id;
  if (!userId) return next(new apiError("No user found with the id.", 400));
  const note = await Note.create({ ...req.body, member: userId });
  res.status(201).json({ status: "success", data: note });
});
exports.deleteNote = deleteOne(Note);

exports.getOneNote = getOne(Note);
exports.updateOneNote = updateOne(Note);
exports.getAllNotes = catchAsync(async (req, res, next) => {
  const userId = req.user && req.user.id;

  const noteQuery = new ApiFeature(Note.find({ member: userId }), req.query)
    .filter()
    .sort()
    .limit()
    .pagination();
  const notes = await noteQuery.query;
  res
    .status(200)
    .json({ status: "success", data: notes, length: notes.length });
});

// exports.getAllNotes = getAll(Note);