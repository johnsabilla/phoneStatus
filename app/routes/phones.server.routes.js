'use strict';

	var users = require('../../app/controllers/users');
	var phones = require('../../app/controllers/phones');
	var bands = require('../../app/controllers/bands');
module.exports = function(app) {


	// Phones Routes
	app.route('/phones')
		.get(phones.list)
		.post(phones.create);

	app.route('/phones/:phoneId')
		.get(phones.read)
	/*	.put(users.requiresLogin, phones.hasAuthorization, phones.update)
		.delete(users.requiresLogin, phones.hasAuthorization, phones.delete); */
		.put(phones.update)
		.delete(phones.delete);

	// Finish by binding the phones middleware
	app.param('phoneId', phones.phoneByID);
};