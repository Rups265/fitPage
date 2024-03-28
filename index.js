const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const cookieSession = require("cookie-session");
const { PORT } = require("./configs/server.config");
const { AuthRouter,EventRouter,ReviewRouter} = require("./routes/index");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
require("./configs/db.config");

app.use(
  cookieSession({
    name: "session",
    keys: ["EasyMoneyFx", "session", "backend"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

//middleware function to trim req.body
app.use((req, res, next) => {
  // Check if the request has a body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  console.log("HTTP method is " + req.method + ", URL -" + req.url);
  next();
});
app.use("/api/auth", AuthRouter);
app.use("/api/event",EventRouter);
app.use("/api/review",ReviewRouter);
app.listen(PORT, () => {
  console.log(`server is running on port number : ${PORT}`);
});
