import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HireProjectType, ADMIN_NAME } from '../types';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Send, 
  Film, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Layers,
  Video
} from 'lucide-react';

export const HireSection: React.FC = () => {
  const { submitHireRequest } = useApp();

  // Interactive Estimator & Form state
  const [budgetSlider, setBudgetSlider] = useState<number>(250);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState<HireProjectType>('Brand Collaboration');
  const [turnaround, setTurnaround] = useState<'24 Hours (Express)' | '48 Hours (Standard)' | '3-5 Days (Flexible)'>('48 Hours (Standard)');
  const [aspectRatio, setAspectRatio] = useState<'16:9 Landscape' | '9:16 Vertical' | 'Both 16:9 & 9:16' | '1:1 Square'>('Both 16:9 & 9:16');
  const [footageLink, setFootageLink] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectPackageBudget = (budget: number, type: HireProjectType) => {
    setBudgetSlider(budget);
    setSelectedProjectType(type);
    const formElement = document.getElementById('hire-inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !footageLink.trim()) return;

    submitHireRequest({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      projectType: selectedProjectType,
      budget: budgetSlider,
      turnaround,
      aspectRatioPreference: aspectRatio,
      footageLink: footageLink.trim(),
      details: details.trim() || 'No additional notes provided.'
    });

    setIsSubmitted(true);
  };

  return (
    <section id="hire" className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#090b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            <span>Transparent Pricing &amp; Hire Desk</span>
            <span aria-hidden="true">·</span>
            <span>Starting $10 to $1,000</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Hire {ADMIN_NAME} for Your Next Video Cut.
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From rapid $10 social reels to comprehensive $1,000 commercial brand collaborations. 
            Select a package or configure a custom quote for your raw footage below.
          </p>
        </div>

        {/* 4 Tiered Pricing Cards ($10 to $1000) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Tier 1: $10 - $35 */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#12151b] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <div>
              <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                TIER 01 · FAST HOOK
              </div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-1">
                Starter Quick Cut
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                Short-form hook editing, quick trim, and basic subtitles.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold font-mono text-zinc-950 dark:text-white tabular-nums">
                  $10 – $35
                </span>
                <span className="text-xs text-zinc-500 font-mono">/ cut</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Up to 60s vertical video (9:16)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Premiere Pro razor trim &amp; jump cuts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Basic animated captions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>24h rapid delivery</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPackageBudget(25, 'Social Reels & Shorts')}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              Select Starter ($25)
            </button>
          </div>

          {/* Tier 2: $50 - $180 */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#12151b] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <div>
              <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                TIER 02 · HIGH RETENTION
              </div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-1">
                YouTube &amp; Creator
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                Pacing, dynamic zoom punch-ins, sound effects, and retention flow.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold font-mono text-zinc-950 dark:text-white tabular-nums">
                  $50 – $180
                </span>
                <span className="text-xs text-zinc-500 font-mono">/ video</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>3 to 10 minutes long-form YouTube</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Multi-layer B-roll &amp; overlay sound FX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Motion graphic titles &amp; lower thirds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>2 rounds of review revisions</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPackageBudget(120, 'YouTube / Creator')}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              Select Creator ($120)
            </button>
          </div>

          {/* Tier 3: Brand Collaboration $250 - $550 (Highlighted) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181c24] border-2 border-violet-500 shadow-xl flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-mono font-medium text-violet-600 dark:text-violet-400 mb-2">
                TIER 03 · COMMERCIAL
              </div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-1">
                Brand Collaboration
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                Commercial grade pacing, Lumetri color science, and brand assets.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold font-mono text-zinc-950 dark:text-white tabular-nums">
                  $250 – $550
                </span>
                <span className="text-xs text-zinc-500 font-mono">/ project</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-200 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span>Commercial / Promo &amp; Brand Story</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span>Dual Formats: 16:9 Cinema &amp; 9:16 Social</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span>Full Lumetri 3D LUT Color Grading</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span>Broadcast Audio (-14 LUFS) mastering</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPackageBudget(350, 'Brand Collaboration')}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors shadow-md"
            >
              Select Brand Collab ($350)
            </button>
          </div>

          {/* Tier 4: $600 - $1000 */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#12151b] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <div>
              <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                TIER 04 · MASTER SUITE
              </div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-1">
                Full Campaign Master
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                Bespoke end-to-end post-production, unlimited revisions, ProRes master.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold font-mono text-zinc-950 dark:text-white tabular-nums">
                  $600 – $1,000
                </span>
                <span className="text-xs text-zinc-500 font-mono">/ campaign</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Complete multi-asset rollout (Hero + 6x Cuts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Unlimited revisions via Review Portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Adobe Premiere Pro project file included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>VIP 24-hour turnaround priority</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPackageBudget(850, 'Full Campaign Master')}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              Select Master ($850)
            </button>
          </div>

        </div>

        {/* Custom Price Calculator & Hire Submission Form */}
        <div id="hire-inquiry-form" className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#12151c] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Price Slider & Scope Estimator */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  INTERACTIVE ESTIMATOR
                </span>
                <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mt-1">
                  Adjust Your Budget: <span className="font-mono text-violet-600 dark:text-violet-400">${budgetSlider}</span>
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                  Drag the slider between $10 and $1,000 to match your project budget.
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={budgetSlider}
                  onChange={e => setBudgetSlider(Number(e.target.value))}
                  aria-label="Budget slider from $10 to $1,000"
                  className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>$10</span>
                  <span>$250</span>
                  <span>$500</span>
                  <span>$750</span>
                  <span>$1,000</span>
                </div>
              </div>

              {/* Estimated Scope Box based on budget */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#181c24] border border-zinc-200 dark:border-zinc-800 text-xs space-y-2.5">
                <div className="font-semibold text-zinc-900 dark:text-white flex items-center justify-between">
                  <span>Estimated Deliverable</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    {budgetSlider < 50
                      ? '1x Short-form Social Hook'
                      : budgetSlider < 200
                      ? '1x Standard YouTube Cut (Up to 8 min)'
                      : budgetSlider < 600
                      ? '1x High-End Brand Commercial + 2x Cutdowns'
                      : 'Comprehensive Multi-Asset Campaign Master'}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {budgetSlider < 50
                    ? 'Includes Premiere Pro hook pacing, viral subtitle styling, and audio sync.'
                    : budgetSlider < 200
                    ? 'Includes dynamic zoom framing, B-roll layers, sound design, and 2 rounds of review.'
                    : budgetSlider < 600
                    ? 'Includes full Lumetri color grade, sound sweetening, 16:9 + 9:16 delivery, and brand assets.'
                    : 'Includes priority 24h turnaround, project source files, unlimited revisions, and multi-platform masters.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 text-xs text-violet-800 dark:text-violet-300">
                <span className="font-semibold block mb-1">Direct Editor Access</span>
                Muawiya edits every project personally in Adobe Premiere Pro. No outsourcing, no automated templates.
              </div>
            </div>

            {/* Right: Submission Form */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-[#181c24] rounded-2xl border border-emerald-500/30">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    Hire Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mb-6 leading-relaxed">
                    Thank you, <strong>{clientName}</strong>. Muawiya has received your <strong>{selectedProjectType}</strong> request with an allocated budget of <strong>${budgetSlider}</strong>.
                    Your inquiry is now live in Muawiya's Admin Inquiries dashboard and you will receive an email at <strong>{clientEmail}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    Submit Another Project Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                    Submit Project Details for Muawiya
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Your Name / Brand
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        placeholder="e.g. David Reynolds"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-[#181c24] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={e => setClientEmail(e.target.value)}
                        placeholder="david@brand.com"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-[#181c24] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Project Type
                      </label>
                      <select
                        value={selectedProjectType}
                        onChange={e => setSelectedProjectType(e.target.value as HireProjectType)}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-[#181c24] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                      >
                        <option value="Brand Collaboration">Brand Collaboration</option>
                        <option value="Edit Other Videos">Edit Other Videos (Custom Footage)</option>
                        <option value="YouTube / Creator">YouTube / Creator Video</option>
                        <option value="Social Reels & Shorts">Social Reels &amp; Shorts</option>
                        <option value="Commercial / Promo">Commercial / Promo</option>
                        <option value="Full Campaign Master">Full Campaign Master</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Turnaround Preference
                      </label>
                      <select
                        value={turnaround}
                        onChange={e => setTurnaround(e.target.value as any)}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-[#181c24] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                      >
                        <option value="24 Hours (Express)">24 Hours (Express Priority)</option>
                        <option value="48 Hours (Standard)">48 Hours (Standard Review)</option>
                        <option value="3-5 Days (Flexible)">3–5 Days (Flexible)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Aspect Ratio Delivery
                      </label>
                      <select
                        value={aspectRatio}
                        onChange={e => setAspectRatio(e.target.value as any)}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-[#181c24] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                      >
                        <option value="Both 16:9 & 9:16">Both 16:9 Landscape &amp; 9:16 Vertical</option>
                        <option value="16:9 Landscape">16:9 Cinema Landscape Only</option>
                        <option value="9:16 Vertical">9:16 Social Vertical (Reels/Shorts)</option>
                        <option value="1:1 Square">1:1 Square</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Footage Link (Drive / Dropbox / WeTransfer)
                      </label>
                      <input
                        type="url"
                        required
                        value={footageLink}
                        onChange={e => setFootageLink(e.target.value)}
                        placeholder="https://drive.google.com/drive/folders/..."
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-[#181c24] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Project Vision &amp; Editing Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      placeholder="Describe pacing, music preference, inspiration links, or key shots you want emphasized..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-[#181c24] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 text-xs font-semibold uppercase tracking-wider rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Hire Request · Budget: ${budgetSlider}</span>
                  </button>
                  
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block text-center mt-2">
                    Your request instantly logs to Muawiya’s administrator dashboard for quote confirmation.
                  </span>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
