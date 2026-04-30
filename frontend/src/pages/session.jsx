import React, { useState } from 'react';
import { 
  PlayCircle, 
  Code, 
  Server, 
  Layers, 
  Smartphone, 
  Monitor, 
  Users, 
  Cpu, 
  Bolt 
} from 'lucide-react';

const Session = () => {
  const [selection, setSelection] = useState({
    role: '',
    difficulty: '',
    type: ''
  });

  const roles = [
    { id: 'frontend', label: 'Frontend Developer', icon: <Monitor size={24} /> },
    { id: 'backend', label: 'Backend Developer', icon: <Server size={24} /> },
    { id: 'fullstack', label: 'Full Stack Developer', icon: <Layers size={24} /> },
    { id: 'mobile', label: 'Mobile Developer', icon: <Smartphone size={24} /> },
    { id: 'architect', label: 'System Architect', icon: <Cpu size={24} /> },
    { id: 'designer', label: 'Product Designer', icon: <Code size={24} /> },
  ];

  const difficulties = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];
  
  const interviewTypes = [
    { id: 'hr', label: 'HR Interview', icon: <Users size={24} /> },
    { id: 'technical', label: 'Technical', icon: <Code size={24} /> },
    { id: 'both', label: 'Both', icon: <Bolt size={24} /> },
  ];

  const handleSelect = (category, value) => {
    setSelection(prev => ({ ...prev, [category]: value }));
  };

  const isFormComplete = selection.role && selection.difficulty && selection.type;

  return (
    <div className="w-full p-10 text-white font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Practice Session Setup</h1>
        <p className="text-slate-400 mt-2">Configure your AI-powered interview to start practicing.</p>
      </header>

      <div className="max-w-4xl space-y-12">
        {/* 1. Role Selection */}
        <section>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">1. Select your Target Role</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleSelect('role', role.label)}
                className={`p-6 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center gap-3
                  ${selection.role === role.label 
                    ? 'border-[#6366f1] bg-[#6366f1]/5' 
                    : 'border-transparent bg-[#161b2a] hover:border-slate-700'}`}
              >
                <span className="text-[#6366f1]">{role.icon}</span>
                <span className="font-medium">{role.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Difficulty Selection */}
        <section>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">2. Difficulty Level</label>
          <div className="flex flex-wrap gap-3">
            {difficulties.map((level) => (
              <button
                key={level}
                onClick={() => handleSelect('difficulty', level)}
                className={`px-6 py-2.5 rounded-full border font-medium transition-all
                  ${selection.difficulty === level 
                    ? 'bg-[#6366f1] border-[#6366f1] text-white' 
                    : 'bg-[#161b2a] border-[#1e293b] text-slate-300 hover:border-slate-600'}`}
              >
                {level}
              </button>
            ))}
          </div>
        </section>

        {/* 3. Interview Type */}
        <section>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">3. Interview Type</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interviewTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelect('type', type.label)}
                className={`p-6 rounded-xl border-2 text-center transition-all duration-200 flex flex-col items-center gap-3
                  ${selection.type === type.label 
                    ? 'border-[#6366f1] bg-[#6366f1]/5' 
                    : 'border-transparent bg-[#161b2a] hover:border-slate-700'}`}
              >
                <span className="text-[#6366f1]">{type.icon}</span>
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Start Button */}
        <button
          disabled={!isFormComplete}
          className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
            ${isFormComplete 
              ? 'bg-[#6366f1] text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-1' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
        >
          <PlayCircle size={24} />
          Start Mock Interview
        </button>
      </div>
    </div>
  );
};

export default Session;
