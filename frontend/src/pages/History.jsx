import React, { useState } from 'react';
import { Search, Filter, Briefcase, Calendar, Clock, CheckCircle2 } from 'lucide-react';

// --- Mock Data ---
const INTERVIEW_DATA = [
  { id: 1, role: "Senior Frontend Engineer", company: "Google", date: "Apr 14, 2026", score: 92, duration: "24m", status: "Completed", color: "bg-emerald-500" },
  { id: 2, role: "Product Manager", company: "Stripe", date: "Apr 12, 2026", score: 84, duration: "18m", status: "Completed", color: "bg-indigo-500" },
  { id: 3, role: "Backend Developer", company: "Meta", date: "Apr 10, 2026", score: 78, duration: "22m", status: "Completed", color: "bg-indigo-500" },
  { id: 4, role: "Frontend Engineer", company: "Vercel", date: "Apr 05, 2026", score: 88, duration: "20m", status: "Completed", color: "bg-emerald-500" },
  { id: 5, role: "Fullstack Developer", company: "Airbnb", date: "Mar 28, 2026", score: 82, duration: "25m", status: "Completed", color: "bg-indigo-500" },
  { id: 6, role: "Software Engineer", company: "Amazon", date: "Mar 22, 2026", score: 75, duration: "15m", status: "Completed", color: "bg-orange-500" },
];

const InterviewHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-300 p-8 font-sans">
      {/* Header Section */}
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

      {/* Table Section */}
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
            {INTERVIEW_DATA.filter(item => 
              item.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.company.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((interview) => (
              <tr key={interview.id} className="group hover:bg-white/5 transition-colors">
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                      <Briefcase className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{interview.role}</div>
                      <div className="text-sm text-slate-500">{interview.company}</div>
                    </div>
                  </div>
                </td>
                
                <td className="py-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">{interview.date}</span>
                  </div>
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <span className="font-bold text-white text-sm">{interview.score}%</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${interview.color} rounded-full`} 
                        style={{ width: `${interview.score}%` }}
                      ></div>
                    </div>
                  </div>
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {interview.duration}
                  </div>
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-2 text-xs font-medium bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md w-fit border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    {interview.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewHistory;