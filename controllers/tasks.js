'use strict';
const model = require('model');
const bluebird = require('bluebird');


function getAll(req,res) {
    bluebird.coroutine(function *() {
        console.log(1);
        let tasks = yield model.Task.find()
            .select('description _id').exec();
        console.log(2);
        res.json(tasks);
        console.log(3);
    })()
        .catch(function(err) {
            console.log(err);
            res.sendStatus(404);
        });
}


function getById(req, res) {
    var taskId = req.params.taskId;
    bluebird.coroutine(function *() {
        let task = yield model.Task.findById(taskId)
            .select('description _id')
            .exec();
        res.json({
            task: task
        });
    })()
        .catch(function () {
            res.sendStatus(400);    
        });
}

function create(req,res) {
    // console.log(req.headers);
    // console.log(req.params);
    // console.log(req);
    console.log(req.body);
    bluebird.coroutine(function *() {
        var newTask = new model.Task({
            description: req.body.description
        });
        var task = yield newTask.save();
        if(!task) {
            throw new Error();
        }
        res.json(task);
    })()
        .catch(function(){
            res.sendStatus(500);
        });
}

function deleteById(req,res) {
    console.log("del req");
    var taskId = req.params.taskId;
    console.log(taskId);
    bluebird.coroutine(function * () {
        yield model.Task.findById(taskId).remove().exec();
        console.log("deleted task with taskId: " + taskId);
        res.end();
    })()
        .catch(function(){
            console.log("couldn't find task id:" + taskId);
            res.sendStatus(400);
        });
}

function updateDescription(req,res) {
    console.log("update request");
    var taskId = req.params.taskId;
    var description = req.body.description;
    bluebird.coroutine(function * () {
        yield model.Task.findById(taskId).update({"description":description}).exec();
        console.log("updated successfully with desc:" + description);
        res.sendStatus(200);
    })()
        .catch(function () {
            console.log("unable to update:"+description);
            res.statusCode(400);
        });
}

module.exports = {
    getAll : getAll,
    getById : getById,
    create : create,
    deleteById : deleteById,
    updateDescription: updateDescription
};