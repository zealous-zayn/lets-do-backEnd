const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newItemSchema = new Schema({
    listId : {
        type: String,
        default: ""
    },

    itemId : {
        type: String,
        default: "",
        unique: true
    },

    itemName : {
        type: String,
        default: ""
    },

    done : {
        type: Boolean,
        default: false
    },

    subItems : {
        type: [{
            subItemId : {
                type: String,
                default: " ",   
            },
        
            subItemName : {
                type: String,
                default: ""
            },

            subItemDone : {
                type: Boolean,
                default: false
            }
        }]
    },

    createdOn : {
        type: Date,
        default: ''
    }
})

module.exports = mongoose.model('NewItem', newItemSchema)