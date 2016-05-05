var express = require('express');

var model = require('./model');

model.connectDB();

var app = express();

// console.log(model.Task);

app.get('/tasks', function(req, res) {
    model.Task.find()
        .select('description _id')
        .exec()
        .then(function (tasks) {
            throw new Error();
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(404);
        });
});

// var task1 = new model.Task({description: 'task1'});
// task1.save(function(err){
//    if(err)
//        console.log(err);
//     else
//        console.log(task1.description);
// });

app.listen(8080);