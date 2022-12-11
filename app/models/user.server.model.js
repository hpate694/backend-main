const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add userName"],
      unique: [true, "Username must be unique"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    city: {
      type: String,
      required: [true, "Please add city"],
    },
    postalCode: {
      type: String,
      required: [true, "Please add postal code"],
    },
    question1: {
      type: String
    },
    answer1: {
      type: String
    },
    question2: {
      type: String
    },
    answer2: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
