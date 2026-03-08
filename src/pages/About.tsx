import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import Timeline from '@/components/Timeline';
import Terminal from '@/components/Terminal';
import SkillChip, { type Skill } from '@/components/SkillChip';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import SEO from '@/components/SEO';
import { testimonials } from '@/data/testimonials';

const skills: Skill[] = [
  {
    name: 'React',
    level: 92,
    category: 'Frontend',
    description: 'Advanced hooks, context, and component architecture.',
    relatedProject: 'E-Commerce Platform',
  },
  {
    name: 'Node.js',
    level: 88,
    category: 'Backend',
    description: 'REST APIs, middleware, and async event-driven patterns.',
    relatedProject: 'Real-time Chat App',
  },
  {
    name: 'Express.js',
    level: 85,
    category: 'Backend',
    description: 'Router design, auth middleware, and error handling.',
    relatedProject: 'Project Dashboard',
  },
  {
    name: 'MongoDB',
    level: 80,
    category: 'Database',
    description: 'Schema design, aggregation pipelines, and Mongoose ODM.',
    relatedProject: 'E-Commerce Platform',
  },
  {
    name: 'TypeScript',
    level: 82,
    category: 'Language',
    description:
      'Strict typing, generics, and utility types across full stack.',
    relatedProject: 'Project Dashboard',
  },
  {
    name: 'Redux Toolkit',
    level: 78,
    category: 'State Mgmt',
    description: 'Slices, RTK Query, and async thunks for complex state.',
    relatedProject: 'E-Commerce Platform',
  },
  {
    name: 'Material UI',
    level: 85,
    category: 'UI Library',
    description: 'Theming, custom components, and sx prop system.',
    relatedProject: 'Portfolio',
  },
  {
    name: 'REST APIs',
    level: 90,
    category: 'Architecture',
    description: 'Designing and consuming RESTful services at scale.',
    relatedProject: 'Real-time Chat App',
  },
];

const About: React.FC = () => {
  const seoData = {
    title: 'About Arvie Benito | Fullstack MERN Developer',
    description: 'Learn about Arvie Benito, a Fullstack MERN developer with expertise in building scalable web applications. Discover technical skills, experience, and education.',
    ogTitle: 'About Arvie Benito - Fullstack Developer Portfolio',
    ogDescription: 'Explore the background, skills, and experience of Arvie Benito, a Fullstack MERN developer specializing in modern web technologies.',
    ogImage: 'https://arviebenito.com/public/vite.svg',
  };

  return (
    <>
      <SEO page={seoData} />
      <Box id="about" sx={{ py: 10 }}>
        <SectionHeading subtitle="A quick overview of who I am and what I do.">
          About Me
        </SectionHeading>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <GlassCard delay={0.1}>
              <Typography component="h3" variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
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
            <GlassCard delay={0.2}>
              <Typography component="h3" variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Tech Stack
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 2 }}
              >
                Hover over a skill to see proficiency & related project
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1.5}
                sx={{ mt: 1, overflow: 'visible' }}
              >
                {skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </Stack>
            </GlassCard>
          </Grid>

          {/* Timeline Section */}
          <Grid size={{ xs: 12 }}>
            <GlassCard delay={0.3}>
              <Typography
                component="h3"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 4 }}
              >
                Experience & Education
              </Typography>
              <Timeline />
            </GlassCard>
          </Grid>

          {/* Testimonials Carousel */}
          <Grid size={{ xs: 12 }}>
            <GlassCard delay={0.4}>
              <Typography
                component="h3"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 4 }}
              >
                Recommendations
              </Typography>
              <TestimonialsCarousel testimonials={testimonials} />
            </GlassCard>
          </Grid>

          {/* Interactive Terminal */}
          <Grid size={{ xs: 12 }}>
            <Terminal />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default About;