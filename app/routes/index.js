const app = module.exports = require('express')();

const { Author, Coauthor } = require('../sequelize');

app.get('/', (req, res) => {
  console.log(Author);
  res.send({ msg: 'Home Page' });
});

/* 
  SEARCH - Get the coauthors of a given person
  USE - /search + JSON body ("name" : NAME)
      - /search?id=PROFILE_ID
*/
app.get('/search', async (req, res) => {
  if (req.body.name) {  // Find by name
    const input_name = req.body.name;
    const authors = await Author.findAll({
      where: { name: input_name }
    });
    if (authors.length == 0) {
      res.send('No matching result with the given name');
    } else if (authors.length == 1) {
      const id = authors[0].gs_profile_id;
      console.log(`Found 1 matching entry with profile id ${id}. Returning coauthors...`);
      const results = await Coauthor.findAll({
        where: { person1_id: id }
      });
      res.send(results);
    } else {
      res.send(authors);
    }
  } else if (req.query.id) {  // Find by ID
    const results = await Coauthor.findAll({
      where: { person1_id: req.query.id }
    });
    res.send(results);
  } else {  // Nothing provided
    throw new Error('Please provide a name to search');
  }
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