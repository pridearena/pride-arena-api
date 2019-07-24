const db = require('../config/db.config.js');
const User = db.users;

// Post a User
exports.create = (req, res) => {	
	// Save to MySQL database
	var userData = userFromReq(req);
	console.log('userData');
	console.log(userData);
	User.create(userData).then(user => {		
		// Send created user to client
		res.send(user);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});
};
 
// FETCH all Users
exports.find = (req, res) => {
	var email = req.query.email;
	
	if (email == undefined) {
		User.findAll().then(users => {
			// Send all users to Client
			res.send(users);
		  }).catch(function (err) {
			console.log(err);
			res.status(400);
			res.send(err.name);
		});;
	} 
	else {
		User.findOne(
			{ where: { email: email} }
		).then(user => {
			console.log("found user:");
			console.log(user);
			if (user == null) {
				res.status(204)
			}
			res.send(user);
		}).catch(function (err) {
			console.log(err);
			res.status(400);
			res.send(err.name);
		});
	}
};
 
// Update a User
exports.update = (req, res) => {
	email = req.query.email;
	var userData = userFromReq(req);
	User.update(
		userData,
		{ where: {email: email} }
	).then(() => {
		res.status(200).send("updated successfully a user with email = " + email);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});
};
 
// Delete a User by email
exports.delete = (req, res) => {
	const email = req.query.email;
	User.destroy({
	  where: { email: email }
	}).then(() => {
	  res.status(200).send('deleted successfully a user with email = ' + email);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});
};

// Util functions
var userFromReq = (req) => {
	var user = {
		name: req.body.name,
		email: req.body.email,
		auth_type: req.body.auth_type,
		private_mode: req.body.private_mode,
		phone_number: req.body.phone_number,
		city: req.body.city,
		suburb: req.body.suburb,
		description: req.body.description,
		reported: req.body.reported,
		rating: req.body.rating,
		last_session: req.body.last_session,
		events_attending: req.body.events_attending
	}

	for (key in user) {
		if (user[key] == undefined) {
			delete user[key];
		}
	}

	return user;
}
