/* eslint-disable import/no-extraneous-dependencies */
const mongooose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

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
    lowercase: true,
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
    select: false,
  },
  tasks: [{ type: mongooose.Schema.Types.ObjectId, ref: 'Task' }],
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = mongooose.model('User', userSchema);
