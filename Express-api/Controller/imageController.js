const catchAsync = require("../Util/catchAsync");

const multer = require("multer");
const sharp = require("sharp");

const resizePhoto = (fileLoc, sizes) => {
  return catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const fileName = `${req.body.firstName}-apna-${Date.now()}-${fileLoc}.jpeg`;
    await sharp(req.file.buffer)
      .resize(sizes[0], sizes[1])
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/storage/images/${fileLoc}/${fileName}`);

    req.body.profilePicture = fileName;
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

exports.resizeProfilePicture = resizePhoto("profilePicture", [500, 500]);

exports.resizeCoverImage = resizePhoto("coverPicture", [1420, 275]);
