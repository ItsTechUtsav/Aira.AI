// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   PlayCircle, 
//   BarChart3, 
//   Clock, 
//   History, 
//   Settings, 
//   LogOut, 
//   Search, 
//   Bell,
//   TrendingUp,
//   Award,
//   Calendar,
//   ChevronRight
// } from 'lucide-react';

// // Balanced animation for a smooth entry
// const containerVariant = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 }
//   }
// };

// const itemVariant = {
//   hidden: { y: 15, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
// };

// const Dashboard = () => {
//   const location = useLocation();
//   const [user, setUser] = useState(null);

//   const menuItems = [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
//     { icon: PlayCircle, label: 'Practice Sessions', path: '/practice' },
//     { icon: BarChart3, label: 'Performance', path: '/analytics' },
//     { icon: History, label: 'Session History', path: '/history' },
//   ];

//   useEffect(() => {
//   axios.get("http://localhost:3000/api/auth/me", {
//     withCredentials: true
//   })
//   .then(res => {
//     setUser(res.data);
//   })
//   .catch(() => {
//     window.location.href = "/auth";
//   });
// }, []);

//   return (
//     <div className="min-h-screen bg-[#0b0f1a] text-slate-300 font-sans flex">
      
//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto px-10 py-8">
        
//         {/* Top Navbar */}
//         <header className="flex items-center justify-between mb-10">
//           <div className="relative group w-96">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
//             <input 
//               type="text" 
//               placeholder="Search mock interviews, feedback..." 
//               className="w-full bg-[#161c2e] border border-slate-800 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-white placeholder:text-slate-600"
//             />
//           </div>
//           <div className="flex items-center gap-5">
//             <button className="p-2.5 bg-[#161c2e] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all relative">
//               <Bell className="w-5 h-5" />
//               <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#161c2e]" />
//             </button>
//             <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
//               <div className="text-right">
//                 <p className="text-sm font-semibold text-white">
//                   {user ? user.username : "User"}
//                 </p>
//                 <p className="text-[11px] text-indigo-400 font-medium tracking-wide uppercase">Pro Plan</p>
//               </div>
//               <div className="h-10 w-10 rounded-xl bg-indigo-600 border border-indigo-400/30 flex items-center justify-center text-white font-bold">
//                 {user?.username?.charAt(0).toUpperCase()}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Title Section */}
//         <section className="mb-10">
//           <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Overview</h1>
//           <p className="text-slate-400 text-base">
//             Welcome back <span className="text-white font-semibold">{user?.username}</span>, You have 2 mock interviews scheduled for this week.
//           </p>
//         </section>

//         {/* Medium KPI Grid */}
//         <motion.div 
//           variants={containerVariant} initial="hidden" animate="visible"
//           className="grid grid-cols-4 gap-6 mb-10"
//         >
//           {[
//             { label: 'Readiness Score', val: '84%', trend: '+4%', icon: TrendingUp, color: 'indigo' },
//             { label: 'Total Sessions', val: '28', trend: '+2', icon: PlayCircle, color: 'emerald' },
//             { label: 'Success Rate', val: '72%', trend: '+5%', icon: Award, color: 'amber' },
//             { label: 'Practice Time', val: '14.5h', trend: '+1.2h', icon: Clock, color: 'sky' },
//           ].map((kpi, i) => (
//             <motion.div 
//               key={i} variants={itemVariant}
//               className="bg-[#161c2e] border border-slate-800/60 p-6 rounded-2xl hover:border-indigo-500/30 transition-all group"
//             >
//               <div className="flex items-center justify-between mb-5">
//                 <div className={`p-2 rounded-lg bg-${kpi.color}-500/10 border border-${kpi.color}-500/20`}>
//                   <kpi.icon className={`w-5 h-5 text-${kpi.color}-400`} />
//                 </div>
//                 <span className={`text-xs font-bold px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400`}>
//                   {kpi.trend}
//                 </span>
//               </div>
//               <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
//               <h2 className="text-2xl font-bold text-white tracking-tight">{kpi.val}</h2>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Balanced Content Grid */}
//         <div className="grid grid-cols-12 gap-8">
          
