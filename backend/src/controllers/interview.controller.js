import { Askai } from "../services/openRouter.service.js";
import interviewModel from "../models/interview.model.js";
import userModel from "../models/user.model.js";

const USE_MOCK = false;
const mockResponse = [
  "Explain your experience with React and state management in real projects.",
  "How do you handle asynchronous operations in JavaScript applications?",
  "Describe a challenging bug you fixed in a production environment.",
  "How would you optimize performance in a slow web application?",
  "Explain system design of a basic scalable web application."
];

const mockEvaluation = [
  { confidence: 9, communication: 9, correctness: 9, finalScore: 9, feedback: "Answer lacks clarity and relevant technical explanation." },
  { confidence: 9, communication: 9, correctness: 9, finalScore: 9, feedback: "Basic idea present but explanation is weak and incomplete." },
  { confidence: 9, communication: 9, correctness: 9, finalScore: 9, feedback: "Vague response, lacks real example and proper structure." },
  { confidence: 9, communication: 9, correctness: 9, finalScore: 9, feedback: "Does not address performance optimization clearly." },
  { confidence: 9, communication: 9, correctness: 9, finalScore: 9, feedback: "System design explanation is unclear and incomplete." }
];

const cleanJsonString = (rawString) => {
  return rawString
    .replace(/^```json\s*/i, "")  
    .replace(/```$/, "")        
    .trim();
};

