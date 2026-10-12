import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_EMAIL, ADMIN_NAME, CommentType, ReviewStatus, VideoProject } from '../types';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  Clock, 
  MessageSquare, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Trash2, 
  KeyRound, 
  Sparkles, 
  ChevronRight,
  Filter,
  CheckCheck
} from 'lucide-react';

export const VideoReviewPortal: React.FC = () => {
  const { 
    projects, 
    selectedProjectId, 
    setSelectedProjectId, 
    activeProject, 
    user, 
    addComment, 
    toggleCommentResolved, 
    deleteComment,
    updateProjectStatus 
  } = useApp();

  const isAdmin = user.role === 'admin' && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Video player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [aspectGuide, setAspectGuide] = useState<'normal' | 'vertical_guide'>('normal');

  // Comment input state
  const [commentText, setCommentText] = useState('');
  const [commentType, setCommentType] = useState<CommentType>('pacing');
  const [authorNameInput, setAuthorNameInput] = useState(user.name || '');
  const [filterType, setFilterType] = useState<'all' | 'unresolved' | 'resolved'>('all');

  // Passcode filter search
  const [searchQuery, setSearchQuery] = useState('');

  // Sync author name with user change
  useEffect(() => {
    if (user.role === 'admin') {
      setAuthorNameInput(`${ADMIN_NAME} (Editor)`);
    } else if (user.name) {
      setAuthorNameInput(user.name);
    }
  }, [user]);

  // Video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 15);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    seekTo(targetTime);
  };

  const jumpSeconds = (delta: number) => {
    if (videoRef.current) {
      const nextTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
      seekTo(nextTime);
    }
  };

  const changeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Add feedback comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeProject) return;

    const roundSec = Math.floor(currentTime);
    addComment(activeProject.id, {
      timestampSeconds: roundSec,
      timestampFormatted: formatSeconds(roundSec),
      authorName: authorNameInput.trim() || (isAdmin ? `${ADMIN_NAME} (Editor)` : 'Reviewer'),
      authorRole: isAdmin ? 'admin' : 'client',
      authorEmail: user.email || undefined,
      message: commentText.trim(),
      type: commentType
    });

    setCommentText('');
  };

  const filteredProjects = projects.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.clientName.toLowerCase().includes(q) ||
      p.passcode.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const activeComments = activeProject?.comments || [];
  const displayComments = activeComments.filter(c => {
    if (filterType === 'unresolved') return !c.resolved;
    if (filterType === 'resolved') return c.resolved;
    return true;
  });

  return (
    <section id="reviews" className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              <span>Interactive Review Platform</span>
              <span aria-hidden="true">·</span>
              <span>Client Revisions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Video Preview &amp; Timestamped Client Feedback.
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Play active cuts, scrub by second, and pinpoint exact revision frames. Every comment syncs with the video player timeline.
            </p>
          </div>

          {/* Project Switcher Dropdown & Passcode Finder */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search or enter Passcode..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-56 sm:w-64 px-3 py-2 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Project Selector Chips (Clean unboxed buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {filteredProjects.map(proj => {
            const isSelected = proj.id === activeProject?.id;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200/80 dark:border-zinc-800'
                }`}
              >
                <span>{proj.title}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}>
                  {proj.passcode}
                </span>
              </button>
            );
          })}
        </div>

        {activeProject ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8 cols): Video Player & Project Metadata */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              
              {/* The Video Player Container */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-300 dark:border-zinc-800 shadow-2xl group">
                <video
                  ref={videoRef}
                  src={activeProject.videoUrl}
                  poster={activeProject.posterUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="w-full aspect-video object-contain bg-black cursor-pointer"
                  playsInline
                />

                {/* 9:16 Vertical Crop Guide Overlay (when toggled) */}
                {aspectGuide === 'vertical_guide' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="h-full aspect-[9/16] border-2 border-dashed border-amber-400/80 bg-amber-400/10 flex flex-col justify-between p-2">
                      <span className="text-[10px] font-mono font-bold bg-amber-400 text-black px-1 py-0.5 self-start rounded">
                        9:16 Reels Frame
                      </span>
                      <span className="text-[10px] font-mono text-amber-300 text-center">
                        Safe Action Title Zone
                      </span>
                      <span className="text-[10px] font-mono bg-amber-400 text-black px-1 py-0.5 self-end rounded">
                        Safe Caption Area
                      </span>
                    </div>
                  </div>
                )}

                {/* Big Center Play Button when paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* Bottom Video Controls Overlay */}
                <div className="p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                  
                  {/* Scrubber Bar with Comment Marker Dots */}
                  <div className="relative w-full h-4 flex items-center mb-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 15}
                      step="0.1"
                      value={currentTime}
                      onChange={handleScrubberChange}
                      aria-label="Video scrubber"
                      className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500 z-10"
                    />

                    {/* Comment Markers on Scrubber */}
                    {activeComments.map(c => {
                      const percent = duration > 0 ? (c.timestampSeconds / duration) * 100 : 0;
                      return (
                        <button
                          key={c.id}
                          onClick={() => seekTo(c.timestampSeconds)}
                          title={`${c.timestampFormatted} - ${c.authorName}: ${c.message}`}
                          className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-20 transform -translate-x-1/2 hover:scale-150 transition-transform ${
                            c.resolved ? 'bg-emerald-400' : 'bg-amber-400 ring-2 ring-black'
                          }`}
                          style={{ left: `${percent}%` }}
                        />
                      );
                    })}
                  </div>

                  {/* Transport Bar Controls */}
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-1 rounded hover:text-violet-400 transition-colors"
                        title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => jumpSeconds(-5)}
                        className="hover:text-zinc-300 font-mono text-[11px]"
                        title="Rewind 5s"
                      >
                        -5s
                      </button>
                      <button
                        onClick={() => jumpSeconds(5)}
                        className="hover:text-zinc-300 font-mono text-[11px]"
                        title="Forward 5s"
                      >
                        +5s
                      </button>

                      {/* Time display */}
                      <span className="font-mono text-zinc-300 tabular-nums ml-2">
                        {formatSeconds(currentTime)} / {formatSeconds(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* 9:16 Frame Preview Guide Toggle */}
                      <button
                        onClick={() => setAspectGuide(prev => prev === 'normal' ? 'vertical_guide' : 'normal')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                          aspectGuide === 'vertical_guide'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'text-zinc-400 border-zinc-700 hover:text-white'
                        }`}
                        title="Toggle vertical reels frame guide"
                      >
                        9:16 Guide
                      </button>

                      {/* Speed switcher */}
                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        {[0.75, 1, 1.25, 1.5].map(rate => (
                          <button
                            key={rate}
                            onClick={() => changeRate(rate)}
                            className={`px-1.5 py-0.5 rounded ${
                              playbackRate === rate ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>

                      {/* Mute button */}
                      <button
                        onClick={toggleMute}
                        className="p-1 rounded hover:text-violet-400 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Project Meta Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#14171d] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                      <span>{activeProject.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Client: {activeProject.clientName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-violet-600 dark:text-violet-400 font-semibold">{activeProject.version}</span>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {activeProject.title}
                    </h3>
                  </div>

                  {/* Status Indicator & Client Approval Control */}
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activeProject.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : activeProject.status === 'Changes Requested'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                    }`}>
                      {activeProject.status}
                    </span>

                    {/* Quick status change buttons */}
                    <div className="flex items-center gap-1.5 ml-2">
                      <button
                        onClick={() => updateProjectStatus(activeProject.id, 'Approved')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                          activeProject.status === 'Approved'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-500 hover:text-white'
                        }`}
                        title="Approve this cut"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Cut</span>
                      </button>

                      <button
                        onClick={() => updateProjectStatus(activeProject.id, 'Changes Requested')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                          activeProject.status === 'Changes Requested'
                            ? 'bg-amber-600 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-amber-500 hover:text-white'
                        }`}
                        title="Request Revisions"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Request Changes</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Premiere Pro Technical Notes from Muawiya */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                      Editing Platform &amp; Specs
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {activeProject.editingDetails.platform} · {activeProject.editingDetails.framerate} · Rec.709
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                      Color: {activeProject.editingDetails.colorGrade}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                      Editor Notes ({ADMIN_NAME})
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {activeProject.editingDetails.notes}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column (4 cols): Feedback Comments Feature */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              
              <div className="p-5 rounded-2xl bg-white dark:bg-[#14171d] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col h-[640px]">
                
                {/* Comments Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-violet-500" />
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      Feedback &amp; Notes ({activeComments.length})
                    </h3>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-[11px]">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-2 py-0.5 rounded font-medium ${filterType === 'all' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs' : 'text-zinc-500'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterType('unresolved')}
                      className={`px-2 py-0.5 rounded font-medium ${filterType === 'unresolved' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs' : 'text-zinc-500'}`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => setFilterType('resolved')}
                      className={`px-2 py-0.5 rounded font-medium ${filterType === 'resolved' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs' : 'text-zinc-500'}`}
                    >
                      Done
                    </button>
                  </div>
                </div>

                {/* Comments Scrollable Stream */}
                <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
                  {displayComments.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                      <MessageSquare className="w-8 h-8 stroke-1 mb-2 text-zinc-300 dark:text-zinc-600" />
                      <p className="text-xs font-medium">No feedback comments in this view.</p>
                      <p className="text-[11px] mt-1">Play the video and write your notes below to pinpoint revisions!</p>
                    </div>
                  ) : (
                    displayComments.map(comment => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-xl border text-xs transition-all ${
                          comment.resolved
                            ? 'bg-zinc-50/60 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800/60 opacity-70'
                            : 'bg-zinc-50 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {/* Clickable timestamp pill that jumps player to this frame */}
                            <button
                              onClick={() => seekTo(comment.timestampSeconds)}
                              className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors"
                              title="Jump video to this timestamp"
                            >
                              ▶ {comment.timestampFormatted}
                            </button>

                            <span className="font-semibold text-zinc-900 dark:text-white">
                              {comment.authorName}
                            </span>
                            
                            {comment.authorRole === 'admin' && (
                              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                                (Admin)
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleCommentResolved(activeProject.id, comment.id)}
                              className={`p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${
                                comment.resolved ? 'text-emerald-500' : 'text-zinc-400 hover:text-emerald-500'
                              }`}
                              title={comment.resolved ? 'Mark Unresolved' : 'Mark as Resolved'}
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                            </button>

                            {isAdmin && (
                              <button
                                onClick={() => deleteComment(activeProject.id, comment.id)}
                                className="p-1 rounded text-zinc-400 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                                title="Delete comment (Admin only)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed pl-1">
                          {comment.message}
                        </p>

                        <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                          <span className="capitalize">{comment.type} note</span>
                          <span>{comment.createdAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      Timestamp: <strong className="text-violet-600 dark:text-violet-400 font-mono">{formatSeconds(currentTime)}</strong>
                    </span>
                    
                    {/* Category Selector */}
                    <select
                      value={commentType}
                      onChange={e => setCommentType(e.target.value as CommentType)}
                      className="text-[11px] px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none"
                    >
                      <option value="pacing">Pacing &amp; Cut</option>
                      <option value="audio">Sound &amp; Audio</option>
                      <option value="color">Lumetri Color</option>
                      <option value="graphics">Text &amp; Graphics</option>
                      <option value="general">General Note</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Leave feedback at ${formatSeconds(currentTime)}...`}
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">No project selected. Select a project above or use your private passcode.</p>
          </div>
        )}

      </div>
    </section>
  );
};
