const fs = require('fs');
const express = require('express');

const app = express();

//middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You posted to this URL!');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
});

app.patch('/api/v1/tours/:id', (req, res) => {
  // console.log("patch request")
  const id = req.params.id * 1;

  if(id > tours.length) {
    return res.status(404).json({status: "Invalid ID"})
  }

  const tour = tours.find(element => element.id === id)

  // update tour key values here with req data

  req.status(200).json({status: "success", data: {tour}})
})

app.get('/api/v1/tours/:id', (req, res) => {

  const id = req.params.id * 1;

if(id > tours.length) {
  return res.status(404).json({status: "Invalid ID"})
}

  const tour = tours.find(element => element.id === id)

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('app running on port ' + port + '...');
});
