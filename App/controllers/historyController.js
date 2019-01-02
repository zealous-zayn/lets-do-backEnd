const mongoose = require('mongoose');
const shortId = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');

const ItemModel = mongoose.model('NewItem');
const HistoryModel = mongoose.model('History');

let getAllHistory = async (req, res) => {
    const result = await HistoryModel.find({ listId: req.query.listId }).select().lean().exec()
    try {
        if (check.isEmpty(result)) {
            logger.captureInfo('No List Found', 'History Controller: getAllHistory')
            let apiResponse = response.generate(true, 'No List Found', 404, null)
            res.send(apiResponse)
        } else {

            let apiResponse = response.generate(false, 'All Item Details Found', 200, result)
            res.send(apiResponse)
        }
    } catch (err) {
        logger.captureError(err.message, 'History Controller: getAllHistory', 10)
        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
        res.send(apiResponse)
    }
}

let createHistory = async (req, res) => {
    let retrivedListDetails = await new Promise(async (resolve) => {
        let details = await ItemModel.find({ listId: req.body.listId })
        try {
            if (check.isEmpty(details)) {
                logger.captureInfo('No List Found', 'History Controller: CreateHistory')
                let apiResponse = response.generate(true, 'No List Found', 404, null)
                resolve([])
            } else {

                resolve(details)
            }
        } catch (err) {
            logger.captureError(err.message, 'History Controller: CreateHistory', 10)
            let apiResponse = response.generate(true, 'Failed To Find List', 500, null)
            res.send(apiResponse)
        }
    })

    let result = await new Promise(async (resolve) => {
        let historyDetails = await HistoryModel.find({ listId: req.body.listId })
        try {
            if (check.isEmpty(historyDetails)) {
                let newHistory = new HistoryModel({
                    listId: req.body.listId,
                    historyId: shortId.generate(),
                    createdOn: time.now(),
                    itemDetails: 
                            [{
                             key: req.body.key, 
                             itemsArray : retrivedListDetails
                             }]
                    
                })

                let history = await newHistory.save()
                try {
                    let apiResponse = response.generate(false, "New History Added", 200, history);
                    resolve(apiResponse)
                } catch (err) {
                    logger.captureError(err.message, 'History Controller: CreateHistory', 10)
                    let apiResponse = response.generate(true, 'Failed To Create History', 500, null)
                    res.send(apiResponse)
                }
            } else {
                let options = {
                    $push: {
                        itemDetails: 
                            {
                                key: req.body.key, 
                                itemsArray : retrivedListDetails
                                }
                    }
                }

                let historyDetails = await HistoryModel.update({ listId: req.body.listId }, options)
                try {
                    let apiResponse = response.generate(false, "New History Added", 200, historyDetails);
                    resolve(apiResponse)
                } catch (err) {
                    logger.captureError(err.message, 'History Controller: CreateHistory', 10)
                    let apiResponse = response.generate(true, 'Failed To Create History', 500, null)
                    res.send(apiResponse)
                }

            }
        } catch (err) {
            logger.captureError(err.message, 'History Controller: CreateHistory', 10)
            let apiResponse = response.generate(true, 'Failed To Find History', 500, null)
            res.send(apiResponse)
        }
    })
    console.log(result)
    let apiResponse = response.generate(false, 'History Created Successfully', 200, result)
    res.status(200)
    res.send(apiResponse)

}

let deleteHistory = async (req, res)=>{
    const result = await HistoryModel.findOneAndDelete({ listId : req.body.listId }).exec()
     
     try{
         if (check.isEmpty(result)) {
             logger.captureInfo('No History Found', 'History Controller: deleteHistory')
             let apiResponse = response.generate(true, 'No History Found', 404, null)
             res.send(apiResponse)
         } else {
             let apiResponse = response.generate(false, 'Deleted the History successfully', 200, result)
             res.send(apiResponse)
         }
     } catch(err){
         console.log(err)
             logger.captureError(err.message, 'History Controller: deleteHistory', 10)
             let apiResponse = response.generate(true, 'Failed To delete List', 500, null)
             res.send(apiResponse)
     }
}

let updateHistory = async (req, res)=>{
    const result = await HistoryModel.updateOne({ listId : req.body.listId }, {$pop : {itemDetails : 1}}).exec()
     
     try{
         if (check.isEmpty(result)) {
             logger.captureInfo('No History Found', 'History Controller: UpdateHistory')
             let apiResponse = response.generate(true, 'No History Found', 404, null)
             res.send(apiResponse)
         } else {
             let apiResponse = response.generate(false, 'Updated the History successfully', 200, result)
             res.send(apiResponse)
         }
     } catch(err){
         console.log(err)
             logger.captureError(err.message, 'History Controller: UpdateHistory', 10)
             let apiResponse = response.generate(true, 'Failed To Update List', 500, null)
             res.send(apiResponse)
     }
}

module.exports = {
    getAllHistory : getAllHistory,
    createHistory : createHistory,
    deleteHistory : deleteHistory,
    updateHistory : updateHistory
}