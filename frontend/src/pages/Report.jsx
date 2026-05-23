import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Trophy, 
  Target, 
  Zap, 
  AlertCircle, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  BarChart3, 
  ArrowLeft,
  Quote
} from "lucide-react";

export default function ReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/interview/report/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReport(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReport();
  }, [id]);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-500 rounded-full mb-4"></div>
          <p className="text-gray-400 font-medium">Analyzing Performance...</p>
        </div>
      </div>
    );
  }

  const getPerformanceStyles = (perf) => {
    const styles = {
      Excellent: "from-green-500/20 to-emerald-500/5 text-green-400 border-green-500/30",
      Good: "from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/30",
      Average: "from-yellow-500/20 to-orange-500/5 text-yellow-400 border-yellow-500/30",
      "Needs Improvement": "from-red-500/20 to-rose-500/5 text-red-400 border-red-500/30"
    };
    return styles[perf] || styles.Average;
  };

  return (
    <div className="min-h-screen bg-[#070914] text-white selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-10">
        {/* Navigation */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* --- HEADER SECTION --- */}
        <div className="relative bg-[#111421] border border-white/10 rounded-3xl p-8 mb-8 overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  Performance Insight
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Calendar size={14} />
                  {new Date(report.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                {report.role} <span className="text-gray-500 font-light">Analysis</span>
              </h1>
            </div>

            <div className={`flex flex-col items-center px-8 py-4 rounded-2xl border bg-gradient-to-br shadow-xl ${getPerformanceStyles(report.performance)}`}>
              <span className="text-4xl font-black">{report.finalScore}<span className="text-lg opacity-60">/10</span></span>
              <span className="text-sm font-bold uppercase tracking-tighter mt-1">{report.performance}</span>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-4 bg-black/20 p-5 rounded-2xl border border-white/5">
            <Quote className="text-indigo-500 shrink-0" size={24} />
            <p className="text-gray-300 leading-relaxed italic italic">"{report.summary}"</p>
          </div>
        </div>

        {/* --- INSIGHTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Strengths */}
          <div className="bg-[#111421]/50 border border-white/10 rounded-3xl p-6 hover:border-green-500/30 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                <Zap size={20} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Key Strengths</h3>
            </div>
            <ul className="space-y-3">
              {report.strengths && report.strengths.length > 0 ? (
                report.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {s}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">
                  No strong areas detected yet. Keep practicing to build strengths.
                </li>
              )}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-[#111421]/50 border border-white/10 rounded-3xl p-6 hover:border-rose-500/30 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20">
                <Target size={20} className="text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">Improvement Areas</h3>
            </div>
            <ul className="space-y-3">
              {report.weaknesses && report.weaknesses.length > 0 ? (
                report.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <AlertCircle size={18} className="text-rose-500 mt-0.5 shrink-0" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {w}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">
                  No major weaknesses detected. Try increasing answer depth for improvement.
                </li>
              )}
            </ul>
            </div>
        </div>

        {/* --- QUESTION BREAKDOWN --- */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="text-indigo-500" />
            <h3 className="text-2xl font-bold">Detailed Question Analysis</h3>
          </div>

          {report.questions.map((q, i) => (
            <div key={i} className="group bg-[#111421] border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all shadow-lg">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <h4 className="text-xl font-bold leading-tight max-w-2xl">
                    <span className="text-indigo-500 mr-2">Q{i + 1}.</span> {q.question}
                  </h4>
                  <div className="flex items-center gap-2 bg-[#070914] px-4 py-2 rounded-full border border-white/5">
                    <Trophy size={16} className="text-yellow-500" />
                    <span className="font-bold text-sm">{q.score}/10</span>
                  </div>
                </div>

                <div className="bg-black/30 rounded-2xl p-5 mb-6 border border-white/5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Your Response</p>
                  <p className="text-gray-300 leading-relaxed">{q.answer || "No response provided."}</p>
                </div>

                {/* Score Pills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {[
                    { label: "Confidence", val: q.confidence },
                    { label: "Communication", val: q.communication },
                    { label: "Correctness", val: q.correctness },
                    { label: "Score", val: q.score }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#070914] p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{stat.label}</p>
                      <p className="text-lg font-black text-indigo-400">{stat.val}<span className="text-xs opacity-40 ml-0.5">/10</span></p>
                    </div>
                  ))}
                </div>

                {/* AI Feedback */}
                <div className="flex items-start gap-4 bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/10">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
                    <MessageSquare size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-1">AI Feedback</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{q.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}