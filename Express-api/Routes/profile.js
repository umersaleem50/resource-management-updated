const { protectedRoute } = require("../Controller/authController");
// const imageHandler = require("../Controller/imageController");
const profileController = require("../Controller/profileController");
const authController = require("../Controller/authController");

const Router = require("express").Router();

Router.use(protectedRoute);

Router.get("/", profileController.getProfile);
Router.get("/team", profileController.getTeam);
// Router.get(
//   "/check/:id",
//   profileController.checkIfPartOfTeam('member'),
//   profileController.getTeam
// );
Router.post("/deactivate", authController.deactiveAccount);
Router.post("/logout", authController.logoutProfile);

// Router.patch(
//   "/update-profile-picture",
//   imageHandler.uploadProfileImage,
//   imageHandler.resizeProfilePicture,
//   imageHandler.deletePreviousImage("profilePicture", "profilePicture"),
//   editProfile
// );

// Router.patch(
//   "/update-profile-picture/:id",
//   imageHandler.uploadProfileImage,
//   imageHandler.resizeProfilePicture,
//   imageHandler.deletePreviousImage("profilePicture", "profilePicture"),
//   editProfile
// );

// Router.patch(
//   "/update-cover-picture/:id",
//   uploadCoverImage,
//   resizeCoverImage,
//   editProfile
// );

// Router.patch(
//   "/update-gallery/:id/:order",
//   uploadGalleryImage,
//   resizeGalleryImage,
//   editProfileGallery
// );
// Router.patch("/", uploadProfileCoverPicture, resizeProfilePicture, editProfile);
// TRY TO MAKE SEPERATE FILE FOR THE SUB ACCOUNTS
// Router.post("/complete/:id", completeProfile);
// Router.patch("/complete/:id", editSubAccount);

module.exports = Router;
