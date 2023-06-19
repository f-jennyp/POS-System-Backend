const { dbProducts } = require("../config/config");



module.exports = (sequelize, DataTypes) => {

  const dbProducts = sequelize.define('dbProducts', {

    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    original_price: {
      type: DataTypes.INTEGER,
    },
    markup_price: {
      type: DataTypes.INTEGER,
    },
    product_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    variation: {
      type: DataTypes.JSON,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
    buffer_file: {
      type: DataTypes.TEXT('long'),
      validate: {
        len: [0, 1000000]
      }
    }
  });
  return dbProducts;

}
