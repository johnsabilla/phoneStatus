'use strict';



/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Phone = mongoose.model('Phone'),
	Band = mongoose.model('Band'),
	async = require('async'),
	_ = require('lodash');



/**
 *  create a new phone
 */
exports.create = function(req, res) {
	var phone = new Phone(req.body);
	phone.user = req.user;

	console.log('useid', phone.user);

	phone.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(phone);
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



/**
 * Update a phone
 */
exports.update = function(req, res) {
	var phone = req.phone ;

	phone = _.extend(phone , req.body);

	phone.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(phone);
		}
	});
};



/**
 * Delete an phone
 */
exports.delete = function(req, res) {
	var phone = req.phone ;

	phone.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(phone);
		}
	});
};

/* phyByID - grabs all of the phone information.
 *			 We also compare if any of the supported bands
 *			 are supported by a specific carrier. 
 */
exports.phoneByID = function(req, res, next, id) { 

		/*
		 *  used async parallel to query multiple models in database and keep everything asynchronous
		 *  since mongodb is synchronous. 
		 */
		async.parallel([

			function(callback) {
				Phone.findById(id).exec(function(err, phone) {
					if (err) return next(err);
					if (!phone) return next(new Error('Failed to load Phone ' + id));
					req.phone = phone;
			
					callback(null,phone);
				});
			},

			function(callback) {
				Band.find().populate('Carrier', 'CarrierName').exec(function(err, bands) {
					if(err) return callback(err);
					if(!bands) return callback(new Error('Failed to load Band '));

				//	console.log('bands inside', bands.carrier);

					callback(null, bands);
				});
			}

			],

			/*
			 * using the result sets that we grabbed from phone and bands, check if the
			 * phone is supported
			 */
			function(err,res) {
				if(err){
					console.log(err);
					return res.status(400).send('error occured');
				}

				if(res === null || res[0] === null || res[1] === null) {
					return res.status(400).send('objects are null');
				}

				var bands = res[1];
				var phone = res[0];

				//console.log('bands ', bands[0]);
				//console.log('phones ', phone);

				var sbands=[];
				var sphoneGSM = phone.GSMBands;
				var sphoneLTEFDD = phone.LTEFDDBands;			

				//query all bands that are GSM
				for(var x = 0; x < bands.length; x++){
					if(bands[x].Protocol === 'GSM'){
						sbands.push(bands[x]);
					}
				}

				//sort the bands
				sbands = sbands.sort(function(a,b){
				 	return a-b;
				});

				//sort the GSM bands supported by phone
				sphoneGSM = sphoneGSM.sort(function(a,b) {
					return a-b;
				});

				console.log('bands ', sbands);
				console.log('phones ', sphoneGSM);

				//find a band that the phone supports
				for(var a = 0; a < sphoneGSM.length; a++){
					for(var b = 0; b < sbands.length; b++){
						if(sphoneGSM[a] === sbands[b].Band){
							
							phone.Band = 'yes, match: ' + sphoneGSM[a] + ' ' + sbands[b].Carrier.CarrierName;
								
							//console.log('phone.Band', phone.Band);
							//console.log('we have a match', sphoneGSM[a], sbands[b]);
								
							break;
							
						}
					}
				}
				next();
			});


		
};


/*exports.phoneByID = function(req, res, next, id) { 
	Phone.findById(id).populate('user', 'displayName').exec(function(err, phone) {
		if (err) return next(err);
		if (!phone) return next(new Error('Failed to load Phone ' + id));
		
		req.phone = phone;
	
		next();
	});
};
*/







/**
 * phone authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.phone.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
