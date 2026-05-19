
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link , useNavigate } from 'react-router-dom';
import { 
  PlayCircle, 
  Search, 
  Bell,
  TrendingUp,
  Award,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';


// Animations for premium feel

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => window.location.href = "/auth");
  }, []);

  const kpis = [
    { label: 'Readiness Score', val: '84%', trend: '+4%', icon: TrendingUp, color: '#6366f1' },
    { label: 'Total Sessions', val: '28', trend: '+2', icon: PlayCircle, color: '#10b981' },
    { label: 'Success Rate', val: '72%', trend: '+5%', icon: Award, color: '#f59e0b' },
    { label: 'Practice Time', val: '14.5h', trend: '+1.2h', icon: Clock, color: '#0ea5e9' },
  ];

  const [interviews, setInterviews] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3000/api/interview/my-interviews", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("API DATA:", res.data); // 👈 ADD THIS
          setInterviews(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

  return (
    <div className="flex-1 min-h-screen bg-[#0b0f1a] overflow-y-auto custom-scrollbar">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-slate-800/50 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-5">
            {/* AI Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#111827]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              <span className="text-xs font-medium text-slate-400">
                AI Systems Online
              </span>
            </div>

            {/* Bell */}
            <button
              className="p-2 rounded-xl border border-slate-800 bg-[#111827] text-slate-500 hover:text-white hover:border-slate-700 transition-all"
            >
              <Bell size={18} />
            </button>

            {/* User */}
            <div className="flex items-center gap-3 border-l border-slate-800 pl-5">

              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">
                  {user?.username || "test_2"}
                </p>

                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter mt-1">
                  Basic Plan
                </p>
              </div>

              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                {user?.username?.charAt(0).toUpperCase() || "T"}
              </div>

            </div>
          </div>
      </header>

      {/* Content Area */}
      <main className="max-w-[1600px] mx-auto px-8 py-10">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome back, <span className="text-indigo-400">{user?.username || "test_2"}</span>
          </h1>

          <p className="text-slate-400 mt-2">
            Track your interview performance, analytics, and AI practice sessions.
          </p>
        </div>

        {/* KPI Stats Grid */}
        <motion.div 
          variants={containerVariant} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          {kpis.map((kpi, i) => (
            <motion.div 
              key={i} variants={itemVariant}
              className="bg-[#161c2e] border border-slate-800/40 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <kpi.icon size={20} style={{ color: kpi.color }} />
                </div>
                <span className="text-[10px] font-bold py-1 px-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {kpi.trend}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{kpi.val}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Recent Performance Table */}
          <motion.div 
            variants={itemVariant} initial="hidden" animate="visible"
            className="col-span-12 lg:col-span-8 bg-[#161c2e] border border-slate-800/40 rounded-2xl shadow-2xl shadow-black/40"
          >
            <div className="px-6 py-5 border-b border-slate-800/60 flex justify-between items-center">
              <h3 className="font-bold text-white">Recent Performance</h3>
              <Link to="/history" className="text-xs text-indigo-400 flex items-center gap-1 hover:underline">
                Full History <ChevronRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-800/50">
                  {[...(interviews || [])]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 4)
                    .map((row, i) => {
                      const score = row.finalScore ? row.finalScore * 10 : 0;
                    
                      let color = "#6366f1"; // default indigo
                    
                      if (score >= 85) color = "#10b981"; // green
                      else if (score >= 70) color = "#6366f1"; // indigo
                      else color = "#f59e0b"; // yellow
                    
                      return (
                        <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-white">
                              {row.role || "Interview"}
                            </p>
                          </td>
                      
                          <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                            {new Date(row.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-center gap-1.5">
                              <span className="text-xs font-bold" style={{ color }}>
                                {score}%
                              </span>
                          
                              <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full"
                                  style={{
                                    width: `${score}%`,
                                    backgroundColor: color,
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                                
                          <td className="px-6 py-4">
                            <div className="flex justify-end">
                              {row.status === "completed" ? (
                                <button
                                  onClick={() => navigate(`/report/${row._id}`)}
                                  className="px-4 py-2 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rounded-xl hover:bg-slate-700 hover:border-slate-600 transition-all duration-200"
                                >
                                  Review
                                </button>
                              ) : (
                                <div className="px-4 py-2 text-xs font-medium bg-orange-500/10 text-orange-400 border-orange-500/20 rounded-xl">
                                  Pending
                                </div>
                              )}
                            </div>
                          </td>

                          
                        </tr>
                      );
                    })}
                </tbody>

              </table>
            </div>
          </motion.div>

          {/* Right Action Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* CTA Card */}
            <motion.div 
              variants={itemVariant} initial="hidden" animate="visible"
              className="bg-indigo-600 rounded-2xl p-6 relative overflow-hidden group shadow-xl shadow-indigo-900/20"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Ready to practice?</h3>
                <p className="text-indigo-100 text-xs mb-6 leading-relaxed opacity-90">
                  Your AI twin is ready to simulate a technical interview for Amazon.
                </p>
                <button
                  onClick={() => navigate("/practice")}
                  className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <PlayCircle size={18} /> Start Session
                </button>
              </div>
              {/* Decorative Circle Icon */}
              <div className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform duration-1000">
                <PlayCircle size={160} />
              </div>
            </motion.div>

            {/* Upcoming Mocks Card */}
            <motion.div 
              variants={itemVariant} initial="hidden" animate="visible"
              className="bg-[#161c2e] border border-slate-800/40 p-6 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="text-indigo-400" size={16} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Upcoming Mocks</h3>
              </div>
              <div className="p-4 bg-slate-900/50 border border-slate-800/60 rounded-xl flex justify-between items-center group cursor-pointer hover:border-slate-700 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white">System Design</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Oct 24 • 14:00 PM</p>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            </motion.div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;