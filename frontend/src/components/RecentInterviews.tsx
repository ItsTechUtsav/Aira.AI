import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

const interviews = [
  { role: "Frontend Developer", date: "Apr 10, 2026", score: 85, status: "Excellent" },
  { role: "Full Stack Engineer", date: "Apr 8, 2026", score: 72, status: "Good" },
  { role: "React Developer", date: "Apr 5, 2026", score: 90, status: "Excellent" },
  { role: "Software Engineer", date: "Apr 3, 2026", score: 65, status: "Average" },
  { role: "Backend Developer", date: "Apr 1, 2026", score: 78, status: "Good" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Excellent": return "bg-success/15 text-success border-success/30";
    case "Good": return "bg-info/15 text-info border-info/30";
    case "Average": return "bg-warning/15 text-warning border-warning/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const RecentInterviews = () => {
  return (
    <Card className="bg-secondary border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Recent Interviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {interviews.map((interview, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{interview.role}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{interview.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">{interview.score}%</span>
              <Badge variant="outline" className={cn("text-xs font-medium", getStatusColor(interview.status))}>
                {interview.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentInterviews;
