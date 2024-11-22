const express = require('express');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'failed',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
