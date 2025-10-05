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

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //vallidating the email
    validLoginData({ email, password });
    //checking for email in db
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Enter the right emaiil");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("ENter Right Password");
    } else {
      const token = await jwt.sign({ _id: user._id },  "devKonect");
      res.cookie("token", token);
      res.send("Login Successfully");
    }
  } catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
});

app.get("/profile",userAuth, async(req,res)=>{
 try {
    const user = req.user;
    res.send(user);
 } catch (error) {
      res.status(404).send("ERROR : " + error.message);
 }

})


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
