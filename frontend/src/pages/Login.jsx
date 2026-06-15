import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

axios.defaults.withCredentials = true;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        alert("Login successful");
        navigate("/dashboard");
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        alert("Account created successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      <nav className="w-full px-8 py-4 flex justify-between items-center border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L4 20h16L12 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Aira<span className="text-indigo-500">.AI</span>
          </h1>
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
        <div className="hidden md:flex flex-col justify-center p-16 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />

          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6 inline-block uppercase tracking-wider">
              Now powered by Aira Foundation Model
            </span>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Master Every{" "}
              <span className="text-indigo-500 text-glow">
                Interview
              </span>{" "}
              With AI Precision.
            </h2>

            <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
              Train with specialized AI interviewers, get instantly actionable
              feedback, and visualize your progress.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "AI Interviews",
                  desc: "Realistic scenarios for any role.",
                },
                {
                  title: "Instant Feedback",
                  desc: "Actionable insights after every session.",
                },
                {
                  title: "Performance Tracking",
                  desc: "Watch your confidence grow with data.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 relative">
          <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <p className="text-gray-400 text-sm">
                {isLogin
                  ? "Ready to start your next practice session?"
                  : "Join Aira.AI and start mastering your interviews."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="username"
                    disabled={isSubmitting}
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full mt-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full mt-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  disabled={isSubmitting}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full mt-1.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <Loader2 size={16} className="animate-spin" />
                )}

                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-gray-400 text-center mt-8">
              {isLogin ? "New to Aira.AI?" : "Already a member?"}

              <button
                type="button"
                onClick={() => !isSubmitting && setIsLogin(!isLogin)}
                className="ml-2 text-indigo-400 font-semibold hover:text-indigo-300 transition"
              >
                {isLogin ? "Create an account" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .text-glow {
            text-shadow: 0 0 20px rgba(99,102,241,.5);
          }
        `,
        }}
      />
    </div>
  );
}