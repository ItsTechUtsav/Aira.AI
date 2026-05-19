import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Smartphone, AlertTriangle, Trash2, ShieldCheck, Loader2 } from 'lucide-react';

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showUsernameBox, setShowUsernameBox] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [passwordVerified, setPasswordVerified] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      window.location.href = "/auth";
    });
  }, []);


  const handleUsernameChange = async () => {
  try {
    const res = await axios.put(
      "http://localhost:3000/api/auth/change-username",
      {
        username: newUsername,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert(res.data.message);

    setUser((prev) => ({
      ...prev,
      username: newUsername,
    }));

    setNewUsername("");
  } catch (err) {
    alert(err.response?.data?.message || "Error changing username");
  }
};

const handleDeleteAccount = async () => {
  try {
    await axios.delete(
      "http://localhost:3000/api/auth/delete-account",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    localStorage.removeItem("token");

    window.location.href = "/auth";
  } catch (err) {
    alert(err.response?.data?.message || "Error deleting account");
  }
};


const verifyOldPassword = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/auth/verify-password",
      {
        oldPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setPasswordVerified(true);
  } catch (err) {
    alert("Wrong old password");
  }
};

const updatePassword = async () => {
  try {
    await axios.put(
      "http://localhost:3000/api/auth/change-password",
      {
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Password updated");

    setShowPasswordModal(false);
    setPasswordVerified(false);

    setOldPassword("");
    setNewPassword("");
  } catch (err) {
    alert("Failed to update password");
  }
};


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
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#8b949e]">
                Username
              </label>
              
              {/* Current Username */}
              <div className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-3">
                <span className="text-white font-medium">
                  {user?.username}
                </span>
              
                <button
                  onClick={() => setShowUsernameBox(!showUsernameBox)}
                  className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Change
                </button>
              </div>
              
              {/* Popup Box */}
              {showUsernameBox && (
                <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 space-y-4 animate-in fade-in duration-200">
                  
                  <div>
                    <p className="text-sm text-[#8b949e] mb-2">
                      Change username to
                    </p>
              
                    <input
                      type="text"
                      placeholder={user?.username}
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full bg-[#161b22] border border-[#30363d] rounded-md p-3 text-white focus:border-[#58a6ff] outline-none transition"
                    />
                  </div>
              
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowUsernameBox(false);
                        setNewUsername("");
                      }}
                      className="px-4 py-2 border border-[#30363d] rounded-md text-sm hover:bg-[#21262d] transition"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={async () => {
                        await handleUsernameChange();
                        setShowUsernameBox(false);
                      }}
                      className="px-4 py-2 bg-[#1f6feb] hover:bg-[#388bfd] rounded-md text-sm font-medium text-white transition"
                    >
                      Save Changes
                    </button>
                  </div>
                    
                </div>
              )}
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
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-5 py-2 text-sm font-semibold bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] text-white transition"
              >
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
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 text-sm font-bold bg-transparent border border-[#da3633] text-[#f85149] rounded-md hover:bg-[#da3633] hover:text-white transition-all flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          </div>
        </section>

      </div>
     
     {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95">

            <h2 className="text-xl font-bold text-white mb-6">
              {passwordVerified ? "Update Password" : "Verify Password"}
            </h2>
      
            {!passwordVerified ? (
              <>
                <input
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#58a6ff]"
                />

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setOldPassword("");
                    }}
                    className="px-4 py-2 rounded-lg border border-[#30363d] text-slate-300 hover:bg-[#21262d]"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={verifyOldPassword}
                    className="px-5 py-2 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-semibold"
                  >
                    Verify
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#58a6ff]"
                />

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordVerified(false);
                      setOldPassword("");
                      setNewPassword("");
                    }}
                    className="px-4 py-2 rounded-lg border border-[#30363d] text-slate-300 hover:bg-[#21262d]"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={updatePassword}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                  >
                    Update
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}


      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 w-full max-w-md shadow-2xl">

      {!confirmDelete ? (
        <>
          <h2 className="text-2xl font-bold text-red-500 mb-3">
            Delete Account
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            This action is permanent. All interview history,
            analytics and account data will be deleted forever.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => setConfirmDelete(true)}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-red-500 mb-3">
            Final Warning
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Are you absolutely sure? This cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setConfirmDelete(false);
              }}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Delete Permanently
            </button>
          </div>
        </>
      )}

    </div>
  </div>
)}


    </div>

  );
};

export default SettingsPage;