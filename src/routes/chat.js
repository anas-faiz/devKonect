const express = require ("express");
const { userAuth } = require("../middleWares/auth");
const Chat = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:receiver", userAuth, async (req,res)=>{
    try{    

        const { receiver } = req.params;

        const sender = req.user._id;

        let chat = await Chat.findOne({
            participants: { $all:[sender,receiver]}
        });

        if(!chat){
            chat = new Chat({
                participants : [sender,receiver],
                messages: [],
            });

            await chat.save();
        }

        res.json(chat);

    }catch(err){
        console.error(err)
    }
})


module.exports = chatRouter;