const mongoose = require("mongoose");
const { isEmail } = require("validator");
const permissions = require("../../Dev-Data/permissions");
const professions = require("../../Dev-Data/professions");
const bcrypt = require("bcrypt");

const memberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "A member must have a first name."],
    },
    lastName: {
      type: String,
      required: [true, "A member must have a last name."],
    },
    email: {
      type: String,
      required: [true, "A member must have a valid email."],
      validate: isEmail,
      unique: true,
    },
    password: {
      type: String,
      min: [8, "Password must have at-least 8 characters or letters."],
      max: [32, "Password must be less than 32 characters or letters."],
      required: [true, "Please choose a unique password."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password."],
      min: [8, "Password must have at-least 8 characters or letters."],
      max: [32, "Password must be less than 32 characters or letters."],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Please match your password.",
      },
      select: false,
    },
    level: {
      type: Number,
      default: 1,
    },

    profession: {
      type: [String],
      required: [true, "Please provide professions for account."],
      enum: {
        values: professions,
        message: "Please choose a valid profession",
      },
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "Please provide professions for account.",
      },
    },
    permissions: {
      type: [String],
      required: [true, "Please provide the permissions for the account."],
      enum: {
        values: permissions,
        message: "Please choose a valid permission.",
      },
    },
    team: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "member",
      default: [],
    },
    profilePicture: {
      type: String,
      default: "default-profilePicture.jpg",
    },
    coverPicture: {
      type: String,
      default: "default-coverPicture.jpg",
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpire: {
      type: Date,
      select: false,
    },
    contactDetails: {
      type: mongoose.Schema.ObjectId,
      ref: "Contact",
    },
    category: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
  }
);

memberSchema.virtual("fullName").get(function () {
  if (!this.firstName && !this.lastName) return;
  return this.firstName + " " + this.lastName;
});

memberSchema.virtual("memberQunatity").get(function () {
  return this.team.length;
});

memberSchema.pre("save", function (next) {
  console.log(this);
  next();
});
memberSchema.methods.correctPassword = async function (
  inputPassword,
  encryptedPassword
) {
  return await bcrypt.compare(inputPassword, encryptedPassword);
};

memberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = "";
  next();
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
