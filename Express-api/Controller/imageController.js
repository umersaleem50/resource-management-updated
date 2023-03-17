const catchAsync = require("../Util/catchAsync");
const Member = require("../Models/member");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const apiError = require("../Util/apiError");
const path = require("path");

const resizePhoto = (fileLoc, sizes) => {
  return catchAsync(async (req, res, next) => {
    console.log(req.files, req.file);
    if (!req.file || !req.files) return next();
    const fileName = `${req.body.profile_name}-${Date.now()}-${fileLoc}.jpeg`;
    await sharp(req.files.profilePicture)
      .resize(sizes[0], sizes[1])
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/storage/images/${fileLoc}/${fileName}`);

    req.body.profilePicture = fileName;

    console.log("this is other body", req.body);
    next();
  });
};

const storage = multer.memoryStorage();

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }

  cb("Please only upload Images", false);
};

const uploadImage = multer({ storage, fileFilter: filter });

// exports.uploadSingleImage = (queryString) => uploadImage.single(queryString);
exports.uploadProfileCoverPicture = uploadImage.fields([
  {
    name: "profilePicture",
    maxCount: 1,
  },
  {
    name: "coverPicture",
    maxCount: 1,
  },
]);

// exports.resizeSingleImage = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();
//   const fileName = `${req.body.firstName}-${
//     Math.random() * 1000000
//   }-${Date.now()}-profilePicture.jpeg`;
//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/storage/images/profilePicture/${fileName}`);

//   req.body.profilePicture = fileName;
//   next();
// });
// exports.resizeSingleImage = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();
//   const filename = `${
//     req.body.profile_name || req.user.id
//   }-${Date.now()}-profilePicture.jpeg`;
//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/storage/images/profilePicture/${filename}`);

//   req.body.profilePicture = filename;

//   next();
// });

// exports.resizeSingleImage = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();
//   const filename = `${
//     req.body.profile_name || req.user.id
//   }-${Date.now()}-coverPicture.jpeg`;
//   await sharp(req.file.buffer)
//     .resize(1420, 275)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/storage/images/coverPicture/${filename}`);

//   req.body.profilePicture = filename;

//   next();
// });

const resizeSingleImage = (fieldName, sizes) =>
  catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const filename = `${
      req.body["profile_name"] ||
      req.user._id ||
      Math.random() * 100000 + 500000
    }-${Date.now()}-${fieldName}.jpeg`;
    await sharp(req.file.buffer)
      .resize(req.body?.image_sizes * 1 || sizes[0], sizes[1])
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/storage/images/${fieldName}/${filename}`);

    req.body[fieldName] = filename;

    next();
  });

const deletePreviousImage = (fieldName, dirName) => {
  return catchAsync(async (req, res, next) => {
    const { id } = (req.params.id && req.params) || req.user;
    const member = await Member.findById(id).select(`${fieldName}`);

    fs.unlink(
      path.join(
        __dirname,
        "..",
        "..",
        `/public/storage/images/${dirName}/${member[fieldName]}`
      ),
      (err) => {
        return next();
      }
    );
  });
};

exports.uploadProfileImage = uploadImage.single("profilePicture");
exports.uploadCoverImage = uploadImage.single("coverPicture");
exports.uploadGalleryImage = uploadImage.single("gallery");
exports.resizeGalleryImage = resizeSingleImage("gallery", [500, 340]);
exports.resizeServiceGalleryImage = resizeSingleImage("gallery", [500, 340]);
exports.resizeProfilePicture = resizeSingleImage("profilePicture", [500, 500]);
exports.resizeCoverImage = resizeSingleImage("coverPicture", [1420, 275]);
exports.deletePreviousImage = deletePreviousImage;

// exports.resizeProfilePicture = resizePhoto("profilePicture", [500, 500]);

// exports.resizeCoverImage = resizePhoto("coverPicture", [1420, 275]);
