const mongoose = require("mongoose");

const progressSchema = mongoose.Schema(
    {
        weight: {
            type: String,
            required: [true, "Please enter your weight"],
        },
        FollowExercise: {
            type: Boolean,
            required: [true, "Please enter whether you follow exercise"],
        },
        FollowDiet: {
            type: Boolean,
            required: [true, " Please enter whether you follow diet"],
        },
        ExerciseTime: {
            type: String,
            required: [true, "Please enter the time you give to exercise"],
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

module.exports = mongoose.model("Progress", progressSchema);