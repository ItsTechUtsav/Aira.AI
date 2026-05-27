import {Askai} from "../services/openRouter.service.js";
import interviewModel from "../models/interview.model.js";
import userModel from "../models/user.model.js"

const USE_MOCK = false;
const mockResponse = [
  "Explain your experience with React and state management in real projects.",
  "How do you handle asynchronous operations in JavaScript applications?",
  "Describe a challenging bug you fixed in a production environment.",
  "How would you optimize performance in a slow web application?",
  "Explain system design of a basic scalable web application."
];

const mockEvaluation = [
  {
    confidence: 9,
    communication: 9,
    correctness: 9,
    finalScore: 9,
    feedback: "Answer lacks clarity and relevant technical explanation."
  },
  {
    confidence: 9,
    communication: 9,
    correctness: 9,
    finalScore: 9,
    feedback: "Basic idea present but explanation is weak and incomplete."
  },
  {
    confidence: 9,
    communication: 9,
    correctness: 9,
    finalScore: 9,
    feedback: "Vague response, lacks real example and proper structure."
  },
  {
    confidence: 9,
    communication: 9,
    correctness: 9,
    finalScore: 9,
    feedback: "Does not address performance optimization clearly."
  },
  {
    confidence: 9,
    communication: 9,
    correctness: 9,
    finalScore: 9,
    feedback: "System design explanation is unclear and incomplete."
  }
];

