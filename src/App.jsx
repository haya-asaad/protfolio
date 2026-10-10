import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ProjectGrid from './components/sections/ProjectGrid';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import ProjectDetailModal from './components/sections/ProjectDetailModal';
import LightboxModal from './components/ui/LightboxModal';
import projectsData from './data/projects.json';

function PortfolioApp() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Lightbox state
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: '',
    category: '',
  });

  // Hash-based deep link handler for projects (e.g. #project-slug)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('project/')) {
        const slug = hash.replace('project/', '');
        const found = projectsData.find((p) => p.id === slug);
        if (found) {
          setSelectedProject(found);
          setIsDetailOpen(true);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailOpen(false);
  };

  const handleOpenLightbox = (project, startIndex = 0) => {
    const allImages = [project.coverImage, ...(project.gallery || [])];
    setLightboxState({
      isOpen: true,
      images: allImages,
      currentIndex: startIndex,
      title: project.title?.en || project.id,
      category: project.category,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] flex flex-col selection:bg-[#111111] selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero totalProjects={projectsData.length} />
        <ProjectGrid
          projects={projectsData}
          onOpenDetails={handleOpenDetails}
          onOpenLightbox={handleOpenLightbox}
        />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Slide-over / Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={handleCloseDetails}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* High-Performance Fullscreen Lightbox */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onIndexChange={(newIdx) =>
          setLightboxState((prev) => ({ ...prev, currentIndex: newIdx }))
        }
        projectTitle={lightboxState.title}
        category={lightboxState.category}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}
