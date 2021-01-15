const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

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

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You posted to this URL!');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers

// TOURS:
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const createTour = (req, res) => {
  const newId = tours.length + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const tour = tours.find((element) => element.id === id);
  // TODO: update tour key values here with req data
  req.status(200).json({ status: 'success', data: { tour } });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const tour = tours.find((element) => element.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const tour = tours.find((element) => element.id === id);
  // TODO delete tour by id
  res.status(200).json({
    status: 'success',
    data: { tours },
  });
};

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

//USERS:
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
};

const getUser = (req, res) => {
  const id = req.params.id * 1;
  if (id > users.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const user = users.find((element) => element.id === id);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
};

const updateUser = (req, res) => {
  const id = req.params.id * 1;
  if (id > users.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const user = users.find((element) => element.id === id);
  // Update User
  res.status(200).json({
    status: 'success',
    data: { user },
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id * 1;
  if (id > users.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const user = users.find((element) => element.id === id);
  // delete User
  res.status(200).json({
    status: 'success',
    data: { user },
  });
};

// Routes
app.use('/api/v1/tours', tourRouter);
const tourRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.use('/api/v1/users', userRouter);
const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log('🚀 app running on port ' + port + '...');
});
