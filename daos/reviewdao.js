const log = require("../configs/logger.config");
const getNextSequenceValue = require("../utils/helpers/counter.helper.util");
const User = require("../models/user.model");
const Review = require("../models/review.model");
const Event = require("../models/event.model");
class reviewDao {
  async createReview(data) {
    try {
      const { userId, eventId, rating, comment } = data;

      const event = await Event.findOne({ eventId });
      console.log(event);
      if (!event || event.userId === userId) {
        return {
          message: "Only attendees of the event can create reviews",
          status: "failed",
          code: 404,
          data: null,
        };
      }
      const reviewId = "review_" + (await getNextSequenceValue("review"));
      data.reviewId = reviewId;
      const review = new Review(data);
      const result = await review.save();
      console.log(result);
      if (!result) {
        return {
          message: "Failed to create review",
          status: "failed",
          code: 404,
          data: null,
        };
      }
      return {
        message: "Review created successfully",
        status: "success",
        code: 201,
        data: result,
      };
    } catch (error) {
      log.error("Error creating review:", error);
      throw error;
    }
  }

  //respond

  async respondToReview(data) {
    try {
      const { reviewId, userId, reply } = data;
      const review = await Review.findById(reviewId);
      if (!review) {
        return {
          message: "Review not found",
          status: "failed",
          code: 404,
          data: null,
        };
      }

      const event = await Event.findOne({ eventId: review.eventId });
      if (!event) {
        return {
          message: "Event not found",
          status: "failed",
          code: 404,
          data: null,
        };
      }

      if (event.userId !== userId) {
        return {
          message:
            "Only the organizer who created the event can respond to this review",
          status: "failed",
          code: 403,
          data: null,
        };
      }
      review.organizerReply = {
        userId: userId,
        reply: reply,
      };

      await review.save();

      return {
        message: "Review responded successfully",
        status: "success",
        code: 200,
        data: review,
      };
    } catch (error) {
      console.error("Error responding to review:", error);
      throw error;
    }
  }

  async likeReview(data) {
    try {
      const { reviewId } = data;
      const review = await Review.findById(reviewId);
      if (!review) {
        return {
          message: "Review not found",
          status: "failed",
          code: 404,
          data: null,
        };
      }
      review.likes += 1;
      await review.save();

      return {
        message: "Review liked successfully",
        status: "success",
        code: 200,
        data: review,
      };
    } catch (error) {
      console.error("Error liking review:", error);
      throw error;
    }
  }

  async getReviewsByPage(data) {
    const {page, limit}=data;
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const reviews = await Review.find().skip(startIndex).limit(limit);

      const totalReviews = await Review.countDocuments();

      return {
        message: "Reviews retrieved successfully",
        status: "success",
        code: 200,
        data: {
          reviews,
          totalReviews,
        },
      };
    } catch (error) {
      console.error("Error retrieving reviews:", error);
      throw error;
    }
  }
}
module.exports = new reviewDao();
