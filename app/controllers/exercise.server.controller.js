const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.server.model");
const Exercise = require("../models/exercise.server.model");
const config = require('../../config/config');
const jwtKey = config.secretKey;

// Processes the data submitted from the Add form
const addExercise = asyncHandler(async (req, res) => {

  //REQUEST
  let newExercise = Exercise({
    _id: req.body.id,
    image: req.body.image,
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    user: req.body.user
  });

  //RESPOND
  Exercise.create(newExercise, (err, item) => {
    if (err) {
      console.log(err);
      res.status(400);
      throw new Error("Exercise not created");
    }
    else {
      //CAN ADD if --> in case item already exists...
      console.log(item);
      res.status(200).json(newExercise);

    }
  });
})

const getExercise = async (req, res) => {
  try {
    const allExercise = await Exercise.find();
    console.log(allExercise)
    return res.status(200).json(allExercise);
  } catch (e) {
    console.log(e)
  }
}

const searchExercise = async (req, res) => {
  const regEx = new RegExp(req.params.exerciseName, 'i');
  const exercise = await Exercise.find({ name: { $regex: regEx } });
  if (!exercise) {
    res.status(404);
    throw new Error('Exercise not found with this name');
  }
  res.status(200).json(exercise);
}

//update exercise 
const updateExercise = asyncHandler(async (req, res) => {
  const Fexercise = await Exercise.findById(req.body.id);

  if (!Fexercise) {
    res.status(400);
    throw new Error("Exercise not found");
  }

  const updatedExercise = await Exercise.findOneAndUpdate(
    {
      _id: `${req.body.id}`,

    },
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedExercise);
});

//Delete Exercise
const deleteExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.body.id);

  if (!exercise) {
    res.status(404).json('Exercise not found');
  }

  const deletedExercise = await Exercise.findOneAndDelete(
    {
      _id: `${req.body.id}`
    },
    req.body
  );

  res.status(200).json(deletedExercise);
});


module.exports = {
  addExercise,
  getExercise,
  searchExercise,
  updateExercise,
  deleteExercise
};
