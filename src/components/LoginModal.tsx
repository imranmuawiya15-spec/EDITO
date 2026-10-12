import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_EMAIL, ADMIN_NAME } from '../types';
import { X, ShieldAlert, Lock, User, KeyRound, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminPortal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onOpenAdminPortal
}) => {
  const { loginAsAdmin, loginAsClient, adminLoginError, projects, setSelectedProjectId } = useApp();
  const [tab, setTab] = useState<'admin' | 'client'>('admin');

  // Admin form fields
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Client form fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectPasscode, setProjectPasscode] = useState('');
  const [passcodeNotice, setPasscodeNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const inputEmail = adminEmail.trim().toLowerCase();
    if (inputEmail !== ADMIN_EMAIL.toLowerCase()) {
      setAuthError(`Security Restriction: Only ${ADMIN_EMAIL} is authorized as Admin. Access denied for ${adminEmail}.`);
      return;
    }

    if (!adminPassword.trim()) {
      setAuthError('Please enter the administrator password.');
      return;
    }

    const success = loginAsAdmin(adminEmail, adminPassword);
    if (success) {
      onClose();
      onOpenAdminPortal();
    }
  };

  const handleUseAdminPreset = () => {
    setAdminEmail(ADMIN_EMAIL);
    setAdminPassword('muawiya2026');
    setAuthError(null);
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeNotice(null);

    if (!clientName.trim() || !clientEmail.trim()) {
      setPasscodeNotice('Please enter your name and email address.');
      return;
    }

    // If a passcode is entered, verify if it matches a project
    if (projectPasscode.trim()) {
      const match = projects.find(
        p => p.passcode.toLowerCase() === projectPasscode.trim().toLowerCase()
      );
      if (match) {
        setSelectedProjectId(match.id);
      }
    }

    loginAsClient(clientName, clientEmail);
    onClose();

    // Scroll to review section
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#111418] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Studio Access Portal
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Sign in as Admin ({ADMIN_NAME}) or Client Reviewer
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Login Modal"
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-2 bg-zinc-100 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800 flex gap-1">
          <button
            type="button"
            onClick={() => setTab('admin')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === 'admin'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Admin Login ({ADMIN_NAME})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('client')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === 'client'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5 text-blue-500" />
            <span>Client Reviewer</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {tab === 'admin' ? (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Exclusive Administrator Access</span>
                    <span>Only <code className="font-mono font-semibold bg-amber-500/20 px-1 py-0.5 rounded">{ADMIN_EMAIL}</code> can log in as Admin. No other email has access.</span>
                  </div>
                </div>
              </div>

              {(authError || adminLoginError) && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError || adminLoginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="imranmuawiya15@gmail.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Convenience 1-click test button */}
              <button
                type="button"
                onClick={handleUseAdminPreset}
                className="w-full py-1.5 px-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/60 rounded-md transition-colors text-center"
              >
                Auto-fill Muawiya's Admin Credentials ({ADMIN_EMAIL})
              </button>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
              >
                Authenticate as Admin
              </button>
            </form>
          ) : (
            <form onSubmit={handleClientSubmit} className="space-y-4">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Enter your details to leave timestamped revision notes, review cuts, and approve deliverables.
              </p>

              {passcodeNotice && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
                  {passcodeNotice}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Your Work Email
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="elena@company.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Project Passcode (Optional)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={projectPasscode}
                    onChange={e => setProjectPasscode(e.target.value.toUpperCase())}
                    placeholder="e.g. AURA-2026 or NEON-9901"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm font-mono uppercase rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                  Leave blank to view all active public preview projects.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Access Review Portal
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
