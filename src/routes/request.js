const express = require("express");
const { userAuth } = require("../middleWares/auth");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserID", userAuth, (req, res) => {
  try { 
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserID;
    const status = req.params.status;

    

  } catch (error) {
    res.status(404).send("error : " + error.message)
  }
})


module.exports = requestRouter;