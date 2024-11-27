const { promisify } = require('util');
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
    return next(new AppError('Invalid email or password', 401));
  }

  return res.status(200).json({
    status: 'success',
    token: jwtSign({ id: user._id }),
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await userSchema.findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError('The user belonging to the token does not exist', 401)
    );
  }

  freshUser.changePasswordAfter(decoded.iat);

  req.user = freshUser;

  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }

  next();
});
