const { models, model, Schema, default: mongoose } = require("mongoose");

const serviceProductSchema = new Schema({
  type: {
    type: String,
    enum: {
      values: ["service", "product"],
      message: ["A type could only be service or product."],
    },
    required: [true, "You must need to provide a type."],
    toLowerCase: true,
  },
  name: {
    type: String,
    max: [
      128,
      "Please use a shorter name of maximum 128 letters for you product or service.",
    ],
    required: [true, "Please provide the name of product or service."],
  },
  title: {
    type: String,
    required: [true, "Please provide title for product or service."],
  },
  coverPicture: {
    type: String,
    default: "default-coverPicture.jpg",
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    min: [1, "A product or service must have rating equal or greater than 1"],
    max: [5, "A product or service must have rating equal or less than 5"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },

  member: {
    type: mongoose.Schema.ObjectId,
    ref: "member",
    required: [true, "A product or service must belong to a member."],
  },

  description: {
    type: String,
    required: [true, "A product of service must have a brief description"],
  },

  gallery: {
    type: [String],
    validate: [
      function (val) {
        return val.length <= 5;
      },
      "A galley could only have 5 images.",
    ],
    default: new Array(4).fill("default-gallery.jpg"),
  },

  details: {
    type: [
      {
        type: String,
        default: "default-coverPicture.jpg",
        heading: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    validate: [
      function (val) {
        return val.length <= 3;
      },
      "You can only insert 3 details sections.",
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ServiceProduct =
  models.serviceProduct || model("serviceProduct", serviceProductSchema);

module.exports = ServiceProduct;
