/* eslint-disable import/no-extraneous-dependencies */
const mongooose = require('mongoose');

const taskSchema = new mongooose.Schema({
  title: {
    type: String,
    required: [true, 'A task must have a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A task must have a description'],
    trim: true,
  },
  dueDate: {
    type: Date,
    required: [true, 'A task must have a due date'],
  },
  priority: {
    type: String,
    default: 'Low',
    enum: ['Low', 'Medium', 'High'],
    trim: true,
  },
  status: {
    type: String,
    default: 'Not Completed',
    enum: ['Completed', 'Not Completed'],
    trim: true,
  },
  tags: [String],
  createdBy: {
    type: mongooose.Schema.Types.ObjectId,
    ref: 'User',
  },
  activityLogs: [String],
});

taskSchema.pre('save', function (next) {
  if (this.isNew) this.status = 'Not Completed';
  next();
});

module.exports = mongooose.model('Task', taskSchema);
