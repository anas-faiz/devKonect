const mongoose = require("mongooose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:{
            value:["accepted","interested","rejected","ignore"],
            message: "{value} is not a status type",
        }
    }
},{timestamps: true})


const ConnectionRequestModel = new Mongoose.model("connectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel