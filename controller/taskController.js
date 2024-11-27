const taskSchema = require('../Schema/taskSchema');
const catchAsync = require('../utils/catchAsync');
const userSchema = require('../Schema/userSchema');

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

      await userSchema.findByIdAndUpdate(req.user._id, {
        $push: { tasks: task._id },
      });

      return res.status(201).json({
        status: 'success',
        task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getTasks = catchAsync(async (req, res, next) => {});
  updateTask = catchAsync(async (req, res, next) => {});
  deleteTask = catchAsync(async (req, res, next) => {});
}

module.exports = TaskController;
