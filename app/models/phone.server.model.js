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




var PhoneSchema = new Schema({
	GSMBands: {
		type:[String],
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty,'Please fill in the available GSMBands for this phone']
	},
	LTEFDDBands: {
		type:[String],
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty,'Please fill in the available LTEFDDBands for this phone']
	},
	ModelNumber: {
		type: String,
		trim: false,
		default: '',
		validate: [validateLocalStrategyProperty,'Please fill in the Model for this phone']
	},
	Name: {
		type: String,
		trim: false,
		default: '',
		validate: [validateLocalStrategyProperty,'Please fill in the Name of this phone']
	},
	UMTSBands:{
		type:[String],
		trim: false,
		default: '',
		validate: [validateLocalStrategyProperty,'Please fill in the available UMTSBands for this phone']
	},
	TDSCDMABands: {
		type:[String],
		trim: false,
		default: '',
		validate: [validateLocalStrategyProperty,'Please fill in the available TD-SCDMABands for this phone']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
mongoose.model('Phone', PhoneSchema);