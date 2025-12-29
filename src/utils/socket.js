const socket = require("socket.io");

function initializeSocket(server) {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 New socket connected:", socket.id);

    // Join private chat room
    socket.on("joinChat", ({ userId, targetUserId }) => {
      if (!userId || !targetUserId) return;

      const roomId = [userId, targetUserId].sort().join("-");
      socket.join(roomId);

      console.log(`User joined room: ${roomId}`);
    });

    // Send message
    socket.on("sendMessage", (message) => {
      const { sender, receiver } = message;

      if (!sender || !receiver) return;

      const roomId = [sender, receiver].sort().join("-");

      // Emit to everyone in room (including sender)
      io.to(roomId).emit("messageReceived", message);
      console.log(message)
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
}

module.exports = initializeSocket;
