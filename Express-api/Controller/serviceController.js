const catchAsync = require("../Util/catchAsync");
const { updateOne, deleteOne, getAll, getOne } = require("./handlerFactory");

const Service_Product_Model = require("../Models/serviceProduct");
const apiError = require("../Util/apiError");

const Member = require("../Models/member");

const REQUIRED_FIELDS =
  "profilePicture fullName lastName firstName city country phone postalCode street";

exports.createService = catchAsync(async (req, res, next) => {
  // An Admin can also make service for himself or his team member
  const id = req.params.id || req.user.id;
  const body = req.body;
  const service = await Service_Product_Model.create({
    ...body,
    provider: id,
  });
  if (!service)
    return next(new apiError("Failed to create a new service or product", 400));
  await Member.findByIdAndUpdate(id, {
    $push: { service: service.id },
  });
  res.status(201).json({ status: "success", data: service });
});

exports.removeItfromServices = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const services = req.user.service;
  if (services.includes(id)) {
    const user = await Member.findOne({ id: req.user.id }).select("service");
    const servicesArr = [...user.service];
    const required_service_index = servicesArr.indexOf(id);
    if (required_service_index >= 0) {
      servicesArr.splice(required_service_index);
      user.service = servicesArr;
      await user.save();
    }
  }
  next();
});

exports.updateService = updateOne(Service_Product_Model);
exports.deleteOneService = deleteOne(Service_Product_Model);
exports.getAllServices = getAll(Service_Product_Model, [
  { path: "provider", select: "profilePicture fullName lastName firstName" },
]);
exports.getOneService = getOne(Service_Product_Model, [
  { path: "provider", select: REQUIRED_FIELDS },
]);
