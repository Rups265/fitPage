const log = require("../configs/logger.config");
const getNextSequenceValue = require("../utils/helpers/counter.helper.util");
const User = require("../models/user.model");
const Event = require("../models/event.model");
class eventDao {
  async createEvent(data) {
    try {
      const { userId, eventName, description, date, location } = data;
      const user = await User.findOne({ userId });
      const role = user.role;
      if (role === "attendee") {
        log.error("only organizer can create event");
        return {
          message: "only organizer can create event",
          status: "failed",
          code: 404,
          data: null,
        };
      }

      const eventId = "event_" + (await getNextSequenceValue("event"));
      data.eventId = eventId;
      const event = new Event(data);
      const result = await event.save();

      if (!result) {
        log.error("Error from [EVENT DAO] :event creation error");
        throw error;
      } else {
        return {
          message: "event created successfully",
          status: "success",
          code: 200,
          data: result,
        };
      }
    } catch (error) {
      log.error("Error from [event Dao] : ", error);
      throw error;
    }
  }

  async allEvent() {
    try {
      const result = await Event.find();
      if (!result) {
        log.error("Error from [EVENT DAO] :event get error");
        throw error;
      } else {
        return {
          message: "event get successfully",
          status: "success",
          code: 200,
          data: result,
        };
      }
    } catch (error) {
      log.error("Error from [event Dao] : ", error);
      throw error;
    }
  }
}
module.exports = new eventDao();
