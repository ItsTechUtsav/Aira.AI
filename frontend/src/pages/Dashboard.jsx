import DashboardSidebar from "../components/DashboardSidebar";
import StatsCards from "../components/StatsCards";
import PerformanceChart from "../components/PerformanceChart";
import RecentInterviews from "../components/RecentInterviews";
import AIFeedbackCard from "../components/AIFeedbackCard";
import QuickActions from "../components/QuickActions";
import SkillRadar from "../components/SkillRadar";
import { Bell, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Welcome back, Alex! 👋
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Here's your interview preparation overview
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 text-sm rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 w-56 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <button className="relative w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-accent transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-accent text-[10px] font-bold text-foreground flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-foreground">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <QuickActions />
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>
            <div>
              <SkillRadar />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentInterviews />
            <AIFeedbackCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;