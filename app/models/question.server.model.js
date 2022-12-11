const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    gender: {
      type: String
    },
    age: {
      type: String
    },
    height: {
      type: String
    },
    weight: {
      type: String
    },
    targetWeightGoal: {
      type: String
    },
    baselineActivityLevel: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
