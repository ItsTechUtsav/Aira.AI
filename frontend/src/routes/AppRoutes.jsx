import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard";
import InterviewHistory from "../pages/History";
import Analytic from "../pages/Analytic";

export default function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/analytics" element={<Analytic />} />
      </Routes>
    
  );
}