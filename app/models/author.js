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
  },
  {
      timestamps: false
  })
}
