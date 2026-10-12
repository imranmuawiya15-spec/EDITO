import React from 'react';
import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PLATFORM } from '../types';

interface FooterProps {
  onOpenLoginModal: () => void;
  onOpenAdminPortal: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLoginModal,
  onOpenAdminPortal,
  isAdmin
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white dark:bg-[#07090c] border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs">
              M
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-white block text-sm">
                MUAWIYA STUDIOS
              </span>
              <span className="text-[11px] text-zinc-500">
                Post-Production &amp; Client Review Platform · {ADMIN_PLATFORM}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => scrollTo('hero')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Client Reviews
            </button>
            <button onClick={() => scrollTo('hire')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Hire &amp; Pricing ($10–$1,000)
            </button>
            <button onClick={() => scrollTo('timeline-lab')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Premiere Pro Lab
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              About Muawiya
            </button>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin ? (
              <button
                onClick={onOpenAdminPortal}
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Admin Control Room
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              >
                Admin Access ({ADMIN_EMAIL})
              </button>
            )}
            <span aria-hidden="true">·</span>
            <span>&copy; {new Date().getFullYear()} {ADMIN_NAME}</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
