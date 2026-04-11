import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

const feedbackItems = [
  {
    icon: TrendingUp,
    title: "Strong Technical Knowledge",
    description: "Your answers on React and TypeScript concepts were well-structured and accurate.",
    type: "strength" as const,
  },
  {
    icon: AlertTriangle,
    title: "Improve STAR Method Usage",
    description: "Consider structuring behavioral answers using the Situation-Task-Action-Result format.",
    type: "improvement" as const,
  },
  {
    icon: Lightbulb,
    title: "Tip: Practice System Design",
    description: "Focus on scalability and trade-off discussions to strengthen your senior-level interviews.",
    type: "tip" as const,
  },
];

const typeStyles = {
  strength: "bg-success/15 text-success",
  improvement: "bg-warning/15 text-warning",
  tip: "bg-info/15 text-info",
};

const AIFeedbackCard = () => {
  return (
    <Card className="bg-secondary border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">AI Feedback & Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedbackItems.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeStyles[item.type]}`}>
              <item.icon className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIFeedbackCard;
