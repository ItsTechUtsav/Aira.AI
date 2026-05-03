import React, { useState, useEffect } from 'react';
import { Mic, Video, PhoneOff, ChevronRight, Clock3, User, ShieldCheck, Briefcase ,Code} from 'lucide-react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const InterviewPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const userName = state?.username;
    const role = state?.role;
    const type = state?.type;
    const difficulty = state?.difficulty;
    const questions = state?.questions || [];
    const interviewId = state?.interviewId;

    const [timeLeft, setTimeLeft] = useState(120); 

    const handleTimeUp = async () => {
      await submitAnswer();

      setTimeLeft(120);

      setAnswer("");

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        await finishInterview();
      }
    };

    useEffect(() => {
      if (timeLeft <= 0) return;

      const timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    
      return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
      if (timeLeft === 0) {
        handleTimeUp();
      }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getTimerStyles = () => {
        if (timeLeft < 20) return "border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
        if (timeLeft <= 60) return "border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]";
        return "border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
    };


    const totalTime = 120; 
    
    const radius = 28;
    const stroke = 5;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    
    const progress = timeLeft / totalTime;
    const strokeDashoffset = circumference * (1 - progress);
    
    const getColor = () => {
      if (timeLeft <= 20) return "#ef4444"; 
      if (timeLeft <= 60) return "#f97316"; 
      return "#22c55e"; 
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentQuestion = questions[currentIndex]?.question;

    const [answer, setAnswer] = useState("");

    const submitAnswer = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/interview/submit-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            interviewId,
            questionindex: currentIndex,
            answer,
            timetaken: 120 - timeLeft,
          }),
        });

        const data = await res.json();
        console.log("Answer Feedback:", data);

      } catch (err) {
        console.log(err);
      }
    };

    const finishInterview = async () => {
      try {
        await submitAnswer(); // 

        const res = await fetch("http://localhost:3000/api/interview/finish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ interviewId }),
        });

        const data = await res.json();
        console.log("FINAL RESULT:", data);

        navigate("/dashboard");
    

      } catch (err) {
        console.log(err);
    };
  }

  const handleNext = async () => {
      await submitAnswer();

      setCurrentIndex(prev => prev + 1);
      setAnswer("");
      setTimeLeft(120);
    };

    const endInterview = async () => {
          try {
            
            await submitAnswer();
        
            const res = await fetch("http://localhost:3000/api/interview/finish", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                interviewId,
                status: "pending",
              }),
            });
        
            const data = await res.json();
            console.log("ENDED:", data);

            navigate("/dashboard");
        
        
          } catch (err) {
            console.log(err);
          }
        };

        const recognitionRef = React.useRef(null);
        const [isListening, setIsListening] = useState(false);
        const transcriptBuffer = React.useRef("");
            
        const startMic = () => {
          transcriptBuffer.current = "";
                
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
                
          if (!SpeechRecognition) {
            alert("Speech recognition not supported");
            return;
          }
        
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
          recognitionRef.current.lang = "en-US";
        
          recognitionRef.current.onresult = (event) => {
            let finalText = "";
          
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const result = event.results[i];
            
              if (result.isFinal) {
                finalText += result[0].transcript + " ";
              }
            }
          
            if (finalText.trim()) {
              transcriptBuffer.current += finalText;
              setAnswer(transcriptBuffer.current);
            }
          };
        
          recognitionRef.current.start();
          setIsListening(true);
        };

      const stopMic = () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setIsListening(false);
      };
      
      const toggleMic = () => {
        if (isListening) stopMic();
        else startMic();
      };

      const speakQuestion = (text) => {
        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "en-US";
        speech.rate = 0.95; 
        speech.pitch = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
      };
      useEffect(() => {
        if (currentQuestion) {
          speakQuestion(currentQuestion);
        }
      }, [currentIndex]);

    return (
        <div className="min-h-screen bg-[#070914] text-gray-100 flex flex-col font-sans">
            
            {/* --- TOP NAVIGATION BAR --- */}
            <header className="h-20 border-b border-[#1f293a] bg-[#0b0e1a] px-8 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                            <Video size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Aira.ai</span>
                    </div>
                    
                   
                    {/* Session Badges */}
                <div className="hidden md:flex items-center gap-3 pl-8 border-l border-gray-800">

                    {/* User */}
                    <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-indigo-500/30">
                        <User size={14} className="text-indigo-400" />
                        <span className="text-sm font-medium">{userName}</span>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-gray-700">
                        <Briefcase size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-300">{role}</span>
                    </div>

                    {/* Type */}
                    <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-gray-700">
                        <Code size={14} className="text-blue-400" />
                        <span className="text-sm text-gray-300">{type}</span>
                    </div>

                    {/* Difficulty */}
                    <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-gray-700">
                        <ShieldCheck size={14} className="text-orange-400" />
                        <span className="text-sm text-gray-300">{difficulty}</span>
                    </div>

                </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition">
                        Help & Support
                    </button>
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold border-2 border-[#1f293a]">
                        {userName[0].toUpperCase()}
                    </div>
                </div>
            </header>

            {/* --- MAIN INTERVIEW INTERFACE --- */}
            <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-[1600px] mx-auto w-full">
                
                {/* LEFT COLUMN: AI VIDEO BOX */}
                <section className="flex-[4] flex flex-col gap-4">
                    <div className="relative flex-1 bg-[#0b0e1a] rounded-3xl border border-[#1f293a] overflow-hidden shadow-2xl flex items-center justify-center group">
                        {/* Placeholder for AI Video Component */}
                        <div className="text-center">
                            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-indigo-500/30">
                                <Video size={32} className="text-indigo-500" />
                            </div>
                            <p className="text-gray-500 font-medium italic">AI Interviewer is active...</p>
                            <div className="mt-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                <code className="text-xs bg-black px-2 py-1 rounded">{"<vidlink></vidlink>"}</code>
                            </div>
                        </div>
                        
                        {/* Status Overlay */}
                        <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-widest">Live Session</span>
                        </div>
                    </div>
                </section>

                {/* RIGHT COLUMN: QUESTION & INPUT */}
                <section className="flex-[5] flex flex-col gap-4">
                    <div className="flex-1 bg-[#111421] rounded-3xl border border-[#1f293a] p-8 flex flex-col shadow-2xl relative">
                        
                        {/* Header: Question + Timer */}
                        <div className="flex justify-between items-start gap-6 mb-8">
                            <div className="space-y-1">
                                <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider">Question {String(currentIndex + 1).padStart(2, "0")} of {questions.length}</span>
                                <h2 className="text-2xl font-bold leading-tight">
                                    {currentQuestion}
                                </h2>
                            </div>
                            
                            {/* Circular Timer */}
                            <div className="flex items-center gap-3">

                          {/* Circular Progress (LEFT) */}
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

                          {/* Digital Time (RIGHT) */}
                          <span 
                            className="text-xl font-bold tracking-tight"
                            style={{ color: getColor() }}
                          >
                            {formatTime(timeLeft)}
                          </span>

                        </div>
                      </div>

                        {/* Text Area Input */}
                        <div className="relative flex-1 group">
                            <textarea 
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              className="w-full h-full bg-[#070914] border border-[#1f293a] rounded-2xl p-6 text-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner"
                              placeholder="Type your answer here..."
                            ></textarea>
                            
                            {/* Mic Floating Action */}
                            <button
                            onClick={toggleMic}
                            className={`absolute bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all ${
                              isListening ? "bg-red-500" : "bg-indigo-600 hover:bg-indigo-500"
                            }`}
                          >
                            <Mic size={24} className={isListening ? "animate-pulse" : ""} />
                          </button>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-8 flex items-center justify-between">
                            <button 
                            onClick={endInterview}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold transition-colors border border-red-500/20">
                                <PhoneOff size={18} />
                                End Session
                            </button>
                            
                            {currentIndex < questions.length - 1 ? (
                              <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-10 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 hover:-translate-y-0.5"
                              >
                                Next Question
                                <ChevronRight size={20} />
                              </button>
                            ) : (
                              <button
                                onClick={finishInterview}
                                className="flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/20 hover:-translate-y-0.5"
                              >
                                Submit Interview
                                <ChevronRight size={20} />
                              </button>
                            )}
                            
                        </div>
                    </div>
                </section>
            </main>

            {/* Subtle Footer Decor */}
            <footer className="h-12 border-t border-[#1f293a] flex items-center justify-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">
                    Secure AI Interview Environment • Powered by Aira.AI
                </p>
            </footer>
        </div>
    );
};

export default InterviewPage;