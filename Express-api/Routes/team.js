const { protectedRoute } = require("../Controller/authController");
const { getTeam, getProfile } = require("../Controller/profileController");

const Router = require("express").Router();

Router.get("/team", protectedRoute, getTeam);
Router.get("/", protectedRoute, getProfile);

module.exports = Router;
