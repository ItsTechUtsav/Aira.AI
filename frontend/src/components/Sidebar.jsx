import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlayCircle, BarChart3, History, Settings, LogOut } from "lucide-react";

const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: PlayCircle, label: "Practice Sessions", path: "/practice" },
    { icon: BarChart3, label: "Performance", path: "/analytics" },
    { icon: History, label: "Session History", path: "/history" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <aside className="w-64 h-screen bg-[#0f1424] border-r border-slate-800 flex flex-col sticky top-0">

      {/* Logo */}
      <div className="p-8 mb-2 flex items-center gap-3">
        <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>

        <span className="text-white text-lg font-bold tracking-tight">
          Aira.ai
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">

        {menuItems.map((item) => {

          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "hover:bg-slate-800/40 hover:text-white text-slate-400"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-slate-800/50 space-y-2">

        <Link
          to="/settings"
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-rose-400/80 hover:text-rose-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;