const express = require("express");
const router = express.Router();
const log = require("../configs/logger.config");
const jwt = require("../middlewares/auth.middlware");
const reviewController = require("../controllers/reviewController");

router.post("/createReview", jwt.authenticateJWT, async (req, res) => {
  try {
    const result = await reviewController.createReview(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/respondToReview", jwt.authenticateJWT, async (req, res) => {
  try {
    const result = await reviewController.respondToReview(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/likeReview", jwt.authenticateJWT, async (req, res) => {
    try {
      const result = await reviewController.likeReview(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error : ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
router.post("/pagination", jwt.authenticateJWT, async (req, res) => {
    try {
      const result = await reviewController.pagination(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error : ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
