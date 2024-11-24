/* eslint-disable import/no-extraneous-dependencies */
const mongooose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

mongooose.connect(process.env.DB_URI).then(() => {
  console.log('Connected to DB');
});

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening....`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('Uncaught Rejection');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log(err.stack);
  console.log('Uncaught Exception');
  server.close(() => {
    process.exit(1);
  });
});
