const mongoose = require('mongoose');


const listItemSchema = mongoose.Schema({
    text: {type:String, required:true},
    completed: {type: Boolean, required:true},
    listId: {type: String, required:true}
});

const ListItem = mongoose.model('listitem', listItemSchema);

module.exports = ListItem