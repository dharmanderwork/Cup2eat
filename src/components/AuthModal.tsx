import React, { useState } from 'react';
import { UserAccount, INITIAL_USERS } from '../utils/ecommerce';
import {
  X,
  User,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  MapPin,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { playChimeSound } from '../utils/sound';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  defaultTab?: 'customer-login' | 'customer-register' | 'admin-login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultTab = 'customer-login',
}) => {
  const [activeTab, setActiveTab] = useState<'customer-login' | 'customer-register' | 'admin-login'>(
    defaultTab
  );

  // Customer Login State
  const [custEmail, setCustEmail] = useState('customer@cup2eat.in');
  const [custPass, setCustPass] = useState('Cup2Eat@123');

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('admin@cup2eat.in');
  const [adminPass, setAdminPass] = useState('Admin@2026');

  // Customer Registration State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regCity, setRegCity] = useState('New Delhi');
  const [regPincode, setRegPincode] = useState('110001');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!custEmail.trim() || !custPass.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    const existingCustomer =
      INITIAL_USERS.find(
        (u) => u.role === 'customer' && u.email.toLowerCase() === custEmail.trim().toLowerCase()
      ) || {
        ...INITIAL_USERS[0],
        email: custEmail.trim(),
        name: custEmail.split('@')[0] || 'Aarav Sharma',
      };

    playChimeSound(680, false);
    onLoginSuccess(existingCustomer);
    onClose();
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!adminEmail.trim() || !adminPass.trim()) {
      setErrorMsg('Please enter Admin credentials.');
      return;
    }
    const adminUser = INITIAL_USERS.find((u) => u.role === 'admin')!;
    playChimeSound(740, false);
    onLoginSuccess(adminUser);
    onClose();
  };

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regAddress.trim()) {
      setErrorMsg('Please fill in all required fields to create your account.');
      return;
    }

    const newCustomer: UserAccount = {
      id: `usr-cust-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      role: 'customer',
      companyName: regCompany.trim() || undefined,
      address: regAddress.trim(),
      city: regCity.trim() || 'New Delhi',
      state: 'Delhi-NCR',
      pincode: regPincode.trim() || '110001',
      joinedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    playChimeSound(720, false);
    onLoginSuccess(newCustomer);
    onClose();
  };

  const handleQuickDemoLogin = (role: 'customer' | 'admin') => {
    const user = INITIAL_USERS.find((u) => u.role === role)!;
    playChimeSound(700, false);
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#DFD6CA] shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="bg-[#0e382b] text-white p-6 relative">
          <button
            onClick={onClose}
            aria-label="Close login modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#E6C687] mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cup2Eat Account & Admin Portal</span>
          </div>
          <h2 id="auth-modal-title" className="text-2xl font-bold font-display">
            {activeTab === 'admin-login'
              ? 'Admin Command Center Login'
              : activeTab === 'customer-register'
              ? 'Create Customer / Café Account'
              : 'Welcome Back to Cup2Eat'}
          </h2>
          <p className="text-xs text-[#C7DDD2] mt-1">
            Manage orders, download GST invoices, track shipments, or access inventory controls.
          </p>

          {/* 3-Tab Switcher */}
          <div className="grid grid-cols-3 gap-1.5 bg-[#09271e] p-1 rounded-xl mt-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('customer-login');
                setErrorMsg(null);
              }}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'customer-login'
                  ? 'bg-[#E6C687] text-[#0e382b] shadow-2xs'
                  : 'text-[#BFD4C8] hover:text-white'
              }`}
            >
              Customer Login
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('customer-register');
                setErrorMsg(null);
              }}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'customer-register'
                  ? 'bg-[#E6C687] text-[#0e382b] shadow-2xs'
                  : 'text-[#BFD4C8] hover:text-white'
              }`}
            >
              Register Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin-login');
                setErrorMsg(null);
              }}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'admin-login'
                  ? 'bg-[#E6C687] text-[#0e382b] shadow-2xs'
                  : 'text-[#BFD4C8] hover:text-white'
              }`}
            >
              Admin Panel
            </button>
          </div>
        </div>

        {/* Instant 1-Click Demo Credentials Bar */}
        <div className="bg-[#FAF6EE] px-6 py-3 border-b border-[#EAE2D5] flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-[#6E5728] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#0e382b]" />
            <span>Instant Demo Access:</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('customer')}
              className="px-2.5 py-1 text-[11px] font-bold bg-white text-[#0e382b] border border-[#0e382b]/30 rounded-lg hover:bg-[#EBF5EE] transition-colors cursor-pointer"
            >
              1-Click Customer Login
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-2.5 py-1 text-[11px] font-bold bg-[#0e382b] text-[#E6C687] rounded-lg hover:bg-[#154a3a] transition-colors cursor-pointer"
            >
              1-Click Admin Login
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Tab 1: Customer Login */}
          {activeTab === 'customer-login' && (
            <form onSubmit={handleCustomerLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C2420] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7C6E56] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    placeholder="customer@cup2eat.in"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2420] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7C6E56] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={custPass}
                    onChange={(e) => setCustPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F4EFE6] text-[11px] text-[#556058] flex items-center justify-between">
                <span>Pre-filled with Demo Customer: <strong>Aarav Sharma</strong></span>
                <span className="text-[#0e382b] font-bold">2 Past Orders</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0e382b] hover:bg-[#154a3a] text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to Customer Panel</span>
                <ArrowRight className="w-4 h-4 text-[#E6C687]" />
              </button>
            </form>
          )}

          {/* Tab 2: Customer Registration */}
          {activeTab === 'customer-register' && (
            <form onSubmit={handleCustomerRegister} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1C2420] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7C6E56] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Rohan Kapoor"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2420] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7C6E56] absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 9818192575"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1C2420] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7C6E56] absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@cafe.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C2420] mb-1">
                    Café / Business Name (Optional)
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#7C6E56] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="e.g. Aroma Espresso Bar"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2420] mb-1">
                  Delivery Street Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#7C6E56] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="Shop No, Building, Area"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1C2420] mb-1">City</label>
                  <input
                    type="text"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1C2420] mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={regPincode}
                    onChange={(e) => setRegPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0e382b] hover:bg-[#154a3a] text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E6C687]" />
                <span>Create Account & Continue</span>
              </button>
            </form>
          )}

          {/* Tab 3: Admin Login */}
          {activeTab === 'admin-login' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#EBF5EE] border border-[#0e382b]/20 text-xs text-[#11382A]">
                <div className="font-bold flex items-center gap-1.5 mb-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#0e382b]" />
                  <span>Cup2Eat Admin & Inventory Suite</span>
                </div>
                <p className="text-[11px] text-[#355648]">
                  Access real-time order management, stock adjustments, product catalogue editor, and GST tax invoices.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2420] mb-1">
                  Admin Email ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7C6E56] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C2420] mb-1">
                  Master Passkey
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7C6E56] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#DFD6CA] bg-[#FAF8F5] focus:bg-white focus:border-[#0e382b] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0e382b] hover:bg-[#154a3a] text-[#E6C687] font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Admin Dashboard</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
