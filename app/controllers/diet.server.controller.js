const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.server.model");
const Diet = require("../models/diet.server.model");
const config = require('../../config/config');
const jwtKey = config.secretKey;

// Processes the data submitted from the Add form
const addDiet = asyncHandler(async (req, res) => {


  //REQUEST
  let newDiet = Diet({
    _id: req.body.id,
    image: req.body.image,
    name: req.body.name,
    description: req.body.description,
    calories: req.body.calories,
    user: req.body.user
  });

  //RESPOND
  Diet.create(newDiet, (err, item) => {
    if (err) {
      console.log(err);
      res.status(400);
      throw new Error("Diet not created");
    }
    else {
      //CAN ADD if --> in case item already exists...
      console.log(item);
      res.status(200).json(newDiet);

    }
  });
})

const getDiet = async (req, res) => {
  try {
    const allDiet = await Diet.find();
    console.log(allDiet)
    return res.status(200).json(allDiet);
  } catch (e) {
    console.log(e)
  }
}

const searchDiet = async (req, res) => {
  const regEx = new RegExp(req.params.dietName, 'i');
  const diet = await Diet.find({ name: { $regex: regEx } });
  if (!diet) {
    res.status(404);
    throw new Error('Diet not found with this name');
  }
  res.status(200).json(diet);
}

//update diet
const updateDiet = asyncHandler(async (req, res) => {

  const uDiet = await Diet.findById(req.body.id);

  if (!uDiet) {
    res.status(400);
    throw new Error(" Diet not found");
  }

  const updatedDiet = await Diet.findOneAndUpdate(
    {
      _id: `${req.body.id}`,
    },
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedDiet);
});

module.exports = {
  addDiet,
  getDiet,
  searchDiet,
  updateDiet
};