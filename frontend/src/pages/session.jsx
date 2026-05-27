import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlayCircle,
  Code,
  Server,
  Layers,
  Smartphone,
  Monitor,
  Users,
  Cpu,
  Bolt,
  Loader2,
  Crown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Session = () => {
  const navigate = useNavigate();

  const [selection, setSelection] = useState({
    role: '',
    difficulty: '',
    type: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [hasUsedFreeInterview, setHasUsedFreeInterview] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) return;

        const data = await res.json();

        setUserProfile(data);
        setHasUsedFreeInterview(data.freeInterviewUsed);

        localStorage.setItem("user", JSON.stringify(data));

      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const roles = [
    { id: 'frontend', label: 'Frontend Developer', icon: <Monitor size={18} /> },
    { id: 'backend', label: 'Backend Developer', icon: <Server size={18} /> },
    { id: 'fullstack', label: 'Full Stack Developer', icon: <Layers size={18} /> },
    { id: 'mobile', label: 'Mobile Developer', icon: <Smartphone size={18} /> },
    { id: 'architect', label: 'System Architect', icon: <Cpu size={18} /> },
    { id: 'designer', label: 'Product Designer', icon: <Code size={18} /> },
  ];

  const difficulties = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];

  const interviewTypes = [
    { id: 'hr', label: 'HR Interview', icon: <Users size={18} /> },
    { id: 'technical', label: 'Technical', icon: <Code size={18} /> },
    { id: 'both', label: 'Both', icon: <Bolt size={18} /> },
  ];

  const handleSelect = (category, value) => {
    setErrorMsg('');
    setSelection(prev => ({ ...prev, [category]: value }));
  };

  const isFormComplete =
    selection.role &&
    selection.difficulty &&
    selection.type;

  const handleStartInterview = async () => {
    if (!isFormComplete || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {

      // CHECK USER STATUS FROM BACKEND
      const checkRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const currentUser = await checkRes.json();

      if (currentUser.freeInterviewUsed) {
        setHasUsedFreeInterview(true);

        setErrorMsg(
          "You have already completed your free AI mock interview session."
        );

        setIsSubmitting(false);
        return;
      }

      // GENERATE QUESTIONS
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/interview/generate-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(selection),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(
          data.message ||
          "Unable to initialize interview pipeline."
        );

        setIsSubmitting(false);
        return;
      }

      // UPDATE LOCAL USER STATE
      const updatedUser = {
        ...currentUser,
        freeInterviewUsed: true
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUserProfile(updatedUser);
      setHasUsedFreeInterview(true);

      navigate("/interview", {
        state: {
          ...selection,
          interviewId: data.interviewId,
          questions: data.questions,
          username: data.username,
        },
      });

    } catch (error) {
      console.error("Pipeline Communication Error:", error);

      setErrorMsg(
        "Something went wrong while connecting to the AI servers."
      );

      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-white max-w-[1200px] mx-auto p-8 space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Configure Practice Run
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Select your preferred interview configuration and begin your AI evaluation session.
        </p>
      </div>

      {/* FREE LIMIT CARD */}
      {hasUsedFreeInterview && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-[#12182b] to-[#0e1326] p-7 shadow-2xl shadow-indigo-950/20"
        >
          <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Crown className="text-indigo-400" size={26} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">

                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                    Beta Access
                  </span>

                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Free Tier Used
                  </span>

                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Your free mock interview has been completed 🎉
                </h2>

                <p className="text-sm text-slate-400 leading-relaxed mt-3 max-w-[700px]">
                  Thanks for trying the Aira AI beta experience.
                  You’ve successfully completed your free evaluation session.
                  <br /><br />
                  We’re currently building Version 2.0 which will introduce
                  premium plans, advanced analytics, voice interviews,
                  personalized AI feedback, and unlimited practice sessions.
                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs text-slate-300 flex items-center gap-2">
                    <Sparkles size={14} className="text-indigo-400" />
                    AI Voice Interviews
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs text-slate-300 flex items-center gap-2">
                    <Sparkles size={14} className="text-indigo-400" />
                    Advanced Reports
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs text-slate-300 flex items-center gap-2">
                    <Sparkles size={14} className="text-indigo-400" />
                    Unlimited Sessions
                  </div>

                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[220px]">

              <button
                onClick={() => navigate("/history")}
                className="w-full bg-indigo-600 hover:bg-indigo-500 transition-all text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30"
              >
                View Interview History
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] transition-all text-slate-300 rounded-xl py-3 font-medium"
              >
                Back to Dashboard
              </button>

            </div>
          </div>
        </motion.div>
      )}

      <div className={`space-y-10 ${hasUsedFreeInterview ? "opacity-60 pointer-events-none select-none" : ""}`}>

        {/* ROLE */}
        <section className="space-y-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
            1. Target Domain Role
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => {
              const isSelected = selection.role === role.label;

              return (
                <button
                  key={role.id}
                  disabled={isSubmitting}
                  onClick={() => handleSelect('role', role.label)}
                  className={`p-5 rounded-2xl border text-sm font-medium flex items-center gap-3 transition-all duration-150 active:scale-[0.98] ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/[0.12] text-white shadow-lg shadow-indigo-950/40 font-semibold'
                      : 'border-white/[0.04] bg-[#0e1326] hover:bg-white/[0.06] hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className={isSelected ? "text-indigo-400" : "text-slate-400"}>
                    {role.icon}
                  </div>

                  {role.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* DIFFICULTY */}
        <section className="space-y-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
            2. Skill Grading Profile
          </label>

          <div className="flex flex-wrap gap-3">
            {difficulties.map((level) => {
              const isSelected = selection.difficulty === level;

              return (
                <button
                  key={level}
                  disabled={isSubmitting}
                  onClick={() => handleSelect('difficulty', level)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.95] ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'bg-[#0e1326] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/20 text-slate-300'
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </section>

        {/* TYPE */}
        <section className="space-y-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
            3. Operational Category Matrix
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {interviewTypes.map((type) => {
              const isSelected = selection.type === type.label;

              return (
                <button
                  key={type.id}
                  disabled={isSubmitting}
                  onClick={() => handleSelect('type', type.label)}
                  className={`p-6 rounded-2xl border text-sm font-medium flex flex-col items-center justify-center gap-3 text-center min-h-[110px] transition-all duration-150 active:scale-[0.98] ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/[0.12] text-white shadow-lg shadow-indigo-950/40 font-semibold'
                      : 'border-white/[0.04] bg-[#0e1326] hover:bg-white/[0.06] hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className={isSelected ? "text-indigo-400" : "text-slate-400"}>
                    {type.icon}
                  </div>

                  {type.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Error */}
        {errorMsg && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* BUTTON */}
        <div className="pt-2">
          <motion.button
            whileHover={isFormComplete && !isSubmitting ? { scale: 1.005 } : {}}
            whileTap={isFormComplete && !isSubmitting ? { scale: 0.995 } : {}}
            disabled={!isFormComplete || isSubmitting}
            onClick={handleStartInterview}
            className={`w-full py-4 rounded-xl font-semibold flex justify-center items-center gap-2 shadow-xl transition-all duration-200 ${
              isFormComplete && !isSubmitting
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30 cursor-pointer'
                : 'bg-white/[0.04] border border-white/[0.02] text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin text-white"
                />

                Generating Interview Session...
              </>
            ) : (
              <>
                <PlayCircle size={18} />
                Initialize AI Evaluation Pipeline
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Session;