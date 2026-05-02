const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    question: String,   
    answer: String,
    difficulty: String,
    timelimit: Number,
    feedback: String,
    score: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    correctness: { type: Number, default: 0 },
});

const interviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true  
    },
    questions: [questionSchema],
    finalScore: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
}, { timestamps: true });

const interviewModel = mongoose.model('Interview', interviewSchema);

module.exports = interviewModel;