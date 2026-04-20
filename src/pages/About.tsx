import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import Timeline, { type TimelineDataItem } from '@/components/Timeline';
import Terminal from '@/components/Terminal';
import SkillsGrid from '@/components/SkillsGrid';
import { type Skill } from '@/components/SkillChip';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import SEO from '@/components/SEO';
import { testimonials } from '@/data/testimonials';
import { useTranslation } from 'react-i18next';
import { Briefcase, GraduationCap, Code, Award } from 'lucide-react';

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

const experienceData: TimelineDataItem[] = [
  {
    title: 'Fullstack Web Developer',
    company: 'The Penbrothers International, Inc.',
    date: '2022 - Present',
    description:
      'Developing and maintaining web applications using React, Node.js, TypeScript, Express and MySQL. Implementing responsive designs, optimizing performance, and collaborating with cross-functional teams to deliver high-quality software solutions.',
    icon: <Code size={20} />,
  },
  {
    title: 'Junior Programmer',
    company: 'New Media Services',
    date: '2019 - 2021',
    description:
      'Contributed to the development of web applications and internal tools using React, Node.js, and MySQL. Collaborated on responsive designs and optimized performance across multiple projects.',
    icon: <Briefcase size={20} />,
  },
  {
    title: 'Bachelor of Science in Information Technology',
    company: 'Pangasinan State University - Urdaneta City Campus',
    date: '2014 - 2018',
    description:
      'Graduated with a degree in Information Technology, gaining a strong foundation in programming, database management, and software development principles.',
    icon: <GraduationCap size={20} />,
  },
];

const trainingData: TimelineDataItem[] = [
  {
    title: 'AI Training (SPEC Framework)',
    company: 'The Penbrothers International, Inc.',
    date: 'Mar 2026',
    description:
      'Mastered the SPEC (Specify, Plan, Execute, Check) framework for advanced prompt engineering and AI communication.',
    icon: <Award size={20} />,
  },
  {
    title: 'Gen AI Hackathon',
    company: 'The Penbrothers International, Inc.',
    date: 'Nov 2025',
    description:
      'Participated in an intensive hackathon focused on building innovative solutions using Generative AI technologies.',
    icon: <Award size={20} />,
  },
  {
    title: 'Thinking Machines: AI Enablement for Professionals',
    company: 'The Penbrothers International, Inc.',
    date: 'Nov 2025',
    description:
      'Completed professional enablement training on integrating AI tools and workflows into specialized development environments.',
    icon: <Award size={20} />,
  },
  {
    title: 'AI Assistant Workshop with Cline AI',
    company: 'The Penbrothers International, Inc.',
    date: 'Sep 2025',
    description:
      'Hands-on workshop exploring the capabilities of AI assistants in streamlining coding, documentation, and system architecture tasks.',
    icon: <Award size={20} />,
  },
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const seoData = {
    title: 'About Arvie Benito | Fullstack MERN Developer',
    description:
      'Learn about Arvie Benito, a Fullstack MERN developer with expertise in building scalable web applications. Discover technical skills, experience, and education.',
    ogTitle: 'About Arvie Benito - Fullstack Developer Portfolio',
    ogDescription:
      'Explore the background, skills, and experience of Arvie Benito, a Fullstack MERN developer specializing in modern web technologies.',
    ogImage: 'https://arviebenito.com/public/vite.svg',
  };

  return (
    <>
      <SEO page={seoData} />
      <Box id="about" sx={{ py: 10 }}>
        <SectionHeading subtitle={t('about.subtitle')}>
          {t('about.title')}
        </SectionHeading>

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <GlassCard delay={0.1}>
              <Typography
                component="h3"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 3 }}
              >
                The Journey
              </Typography>
              <Typography
                variant="body1"
                paragraph
                color="text.secondary"
                sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
              >
                {t('about.description')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
              >
                From designing robust server-side architectures and RESTful APIs
                to crafting interactive, responsive front-end interfaces, I
                enjoy being involved in every step of the development lifecycle.
              </Typography>
            </GlassCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <GlassCard delay={0.2}>
              <Typography
                component="h3"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Tech Stack
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 3 }}
              >
                Hover over a skill to see proficiency & related project
              </Typography>
              <SkillsGrid skills={skills} />
            </GlassCard>
          </Grid>

          {/* Timeline Section - Experience */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <GlassCard delay={0.3}>
              <Typography
                component="h3"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 4 }}
              >
                Experience & Education
              </Typography>
              <Timeline items={experienceData} />
            </GlassCard>
          </Grid>

          {/* Timeline Section - Training */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <GlassCard delay={0.4}>
              <Typography
                component="h3"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 4 }}
              >
                Certifications & AI Training
              </Typography>
              <Timeline items={trainingData} />
            </GlassCard>
          </Grid>

          {/* Testimonials Carousel */}
          <Grid size={{ xs: 12 }}>
            <GlassCard delay={0.5}>
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
