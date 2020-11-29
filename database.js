const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mario:mario123@cluster0.zvbjm.mongodb.net/todoList?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true });
mongoose.set('useFindAndModify', false);
module.exports = mongoose;