/* eslint-disable import/no-extraneous-dependencies */
const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
  name: {
    type: 'String',
    required: [true, 'A user must have a name'],
  },
  email: {
    tpye: 'String',
    required: [true, 'A user must have a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  tasks: [{ type: mongooose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongooose.model('User', userSchema);
