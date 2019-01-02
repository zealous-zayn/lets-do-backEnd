const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    listId : {
        type: String,
        default: "",
    },

    historyId : {
        type: String,
        default: "",
    },

    itemDetails : [],

    createdOn : {
        type : Date,
        default : ''
    }
})

module.exports = mongoose.model('History', historySchema)