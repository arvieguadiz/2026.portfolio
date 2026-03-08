import React, { useMemo } from 'react';
import { Box, Typography, Button, Stack, Link, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/app/store';
import { setFilter } from '@/features/projects/projectSlice';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import FilterTabs from '@/components/FilterTabs';
import LazyImage from '@/components/LazyImage';
import SEO from '@/components/SEO';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state: RootState) => state.projects);

  const mockProjects = [
    {
      id: '1',
      title: 'Fullstack E-Commerce Platform',
      description:
        'A robust e-commerce application featuring JWT authentication, Stripe integration, and an admin dashboard.',
      imageUrl: 'https://placehold.co/400x250/000000/FFF?text=E-Commerce',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
      category: 'fullstack' as const,
      github: '#',
      link: '#',
    },
    {
      id: '2',
      title: 'Real-time Chat Application',
      description:
        'A real-time communication platform utilizing Socket.io for instant messaging, read receipts, and online presence.',
      imageUrl: 'https://placehold.co/400x250/000000/FFF?text=Chat+App',
      tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      category: 'fullstack' as const,
      github: '#',
      link: '#',
    },
    {
      id: '3',
      title: 'Project Management Dashboard',
      description:
        'A Kanban-style project management tool with drag-and-drop functionality and detailed analytics.',
      imageUrl: 'https://placehold.co/400x250/000000/FFF?text=Dashboard',
      tags: ['React', 'Express', 'MongoDB', 'Chart.js'],
      category: 'fullstack' as const,
      github: '#',
      link: '#',
    },
    {
      id: '4',
      title: 'Interactive Portfolio Website',
      description:
        'A modern, responsive portfolio website with Glassmorphism design, animations, and dark mode support.',
      imageUrl: 'https://placehold.co/400x250/000000/FFF?text=Portfolio',
      tags: ['React', 'TypeScript', 'Material UI', 'Framer Motion'],
      category: 'frontend' as const,
      github: '#',
      link: '#',
    },
    {
      id: '5',
      title: 'RESTful API Service',
      description:
        'A scalable backend API with authentication, rate limiting, and comprehensive documentation using OpenAPI.',
      imageUrl: 'https://placehold.co/400x250/000000/FFF?text=API',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
      category: 'backend' as const,
      github: '#',
      link: '#',
    },
  ];

  const projects = items.length > 0 ? items : mockProjects;

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((p) => p.category))
    );
    return ['all', ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  const handleCategoryChange = (category: string) => {
    dispatch(setFilter(category as 'all' | 'frontend' | 'fullstack' | 'backend' | 'mobile'));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const, // easeOutQuad
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const, // easeOutQuad
      },
    },
  };

  const seoData = {
    title: 'Projects | Arvie Benito - Fullstack MERN Developer',
    description: 'Explore selected projects by Arvie Benito, featuring fullstack applications, RESTful APIs, and modern web solutions built with React, Node.js, Express, and MongoDB.',
    ogTitle: 'Projects - Arvie Benito Portfolio',
    ogDescription: 'View a collection of fullstack and frontend projects showcasing expertise in MERN stack, API design, and modern web development.',
    ogImage: 'https://arviebenito.com/public/vite.svg',
  };

  return (
    <>
      <SEO page={seoData} />
      <Box id="projects" sx={{ py: 10 }}>
        <SectionHeading subtitle="A selection of my recent works and technical experiments.">
          Selected Projects
        </SectionHeading>

        <FilterTabs
          categories={categories}
          activeCategory={filter}
          onCategoryChange={handleCategoryChange}
        />

        <motion.div
          key={filter}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          style={{ width: '100%' }}
        >
          <Grid container spacing={4}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <Grid
                  size={{ xs: 12, md: 6 }}
                  key={project.id}
                >
                  <motion.div
                    variants={itemVariants}
                    layout
                    style={{ width: '100%' }}
                  >
                    <GlassCard delay={index * 0.1}>
                      <Box
                        sx={{
                          width: '100%',
                          height: '240px',
                          borderRadius: '12px',
                          mb: 3,
                          overflow: 'hidden',
                          background: isDarkMode
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        }}
                      >
                        <LazyImage
                          src={project.imageUrl}
                          alt={project.title}
                          height={240}
                          style={{ opacity: 0.8 }}
                        />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3, minHeight: '48px' }}
                      >
                        {project.description}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
                      >
                        {project.tags.map((tag) => (
                          <Typography
                            key={tag}
                            variant="caption"
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '20px',
                              bgcolor: isDarkMode
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(0, 0, 0, 0.05)',
                              border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                            }}
                          >
                            {tag}
                          </Typography>
                        ))}
                      </Stack>

                      <Stack direction="row" spacing={2}>
                        <Button
                          startIcon={<ExternalLink size={18} />}
                          variant="text"
                          color={isDarkMode ? 'secondary' : 'primary'}
                          component={Link}
                          href={project.link}
                          sx={{ fontWeight: 800 }}
                        >
                          Live Demo
                        </Button>
                        <Button
                          startIcon={<Github size={18} />}
                          variant="text"
                          color="inherit"
                          component={Link}
                          href={project.github}
                          sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
                        >
                          Code
                        </Button>
                      </Stack>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </motion.div>

        {filteredProjects.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body1" gutterBottom>
              No projects found in this category.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCategoryChange('all')}
              sx={{ mt: 2 }}
            >
              View All Projects
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Projects;