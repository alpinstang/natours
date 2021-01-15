/**
 * @author John McDonald <jcm.codes@gmail.com>
 * @file Description
 * @desc Created on 2021-01-15 12:38:21 am
 * @copyright GNU General Public License v3.0
 */

const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes').default;
const userRouter = require('./routes/userRoutes').default;

const app = express();

//middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋 ');
  next();
});

app.use((req, res, next) => {
  var n = new Date();
  req.requestTime = '\u{1F570} ' + n.toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log('🚀 app running on port ' + port + '...');
});
