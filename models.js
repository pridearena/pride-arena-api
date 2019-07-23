var Sequelize = require('sequelize');

// Initialize models
var initialize = function(sequelize) {
    // Schemas
    var testUser = sequelize.define('test_user', {
        username: Sequelize.STRING,
        random_number: Sequelize.INTEGER
    });
    
    return {
        TestUser: testUser
    }
}

// Export models
module.exports = initialize