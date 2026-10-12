import React from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_EMAIL, ADMIN_NAME } from '../types';
import { Sun, Moon, ShieldCheck, UserCheck, Film, LogOut, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenLoginModal: () => void;
  onOpenAdminPortal: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLoginModal,
  onOpenAdminPortal,
  activeSection,
  setActiveSection
}) => {
  const { theme, toggleTheme, user, logout } = useApp();
  const isAdmin = user.role === 'admin' && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors bg-white/90 dark:bg-[#090b0e]/90 border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm tracking-wider shadow-sm transition-transform group-hover:scale-105">
              M
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white whitespace-nowrap block">
                MUAWIYA STUDIOS
              </span>
              <span className="text-[10px] tracking-wide text-zinc-500 dark:text-zinc-400 block -mt-1 font-mono">
                Premiere Pro Editor
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-zinc-600 dark:text-zinc-300">
          <button
            onClick={() => handleNavClick('reviews')}
            className={`transition-colors whitespace-nowrap hover:text-zinc-900 dark:hover:text-white ${
              activeSection === 'reviews' ? 'text-zinc-950 dark:text-white font-semibold underline underline-offset-8' : ''
            }`}
          >
            Client Reviews
          </button>
          <button
            onClick={() => handleNavClick('hire')}
            className={`transition-colors whitespace-nowrap hover:text-zinc-900 dark:hover:text-white ${
              activeSection === 'hire' ? 'text-zinc-950 dark:text-white font-semibold underline underline-offset-8' : ''
            }`}
          >
            Hire Muawiya ($10–$1,000)
          </button>
          <button
            onClick={() => handleNavClick('timeline-lab')}
            className={`transition-colors whitespace-nowrap hover:text-zinc-900 dark:hover:text-white ${
              activeSection === 'timeline-lab' ? 'text-zinc-950 dark:text-white font-semibold underline underline-offset-8' : ''
            }`}
          >
            Premiere Pro Lab
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap hover:text-zinc-900 dark:hover:text-white ${
              activeSection === 'about' ? 'text-zinc-950 dark:text-white font-semibold underline underline-offset-8' : ''
            }`}
          >
            About Muawiya
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark and Light Mode"
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminPortal}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors whitespace-nowrap shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Suite</span>
              </button>
              <button
                onClick={logout}
                aria-label="Log Out"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Log Out Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : user.role === 'client' ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 rounded-md">
                <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium truncate max-w-[120px]">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin / Client Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
