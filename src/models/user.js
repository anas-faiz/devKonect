const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        lowercase: true,        
    },
    lastName: {
        type: String,        
        minLength: 3,
        maxLength: 50,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    password:{
        type: String,
        required:true,
    },
    age:{
        type: Number,
        min:18
    },
    gender:{
        type: String,
        lowercase: true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }

    },
    photoUrl:{
        type: String,
        default: "https://i.pinimg.com/474x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"

    },
    skills:{
        type: [String],
        lowercase: true,
    },
    about:{
        type: String,
        default: "hehehe",
    }


},{
    timestamps: true
})

const User = mongoose.model('user',userSchema);

module.exports = User;