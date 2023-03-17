const apiError = require("../Util/apiError");
const ApiFeature = require("../Util/apiFeature");
const catchAsync = require("../Util/catchAsync");

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const body = req.body;
    const doc = await Model.create(body);

    if (!doc) return next(new apiError("No document found with this id!", 404));

    res.status(201).json({ status: "success", data: doc });
  });
};

exports.updateOne = (Model, populateOptions) => {
  return catchAsync(async (req, res, next) => {
    const body = req.body;
    const doc = await Model.findByIdAndUpdate(req.params.id, body, {
      runValidators: true,
      new: true,
    });
    if (populateOptions) {
      await doc.populate(populateOptions);
    }
    if (!doc) return next(new apiError("No document found with this id!", 404));
    res.status(200).json({ status: "success", data: doc });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new apiError("No document found with this id!", 404));
    res.status(204).json({ status: "success", data: null });
  });
};

exports.getOne = (Model, populateOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions && populateOptions.length)
      populateOptions.forEach((el, i) => {
        query.populate(el);
      });
    const doc = await query;
    if (!doc) return next(new apiError("No document found with this id!", 404));
    res.status(200).json({ status: "success", data: doc });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    //    let filter = {};
    //    if(req.params.id) filter = {}
    const feature = new ApiFeature(Model.find(), req.query)
      .filter()
      .sort()
      .limit()
      .pagination();
    // .populate();
    const doc = await feature.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
};
