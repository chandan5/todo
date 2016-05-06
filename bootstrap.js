var mongoose = require('mongoose');

var connectDB = function () {
    return new Promise(function(resolve, reject) {
        mongoose.set('debug', true);
        mongoose.connection.on('open', function (ref) {
            console.log('Connected to mongo server.');
            resolve("DB Connected");
        });
        mongoose.connection.on('error', function (err) {
            console.log('Could not connect to mongo server!');
            console.log(err);
            reject(err);
        });
        mongoose.connect('mongodb://localhost/todo');
    });
}

module.exports = {
    connectDB: connectDB
};