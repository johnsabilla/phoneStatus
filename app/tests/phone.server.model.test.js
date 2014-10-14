'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Phone = mongoose.model('Phone'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, phone;

describe('Phone Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});


		user.save(function() { 
			phone = new Phone({
				GSMBands: ['GSM1', 'GSM2', 'GSM3', 'GSM4'],
				LTEFDDBands: ['LTEFDDBand1', 'LTEFDDBand2', 'LTEFDDBand3', 'LTEFDDBand4'],
				ModelNumber: 'ABC123',
				Name: 'SAMPHONE',
				UMTSBands: ['UMTSBand1', 'UMTSBand2', 'UMTSBand3', 'UMTSBand4'],
				TDSCDMABands: ['TD-SCDMABand1', 'TD-SCDMABand2', 'TD-SCDMABand3', 'TD-SCDMABand4'],
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return phone.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});


	afterEach(function(done) { 
		Phone.remove().exec();
		User.remove().exec();

		done();
	});
});
