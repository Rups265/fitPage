const log = require("../configs/logger.config");
const eventDao = require("../daos/event.dao");

class EventService {
  async createEventService(req, res) {
    try {
      console.log(req.body);
      console.log(req.userId);
      if (
        !req.body ||
        !req.userId ||
        !req.body.eventName ||
        !req.body.description ||
        !req.body.date ||
        !req.body.location
      ) {
        log.error("Error from [FEATURE SERVICE] : Invalid request");
        return res.status(400).json({
          message: "Invalid request",
          status: "failed",
          data: null,
          code: 201,
        });
      }

      const data = {
        userId: req.userId,
        eventName: req.body.eventName,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
      };

      console.log(data);
      const result = await eventDao.createEvent(data);
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

  async allEventService(req, res) {
    try {
      const result = await eventDao.allEvent();
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
}
module.exports = new EventService();
