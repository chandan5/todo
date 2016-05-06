const express = require('express');
const taskRouter = express.Router();

const taskController = require('controllers/tasks');

taskRouter.get('/', taskController.getAll);
taskRouter.post('/', taskController.create);
taskRouter.get('/:taskId', taskController.getById);
taskRouter.put('/:taskId', taskController.updateDescription);
taskRouter.delete('/:taskId', taskController.deleteById);


module.exports = taskRouter;
