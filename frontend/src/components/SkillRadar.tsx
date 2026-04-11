import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skills = [
  { name: "Technical", score: 82 },
  { name: "Communication", score: 70 },
  { name: "Problem Solving", score: 88 },
  { name: "Behavioral", score: 65 },
  { name: "System Design", score: 58 },
];

const SkillRadar = () => {
  return (
    <Card className="bg-secondary border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">Skill Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-foreground font-medium">{skill.name}</span>
              <span className="text-muted-foreground">{skill.score}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full gradient-accent transition-all duration-700"
                style={{ width: `${skill.score}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillRadar;
