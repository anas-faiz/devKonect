const express = require('express');
const { connectDB } = require('./config/dataBase')
const  User = require('./models/user')
const app = express();

const port = process.env.PORT || 4000;

app.post("/signup",async (req,res)=>{
    
         
    
        const user = new User({
        firstName: 'Anas',
        lastName: 'faiz',
        email: 'anas@faiz.com',
        password: '123@anas',
        });
        try{
     await user.save();
     res.send('user added successfully');
    } catch(err){
        res.status(404).send('user not added something went wrong: ' + err.message)
    }
})

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
