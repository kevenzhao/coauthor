const app = module.exports = require('express')();

const { Author } = require('../sequelize');

app.get('/', (req, res) => {
  console.log(Author);
  res.send({ msg: 'Home Page' });
});

// TODO: Have to test inserting rows into the database
app.post('/api/author', async (req, res) => {
  console.log(`Received data at /api/author: ${req.body}`);
  const author = await Author.create(req.body);
  res.json(author);
});

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});
