const express = require("express");
const {userAuth} = require("../middleWares/auth")
const {validEditData} = require("../utils/validators")

const profileRouter = express.Router();


profileRouter.get("/profile/view",userAuth, async(req,res)=>{
 try {
    const user = req.user;
    res.send(user);
 } catch (error) {
      res.status(404).send("ERROR : " + error.message);
 }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
   try {
      if(!validEditData(req)){
         throw new Error ("invalid edit attempt")
      }

      const user = req.user;

      Object.keys(req.body).forEach((keys)=>user[keys] = req.body[keys]);
      await user.save();
      res.send(user);     
      
   } catch (error) {
      res.status(400).send("Error : " + error.message)
   }
   

})

module.exports = profileRouter;