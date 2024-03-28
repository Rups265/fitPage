const log = require("../configs/logger.config");
const userDao = require("../daos/user.dao");
const { createToken } = require("../utils/helpers/token.helper.util");
const validateEmail = require("../utils/helpers/validator.helper.util");
const {
  hashItem,
  compareItems,
} = require("../utils/helpers/bcrypt.helper.util");

class AuthService {
  async registerService(req, res) {
    try {
      const { name, email, password, mobileNumber, role } = req.body;
      if (!name && !email && !password && !mobileNumber && !role) {
        log.error("Error from [User SERVICE]: Invalid Request");
        return res.status(400).json({
          message: "Invalid Request",
          status: "failed",
          data: null,
          code: 201,
        });
      }

      if (!validateEmail(email)) {
        log.error("Error from [User SERVICE]: Invalid Email Address");
        return res.status(400).json({
          message: "Invalid Email Address",
          status: "failed",
          data: null,
          code: 201,
        });
      }
      const userExist = await userDao.getUserByEmail(email);
      if (userExist.data == null) {
        const data = {
          name,
          email,
          password: await hashItem(password),
          mobileNumber,
          role: role,
        };
        const userInfo = await userDao.createUser(data);

        if (userInfo.data !== null) {
          log.info("registration process successful");
          return res.status(200).json({
            status: "success",
            code: 200,
            message: "registered successfully",
            data: {
              user: userInfo.data,
            },
          });
        } else {
          return res.status(201).json({
            status: "fail",
            code: 201,
            message: "Something went wrong",
            data: null,
          });
        }
      } else {
        return res.status(201).json({
          status: "alreadyExists",
          code: 201,
          message: "Email already exists",
          data: null,
        });
      }
    } catch (error) {
      log.error("Error from [Auth SERVICE]:", error);
      throw error;
    }
  }

  //login service
  async loginService(req, res) {
    try {
      const { email, password } = req.body;
      if (!email && !password) {
        log.error("Error from [User SERVICE]: Invalid Request");
        return res.status(400).json({
          message: "Invalid Request",
          status: "failed",
          data: null,
          code: 201,
        });
      }
      if (!validateEmail(email)) {
        log.error("Error from [User SERVICE]: Invalid Email Address");
        return res.status(400).json({
          message: "Invalid Email Address",
          status: "failed",
          data: null,
          code: 201,
        });
      }
      const user = await userDao.getUserByEmail(email);
      if (user.data == null) {
        return res.status(400).json({
          message: "account not exist",
          status: "notFound",
          code: 201,
          data: null,
        });
      } else {
        const validateUser = await compareItems(password, user.data.password);
        if (!validateUser) {
          log.error("Error from [Auth SERVICE]: Please enter password");
          return res.status(400).json({
            message: "Please enter correct password",
            status: "failed",
            code: 201,
            data: null,
          });
        }
        log.info("[Auth SERVICE]: User verified successfully");
        const token = createToken(user.data.userId);
        return res.status(200).json({
          message: "User verified successfully",
          status: "success",
          code: 200,
          data: {
            user:{
              id: user.data.userId,
              name: user.data.name,
              email: user.data.email,
              number: user.data.mobileNumber,
              role: user.data.role,
            },
           
            token,
          },
        });
      }
    } catch (error) {
      log.error("Error from [Auth SERVICE]:", error);
      throw error;
    }
  }
}
module.exports = new AuthService();
