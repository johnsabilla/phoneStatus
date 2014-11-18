'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};


var CarrierSchema = new Schema({
	CarrierName: {
		type: String,
		trim: true,
		default: '',
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available CarrierName']
	},
	Country: {
		type: String,
		trim: true,
		default: '',
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available Country']
	},
	GSM: {
		type: Number,
		trim: true,
		default: 0,
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available bands ']
	},
	LTE: {
		type: Number,
		trim: true,
		default: 0,
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available bands ']
	},
	UMTS: {
		type: Number,
		trim: true,
		default: 0,
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available bands ']
	},
	CDMA: {
		type: Number,
		trim: true,
		default: 0,
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available bands ']
	}
/*	Bands: {
		type: [Schema.ObjectId],
		ref: 'Band'
	} */
});

mongoose.model('Carrier', CarrierSchema);