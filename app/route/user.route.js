module.exports = function(app) {
    const users = require('../controller/user.controller.js');
 
    // Create a new User
    app.post('/api/users', users.create);
 
    // Retrieve all User
    app.get('/api/users', users.find);
 
    // Update a User with Email
    app.put('/api/users', users.update);
 
    // Delete a User with Email
    app.delete('/api/users', users.delete);
}