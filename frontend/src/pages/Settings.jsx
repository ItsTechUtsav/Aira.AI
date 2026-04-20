// import React, { useState } from 'react';
// import axios from 'axios';
// import { User, Mail, Lock, Smartphone, AlertTriangle, Trash2, ShieldCheck } from 'lucide-react';

// const SettingsPage = () => {
//   // These values would typically come from your database via a useEffect hook
//   const [userData, setUserData] = useState({
//     username: "krishnatrey_01", 
//     email: "krishna@example.com",
//   });

//   return (
//     <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 md:p-16 font-sans">
//       <div className="max-w-3xl mx-auto space-y-12">
        
//         {/* 1. Main Heading */}
//         <header>
//           <h1 className="text-4xl font-bold text-white tracking-tight">Settings</h1>
//           <p className="text-[#8b949e] mt-2">Manage your account details and security preferences.</p>
//         </header>

//         {/* 2. Profile Component */}
//         <section className="bg-[#161b22] border border-[#30363d] rounded-xl shadow-lg">
//           <div className="p-6 border-b border-[#30363d] flex items-center gap-3">
//             <User className="text-[#58a6ff]" size={22} />
//             <h2 className="text-xl font-semibold text-white">Profile</h2>
//           </div>
          
//           <div className="p-8 space-y-6">
//             {/* Username Row */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-[#8b949e]">Username</label>
//               <div className="flex gap-3">
//                 <input 
//                   type="text" 
//                   defaultValue={userData.username} // Data from DB
//                   className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white focus:border-[#58a6ff] outline-none transition"
//                 />
//                 <button className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white px-4 py-2 rounded-md text-sm font-medium transition">
//                   Change
//                 </button>
//               </div>
//             </div>

//             {/* Email Row (View Only or Editable) */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-[#8b949e]">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 text-[#484f58]" size={18} />
//                 <input 
//                   type="email" 
//                   readOnly
//                   value={userData.email} // Data from DB
//                   className="w-full bg-[#0d1117]/50 border border-[#30363d] rounded-md p-2.5 pl-10 text-[#8b949e] cursor-not-allowed outline-none"
//                 />
//               </div>
//               <p className="text-xs text-[#8b949e]">Email is managed through your primary account provider.</p>
//             </div>
//           </div>
//         </section>

//         {/* 3. Security Component */}
//         <section className="bg-[#161b22] border border-[#30363d] rounded-xl shadow-lg">
//           <div className="p-6 border-b border-[#30363d] flex items-center gap-3">
//             <ShieldCheck className="text-[#58a6ff]" size={22} />
//             <h2 className="text-xl font-semibold text-white">Security</h2>
//           </div>
          
//           <div className="p-6 space-y-4">
//             {/* Password Update Item */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg gap-4">
//               <div className="flex items-center space-x-4">
//                 <div className="p-2 bg-[#1f6feb]/10 rounded-lg">
//                   <Lock className="text-[#58a6ff]" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-white">Update Password</p>
//                   <p className="text-xs text-[#8b949e]">Requires verification of current password</p>
//                 </div>
//               </div>
//               <button className="px-5 py-2 text-sm font-semibold bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] text-white transition">
//                 Update
//               </button>
//             </div>

//             {/* 2FA Item */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg gap-4">
//               <div className="flex items-center space-x-4">
//                 <div className="p-2 bg-[#1f6feb]/10 rounded-lg">
//                   <Smartphone className="text-[#58a6ff]" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
//                   <p className="text-xs text-[#8b949e]">Secure your account with an extra layer</p>
//                 </div>
//               </div>
//               <button className="px-5 py-2 text-sm font-semibold bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded-md transition">
//                 Enable
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* 4. Danger Zone Component */}
//         <section className="bg-[#1c1112] border border-[#442326] rounded-xl shadow-lg">
//           <div className="p-6 border-b border-[#442326] flex items-center gap-3">
//             <AlertTriangle className="text-[#f85149]" size={22} />
//             <h2 className="text-xl font-semibold text-[#f85149]">Danger Zone</h2>
//           </div>
          
