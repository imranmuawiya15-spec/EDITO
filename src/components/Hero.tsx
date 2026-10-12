import React from 'react';
import { ADMIN_NAME, ADMIN_EXPERIENCE, ADMIN_PLATFORM } from '../types';
import { Play, ArrowRight, Video, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreReviews: () => void;
  onExploreHire: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreReviews, onExploreHire }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
              <span>{ADMIN_NAME} Portfolio & Review Hub</span>
              <span aria-hidden="true">·</span>
              <span>{ADMIN_EXPERIENCE}</span>
              <span aria-hidden="true">·</span>
              <span className="text-violet-600 dark:text-violet-400">{ADMIN_PLATFORM}</span>
            </div>

            {/* Display Headline with balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15] mb-6 max-w-2xl">
              Precision Video Editing & Private Client Review Suite.
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-xl">
              Fast, high-retention post-production engineered exclusively in Adobe Premiere Pro. 
              Review cuts in real-time, leave timestamped frame feedback, and collaborate on brand campaigns, creator edits, and custom footage.
            </p>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreReviews}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md group whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Client Review Portal</span>
              </button>

              <button
                onClick={onExploreHire}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap"
              >
                <span>Hire Muawiya ($10 – $1,000)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro reassurance */}
            <div className="mt-8 flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Frame-Accurate Comments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>24–48h Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Premiere Pro Master Files</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Visual Media Container */}
          <div className="lg:col-span-5 flex">
            <div className="w-full relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-900 group min-h-[360px] lg:min-h-full">
              <img
                src="/src/assets/images/hero_premiere_suite_1791826750553.jpg"
                alt="Muawiya Professional Premiere Pro Editing Suite"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-medium text-violet-400">
                    ADOBE PREMIERE PRO WORKSTATION
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    4K PRORES 422 HQ
                  </span>
                </div>
                <p className="text-xs text-zinc-300">
                  Lumetri Color Wheels · Dynamic Link VFX · Pacing Optimization · Multi-Track Audio Master
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-column KPI / Proof row below hero split */}
        <div className="mt-14 pt-10 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80">
            <span className="block text-2xl font-bold font-mono text-zinc-900 dark:text-white tabular-nums">
              1 Year
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
              Dedicated Daily Editing &amp; Content Craft
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80">
            <span className="block text-2xl font-bold font-mono text-zinc-900 dark:text-white tabular-nums">
              Premiere Pro
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
              Primary NLE Post-Production Suite
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80">
            <span className="block text-2xl font-bold font-mono text-zinc-900 dark:text-white tabular-nums">
              $10 – $1,000
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
              Flexible Tiers from Shorts to Brand Campaigns
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80">
            <span className="block text-2xl font-bold font-mono text-zinc-900 dark:text-white tabular-nums">
              24–48 Hours
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
              Rapid Review Turnaround &amp; Revisions
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
