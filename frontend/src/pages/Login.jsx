import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        alert("Login success");
        navigate("/dashboard");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        alert("Signup success");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    // Main Container with the dark background from the image
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      
      {/* Navbar - Styled like the screenshot */}
      <nav className="w-full px-8 py-4 flex justify-between items-center border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L4 20h16L12 2z"/></svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Aira<span className="text-indigo-500">.AI</span></h1>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <button className="hover:text-white transition">Platform</button>
          <button className="hover:text-white transition">Features</button>
          <button className="hover:text-white transition">Use Cases</button>
          <button className="hover:text-white transition">Pricing</button>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-500/20">
          Request Demo
        </button>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-73px)]">
        
        {/* Left Side: Marketing Content */}
        <div className="hidden md:flex flex-col justify-center p-16 relative overflow-hidden">
          {/* Subtle background glow to match the landing page */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6 inline-block uppercase tracking-wider">
              Now powered by Aira Foundation Model
            </span>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Master Every <span className="text-indigo-500 text-glow">Interview</span> With AI Precision.
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
              Train with specialized AI interviewers, get instantly actionable feedback, and visualize your progress.
            </p>

            <div className="space-y-6">
              {[
                { title: "AI Interviews", desc: "Realistic scenarios for any role." },
                { title: "Instant Feedback", desc: "Actionable insights after every session." },
                { title: "Performance Tracking", desc: "Watch your confidence grow with data." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="flex items-center justify-center p-6 relative">
          <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400 text-sm">
                {isLogin ? "Ready to start your next practice session?" : "Join Aira.AI and start mastering your interviews."}
              </p>
            </div>

            {/* Google Button - Updated styling */}
            <button className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 py-2.5 rounded-xl text-sm font-medium transition mb-6">
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.91 2.36 30.37 0 24 0 14.82 0 6.73 5.2 2.69 12.74l7.98 6.2C12.36 13.12 17.74 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.5 24c0-1.64-.15-3.21-.43-4.71H24v9.01h12.7c-.55 2.96-2.2 5.47-4.68 7.15l7.24 5.63C43.93 36.98 46.5 30.94 46.5 24z"/>
                <path fill="#4A90E2" d="M10.67 28.94A14.5 14.5 0 019.5 24c0-1.72.3-3.38.83-4.94l-7.98-6.2A23.94 23.94 0 000 24c0 3.87.92 7.52 2.55 10.74l8.12-5.8z"/>
                <path fill="#FBBC05" d="M24 48c6.37 0 11.73-2.1 15.64-5.72l-7.24-5.63c-2.01 1.35-4.59 2.15-8.4 2.15-6.26 0-11.64-3.62-13.54-8.44l-8.12 5.8C6.73 42.8 14.82 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-grow h-px bg-white/10" />
              <span className="text-xs text-gray-500 uppercase tracking-widest">or</span>
              <div className="flex-grow h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Full Name</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full mt-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder:text-gray-600"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full mt-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full mt-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition placeholder:text-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-600/20 mt-2"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-gray-400 text-center mt-8">
              {isLogin ? "New to Aira.AI?" : "Already a member?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-indigo-400 font-semibold hover:text-indigo-300 transition underline underline-offset-4"
              >
                {isLogin ? "Create an account" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-glow {
          text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }
      `}} />
    </div>
  );
}