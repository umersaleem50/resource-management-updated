const catchAsync = require("../Util/catchAsync");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("./handlerFactory");

const ServiceProduct = require("../Models/serviceProduct");
const apiError = require("../Util/apiError");
const Member = require("../Models/member");
const ProfileDetailModel = require("../Models/profileDetail");

exports.editServiceGallery = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { order } = req.params;
  let galleryArr;
  if (!id || !order)
    return next(
      new apiError(
        "Please provide the order of image between 0 - 4 and id of profile",
        400
      )
    );
  // const profileData = await Member.findById(id);

  const serviceDetails = await ServiceProduct.findById(id);

  console.log("this is service Details", serviceDetails);

  galleryArr = [...serviceDetails.gallery];
  galleryArr[order] = req.body.gallery;
  serviceDetails.gallery = galleryArr;

  const updatedDetails = await serviceDetails.save({
    runValidtors: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedDetails,
  });
});

exports.createService = catchAsync(async (req, res, next) => {
  const body = req.body;
  const { id } = req.params || req.user;
  const serviceProduct = await ServiceProduct.create({ ...body, member: id });
  if (!serviceProduct)
    return next(new apiError("Failed to create a new service or product", 400));
  const member = await ProfileDetailModel.findOneAndUpdate(
    { member: id },
    { $push: { service: serviceProduct.id } },
    { runValidators: true, new: true }
  );
  res.status(201).json({ status: "success", data: serviceProduct });
});
exports.updateService = updateOne(ServiceProduct);
exports.deleteOneService = deleteOne(ServiceProduct);
exports.getAllServices = getAll(ServiceProduct);
exports.getOneService = getOne(ServiceProduct);
