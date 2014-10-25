'use strict';


/**
 * 	Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Carrier = mongoose.model('Carrier'),
	_ = require('lodash');


/**
 *  create function
 */
exports.create = function(req, res) {
	var Carrier = new Carrier(req.body);
	//Band.user = req.user;
	//Carrier.phone = req.phone;

	Carrier.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(Carrier);
		}
	});
};



/**
 * Update a carrier
 */
exports.update = function(req, res) {
	var carrier = req.carrier;

	carrier = _.extend(carrier , req.body);

	carrier.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(carrier);
		}
	});
};



/**
 *	read function (show the current carrier)
 */
exports.read = function(req, res) {
	res.jsonp(req.carrier);
};



/**
 *  read function (show all of the carrier)
 */
exports.list = function(req, res) { Carrier.find().sort('-created').populate('user', 'displayName').exec(function(err, Carrier) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(Carrier);
		}
	});
};




/**
 * Delete a carrier
 */
exports.delete = function(req, res) {
	var carrier = req.carrier ;

	carrier.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(carrier);
		}
	});
};



/**
 * look for a carrier by id
 */
exports.carrierByID = function(req, res, next, id) { 
	Carrier.findById(id).populate('user', 'displayName').exec(function(err, carrier) {
		if (err) return next(err);
		if (!carrier) return next(new Error('Failed to load carrier ' + id));
		req.carrier = carrier;
		next();
	});
};

