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
app.get('/searchAuthor', async (req, res) => {
  if (req.body.name) {  // Find by name
    const input = req.body.name;

    if (Array.isArray(input) && input.length == 2) { // multiple authors
      const author1 = input[0];
      const author2 = input[1];
      console.log(`Multiple authors: ${author1}, ${author2}`);
    
      const result1 = await Author.findAll({ where: { name: author1 }, raw: true });
      const result2 = await Author.findAll({ where: { name: author2 }, raw: true });
      console.log(`For ${author1}, found ${author1.length} results: ${result1}`);
      console.log(`For ${author2}, found ${author2.length} results: ${result2}`);
    
      let combined = {}
      combined[author1] = result1;
      combined[author2] = result2;
      res.send(combined);

    } else {  // single author
      let name = Array.isArray(input) ? input[0] : input;
      const authors = await Author.findAll({ where: { name }});
      
      if (authors.length == 0) {
        res.send('No matching result with the given name');
      } 
      else if (authors.length == 1) {
        const id = authors[0].gs_profile_id;
        console.log(`Found 1 matching entry with profile id ${id}`);
        res.send(authors);
      } 
      else {
        res.send(authors);
      }
    }
  } else if (req.query.id) {  // Find by ID
    const author = await Author.findOne({
      where: { gs_profile_id: req.query.id }
    });
    res.send(author);
  } 
  else {  // Nothing provided
    throw new Error('Please provide at least one name to search');
  }
});

// Find out if two persons have previously worked together
app.get('/check', async (req, res) => {
  if (!req.body.ids || req.body.ids.length != 2) {
    res.status(400).send('USE: { ids: [ID1, ID2] }');
  } else {  // OK
    const id1 = req.body.ids[0];
    const id2 = req.body.ids[1];

    let au1 = await Author.findOne({ where: { gs_profile_id: id1 }});
    let au2 = await Author.findOne({ where: { gs_profile_id: id2 }});

    if (!au1 || !au2) res.status(404).send('No author with the id found in database');
    else {
      let co1 = await Coauthor.findOne({ where: { person1_id: id1, person2_name: au2.name }});
      let co2 = await Coauthor.findOne({ where: { person1_id: id2, person2_name: au1.name }});

      if (!co1 && !co2) res.send('No conflicts of interest between these two authors');
      else {
        if (co1) res.send(`Worked together in ${co1.most_recent_year} on ${co1.most_recent_paper}`);
        else if (co2) res.send(`Worked together in ${co2.most_recent_year} on ${co2.most_recent_paper}`);
      }
    }   
  };
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