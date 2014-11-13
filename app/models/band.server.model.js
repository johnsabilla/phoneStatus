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


var BandSchema = new Schema({
	Frequency: {
		type: Number,
		trim: true,
		default: 0,
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available Frequency']
	},
	Protocol: {
		type: String,
		trim: true,
		default: '',
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available Protocol']
	},
	Band: {
		type: Number,
		trim: true,
		default: 0,
		required: true,
		validate: [validateLocalStrategyProperty,'Please fill in the available Frequency']
	}
});

mongoose.model('Band', BandSchema);