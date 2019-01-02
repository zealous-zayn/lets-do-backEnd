const express = require('express');
const router = express.Router();
const listController = require("./../controllers/listController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth');

let baseUrl = `${appConfig.apiVersion}/users`;

module.exports.setRouter = (app) =>{
    
    app.get(`${baseUrl}/get-all-list`, auth.isAuthorized, listController.getAllList);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/get-all-list:userId api for Getting all Lists of User.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All List Details Found",
            "status": 200,
            "data": [
                {
                    "_id": "5c22301ffbbd3b3b543a9874",
                    "creatorId": "ddHvMnAIC",
                    "listId": "e-Y5b-cQd",
                    "listName": "hell",
                    "creatorName": "Arfi Khan",
                    "modifierId": "kqdFThCqv",
                    "modifierName": "Faisal khan",
                    "privacy": true,
                    "createdOn": "2018-12-25T13:26:55.000Z",
                    "__v": 0
                }
            ]
        }
    */


    app.post(`${baseUrl}/edit-list`, auth.isAuthorized, listController.editList);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/edit-list api to Update List Details.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listId Id of the List. (query params) (required)
     * @apiParam {string} listName Name of the List. (body params) (required)
     * @apiParam {string} modifierId User Id of the user. (body params) (required)
     * @apiParam {string} modifierName User Name of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "List details Edited",
            "status": 200,
            "data": null
        }    
    */

    app.post(`${baseUrl}/delete-list`, auth.isAuthorized, listController.deleteList);
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/delete-list api to Delete List.
     *
     * @apiParam {string} ListId ListId of the List to be deleted. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Deleted the List successfully",
            "status": 200,
            "data": null
        }
    */


    app.post(`${baseUrl}/create-list`, auth.isAuthorized, listController.createList)
    /**
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/create-list api to Add List.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} listName Name of the List. (body params) (required)
     * @apiParam {string} userId of the user creating letsDo. (body params) (required)
     * @apiParam {string} creatorName User Name of the user creating letsDo. (body params) (required)
     * @apiParam {string} modifierId User Id of the user modifying letsDo. (body params) (required)
     * @apiParam {string} modifierName User Name of the user modifying letsDo. (body params) (required)
     * @apiParam {string} privacy Mode of the letsDo either true o false. (body params) (required)
     * @apiParam {string} listId an unique id for list in letsDo. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "List Created",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5bb87ee3625e5006d41f786d",
                "createdOn": "2018-10-06T09:22:43.000Z",
                "privacy": true,
                "modifierName": "Faisal Khan",
                "modifierId": "SkBEHfS97",
                "creatorName": "Faisal Khan",
                "listCreatorId": "kqdFThCqv",
                "listName": "New",
                "listId": "SknkJ-UcX"
            }
        }    
    */
}