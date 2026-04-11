import { LayoutDashboard, Mic, History, BarChart3, Settings, HelpCircle, LogOut, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Mic, label: "New Interview", active: false },
  { icon: History, label: "History", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const DashboardSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-50 border-r border-sidebar-border">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
          <Brain className="w-5 h-5 text-background" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-sidebar-primary tracking-tight">Aira.AI</h1>
          <p className="text-xs text-sidebar-foreground/60">Interview Platform</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="w-4.5 h-4.5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-6 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <HelpCircle className="w-4.5 h-4.5" />
          Help Center
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <LogOut className="w-4.5 h-4.5" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
