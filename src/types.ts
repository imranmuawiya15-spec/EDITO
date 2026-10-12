export type ProjectCategory = 
  | 'Brand Collaboration'
  | 'Commercial'
  | 'YouTube & Creator'
  | 'Social Reels & Shorts'
  | 'Music Video'
  | 'Edit Other Videos';

export type ReviewStatus = 'In Review' | 'Changes Requested' | 'Approved';

export type CommentType = 'pacing' | 'color' | 'audio' | 'cut' | 'graphics' | 'general';

export interface CommentItem {
  id: string;
  timestampSeconds: number;
  timestampFormatted: string;
  authorName: string;
  authorRole: 'client' | 'admin';
  authorEmail?: string;
  message: string;
  type: CommentType;
  resolved: boolean;
  createdAt: string;
}

export interface VideoProject {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  passcode: string;
  category: ProjectCategory;
  videoUrl: string;
  posterUrl: string;
  version: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  duration: string;
  durationSeconds: number;
  editingDetails: {
    platform: string; // "Adobe Premiere Pro"
    colorGrade: string;
    framerate: string;
    notes: string;
  };
  status: ReviewStatus;
  createdAt: string;
  comments: CommentItem[];
}

export type HireProjectType = 
  | 'Brand Collaboration'
  | 'Edit Other Videos'
  | 'YouTube / Creator'
  | 'Social Reels & Shorts'
  | 'Commercial / Promo'
  | 'Full Campaign Master';

export type HireRequestStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed';

export interface HireRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: HireProjectType;
  budget: number; // $10 to $1000
  turnaround: '24 Hours (Express)' | '48 Hours (Standard)' | '3-5 Days (Flexible)';
  footageLink: string;
  aspectRatioPreference: '16:9 Landscape' | '9:16 Vertical' | 'Both 16:9 & 9:16' | '1:1 Square';
  details: string;
  status: HireRequestStatus;
  submittedAt: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  experience: string;
  primaryPlatform: string;
}

export const ADMIN_EMAIL = 'imranmuawiya15@gmail.com';
export const ADMIN_NAME = 'Muawiya';
export const ADMIN_EXPERIENCE = '1 Year Experience';
export const ADMIN_PLATFORM = 'Adobe Premiere Pro';
