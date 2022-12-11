const express = require("express");
const router = express.Router();
const {
  addQuestions,
  getQuestions,
  updateQuestions,
  getQuestion
} = require("../controllers/question.server.controller");

router.get("/", getQuestions);

router.post("/", addQuestions);

router.post("/update", updateQuestions);

router.get("/user/:userId", getQuestion);

module.exports = router;
