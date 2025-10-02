const mongoose = require('mongoose');
const { type } = require('os');
const validator = require('validator')
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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Not a valid Email : "+ value)
            }
        }
    },
    password:{
        type: String,
        required:true,
        validate(value){
            if(validator.isStrongPassword(value)){
                throw new Error ("enter a strong password : weak password "+ value)
            }
        }
    },
    age:{
        type: Number,
        min:18
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female", "others"],
        //required: true  // optional, if you want gender to be mandatory
    },

    photoUrl:{
        type: String,
        default: "https://i.pinimg.com/474x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("not a valid photo URL : " + value)
            }
        }

    },
    skills:{
        type: [String],
        lowercase: true,

    },
    about:{
        type: String,
        default: "hehehe",
        maxLength: 100,
    }


},{
    timestamps: true
})

const User = mongoose.model('user',userSchema);

module.exports = User;