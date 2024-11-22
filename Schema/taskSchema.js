/* eslint-disable import/no-extraneous-dependencies */
const mongooose = require('mongoose');

const taskSchema = new mongooose.Schema({
  title: {
    type: String,
    required: [true, 'A task must have a title'],
  },
  descrition: {
    type: String,
    required: [true, 'A task must have a description'],
  },
  dueDate: {
    type: Date,
    required: [true, 'A task must have a date'],
  },
  priority: {
    type: String,
    default: 'Low',
    enum: ['Low', 'Medium', 'High'],
  },
  status: {
    type: String,
    default: 'Not Completed',
    enum: ['Completed', 'Not Completed'],
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
});

module.exports = mongooose.model('Task', taskSchema);
