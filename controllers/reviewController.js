const reviewService = require("../services/review.service");
class ReviewController {
  async createReview(req, res) {
    try {
      const result = await reviewService.createReviewService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async allEvent(req, res) {
    try {
      const result = await reviewService.allEventService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  
  async respondToReview(req, res) {
    try {
      const result = await reviewService.respondToReviewService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async likeReview(req, res) {
    try {
      const result = await reviewService.likeReviewService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async pagination(req, res) {
    try {
      const result = await reviewService.getReviewsByPageService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new ReviewController();
