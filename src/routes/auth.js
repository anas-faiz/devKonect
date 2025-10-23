const express = require("express");
const User = require("../models/user");
const { validSignUpData, validLoginData } = require("../utils/validators");
const bcrypt = require("bcrypt");

const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validSignUpData(req);

    const { email, password, firstName, lastName } = req.body;
    //encryption  of password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a new instance in the database
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const validData = ["firstName", "lastName", "email", "password"];
    const allowedData = Object.keys(req.body).every((k) =>
      validData.includes(k)
    );
    if (!allowedData) {
      throw new Error("Only email,password and name are required");
    }
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //vallidating the email
    validLoginData({ email, password });
    //checking for email in db
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user with this email");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("password not valid");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 2 * 3600000)
      });

      const userData = user.toObject();

      delete userData.password

      res.json({
        message: "Login Succesfull",
        data: userData
      });
    }
  } catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
});

authRouter.post("/logout", (req,res)=>{
    res.cookie("token", null , {
        expire: new Date(Date.now),
    })
    res.send("logout successfully !!!")
})


module.exports = authRouter;