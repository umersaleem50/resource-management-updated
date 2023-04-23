const catchAsync = require("../Util/catchAsync");
const {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
} = require("./handlerFactory");

const Service_Product_Model = require("../Models/serviceProduct");
const apiError = require("../Util/apiError");

const Member = require("../Models/member");

// exports.editServiceGallery = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const { order } = req.params;
//   let galleryArr;
//   if (!id || !order)
//     return next(
//       new apiError(
//         "Please provide the order of image between 0 - 4 and id of profile",
//         400
//       )
//     );
//   // const profileData = await Member.findById(id);

//   const serviceDetails = await ServiceProduct.findById(id);

//   console.log("this is service Details", serviceDetails);

//   galleryArr = [...serviceDetails.gallery];
//   galleryArr[order] = req.body.gallery;
//   serviceDetails.gallery = galleryArr;

//   const updatedDetails = await serviceDetails.save({
//     runValidtors: true,
//     new: true,
//   });

//   res.status(200).json({
//     status: "success",
//     data: updatedDetails,
//   });
// });

exports.createService = catchAsync(async (req, res, next) => {
  const body = req.body;
  // An Admin can also make service for himself or his team member
  const { id } = req.params || req.user;
  const service_product = await Service_Product_Model.create({
    ...body,
    member: id,
  });
  if (!service_product)
    return next(new apiError("Failed to create a new service or product", 400));
  await Member.findByIdAndUpdate(id, {
    $push: { service: service_product.id },
  });
  res.status(201).json({ status: "success", data: service_product });
});

exports.updateService = updateOne(Service_Product_Model);
exports.deleteOneService = deleteOne(Service_Product_Model);
exports.getAllServices = getAll(Service_Product_Model);
exports.getOneService = getOne(Service_Product_Model);
