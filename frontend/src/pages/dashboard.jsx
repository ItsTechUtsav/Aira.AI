

// import { Link } from "react-router-dom"

// export default function Dashboard() {

//   const activities = [
//     { role: "Senior Frontend Engineer", company: "Google", score: 92 },
//     { role: "Product Manager", company: "Stripe", score: 84 },
//     { role: "Backend Developer", company: "Meta", score: 78 }
//   ]

//   const progress = 88

//   return (
//     <div className="flex min-h-screen bg-[#0b1120] text-white">

//       {/* SIDEBAR */}

//       <div className="w-64 bg-[#0a0f1c] border-r border-slate-800 p-6 flex flex-col justify-between">

//         <div>
//           <h1 className="text-xl font-bold mb-10">AiraAI</h1>

//           <nav className="space-y-3 flex flex-col">

//             <Link to="/dashboard">
//               <button className="w-full text-left bg-indigo-600/20 border border-indigo-500 px-4 py-2 rounded-lg">
//                 Dashboard
//               </button>
//             </Link>

//             <Link to="/interview">
//               <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800">
//                 New Interview
//               </button>
//             </Link>

//             <Link to="/feedback">
//               <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800">
//                 AI Feedback
//               </button>
//             </Link>

//             <Link to="/analytics">
//               <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800">
//                 Analytics
//               </button>
//             </Link>

//             <Link to="/history">
//               <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800">
//                 History
//               </button>
//             </Link>

//           </nav>
//         </div>

//         <div className="space-y-3">
//            <Link to="/settings"> 
//                 <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800">
//                   Settings
//                 </button>
//             </Link>

//           <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800">
//             Log out
//           </button>
//         </div>

//       </div>


//       {/* MAIN CONTENT */}

//       <div className="flex-1 p-10">

//         {/* HEADER */}

//         <div className="flex justify-between items-center mb-10">

//           <div>
//             <h1 className="text-3xl font-bold">Welcome back, Neeraj</h1>
//             <p className="text-slate-400">
//               Here's how your interview preparation is going.
//             </p>
//           </div>

//           <button className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500">
//             New Practice Session
//           </button>

//         </div>


//         {/* STATS */}

//         <div className="grid md:grid-cols-3 gap-6 mb-8">

//           {/* CARD 1 */}

//           <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">

//             <p className="text-slate-400 mb-2">Readiness Score</p>

//             <h2 className="text-3xl font-bold">{progress}%</h2>

//             <p className="text-green-400 text-sm mt-1">
//               +12% from last week
//             </p>

//             <div className="w-full bg-slate-800 h-2 rounded mt-4">

//               <div
//                 className="bg-indigo-500 h-2 rounded"
//                 style={{ width: `${progress}%` }}
//               />

//             </div>

//           </div>


//           {/* CARD 2 */}

//           <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">

//             <p className="text-slate-400 mb-2">Interviews Completed</p>

//             <h2 className="text-3xl font-bold">24</h2>

//             <p className="text-slate-400 text-sm mt-1">
//               Top 5% of all candidates
//             </p>

//           </div>


//           {/* CARD 3 */}

//           <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">

//             <p className="text-slate-400 mb-2">Practice Time</p>

//             <h2 className="text-3xl font-bold">12.5h</h2>

//             <p className="text-slate-400 text-sm mt-1">
//               3.2h this week
//             </p>

//           </div>

//         </div>


//         {/* BOTTOM GRID */}

//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* ANALYTICS */}

//           <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-xl p-6">

//             <h2 className="text-lg font-semibold mb-1">
//               Performance Analytics
//             </h2>

//             <p className="text-slate-400 text-sm mb-6">
//               Your readiness score trend over the last 7 days.
//             </p>

//             <div className="h-60 flex items-end gap-4">

//               {[65, 68, 75, 72, 82, 85, 88].map((value, i) => (
//                 <div key={i} className="flex-1">

//                   <div
//                     className="bg-indigo-500/80 rounded"
//                     style={{ height: `${value}%` }}
//                   />

//                 </div>
//               ))}

//             </div>

//           </div>


//           {/* RECENT ACTIVITY */}

//           <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">

//             <h2 className="text-lg font-semibold mb-4">
//               Recent Activity
//             </h2>

//             <div className="space-y-4">

//               {activities.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between items-center bg-[#0b1222] p-3 rounded-lg"
//                 >

//                   <div>
//                     <p className="font-medium">{item.role}</p>
//                     <p className="text-xs text-slate-400">
//                       {item.company}
//                     </p>
//                   </div>

//                   <div className="text-indigo-400 font-bold">
//                     {item.score}%
//                   </div>

//                 </div>
//               ))}

//             </div>

//             <button className="mt-6 w-full border border-slate-700 py-2 rounded-lg hover:bg-slate-800">
//               View All History
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   )
// }

