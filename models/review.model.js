// Review.js
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    userReply: {
      userId: {
        type: String,
        required: false,
      },
      reply: {
        type: String,
        required: false,
      },
    },
    organizerReply: {
      userId: {
        type: String,
        required: false,
      },
      reply: {
        type: String,
        required: false,
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
    reports: {
      type: Number,
      default: 0,
    },
    flagged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
