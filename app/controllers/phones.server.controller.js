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

exports.phoneByID = function(req, res, next, id) { 

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
				Band.find().exec(function(err, bands) {
					if(err) return callback(err);
					if(!bands) return callback(new Error('Failed to load Band ' + id));

					callback(null, bands);
				});
			}

			],

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

				console.log('bands ', res[1]);
				console.log('phones ', res[0]);


				var sbands=[];
				var sphoneGSM = phone.GSMBands;
				var sphoneLTEFDD = phone.LTEFDDBands;
			

				for(var x = 0; x < bands.length; x++){
					if(bands[x].Protocol === 'GSM'){
						sbands.push(bands[x].Band);
					}
					/*if(bands[x]).Protocol === 'LTEFDD'){
						sbands.push(bands[x].Band);
					}*/
				}

				sbands = sbands.sort(function(a,b){
				 	return a-b;
				});

				sphoneGSM = sphoneGSM.sort(function(a,b) {
					return a-b;
				});

				console.log('bands ', sbands);
				console.log('phones ', sphoneGSM);

				for(var a = 0; a < sphoneGSM.length; a++){
					for(var b = 0; b < sbands.length; b++){
						if(sphoneGSM[a] === sbands[b]){
							phone.Band = 'yes, match: ' + sphoneGSM[a];
								
							console.log('phone.Band', phone.Band);
							console.log('we have a match', sphoneGSM[a], sbands[b]);
								
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
