module.exports = (sequelize, type) => {
    return sequelize.define('coauthors', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      person1_id: {
        type: type.INTEGER,
        references: {
            model: 'authors',  // Foreign Key Table Name
            key: 'id'          // Foreign Key Column Name
        }
      },
      person2_name: type.STRING,
      most_recent_year: type.INTEGER,
      most_recent_paper: type.STRING,
    },
    {
        timestamps: false
    }
    
    )
  }
