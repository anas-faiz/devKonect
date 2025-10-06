const mongoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(

  {
    firstName: {
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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      enum: ["male", "female", "others"],
      //required: true  // optional, if you want gender to be mandatory
    },

    photoUrl: {
      type: String,
      default:
        "https://i.pinimg.com/474x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("not a valid photo URL : " + value);
        }
      },
    },
    skills: {
      type: [String],
      lowercase: true,
    },
    about: {
      type: String,
      default: "hehehe",
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWt = async function () {
  const token = await jwt.sign({ _id: this._id }, "devKonect", { expiresIn: "1d" })

  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, this.password);

  return isPasswordValid;
}

const User = mongoose.model("user", userSchema);

module.exports = User;
