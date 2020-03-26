const app = module.exports = require('express')();

const { Author } = require('../sequelize');

app.get('/', (req, res) => {
  console.log(Author);
  res.send({ msg: 'Home Page' });
});

// Get the coauthors of a given person
app.get('/search', async (req, res) => {
  console.log(Author);
  // const input_name = req.body.name;
  const input_name = 'Ding Yuan'; // Testing case for now
  const results = await Author.findAll({
    where: {name: input_name}
  });
  res.send(results);
});

// Find out if two persons have previously worked together
app.get('/coauthor', async (req, res) => {
  console.log(Author);

  // const input_name1 = req.body.name1;
  // const input_name2 = req.body.name2;
  const input_name1 = 'Ding Yuan'; // Testing case for now
  const input_name2 = "Baochun Li";
  
  const person_id = await Author.findAll({
    attributes: ['id'],
    where: {name: input_name1}
  });
  
  const match = await Coauthor.findAll({
    where: {
      [Op.and]: [
        { person1_id: person_id },
        { person2_name: input_name2 }
      ]
    }
  });

  const results = False;
  if (match != null){
    results = False;
  } 
  res.send(results);
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

// change the first end point to test everything that i want
// how to interpret sql to sequelize