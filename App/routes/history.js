const express = require('express');
const router = express.Router();
const historyController = require("./../controllers/historyController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth');

let baseUrl = `${appConfig.apiVersion}/users`;

module.exports.setRouter = (app) => {
    app.get(`${baseUrl}/get-all-history`, auth.isAuthorized, historyController.getAllHistory);
    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/create-history api to Add history.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the list. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            {   
                "error": false,
                "message": "All Item Details Found",
                "status": 200,
                "data": [
                    {
                        "_id": "5c2775e0f6982a6ca041ea22",
                        "listId": "t9gKa9Cf",
                        "historyId": "8vY3GW1fW",
                        "itemDetails": [],
                        "createdOn": "2018-12-29T13:25:52.000Z",
                        "__v": 0
                    }
                ]
            }
        }
    */

    app.post(`${baseUrl}/delete-history`, auth.isAuthorized, historyController.deleteHistory);
    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/delete-history api to Delete history(Latest Object will be deleted).
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the List. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "History Deleted",
            "status": 200,
            "data": [
                {
                   "_id": "5c2775e0f6982a6ca041ea22",
                    "listId": "t9gKa9Cf",
                    "historyId": "8vY3GW1fW",
                    "itemDetails": [],
                    "createdOn": "2018-12-29T13:25:52.000Z",
                    "__v": 0
                }
            ]
        }
    */

    app.post(`${baseUrl}/create-history`, auth.isAuthorized, historyController.createHistory);
    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/create-history api to Add history.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the list. (body params) (required)
     * @apiParam {string} key Action of the history. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            {   
                "error": false,
                "message": "New History Added",
                "status": 200,
                "data":[
                        { listId: '9sTB6jHB',
                        historyId: 'HdNwy5gkJ',
                        itemDetails: [],
                        createdOn: 2019-01-02T07:40:10.000Z,
                        _id: 5c2c6ada3e249c383844911f,
                        __v: 0 } 
                ]
            }
        }
    */

    app.post(`${baseUrl}/update-history`, auth.isAuthorized, historyController.updateHistory);
    /**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/update-history api to Delete history(Latest Object will be deleted).
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the List. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "History Deleted",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
    */
}

