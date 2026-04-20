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
        // LOGIN
        const res = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login success");
        navigate("/dashboard");
      } else {
        // SIGNUP
        await axios.post(
          "http://localhost:3000/api/auth/register",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

        alert("Signup success");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100">
      
      {/* Navbar */}
      <div className="w-full px-8 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md border-b">
        <h1 className="text-xl font-semibold text-gray-900">Aira.AI</h1>
        <div className="space-x-6 text-sm text-gray-600">
          <button className="hover:text-gray-900">About</button>
          <button className="hover:text-gray-900">Features</button>
          <button className="hover:text-gray-900">Contact</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between bg-gray-900 text-white p-12 relative">
                    <div>
            <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 20h16L12 2z" fill="#111"/>
              </svg>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Aira.AI</h1>
          </div>
            <p className="text-gray-300 text-sm max-w-sm">
              Smart AI-powered interview platform to help you practice,
              analyze, and improve your performance.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">AI Interviews</h3>
              <p className="text-sm text-gray-400">
                Practice real interview scenarios powered by AI.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Instant Feedback</h3>
              <p className="text-sm text-gray-400">
                Get detailed analysis on your answers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Performance Tracking</h3>
              <p className="text-sm text-gray-400">
                Track your growth and improve continuously.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">© 2026 Aira.AI</p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
              {isLogin ? "Login to Aira.AI" : "Create your account"}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              {isLogin
                ? "Welcome back. Please enter your details."
                : "Start your AI interview journey today."}
            </p>

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-sm hover:bg-gray-50 transition mb-4">
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.91 2.36 30.37 0 24 0 14.82 0 6.73 5.2 2.69 12.74l7.98 6.2C12.36 13.12 17.74 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.5 24c0-1.64-.15-3.21-.43-4.71H24v9.01h12.7c-.55 2.96-2.2 5.47-4.68 7.15l7.24 5.63C43.93 36.98 46.5 30.94 46.5 24z"/>
                <path fill="#4A90E2" d="M10.67 28.94A14.5 14.5 0 019.5 24c0-1.72.3-3.38.83-4.94l-7.98-6.2A23.94 23.94 0 000 24c0 3.87.92 7.52 2.55 10.74l8.12-5.8z"/>
                <path fill="#FBBC05" d="M24 48c6.37 0 11.73-2.1 15.64-5.72l-7.24-5.63c-2.01 1.35-4.59 2.15-8.4 2.15-6.26 0-11.64-3.62-13.54-8.44l-8.12 5.8C6.73 42.8 14.82 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-gray-800 font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
