const express = require("express");
const { connectDB } = require("./config/dataBase");
const User = require("./models/user");
const { validSignUpData, validLoginData } = require("./utils/validators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middleWares/auth")
const app = express();


const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());






connectDB()
  .then(() => {
    console.log("database established");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("dataBase not conncted");
  });