//           <div className="p-6">
//             <div className="flex flex-col sm:items-start md:flex-row md:items-center justify-between p-5 bg-[#0d1117]/40 border border-[#442326] rounded-lg gap-4">
//               <div>
//                 <p className="text-sm font-bold text-white">Delete Account</p>
//                 <p className="text-sm text-[#8b949e] mt-1">Once you delete your account, there is no going back. Please be certain.</p>
//               </div>
//               <button className="px-6 py-2 text-sm font-bold bg-transparent border border-[#da3633] text-[#f85149] rounded-md hover:bg-[#da3633] hover:text-white transition-all flex items-center gap-2">
//                 <Trash2 size={16} /> Delete Account
//               </button>
//             </div>
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default SettingsPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Smartphone, AlertTriangle, Trash2, ShieldCheck, Loader2 } from 'lucide-react';

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Fetch Data from your DB ---
  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data);
      setLoading(false);
    })
    .catch(() => {
      // Redirect to login if token is invalid or missing
      window.location.href = "/auth";
    });
  }, []);

  // Loading Screen (prevents "undefined" errors while fetching)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <Loader2 className="text-[#58a6ff] animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 md:p-16 font-sans">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* 1. Page Heading */}
        <header>
          <h1 className="text-4xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-[#8b949e] mt-2">Manage your account details and security preferences.</p>
        </header>

        {/* 2. Profile Component */}
        <section className="bg-[#161b22] border border-[#30363d] rounded-xl shadow-lg transition-all hover:border-[#444c56]">
          <div className="p-6 border-b border-[#30363d] flex items-center gap-3">
            <User className="text-[#58a6ff]" size={22} />
            <h2 className="text-xl font-semibold text-white">Profile</h2>
          </div>
          
          <div className="p-8 space-y-6">
            {/* Username Row - Fetched from DB */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#8b949e]">Username</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  defaultValue={user?.username} // Accesses the username from your API response
                  className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white focus:border-[#58a6ff] outline-none transition"
                />
                <button className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white px-4 py-2 rounded-md text-sm font-medium transition">
                  Change
                </button>
              </div>
            </div>

            {/* Email Row - Fetched from DB */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#8b949e]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-[#484f58]" size={18} />
                <input 
                  type="email" 
                  readOnly
                  value={user?.email} // Accesses the email from your API response
                  className="w-full bg-[#0d1117]/50 border border-[#30363d] rounded-md p-2.5 pl-10 text-[#8b949e] cursor-not-allowed outline-none"
                />
              </div>
              <p className="text-xs text-[#8b949e]">Primary email cannot be changed here.</p>
            </div>
          </div>
        </section>

        {/* 3. Security Component */}
        <section className="bg-[#161b22] border border-[#30363d] rounded-xl shadow-lg transition-all hover:border-[#444c56]">
          <div className="p-6 border-b border-[#30363d] flex items-center gap-3">
            <ShieldCheck className="text-[#58a6ff]" size={22} />
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Password Update */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg gap-4 hover:bg-[#161b22] transition">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-[#1f6feb]/10 rounded-lg">
                  <Lock className="text-[#58a6ff]" size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Update Password</p>
                  <p className="text-xs text-[#8b949e]">Recommended to change every 6 months</p>
                </div>
              </div>
              <button className="px-5 py-2 text-sm font-semibold bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] text-white transition">
                Update
              </button>
            </div>

            {/* 2FA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-lg gap-4 hover:bg-[#161b22] transition">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-[#1f6feb]/10 rounded-lg">
                  <Smartphone className="text-[#58a6ff]" size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-[#8b949e]">Currently Disabled</p>
                </div>
              </div>
              <button className="px-5 py-2 text-sm font-semibold bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded-md transition">
                Enable
              </button>
            </div>
          </div>
        </section>

        {/* 4. Danger Zone Component */}
        <section className="bg-[#1c1112] border border-[#442326] rounded-xl shadow-lg">
          <div className="p-6 border-b border-[#442326] flex items-center gap-3">
            <AlertTriangle className="text-[#f85149]" size={22} />
            <h2 className="text-xl font-semibold text-[#f85149]">Danger Zone</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-[#0d1117]/40 border border-[#442326] rounded-lg gap-4">
              <div>
                <p className="text-sm font-bold text-white">Delete Account</p>
                <p className="text-sm text-[#8b949e] mt-1">This will permanently delete all your data and progress.</p>
              </div>
              <button className="px-6 py-2 text-sm font-bold bg-transparent border border-[#da3633] text-[#f85149] rounded-md hover:bg-[#da3633] hover:text-white transition-all flex items-center gap-2">
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsPage;