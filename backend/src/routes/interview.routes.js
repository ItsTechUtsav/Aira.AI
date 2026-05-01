const express = require('express');
const router = express.Router();
const { finishInterview, generateQuestions, submitAnswer } = require('../controllers/interview.controller'); 


const interviewRouter = express.Router();

interviewRouter.post('/generate-questions', generateQuestions);
interviewRouter.post('/submit-answer', submitAnswer);
interviewRouter.post('/finish',finishInterview);

module.exports = interviewRouter;