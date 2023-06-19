const { dbTransactions } = require("../config/config");

module.exports = (sequelize, DataTypes) => {

    const dbTransactions = sequelize.define('dbTransactions', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            foreignKey: true,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        product: {
            type: DataTypes.JSON,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tendered: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        change: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receipt_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        }
    }, {
        timestamps: false
    })

    return dbTransactions;

}