const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
	summary        : { type: String, trim: true },

	workExperience : [
		{
			title       : { type: String, trim: true },
			jobCategory : { type: String, trim: true },
			startDate   : { type: Date },
			endDate     : { type: Date, default: Date.now },
			duration    : { type: Number },
			description : { type: String, trim: true }
		}
	],

	education      : [
		{
			title       : { type: String, trim: true },
			startDate   : { type: Date },
			endDate     : { type: Date, default: Date.now },
			description : { type: String, trim: true }
		}
	],

	skills         : [ { skill: { type: String, trim: true, lowercase: true } } ],

	personalInfo   : {
		fullName        : { type: String, trim: true },
		contactNumber   : { type: String, trim: true },
		email           : {
			type      : String,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid');
				}
			},
			trim      : true,
			lowercase : true
		},
		linkedinProfile : {
			type      : String,
			trim      : true,
			lowercase : true,
			validate(value) {
				if (!validator.isURL(value)) {
					throw new Error('Invalid URL');
				}
			}
		}
	},
	userId         : {
		type     : Schema.Types.ObjectId,
		ref      : 'User',
		required : true
	}
});

module.exports = mongoose.model('Resume', resumeSchema);
