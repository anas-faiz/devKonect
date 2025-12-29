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
    console.log("🟢 Socket connected:", socket.id);

    socket.on("joinChat", ({ userId, targetUserId }) => {
      if (!userId || !targetUserId) return;

      const roomId = [userId, targetUserId].sort().join("-");
      socket.join(roomId);
    });

    socket.on("sendMessage", async (messageData) => {
      try {
        const { sender, receiver, message } = messageData;

        if (!sender || !receiver || !message?.trim()) return;

        const roomId = [sender, receiver].sort().join("-");

        let chat = await Chat.findOne({
          participants: { $all: [sender, receiver] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [sender, receiver],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: sender,
          message,
        });

        await chat.save();

        const savedMessage = chat.messages.at(-1);

        io.to(roomId).emit("messageReceived", {
          sender,
          receiver,
          message: savedMessage.message,
          createdAt: savedMessage.createdAt,
        });

      } catch (err) {
        console.error("❌ Socket message error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
}

module.exports = initializeSocket;
