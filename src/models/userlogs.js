const { dbUserlogs } = require("../config/config");

module.exports = (sequelize, DataTypes) => {

  const dbUserlogs = sequelize.define('dbUserlogs', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      foreignKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    time: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  })

  return dbUserlogs;

}