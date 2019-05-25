const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const lookupSchema = new Schema({
	type   : String,
	values : [
		{
			value : String,
			label : String
		}
	]

});

module.exports = mongoose.model('Lookup', lookupSchema);
