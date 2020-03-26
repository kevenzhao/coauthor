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
    },
    {
        timestamps: false
    })
  }
