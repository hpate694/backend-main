const express = require("express");
const router = express.Router();
const {
    addExercise,
    getExercise,
    updateExercise,
    searchExercise,
    deleteExercise
} = require("../controllers/exercise.server.controller");

router.get("/", getExercise);
router.get("/search/:exerciseName", searchExercise);
router.post("/", addExercise);
router.post("/update", updateExercise);
router.post("/delete", deleteExercise);

module.exports = router;
