var express = require('express');

var model = require('./model');

model.connectDB();

var app = express();

// console.log(model.Task);

app.get('/tasks', function(req, res) {
    model.Task.find().exec(function(err, tasks){
        if(err) {
            console.log("404");
            res.statusCode(404);
            res.end();
        }
        if(tasks) {
            console.log(tasks);
            res.send(tasks);
        }
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