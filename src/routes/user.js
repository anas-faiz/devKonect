const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middleWares/auth');
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

user_safe_data = "firstName lastName photoUrl skills age gender about";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const logegdInUser = req.user;

        const request = await ConnectionRequest.find({
            toUserId: logegdInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender")

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
        }).populate("fromUserId", "firstName lastName photoUrl age gender")
            .populate("toUserId", "firstName lastName photoUrl age gender")
            .lean()

        const connectionData = connections.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({
            message: "available connections",
            count: connectionData.length,
            data: connectionData
        })

    } catch (error) {
        res.status(404).send("ERROR: " + error.message)
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
            
        limit >50 ? 50 : limit;
        
        const skip = (page-1)*limit;

        const request = await ConnectionRequest.find({
            $or:[{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}]
        }).select("fromUserId toUserId").lean()

        const hideUsers = new Set();

        request.forEach(req =>{
            hideUsers.add(req.fromUserId.toString());
            hideUsers.add(req.toUserId.toString());
        })

        const userInFeed = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideUsers)}},
                {_id: {$ne: loggedInUser._id}}
            ]            
        }).select(user_safe_data).skip(skip).limit(limit).lean()

        res.json({
            message: "Feed fetched successfullt",
            count:userInFeed.length,
            data:userInFeed
        })

    } catch (error) {
        res.status(404).send("ERROR : " + error.message)
    }
})

module.exports = userRouter;