const express = require('express');
const { connectDB } = require('./config/dataBase')
const app = express();

const port = process.env.PORT || 4000;


app.use("/",(err,req,res,next)=>{
    res.status(500).send("something went wrong")
})

connectDB()
    .then(()=>{
        console.log('database established')
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    })    
})
.catch((err)=>{
    console.log("dataBase not conncted")
})
