import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Scissors, 
  Eye, 
  EyeOff, 
  Sparkles,
  Tv
} from 'lucide-react';
import { ADMIN_NAME, ADMIN_PLATFORM } from '../types';

export const InteractiveTimelineLab: React.FC = () => {
  // Timeline playback simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadFrame, setPlayheadFrame] = useState(72); // out of 300 frames
  const [mutedTracks, setMutedTracks] = useState<Record<string, boolean>>({});
  const [hiddenTracks, setHiddenTracks] = useState<Record<string, boolean>>({});

  // Color grade comparison slider (0 to 100)
  const [sliderPosition, setSliderPosition] = useState(55);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayheadFrame(prev => (prev >= 295 ? 0 : prev + 1));
      }, 33); // approx 30 fps
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTimecode = (frame: number) => {
    const fps = 30;
    const totalSeconds = Math.floor(frame / fps);
    const frames = frame % fps;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  const toggleTrackMute = (trackId: string) => {
    setMutedTracks(prev => ({ ...prev, [trackId]: !prev[trackId] }));
  };

  const toggleTrackVisibility = (trackId: string) => {
    setHiddenTracks(prev => ({ ...prev, [trackId]: !prev[trackId] }));
  };

  return (
    <section id="timeline-lab" className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0c0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-3">
            <span>Inside The Workflow</span>
            <span aria-hidden="true">·</span>
            <span>{ADMIN_PLATFORM} Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            The Timeline Lab: Precision Cutting &amp; Color Science.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            See how {ADMIN_NAME} constructs high-retention video architecture. Explore our multi-layered Premiere Pro sequence and inspect before-and-after color grading in real time.
          </p>
        </div>

        {/* Feature 1: Interactive Premiere Pro Sequence Simulator */}
        <div className="rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#14171d] shadow-xl overflow-hidden mb-12">
          
          {/* Workstation Top Bar */}
          <div className="px-4 py-3 bg-zinc-100 dark:bg-[#1a1f26] border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="px-2 py-0.5 rounded bg-violet-600 text-white font-mono text-[11px] font-bold tracking-wider">
                Pr
              </div>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Sequence 01 · 3840×2160 UHD · 29.97 fps (Rec.709)
              </span>
            </div>

            {/* Transport & Timecode Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-zinc-200/80 dark:bg-zinc-800 px-2 py-1 rounded-lg">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                  title={isPlaying ? 'Pause' : 'Play Timeline'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => { setIsPlaying(false); setPlayheadFrame(0); }}
                  className="p-1 rounded hover:bg-white dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                  title="Rewind to start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="font-mono text-xs font-bold px-3 py-1 bg-zinc-900 text-emerald-400 rounded-md tracking-widest tabular-nums border border-zinc-700">
                {formatTimecode(playheadFrame)}
              </div>
            </div>
          </div>

          {/* Interactive Timeline Body */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[680px]">
              
              {/* Ruler & Playhead bar */}
              <div 
                className="relative h-6 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer select-none mb-2"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left - 130; // subtract track header width
                  const usableWidth = rect.width - 130;
                  if (clickX > 0 && usableWidth > 0) {
                    const nextFrame = Math.round((clickX / usableWidth) * 300);
                    setPlayheadFrame(Math.max(0, Math.min(300, nextFrame)));
                  }
                }}
              >
                <div className="absolute left-[130px] right-0 top-0 bottom-0 flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>00:00:00</span>
                  <span>00:00:02</span>
                  <span>00:00:04</span>
                  <span>00:00:06</span>
                  <span>00:00:08</span>
                  <span>00:00:10</span>
                </div>

                {/* Vertical Playhead Cursor */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-20 pointer-events-none transition-all duration-75"
                  style={{ left: `calc(130px + ${(playheadFrame / 300) * 100}% * 0.85)` }}
                >
                  <div className="w-2.5 h-2.5 bg-blue-500 transform -translate-x-[4px] rotate-45" />
                </div>
              </div>

              {/* VIDEO TRACKS */}
              <div className="space-y-1.5 mb-3">
                {/* V3 Track: Lumetri Color Adjustment */}
                <div className="flex items-center gap-2">
                  <div className="w-[120px] shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded text-[11px] font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">V3 Lumetri</span>
                    <button 
                      onClick={() => toggleTrackVisibility('v3')}
                      className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                      title="Toggle Visibility"
                    >
                      {hiddenTracks['v3'] ? <EyeOff className="w-3 h-3 text-red-500" /> : <Eye className="w-3 h-3 text-emerald-500" />}
                    </button>
                  </div>
                  <div className="flex-1 h-9 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 flex gap-1 relative overflow-hidden">
                    <div className={`h-full w-full rounded px-2.5 flex items-center justify-between text-[11px] font-mono text-white transition-opacity ${hiddenTracks['v3'] ? 'opacity-20' : 'opacity-100 bg-amber-600/90'}`}>
                      <span>Adjustment Layer: Cinematic Film Curve + Warm Highlights</span>
                      <span className="text-[10px]">FX Lumetri</span>
                    </div>
                  </div>
                </div>

                {/* V2 Track: B-Roll & Graphics */}
                <div className="flex items-center gap-2">
                  <div className="w-[120px] shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded text-[11px] font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">V2 B-Roll</span>
                    <button 
                      onClick={() => toggleTrackVisibility('v2')}
                      className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                      {hiddenTracks['v2'] ? <EyeOff className="w-3 h-3 text-red-500" /> : <Eye className="w-3 h-3 text-emerald-500" />}
                    </button>
                  </div>
                  <div className="flex-1 h-9 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 flex gap-1 relative overflow-hidden">
                    <div className={`h-full w-[28%] rounded px-2 flex items-center text-[10px] font-mono text-white ${hiddenTracks['v2'] ? 'opacity-20' : 'bg-indigo-600/90'}`}>
                      <span>Macro Product Cut</span>
                    </div>
                    <div className={`h-full w-[20%] ml-[15%] rounded px-2 flex items-center text-[10px] font-mono text-white ${hiddenTracks['v2'] ? 'opacity-20' : 'bg-indigo-600/90'}`}>
                      <span>Motion Callout</span>
                    </div>
                    <div className={`h-full w-[22%] ml-[5%] rounded px-2 flex items-center text-[10px] font-mono text-white ${hiddenTracks['v2'] ? 'opacity-20' : 'bg-indigo-600/90'}`}>
                      <span>Logo Reveal</span>
                    </div>
                  </div>
                </div>

                {/* V1 Track: A-Roll Main Camera */}
                <div className="flex items-center gap-2">
                  <div className="w-[120px] shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded text-[11px] font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">V1 Primary</span>
                    <button 
                      onClick={() => toggleTrackVisibility('v1')}
                      className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                      {hiddenTracks['v1'] ? <EyeOff className="w-3 h-3 text-red-500" /> : <Eye className="w-3 h-3 text-emerald-500" />}
                    </button>
                  </div>
                  <div className="flex-1 h-9 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 flex gap-1 relative overflow-hidden">
                    <div className={`h-full w-[35%] rounded px-2 flex items-center text-[10px] font-mono text-white ${hiddenTracks['v1'] ? 'opacity-20' : 'bg-blue-600/90'}`}>
                      <span>A_ROLL_CAM_01.MP4</span>
                    </div>
                    <div className={`h-full w-[40%] rounded px-2 flex items-center text-[10px] font-mono text-white ${hiddenTracks['v1'] ? 'opacity-20' : 'bg-blue-600/90'}`}>
                      <span>A_ROLL_CAM_02_ACTION.MP4</span>
                    </div>
                    <div className={`h-full w-[23%] rounded px-2 flex items-center text-[10px] font-mono text-white ${hiddenTracks['v1'] ? 'opacity-20' : 'bg-blue-600/90'}`}>
                      <span>A_ROLL_FINALE.MP4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUDIO TRACKS */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/60 space-y-1.5">
                {/* A1 Track: Dialogue */}
                <div className="flex items-center gap-2">
                  <div className="w-[120px] shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded text-[11px] font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">A1 Dialogue</span>
                    <button 
                      onClick={() => toggleTrackMute('a1')}
                      className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                      {mutedTracks['a1'] ? <VolumeX className="w-3 h-3 text-red-500" /> : <Volume2 className="w-3 h-3 text-emerald-500" />}
                    </button>
                  </div>
                  <div className="flex-1 h-8 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 flex gap-1 relative overflow-hidden">
                    <div className={`h-full w-[70%] rounded px-2 flex items-center text-[10px] font-mono text-white ${mutedTracks['a1'] ? 'opacity-20' : 'bg-teal-700/80'}`}>
                      <span>Voiceover Track (Ducking active -14dB)</span>
                    </div>
                  </div>
                </div>

                {/* A2 Track: Sound Design FX */}
                <div className="flex items-center gap-2">
                  <div className="w-[120px] shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded text-[11px] font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">A2 SFX Impact</span>
                    <button 
                      onClick={() => toggleTrackMute('a2')}
                      className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                      {mutedTracks['a2'] ? <VolumeX className="w-3 h-3 text-red-500" /> : <Volume2 className="w-3 h-3 text-emerald-500" />}
                    </button>
                  </div>
                  <div className="flex-1 h-8 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 flex gap-2 relative overflow-hidden">
                    <div className={`h-full w-[12%] ml-[27%] rounded px-1 flex items-center text-[9px] font-mono text-white ${mutedTracks['a2'] ? 'opacity-20' : 'bg-teal-700/80'}`}>
                      <span>Whoosh</span>
                    </div>
                    <div className={`h-full w-[10%] ml-[15%] rounded px-1 flex items-center text-[9px] font-mono text-white ${mutedTracks['a2'] ? 'opacity-20' : 'bg-teal-700/80'}`}>
                      <span>Sub Drop</span>
                    </div>
                    <div className={`h-full w-[15%] ml-[10%] rounded px-1 flex items-center text-[9px] font-mono text-white ${mutedTracks['a2'] ? 'opacity-20' : 'bg-teal-700/80'}`}>
                      <span>Riser</span>
                    </div>
                  </div>
                </div>

                {/* A3 Track: Music Bed */}
                <div className="flex items-center gap-2">
                  <div className="w-[120px] shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded text-[11px] font-mono">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">A3 Music Bed</span>
                    <button 
                      onClick={() => toggleTrackMute('a3')}
                      className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                      {mutedTracks['a3'] ? <VolumeX className="w-3 h-3 text-red-500" /> : <Volume2 className="w-3 h-3 text-emerald-500" />}
                    </button>
                  </div>
                  <div className="flex-1 h-8 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 flex gap-1 relative overflow-hidden">
                    <div className={`h-full w-full rounded px-2 flex items-center text-[10px] font-mono text-white ${mutedTracks['a3'] ? 'opacity-20' : 'bg-emerald-800/80'}`}>
                      <span>Cinematic Ambient Electronic Master (Mastered -14 LUFS)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Feature 2: Interactive Before & After Color Grading Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>Lumetri Color Science</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
              From Flat Log Capture to Film-Grade Delivery.
            </h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Drag the interactive split handle to compare original flat unedited sensor footage against Muawiya’s custom 3D LUT curve and Lumetri skin-tone isolation in Premiere Pro.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs py-2 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Color Pipeline</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-white">Sony S-Log3 → Kodak 2383 Emulation</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Dynamic Range</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-white">Expanded 14+ Stops Balanced Highlights</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Delivery Space</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-white">Rec.709 &amp; DCI-P3 Commercial Broadcast</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setSliderPosition(20)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              >
                Inspect Raw Flat Log
              </button>
              <button
                onClick={() => setSliderPosition(85)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Inspect Final Grade
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-300 dark:border-zinc-800 shadow-2xl bg-zinc-950 aspect-video select-none group">
              {/* After: Graded Frame (Full Width Image) */}
              <img
                src="/src/assets/images/brand_commercial_preview_1791826770369.jpg"
                alt="Muawiya Final Premiere Pro Lumetri Color Grade"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded bg-black/75 backdrop-blur-sm text-[11px] font-mono text-amber-300 border border-amber-500/30">
                FINAL GRADE (PREMIERE PRO)
              </div>

              {/* Before: Raw Flat Footage Simulation (Clipped with width) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="/src/assets/images/brand_commercial_preview_1791826770369.jpg"
                  alt="Raw Camera Capture"
                  referrerPolicy="no-referrer"
                  className="absolute inset-y-0 left-0 max-w-none w-full h-full object-cover filter contrast-75 brightness-110 saturate-50 sepia-10"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/75 backdrop-blur-sm text-[11px] font-mono text-zinc-300 border border-white/20">
                  RAW LOG CAPTURE (BEFORE)
                </div>
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10 shadow-2xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-zinc-900 shadow-xl flex items-center justify-center font-bold text-xs border border-zinc-300">
                  ↔
                </div>
              </div>

              {/* Hidden Range Input for full touch & drag accessibility */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Color grade comparison slider"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>
            
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-3 font-mono">
              Drag slider left / right to compare Raw sensor data against graded commercial frame
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
