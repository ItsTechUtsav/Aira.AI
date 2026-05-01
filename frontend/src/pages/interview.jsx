import React, { useState, useEffect } from 'react';
import { Mic, Video, PhoneOff, ChevronRight, Clock3, User, ShieldCheck, Briefcase } from 'lucide-react';

const InterviewPage = () => {
    // --- MOCK DATA / PROPS ---
    const [userName] = useState("Krishna Krishnatrey"); // From your profile
    const [role] = useState("Full Stack Developer"); 
    const [type] = useState("Technical");
    const [difficulty] = useState("Hard");

    // Timer Logic
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes example

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timerId);
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
                        <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-indigo-500/30">
                            <User size={14} className="text-indigo-400" />
                            <span className="text-sm font-medium">{userName}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#161b30] px-3 py-1.5 rounded-full border border-gray-700">
                            <Briefcase size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-300">{role} • {type}</span>
                        </div>
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
                        K
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
                                <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider">Question 01 of 05</span>
                                <h2 className="text-2xl font-bold leading-tight">
                                    Can you describe a challenging technical problem you solved in your Aira.AI project?
                                </h2>
                            </div>
                            
                            {/* Circular Timer */}
                            <div className={`flex-shrink-0 w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-500 bg-[#070914] ${getTimerStyles()}`}>
                                <Clock3 size={16} className="mb-0.5 opacity-70" />
                                <span className="text-2xl font-black tracking-tighter">{formatTime(timeLeft)}</span>
                            </div>
                        </div>

                        {/* Text Area Input */}
                        <div className="relative flex-1 group">
                            <textarea 
                                className="w-full h-full bg-[#070914] border border-[#1f293a] rounded-2xl p-6 text-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner"
                                placeholder="Type your answer here..."
                            ></textarea>
                            
                            {/* Mic Floating Action */}
                            <button className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all">
                                <Mic size={24} />
                            </button>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-8 flex items-center justify-between">
                            <button className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-bold transition-colors border border-red-500/20">
                                <PhoneOff size={18} />
                                End Session
                            </button>
                            
                            <button className="flex items-center gap-2 px-10 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20 hover:-translate-y-0.5">
                                Next Question
                                <ChevronRight size={20} />
                            </button>
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