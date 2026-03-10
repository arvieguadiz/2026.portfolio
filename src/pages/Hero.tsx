import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { MousePointer2, FileDown } from 'lucide-react';
import { useDispatch } from 'react-redux';
import SEO from '@/components/SEO';
import { downloadResume } from '@/features/ui/uiSlice';
import { useThemeMode } from '@/hooks/useThemeMode';

const Hero: React.FC = () => {
  const { isDarkMode } = useThemeMode();
  const dispatch = useDispatch();

  const handleDownloadResume = () => {
    dispatch(downloadResume());
    const link = document.createElement('a');
    link.href = '/Resume_Benito.pdf';
    link.download = 'Arvie_Benito_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const seoData = {
    title: 'Arvie Benito | Fullstack MERN Developer',
    description:
      'Fullstack web developer specializing in MongoDB, Express, React, and Node.js. Building scalable backend architectures and intuitive frontend experiences.',
    ogTitle: 'Arvie Benito - Fullstack MERN Developer Portfolio',
    ogDescription:
      'Explore the portfolio of Arvie Benito, a Fullstack MERN developer specializing in modern web applications, RESTful APIs, and responsive UI/UX.',
    ogImage: 'https://arviebenito.com/public/vite.svg',
  };

  return (
    <>
      <SEO page={seoData} />
      <Box
        id="hero"
        sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            component="p"
            variant="h6"
            color="primary"
            sx={{ fontWeight: 600, mb: 2, letterSpacing: 2 }}
          >
            HI, I'M ARVIE BENITO
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              mb: 3,
              fontWeight: 800,
              background: isDarkMode
                ? 'linear-gradient(90deg, #fff 30%, #9c27b0 90%)'
                : 'linear-gradient(90deg, #1a1a1a 30%, #9c27b0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Fullstack MERN <br /> Developer
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', mb: 5, fontSize: '1.1rem' }}
          >
            Specializing in MongoDB, Express, React, and Node.js. Defining
            modern backend architectures and intuitive frontend experiences.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FileDown size={20} />}
              onClick={handleDownloadResume}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: isDarkMode
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.2)',
                color: isDarkMode ? '#fff' : '#1a1a1a',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
                  background: isDarkMode
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  const offset = 80;
                  const elementPosition =
                    element.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top;
                  window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Let's Talk
            </Button>
          </Stack>
        </motion.div>

        <Box
          component={motion.div}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          sx={{ position: 'absolute', bottom: 40 }}
        >
          <MousePointer2 size={32} style={{ opacity: 0.5 }} />
        </Box>
      </Box>
    </>
  );
};

export default Hero;
