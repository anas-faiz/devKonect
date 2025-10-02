const express = require("express");
const { connectDB } = require("./config/dataBase");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");
const { after } = require("node:test");
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating a new instance in the database
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(404).send("user not added,something went wrong: " + err.message);
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const findUser = await User.find({ email: userEmail });
    if (findUser.length == 0) {
      res.status(401).send("no user found");
    } else {
      res.send(findUser);
    }
  } catch (error) {
    res.status(404).send("something went wrong : " + error.message);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length == 0) {
      res.status(400).send("feed not detected");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(404).send("Something went wrong: " + error.message);
  }
});
app.patch("/user", async (req, res) => {
  const { userId, email, ...data } = req.body;

  try {
    let user;

    if (userId) {
      // Update by ID
      user = await User.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true,
          runValidators: true},
        
      );
    } else if (email) {
      // Update by Email
      user = await User.findOneAndUpdate(
        { email },
        { $set: data },
        { new: true,
          runValidators: true},
        
      );
    } else {
      return res.status(400).send("Provide either userId or email");
    }

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user delted sucessfully");
  } catch (error) {
    res.status(404).send("user not deleted: " + error.message);
  }
});

app.use("/", (err, req, res, next) => {
  res.status(500).send("something went wrong");
});

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
