/* eslint-disable import/no-extraneous-dependencies */
const mongooose = require('mongoose');
const validator = require('validator');

const userSchema = new mongooose.Schema({
  name: {
    type: 'String',
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [40, 'A name must have <= 40 characters'],
  },
  email: {
    type: 'String',
    required: [true, 'A user must have a email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    validate: {
      validator: (value) =>
        validator.matches(
          value,
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{9,}$/
        ),
      message:
        'Password must be at least 9 characters long, include one uppercase letter, one lowercase letter, and one number.',
    },
  },
  tasks: [{ type: mongooose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongooose.model('User', userSchema);
