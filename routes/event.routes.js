const express = require("express");
const eventController = require("../controllers/event.controller");
const router = express.Router();
const log = require("../configs/logger.config");
const jwt = require("../middlewares/auth.middlware");

router.post("/createEvent", jwt.authenticateJWT, async (req, res) => {
  try {
    const result = await eventController.createEvent(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/allEvent", jwt.authenticateJWT, async (req, res) => {
  try {
    const result = await eventController.allEvent(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
