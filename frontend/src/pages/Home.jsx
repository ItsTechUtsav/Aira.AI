import React from 'react';
// We can use lucide-react which is already in your package.json
import { BrainCircuit, Play, BarChart3, Target, BotMessageSquare, Sparkles } from 'lucide-react';

// Using NavLink from react-router-dom as requested in package.json
// If not using Router, you can replace with <a> tags.
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    // Main dark container with subtle top gradient
    <div className="min-h-screen bg-[#060812] text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_10%,_rgba(30,58,138,0.3),_rgba(6,8,18,0)_50%)] pointer-events-none z-0"></div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#060812]/80 backdrop-blur-md border-b border-gray-800/60">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="bg-[#4D45EC] p-2 rounded-lg text-white shadow-lg">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">Aira<span className="text-[#4D45EC]">.AI</span></span>
          </NavLink>

          <div className="hidden md:flex items-center gap-10 text-gray-300">
            {['Platform', 'Features', 'Use Cases', 'Pricing'].map(item => (
              <NavLink key={item} to={`/${item.toLowerCase()}`} className="text-sm font-medium hover:text-white transition-colors duration-200">
                {item}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <NavLink to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Log In</NavLink>
            <NavLink to="/get-started" className="bg-[#4D45EC] text-white text-sm px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-[#5C55F2] transition-colors duration-200 flex items-center gap-2">
              Request Demo
              <Sparkles className="w-4 h-4" />
            </NavLink>
          </div>
        </nav>
      </header>


      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 z-10">
        <div className="container mx-auto px-6 text-center flex flex-col items-center">
          
          {/* Subtle Accent Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#4D45EC]/10 border border-[#4D45EC]/30 px-4 py-2 rounded-full text-[#7B75F5] text-xs font-semibold mb-8 backdrop-blur-sm">
            <BotMessageSquare className="w-4 h-4 text-[#4D45EC]" />
            NOW POWERED BY AIRA FOUNDATION MODEL 
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter max-w-4xl leading-[1.05] md:leading-[1.1] mb-8">
            Master Every <span className="text-[#4D45EC]">Interview</span> With <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">AI Precision.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-light">
            Train with specialized AI interviewers, get instantly actionable feedback on your responses, and visualize your progress to land your dream role.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <NavLink to="/practice" className="bg-[#4D45EC] text-white text-md px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-[#5C55F2] transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto">
              Start Practicing Free →
            </NavLink>
            <button className="flex items-center gap-3 text-white text-md font-semibold group px-6 py-4 w-full sm:w-auto justify-center hover:text-gray-300 transition-colors">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-[#4D45EC] group-hover:text-white group-hover:bg-[#4D45EC]/5 transition-all">
                <Play className="w-5 h-5 fill-current" />
              </div>
              Watch a 2-Minute Demo
            </button>
          </div>

          {/* Optional Mockup/Visual (Simplified) */}
          <div className="mt-20 w-full max-w-6xl relative">
            <div className="aspect-[16/9] bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-4 md:p-6 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-10 border-b border-gray-800/60 bg-gray-950/60 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500/80 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500/80 rounded-full"></div>
              </div>
              <div className="mt-10 h-full w-full bg-[#060812] rounded-xl flex items-center justify-center p-8">
                  <div className="text-center">
                      <BrainCircuit className="w-16 h-16 text-gray-700 mx-auto mb-6" />
                      <p className="text-gray-600 font-mono text-sm">SKILLORA_INTERFACE::INTERVIEW_SESSION_ACTIVE</p>
                  </div>
              </div>
              
              {/* Abstract decorative shadow/glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/2 bg-[#4D45EC]/10 blur-[120px] rounded-full pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>


      {/* --- FEATURES BRIEF --- */}
      <section className="py-24 md:py-32 relative z-10 border-t border-gray-800/50 bg-[#080B18]">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mb-16">
              <p className="text-[#4D45EC] text-sm font-semibold mb-3 tracking-widest uppercase">Inside the Platform</p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5">Your complete interview prep suite, <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">reimagined.</span></h2>
              <p className="text-gray-400 font-light">From initial application questions to the final executive round, we provide the tools to elevate your performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Tailored Question Banks', text: 'Generate hyper-realistic questions based on your specific industry, company, or job description.' },
              { icon: BotMessageSquare, title: 'Conversational AI Interviewers', text: 'Engage with dynamic AI personas that ask smart follow-ups to test your true depth.' },
              { icon: BarChart3, title: 'Deep Performance Analytics', text: 'Receive data-driven insights on your pacing, tone, content quality, and key skills.' }
            ].map((feat, i) => (
              <div key={i} className="bg-gray-950 border border-gray-800 p-8 rounded-3xl group hover:border-[#4D45EC]/30 transition-colors duration-300">
                <div className="bg-[#4D45EC]/10 w-14 h-14 rounded-2xl flex items-center justify-center text-[#4D45EC] mb-7 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{feat.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed font-light">{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- MINI FOOTER --- */}
      <footer className="border-t border-gray-800/60 py-10 bg-[#060812]">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          © 2026 Aira AI. All rights reserved. Precise practice for professional growth.
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;