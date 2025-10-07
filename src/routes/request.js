const express = require("express");
const {userAuth} = require("../middleWares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendconnectionrqst", userAuth, (req,res)=>{
  try{
    const user = req.user;

  res.send(user.firstName + " sent a connection request");

  }catch(error){
    res.status(404).send("error : " + error.message)
  }
})


module.exports = requestRouter;