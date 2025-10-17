const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middleWares/auth');
const ConnectionRequest = require('../models/connectionRequest')

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const logegdInUser = req.user;

        const request = await ConnectionRequest.find({
            toUserId: logegdInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl")

        res.json({
            message: "available connection Request",
            count: request.length,
            data: request
        })

    } catch (error) {
        res.status(404).send("ERROR : " + error.message);
    }

})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ],
        }).populate("fromUserId", "firstName lastName photoUrl")
          .populate("toUserId", "firstName lastName photoUrl")

        const connectionData  = connections.map(row=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({
            message: "available connections",
            count:connectionData.length,
            data: connectionData
        })

    } catch (error) {
        res.status(404).send("ERROR: " + error.message)
    }
})

module.exports = userRouter;