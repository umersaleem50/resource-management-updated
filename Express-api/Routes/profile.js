const { protectedRoute } = require("../Controller/authController");
// const imageHandler = require("../Controller/imageController");
const profileController = require("../Controller/profileController");
const authController = require("../Controller/authController");

const Router = require("express").Router();

Router.use(protectedRoute);

Router.get("/", profileController.getProfile).get(
  "/:id",
  profileController.checkIfPartOfTeam,
  profileController.getSubAccountProfile
);
Router.get("/team", profileController.getTeam);
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

Router.post("/logout", authController.logoutProfile);

module.exports = Router;
