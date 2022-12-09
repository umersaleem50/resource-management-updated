const mongoose = require("mongoose");
const { isEmail } = require("validator");
const permissions = require("../../Dev-Data/permissions");
const professions = require("../../Dev-Data/professions");

const memberSchema = new mongoose.Schema({
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
    required: [true, "Please choose a unique password."],
    min: [8, "Password must have alleast 8 characters or letters."],
    max: [32, "Password must be less than 32 characters or letters."],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
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
    required: [true, "Please select professions for account."],
    enum: {
      values: professions,
      message: [`Please choose a valid profession`],
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
  subAccounts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "member",
    default: [],
  },
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
