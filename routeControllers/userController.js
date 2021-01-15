const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
};

exports.getUser = (req, res) => {
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

exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  if (id > users.length) {
    return res.status(404).json({ status: 'Invalid ID' });
  }
  const user = users.find((element) => element.id === id);
  // delete User
  res.status(200).json({
    status: 'success',
  });
};
