const mongoose = require('mongoose');

//model
const todoSchema = new mongoose.Schema({
    item: String,
    status: Boolean
});

mongoose.model('todo', todoSchema);

module.exports = mongoose.model('todo', todoSchema);