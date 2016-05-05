var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

function connectDB() {
    mongoose.connect('mongodb://localhost/todo');
}


var Task = mongoose.model('Task', {description: String});

module.exports = {
    connectDB : connectDB,
    Task : Task
};