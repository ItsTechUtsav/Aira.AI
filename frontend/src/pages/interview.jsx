import React, { useState, useEffect, useRef } from 'react';
import interviewerImg from "../assets/interviewer.png";
import {
  Mic,
  Video,
  PhoneOff,
  ChevronRight,
  User,
  ShieldCheck,
  Briefcase,
  Code,
  Loader2
} from 'lucide-react';

import { useLocation, useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const userName = state?.username || "User";
  const role = state?.role || "Engineering";
  const type = state?.type || "Technical";
  const difficulty = state?.difficulty || "Medium";
  const questions = state?.questions || [];
  const interviewId = state?.interviewId;

  const [timeLeft, setTimeLeft] = useState(120);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);

  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [isFinishingInterview, setIsFinishingInterview] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion =
    currentIndex < questions.length
      ? questions[currentIndex]?.question
      : null;

  const totalTime = 120;

  const radius = 28;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const progress = timeLeft / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  const answerRef = useRef("");
  const recognitionRef = useRef(null);
  const transcriptBuffer = useRef("");
  const processingRef = useRef(false);

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getColor = () => {
    if (timeLeft <= 20) return "#ef4444";
    if (timeLeft <= 60) return "#f97316";
    return "#22c55e";
  };

  const submitAnswer = async () => {
    try {
      setIsSubmittingAnswer(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/interview/submit-answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            interviewId,
            questionindex: currentIndex,
            answer: answerRef.current,
            timetaken: 120 - timeLeft,
          }),
        }
      );

      const data = await res.json();
      console.log("Answer Feedback:", data);

    } catch (err) {
      console.log("Error submitting answer:", err);
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const finishInterview = async () => {
    if (processingRef.current) return;

    try {
      processingRef.current = true;
      setIsFinishingInterview(true);

      stopMic();

      await submitAnswer();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/interview/finish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ interviewId }),
        }
      );

      const data = await res.json();

      if (data.interviewId) {
        navigate(`/report/${data.interviewId}`);
      } else {
        alert(data.message || "Failed to finish interview.");
      }

    } catch (err) {
      console.log(err);
    } finally {
      processingRef.current = false;
      setIsFinishingInterview(false);
    }
  };

  const handleTimeUp = async () => {
    if (processingRef.current) return;

    processingRef.current = true;

    try {
      stopMic();

      await submitAnswer();

      if (currentIndex >= questions.length - 1) {
        await finishInterview();
        return;
      }

      setIsTransitioning(true);

      setTimeout(() => {
        setAnswer("");
        answerRef.current = "";
        setTimeLeft(120);

        setCurrentIndex(prev => prev + 1);

        setIsTransitioning(false);
        processingRef.current = false;
      }, 1200);

    } catch (err) {
      console.log(err);
      processingRef.current = false;
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);

  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft]);

  const handleNext = async () => {
    if (processingRef.current) return;

    if (currentIndex >= questions.length - 1) {
      await finishInterview();
      return;
    }

    processingRef.current = true;

    try {
      stopMic();

      await submitAnswer();

      setIsTransitioning(true);

      setTimeout(() => {
        setAnswer("");
        answerRef.current = "";
        setTimeLeft(120);

        setCurrentIndex(prev => prev + 1);

        setIsTransitioning(false);
        processingRef.current = false;
      }, 1000);

    } catch (err) {
      console.log(err);
      processingRef.current = false;
    }
  };

  const endInterview = async () => {
    if (processingRef.current) return;

    try {
      processingRef.current = true;
      setIsFinishingInterview(true);

      stopMic();

      await submitAnswer();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/interview/finish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            interviewId,
            status: "pending",
          }),
        }
      );

      await res.json();

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
    } finally {
      processingRef.current = false;
      setIsFinishingInterview(false);
    }
  };

  const startMic = () => {
    transcriptBuffer.current = answerRef.current
      ? answerRef.current + " "
      : "";

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        ++i
      ) {
        if (event.results[i].isFinal) {
          finalTranscript +=
            event.results[i][0].transcript + " ";
        } else {
          interimTranscript +=
            event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        transcriptBuffer.current += finalTranscript;
      }

      setAnswer(
        transcriptBuffer.current + interimTranscript
      );
    };

    recognitionRef.current.onerror = (e) => {
      console.error("Speech Recognition Error: ", e);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();

    setIsListening(true);
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsListening(false);
  };

  const toggleMic = () => {
    if (isListening) stopMic();
    else startMic();
  };

  const speakQuestion = (text) => {
    if (!text) return;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (currentQuestion && !isTransitioning) {
      speakQuestion(currentQuestion);
    }

    return () => window.speechSynthesis.cancel();

  }, [currentIndex, currentQuestion, isTransitioning]);

  return (
    <div className="min-h-screen bg-[#070914] text-gray-100 flex flex-col font-sans">

      {/* TOP NAVBAR */}
      <header className="h-20 border-b border-[#1f293a] bg-[#0b0e1a] px-8 flex items-center justify-between sticky top-0 z-50">

        <div className="flex items-center gap-8">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <Video size={18} className="text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Aira.ai
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 pl-8 border-l border-gray-800">

            <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-indigo-500/30">
              <User size={14} className="text-indigo-400" />
              <span className="text-sm font-medium">{userName}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-gray-700">
              <Briefcase size={14} className="text-gray-400" />
              <span className="text-sm text-gray-300">{role}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-gray-700">
              <Code size={14} className="text-blue-400" />
              <span className="text-sm text-gray-300">{type}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-gray-700">
              <ShieldCheck size={14} className="text-orange-400" />
              <span className="text-sm text-gray-300">{difficulty}</span>
            </div>

          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold border-2 border-[#1f293a]">
          {userName?.[0]?.toUpperCase() || "U"}
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-[1600px] mx-auto w-full">

        {/* LEFT */}
        <section className="flex-[4] flex flex-col gap-4">

          <div className="relative flex-1 bg-[#0b0e1a] rounded-3xl border border-[#1f293a] overflow-hidden shadow-2xl flex items-center justify-center group">

           <img
  src={interviewerImg}
  alt="AI Interviewer"
  className="w-full h-full object-cover"
/>

<div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl">
  <p className="text-white font-medium">
    AI Interviewer is active...
  </p>
</div>

            <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>

              <span className="text-xs font-bold uppercase tracking-widest">
                Live Session
              </span>
            </div>

          </div>
        </section>

        {/* RIGHT */}
        <section className="flex-[5] flex flex-col gap-4">

          <div className="flex-1 bg-[#111421] rounded-3xl border border-[#1f293a] p-8 flex flex-col shadow-2xl relative">

            <div className="flex justify-between items-start gap-6 mb-8">

              <div className="space-y-2">

                <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider">
                  Question {String(Math.min(currentIndex + 1, questions.length)).padStart(2, "0")} of {questions.length}
                </span>

                <h2 className="text-2xl font-bold leading-tight min-h-[80px] flex items-center">

                  {isTransitioning ? (
                    <div className="flex items-center gap-3 text-indigo-400">
                      <Loader2 size={24} className="animate-spin" />
                      Loading next question...
                    </div>
                  ) : (
                    currentQuestion || "Question unavailable"
                  )}

                </h2>
              </div>

              <div className="flex items-center gap-3">

                <svg
                  height={radius * 2}
                  width={radius * 2}
                  className="rotate-[-90deg]"
                >
                  <circle
                    stroke="#1f293a"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={radius - stroke / 2}
                    cx={radius}
                    cy={radius}
                  />

                  <circle
                    stroke={getColor()}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={radius - stroke / 2}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>

                <span
                  className="text-xl font-bold tracking-tight"
                  style={{ color: getColor() }}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* ANSWER BOX */}
            <div className="relative flex-1 group">

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isTransitioning}
                className="w-full h-full bg-[#070914] border border-[#1f293a] rounded-2xl p-6 text-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner disabled:opacity-60"
                placeholder="Type your answer here..."
              />

              <button
                onClick={toggleMic}
                disabled={isTransitioning}
                className={`absolute bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${
                  isListening
                    ? "bg-red-500 scale-105"
                    : "bg-indigo-600 hover:bg-indigo-500 hover:scale-105"
                }`}
              >
                <Mic
                  size={24}
                  className={isListening ? "animate-pulse" : ""}
                />
              </button>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex items-center justify-between">

              {/* END */}
              <button
                onClick={endInterview}
                disabled={isFinishingInterview || isTransitioning}
                className="flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-red-500/10 active:scale-95 text-red-400 hover:text-red-500 rounded-xl font-bold transition-all duration-200 border border-red-500/30 hover:border-red-500/60 backdrop-blur-md disabled:opacity-50"
              >
                {isFinishingInterview ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <PhoneOff size={18} />
                )}

                Ending...
              </button>

              {/* NEXT / SUBMIT */}
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={isSubmittingAnswer || isTransitioning}
                  className="flex items-center gap-2 px-10 py-4 bg-green-500/10 hover:bg-green-500/20 active:scale-95 text-green-400 hover:text-green-300 rounded-xl font-bold transition-all duration-200 border border-green-500/30 hover:border-green-500/60 backdrop-blur-md disabled:opacity-50"
                >

                  {(isSubmittingAnswer || isTransitioning) ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <ChevronRight size={20} />
                  )}

                  {(isSubmittingAnswer || isTransitioning)
                    ? "Processing..."
                    : "Next Question"}

                </button>
              ) : (
                <button
                  onClick={finishInterview}
                  disabled={isFinishingInterview || isTransitioning}
                  className="flex items-center gap-2 px-10 py-4 bg-indigo-500/10 hover:bg-indigo-500/20 active:scale-95 text-indigo-400 hover:text-indigo-300 rounded-xl font-bold transition-all duration-200 border border-indigo-500/30 hover:border-indigo-500/60 backdrop-blur-md disabled:opacity-50"
                >

                  {isFinishingInterview ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <ChevronRight size={20} />
                  )}

                  {isFinishingInterview
                    ? "Submitting..."
                    : "Submit Interview"}

                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="h-12 border-t border-[#1f293a] flex items-center justify-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">
          Secure AI Interview Environment • Powered by Aira.AI
        </p>
      </footer>
    </div>
  );
};

export default InterviewPage;