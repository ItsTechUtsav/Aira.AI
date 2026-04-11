import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", score: 52 },
  { name: "Week 2", score: 58 },
  { name: "Week 3", score: 61 },
  { name: "Week 4", score: 55 },
  { name: "Week 5", score: 68 },
  { name: "Week 6", score: 72 },
  { name: "Week 7", score: 70 },
  { name: "Week 8", score: 78 },
];

const PerformanceChart = () => {
  return (
    <Card className="bg-secondary border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(234 89% 60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(234 89% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 22%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(215 20% 65%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(215 20% 65%)' }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(220 26% 14%)',
                  border: '1px solid hsl(220 20% 22%)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'hsl(210 40% 98%)',
                }}
              />
              <Area type="monotone" dataKey="score" stroke="hsl(234 89% 60%)" strokeWidth={2.5} fill="url(#scoreGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
