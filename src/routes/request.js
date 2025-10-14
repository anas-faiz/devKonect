const express = require("express");
const { userAuth } = require("../middleWares/auth");
const ConnectionRequestModel = require("../models/connectionRequest")
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserID", userAuth, async (req, res) => {
  try { 
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserID;
    const status = req.params.status;
    
    const allowedStatus = ["interested","ignore"]

    const existingStatus = allowedStatus.includes(status);

    if(!existingStatus){
      throw new Error ("unallowed status action")
    }

    
    
    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status
    }) 

    const data = await connectionRequest.save();

    res.json({message:"request sent successfully to ${} ",
              data : data})

    

  } catch (error) {
    res.status(404).send("error : " + error.message)
  }
})


module.exports = requestRouter;