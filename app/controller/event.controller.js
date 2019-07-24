const db = require('../config/db.config.js');
const Event = db.events;
const User = db.users;

// Post a Event
exports.create = (req, res) => {	
	// Save to MySQL database
	var EventData = EventFromReq(req);
	console.log('EventData');
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
	
	if (id == undefined) {
		Event.findAll().then(events => {
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

exports.attend = (req, res) => {
	const email = req.query.email;
	const event_id = req.query.event_id;

	res.send("Not implemented yet");
	// User.findOne(
	// 	{ where: { email: email} }
	// ).then(user => {
	// 	Event.findOne(
	// 		{ where: { } }
	// 	).then();


	// 	console.log("Found user in city: " + user.city);
	// 	Event.findAll(
	// 		{ where: { city: user.city} }
	// 	).then(events => {
	// 		if (events == null || events == []) {
	// 			res.status(204);
	// 		}
	// 		res.send(events);	
	// 	}).catch(function (err) {
	// 		console.log(err);
	// 		res.status(400);
	// 		res.send("error while fetching events in user's city");
	// 	});
	// }).catch(function (err) {
	// 	console.log(err);
	// 	res.status(400);
	// 	res.send("user not found for this email!");
	// });	
}

// Util functions
var EventFromReq = (req) => {
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

	return Event;
}
