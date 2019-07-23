
var insertTestUser = function(sequelize, testUserModel, callback) {
    // console.log("Insite function 2");
    // console.log(sequelize);
    console.log("Inserting");
    const gen_number = Math.round((Math.random(10)*10000));
  
    sequelize.sync().then(function() {
        return testUserModel.create({
          username: 'marlon',
          random_number: gen_number
        });
      }).then(function(jane) {
        console.log(jane.get({
          plain: true
        }));
  
        callback();
      });
  }

// Export models
module.exports = {
    insertTestUser: insertTestUser
}