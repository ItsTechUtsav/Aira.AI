import { Mic, TrendingUp, Target, Flame } from "lucide-react";

const stats = [
  { label: "Interviews Completed", value: "24", change: "+3 this week", icon: Mic, gradient: "gradient-accent" },
  { label: "Average Score", value: "78%", change: "+5% improvement", icon: Target, gradient: "gradient-success" },
  { label: "Current Streak", value: "7 days", change: "Best: 12 days", icon: Flame, gradient: "gradient-warm" },
  { label: "Improvement Rate", value: "+12%", change: "vs. last month", icon: TrendingUp, gradient: "gradient-accent" },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-secondary rounded-xl p-5 border border-border hover:border-muted-foreground/20 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat.gradient} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className="w-5 h-5 text-foreground" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
