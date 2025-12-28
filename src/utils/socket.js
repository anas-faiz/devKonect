const socket = require('socket.io')

function initializeSocket(server){
    
    const io = socket(server,{
      cors:{
        origin: 'http://localhost:5173',
      }
    })
    
    io.on("connection",(socket)=>{
      //handle connection
      socket.on("joinChat",()=>{});

      socket.on("sendMessage",()=>{});

      socket.on("disconnect",()=>{});

    })
    

}

module.exports = initializeSocket