module.exports = (sequelize, type) => {
  return sequelize.define('authors', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    gs_profile_id: {
      type: type.STRING,
      unique: true
    },
    affiliation: type.STRING,
    interest: type.STRING,
  })
}

module.exports = (sequelize, type) => {
  return sequelize.define('coauthors', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    person1_id: {
      type: type.INTEGER,
      references: 'authors',  // Foreign Key Table Name
      referencesKey: 'id'     // Foreign Key Column Name
    },
    person2_name: type.STRING,
    most_recent_year: type.INTEGER,
    most_recent_paper: type.STRING,
  })
}

module.exports = (sequelize, type) => {
  return sequelize.define('todo_list', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    type: type.STRING,
    status: type.INTEGER,
  })
}