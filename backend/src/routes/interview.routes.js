const express = require('express');
const { finishInterview, generateQuestions, submitAnswer, getUserInterviews, getInterviewReport } = require('../controllers/interview.controller'); 
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/generate-questions', authMiddleware, generateQuestions);
router.post('/submit-answer', authMiddleware, submitAnswer);
router.post('/finish', authMiddleware, finishInterview);

router.get('/my-interviews', authMiddleware, getUserInterviews);
router.get("/report/:id", authMiddleware, getInterviewReport);

module.exports = router;