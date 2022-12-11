const mongoose = require("mongoose");

const expertSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add expert's First Name"],
    },
    lastname: {
      type: String,
      required: [true, "Please add expert's Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please add expert's email address"],
    },
    experience: {
      type: String,
      required: [true, "Please add expert's experience"],
    },
    qualification: {
      type: String,
      required: [true, "Please add expert's qualification"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experts", expertSchema);
