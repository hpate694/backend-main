const express = require("express");
const router = express.Router();
const {
    addDiet,
    getDiet,
    updateDiet,
    searchDiet
} = require("../controllers/diet.server.controller");

router.get("/", getDiet);
router.get("/search/:dietName", searchDiet);
router.post("/", addDiet);
router.post("/update", updateDiet);

module.exports = router;
