const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const log = require("../configs/logger.config");

router.post("/register", async (req, res) => {
  try {
    const result = await authController.register(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await authController.login(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
