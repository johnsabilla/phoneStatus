'use strict';

var carriers = require('../../app/controllers/carriers');
module.exports = function(app) {

app.route('/carriers')
		.get(carriers.list)
		.post(carriers.create);

	app.route('/carriers/:carrierId')
		.get(carriers.read)
		.put(carriers.update)
		.delete(carriers.delete);

	// Finish by binding the carriers middleware
	app.param('carrierId', carriers.carrierByID);

};