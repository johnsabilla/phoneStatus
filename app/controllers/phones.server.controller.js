'use strict';


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Phone = mongoose.model('Phone'),
	_ = require('lodash');


/**
 *  CREATE
 */
exports.create = function(req, res) {
	var Phone = new Phone(req.body);
	Phone.user = req.user;

	Phone.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(Phone);
		}
	});
};

/**
 * Show the current Phone
 */
exports.read = function(req, res) {
	res.jsonp(req.phone);
};

/**
 * Show list phones
 */
exports.list = function(req, res) { Phone.find().sort('-created').populate('user', 'displayName').exec(function(err, Phone) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(Phone);
		}
	});
};


exports.phoneByID = function(req, res, next, id) { 
	Phone.findById(id).populate('user', 'displayName').exec(function(err, phone) {
		if (err) return next(err);
		if (!phone) return next(new Error('Failed to load Phone ' + id));
		req.phone = phone;
		next();
	});
};
