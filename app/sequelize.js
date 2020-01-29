const Sequelize = require('sequelize');
const AuthorModel = require('./models/author');
const config = require('./config/config.json');

const sequelize = new Sequelize(config.db, config.user, config.pass, {
  host: config.host,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

// --- for testing a connection ---
// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
// --------------------------------

const Author = AuthorModel(sequelize, Sequelize);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created`);
  });

module.exports = {
  Author
};