const express = require("express");
const { protectedRoute } = require("../Controller/authController");
const {
  resizeServiceGalleryImage,
  uploadGalleryImage,
  uploadCoverImage,
  resizeCoverImage,
} = require("../Controller/imageController");
const {
  createService,
  getAllServices,
  getOneService,
  deleteOneService,
  updateService,
  // editServiceGallery,
} = require("../Controller/serviceController");

const service_product_router = express.Router();
service_product_router.use(protectedRoute);
service_product_router.get("/", getAllServices);
service_product_router.post("/:id", createService);
service_product_router.get("/:id", getOneService);
service_product_router.patch("/:id", updateService);
service_product_router.delete("/:id", deleteOneService);

service_product_router.patch(
  "/update-cover-picture/:id",
  uploadCoverImage,
  resizeCoverImage,
  updateService
);

service_product_router.patch(
  "/update-gallery/:id/:order",
  uploadGalleryImage,
  resizeServiceGalleryImage
  // editServiceGallery
);

module.exports = service_product_router;
