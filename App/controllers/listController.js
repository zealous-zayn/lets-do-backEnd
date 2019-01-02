const mongoose = require('mongoose');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');

const ListModel = mongoose.model('ListCreate');

let getAllList = async (req, res) =>{
    const result = await ListModel.find({ }).select().lean().exec()
    try {
        if (check.isEmpty(result)) {
            logger.captureInfo('No User Found', 'List Controller: getAllList')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {

            let apiResponse = response.generate(false, 'All List Details Found', 200, result)
            res.send(apiResponse)
        }
    } catch (err) {
        logger.captureError(err.message, 'List Controller: getAllList', 10)
        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
        res.send(apiResponse)
    }
}

let createList = async (req, res) =>{
    let newList = new ListModel({
        creatorId : req.body.userId,
        creatorName : req.body.creatorName,
        modifierId: req.body.modifierId,
        modifierName: req.body.modifierName,
        listId : req.body.listId,
        listName : req.body.listName,
        privacy : req.body.privacy,
        createdOn : time.now()
    })

    let list = await newList.save()
        try{
            let apiResponse = response.generate(false, "New List Added", 200, list);
            res.send(apiResponse)
        } catch(err){
            logger.captureError(err.message, 'List Controller:createList', 10)
            let apiResponse = response.generate(true, "Failed to create new List", 500, null);
            res.send(apiResponse)
        }
}

let deleteList = async (req, res) => {

    const result = await ListModel.findOneAndDelete({ listId : req.body.listId }).exec()
     
     try{
         if (check.isEmpty(result)) {
             logger.captureInfo('No List Found', 'List Controller: deleteList')
             let apiResponse = response.generate(true, 'No List Found', 404, null)
             res.send(apiResponse)
         } else {
             let apiResponse = response.generate(false, 'Deleted the List successfully', 200, result)
             res.send(apiResponse)
         }
     } catch(err){
         console.log(err)
             logger.captureError(err.message, 'List Controller: deleteList', 10)
             let apiResponse = response.generate(true, 'Failed To delete List', 500, null)
             res.send(apiResponse)
     }
}

let editList = async (req, res) => {
    const {listName, modifierId, modifierName} = req.body; 
    let options = {
        listName,
        modifierId,
        modifierName
    }
    const result = await ListModel.update({ listId: req.body.listId }, options).exec()
     try{
        if (check.isEmpty(result)) {
            logger.captureInfo('No List Found', 'List Controller: editList')
            let apiResponse = response.generate(true, 'No List Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'List details edited', 200, result)
            res.send(apiResponse)
        }
    } catch(err){
        console.log(err)
            logger.captureError(err.message, 'List Controller:editList', 10)
            let apiResponse = response.generate(true, 'Failed To edit List details', 500, null)
            res.send(apiResponse)
    }
}

module.exports = {
    getAllList : getAllList,
    deleteList : deleteList,
    createList : createList,
    editList : editList
}