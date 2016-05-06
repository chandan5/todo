var model = require('model');

function getAll(req,res) {
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
}


function getById(req, res) {
    // console.log(req.headers);
    // console.log(req.params);
    var taskId = req.params.taskId;
    console.log(taskId);
    model.Task.findById(taskId)
        .select('description _id')
        .exec()
        .then(function (task) {
            res.json(task);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(404);
        });
}

function create(req,res) {
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
}

function deleteById(req,res) {
    console.log("del req");
    var taskId = req.params.taskId;
    console.log(taskId);
    model.Task.findById(taskId)
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
}

function updateDescription(req,res) {
    console.log("update request");
    var taskId = req.params.taskId;
    var description = req.body.description;
    model.Task.findById(taskId)
        .update({"description":description})
        .exec()
        .then(function(){
            console.log("updated successfully with desc:" + description);
            res.sendStatus(200);
        })
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