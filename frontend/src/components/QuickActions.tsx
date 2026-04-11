import { Mic, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="gradient-accent border-0 shadow-elevated hover:opacity-90 transition-opacity gap-2 px-5 text-foreground">
        <Mic className="w-4 h-4" />
        Start New Interview
      </Button>
      <Button variant="outline" className="gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-accent">
        <BookOpen className="w-4 h-4" />
        Study Materials
      </Button>
      <Button variant="outline" className="gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-accent">
        <Target className="w-4 h-4" />
        Set Goals
      </Button>
    </div>
  );
};

export default QuickActions;
