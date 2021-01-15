const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res
      .status(404)
      .json({ stats: 'fail', message: 'Invalid ID' });
  }
  next();
};

exports.checkPostBody = (req, res, next, val) => {
  if (!req.params.name || !req.params.price) {
    return res
      .status(400)
      .json({ stats: 'Bad request', message: 'missing values' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const tour = tours.find((element) => element.id === id);
  // TODO: update tour key values here with req data
  req.status(200).json({ status: 'success', data: { tour } });
};

exports.getTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const tour = tours.find((element) => element.id === id);
  // TODO delete tour by id
  res.status(200).json({
    status: 'success',
  });
};
