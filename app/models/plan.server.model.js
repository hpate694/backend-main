const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
  {

    diet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diet",
      }
    ]
    ,
    exercise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      }
    ]
    ,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);
