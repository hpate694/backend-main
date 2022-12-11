const express = require("express");
const router = express.Router();
const {
    addExercise,
    getExercise,
    updateExercise,
    searchExercise
} = require("../controllers/exercise.server.controller");

router.get("/", getExercise);
router.get("/search/:exerciseName", searchExercise);
router.post("/", addExercise);
router.post("/update", updateExercise);

module.exports = router;
