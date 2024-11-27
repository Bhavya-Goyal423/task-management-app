const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const handleValidationError = (err) => {
  return new AppError(err.message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // console.log('!!!!!!!!!!', err.name, '!!!!!!!!!');

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'ValidationError') {
      err = handleValidationError(err);
    }
    if (err.name === 'JsonWebTokenError') {
      err = new AppError('Invalid Token. Please log in again!', 404);
    }
    if (err.name === 'TokenExpireError') {
      err = new AppError('Your token has expired! Please log in again.', 401);
    }

    sendErrorProd(err, res);
  }
};
