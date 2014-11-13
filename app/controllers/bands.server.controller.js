'use strict';

/**
 * 	Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Band = mongoose.model('Band'),
	_ = require('lodash');


/**
 *  create function
 */
exports.create = function(req, res) {
	var band = new Band(req.body);
	//Band.user = req.user;
	//Band.carrier = req.carrier;

	band.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(band);
		}
	});
};



/**
 * Update a band
 */
exports.update = function(req, res) {
	var band = req.band ;

	band = _.extend(band , req.body);

	band.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(band);
		}
	});
};



/**
 *	read function (show the current band)
 */
exports.read = function(req, res) {
	res.jsonp(req.band);
};



/**
 *  read function (show all of the band)
 */
 /*function(req, res) { Band.find().sort('-created').populate('user', 'displayName').exec(function(err, Band) */
exports.list = function(req, res) { Band.find().exec(function(err, Band)  {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(Band);
		}
	});
};



/**
 * Delete a band
 */
exports.delete = function(req, res) {
	var band = req.band ;

	band.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(band);
		}
	});
};



/**
 * look for a band by id
 */
exports.bandByID = function(req, res, next, id) { 
	Band.findById(id).exec(function(err, band) {
		if (err) return next(err);
		if (!band) return next(new Error('Failed to load band ' + id));
		req.band = band;
		next();
	});
};



/**
 * Firstmodule authorization middleware
 */
/*exports.hasAuthorization = function(req, res, next) {
	if (req.band.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};*/