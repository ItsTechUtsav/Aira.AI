const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,  
        required: true,
        unique: true,
        trim: true
    },
    email: {    
        type: String,   
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },  
    password: {
        type: String,   
        required: true
    },
  
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    }
}, { timestamps: true });


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;