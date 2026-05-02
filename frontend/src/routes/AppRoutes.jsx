import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard";
import Session from "../pages/session";
import InterviewHistory from "../pages/History";
import Analytic from "../pages/Analytic";
import Settings from "../pages/Settings";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import InterviewPage from "../pages/interview";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Login />} />

      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />


      {/* Protected Routes with DashboardLayout */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice" element={<Session />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/analytics" element={<Analytic />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}