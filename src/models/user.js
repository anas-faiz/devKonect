const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  },
  photoUrl: {
    type: String,
    default:
      "https://i.pinimg.com/474x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Not a valid photo URL: " + value);
      }
    },
  },
  skills: {
    type: [String],
    lowercase: true,
  },
  about: {
    type: String,
    default: "Hey there! I'm using DevKonnect.",
    maxLength: 100,
  },
}, { timestamps: true });

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// Generate JWT token
userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, "devKonect", { expiresIn: "1d" });
};

// Validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  return await bcrypt.compare(passwordInputByUser, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
