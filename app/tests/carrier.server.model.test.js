'use strict';

/*
 * module dependencies
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Carrier = mongoose.model('Carrier');


/*
 * Globals
 */
var carrier;
var carrierIDs = [];

describe('Carrier model Unit Tests:', function() {
	
	/* Create carrier test object */
	beforeEach(function(done) {

		carrier = new Carrier({
		  	CarrierName: 'FakeCarrier',
		  	Country: 'USJ',
		  	Bands: [2,4,8,16,32]
		});

		done();
		
	});


	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return carrier.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should not be able save a carrier with empty CarrierName', function(done) {
			carrier.CarrierName = '';
			return carrier.save(function(err) {
			    should.exist(err);
			    done();
			});
		});

		it('should not be able save a carrier with empty Country', function(done) {
			carrier.Country = '';
			return carrier.save(function(err) {
			    should.exist(err);
			    done();
			});
		});

		it('should not be able save a carrier with empty bands', function(done) {
			carrier.Bands = [];
			return carrier.save(function(err) {
			    should.exist(err);
			    done();
			});
		});
	});

	describe('Methond find', function(){
	   it('should be able to find the carrier we saved from about function', function(done) {
	   		Carrier.find({CarrierName: 'FakeCarrier'}, function(err, carrier) {
	   			//save this _id so we
	   			carrierIDs = carrier;
				carrier.should.have.length(1);
				done();
			});
	   });

	});



	afterEach(function(done) { 

		/* delete the carrier test doc to keep database clean */
		for(var i = 0; i < carrierIDs.length; i++){
			//console.log('carrierID', carrierIDs[i]._id);
			Carrier.remove({ _id: carrierIDs[i]._id}).exec();
		}

		done();
	});

});