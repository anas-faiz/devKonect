const express = require('express');
const { connectDB } = require('./config/dataBase')
const  User = require('./models/user');
const { default: mongoose } = require('mongoose');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.post("/signup",async (req,res)=>{         
    //creating a new instance in the database 
        const user = new User(req.body);
     try{
     await user.save();
     res.send('user added successfully');
    } catch(err){
        res.status(404).send('user not added something went wrong: ' + err.message)
    }
})
app.get("/feed",async(req,res)=>{
    const user = req.body.email;
    try{
        const feed = await mongoose.find({})
        if(!feed){
            res.status(400).send("feed not detected")
        }else{
            res.send(feed); 
        }

    }catch(error){
        res.status(404).send('Something went wrong: ' + error.message);
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
