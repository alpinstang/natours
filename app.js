const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server!', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('You posted to this URL!');
});

const port = 3000;
app.listen(port, () => {
  console.log('app running on port ' + port + '...');
});
