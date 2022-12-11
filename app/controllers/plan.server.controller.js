const asyncHandler = require("express-async-handler");
const Plan = require("../models/plan.server.model");
const User = require("../models/user.server.model");
const Diet = require("../models/diet.server.model");
const Exercise = require("../models/exercise.server.model");

//Update a Plan
const updatePlan = asyncHandler(async (req, res) => {
  let errMessage = [];

  if (errMessage.length > 0) {
    res.status(400);
    throw new Error(errMessage);
  }

  // Check for user
  const existingPlan = await Plan.findById(req.body.plan);
  if (!existingPlan) {
    res.status(400).json('Plan does not exist');
  }

  existingPlan.diet.push(req.body.diet);
  existingPlan.exercise.push(req.body.exercise)
  const updatedPlan = await Plan.findByIdAndUpdate(
    { _id: existingPlan._id },
    existingPlan,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPlan.populate('diet').populate('exercise'));
});

//delete by id
const deletePlanById = asyncHandler(async (req, res) => {
  try {
    const planId = req.params.plan;
    Plan.remove({ _id: planId }, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json(
          {
            success: false,
            message: getErrorMessage(err)
          }
        );
      }
      else {
        res.status(200).json(
          {
            success: true,
            message: 'Item deleted successfully.'
          }
        )
      }
    });
  }
  catch (error) {
    return res.status(400).json(
      {
        success: false,
        message: getErrorMessage(error)
      }
    );
  }
});

//Get one Plan by User
const getPlan = async (req, res) => {
  const plan = await Plan.find({ user: req.params.user }).populate('diet').populate('exercise');
  if (!plan) {
    res.status(400);
    throw new Error("Plan does not exist with this user : " + req.params.user);
  }
  return res.status(200).json(plan);
}

const generatePlan = async (req, res) => {
  const user = await User.findById(req.body.user);
  if (!user) {
    return res.status(404).json("User Not Found");
  }

  const existingPlan = await Plan.findOne({ user: req.body.user });
  if (existingPlan) {
    return res.status(200).json("Plan already exists");
  }

  const exercise = await Exercise.find().limit(3);
  const diets = await Diet.find().limit(3);

  const plan = await Plan.create({
    diet: diets,
    exercise: exercise,
    user: req.body.user
  })

  return res.status(200).json(plan.populate('diet').populate('exercise'));
}

module.exports = {
  getPlan,
  generatePlan,
  updatePlan,
  deletePlanById,
};