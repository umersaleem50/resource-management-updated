const express = require("express");
const {
  login,
  signUp,
  protectedRoute,
  updatePassword,
} = require("../Controller/authController");
const {
  uploadSingleImage,
  resizeSingleImage,
  resizeProfilePicture,
  resizeCoverImage,
  uploadProfileCoverPicture,
} = require("../Controller/imageController");

const authRouter = new express.Router();

authRouter.post("/login", login);

authRouter.post("/signup/:mainId", signUp);
authRouter.post("/update-password/:mainId", protectedRoute, updatePassword);

module.exports = authRouter;
