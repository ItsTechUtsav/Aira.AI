
import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, Calendar, Clock, CheckCircle2 } from 'lucide-react';

const InterviewHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/interview/my-interviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      setInterviews(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🎨 color logic
  const getColor = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 50) return "bg-indigo-500";
    return "bg-orange-500";
  };

  // ⏱ duration logic
  const getDuration = (interview) => {
    if (interview.status === "completed") return "10m";

    const answered = interview.questions.filter(q => q.answer).length;
    return `${answered * 2}m`;
  };

  // 📊 percentage logic
  const getPercentage = (interview) => {
    if (!interview.finalScore) return 0;

    // finalScore is avg (0–10), convert to %
    return Math.round((interview.finalScore / 10) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-300 p-8 font-sans">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Interview History</h1>
          <p className="text-slate-400">Review your past sessions and track your growth.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="bg-[#161d2f] border border-slate-800 rounded-lg py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="flex items-center gap-2 bg-[#161d2f] border border-slate-800 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 uppercase text-xs tracking-wider border-b border-slate-800">
              <th className="pb-4 font-semibold">Interview Details</th>
              <th className="pb-4 font-semibold">Date</th>
              <th className="pb-4 font-semibold">Score</th>
              <th className="pb-4 font-semibold">Duration</th>
              <th className="pb-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {interviews
              .filter(item =>
                item.role.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((interview) => {
                const percent = getPercentage(interview);
                const color = getColor(percent);

                return (
                  <tr key={interview._id} className="group hover:bg-white/5 transition-colors">
                    
                    {/* Role */}
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                          <Briefcase className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{interview.role}</div>
                          <div className="text-sm text-slate-500">{interview.type}</div>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm">
                          {new Date(interview.createdAt).toDateString()}
                        </span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-5">
                      <div className="flex items-center gap-3 min-w-[120px]">
                        <span className="font-bold text-white text-sm">{percent}%</span>
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${color} rounded-full`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-5">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-slate-500" />
                        {getDuration(interview)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-5">
                      <div
                        className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-md w-fit border ${
                          interview.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {interview.status}
                      </div>
                    </td>

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewHistory;