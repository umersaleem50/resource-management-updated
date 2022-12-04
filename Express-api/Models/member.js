const mongoose = require("mongoose");
const { isEmail } = require("validator");

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
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
