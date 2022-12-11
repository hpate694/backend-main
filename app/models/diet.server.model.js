const mongoose = require("mongoose");

const dietSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please enter image url"],

    },
    name: {
      type: String,
      required: [true, "Please enter diet name"],
    },
    description: {
      type: String,
      required: [true, "Please add diet description"],
    },
    calories: {
      type: String,
      required: [true, "Please enter how many calories per serving"],
    },


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Diet", dietSchema);
