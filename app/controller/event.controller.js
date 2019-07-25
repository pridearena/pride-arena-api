const db = require('../config/db.config.js');
const Event = db.events;
const User = db.users;
const sequelize = db.sequelize;
var Op = db.Sequelize.Op

// Post a Event
exports.create = (req, res) => {	
	// Save to MySQL database
	var EventData = EventFromReq(req);
	console.log('EventData:');
	console.log(EventData);
	Event.create(EventData).then(Event => {		
		// Send created Event to client
		res.send(Event);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});
};
 
// FETCH all events
exports.find = (req, res) => {
	var id = req.query.id;
	var email = req.query.email;
	var since_now = req.query.since_now;
	
	if (id == undefined) {
		var where_condition = {}

		if (since_now == 1) {
			where_condition.createdAt = {
				[Op.gte]: dateNow()
			}
		}

		if (email != undefined) {
			where_condition.participants_emails = {
				[Op.contains]: [email]
			}
		}

		Event.findAll({ where: where_condition }).then(events => {
			// Send all events to Client
			res.send(events);
		  }).catch(function (err) {
			console.log(err);
			res.status(400);
			res.send(err.name);
		});;
	} 
	else {
		Event.findOne(
			{ where: { id: id} }
		).then(Event => {
			console.log("found Event:");
			console.log(Event);
			if (Event == null) {
				res.status(204)
			}
			res.send(Event);
		}).catch(function (err) {
			console.log(err);
			res.status(400);
			res.send(err.name);
		});
	}
};
 
// Update a Event
exports.update = (req, res) => {
	id = req.query.id;
	var EventData = EventFromReq(req);
	Event.update(
		EventData,
		{ where: {id: id} }
	).then(() => {
		res.status(200).send("updated successfully a Event with id = " + id);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});
};
 
// Delete a Event by id
exports.delete = (req, res) => {
	const id = req.query.id;
	Event.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a Event with id = ' + id);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send("Error while deleting event");
	});
};

exports.find_in_user_city = (req, res) => {
	const email = req.query.email;
	User.findOne(
		{ where: { email: email} }
	).then(user => {
		console.log("Found user in city: " + user.city);
		Event.findAll(
			{ where: { city: user.city} }
		).then(events => {
			if (events == null || events == []) {
				res.status(204);
			}
			res.send(events);	
		}).catch(function (err) {
			console.log(err);
			res.status(400);
			res.send("error while fetching events in user's city");
		});
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send("user not found for this email!");
	});
}

exports.set_attendance = (req, res) => {
	const email = req.query.email;
	const event_id = req.query.event_id;
	const is_attending = req.query.is_attending;

	switch(is_attending) {
		case "true": attend(email, event_id, res); break;
		case "false": unattend(email, event_id, res); break;
		default: res.status(400).send("Invalid parameter value 'is_attending = '" + is_attending);
	}
}

var attend = function(email, event_id, res) {
	// Update the events table with user's email
	Event.update(
		{ participants_emails: sequelize.fn('array_append', sequelize.col('participants_emails'), email)},
		{ where: {id: event_id} }
	).then(() => {
		console.log("Added user with email = " + email + " successfully to the event with id = " + event_id);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});

	// Update the users table with the new event
	User.update(
		{ events_attending: sequelize.fn('array_append', sequelize.col('events_attending'), event_id)},
		{ where: {email: email} }
	).then(() => {
		console.log("Added event with id = " + event_id + " successfully to the user with email = " + email);
		res.status(200).send("User with email = " + email + " is now attending the event with id = " + event_id);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});
}

var unattend = function(email, event_id, res) {
	// Update the events table to remove user's email
	Event.update(
		{ participants_emails: sequelize.fn('array_remove', sequelize.col('participants_emails'), email)},
		{ where: {id: event_id} }
	).then(() => {
		console.log("Removed user with email = " + email + " successfully from the event with id = " + event_id);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});

	// Update the users table to remove the event
	User.update(
		{ events_attending: sequelize.fn('array_remove', sequelize.col('events_attending'), event_id)},
		{ where: {email: email} }
	).then(() => {
		console.log("Event with id = " + event_id + " was successfully removed from the user with email = " + email);
		res.status(200).send("User with email = " + email + " has been removed from the event with id = " + event_id);
	}).catch(function (err) {
		console.log(err);
		res.status(400);
		res.send(err.name);
	});
}

// Util functions
var EventFromReq = (req) => {
	console.log("req body:")
	console.log(req.body)
	var Event = {
		event_name: req.body.event_name,
		description: req.body.description, 
		date: req.body.date, 
		city: req.body.city, 
		suburb: req.body.suburb,
		location: req.body.location, 
		duration_in_minutes: req.body.duration_in_minutes, 
		max_guests: req.body.max_guests, 
		min_guests: req.body.min_guests, 
		rating: req.body.rating,
		owner_email: req.body.owner_email,
		participants_emails: req.body.participants_emails
	}

	for (key in Event) {
		if (Event[key] == undefined) {
			delete Event[key];
		}
	}
	console.log(Event);
	return Event;
}

var dateNow = () => {
    var date = new Date(); 
	var now_utc =  new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
	date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
 
 	return new Date(now_utc);
}