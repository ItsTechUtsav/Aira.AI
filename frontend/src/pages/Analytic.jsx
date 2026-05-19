

import React, { useEffect, useState } from 'react';
import { Target, Zap, Clock3, Users, ChevronRight } from 'lucide-react';
import { Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const Analytic = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/interview/my-interviews", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();
    setInterviews(data);
  };


  const totalSessions = interviews.length;

  const avgScore =
    totalSessions > 0
      ? Math.round(
          (interviews.reduce((sum, i) => sum + (i.finalScore || 0), 0) /
            totalSessions) *
            10
        )
      : 0;

  const practiceTimeHours = (totalSessions * 10) / 60;

  // ================= SKILL CALC =================

  let totalConfidence = 0;
  let totalCommunication = 0;
  let totalCorrectness = 0;
  let totalQuestions = 0;

  interviews.forEach((i) => {
    i.questions.forEach((q) => {
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
      totalQuestions++;
    });
  });

  const radarDataValues =
    totalQuestions > 0
      ? [
          (totalCorrectness / totalQuestions) * 10,
          (totalCommunication / totalQuestions) * 10,
          (totalConfidence / totalQuestions) * 10,
          (totalCorrectness / totalQuestions) * 10,
          (totalCommunication / totalQuestions) * 10,
        ]
      : [0, 0, 0, 0, 0];

  const radarChartData = {
    labels: ['Technical', 'Communication', 'Confidence', 'Problem Solving', 'Behavioral'],
    datasets: [
      {
        data: radarDataValues,
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderColor: '#818cf8',
        borderWidth: 2,
        pointBackgroundColor: '#fff',
      },
    ],
  };

  const radarChartOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(148, 163, 184, 0.15)' },
        grid: { color: 'rgba(148, 163, 184, 0.15)' },
        pointLabels: { color: '#94a3b8' },
        ticks: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

     // ================= LINE CHART =================

    // 1. Only completed interviews
    const completedInterviews = interviews.filter(
      (i) => i.status === "completed"
    );

    // 2. Sort by created time
    const sortedInterviews = [...completedInterviews].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    // 3. Create labels with date + count
    const dateCount = {};

    const labels =
      sortedInterviews.length > 0
        ? sortedInterviews.map((i) => {
            const date = new Date(i.createdAt);
        
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          })
      : ["No Data"];
        
    // 4. Score data
    const userScores =
      sortedInterviews.length > 0
        ? sortedInterviews.map((i) =>
            i.finalScore !== undefined && i.finalScore !== null
              ? i.finalScore * 10
              : 0
          )
        : [0];
        
    // 5. Chart Data
    const lineChartData = {
      labels,
      datasets: [
        {
          label: "Your Score",
          data: userScores,
          borderColor: "#818cf8",
          backgroundColor: "#818cf8",
          tension: 0.3,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: "Platform Avg.",
          data: labels.map(() => 60),
          borderColor: "#475569",
          borderDash: [6, 6],
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    };

    // 6. Chart Options
    const lineChartOptions = {
      scales: {
        x: {
          ticks: { color: "#94a3b8" },
        },
        y: {
          ticks: { color: "#94a3b8" },
          min: 0,
          max: 100,
        },
      },
      plugins: {
        legend: {
          labels: { color: "#94a3b8" },
        },
        tooltip: {
          backgroundColor: "#312e81",
          padding: 14,
          cornerRadius: 12,
          displayColors: false,
                
          callbacks: {
            title: function () {
              return "";
            },
          
            label: function (context) {
              const interview = sortedInterviews[context.dataIndex];
            
              const date = new Date(interview.createdAt);
            
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            
              const formattedTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            
              return [
                `Date: ${formattedDate}`,
                `Time: ${formattedTime}`,
                `Score: ${context.raw}%`,
              ];
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  // ================= KPI UI =================

  const KPI_DATA = [
    { label: 'Avg. Score', value: `${avgScore}%`, icon: Target, iconColor: 'text-indigo-400', iconBg: 'bg-indigo-950' },
    { label: 'Total Sessions', value: totalSessions, icon: Zap, iconColor: 'text-amber-400', iconBg: 'bg-amber-950' },
    { label: 'Practice Time', value: `${practiceTimeHours.toFixed(1)}h`, icon: Clock3, iconColor: 'text-sky-400', iconBg: 'bg-sky-950' },
    { label: 'Percentile', value: 'Top 5%', icon: Users, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-950' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-300 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
            <p className="text-slate-400">Deep dive into your interview metrics.</p>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {KPI_DATA.map((kpi, index) => (
            <div key={index} className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">{kpi.label}</span>
                <div className={`p-2.5 ${kpi.iconBg} rounded-full`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white">{kpi.value}</h2>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-[#111827] p-8 rounded-2xl">
            <h3 className="text-xl text-white mb-6">Skill Distribution</h3>
            <div className="min-h-[400px]">
              <Radar data={radarChartData} options={radarChartOptions} />
            </div>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl">
            <h3 className="text-xl text-white mb-6">Progression Trend</h3>
            <div className="min-h-[400px]">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytic;