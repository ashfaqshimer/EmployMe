const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
        trim: true,
        lowercase:true
    },
    password: { type: String, required: true, minlength:6 }
});

module.exports = mongoose.model('Admin', adminSchema);