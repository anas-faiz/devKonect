const express = require("express");
const { connectDB } = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
const http = require('http')
require("dotenv").config()

const port = process.env.PORT || 4000;

// require("./utils/cronjob")

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const initializeSocket = require("./utils/socket");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter );

const server = http.createServer(app)

initializeSocket(server)


connectDB()
  .then(() => {
    console.log("database established");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("dataBase not conncted");
  });