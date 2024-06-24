const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: [true, 'Phone no should be unique']
    },
    email: {
        type: String,
        lowercase: true,
        default: null
    },
    linkedin: {
        type: String,
        lowercase: true,
        default: null
    },
    twitter: {
        type: String,
        lowercase: true,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;