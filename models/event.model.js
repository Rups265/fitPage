const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userId:{
     type:String,
     required:true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true
   }
);

module.exports = mongoose.model("Event", eventSchema);
