import React, { Suspense, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/pages/Hero';
import SectionObserver from '@/components/SectionObserver';
import ErrorBoundary from '@/components/ErrorBoundary';
import Analytics from '@/components/Analytics';
import SkeletonLoader from '@/components/SkeletonLoader';

// Helper for artificial delay in lazy loading
const lazyWithDelay = (factory: () => Promise<{ default: React.ComponentType<any> }>, delay = 300) => {
  return React.lazy(() => 
    Promise.all([
      factory(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  );
};

// Dynamic imports for code splitting with 300ms delay to showcase skeleton loading
const AboutLazy = lazyWithDelay(() => import('@/pages/About'));
const ProjectsLazy = lazyWithDelay(() => import('@/pages/Projects'));
const ContactLazy = lazyWithDelay(() => import('@/pages/Contact'));
const ProjectDetailLazy = lazyWithDelay(() => import('@/pages/ProjectDetail'));

const pageData = {
  hero: {
    title: 'Arvie Benito | Fullstack Developer',
  },
  about: {
    title: 'About Arvie Benito',
  },
  projects: {
    title: 'Projects',
  },
  contact: {
    title: 'Contact',
  },
};

function App() {
  const sections = useMemo(
    () => [
      { id: 'hero', title: pageData.hero.title },
      { id: 'about', title: pageData.about.title },
      { id: 'projects', title: pageData.projects.title },
      { id: 'contact', title: pageData.contact.title },
    ],
    [],
  );

  return (
    <ErrorBoundary>
      <Analytics />
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SectionObserver
                  sections={sections}
                  defaultTitle={pageData.hero.title}
                />
                <Hero />
                <Suspense fallback={<SkeletonLoader />}>
                  <AboutLazy />
                </Suspense>
                <Suspense fallback={<SkeletonLoader type="projects" />}>
                  <ProjectsLazy />
                </Suspense>
                <Suspense fallback={<SkeletonLoader />}>
                  <ContactLazy />
                </Suspense>
              </>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <ProjectDetailLazy />
              </Suspense>
            }
          />
        </Routes>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default App;
