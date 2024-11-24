const express = require('express');
const { register } = require('../controller/authController');

const userRouter = express.Router();

userRouter.post('/register', register);

module.exports = userRouter;
