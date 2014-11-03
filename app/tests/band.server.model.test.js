'use strict';

/*
 * module dependencies
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Carrier = mongoose.model('Carrier'),
	Band = mongoose.model('Band');



/*
 * Globals
 */
var band,
 	bandIDs = [],
 	carrier;

describe('Band model Unit Tests:', function() {
	
	/* Create band test object */
	beforeEach(function(done) {

		carrier = new Carrier({
		  	CarrierName: 'FakeBandCarrier',
		  	Country: 'USUSUS',
		  	Bands: [2,4,8,16,32]
		});


		carrier.save(function(){ 
			band = new Band({
				Frequency: 1500,
				Protocol: 'GSM',
				Carrier: carrier
		});

			done();
		});
	});

	describe('Method Save', function() {

		it('should be able to save without problems', function(done) {
			return band.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should not be able save a band with empty string Frequency', function(done) {
			band.Frequency = '';
			return band.save(function(err) {
			    should.exist(err);
			    done();
			});
		});

		it('should not be able save a band with null Frequency', function(done) {
			band.Frequency = null;
			return band.save(function(err) {
			    should.exist(err);
			    done();
			});
		});

		it('should be able save a band with valid Frequency', function(done) {
			band.Frequency = 2000;
			return band.save(function(err) {
			    should.not.exist(err);
			    done();
			});
		});

		it('should not be able save a band with empty Protocol', function(done) {
			band.Protocol = '';
			return band.save(function(err) {
			    should.exist(err);
			    done();
			});
		});

		it('should not be able save a band with null Protocol', function(done) {
			band.Protocol = null;
			return band.save(function(err) {
			    should.exist(err);
			    done();
			});
		});

		it('should be able save a band with valid protocol', function(done) {
			band.Protocol = 'GSM';
			return band.save(function(err) {
			    should.not.exist(err);
			    done();
			});
		});

		it('should not be able save a band with empty carrier', function(done) {
			band.Carrier = '';
			return band.save(function(err) {
			    should.exist(err);
			    done();
			});
		});

		it('should be able save a band with null carrier', function(done) {
			band.Carrier = null;
			return band.save(function(err) {
			    should.exist(err);
			    done();
			});
		});


	});

});

