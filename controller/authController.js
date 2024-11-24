const userSchema = require('../Schema/userSchema');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

const jwtSign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const isUserAlreadyPresent = await userSchema.findOne({ email });

  if (isUserAlreadyPresent) {
    return next(new AppError('Email already registered', 400));
  }

  const user = await userSchema.create({ name, email, password });
  const token = jwtSign({ id: user._id });

  return res.status(201).json({
    status: 'success',
    message: 'User created',
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Missing email or password', 400));
  }

  const user = await userSchema
    .findOne({ email: email.toLowerCase() })
    .select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 400));
  }

  return res.status(200).json({
    status: 'success',
    token: jwtSign({ id: user._id }),
  });
});
