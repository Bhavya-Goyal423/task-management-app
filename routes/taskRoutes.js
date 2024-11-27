const express = require('express');
const TaskContoller = require('../controller/taskController');
const { protect } = require('../controller/authController');

const taskRouter = express.Router();
const taskController = new TaskContoller();

taskRouter
  .route('/')
  .get(taskController.getTasks)
  .post(protect, taskController.createTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = taskRouter;
