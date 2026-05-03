const express = require('express');
const router = express.Router();
const { finishInterview, generateQuestions, submitAnswer, getUserInterviews, getInterviewReport } = require('../controllers/interview.controller'); 
const authMiddleware = require('../middlewares/auth.middleware.js');

const interviewRouter = express.Router();

interviewRouter.post('/generate-questions', authMiddleware, generateQuestions);
interviewRouter.post('/submit-answer', authMiddleware, submitAnswer);
interviewRouter.post('/finish', authMiddleware, finishInterview);

interviewRouter.get('/my-interviews', authMiddleware, getUserInterviews);
interviewRouter.get("/report/:id", authMiddleware, getInterviewReport);

module.exports = interviewRouter;