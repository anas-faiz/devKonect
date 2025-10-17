const express  = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middleWares/auth');
const ConnectionRequest = require('../models/connectionRequest')

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{    
        const logegdInUser = req.user;

        const request = await ConnectionRequest.find({
            toUserId:logegdInUser._id,
            status:"interested"
        }).populate("fromUserId", "firstName lastName photoUrl")

      res.json({message: "available connection Request",
        count: request.length,
        data : request
      })

    }catch(error){
        res.status(404).send("ERROR : " +error.message);
    }

})

module.exports = userRouter;