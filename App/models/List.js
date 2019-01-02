const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = new Schema({
    creatorId : {
        type: String,
        default: '',
    },

    listId : {
        type : String,
        default:'',
        unique: true
    },

    listName : {
        type : String,
        default : ''
    },

    creatorName : {
        type: String,
        default: ''
    },

    modifierId : {
        type: String,
        default: ""
    },
    
    modifierName : {
        type: String,
        default: ""
    },

    privacy : {
        type : Boolean,
        default : false
    },

    createdOn : {
        type: Date,
        default: ""
    }
})

module.exports = mongoose.model('ListCreate', listSchema)