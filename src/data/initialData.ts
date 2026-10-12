import { VideoProject, HireRequest } from '../types';

export const INITIAL_PROJECTS: VideoProject[] = [
  {
    id: 'proj-1',
    title: 'Aura Luxe - Coastal Drive Commercial',
    clientName: 'Elena Vance (Aura Fragrances)',
    clientEmail: 'elena@auraluxe.com',
    passcode: 'AURA-2026',
    category: 'Brand Collaboration',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: '/src/assets/images/brand_commercial_preview_1791826770369.jpg',
    version: 'v2.1 Color & Sound Cut',
    aspectRatio: '16:9',
    duration: '00:15',
    durationSeconds: 15,
    editingDetails: {
      platform: 'Adobe Premiere Pro',
      colorGrade: 'Cinematic Kodak 2383 Film Emulation with Lumetri Scopes',
      framerate: '24.000 fps',
      notes: 'Timeline cut with synchronized bass drop on the product reveal. Audio mastered at -14 LUFS.'
    },
    status: 'In Review',
    createdAt: '2026-10-10',
    comments: [
      {
        id: 'c-101',
        timestampSeconds: 4,
        timestampFormatted: '00:04',
        authorName: 'Elena Vance',
        authorRole: 'client',
        authorEmail: 'elena@auraluxe.com',
        message: 'The speed ramp on the convertible turn is silky smooth! Could we add a subtle swoosh sound here?',
        type: 'audio',
        resolved: true,
        createdAt: '2026-10-11 14:20'
      },
      {
        id: 'c-102',
        timestampSeconds: 10,
        timestampFormatted: '00:10',
        authorName: 'Muawiya (Editor)',
        authorRole: 'admin',
        authorEmail: 'imranmuawiya15@gmail.com',
        message: 'Boosted the golden hour sunset warmth by +15 on Lumetri Color wheel for the perfume bottle glint.',
        type: 'color',
        resolved: true,
        createdAt: '2026-10-11 16:45'
      },
      {
        id: 'c-103',
        timestampSeconds: 12,
        timestampFormatted: '00:12',
        authorName: 'Elena Vance',
        authorRole: 'client',
        authorEmail: 'elena@auraluxe.com',
        message: 'Brand logo fade-out looks great. Can we hold on the bottle 0.5s longer before fade to black?',
        type: 'cut',
        resolved: false,
        createdAt: '2026-10-12 09:15'
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'Tokyo Neon Street Cypher - High Energy Edit',
    clientName: 'Marcus Chen (KINETIC Media)',
    clientEmail: 'marcus@kineticmedia.co',
    passcode: 'NEON-9901',
    category: 'YouTube & Creator',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: '/src/assets/images/urban_music_preview_1791826791080.jpg',
    version: 'v1.4 Rough Cut',
    aspectRatio: '16:9',
    duration: '00:15',
    durationSeconds: 15,
    editingDetails: {
      platform: 'Adobe Premiere Pro',
      colorGrade: 'Cyber Neon Teal & Orange Split Toning',
      framerate: '59.940 fps',
      notes: 'Dynamic multi-cam sync cut with snappy whip-pans and beat-matched jump cuts in Premiere Pro.'
    },
    status: 'Changes Requested',
    createdAt: '2026-10-09',
    comments: [
      {
        id: 'c-201',
        timestampSeconds: 3,
        timestampFormatted: '00:03',
        authorName: 'Marcus Chen',
        authorRole: 'client',
        authorEmail: 'marcus@kineticmedia.co',
        message: 'Love the beat-sync whip-pan! Let’s add a subtle RGB chromatic aberration shake on the drop.',
        type: 'graphics',
        resolved: false,
        createdAt: '2026-10-10 11:00'
      },
      {
        id: 'c-202',
        timestampSeconds: 7,
        timestampFormatted: '00:07',
        authorName: 'Muawiya (Editor)',
        authorRole: 'admin',
        authorEmail: 'imranmuawiya15@gmail.com',
        message: 'Adjusted Premiere Pro speed curve to 350% into a smooth settle on the vocal chorus.',
        type: 'pacing',
        resolved: true,
        createdAt: '2026-10-10 15:30'
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Apex Tech Gear - Ergonomic Suite Showcase',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah.j@apexstudios.net',
    passcode: 'APEX-4412',
    category: 'Commercial',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterUrl: '/src/assets/images/hero_premiere_suite_1791826750553.jpg',
    version: 'v3.0 Final Master Review',
    aspectRatio: '16:9',
    duration: '00:15',
    durationSeconds: 15,
    editingDetails: {
      platform: 'Adobe Premiere Pro',
      colorGrade: 'Clean High-Key Tech Studio Luminance (Clean whites & deep shadows)',
      framerate: '29.970 fps',
      notes: 'Final export prepared in Premiere Pro with ProRes 422 HQ proxy master.'
    },
    status: 'Approved',
    createdAt: '2026-10-08',
    comments: [
      {
        id: 'c-301',
        timestampSeconds: 5,
        timestampFormatted: '00:05',
        authorName: 'Sarah Jenkins',
        authorRole: 'client',
        authorEmail: 'sarah.j@apexstudios.net',
        message: 'This cut is perfection! Approved for YouTube & Instagram Ad run. Please generate the vertical 9:16 cut.',
        type: 'general',
        resolved: true,
        createdAt: '2026-10-11 18:00'
      }
    ]
  }
];

export const INITIAL_HIRE_REQUESTS: HireRequest[] = [
  {
    id: 'hire-001',
    clientName: 'David Reynolds',
    clientEmail: 'david@lumencollective.com',
    projectType: 'Brand Collaboration',
    budget: 450,
    turnaround: '48 Hours (Standard)',
    footageLink: 'https://drive.google.com/drive/folders/demo-lumen-brand-4k',
    aspectRatioPreference: 'Both 16:9 & 9:16',
    details: 'Looking for a clean 60-second commercial and 3x 15-second teaser reels for our autumn collection launch. Need Lumetri color grading and Premiere Pro motion titles.',
    status: 'In Progress',
    submittedAt: '2026-10-11 17:30'
  },
  {
    id: 'hire-002',
    clientName: 'Amina Tariq',
    clientEmail: 'amina.t@viralpulse.media',
    projectType: 'Social Reels & Shorts',
    budget: 85,
    turnaround: '24 Hours (Express)',
    footageLink: 'https://wetransfer.com/downloads/sample-viral-talk-pod',
    aspectRatioPreference: '9:16 Vertical',
    details: 'Need 5 viral shorts extracted from a 1-hour interview podcast. Dynamic captions, b-roll overlays, punch-in zooms, and hook retention editing.',
    status: 'New',
    submittedAt: '2026-10-12 08:45'
  },
  {
    id: 'hire-003',
    clientName: 'Liam O’Connor',
    clientEmail: 'liam@wanderlustfilms.io',
    projectType: 'Edit Other Videos',
    budget: 220,
    turnaround: '48 Hours (Standard)',
    footageLink: 'https://dropbox.com/s/travel-iceland-raw-drone',
    aspectRatioPreference: '16:9 Landscape',
    details: 'Raw drone and Sony A7SIII footage from an Iceland trip (approx 45GB). Edit into a 3-minute cinematic travel vignette with licensed soundtrack pacing.',
    status: 'Contacted',
    submittedAt: '2026-10-12 10:15'
  }
];
