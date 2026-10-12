import React from 'react';
import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_EXPERIENCE, ADMIN_PLATFORM } from '../types';
import { Mail, CheckCircle, Film, Sparkles, Sliders, Music, Cpu, Award } from 'lucide-react';

export const AboutMuawiya: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0c0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Profile & Badge Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-extrabold text-2xl tracking-wider shadow-md">
                  M
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                    {ADMIN_NAME}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                    {ADMIN_PLATFORM} Video Editor
                  </p>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    {ADMIN_EXPERIENCE}
                  </p>
                </div>
              </div>

              {/* Verified Admin & Contact Info */}
              <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-500 dark:text-zinc-400">Primary Software:</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">{ADMIN_PLATFORM}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-500 dark:text-zinc-400">Official Admin Email:</span>
                  <a href={`mailto:${ADMIN_EMAIL}`} className="font-mono text-violet-600 dark:text-violet-400 hover:underline">
                    {ADMIN_EMAIL}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-500 dark:text-zinc-400">Turnaround Standard:</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">24h – 48h Delivery</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-500 dark:text-zinc-400">Pricing Range:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$10 – $1,000</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={`mailto:${ADMIN_EMAIL}?subject=Direct Project Inquiry for Muawiya`}
                  className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email to Muawiya</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Technical Rigor */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
                <span>The Editor's Craft</span>
                <span aria-hidden="true">·</span>
                <span>Muawiya's Story</span>
              </div>
              <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
                Modern Storytelling Engineered on Adobe Premiere Pro.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              For the past <strong>1 year</strong>, I have dedicated myself to mastering the art of high-retention post-production exclusively inside <strong>Adobe Premiere Pro</strong>. 
              Rather than generic templates or bloated presets, every cut is assembled with intent: ruthless pacing, frame-accurate beat drops, Lumetri color harmony, and cinematic sound layering.
            </p>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              This review platform is built so clients never have to deal with endless email chains, vague revision timestamps, or lost Google Drive comments. You preview high-definition exports in real-time, leave pin-point feedback at exact seconds, and receive updated cuts fast.
            </p>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 text-xs">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-1">
                  <Sliders className="w-4 h-4 text-violet-500" />
                  <span>Lumetri Color Grading</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400">
                  3D LUT correction, skin-tone isolation, contrast balance, and film emulations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 text-xs">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-1">
                  <Music className="w-4 h-4 text-teal-500" />
                  <span>Sound Design &amp; Mastering</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Multi-track audio ducking, sub-bass impacts, risers, and -14 LUFS broadcast compliance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 text-xs">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-1">
                  <Film className="w-4 h-4 text-blue-500" />
                  <span>Brand &amp; Commercial Cuts</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Sophisticated pacing for luxury, fashion, product launches, and brand collaborations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 text-xs">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-1">
                  <Cpu className="w-4 h-4 text-emerald-500" />
                  <span>Social Retention &amp; Hooks</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400">
                  High-energy 9:16 vertical cuts for TikTok, YouTube Shorts, and Instagram Reels.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
