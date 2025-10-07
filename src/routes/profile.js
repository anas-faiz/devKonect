const express = require("express");
const {userAuth} = require("./middleWares/auth")

const profileRoter = express.Router();


profileRouter.get("/profile",userAuth, async(req,res)=>{
 try {
    const user = req.user;
    res.send(user);
 } catch (error) {
      res.status(404).send("ERROR : " + error.message);
 }

})

module.exports = profileRoter;