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

function parseHashRoute(hashStr) {
  const clean = (hashStr || '').replace(/^#/, '');
  if (clean.startsWith('project/')) {
    const parts = clean.split('/');
    const slug = parts[1] || '';
    const subGalleryId = parts[2] || null;
    const found = projectsData.find((p) => p.id === slug) || null;
    return { project: found, subGalleryId, sectionId: null };
  }
  return { project: null, subGalleryId: null, sectionId: clean || null };
}

function PortfolioApp() {
  const [route, setRoute] = useState(() => parseHashRoute(window.location.hash));

  // Lightbox state
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: '',
    category: '',
  });

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = parseHashRoute(window.location.hash);
      setRoute(nextRoute);

      if (!nextRoute.project && nextRoute.sectionId) {
        requestAnimationFrame(() => {
          const elem = document.getElementById(nextRoute.sectionId);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenDetails = (project) => {
    window.location.hash = `#project/${project.id}`;
  };

  const handleCloseDetails = () => {
    window.location.hash = '#works';
  };

  const handleSelectSubGalleryId = (subGalleryId) => {
    if (!route.project) return;
    if (subGalleryId) {
      window.location.hash = `#project/${route.project.id}/${subGalleryId}`;
    } else {
      window.location.hash = `#project/${route.project.id}`;
    }
  };

  const handleOpenLightbox = (
    project,
    startIndex = 0,
    customImages = null,
    customTitle = null
  ) => {
    let allImages;
    if (Array.isArray(customImages) && customImages.length > 0) {
      allImages = customImages;
    } else {
      const galleryCovers = (project.gallery || [])
        .map((item) =>
          typeof item === 'object' && item !== null
            ? item.coverImage || item.images?.[0]
            : item
        )
        .filter(Boolean);
      allImages = [project.coverImage, ...galleryCovers].filter(Boolean);
    }

    setLightboxState({
      isOpen: true,
      images: allImages,
      currentIndex: startIndex,
      title: customTitle || project.title?.en || project.id,
      category: project.category,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const currentProjectIndex = route.project
    ? projectsData.findIndex((p) => p.id === route.project.id)
    : -1;
  const prevProject =
    currentProjectIndex > 0 ? projectsData[currentProjectIndex - 1] : null;
  const nextProject =
    currentProjectIndex >= 0 && currentProjectIndex < projectsData.length - 1
      ? projectsData[currentProjectIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] flex flex-col selection:bg-[#111111] selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content: Either Full Project Page or Home Sections */}
      <main className="flex-grow">
        {route.project ? (
          <ProjectDetailModal
            project={route.project}
            subGalleryId={route.subGalleryId}
            onClose={handleCloseDetails}
            onSelectProject={handleOpenDetails}
            onSelectSubGalleryId={handleSelectSubGalleryId}
            onOpenLightbox={handleOpenLightbox}
            prevProject={prevProject}
            nextProject={nextProject}
          />
        ) : (
          <>
            <Hero totalProjects={projectsData.length} />
            <About />
            <ProjectGrid
              projects={projectsData}
              onOpenDetails={handleOpenDetails}
              onOpenLightbox={handleOpenLightbox}
            />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

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
