const user = require('../Schema/userSchema');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const AppError = require('../utils/appError');

class UserController {
  register = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const isUserAlreadyPresent = await user.findOne({ email });

    if (isUserAlreadyPresent) {
      return next(new AppError('Email already registered', 501));
    }

    await user.create({ name, email, password });

    return res.status(201).json({
      status: 'success',
      message: 'User created',
    });
  });
}

module.exports = UserController;
