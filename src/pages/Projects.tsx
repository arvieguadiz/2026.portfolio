import React from 'react';
import { Box, Typography, Button, Stack, Link, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { items } = useSelector((state: RootState) => state.projects);

  const displayProjects =
    items.length > 0
      ? items
      : [
          {
            id: '1',
            title: 'Fullstack E-Commerce Platform',
            description:
              'A robust e-commerce application featuring JWT authentication, Stripe integration, and an admin dashboard.',
            imageUrl: 'https://placehold.co/400x250/000000/FFF?text=E-Commerce',
            tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
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
            github: '#',
            link: '#',
          },
        ];

  return (
    <Box id="projects" sx={{ py: 10 }}>
      <SectionHeading subtitle="A selection of my recent works and technical experiments.">
        Selected Projects
      </SectionHeading>

      <Grid container spacing={4}>
        {displayProjects.map((project, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={project.id}>
            <GlassCard delay={index * 0.15}>
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
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8,
                  }}
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
