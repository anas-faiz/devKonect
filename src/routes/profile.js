const express = require("express");
const { userAuth } = require("../middleWares/auth")
const { validEditData } = require("../utils/validators")

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const safeUser  = user.toObject();
    safeUser.password = ""
    res.json({
      data:safeUser
    });
  } catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
})
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validEditData(req);
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;

    res.send(safeUser);
  } catch (error) {
    // Always handle errors and send a response
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;