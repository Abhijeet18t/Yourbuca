require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    name: "user_sid",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: "/",
      secure: false,
      expires: false,
    },
  })
);

app.use(cookieParser());

//database connectivity
var mongoDB =
  "mongodb+srv://admin:" +
  process.env.mongoDB +
  "@cluster0.hed3w.mongodb.net/Yourbuca?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//helper functions
const isAuthenticated = require("./helpers/isAuthenticated");

//fetch Controllers
const registerUser = require("./controllers/registerController");
const loginUser = require("./controllers/loginController");
const showUsersController = require("./controllers/showUsersController");
const logoutController = require("./controllers/logoutController");

//ROUTES
app.get("/", isAuthenticated, (req, res) => {
  res.send("hello");
});
app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/showUsers", showUsersController);
app.delete("/logout", logoutController);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
