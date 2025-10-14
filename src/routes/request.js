const express = require("express");
const { userAuth } = require("../middleWares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
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

    const existingUser = await User.findById(toUserId);
    if(!existingUser){
      throw new Error ("user does not exist")
    }

    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      fromUserId: fromUserId , toUserId: toUserId
    })

    if(existingConnectionRequest){
      throw new Error ("Request already exists");
    }

    
    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status
    }) 

    const data = await connectionRequest.save();

    res.json({message: req.user.firstName +" request sent successfully to " + existingUser.firstName,
              data : data})

    

  } catch (error) {
    res.status(404).send("error : " + error.message)
  }
})


module.exports = requestRouter;