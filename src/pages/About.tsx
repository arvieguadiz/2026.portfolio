import React from 'react';
import { Box, Typography, Chip, Stack, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';

const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'Redux Toolkit',
  'Material UI',
  'Framer Motion',
  'Vite',
  'PostgreSQL',
];

const About: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <Box id="about" sx={{ py: 10 }}>
      <SectionHeading subtitle="A quick overview of who I am and what I do.">
        About Me
      </SectionHeading>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <GlassCard>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              The Journey
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              I am a passionate software engineer focused on building immersive
              digital experiences. My approach blends technical rigor with
              creative design, ensuring every project is as beautiful as it is
              functional.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              With years of experience in the JavaScript ecosystem, I specialize
              in front-end architecture and interactive user interfaces.
            </Typography>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <GlassCard>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Tech Stack
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 2 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    bgcolor: isDarkMode
                      ? 'rgba(156, 39, 176, 0.1)'
                      : 'rgba(156, 39, 176, 0.05)',
                    border: `1px solid ${isDarkMode ? 'rgba(156, 39, 176, 0.2)' : 'rgba(156, 39, 176, 0.1)'}`,
                    color: isDarkMode ? '#fff' : '#9c27b0',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? 'rgba(156, 39, 176, 0.2)'
                        : 'rgba(156, 39, 176, 0.15)',
                    },
                  }}
                />
              ))}
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
