import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlayCircle,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Sparkles,
  Bell,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ username: "krishna" });
  const [loading, setLoading] = useState(true);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [allInterviews, setAllInterviews] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSafeNavigate = (path, options = {}) => {
    if (isNavigating) return;

    setIsNavigating(true);
    navigate(path, options);

    setTimeout(() => {
      setIsNavigating(false);
    }, 800);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user context", e);
      }
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/interview/my-interviews`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const items = Array.isArray(data)
          ? data
          : data.interviews || data.history || data.data || [];

        const sortedInterviews = [...items].sort(
          (a, b) =>
            new Date(b.createdAt || b.date) -
            new Date(a.createdAt || a.date)
        );

        setAllInterviews(sortedInterviews);
        setRecentInterviews(sortedInterviews.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const completedInterviews = allInterviews.filter(
    (item) => item.status?.toLowerCase() === "completed"
  );

  const totalCompleted = completedInterviews.length;

  const averageScore =
    completedInterviews.length > 0
      ? Math.round(
          completedInterviews.reduce((acc, curr) => {
            const score = curr.finalScore
              ? Math.round((curr.finalScore / 10) * 100)
              : 0;

            return acc + score;
          }, 0) / completedInterviews.length
        )
      : 0;

  const thisWeekCount = allInterviews.filter((item) => {
    const createdDate = new Date(item.createdAt);
    const now = new Date();

    const diffTime = now - createdDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 7;
  }).length;

  return (
    <div className="min-h-screen bg-[#090d1a] text-white flex flex-col">
      {/* Header */}
      <header className="px-8 py-4 border-b border-white/[0.04] flex items-center justify-between backdrop-blur-md bg-[#090d1a]/80 sticky top-0 z-20">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Dashboard
        </h2>

        <div className="flex items-center gap-5">
          <button className="p-2 text-gray-400 hover:text-white bg-white/[0.02] border border-white/[0.04] rounded-xl transition">
            <Bell size={18} />
          </button>

          <div
            onClick={() => handleSafeNavigate("/settings")}
            className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.04] pl-3 pr-1 py-1 rounded-xl cursor-pointer hover:bg-white/[0.05] transition group"
          >
            <div className="text-right">
              <p className="text-xs font-semibold text-white group-hover:text-indigo-400 transition leading-none">
                {userData.username}
              </p>

              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                Premium Tier
              </span>
            </div>

            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-600/20 text-white">
              {userData.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="p-8 max-w-[1200px] w-full mx-auto space-y-6 flex-1">
        {/* Hero */}
        <div className="bg-[#121829] border border-white/[0.04] p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              Welcome Back, {userData.username}!
            </h3>

            <p className="text-gray-400 text-xs mt-1 max-w-[600px] leading-relaxed">
              Continue improving your interview performance and track your
              progress with AI-powered mock sessions.
            </p>
          </div>

          <button
            disabled={isNavigating}
            onClick={() => handleSafeNavigate("/practice")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold w-fit transition mt-4 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            Launch Mock Evaluation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Interviews */}
          <div className="bg-[#0e1326] border border-white/[0.04] p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                Completed Mock Interviews
              </p>

              <h4 className="text-2xl font-bold tracking-tight mt-1">
                {loading ? "..." : `${totalCompleted} Sessions`}
              </h4>

              <span className="text-[10px] text-indigo-400 mt-1 block">
                +{thisWeekCount} this week
              </span>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-indigo-400">
              <Award size={20} />
            </div>
          </div>

          {/* Average Score */}
          <div className="bg-[#0e1326] border border-white/[0.04] p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                Current Average Performance
              </p>

              <h4 className="text-2xl font-bold tracking-tight mt-1">
                {loading ? "..." : `${averageScore}%`}
              </h4>

              <span className="text-[10px] text-emerald-400 mt-1 block">
                Based on completed interviews
              </span>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-emerald-400">
              <TrendingUp size={20} />
            </div>
          </div>

          {/* Pending */}
          <div className="bg-[#0e1326] border border-white/[0.04] p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                Pending Interviews
              </p>

              <h4 className="text-2xl font-bold tracking-tight mt-1">
                {
                  allInterviews.filter(
                    (item) =>
                      item.status?.toLowerCase() !== "completed"
                  ).length
                }
              </h4>

              <span className="text-[10px] text-gray-500 mt-1 block">
                Continue unfinished sessions
              </span>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-purple-400">
              <Clock size={20} />
            </div>
          </div>
        </div>

        {/* Recent Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          <div className="lg:col-span-2 bg-[#0e1326] border border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-bold tracking-tight">
                  Recent Performance
                </h4>

                <button
                  onClick={() => handleSafeNavigate("/history")}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 font-medium"
                >
                  Full History <ChevronRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-white/[0.04] text-xs uppercase font-semibold tracking-wider">
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Score</th>
                      <th className="pb-3 text-right font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.03]">
                    {loading ? (
                      Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={index} className="animate-pulse">
                            <td className="py-4">
                              <div className="h-4 bg-white/10 rounded w-36 mb-1" />
                            </td>

                            <td className="py-4">
                              <div className="h-4 bg-white/5 rounded w-16" />
                            </td>

                            <td className="py-4">
                              <div className="h-3 bg-white/10 rounded w-12" />
                            </td>

                            <td className="py-4 text-right">
                              <div className="h-7 bg-white/5 rounded-lg w-20 inline-block" />
                            </td>
                          </tr>
                        ))
                    ) : recentInterviews.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-8 text-center text-sm text-slate-500"
                        >
                          No recent interviews found.
                        </td>
                      </tr>
                    ) : (
                      recentInterviews.map((row) => {
                        const isCompleted =
                          row.status?.toLowerCase() === "completed";

                        const interviewId = row._id || row.id;

                        const score = row.finalScore
                          ? Math.round((row.finalScore / 10) * 100)
                          : 0;

                        return (
                          <tr
                            key={interviewId}
                            className="hover:bg-white/[0.01] transition-colors group"
                          >
                            <td className="py-4 font-medium text-gray-200">
                              {row.role || "Technical Session"}
                            </td>

                            <td className="py-4 text-gray-400">
                              {row.createdAt || row.date
                                ? new Date(
                                    row.createdAt || row.date
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "Recent"}
                            </td>

                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-emerald-400">
                                  {score}%
                                </span>

                                <div className="w-16 bg-white/5 h-1.5 rounded-full overflow-hidden hidden sm:block">
                                  <div
                                    className="bg-emerald-500 h-full"
                                    style={{ width: `${score}%` }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="py-4 text-right">
                              {isCompleted ? (
                                <button
                                  onClick={() =>
                                    handleSafeNavigate(
                                      `/report/${interviewId}`
                                    )
                                  }
                                  className="text-xs px-3 py-1.5 rounded-lg font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
                                >
                                  Review
                                </button>
                              ) : (
                                <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-amber-500/10 text-amber-400 border border-amber-500/10 inline-block select-none">
                                  Pending
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl relative overflow-hidden shadow-xl shadow-indigo-950/20 flex flex-col justify-between min-h-[180px]">
            <div className="absolute -right-4 -bottom-4 text-white/[0.06] pointer-events-none">
              <Sparkles size={140} />
            </div>

            <div>
              <h4 className="font-bold text-lg text-white">
                Ready to practice?
              </h4>

              <p className="text-indigo-100/70 text-xs mt-1 leading-relaxed max-w-[220px]">
                Start a new AI-powered mock interview session and improve your
                confidence.
              </p>
            </div>

            <button
              disabled={isNavigating}
              onClick={() => handleSafeNavigate("/practice")}
              className="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all w-full flex items-center justify-center gap-1.5 mt-4 shadow-md disabled:opacity-50"
            >
              <PlayCircle size={14} />
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}