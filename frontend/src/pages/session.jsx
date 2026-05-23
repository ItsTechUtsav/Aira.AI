import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate(); 

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

  const handleStartInterview = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/interview/generate-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(selection),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return;
    }

    // 👇 NOW go to interview page WITH backend data
    navigate("/interview", {
      state: {
        ...selection,
        interviewId: data.interviewId,
        questions: data.questions,
        username: data.username,
      },
    });

  } catch (error) {
    console.log("Error:", error);
  }
};

  return (
    <div className="w-full p-10 text-white font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Practice Session Setup</h1>
        <p className="text-slate-400 mt-2">Configure your AI-powered interview to start practicing.</p>
      </header>

      <div className="max-w-4xl space-y-12">

        {/* ROLE */}
        <section>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            1. Select your Target Role
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleSelect('role', role.label)}
                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3
                  ${selection.role === role.label 
                    ? 'border-[#6366f1] bg-[#6366f1]/5' 
                    : 'border-transparent bg-[#161b2a] hover:border-slate-700'}`}
              >
                {role.icon}
                {role.label}
              </button>
            ))}
          </div>
        </section>

        {/* DIFFICULTY */}
        <section>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            2. Difficulty Level
          </label>

          <div className="flex flex-wrap gap-3">
            {difficulties.map((level) => (
              <button
                key={level}
                onClick={() => handleSelect('difficulty', level)}
                className={`px-6 py-2.5 rounded-full
                  ${selection.difficulty === level 
                    ? 'bg-[#6366f1] text-white' 
                    : 'bg-[#161b2a]'}`}
              >
                {level}
              </button>
            ))}
          </div>
        </section>

        {/* TYPE */}
        <section>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            3. Interview Type
          </label>

          <div className="grid grid-cols-3 gap-4">
            {interviewTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelect('type', type.label)}
                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3
                  ${selection.type === type.label 
                    ? 'border-[#6366f1] bg-[#6366f1]/5' 
                    : 'bg-[#161b2a]'}`}
              >
                {type.icon}
                {type.label}
              </button>
            ))}
          </div>
        </section>

        {/* START BUTTON */}
        <button
          disabled={!isFormComplete}
          onClick={handleStartInterview}
          className={`w-full py-5 rounded-xl font-bold flex justify-center gap-3
            ${isFormComplete 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-700 cursor-not-allowed'}`}
        >
          <PlayCircle size={24} />
          Start Mock Interview
        </button>
      </div>
    </div>
  );
};

export default Session;