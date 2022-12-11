const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please enter image url"],

    },
    name: {
      type: String,
      required: [true, "Please enter exercise name"],
    },
    description: {
      type: String,
      required: [true, "Please add exercise description"],
    },
    duration: {
      type: String,
      required: [true, "Please enter how many hours per day"],
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
