import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Stack, 
  Chip, 
  Divider,
  Grid,
  Link
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code2, Rocket, ShieldAlert } from 'lucide-react';
import { mockProjects } from '@/data/projects';
import { useThemeMode } from '@/hooks/useThemeMode';
import SEO from '@/components/SEO';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeMode();

  const project = mockProjects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    // Navigate home first
    navigate('/');
    
    // Wait for DOM to render and scroll
    setTimeout(() => {
      const element = document.getElementById('projects');
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 500);
  };

  if (!project) {
    return (
      <Container sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Project not found</Typography>
        <Button 
          startIcon={<ArrowLeft />} 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const seoData = {
    title: `${project.title} | Arvie Benito Portfolio`,
    description: project.description,
    ogTitle: project.title,
    ogDescription: project.description,
    ogImage: project.imageUrl,
  };

  return (
    <>
      <SEO page={seoData} />
      <Box sx={{ py: { xs: 5, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            startIcon={<ArrowLeft size={18} />} 
            onClick={handleBack}
            sx={{ 
              mb: 4, 
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            Back to Projects
          </Button>
        </motion.div>

        <Grid container spacing={6}>
          {/* Left Column: Image & Links */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box
                sx={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  boxShadow: isDarkMode ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.1)',
                  mb: 4
                }}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  style={{ width: '100%', display: 'block' }} 
                />
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ExternalLink size={18} />}
                  component={Link}
                  href={project.link || '#'}
                  target="_blank"
                  sx={{ 
                    py: 1.5, 
                    borderRadius: '12px',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px 0 rgba(156, 39, 176, 0.39)',
                    textDecoration: 'none'
                  }}
                >
                  Live Demo
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Github size={18} />}
                  component={Link}
                  href={project.github || '#'}
                  target="_blank"
                  sx={{ 
                    py: 1.5, 
                    borderRadius: '12px',
                    fontWeight: 700,
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                    color: 'text.primary',
                    textDecoration: 'none'
                  }}
                >
                  Source Code
                </Button>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right Column: Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                {project.title}
              </Typography>
              
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
                {project.tags.map((tag) => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    sx={{ 
                      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      fontWeight: 600
                    }} 
                  />
                ))}
              </Stack>

              <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                {project.fullDescription || project.description}
              </Typography>

              <Divider sx={{ my: 4, opacity: 0.5 }} />

              <Stack spacing={4}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                    <ShieldAlert size={24} color="#9c27b0" />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Key Challenges</Typography>
                  </Box>
                  <Stack spacing={1.5}>
                    {project.challenges?.map((challenge, idx) => (
                      <Box key={idx} sx={{ display: 'flex', gap: 1.5 }}>
                        <Typography color="primary" sx={{ fontWeight: 800 }}>•</Typography>
                        <Typography variant="body1" color="text.secondary">{challenge}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                    <Code2 size={24} color="#9c27b0" />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Architecture</Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {project.architecture}
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                    <Rocket size={24} color="#9c27b0" />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Technologies Used</Typography>
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1.5}>
                    {project.techStack?.map((tech) => (
                      <Box 
                        key={tech} 
                        sx={{ 
                          p: '8px 16px', 
                          borderRadius: '8px',
                          bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{tech}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProjectDetail;
