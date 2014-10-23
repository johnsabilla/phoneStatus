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

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};




var BandSchema = new Schema({
	Carrier: {
		type: String,
		trim: true,
		default: '',
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the Carrier name']
	},
	Frequency: {
		type: Number,
		trim: true,
		default: '',
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available Frequency']
	},
	Protocol: {
		type: String,
		trim: true,
		default: '',
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available Protocol']
	}
});

mongoose.model('Band', BandSchema);