export const generateQuestions = async (req, res) => {
  try {


    const { role, difficulty, type } = req.body;


    if (!role || !difficulty || !type) {
      return res
        .status(400)
        .json({ message: "Role, difficulty, and type are required" });
    }

    // const user = await userModel.findById(req.userId);
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No userId" });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPrompt = `
        Role: ${role}
        Difficulty: ${difficulty}
        Type: ${type}  
        `;

    const messages = [
  {
    role: "system",
    content: `
        You are a professional interviewer.

        Generate exactly 5 interview questions.

        Strict Rules:
        - Questions MUST strictly match the given role and interview type.
        - Questions MUST be ${difficulty} level only (do NOT mix levels).
        - Each question must be 15–25 words.
        - Each question must be one complete sentence.
        - Do NOT number them.
        - Do NOT add explanations.
        - Do NOT add extra text before or after.
        - One question per line only.
        - Return ONLY valid JSON.

        Type Rules:
        - If type is "Technical": ask only technical questions related to the role
        - If type is "HR": ask only behavioral/interpersonal questions
        - If type is "Both": include a mix of technical and HR questions
 
        Question Generation Rules:
        Make questions based or relevnt on the candidate's or user role, interviewMode or type, and difficulty(dont mix the levels) all given by user and strictly follow the rules.
        `
          },
          {
            role: "user",
            content: userPrompt
          }
        ];

        // JUST FOR TESTING 

        // const aiResponse = await Askai(messages);

        // if (!aiResponse) {
        //   return res.status(500).json({ message: "ai return empty" });
        // }

        // const questionsArray = aiResponse
        // .split("\n")
        // .map(q => q.trim())
        // .filter(q => q.length > 0)
        // .slice(0, 5);

        // this is replacment 

        const aiResponse = USE_MOCK
          ? mockResponse
          : await Askai(messages);

        // const questionsArray = aiResponse;

        let questionsArray;

        if (USE_MOCK) {
          questionsArray = aiResponse;
        } else {
          questionsArray = aiResponse
            .split("\n")
            .map(q => q.trim())
            .filter(q => q.length > 0)
            .slice(0, 5);
        }

        if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
          return res.status(500).json({ message: "AI failed to generate question" });
        }

        const interview = await interviewModel.create({
            userId: user._id,
            role,
            difficulty,
            type,
            questions: questionsArray.map((q,index)=> ({
                question: q,
                timelimit: 120, 
            }))
        });

        res.json({
            interviewId: interview._id,
            questions: interview.questions,
            username: user.username 
        });

      } catch (error) {
        return res.status(500).json({ message: "Error generating questions"});
      }
    };



export const submitAnswer = async (req, res) => {
    try {
        const { interviewId, questionindex, answer, timetaken} = req.body;

        const interview = await interviewModel.findById(interviewId);
 

        if(!interview){
            return res.status(404).json({ message: "Interview not found"});
        };

        const question = interview.questions[questionindex];

        if(!question){
            return res.status(404).json({ message: "Question not found"});
        }

        if(!answer){
          question.score = 0;
          question.feedback = "No answer provided";
          question.answer = "";

          await interview.save();
           return res.json({
            feedback: question.feedback,
           })
        }

        if(timetaken > question.timelimit){
          question.score = 0;
          question.feedback = "Time limit exceeded";
          question.answer = answer;

          await interview.save();

          return res.json({
            feedback: question.feedback,
           })
        }

        const messages = [
      {
        role: "system",
            content: `
        You are a professional human interviewer evaluating a candidate's answer in a real interview.

        Evaluate naturally and fairly, like a real person would.

        Score the answer in these areas (0 to 10):

        1. Confidence – Does the answer sound clear, confident, and well-presented?
        2. Communication – Is the language simple, clear, and easy to understand?
        3. Correctness – Is the answer accurate, relevant, and complete?

        Rules:
        - Be realistic and unbiased. 
        - Do not give random high scores.
        - If the answer is weak, score low.
        - If the answer is strong and detailed, score high.
        - Consider clarity, structure, and relevance.

        Calculate:
        finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

        Feedback Rules:
        - Write natural human feedback.
        - 10 to 15 words only.
        - Sound like real interview feedback.
        - Can suggest improvement if needed.
        - Do NOT repeat the question.
        - Do NOT explain scoring.
        - Keep tone professional and honest.

        Return ONLY valid JSON in this format:

        {
          "confidence": number,
          "communication": number,
          "correctness": number,
          "finalScore": number,
          "feedback": "short human feedback"
        }
        `
          }
          ,
          {
            role: "user",
            content: `
            Question: ${question.question}
            Answer: ${answer}
            `
          }
        ];

        let parsed;

        if (USE_MOCK) {
          parsed = mockEvaluation[questionindex] || {
          confidence: 1,
          communication: 1,
          correctness: 1,
          finalScore: 1,
          feedback: "Average answer, needs improvement."
        };
        } else {
          const aiResponse = await Askai(messages);
        
          try {
            parsed = JSON.parse(aiResponse);
          } catch (error) {
            return res.status(500).json({ message: "Invalid AI response format" });
          }
        }

        question.answer = answer;
        question.confidence = parsed.confidence;
        question.communication = parsed.communication;
        question.correctness = parsed.correctness;
        question.score = parsed.finalScore;
        question.feedback = parsed.feedback; 

        await interview.save();

        return res.status(200).json({
            feedback: question.feedback,
        });


    } catch (error) {
        return res.status(500).json({ message: "Error submitting answer"});
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
    
    let totalscore = 0;
    let totalconfidence = 0;
    let totalcommunication = 0;
    let totalcorrectness = 0;

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
        content: `
You are an expert interview evaluator.

Return JSON:
{
  "summary": "2-3 lines overall performance",
  "strengths": ["point1", "point2"],
  "weaknesses": ["point1", "point2"]
}
`
      },
      {
        role: "user",
        content: interview.questions.map((q, i) => 
            `Q${i+1}: ${q.question}
             Answer: ${q.answer}
             Score: ${q.score}
             Feedback: ${q.feedback}`
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
        reportData = JSON.parse(aiRes);
      } catch (err) {
        reportData = {
          summary: "Unable to generate detailed summary.",
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
      performance: interview.finalScore >= 8
        ? "Excellent"
        : interview.finalScore >= 6
        ? "Good"
        : interview.finalScore >= 4
        ? "Average"
        : "Needs Improvement",
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