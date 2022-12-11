const express = require("express");
const router = express.Router();

const {
    addexpert,
    getAllExperts,
    updateExpert,
    deleteexpert
} = require("../controllers/experts.server.controller");

router.post("/", addexpert);

router.get("/all", getAllExperts);

router.post("/update", updateExpert);
router.post("/delete", deleteexpert);

module.exports = router;