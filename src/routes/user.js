const express  = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middleWares/auth');

userRouter.get("/user",userAuth,async(req,res)=>{

})

module.exports = userRouter;