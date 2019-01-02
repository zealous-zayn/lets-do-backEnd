const express = require('express');
const router = express.Router();
const itemController = require("./../controllers/itemController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth');

let baseUrl = `${appConfig.apiVersion}/users`;

module.exports.setRouter = (app) => {

    app.get(`${baseUrl}/get-all-items`, auth.isAuthorized, itemController.getAllItem);
    /**
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/get-all-items api for Getting all items of User.
     *
     * @apiParam {string} listId of the list. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All Item Details Found",
            "status": 200,
            "data": [
                {
                    "_id": "5c2c4c60cb2d7e8a5463fdb7",
                    "listId": "5wZGUWcj",
                    "itemId": "LqtbT2TI",
                    "itemName": "H",
                    "done": false,
                    "createdOn": "2018-12-30T16:45:05.000Z",
                    "subItems": [],
                    "__v": 0
                }
            ]
        }
    */

    app.post(`${baseUrl}/add-item`, auth.isAuthorized, itemController.addItem);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/add-item api to Add List.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} itemName Name of the item. (body params) (required)
     * @apiParam {string} listId of the list in which item has to add. (body params) (required)
     * @apiParam {string} itemId a unique id for the item. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "New Item Added",
            "status": 200,
            "data": [
                {
                    "listId": "5wZGUWcj",
                    "itemId": "1565741",
                    "itemName": "check",
                    "done": false,
                    "createdOn": "2019-01-02T07:06:51.000Z",
                    "_id": "5c2c630b5d5c156bc0af7962",
                    "subItems": [],
                    "__v": 0
                }
            ]
        }    
    */

    app.post(`${baseUrl}/edit-item`, auth.isAuthorized, itemController.updateItem);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/edit-item api to Update List Details.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} itemId Id of the item. (query params) (required)
     * @apiParam {string} itemName Name of the item. (body params) (required)
     * @apiParam {string} done item status either true or false. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Item details Updated Successfully",
            "status": 200,
            "data": null
        }    
    */

    app.post(`${baseUrl}/delete-item`, auth.isAuthorized, itemController.deleteItem);
     /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/delete-item api to Delete List.
     *
     * @apiParam {string} itemId of the Item to be deleted. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Deleted the Item successfully",
            "status": 200,
            "data": null
        }
    */
    

    app.post(`${baseUrl}/add-sub-item`, auth.isAuthorized, itemController.addSubItems);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/add-sub-item api to Add List.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} subItemName Name of the Sub item. (body params) (required)
     * @apiParam {string} itemId of the Item in which sub item has to add. (body params) (required)
     * @apiParam {string} subItemId a unique id for the item. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "A Subitem Added Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }    
    */

    app.post(`${baseUrl}/edit-sub-item`, auth.isAuthorized, itemController.editSubItem);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/add-sub-item api to Add List.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} subItemName Name of the Sub item. (body params) (required)
     * @apiParam {string} itemId of the Item in which sub item has to add. (body params) (required)
     * @apiParam {string} subItemId a unique id for the item. (body params) (required)
     * @apiParam {string} subItemDone to mark it done or undone. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "A Subitem Added Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }    
    */

    app.post(`${baseUrl}/delete-sub-item`, auth.isAuthorized, itemController.deleteSubItem);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/add-sub-item api to Add List.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} itemId of the Item in which sub item has been added. (body params) (required)
     * @apiParam {string} subItemId a id of the subitem which has to delete. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "A Subitem Added Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }    
    */

    app.post(`${baseUrl}/replace-item`, auth.isAuthorized, itemController.replaceItem);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/replace-item api to Add List.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} data of item in JSON Format. (body/header/query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "Item details Updated Successfully",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }    
    */
   
}