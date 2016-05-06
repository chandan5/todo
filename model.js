var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    description: { type: String, required : true}
}, {
    versionKey: false
});

var Task = mongoose.model('Task',taskSchema);

module.exports = {
    Task : Task
};