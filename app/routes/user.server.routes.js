const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  loginUser,
  updatePassword,
} = require("../controllers/user.server.controller");
router.get("/:user", getUser);
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/update-password", updatePassword);
module.exports = router;
