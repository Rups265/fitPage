const log = require("../configs/logger.config");
const reviewDao = require("../daos/reviewdao");
class reviewService {
  async createReviewService(req, res) {
    try {
      if (
        !req.body ||
        !req.userId ||
        !req.body.eventId ||
        !req.body.rating ||
        !req.body.comment
      ) {
        log.error("Error from [REVIEW SERVICE] : Invalid request");
        return res.status(400).json({
          message: "Invalid request",
          status: "failed",
          data: null,
          code: 201,
        });
      }

      const data = {
        userId: req.userId,
        eventId: req.body.eventId,
        rating: req.body.rating,
        comment: req.body.comment,
      };

      console.log(data);
      const result = await reviewDao.createReview(data);
      if (result.code !== 404) {
        log.info("[FEATURE SERVICE]: created successfully");
      }
      if (result.data) {
        return res.status(200).json({
          message: "Successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(200).json({
          message: "Something went wrong",
          status: "fail",
          code: 404,
          data: null,
        });
      }
    } catch (error) {
      log.error("Error from [FEATURE SERVICE] : ", error);
      throw error;
    }
  }

  async respondToReviewService(req, res) {
    try {
      const userId = req.userId;
      const { reviewId, reply } = req.body;

      if (!reviewId || !userId || !reply) {
        return res.status(400).json({
          message: "Invalid request",
          status: "failed",
          data: null,
          code: 400,
        });
      }
      const data = {
        userId: userId,
        reviewId: reviewId,
        reply: reply,
      };

      const result = await reviewDao.respondToReview(data);
      if (result.status === "success") {
        return res.status(200).json({
          message: "Responded to review successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(404).json({
          message: "Failed to respond to review",
          status: "failed",
          code: 404,
          data: null,
        });
      }
    } catch (error) {
      log.error("Error from [FEATURE SERVICE] : ", error);
      throw error;
    }
  }

  async likeReviewService(req, res) {
    try {
      const { reviewId } = req.body;
      const userId = req.userId;

      const result = await reviewDao.likeReview(reviewId, userId);
      if (!result) {
        return res.status(500).json({
          message: "Internal Server Error",
          status: "error",
          code: 500,
          data: null,
        });
      }
      return res.status(200).json({
        message: "successfully",
        status: "success",
        code: 200,
        data: result.data,
      });
    } catch (error) {
      console.error("Error in likeReviewService:", error);
      throw error;
    }
  }

  async getReviewsByPageService(req,res) {
    const {page, limit} = red.body;
    try {
      const result = await reviewDao.getReviewsByPage(page, limit);
      return result;
    } catch (error) {
      console.error('Error in ReviewService.getReviewsByPage:', error);
      throw error;
    }
  }
}
module.exports = new reviewService();
