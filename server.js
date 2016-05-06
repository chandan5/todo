var express = require('express');
var bodyParser = require('body-parser');
var model = require('./model');

model.connectDB();

var app = express();


// parse application/json
app.use(bodyParser.json())
// console.log(model.Task);

// app.get('/', function() {
//     res.send('index.html');
// });

app.get('/tasks', function(req, res) {
    model.Task.find()
        .select('description _id')
        .exec()
        .then(function (tasks) {
            res.json(tasks);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(404);
        });
});

app.get('/tasks/:taskId', function(req, res) {
    // console.log(req.headers);
    // console.log(req.params);
    var taskId = req.params.taskId;
    console.log(taskId);
    model.Task.find({_id:taskId})
        .select('description _id')
        .exec()
        .then(function (tasks) {
            res.json(tasks[0]);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(404);
        });
});

app.post('/tasks', function(req, res) {
    // console.log(req.headers);
    // console.log(req.params);
    // console.log(req);
    console.log(req.body);

    var newTask = new model.Task({
       description: req.body.description
    });

    newTask.save()
        .then(function(task) {
            res.json({
                task: task
            });
        })
        .catch(function(){
            res.sendStatus(500);
        });
});

app.delete('/tasks/:taskId', function(req,res){
    console.log("del req");
    var taskId = req.params.taskId;
    console.log(taskId);
    model.Task.find({_id:taskId})
        .remove()
        .exec()
        .then(function(){
            console.log("deleted task with taskId: " + taskId);
            res.end();
        })
        .catch(function(){
            console.log("couldn't find task id:" + taskId);
            res.sendStatus(400);
        });
});

app.put('/tasks/:taskId',function(req,res){
    console.log("update request");
    var taskId = req.params.taskId;
    var description = req.body.description;
    model.Task.find({_id:taskId})
        .update({"description":description})
        .exec()
        .then(function(){
            console.log("updated successfully with desc:" + description);
            res.sendStatus(200);
        })
        .catch(function () {
            console.log("unable to update:"+description);
            res,statusCode(400);
        });
});

//
// var task2 = new model.Task({
//    description: "task2"
// });
//
// task2.save()
//     .then(function(){
//         console.log("task2")
//     }).
//     catch(function(){
//         console.log("error in creation of task2");
//     });

app.listen(8080);