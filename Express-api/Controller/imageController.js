const catchAsync = require("../Util/catchAsync");
const Member = require("../Models/member");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }

  cb("Please only upload Images", false);
};

const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //LIMIT OF FILE SIZE IS 5MBS
});

/**
 * Generate an image with filename in the storage, set the field to image filename & call next() middleware
 * @param {String} field
 * @param {Array} sizes
 * @returns next() and call the next middleware
 */

const resizeOneImage = (field, sizes) =>
  catchAsync(async (req, res, next) => {
    if (!req.files[field]) return next();
    const filename = `${req.user.id}-${Date.now()}-${field}.jpeg`;

    await sharp(req.files[field][0].buffer)
      .resize(sizes[0], sizes[1])
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/storage/images/${field}/${filename}`);
    req.body[field] = filename;

    next();
  });

const resizeGalleryImages = (field, sizes) =>
  catchAsync(async (req, res, next) => {
    console.log(req.files[field]);
    if (!req.files || !req.files[field]) return next();
    const arrayOfFileName = [];
    const arrayOfFiles = [...req.files[field]];
    let test;
    arrayOfFiles.forEach(async (file, i) => {
      const filename = `${req.user.id}-${Date.now()}-${
        field + "-" + (i + 1)
      }.jpeg`;

      arrayOfFileName.unshift(filename);
      await sharp(file.buffer)
        .resize(sizes[0], sizes[1])
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/storage/images/${field}/${filename}`);
    });

    req.body[field] = arrayOfFileName;

    next();
  });

/**
 *
 * @param {String} field Field of the file
 * @param {String} dirLocation Directory where the file might exist
 * @returns Return next() middleware
 */

const deletePreviousImage = (field, dirLocation) => {
  return catchAsync(async (req, res, next) => {
    const { id } = (req.params.id && req.params) || req.user;
    const user = await Member.findById(id).select(`${field}`);

    fs.unlink(
      path.join(
        __dirname,
        "..",
        "..",
        `/public/storage/images/${dirLocation}/${user[field]}`
      ),
      (err) => {
        return next();
      }
    );
  });
};

exports.deletePreviousImage = deletePreviousImage;
exports.uploadProfileImage = uploadImage.single("profilePicture");
exports.uploadProfileImages = uploadImage.fields([
  {
    name: "profilePicture",
    maxCount: 1,
  },
  {
    name: "coverPicture",
    maxCount: 1,
  },
  {
    name: "gallery",
    maxCount: 8,
  },
]);
exports.uploadCoverImage = uploadImage.single("coverPicture");
exports.uploadGalleryImage = uploadImage.single("gallery");

exports.resizeGallery = resizeGalleryImages("gallery", [700, 500]);
exports.resizeServiceGalleryImage = resizeOneImage("gallery", [500, 340]);
exports.resizeProfilePicture = resizeOneImage("profilePicture", [500, 500]);
exports.resizeCoverImage = resizeOneImage("coverPicture", [1420, 275]);

// exports.resizeProfilePicture = resizePhoto("profilePicture", [500, 500]);

// exports.resizeCoverImage = resizePhoto("coverPicture", [1420, 275]);
