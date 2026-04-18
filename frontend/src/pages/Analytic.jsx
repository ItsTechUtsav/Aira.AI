import React from 'react';
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

// Register ChartJS components
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

// --- 1. KPI Data Configuration ---
const KPI_DATA = [
  { label: 'Avg. Score', value: '84%', icon: Target, iconColor: 'text-indigo-400', iconBg: 'bg-indigo-950' },
  { label: 'Total Sessions', value: '24', icon: Zap, iconColor: 'text-amber-400', iconBg: 'bg-amber-950' },
  { label: 'Practice Time', value: '12.5h', icon: Clock3, iconColor: 'text-sky-400', iconBg: 'bg-sky-950' },
  { label: 'Percentile', value: 'Top 5%', icon: Users, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-950' },
];

// --- 2. Radar Chart (Skill Distribution) Data ---
const radarChartData = {
  labels: ['Technical', 'Communication', 'Confidence', 'Problem Solving', 'Behavioral'],
  datasets: [
    {
      label: 'Your Proficiency',
      data: [90, 85, 80, 88, 78], // Example skill values (out of 100)
      backgroundColor: 'rgba(99, 102, 241, 0.25)', // Indigo fill with alpha
      borderColor: '#818cf8', // Lighter Indigo border
      borderWidth: 2,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#818cf8',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fff',
      pointRadius: 3,
    },
  ],
};

const radarChartOptions = {
  scales: {
    r: {
      angleLines: { color: 'rgba(148, 163, 184, 0.15)' }, // Subtle lines
      grid: { color: 'rgba(148, 163, 184, 0.15)' },
      pointLabels: { color: '#94a3b8', font: { size: 12, family: 'sans-serif' } }, // Slate-400
      ticks: { display: false, count: 5, backdropColor: 'transparent' },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  responsive: true,
  maintainAspectRatio: false,
};

// --- 3. Line Chart (Progression Trend) Data ---
const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'Your Score',
      data: [62, 68, 76, 88], // Progress over time
      borderColor: '#818cf8', // Lighter Indigo
      backgroundColor: '#818cf8',
      pointBackgroundColor: '#818cf8',
      pointBorderColor: '#fff',
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.3, // Adds the smooth curve
      borderWidth: 3,
    },
    {
      label: 'Platform Avg.',
      data: [58, 61, 64, 66], // Platform baseline
      borderColor: '#475569', // Slate-600
      backgroundColor: '#475569',
      borderDash: [6, 6], // Dashed line
      borderWidth: 2,
      pointRadius: 0, // No points on baseline
      fill: false,
    },
  ],
};

const lineChartOptions = {
  scales: {
    x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.1)' },
      ticks: { color: '#94a3b8', stepSize: 25, callback: (value) => `${value}` },
      border: { display: false },
      min: 0,
      max: 100,
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#94a3b8', boxWidth: 12, usePointStyle: true, pointStyle: 'rectRounded', padding: 20 },
    },
    tooltip: { mode: 'index', intersect: false },
  },
  interaction: { mode: 'nearest', axis: 'x', intersect: false },
  responsive: true,
  maintainAspectRatio: false,
};

// --- Main Component ---
const Analytic = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-300 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Performance Analytics</h1>
            <p className="text-slate-400 max-w-xl">
              Deep dive into your interview metrics, skill distribution, and score progression over time.
            </p>
          </div>
          <button className="flex items-center gap-2.5 text-indigo-400 font-medium group text-sm self-start sm:self-center">
            View All Reports
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {KPI_DATA.map((kpi, index) => (
            <div key={index} className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col gap-5 group hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400 tracking-wider uppercase">{kpi.label}</span>
                <div className={`p-2.5 ${kpi.iconBg} rounded-full`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h2 className="text-4xl font-extrabold text-white tracking-tighter">{kpi.value}</h2>
                <div className="text-emerald-500 text-sm font-medium flex items-center gap-1.5 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-900">
                    <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                    +12% vs last mo.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Skill Distribution (Radar) */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Skill Distribution</h3>
              <p className="text-slate-400 text-sm">Your proficiency across different interview categories.</p>
            </div>
            <div className="flex-grow flex items-center justify-center min-h-[400px]">
              <Radar data={radarChartData} options={radarChartOptions} />
            </div>
          </div>

          {/* Progression Trend (Line) */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 flex flex-col">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Progression Trend</h3>
                <p className="text-slate-400 text-sm">How your scores compare to the platform average.</p>
              </div>
               <select className="bg-[#1f2937] text-slate-300 text-sm px-4 py-2 rounded-lg border border-slate-700 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
                  <option>Last 4 Months</option>
                  <option>Last 6 Months</option>
                  <option>Year to Date</option>
               </select>
            </div>
            <div className="flex-grow min-h-[400px]">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytic;