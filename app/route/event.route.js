module.exports = function(app) {
    const events = require('../controller/event.controller.js');
 
    // Create a new event
    app.post('/api/events', events.create);
 
    // Retrieve all event
    app.get('/api/events', events.find);
 
    // Update a event with Email
    app.put('/api/events', events.update);
 
    // Delete a event with Email
    app.delete('/api/events', events.delete);

    // Get all events in the same city of the given user (email)
    app.get('/api/events/user_city', events.find_in_user_city);

    // Attend event
    app.get('/api/events/attend', events.attend);
}