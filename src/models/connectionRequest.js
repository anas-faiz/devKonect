const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      //ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      //ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["accepted", "interested", "rejected", "ignore"],
    },
  },
  { timestamps: true }
);

const ConnectionRequestModel = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
