import React from 'react';
import { Box, Typography, Button, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

const Hero: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <Box
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
          Building Digital <br /> Experiences
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', mb: 5, fontSize: '1.1rem' }}
        >
          Combining modern technology with stunning design to create performant
          and memorable web applications.
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
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
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
  );
};

export default Hero;
