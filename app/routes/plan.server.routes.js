const express = require("express");
const router = express.Router();
const {
    getPlan,
    generatePlan,
    updatePlan,
    deletePlanById
} = require("../controllers/plan.server.controller");

router.post("/generate", generatePlan);
router.get("/user/:user", getPlan);
router.post("/update", updatePlan);
router.delete("/delete/:plan", deletePlanById);


module.exports = router;
