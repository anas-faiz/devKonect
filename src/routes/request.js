const express = require("express");
const { userAuth } = require("../middleWares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendconnectionrqst", userAuth, (req, res) => {
  try {

  } catch (error) {
    res.status(404).send("error : " + error.message)
  }
})


module.exports = requestRouter;