import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlayCircle, 
  BarChart3, 
  Clock, 
  History, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  TrendingUp,
  Award,
  Calendar,
  ChevronRight
} from 'lucide-react';

// Balanced animation for a smooth entry
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariant = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const Dashboard = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlayCircle, label: 'Practice Sessions', path: '/practice' },
    { icon: BarChart3, label: 'Performance', path: '/analytics' },
    { icon: History, label: 'Session History', path: '/history' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-300 font-sans flex">
      
      {/* Sidebar - Medium Width & Professional */}
      <aside className="w-64 bg-[#0f1424] border-r border-slate-800/50 flex flex-col">
        <div className="p-8 mb-2 flex items-center gap-3">
          <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-lg font-bold tracking-tight">Aira.ai</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            // Check if the current URL matches the item path to highlight it
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                  : 'hover:bg-slate-800/40 hover:text-white text-slate-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800/50 space-y-2">
          <Link to="/settings" className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-rose-400/80 hover:text-rose-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-10 py-8">
        
        {/* Top Navbar */}
        <header className="flex items-center justify-between mb-10">
          <div className="relative group w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search mock interviews, feedback..." 
              className="w-full bg-[#161c2e] border border-slate-800 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-white placeholder:text-slate-600"
            />
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2.5 bg-[#161c2e] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#161c2e]" />
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Krishna K.</p>
                <p className="text-[11px] text-indigo-400 font-medium tracking-wide uppercase">Pro Plan</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-600 border border-indigo-400/30 flex items-center justify-center text-white font-bold">
                K
              </div>
            </div>
          </div>
        </header>

        {/* Title Section */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Overview</h1>
          <p className="text-slate-400 text-base">Welcome back! You have 2 mock interviews scheduled for this week.</p>
        </section>

        {/* Medium KPI Grid */}
        <motion.div 
          variants={containerVariant} initial="hidden" animate="visible"
          className="grid grid-cols-4 gap-6 mb-10"
        >
          {[
            { label: 'Readiness Score', val: '84%', trend: '+4%', icon: TrendingUp, color: 'indigo' },
            { label: 'Total Sessions', val: '28', trend: '+2', icon: PlayCircle, color: 'emerald' },
            { label: 'Success Rate', val: '72%', trend: '+5%', icon: Award, color: 'amber' },
            { label: 'Practice Time', val: '14.5h', trend: '+1.2h', icon: Clock, color: 'sky' },
          ].map((kpi, i) => (
            <motion.div 
              key={i} variants={itemVariant}
              className="bg-[#161c2e] border border-slate-800/60 p-6 rounded-2xl hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`p-2 rounded-lg bg-${kpi.color}-500/10 border border-${kpi.color}-500/20`}>
                  <kpi.icon className={`w-5 h-5 text-${kpi.color}-400`} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
              <h2 className="text-2xl font-bold text-white tracking-tight">{kpi.val}</h2>
            </motion.div>
          ))}
        </motion.div>

        {/* Balanced Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Activity Card */}
          <motion.div 
            variants={itemVariant} initial="hidden" animate="visible"
            className="col-span-8 bg-[#161c2e] border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl shadow-black/20"
          >
            <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Recent Performance</h3>
              <Link to="/history" className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                Full History <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-2">
              <table className="w-full">
                <thead>
                  <tr className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Role & Company</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { role: 'Backend Developer', co: 'Netflix', date: 'Oct 12', score: '94', color: 'emerald' },
                    { role: 'Product Designer', co: 'Airbnb', date: 'Oct 09', score: '82', color: 'indigo' },
                    { role: 'System Architect', co: 'Amazon', date: 'Oct 05', score: '68', color: 'amber' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-white">{row.role}</div>
                        <div className="text-xs text-slate-500">{row.co}</div>
                      </td>
                      <td className="px-6 py-5 text-slate-400 font-medium">{row.date}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-3">
                          <span className={`text-sm font-bold text-${row.color}-400`}>{row.score}%</span>
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-${row.color}-500`} style={{ width: `${row.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-xs font-bold text-slate-400 group-hover:text-white border border-slate-800 group-hover:border-slate-600 px-3 py-1.5 rounded-lg transition-all">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right Sidebar Column */}
          <div className="col-span-4 space-y-8">
            <motion.div 
              variants={itemVariant} initial="hidden" animate="visible"
              className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Ready to practice?</h3>
                <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Your AI twin is ready to simulate a technical interview for Amazon.</p>
                <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Start Session
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <PlayCircle className="w-32 h-32" />
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariant} initial="hidden" animate="visible"
              className="bg-[#161c2e] border border-slate-800/60 p-6 rounded-2xl"
            >
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" /> Upcoming Mocks
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-xl">
                  <p className="text-sm font-bold text-white">System Design</p>
                  <p className="text-xs text-slate-500 mt-1">Oct 24 • 14:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;