export const generateQuestions = async (req, res) => {
  try {
    const { role, difficulty, type } = req.body;

    if (!role || !difficulty || !type) {
      return res.status(400).json({ message: "Role, difficulty, and type are required" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No userId" });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    const existingInterviewsCount = await interviewModel.countDocuments({ userId: user._id });
    if (existingInterviewsCount >= 1) {
      return res.status(403).json({ 
        message: "You have completed your 1 free AI structural trial session allocation space under this beta release." 
      });
    }

    const userPrompt = `Role: ${role}\nDifficulty: ${difficulty}\nType: ${type}`;

    const messages = [
      {
        role: "system",
        content: `You are a professional interviewer. Generate exactly 5 interview questions.
        
        Strict Rules:
        - Return ONLY a raw JSON array containing exactly 5 string elements.
        - Questions MUST match the given role and level.
        - Format must look exactly like this sample: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]`
      },
      {
        role: "user",
        content: userPrompt
      }
    ];

    let questionsArray;

    if (USE_MOCK) {
      questionsArray = mockResponse;
    } else {
      const aiResponse = await Askai(messages);
      if (!aiResponse) {
        return res.status(500).json({ message: "AI returned an empty response" });
      }

      try {
       
        const cleanedResponse = cleanJsonString(aiResponse);
        questionsArray = JSON.parse(cleanedResponse);
      } catch (parseError) {
       
        questionsArray = aiResponse
          .split("\n")
          .map(q => q.replace(/^[0-9].\s*/, "").trim()) 
          .filter(q => q.length > 0)
          .slice(0, 5);
      }
    }

    if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
      return res.status(500).json({ message: "AI failed to generate structural array questions" });
    }

    const interview = await interviewModel.create({
      userId: user._id,
      role,
      difficulty,
      type,
      questions: questionsArray.map((q) => ({
        question: q,
        timelimit: 120,
      }))
    });

    return res.json({
      interviewId: interview._id,
      questions: interview.questions,
      username: user.username
    });

  } catch (error) {
    console.error("Question Generation Error:", error);
    return res.status(500).json({ message: "Error generating questions" });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionindex, answer, timetaken } = req.body;

    const interview = await interviewModel.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    const question = interview.questions[questionindex];
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (!answer) {
      question.score = 0;
      question.feedback = "No answer provided";
      question.answer = "";
      await interview.save();
      return res.json({ feedback: question.feedback });
    }

    if (timetaken > question.timelimit) {
      question.score = 0;
      question.feedback = "Time limit exceeded";
      question.answer = answer;
      await interview.save();
      return res.json({ feedback: question.feedback });
    }

    const messages = [
      {
        role: "system",
        content: `You are an expert evaluator. Score the answer out of 10 points.
        Return ONLY a single valid JSON block matching this schema:
        {
          "confidence": number,
          "communication": number,
          "correctness": number,
          "finalScore": number,
          "feedback": "10-15 word human feedback assessment string"
        }`
      },
      {
        role: "user",
        content: `Question: ${question.question}\nAnswer: ${answer}`
      }
    ];

    let parsed;

    if (USE_MOCK) {
      parsed = mockEvaluation[questionindex] || {
        confidence: 1, communication: 1, correctness: 1, finalScore: 1, feedback: "Average answer."
      };
    } else {
      const aiResponse = await Askai(messages);
      try {
        const cleanedResponse = cleanJsonString(aiResponse);
        parsed = JSON.parse(cleanedResponse);
      } catch (error) {
        return res.status(500).json({ message: "Invalid AI evaluation response layout block structure." });
      }
    }

    question.answer = answer;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.score = parsed.finalScore;
    question.feedback = parsed.feedback;

    await interview.save();

    return res.status(200).json({ feedback: question.feedback });

  } catch (error) {
    return res.status(500).json({ message: "Error submitting answer" });
  }
};

export const finishInterview = async (req, res) => {
  try {
    const { interviewId, status } = req.body;

    const interview = await interviewModel.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.status === "completed") {
      return res.status(400).json({ message: "Interview already completed" });
    }

    const answeredQuestions = interview.questions.filter(q => q.answer);
    const totalquestions = answeredQuestions.length;

    let totalscore = 0, totalconfidence = 0, totalcommunication = 0, totalcorrectness = 0;

    answeredQuestions.forEach(q => {
      totalscore += q.score || 0;
      totalconfidence += q.confidence || 0;
      totalcommunication += q.communication || 0;
      totalcorrectness += q.correctness || 0;
    });

    const finalscore = totalquestions ? totalscore / totalquestions : 0;
    const avgconfidence = totalquestions ? totalconfidence / totalquestions : 0;
    const avgcommunication = totalquestions ? totalcommunication / totalquestions : 0;
    const avgcorrectness = totalquestions ? totalcorrectness / totalquestions : 0;

    let performance = "Needs Improvement";
    if (finalscore >= 8) performance = "Excellent";
    else if (finalscore >= 6) performance = "Good";
    else if (finalscore >= 4) performance = "Average";

    const reportPrompt = [
      {
        role: "system",
        content: `Return valid JSON containing matrix evaluation overview properties:
        {
          "summary": "2-3 sentences overview assessment score description",
          "strengths": ["point1", "point2"],
          "weaknesses": ["point1", "point2"]
        }`
      },
      {
        role: "user",
        content: interview.questions.map((q, i) => 
          `Q${i+1}: ${q.question}\nAnswer: ${q.answer}\nScore: ${q.score}\nFeedback: ${q.feedback}`
        ).join("\n\n")
      }
    ];

    let reportData;

    if (USE_MOCK) {
      reportData = {
        summary: "Good overall performance but needs better technical depth.",
        strengths: ["Clear communication", "Good confidence"],
        weaknesses: ["Lacks detailed examples", "Weak technical explanations"]
      };
    } else {
      const aiRes = await Askai(reportPrompt);
      try {
        const cleanedResponse = cleanJsonString(aiRes);
        reportData = JSON.parse(cleanedResponse);
      } catch (err) {
        reportData = {
          summary: "Unable to generate detailed summary report.",
          strengths: [],
          weaknesses: []
        };
      }
    }

    interview.finalScore = finalscore;
    interview.status = status || "completed";
    interview.summary = reportData.summary;
    interview.strengths = reportData.strengths;
    interview.weaknesses = reportData.weaknesses;

    await interview.save();

    return res.status(200).json({
      interviewId: interview._id,
      finalScore: Number(finalscore.toFixed(1)),
      confidence: Number(avgconfidence.toFixed(1)),
      communication: Number(avgcommunication.toFixed(1)),
      correctness: Number(avgcorrectness.toFixed(1)),
      summary: interview.summary,
      strengths: interview.strengths,
      weaknesses: interview.weaknesses,
      performance,
      questionWiseScore: interview.questions.map(q => ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || "",
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      }))
    });

  } catch (error) {
    return res.status(500).json({ message: "Error finishing interview" });
  }
};

export const getUserInterviews = async (req, res) => {
  try {
    const interviews = await interviewModel
      .find({ userId: req.userId })
      .select("role finalScore createdAt status questions")
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching interviews" });
  }
};

export const getInterviewReport = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await interviewModel.findById(id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    return res.json({
      role: interview.role,
      difficulty: interview.difficulty,
      type: interview.type,
      finalScore: interview.finalScore,
      performance: interview.finalScore >= 8 ? "Excellent" : interview.finalScore >= 6 ? "Good" : interview.finalScore >= 4 ? "Average" : "Needs Improvement",
      summary: interview.summary,
      strengths: interview.strengths,
      weaknesses: interview.weaknesses,
      questions: interview.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        score: q.score,
        feedback: q.feedback,
        confidence: q.confidence,
        communication: q.communication,
        correctness: q.correctness
      })),
      createdAt: interview.createdAt
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching report" });
  }
};