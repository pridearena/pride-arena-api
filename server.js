'use strict';
require('dotenv').config()
const express = require('express');
var sequelize = require('./dbclient');
var modelsInitialize = require('./models');
var actions = require('./actions');

// Initialize
var models = modelsInitialize(sequelize);
var TestUser = models.TestUser;

console.log(TestUser);
// Constants
const PORT = 50000;
const HOST = 'localhost';


// App
const app = express();
app.get('/', (req, res) => {
  console.log("Inside funciton");

  var callback = () => res.send('TestUser inserted with success.');
  actions.insertTestUser(sequelize, TestUser, callback);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
