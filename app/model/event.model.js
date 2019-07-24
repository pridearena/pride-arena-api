module.exports = (sequelize, Sequelize) => {
    var Event = sequelize.define('event', { 
        event_name: Sequelize.STRING,
        description: Sequelize.STRING(1000), 
        date: Sequelize.DATE, 
        city: Sequelize.STRING, 
        suburb: Sequelize.STRING,
        location: Sequelize.STRING, 
        duration_in_minutes: Sequelize.INTEGER, 
        max_guests: Sequelize.INTEGER, 
        min_guests: Sequelize.INTEGER, 
        event_type: Sequelize.STRING, 
        rating: Sequelize.INTEGER,
        owner_email: Sequelize.STRING,
		participants_emails: Sequelize.ARRAY(Sequelize.STRING)
    });
	
	return Event;
}