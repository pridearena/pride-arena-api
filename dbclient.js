var Sequelize = require('sequelize');
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;

console.log("pass: " + DB_PASSWORD);

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres"
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

// Schemas
var TestUser = sequelize.define('test_user', {
  username: Sequelize.STRING,
  random_number: Sequelize.INTEGER
});

// console.log("##############")
// console.log(sequelize);
module.exports = sequelize;