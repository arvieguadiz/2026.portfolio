import React, { Suspense, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/pages/Hero';
import SectionObserver from '@/components/SectionObserver';
import ErrorBoundary from '@/components/ErrorBoundary';

// Dynamic imports for code splitting
const AboutLazy = React.lazy(() => import('@/pages/About'));
const ProjectsLazy = React.lazy(() => import('@/pages/Projects'));
const ContactLazy = React.lazy(() => import('@/pages/Contact'));
const ProjectDetailLazy = React.lazy(() => import('@/pages/ProjectDetail'));

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
                <Suspense fallback={<Loading />}>
                  <AboutLazy />
                </Suspense>
                <Suspense fallback={<Loading />}>
                  <ProjectsLazy />
                </Suspense>
                <Suspense fallback={<Loading />}>
                  <ContactLazy />
                </Suspense>
              </>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProjectDetailLazy />
              </Suspense>
            }
          />
        </Routes>
      </MainLayout>
    </ErrorBoundary>
  );
}

// Helper component for code splitting fallback state
const Loading = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'text.secondary',
      fontSize: '1.2rem',
    }}
  >
    Loading...
  </Box>
);

export default App;
