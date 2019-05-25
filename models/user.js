const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name     : { type: String, required: true, trim: true },
	email    : {
		type      : String,
		required  : true,
		unique    : true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
		trim      : true,
		lowercase : true
	},
	password : { type: String, required: true, minlength: 6 },
	resumeId : {
		type     : Schema.Types.ObjectId,
		ref      : 'Resume',
	}
});

module.exports = mongoose.model('User', userSchema);
