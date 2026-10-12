import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveTimelineLab } from './components/InteractiveTimelineLab';
import { VideoReviewPortal } from './components/VideoReviewPortal';
import { HireSection } from './components/HireSection';
import { AboutMuawiya } from './components/AboutMuawiya';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { AdminPortal } from './components/AdminPortal';
import { ADMIN_EMAIL, ADMIN_NAME } from './types';

function MainLayout() {
  const { user, setSelectedProjectId } = useApp();
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  const isAdmin = user.role === 'admin' && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleExploreReviews = () => {
    setActiveSection('reviews');
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreHire = () => {
    setActiveSection('hire');
    const el = document.getElementById('hire');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProjectForReview = (projectId: string) => {
    setSelectedProjectId(projectId);
    handleExploreReviews();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#080a0e] text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-violet-500 selection:text-white font-sans">
      
      {/* Navigation Top Bar */}
      <Navbar
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Split Hero Section */}
        <Hero
          onExploreReviews={handleExploreReviews}
          onExploreHire={handleExploreHire}
        />

        {/* Video Preview & Feedback Comments Portal */}
        <VideoReviewPortal />

        {/* Transparent Pricing & Hire Section ($10 - $1,000) */}
        <HireSection />

        {/* Attracting Timeline Lab & Color Grading Inspector */}
        <InteractiveTimelineLab />

        {/* About Muawiya (1 Year Experience · Adobe Premiere Pro) */}
        <AboutMuawiya />
      </main>

      {/* Footer */}
      <Footer
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        isAdmin={isAdmin}
      />

      {/* Password-Protected Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Dedicated Admin Portal (Upload Previews, Manage Reviews, Hire Requests) */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        onSelectProjectForReview={handleSelectProjectForReview}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
