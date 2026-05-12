import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Mail, Building, Clock, FileText, LayoutDashboard, Lock, LogIn, AlertCircle, ShieldCheck, QrCode, Settings, LogOut, Key } from 'lucide-react';

export default function Admin() {
  const [view, setView] = useState('login'); // 'login', '2fa', 'dashboard', 'settings'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [tempId, setTempId] = useState(null);
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [activeTab, setActiveTab] = useState('contacts');
  const [dbData, setDbData] = useState({ contacts: [], applications: [] });
  
  const [newPassword, setNewPassword] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [setupCode, setSetupCode] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'https://foundriva-nhg9.onrender.com';

  useEffect(() => {
    if (token) {
      setView('dashboard');
      fetchData(token);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        if (data.twoFactorRequired) {
          setTempId(data.tempId);
          setView('2fa');
        } else {
          setToken(data.token);
          localStorage.setItem('admin_token', data.token);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handle2FAVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/2fa/verify-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempId, code: twoFactorCode })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('2FA verification failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (authToken) => {
    setLoading(true);
    try {
      const [cRes, aRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/contacts`, { headers: { 'Authorization': `Bearer ${authToken}` } }),
        fetch(`${API_URL}/api/admin/applications`, { headers: { 'Authorization': `Bearer ${authToken}` } })
      ]);
      const cData = await cRes.json();
      const aData = await aRes.json();
      setDbData({ contacts: cData.data || [], applications: aData.data || [] });
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const setup2FA = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/2fa/setup`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setQrCode(data.qrCode);
    } catch (err) {
      setError('Could not setup 2FA');
    }
  };

  const confirm2FA = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/2fa/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ code: setupCode })
      });
      if (res.ok) {
        setQrCode(null);
        alert('2FA Enabled Successfully!');
      } else {
        alert('Invalid Code');
      }
    } catch (err) {
      alert('Error');
    }
  };

  const updatePassword = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/password/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ newPassword })
      });
      if (res.ok) {
        alert('Password updated successfully!');
        setNewPassword('');
      }
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setView('login');
  };

  // --- RENDERING COMPONENTS ---

  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-6 pt-48 pb-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-premium border border-[#1e0a3c]/10 text-center">
          <div className="w-20 h-20 bg-[#1e0a3c] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={32} className="text-white" /></div>
          <h1 className="text-3xl font-bold text-[#1e0a3c] mb-2 tracking-tighter">Secure Login</h1>
          <p className="text-[#1e0a3c]/40 font-bold text-xs uppercase tracking-widest mb-10">Founder & Admin Portal</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-6 py-4 font-bold" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} />
            <input type="password" placeholder="Password" className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-6 py-4 font-bold" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} />
            {error && <div className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-xl">{error}</div>}
            <button className="w-full bg-[#1e0a3c] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"> {loading ? 'Verifying...' : <><LogIn size={18} /> Sign In</>} </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (view === '2fa') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-6 pt-48 pb-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-premium border border-[#1e0a3c]/10 text-center">
          <div className="w-20 h-20 bg-[#1e0a3c] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"><ShieldCheck size={32} className="text-white" /></div>
          <h1 className="text-3xl font-bold text-[#1e0a3c] mb-2 tracking-tighter">Two-Factor Auth</h1>
          <p className="text-[#1e0a3c]/40 font-bold text-xs uppercase tracking-widest mb-10">Enter code from your phone</p>
          <form onSubmit={handle2FAVerify} className="space-y-4">
            <input type="text" placeholder="6-digit code" maxLength="6" className="w-full text-center tracking-[1em] bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-6 py-4 font-black text-2xl" value={twoFactorCode} onChange={e => setTwoFactorCode(e.target.value)} />
            {error && <div className="text-red-500 text-xs font-bold bg-red-50 p-4 rounded-xl">{error}</div>}
            <button className="w-full bg-[#1e0a3c] text-white py-4 rounded-xl font-bold">Verify Code</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#1e0a3c]/40 font-bold text-[11px] uppercase tracking-[0.2em] mb-3"><LayoutDashboard size={14} /> Founder Dashboard</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1e0a3c] mb-2 tracking-tighter">{view === 'settings' ? 'Security Settings' : 'Database Monitoring'}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView(view === 'settings' ? 'dashboard' : 'settings')} className="p-3 bg-[#1e0a3c]/5 rounded-xl text-[#1e0a3c] hover:bg-[#1e0a3c]/10 transition-all"> {view === 'settings' ? <LayoutDashboard size={20} /> : <Settings size={20} />} </button>
          <button onClick={handleLogout} className="p-3 bg-red-50 rounded-xl text-red-500 hover:bg-red-100 transition-all"><LogOut size={20} /></button>
        </div>
      </div>

      {view === 'settings' ? (
        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[2.5rem] border border-[#1e0a3c]/10 shadow-premium">
              <div className="flex items-center gap-3 mb-8"><Key size={24} className="text-[#1e0a3c]" /><h3 className="text-xl font-bold text-[#1e0a3c]">Change Password</h3></div>
              <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-6 py-4 font-bold mb-4" />
              <button onClick={updatePassword} className="w-full bg-[#1e0a3c] text-white py-4 rounded-xl font-bold">Update Security</button>
           </div>
           
           <div className="bg-white p-10 rounded-[2.5rem] border border-[#1e0a3c]/10 shadow-premium">
              <div className="flex items-center gap-3 mb-8"><QrCode size={24} className="text-[#1e0a3c]" /><h3 className="text-xl font-bold text-[#1e0a3c]">2-Factor Auth (Google Auth)</h3></div>
              {!qrCode ? (
                <button onClick={setup2FA} className="w-full border-2 border-dashed border-[#1e0a3c]/20 text-[#1e0a3c] py-10 rounded-xl font-bold hover:bg-[#1e0a3c]/5 transition-all">Enable 2FA Protection</button>
              ) : (
                <div className="text-center">
                  <img src={qrCode} alt="QR" className="mx-auto mb-6 border-4 border-white shadow-lg" />
                  <p className="text-[10px] font-black text-[#1e0a3c]/40 uppercase mb-6">Scan with Google Authenticator</p>
                  <input type="text" placeholder="Verification Code" value={setupCode} onChange={e => setSetupCode(e.target.value)} className="w-full bg-[#1e0a3c]/5 border border-[#1e0a3c]/10 rounded-xl px-6 py-4 font-bold mb-4" />
                  <button onClick={confirm2FA} className="w-full bg-[#1e0a3c] text-white py-4 rounded-xl font-bold">Confirm Activation</button>
                </div>
              )}
           </div>
        </div>
      ) : (
        <>
          <div className="flex bg-[#1e0a3c]/5 p-1.5 rounded-2xl border border-[#1e0a3c]/10 w-fit mb-10">
            <button onClick={() => setActiveTab('contacts')} className={`px-6 py-3 rounded-xl font-bold text-sm ${activeTab === 'contacts' ? 'bg-[#1e0a3c] text-white' : 'text-[#1e0a3c]/50'}`}>Inquiries</button>
            <button onClick={() => setActiveTab('applications')} className={`px-6 py-3 rounded-xl font-bold text-sm ${activeTab === 'applications' ? 'bg-[#1e0a3c] text-white' : 'text-[#1e0a3c]/50'}`}>Applications</button>
          </div>
          <div className="grid gap-6">
            {(activeTab === 'contacts' ? dbData.contacts : dbData.applications).map((item, idx) => {
              const pData = activeTab === 'applications' ? JSON.parse(item.data) : null;
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-white rounded-[2rem] p-8 border border-[#1e0a3c]/10 shadow-premium flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1e0a3c] rounded-xl flex items-center justify-center text-white font-bold">{idx + 1}</div>
                      <div><p className="text-[10px] font-black text-[#1e0a3c]/30 uppercase">ID: #APP-{item.id}</p><p className="text-[11px] font-bold text-[#1e0a3c]/60">{new Date(item.created_at).toLocaleDateString()}</p></div>
                    </div>
                  </div>
                  <div className="flex-grow bg-[#1e0a3c]/[0.02] rounded-2xl p-6 border border-[#1e0a3c]/5">
                    {activeTab === 'contacts' ? (
                      <div><p className="text-[12px] font-bold text-[#1e0a3c] mb-2">{item.name} ({item.email})</p><p className="text-[14px] font-medium text-[#1e0a3c]/80">{item.message}</p></div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(pData).map(([k, v]) => (
                          <div key={k}><p className="text-[9px] font-black text-[#1e0a3c]/30 uppercase truncate">{k}</p><p className="text-[12px] font-bold text-[#1e0a3c] truncate">{String(v)}</p></div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
