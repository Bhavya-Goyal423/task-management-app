const user = require('../Schema/userSchema');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const isUserAlreadyPresent = await user.findOne({ email });

  if (isUserAlreadyPresent) {
    return next(new AppError('Email already registered', 400));
  }

  await user.create({ name, email, password });

  return res.status(201).json({
    status: 'success',
    message: 'User created',
  });
});
