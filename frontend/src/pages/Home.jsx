import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink } from "react-router-dom";

import {
  BrainCircuit,
  Sparkles,
  BotMessageSquare,
  Play,
  ArrowRight,
  BarChart3,
  Target,
  ShieldCheck,
  ChevronRight,
  MousePointer2,
} from "lucide-react";

const LandingPage = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  const revealUp = {
    hidden: {
      opacity: 0,
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // ================= LOADING SCREEN =================

      if (loading) {
  return (
    <AnimatePresence>
      <motion.div
        exit={{
          y: "-100%",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        className="fixed inset-0 z-[9999] bg-[#020308] flex items-center justify-center overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute w-[400px] h-[400px] bg-[#4D45EC]/20 blur-[140px] rounded-full" />

        {/* Brand */}
        <div className="relative text-center z-10">

          <motion.h1
            initial={{
              opacity: 0,
              scale: 1.8,
              letterSpacing: "0.5em",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              letterSpacing: "0.12em",
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-white text-4xl md:text-6xl font-black tracking-[0.2em]"
          >
            AIRA<span className="text-[#4D45EC]">.AI</span>
          </motion.h1>

          {/* Line */}
          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: "100%",
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
              duration: 1,
              ease: "easeOut",
            }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#4D45EC] to-transparent mt-5 w-32 mx-auto"
          />

        </div>
      </motion.div>
    </AnimatePresence>
  );
  }

  return (
    <div className="min-h-screen bg-[#060812] text-white overflow-x-hidden relative font-sans">

      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_10%,_rgba(77,69,236,0.22),_rgba(6,8,18,0)_50%)] pointer-events-none z-0" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4D45EC]/20 blur-[160px] rounded-full" />

      <div className="absolute right-0 top-[30%] w-[400px] h-[400px] bg-blue-500/10 blur-[140px] rounded-full" />

      <div className="fixed inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* ================= NAVBAR ================= */}

      <header className="fixed top-0 left-0 w-full z-50 bg-[#060812]/80 backdrop-blur-xl border-b border-gray-800/40">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="bg-[#4D45EC] p-2.5 rounded-xl shadow-lg shadow-[#4D45EC]/30">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>

            <span className="text-2xl font-black tracking-tight">
              Aira<span className="text-[#4D45EC]">.AI</span>
            </span>
          </NavLink>

          {/* Links */}
          <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.25em] font-bold text-slate-300">

            {["Platform", "Features", "Analytics", "Practice"].map((item) => (
              <motion.a
                key={item}
                href="#"
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative pb-2 overflow-hidden"
              >
                <span className="hover:text-white transition-colors duration-300">
                  {item}
                </span>

                <motion.span
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1 },
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="absolute left-0 bottom-0 w-full h-[1px] bg-[#4D45EC] origin-left"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/auth"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Log In
            </NavLink>

            <NavLink to="/practice">
              <button className="bg-[#4D45EC] hover:bg-[#5C55F2] text-white text-sm px-6 py-2.5 rounded-xl font-bold shadow-xl shadow-[#4D45EC]/20 transition-all flex items-center gap-2">
                Start Free
                <Sparkles className="w-4 h-4" />
              </button>
            </NavLink>
          </div>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-screen flex items-center pt-32 pb-24 z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >

            {/* Badge */}
            <motion.div
              variants={revealUp}
              className="inline-flex items-center gap-2.5 bg-[#4D45EC]/10 border border-[#4D45EC]/30 px-4 py-2 rounded-full text-[#7B75F5] text-xs font-semibold mb-8 backdrop-blur-sm"
            >
              <BotMessageSquare className="w-4 h-4 text-[#4D45EC]" />
              NOW POWERED BY AIRA FOUNDATION MODEL
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden">
              <motion.h1
                variants={revealUp}
                className="text-[13vw] md:text-[5.5vw] leading-[0.95] font-black tracking-tight"
              >
                Master Every
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                variants={revealUp}
                className="text-[13vw] md:text-[5.5vw] leading-[0.95] font-black tracking-tight text-[#4D45EC]"
              >
                Interview
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.h1
                variants={revealUp}
                className="text-[13vw] md:text-[5.5vw] leading-[0.95] font-black tracking-tight text-slate-400"
              >
                With AI Precision.
              </motion.h1>
            </div>

            {/* Desc */}
            <motion.p
              variants={revealUp}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light"
            >
              Train with realistic AI interviewers, receive instant feedback,
              analyze your communication, and track your growth through
              beautiful performance analytics.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={revealUp}
              className="flex flex-col sm:flex-row items-center gap-6 mt-12"
            >
              <NavLink to="/practice">
                <button className="group bg-[#4D45EC] hover:bg-[#5C55F2] text-white text-md px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-[#4D45EC]/20 transition-all flex items-center gap-3">
                  Start Practicing
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </NavLink>

              <button className="flex items-center gap-3 text-white text-md font-semibold group hover:text-gray-300 transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-[#4D45EC] group-hover:text-white group-hover:bg-[#4D45EC]/5 transition-all">
                  <Play className="w-5 h-5 fill-current" />
                </div>

                Watch Demo
              </button>
            </motion.div>

            {/* Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 1,
                duration: 1.5,
                ease: "circOut",
              }}
              className="h-[1px] w-56 bg-white/20 mt-14 origin-left"
            />
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            className="relative"
          >

            {/* Glow */}
            <div className="absolute inset-0 bg-[#4D45EC]/20 blur-[100px] rounded-full scale-75" />

            {/* Main Image */}
            <motion.img
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                duration: 0.5,
              }}
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop"
              alt="Interview"
              className="relative z-10 w-full h-[700px] object-cover rounded-[40px] border border-white/10 shadow-2xl"
            />

            {/* Floating Analytics Card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -bottom-8 -left-8 z-20 bg-[#0f1320]/95 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl w-72"
            >

              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-slate-400">
                    Interview Score
                  </p>

                  <h3 className="text-4xl font-black mt-1">
                    92%
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <BarChart3 size={24} />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1 text-slate-400">
                    <span>Confidence</span>
                    <span>95%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[95%] h-full bg-[#4D45EC]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 text-slate-400">
                    <span>Communication</span>
                    <span>88%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[88%] h-full bg-blue-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.8,
          }}
          className="absolute bottom-10 left-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-slate-400"
        >
          <MousePointer2 size={16} />
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="py-28 md:py-32 relative z-10 border-t border-gray-800/40 bg-[#080B18]">

        <div className="max-w-7xl mx-auto px-6">

          {/* Top */}
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
            className="max-w-3xl mb-20"
          >

            <p className="text-[#4D45EC] text-sm font-semibold mb-4 tracking-[0.3em] uppercase">
              Inside The Platform
            </p>

            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
              Your complete interview prep suite,
              <span className="text-slate-500"> reimagined.</span>
            </h2>

            <p className="text-gray-400 font-light text-lg">
              From mock interviews to analytics and AI feedback,
              everything is designed to improve your interview performance.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                icon: Target,
                title: "Tailored Question Banks",
                text: "Generate realistic interview questions based on role and domain.",
              },
              {
                icon: BotMessageSquare,
                title: "Conversational AI Interviewers",
                text: "AI interviewers ask smart follow-up questions dynamically.",
              },
              {
                icon: BarChart3,
                title: "Deep Performance Analytics",
                text: "Track confidence, communication, and technical growth over time.",
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -10,
                }}
                className="group bg-[#0c1020] border border-gray-800 p-8 rounded-3xl hover:border-[#4D45EC]/30 transition-all duration-300"
              >

                <div className="bg-[#4D45EC]/10 w-14 h-14 rounded-2xl flex items-center justify-center text-[#4D45EC] mb-7 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">
                  {feat.title}
                </h3>

                <p className="text-gray-400 text-base leading-relaxed font-light">
                  {feat.text}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[#7B75F5] text-sm font-semibold">
                  Learn More
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="relative py-32 px-6">

        <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#4D45EC] to-indigo-700 p-16 md:p-24 relative">

          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[120px] rounded-full" />

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
            className="relative z-10"
          >

            <p className="uppercase tracking-[0.3em] text-xs font-bold text-indigo-100 mb-5">
              READY TO START?
            </p>

            <h2 className="text-5xl md:text-7xl font-black leading-[1] max-w-4xl mb-8">
              Your next interview starts here.
            </h2>

            <p className="text-indigo-100 text-lg max-w-2xl mb-12 leading-relaxed">
              Practice smarter with AI-powered interviews designed for developers and future engineers.
            </p>

            <NavLink to="/practice">
              <button className="group px-8 py-4 rounded-2xl bg-white text-[#4D45EC] font-black flex items-center gap-3 hover:bg-indigo-50 transition-all shadow-2xl">
                Start Interview Session
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-gray-800/50 py-10 bg-[#060812]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">

          <div>
            <h3 className="text-2xl font-black tracking-tight mb-3">
              Aira<span className="text-[#4D45EC]">.AI</span>
            </h3>

            <p className="text-sm text-gray-500 max-w-md">
              AI-powered interview preparation platform for developers,
              engineers, and ambitious students.
            </p>
          </div>

          <div className="flex gap-16 text-sm text-gray-500">
            <ul className="space-y-3">
              <li className="hover:text-white cursor-pointer transition-colors">
                Features
              </li>

              <li className="hover:text-white cursor-pointer transition-colors">
                Dashboard
              </li>

              <li className="hover:text-white cursor-pointer transition-colors">
                Analytics
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="hover:text-white cursor-pointer transition-colors">
                Privacy
              </li>

              <li className="hover:text-white cursor-pointer transition-colors">
                Terms
              </li>

              <li className="hover:text-white cursor-pointer transition-colors">
                Contact
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

