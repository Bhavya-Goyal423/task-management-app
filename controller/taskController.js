const taskSchema = require('../Schema/taskSchema');
const catchAsync = require('../utils/catchAsync');

class TaskController {
  createTask = async (req, res, next) => {
    try {
      const { title, description, priority, status, dueDate } = req.body;

      const task = await taskSchema.create({
        title,
        description,
        dueDate,
        priority,
        status,
        dueDate,
        createdBy: req.user._id,
      });

      return res.status(201).json({
        status: 'success',
        task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getTask = catchAsync(async (req, res, next) => {});
  updateTask = catchAsync(async (req, res, next) => {});
  deleteTask = catchAsync(async (req, res, next) => {});
}

module.exports = TaskController;
