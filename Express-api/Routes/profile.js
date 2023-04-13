const { protectedRoute } = require("../Controller/authController");
// const imageHandler = require("../Controller/imageController");
const profileController = require("../Controller/profileController");
const authController = require("../Controller/authController");
const {
  uploadProfileImage,
  resizeProfilePicture,
  uploadCoverImage,
  resizeCoverImage,
} = require("../Controller/imageController");

const Router = require("express").Router();

Router.post("/logout", authController.logoutProfile);

Router.use(protectedRoute);
Router.get("/team", profileController.getTeam);

Router.get("/", profileController.getProfile).get(
  "/:id",
  profileController.checkIfPartOfTeam,
  profileController.getSubAccountProfile
);
Router.use(uploadProfileImage);
Router.use(resizeProfilePicture);
Router.use(uploadCoverImage);
Router.use(resizeCoverImage);
Router.patch(
  "/",
  profileController.checkIfHavePermission("update-account"),

  profileController.updateProfile
).patch(
  "/:id",
  profileController.checkIfPartOfTeam,
  profileController.checkIfHavePermission("update-account"),
  profileController.updateSubAccount
);

module.exports = Router;
