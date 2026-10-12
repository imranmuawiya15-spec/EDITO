import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ADMIN_EMAIL, 
  ADMIN_NAME, 
  ADMIN_EXPERIENCE, 
  ADMIN_PLATFORM, 
  ProjectCategory, 
  ReviewStatus, 
  HireRequestStatus 
} from '../types';
import { 
  ShieldCheck, 
  Upload, 
  Inbox, 
  FolderKanban, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Mail, 
  CheckCircle2, 
  Clock, 
  FileVideo, 
  Film, 
  X,
  Lock,
  MessageSquare
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectForReview: (id: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onSelectProjectForReview
}) => {
  const { 
    user, 
    projects, 
    addProject, 
    deleteProject, 
    updateProjectStatus, 
    hireRequests, 
    updateHireStatus, 
    deleteHireRequest 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upload' | 'hires' | 'projects'>('hires');

  // Upload Preview Form state
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Brand Collaboration');
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [posterUrl, setPosterUrl] = useState('/src/assets/images/brand_commercial_preview_1791826770369.jpg');
  const [version, setVersion] = useState('v1.0 First Cut');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [colorGrade, setColorGrade] = useState('Premiere Pro Lumetri Rec.709 3D LUT');
  const [notes, setNotes] = useState('Initial timeline assembly with synchronized dialogue and audio bed.');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  // Strict Security Check: ONLY imranmuawiya15@gmail.com
  const isAuthorizedAdmin = 
    user.role === 'admin' && 
    user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!isAuthorizedAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-md bg-white dark:bg-[#12151c] border border-red-500/30 rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
            Restricted Admin Console
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            Only <strong className="font-mono text-zinc-900 dark:text-zinc-200">{ADMIN_EMAIL}</strong> has administrator authority on Muawiya Studios. Unauthorized users cannot upload previews or view client hire inquiries.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Return to Studio
          </button>
        </div>
      </div>
    );
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !clientName.trim()) return;

    const newProject = addProject({
      title: title.trim(),
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim() || 'client@preview.com',
      passcode: passcode.trim().toUpperCase() || `REV-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      videoUrl: videoUrl.trim(),
      posterUrl: posterUrl.trim(),
      version: version.trim() || 'v1.0 Review Cut',
      aspectRatio,
      duration: '00:15',
      durationSeconds: 15,
      editingDetails: {
        platform: ADMIN_PLATFORM,
        colorGrade: colorGrade.trim(),
        framerate: '29.970 fps',
        notes: notes.trim()
      },
      status: 'In Review'
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      onSelectProjectForReview(newProject.id);
      onClose();
    }, 1200);
  };

  const handlePrefillFromHire = (hire: any) => {
    setTitle(`${hire.clientName} - ${hire.projectType}`);
    setClientName(hire.clientName);
    setClientEmail(hire.clientEmail);
    setPasscode(`REV-${Math.floor(1000 + Math.random() * 9000)}`);
    setCategory(
      hire.projectType.includes('Brand') ? 'Brand Collaboration' :
      hire.projectType.includes('Other') ? 'Edit Other Videos' :
      hire.projectType.includes('Creator') ? 'YouTube & Creator' : 'Social Reels & Shorts'
    );
    setActiveTab('upload');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-5xl bg-white dark:bg-[#11141a] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Admin Header */}
        <div className="px-6 py-4 bg-zinc-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Muawiya Admin Control Center
                </h3>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Verified Administrator
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                {ADMIN_EMAIL} · {ADMIN_EXPERIENCE} · {ADMIN_PLATFORM}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Admin Portal"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('hires')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'hires'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            <Inbox className="w-3.5 h-3.5 text-blue-500" />
            <span>Client Hire Requests ({hireRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-violet-500" />
            <span>Upload Preview Project</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-emerald-500" />
            <span>Manage Previews ({projects.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: CLIENT HIRE REQUESTS */}
          {activeTab === 'hires' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    Client Inquiries &amp; Hire Submissions
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Requests submitted from the Hire Section appear here with budget details, footage links, and deadlines.
                  </p>
                </div>
              </div>

              {hireRequests.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No hire requests currently in the inbox.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {hireRequests.map(req => (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#161a22] border border-zinc-200 dark:border-zinc-800 space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-bold flex items-center justify-center text-xs">
                            {req.clientName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-zinc-900 dark:text-white block">
                              {req.clientName}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                              {req.clientEmail}
                            </span>
                          </div>
                        </div>

                        {/* Budget & Status Badges */}
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            ${req.budget}
                          </span>

                          <select
                            value={req.status}
                            onChange={e => updateHireStatus(req.id, e.target.value as HireRequestStatus)}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                          >
                            <option value="New">Status: New</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="In Progress">Status: In Progress</option>
                            <option value="Completed">Status: Completed</option>
                          </select>
                        </div>
                      </div>

                      {/* Request Specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-white/60 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                        <div>
                          <span className="text-zinc-400 block">TYPE:</span>
                          <span className="text-zinc-800 dark:text-zinc-200 font-sans font-semibold">{req.projectType}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block">TURNAROUND:</span>
                          <span className="text-zinc-800 dark:text-zinc-200">{req.turnaround}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block">ASPECT:</span>
                          <span className="text-zinc-800 dark:text-zinc-200">{req.aspectRatioPreference}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block">SUBMITTED:</span>
                          <span className="text-zinc-800 dark:text-zinc-200">{req.submittedAt}</span>
                        </div>
                      </div>

                      {/* Client Brief */}
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-white/40 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-200/40 dark:border-zinc-800/40">
                        <strong className="text-zinc-900 dark:text-white">Brief:</strong> {req.details}
                      </p>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <a
                          href={req.footageLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Footage Link ({req.footageLink.slice(0, 32)}...)</span>
                        </a>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${req.clientEmail}?subject=Regarding Your Video Project - Muawiya Studios&body=Hi ${encodeURIComponent(req.clientName)},%0D%0A%0D%0AThank you for reaching out regarding your ${encodeURIComponent(req.projectType)} project ($${req.budget}). I reviewed your footage and would love to discuss the timeline.%0D%0A%0D%0ABest,%0D%0AMuawiya (Premiere Pro Editor)`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply via Email</span>
                          </a>

                          <button
                            onClick={() => handlePrefillFromHire(req)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Create Preview For Client</span>
                          </button>

                          <button
                            onClick={() => deleteHireRequest(req.id)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                            title="Delete request"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: UPLOAD VIDEO PREVIEW */}
          {activeTab === 'upload' && (
            <form onSubmit={handleUploadSubmit} className="space-y-4 max-w-2xl mx-auto">
              <div className="pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                  Publish New Video Preview for Client Review
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Clients can watch the cut, scrub timeline, and leave frame-by-frame comments using their private passcode.
                </p>
              </div>

              {uploadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Preview published successfully! Redirecting to review workspace...</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Velocity Energy Drink - Commercial Cut"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Client Name &amp; Company
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="e.g. Liam Walker (Velocity Brands)"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Client Passcode (Secret Key)
                  </label>
                  <input
                    type="text"
                    value={passcode}
                    onChange={e => setPasscode(e.target.value.toUpperCase())}
                    placeholder="e.g. VELO-1002"
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  >
                    <option value="Brand Collaboration">Brand Collaboration</option>
                    <option value="Commercial">Commercial</option>
                    <option value="YouTube & Creator">YouTube &amp; Creator</option>
                    <option value="Social Reels & Shorts">Social Reels &amp; Shorts</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Edit Other Videos">Edit Other Videos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Version Label
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={e => setVersion(e.target.value)}
                    placeholder="e.g. v1.0 Rough Cut"
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Video Preview Stream (MP4 / Web Video URL)
                </label>
                <input
                  type="url"
                  required
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono"
                />
                <div className="flex gap-2 mt-1.5">
                  <span className="text-[11px] text-zinc-500">Quick Samples:</span>
                  <button
                    type="button"
                    onClick={() => setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4')}
                    className="text-[11px] text-blue-500 hover:underline"
                  >
                    Sample Cut A
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4')}
                    className="text-[11px] text-blue-500 hover:underline"
                  >
                    Sample Cut B
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4')}
                    className="text-[11px] text-blue-500 hover:underline"
                  >
                    Sample Cut C
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Thumbnail Poster URL
                  </label>
                  <input
                    type="text"
                    value={posterUrl}
                    onChange={e => setPosterUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={e => setAspectRatio(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  >
                    <option value="16:9">16:9 Landscape (Cinema / YouTube)</option>
                    <option value="9:16">9:16 Vertical (Reels / Shorts)</option>
                    <option value="1:1">1:1 Square</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Premiere Pro Editor Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Notes for the client regarding cuts, audio sync, or color balance..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 text-xs font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload &amp; Generate Client Review Link</span>
              </button>
            </form>
          )}

          {/* TAB 3: MANAGE EXISTING PREVIEWS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    Active Preview Projects
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Manage client status approvals and review feedback notes.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {projects.map(proj => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-[#161a22] border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                        <img 
                          src={proj.posterUrl} 
                          alt={proj.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-zinc-900 dark:text-white">
                          {proj.title}
                        </h5>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                          <span>{proj.clientName}</span>
                          <span>·</span>
                          <span className="text-violet-500 font-bold">{proj.passcode}</span>
                          <span>·</span>
                          <span>{proj.comments.length} Comments</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={proj.status}
                        onChange={e => updateProjectStatus(proj.id, e.target.value as ReviewStatus)}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                      >
                        <option value="In Review">Status: In Review</option>
                        <option value="Changes Requested">Status: Changes Requested</option>
                        <option value="Approved">Status: Approved</option>
                      </select>

                      <button
                        onClick={() => {
                          onSelectProjectForReview(proj.id);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                      >
                        Open Review
                      </button>

                      {projects.length > 1 && (
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                          title="Delete preview"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
