const express = require("express");
const { userAuth } = require("../middleWares/auth");
const Chat = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:receiver", userAuth, async (req, res) => {
  try {
    const { receiver } = req.params;
    const sender = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [sender, receiver] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });

    if (!chat) {
      chat = new Chat({
        participants: [sender, receiver],
        messages: [],
      });

      await chat.save();

      chat = await Chat.findById(chat._id).populate({
        path: "messages.senderId",
        select: "firstName lastName",
      });
    }

    res.status(200).json(chat);

  } catch (err) {
    console.error("❌ Fetch chat error:", err);
    res.status(500).json({ message: "Failed to fetch chat" });
  }
});

module.exports = chatRouter;
