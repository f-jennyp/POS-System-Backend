const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config({path: './.env'});        


const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
    host: process.env.db_host, 
    dialect: 'mysql'
});

const db={}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.dbproducts = require("../models/products")(sequelize, Sequelize);
db.dbuser = require("../models/user")(sequelize, Sequelize);
db.dbuserlogs = require("../models/userlogs")(sequelize, Sequelize);
db.dbtransactions = require("../models/transactions")(sequelize, Sequelize);
module.exports = db;
