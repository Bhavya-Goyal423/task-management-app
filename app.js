const express = require('express');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorhandler = require('./controller/errorController');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorhandler);

module.exports = app;
