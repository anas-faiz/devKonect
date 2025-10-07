const express = require("express");
const { connectDB } = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
 
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB()
  .then(() => {
    console.log("database established");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("dataBase not conncted");
  });
