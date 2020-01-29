const app = module.exports = require('express')();

app.get('/', (req, res) => {
  res.send({ msg: 'Home Page' });
});

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not Found' });
})