//           {/* Main Activity Card */}
//           <motion.div 
//             variants={itemVariant} initial="hidden" animate="visible"
//             className="col-span-8 bg-[#161c2e] border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl shadow-black/20"
//           >
//             <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
//               <h3 className="text-lg font-bold text-white">Recent Performance</h3>
//               <Link to="/history" className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
//                 Full History <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>
//             <div className="p-2">
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">
//                     <th className="px-6 py-4">Role & Company</th>
//                     <th className="px-6 py-4">Date</th>
//                     <th className="px-6 py-4 text-center">Score</th>
//                     <th className="px-6 py-4 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm">
//                   {[
//                     { role: 'Backend Developer', co: 'Netflix', date: 'Oct 12', score: '94', color: 'emerald' },
//                     { role: 'Product Designer', co: 'Airbnb', date: 'Oct 09', score: '82', color: 'indigo' },
//                     { role: 'System Architect', co: 'Amazon', date: 'Oct 05', score: '68', color: 'amber' },
//                   ].map((row, i) => (
//                     <tr key={i} className="group hover:bg-slate-800/30 transition-colors">
//                       <td className="px-6 py-5">
//                         <div className="font-semibold text-white">{row.role}</div>
//                         <div className="text-xs text-slate-500">{row.co}</div>
//                       </td>
//                       <td className="px-6 py-5 text-slate-400 font-medium">{row.date}</td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center justify-center gap-3">
//                           <span className={`text-sm font-bold text-${row.color}-400`}>{row.score}%</span>
//                           <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
//                             <div className={`h-full bg-${row.color}-500`} style={{ width: `${row.score}%` }} />
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5 text-right">
//                         <button className="text-xs font-bold text-slate-400 group-hover:text-white border border-slate-800 group-hover:border-slate-600 px-3 py-1.5 rounded-lg transition-all">
//                           Review
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>

//           {/* Right Sidebar Column */}
//           <div className="col-span-4 space-y-8">
//             <motion.div 
//               variants={itemVariant} initial="hidden" animate="visible"
//               className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden group"
//             >
//               <div className="relative z-10">
//                 <h3 className="text-xl font-bold mb-2">Ready to practice?</h3>
//                 <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Your AI twin is ready to simulate a technical interview for Amazon.</p>
//                 <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
//                   <PlayCircle className="w-5 h-5" /> Start Session
//                 </button>
//               </div>
//               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
//                 <PlayCircle className="w-32 h-32" />
//               </div>
//             </motion.div>

//             <motion.div 
//               variants={itemVariant} initial="hidden" animate="visible"
//               className="bg-[#161c2e] border border-slate-800/60 p-6 rounded-2xl"
//             >
//               <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-indigo-400" /> Upcoming Mocks
//               </h3>
//               <div className="space-y-4">
//                 <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-xl">
//                   <p className="text-sm font-bold text-white">System Design</p>
//                   <p className="text-xs text-slate-500 mt-1">Oct 24 • 14:00 PM</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

  return (
    <div className="flex-1 min-h-screen bg-[#0b0f1a] overflow-y-auto custom-scrollbar">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-slate-800/50 px-8 py-4 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search mock interviews, feedback..." 
            className="w-full bg-[#111827] border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0b0f1a]" />
          </button>
          
          <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white leading-none">{user?.username || "test_2"}</p>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter mt-1">Pro Plan</p>
            </div>
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
              {user?.username?.charAt(0).toUpperCase() || "T"}
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-[1600px] mx-auto px-8 py-10">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-1">
            Welcome back <span className="text-slate-200 font-semibold">{user?.username || "test_2"}</span>. You have 2 mock interviews scheduled for this week.
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
                    <th className="px-6 py-4">Role & Company</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {[
                    { role: 'Backend Developer', co: 'Netflix', date: 'Oct 12', score: 94, color: '#10b981' },
                    { role: 'Product Designer', co: 'Airbnb', date: 'Oct 09', score: 82, color: '#6366f1' },
                    { role: 'System Architect', co: 'Amazon', date: 'Oct 05', score: 68, color: '#f59e0b' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-white">{row.role}</p>
                        <p className="text-[11px] text-slate-500">{row.co}</p>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 font-medium">{row.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="text-xs font-bold" style={{ color: row.color }}>{row.score}%</span>
                          <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full" style={{ width: `${row.score}%`, backgroundColor: row.color }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-3 py-1.5 bg-[#1f2937] text-[11px] font-bold text-slate-300 rounded-lg border border-slate-700 hover:bg-slate-700 transition-all">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
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
                <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-lg">
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