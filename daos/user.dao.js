const User = require("../models/user.model");
const log = require("../configs/logger.config");
const getNextSequenceValue = require("../utils/helpers/counter.helper.util");

class UserDao {
  async getUserById(id) {
    try {
      const user = await User.findOne({ userId: id });
      if (!user) {
        return {
          message: "User not found",
          status: "failed",
          data: null,
          code: 201,
        };
      } else {
        return {
          message: "User found",
          status: "success",
          data: user,
          code: 200,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO]: ", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const userExist = await User.findOne({
        email: email,
      });
      if (userExist != null) {
        return {
          message: "Successfully",
          status: "success",
          data: userExist,
          code: 200,
        };
      } else {
        return {
          message: "User not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO]: ", error);
      throw error;
    }
  }
  
  async createUser(data) {
    try {
      const userId = "User_" + (await getNextSequenceValue("user"));
      data.userId = userId;
      const user = new User(data);
      const result = await user.save();

      log.info("User saved");

      if (!result) {
        log.error("Error from [USER DAO] : user creation error");
        throw error;
      } else {
        return {
          message: "User created successfully",
          status: "success",
          code: 200,
          data: result,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }
}
module.exports = new UserDao();
