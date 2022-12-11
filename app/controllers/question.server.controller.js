const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.server.model");
const Questions = require("../models/question.server.model");
const config = require('../../config/config');
const jwtKey = config.secretKey;

// @desc Add Questions
// @access Public
const addQuestions = asyncHandler(async (req, res) => {

  //Checks user if exist or not
  const user = await User.findById(req.body.user);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const questions = await Questions.create({
    gender: req.body.gender,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    targetWeightGoal: req.body.targetWeightGoal,
    baselineActivityLevel: req.body.baselineActivityLevel,
    user: req.body.user
  })
  res.status(200).json(questions);
});

const getQuestions = async (req, res) => {
  try {
    const allQuestions = await Questions.find();
    console.log(allQuestions)
    return res.status(200).json(allQuestions);
  } catch (e) {
    console.log(e)
  }
}

//Get Questionnaire based on user
const getQuestion = async (req, res) => {
  try {
    const question = await Questions.findOne({ user: req.params.user });
    console.log(question)
    return res.status(200).json(question);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

const updateQuestions = async (req, res) => {

  const questionnaire = await Questions.findOne({ user: req.body.user });
  if (!questionnaire) {
    res.status(400);
    throw new Error("No Questionnaire found with given user");
  }
  const updatedQuestionnaire = await Questions.findOneAndUpdate(
    { _id: `${req.body.id}`, }, req.body, { new: true, }
  );
  console.log("Questions Updated : " + updatedQuestionnaire);
  res.status(200).json(updatedQuestionnaire);
}


module.exports = {
  addQuestions,
  getQuestions,
  updateQuestions,
  getQuestion
};
