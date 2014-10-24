'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Phone = mongoose.model('Phone');
	//User = mongoose.model('User');

/**
 * Globals
 */
var  phone;

describe('Phone Model Unit Tests:', function() {
	beforeEach(function(done) {
/*		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});*/


		/*user.save(function() { */
			phone = new Phone({
				GSMBands: [11, 22, 33, 33],
				LTEFDDBands: [44, 55, 66, 77],
				ModelNumber: 'ABC123',
				Name: 'SAMPHONE',
				UMTSBands: [88, 99, 40, 11],
				TDSCDMABands: [33, 66, 88, 90]
				//User: user
			});

			done();
		
	});


	/**
	 * Unit test for save phone function 
	 */
	describe('Method Save', function() {

		// Nominal case: it should save successfully
		it('should be able to save without problems', function(done) {
			return phone.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		// no GSMBand should fail
		it('should not be able to save without GSMBands supplied', function(done) {
			phone.GSMBands = null;

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		// no GSMBand should fail
		it('should not be able to save without LTEFDDBands supplied', function(done) {
			phone.LTEFDDBands = null;

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		// no GSMBand should fail
		it('should not be able to save without ModelNumber supplied', function(done) {
			phone.ModelNumber = null;

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		// no GSMBand should fail
		it('should not be able to save without Name supplied', function(done) {
			phone.Name = null;

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		// no GSMBand should fail
		it('should not be able to save without UMTSBands supplied', function(done) {
			phone.UMTSBands = null;

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		// no GSMBand should fail
		it('should not be able to save without TDSCDMABands supplied', function(done) {
			phone.TDSCDMABands = null;

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

				// no GSMBand should fail
		it('should not be able to save if TDSCDMABands supplied is type string', function(done) {
			phone.TDSCDMABands = 'string';

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		it('should not be able to save if GSMBands supplied is type string', function(done) {
			phone.GSMBands = 'string';
			
			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		it('should not be able to save if UMTSBands supplied is type string', function(done) {
			phone.UMTSBands = 'string';

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

		it('should not be able to save if LTEFDDBands supplied is type string', function(done) {
			phone.LTEFDDBands = 'string';

			return phone.save(function(err){
				should.exist(err);
				done();
			});
		});

	});

	



	afterEach(function(done) { 
		Phone.remove().exec();
		//User.remove().exec();

		done();
	});
});
