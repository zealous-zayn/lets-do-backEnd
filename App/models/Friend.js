'use strict'

const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    let friendSchema = new Schema({
        userId: {
            type: String,
            default: '',
            index: true,
            unique: true
        },

        friends : {
            type : [{
                friendId : {
                    type: String,
                    default: ''
                },

                friendName : {
                    type: String,
                    default: ''
                }
            }]
        },

        requestReceived : {
            type : [{
                senderId : {
                    type: String,
                    default: ''
                },

                senderName : {
                    type : String,
                    default: ''
                }
            }]
        },

        requestSent: {
            type : [{
                receiverId : {
                    type: String,
                    default : ""
                },

                receiverName: {
                    type: String,
                    default:''
                }
            }]
        }
    });


    module.exports = mongoose.model('Friend', friendSchema)