'use strict';

	//var users = require('../../app/controllers/users');
	//var phones = require('../../app/controllers/phones');
	var bands = require('../../app/controllers/bands');
	module.exports = function(app) {


	// Phones Routes
	app.route('/bands')
		.get(bands.list)
		//.post(users.requiresLogin bands.create);
		.post(bands.create);

	app.route('/bands/:bandId')
		.get(bands.read)
		.put(bands.update)
		.delete(bands.delete);

	// Finish by binding the phones middleware
	app.param('bandId', bands.bandByID);
};