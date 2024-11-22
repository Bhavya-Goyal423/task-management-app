const express = require('express');
const UserController = require('../controller/userController');

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/register', userController.register);

module.exports = userRouter;
