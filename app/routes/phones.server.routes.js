'use strict';


module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var phones = require('../../app/controllers/phones');

	// Phones Routes
	app.route('/phones')
		.get(phones.list)
		.post(users.requiresLogin, phones.create);

	app.route('/phones/:phoneId')
		.get(phones.read);
		//.put(users.requiresLogin, phones.hasAuthorization, phones.update);
		//.delete(users.requiresLogin, phones.hasAuthorization, phones.delete);

	// Finish by binding the phones middleware
	app.param('phoneId', phones.phoneByID);
};