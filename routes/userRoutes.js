const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require('../controller/authController');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);
module.exports = userRouter;
