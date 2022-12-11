const express = require("express");
const router = express.Router();
const {
  addProgress, getallProgress, generateProgressReport
} = require("../controllers/progress.server.controller");


router.post("/add", addProgress);
router.post("/get", getallProgress);
router.post("/generate-progress-report", generateProgressReport)

module.exports = router;
