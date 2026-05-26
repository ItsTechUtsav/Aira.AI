const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,  
        required: true,
        unique: true
    },
    email: {    
        type: String,   
        required: true,
        unique: true
    },  
    password: {
        type: String,   
        required: true
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    hasUsedFreeInterview: {
    type: Boolean,
    default: false
    },
    verificationCode: String,
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;