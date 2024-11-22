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
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
