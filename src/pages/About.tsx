import React from 'react';
import { Box, Typography, Chip, Stack, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';

const skills = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'TypeScript',
  'Redux Toolkit',
  'Material UI',
  'REST APIs',
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
              I am a Fullstack Web Developer specialized in the MERN stack
              (MongoDB, Express, React, Node.js). My passion lies in building
              scalable, end-to-end applications that solve real-world problems.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              From designing robust server-side architectures and RESTful APIs
              to crafting interactive, responsive front-end interfaces, I enjoy
              being involved in every step of the development lifecycle.
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
