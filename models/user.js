const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
	preferredJobSector        : { type: String },
	highestCompletedEducation : { type: String },
	olPasses                  : { type: Number, default: 0 },
	alPasses                  : { type: Number, default: 0 },
	alStream                  : { type: String, default: 'None' },
	diploma                   : { type: String, default: 'None' },
	bachelors                 : { type: String, default: 'None' },
	masters                   : { type: String, default: 'None' },
	phd                       : { type: String, default: 'None' },
	professionalQualification : { type: String, default: 'None' }
});

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
		type : Schema.Types.ObjectId,
		ref  : 'Resume'
	},
	profile  : userProfileSchema
});

module.exports = mongoose.model('User', userSchema);
