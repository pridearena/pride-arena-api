module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('marlon', {
        name: Sequelize.STRING,
        email: { type: Sequelize.STRING,  primaryKey: true },
        auth_type: Sequelize.INTEGER,
        private_mode: Sequelize.BOOLEAN,
        phone_number: Sequelize.STRING,
        city: Sequelize.STRING,
        suburb: Sequelize.STRING,
        description: Sequelize.STRING(1000),
        reported: Sequelize.BOOLEAN,
        rating: Sequelize.INTEGER,
		last_session: Sequelize.DATE,
        age: Sequelize.INTEGER,
        events_attending: Sequelize.ARRAY(Sequelize.STRING)
	});
	
	return User;
}