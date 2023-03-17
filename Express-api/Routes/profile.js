const { protectedRoute } = require("../Controller/authController");
const {
  uploadProfileImage,
  uploadCoverImage,
  // resizeSingleImage,
  resizeCoverImage,
  resizeProfilePicture,
  uploadGalleryImage,
  resizeGalleryImage,
  deletePreviousImage,
} = require("../Controller/imageController");
const {
  getTeam,
  getProfile,
  completeProfile,
  editProfile,
  editSubAccount,
  editProfileGallery,
  logoutProfile,
} = require("../Controller/profileController");

const Router = require("express").Router();

// Router.use(protectedRoute);
Router.use(protectedRoute);

Router.get("/team", getTeam);
Router.get("/", getProfile);
Router.post("/logout", logoutProfile);
Router.patch(
  "/update-profile-picture",
  uploadProfileImage,
  resizeProfilePicture,
  deletePreviousImage("profilePicture", "profilePicture"),
  editProfile
);
Router.patch(
  "/update-profile-picture/:id",
  uploadProfileImage,
  resizeProfilePicture,
  deletePreviousImage("profilePicture", "profilePicture"),
  editProfile
);

Router.patch(
  "/update-cover-picture/:id",
  uploadCoverImage,
  resizeCoverImage,
  editProfile
);

Router.patch(
  "/update-gallery/:id/:order",
  uploadGalleryImage,
  resizeGalleryImage,
  editProfileGallery
);
// Router.patch("/", uploadProfileCoverPicture, resizeProfilePicture, editProfile);
// TRY TO MAKE SEPERATE FILE FOR THE SUB ACCOUNTS
Router.post("/complete/:id", completeProfile);
Router.patch("/complete/:id", editSubAccount);

module.exports = Router;
