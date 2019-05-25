const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
	summary         : { type: String, trim: true },
	work_experience : {
		title       : { type: String, trim: true },
		description : { type: String, trim: true }
	}
});
