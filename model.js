var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function connectDB() {
    mongoose.set('debug', true)
    mongoose.connect('mongodb://localhost/todo');
}

var taskSchema = new Schema({
    description: { type: String, required : true}
}, {
    versionKey: false
});

var Task = mongoose.model('Task',taskSchema);

module.exports = {
    connectDB : connectDB,
    Task : Task
};