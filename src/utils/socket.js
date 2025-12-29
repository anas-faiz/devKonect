const socket = require("socket.io");
const Chat = require("../models/chat");

function initializeSocket(server) {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
  // Join private chat room
    socket.on("joinChat", ({ userId, targetUserId }) => {
      if (!userId || !targetUserId) return;

      const roomId = [userId, targetUserId].sort().join("-");
      socket.join(roomId);
      
    });

    // Send message
    socket.on("sendMessage", async (messageData) => {
      
      
      try{
        const { sender, receiver,message } = messageData;

      if (!sender || !receiver) return;

      const roomId = [sender, receiver].sort().join("-");

      //save chat in database
        let chat = await Chat.findOne({
          participants: { $all: [sender,receiver]}
        })

        if(!chat){
          chat = new Chat({
            participants: [sender,receiver],
            messages:[],
          })
        }

        chat.messages.push({
          senderId: sender,
          message
        })

        await chat.save        

      // Emit to everyone in room (including sender)
      io.to(roomId).emit("messageReceived", messageData);
      
      }catch(err){
        console.error(err)
      }

    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
}

module.exports = initializeSocket;
