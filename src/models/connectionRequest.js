const mongooose = require("mongooose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type: String,
        enum:{
            value:["accepted","interested","rejected","ignore"],
            message: "{value} is not a status type",
        }
    }
})