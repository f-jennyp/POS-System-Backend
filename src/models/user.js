const { dbUser } = require("../config/config");

module.exports = (sequelize, DataTypes) => {

  const dbUser = sequelize.define('dbUser', {

    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  // , {
  //   hooks: {
  //     beforeValidate: (user, options) => {
  //       user.batch = user.batch.charAt(0).toUpperCase() + user.batch.slice(1);
  //       user.first_name = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
  //       user.middle_name = user.middle_name?.charAt(0).toUpperCase() + user.middle_name?.slice(1);
  //       user.last_name = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1);
  //     }
  //   }
  // }
  );

  return dbUser;

}