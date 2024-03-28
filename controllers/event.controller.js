const eventService = require("../services/event.service");

class EventController {
  async createEvent(req, res) {
    try {
      const result = await eventService.createEventService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async allEvent(req, res) {
    try {
      const result = await eventService.allEventService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  
  async allEvent(req, res) {
    try {
      const result = await eventService.allEventService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new EventController();
