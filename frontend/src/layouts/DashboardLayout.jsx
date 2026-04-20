import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex bg-[#0b0f1a] text-slate-300">
  
  {/* Sidebar */}
  <Sidebar />

  {/* Page Content */}
  <main className="flex-1 overflow-y-auto">
    <Outlet />
  </main>

</div>
  );
};

export default DashboardLayout;