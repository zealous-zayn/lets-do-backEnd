const mongoose = require('mongoose');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');

const FriendModel = mongoose.model('Friend');
const UserModel = mongoose.model('User')


let getAllFriends = async (req, res) => {
    const result = await FriendModel.find({ 'userId': req.query.userId }).select().lean().exec()
    try {
        if (check.isEmpty(result)) {
            logger.captureInfo('No User Found', 'Friend Controller: getAllFriends')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {

            let apiResponse = response.generate(false, 'All Freinds Details Found', 200, result)
            res.send(apiResponse)
        }
    } catch (err) {
        logger.captureError(err.message, 'User Controller: getAllFriends', 10)
        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
        res.send(apiResponse)
    }
}

let getAllFilterUsers = async (req, res) => {
    let data = req.query.userIdArray
    let userIds = data.split(",")
    const result = await UserModel.find({ userId:{$nin: userIds} }).select().lean().exec()
    try {
        if (check.isEmpty(result)) {
            logger.captureInfo('No User Found', 'Friend Controller: getAllFilterUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {

            let apiResponse = response.generate(false, 'All User Details Found', 200, result)
            res.send(apiResponse)
        }
    } catch (err) {
        logger.captureError(err.message, 'User Controller: getAllFilterUser', 10)
        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
        res.send(apiResponse)
    }
}
let sendRequestFunction = async (req, res) => {
    try {
        await new Promise(async (resolve) => {
            let retriveDetails = await FriendModel.findOne({ userId: req.body.senderId })
            if (check.isEmpty(retriveDetails)) {
                let newUser = new FriendModel({
                    userId: req.body.senderId,
                    requestSent: {
                                receiverId: req.body.receiverId,
                                receiverName: req.body.receiverName
                        }
                });
                newUser.save((err, result) => {
                    if (err) {
                        logger.captureError(err.message, 'userController: sendRequestFunction', 10)
                        let apiResponse = response.generate(true, 'Failed to Send Request', 500, null)
                        res.send(apiResponse)
                    } else {
                        resolve(result)
                    }
                })
            } else {
                let senderOptions = {
                    $push: {
                        requestSent: {
                            $each: [{
                                receiverId: req.body.receiverId,
                                receiverName: req.body.receiverName
                            }]
                        }
                    }
                }
                let result = await FriendModel.updateOne({ 'userId': req.body.senderId }, senderOptions).exec()
                try {
                    if (check.isEmpty(result)) {
                        logger.captureInfo('No User Found', 'Friend Controller: sendRequestFunction')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        resolve(result)
                    }
                } catch (err) {
                    logger.captureError(err.message, 'User Controller: sendRequestFunction', 10)
                    let apiResponse = response.generate(true, 'Failed To Update User Details', 500, null)
                    res.send(apiResponse)
                }
            }
        })

        let result = await new Promise(async (resolve) => {
            let retriveDetails = await FriendModel.findOne({ userId: req.body.receiverId })
            if (check.isEmpty(retriveDetails)) {
                let newUser = new FriendModel({
                    userId: req.body.receiverId,
                    requestReceived: {
                                senderId: req.body.senderId,
                                senderName: req.body.senderName
                        }
                });
                newUser.save((err, result) => {
                    if (err) {
                        logger.captureError(err.message, 'userController: sendRequestFunction', 10)
                        let apiResponse = response.generate(true, 'Failed to Send Request', 500, null)
                        res.send(apiResponse)
                    } else {
                        resolve(result)
                    }
                })
            } else {
                let receiverOptions = {
                    $push: {
                        requestReceived: {
                            $each: [{
                                senderId: req.body.senderId,
                                senderName: req.body.senderName
                            }]
                        }
                    }
                }
                let result = await FriendModel.updateOne({ 'userId': req.body.receiverId }, receiverOptions).exec()
                try {
                    if (check.isEmpty(result)) {
                        logger.captureInfo('No User Found', 'Friend Controller: sendRequestFunction')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        resolve(result)
                    }
                } catch (err) {
                    logger.captureError(err.message, 'User Controller: sendRequestFunction', 10)
                    let apiResponse = response.generate(true, 'Failed To Update User Details', 500, null)
                    res.send(apiResponse)
                }
            }
        })
        let apiResponse = response.generate(false, 'Request has been sent Successful', 200, result)
        res.status(200)
        res.send(apiResponse)

    } catch (err) {
        console.log("errorhandler");
        console.log(err);
        res.status(err.status)
        res.send(err)
    }
}

let acceptRequestFunction = async (req, res) => {
    try {
        await new Promise(async (resolve) => {
            let senderOptions = {
                $push: {
                    friends: {
                        $each: [{
                            friendId: req.body.receiverId,
                            friendName: req.body.receiverName
                        }]
                    }
                }
            }
            let result = await FriendModel.updateOne({ 'userId': req.body.senderId }, senderOptions).exec()
            try {
                if (check.isEmpty(result)) {
                    logger.captureInfo('No User Found', 'Friend Controller: acceptRequestFunction')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    resolve(result)
                }
            } catch (err) {
                logger.captureError(err.message, 'User Controller: acceptRequestFunction', 10)
                let apiResponse = response.generate(true, 'Failed To Add Friend Details', 500, null)
                res.send(apiResponse)
            }
        })

        await new Promise(async (resolve) => {
            let receiverOptions = {
                $push: {
                    friends: {
                        $each: [{
                            friendId: req.body.senderId,
                            friendName: req.body.senderName
                        }]
                    }
                }
            }
            let result = await FriendModel.updateOne({ 'userId': req.body.receiverId }, receiverOptions).exec()
            try {
                if (check.isEmpty(result)) {
                    logger.captureInfo('No User Found', 'Friend Controller: acceptRequestFunction')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    resolve(result)
                }
            } catch (err) {
                logger.captureError(err.message, 'User Controller: acceptRequestFunction', 10)
                let apiResponse = response.generate(true, 'Failed To Add Friend Details', 500, null)
                res.send(apiResponse)
            }
        })

        await new Promise(async (resolve) => {
            let senderOptions = {
                $pull: {
                    requestSent: {
                        receiverId: req.body.receiverId,
                        receiverName: req.body.receiverName
                    }
                }
            }
            let result = await FriendModel.updateOne({ 'userId': req.body.senderId }, senderOptions).exec()
            try {
                if (check.isEmpty(result)) {
                    logger.captureInfo('No User Found', 'Friend Controller: acceptRequestFunction')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    resolve(result)
                }
            } catch (err) {
                logger.captureError(err.message, 'User Controller: acceptRequestFunction', 10)
                let apiResponse = response.generate(true, 'Failed To Update User Details', 500, null)
                res.send(apiResponse)
            }
        })

        let result = await new Promise(async (resolve) => {
            let receiverOptions = {
                $pull: {
                    requestReceived: {
                        senderId: req.body.senderId,
                        senderName: req.body.senderName
                    }
                }
            }
            let result = await FriendModel.updateOne({ 'userId': req.body.receiverId }, receiverOptions).exec()
            try {
                if (check.isEmpty(result)) {
                    logger.captureInfo('No User Found', 'Friend Controller: acceptRequestFunction')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    resolve(result)
                }
            } catch (err) {
                logger.captureError(err.message, 'User Controller: acceptRequestFunction', 10)
                let apiResponse = response.generate(true, 'Failed To Update Receiver end', 500, null)
                res.send(apiResponse)
            }
        })

        let apiResponse = response.generate(false, 'A Friend has been added in your Friend list Successfully', 200, result)
        res.status(200)
        res.send(apiResponse)

    } catch (err) {
        console.log("errorhandler");
        console.log(err);
        res.status(err.status)
        res.send(err)

    }
}

let cancelRequest = async (req, res) => {
   try{ 
    await new Promise(async (resolve) => {
        let senderOptions = {
            $pull: {
                requestSent: {
                    receiverId: req.body.receiverId,
                    receiverName: req.body.receiverName
                }
            }
        }
        let result = await FriendModel.updateOne({ 'userId': req.body.senderId }, senderOptions).exec()
        try {
            if (check.isEmpty(result)) {
                logger.captureInfo('No User Found', 'Friend Controller: cancelRequest')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                resolve(result)
            }
        } catch (err) {
            logger.captureError(err.message, 'User Controller: cancelRequest', 10)
            let apiResponse = response.generate(true, 'Failed To Caancel Request', 500, null)
            res.send(apiResponse)
        }
    })

    let result = await new Promise(async (resolve) => {
        let receiverOptions = {
            $pull: {
                requestReceived: {
                    senderId: req.body.senderId,
                    senderName: req.body.senderName
                }
            }
        }
        let result = await FriendModel.updateOne({ 'userId': req.body.receiverId }, receiverOptions).exec()
        try {
            if (check.isEmpty(result)) {
                logger.captureInfo('No User Found', 'Friend Controller: cancelRequest')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                resolve(result)
            }
        } catch (err) {
            logger.captureError(err.message, 'User Controller: cancelRequest', 10)
            let apiResponse = response.generate(true, 'Failed To Update On receiver end', 500, null)
            res.send(apiResponse)
        }
    })

    let apiResponse = response.generate(false, 'A Request has been cancelled successfully', 200, result)
    res.status(200)
    res.send(apiResponse)

} catch (err) {
    console.log("errorhandler");
    console.log(err);
    res.status(err.status)
    res.send(err)

}
}

let rejectRequest = async (req, res) => {
    try{ 
     await new Promise(async (resolve) => {
         let senderOptions = {
             $pull: {
                requestReceived: {
                     senderId: req.body.senderId,
                     senderName: req.body.senderName
                 }
             }
         }
         let result = await FriendModel.updateOne({ 'userId': req.body.receiverId }, senderOptions).exec()
         try {
             if (check.isEmpty(result)) {
                 logger.captureInfo('No User Found', 'Friend Controller: cancelRequest')
                 let apiResponse = response.generate(true, 'No User Found', 404, null)
                 res.send(apiResponse)
             } else {
                 resolve(result)
             }
         } catch (err) {
             logger.captureError(err.message, 'User Controller: cancelRequest', 10)
             let apiResponse = response.generate(true, 'Failed To Caancel Request', 500, null)
             res.send(apiResponse)
         }
     })
 
     let result = await new Promise(async (resolve) => {
         let receiverOptions = {
             $pull: {
                 requestSent: {
                     receiverId: req.body.receiverId,
                     receiverName: req.body.receiverName
                 }
             }
         }
         let result = await FriendModel.updateOne({ 'userId': req.body.senderId }, receiverOptions).exec()
         try {
             if (check.isEmpty(result)) {
                 logger.captureInfo('No User Found', 'Friend Controller: cancelRequest')
                 let apiResponse = response.generate(true, 'No User Found', 404, null)
                 res.send(apiResponse)
             } else {
                 resolve(result)
             }
         } catch (err) {
             logger.captureError(err.message, 'User Controller: cancelRequest', 10)
             let apiResponse = response.generate(true, 'Failed To Update On receiver end', 500, null)
             res.send(apiResponse)
         }
     })
 
     let apiResponse = response.generate(false, 'A Request has been Rejected successfully', 200, result)
     res.status(200)
     res.send(apiResponse)
 
 } catch (err) {
     console.log("errorhandler");
     console.log(err);
     res.status(err.status)
     res.send(err)
 
 }
 }

 let unFriend = async (req, res) => {
    try{ 
     await new Promise(async (resolve) => {
         let senderOptions = {
             $pull: {
                 friends: {
                     friendId: req.body.friendId,
                     friendName: req.body.friendName
                 }
             }
         }
         let result = await FriendModel.updateOne({ 'userId': req.body.userId }, senderOptions).exec()
         try {
             if (check.isEmpty(result)) {
                 logger.captureInfo('No User Found', 'Friend Controller: unFriend')
                 let apiResponse = response.generate(true, 'No User Found', 404, null)
                 res.send(apiResponse)
             } else {
                 resolve(result)
             }
         } catch (err) {
             logger.captureError(err.message, 'User Controller: unFriend', 10)
             let apiResponse = response.generate(true, 'Failed To Caancel Request', 500, null)
             res.send(apiResponse)
         }
     })
 
     let result = await new Promise(async (resolve) => {
         let receiverOptions = {
             $pull: {
                 friends: {
                     friendId: req.body.userId,
                     friendName: req.body.userName
                 }
             }
         }
         let result = await FriendModel.updateOne({ 'userId': req.body.friendId }, receiverOptions).exec()
         try {
             if (check.isEmpty(result)) {
                 logger.captureInfo('No User Found', 'Friend Controller: unFriend')
                 let apiResponse = response.generate(true, 'No User Found', 404, null)
                 res.send(apiResponse)
             } else {
                 resolve(result)
             }
         } catch (err) {
             logger.captureError(err.message, 'User Controller: unFriend', 10)
             let apiResponse = response.generate(true, 'Failed To Update On receiver end', 500, null)
             res.send(apiResponse)
         }
     })
 
     let apiResponse = response.generate(false, 'Successfully Deleted the Friend', 200, result)
     res.status(200)
     res.send(apiResponse)
 
 } catch (err) {
     console.log("errorhandler");
     console.log(err);
     res.status(err.status)
     res.send(err)
 
 }
 }
let deleteUser = async (req, res) => {

    const result = await FriendModel.findOneAndDelete({ 'userId': req.body.userId }).exec()
     
     try{
         if (check.isEmpty(result)) {
             logger.captureInfo('No User Found', 'User Controller: deleteUser')
             let apiResponse = response.generate(true, 'No User Found', 404, null)
             res.send(apiResponse)
         } else {
             let apiResponse = response.generate(false, 'Deleted the user successfully', 200, result)
             res.send(apiResponse)
         }
     } catch(err){
         console.log(err)
             logger.captureError(err.message, 'User Controller: deleteUser', 10)
             let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
             res.send(apiResponse)
     }
 
 
 }// end delete user

module.exports = {
    getAllFriends: getAllFriends,
    sendRequestFunction: sendRequestFunction,
    acceptRequestFunction: acceptRequestFunction,
    deleteUser : deleteUser,
    cancelRequest : cancelRequest,
    rejectRequest : rejectRequest,
    unFriend : unFriend,
    getAllFilterUsers: getAllFilterUsers
}