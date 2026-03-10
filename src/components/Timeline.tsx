import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code } from 'lucide-react';
import { useThemeMode } from '@/hooks/useThemeMode';

interface TimelineItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
  index: number;
}

const timelineData = [
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

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  date,
  description,
  icon,
  isLast,
  index,
}) => {
  const { isDarkMode: isDark, theme } = useThemeMode();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      sx={{ display: 'flex', position: 'relative', mb: isLast ? 0 : 4 }}
    >
      {/* Timeline Line */}
      {!isLast && (
        <Box
          sx={{
            position: 'absolute',
            top: 48,
            left: 23,
            bottom: -32,
            width: '2px',
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
        />
      )}

      {/* Icon Circle */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isDark
            ? 'rgba(156, 39, 176, 0.1)'
            : 'rgba(156, 39, 176, 0.05)',
          border: `2px solid ${isDark ? 'rgba(156, 39, 176, 0.5)' : 'rgba(156, 39, 176, 0.3)'}`,
          color: theme.palette.primary.main,
          flexShrink: 0,
          mr: 3,
          zIndex: 1,
        }}
      >
        {icon}
      </Box>

      {/* Content */}
      <Box sx={{ pt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            mt: 0.5,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {company}
          <Box
            component="span"
            sx={{ color: 'text.secondary', fontWeight: 400 }}
          >
            | {date}
          </Box>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 'Sm', lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const Timeline: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {timelineData.map((item, index) => (
        <TimelineItem
          key={index}
          index={index}
          title={item.title}
          company={item.company}
          date={item.date}
          description={item.description}
          icon={item.icon}
          isLast={index === timelineData.length - 1}
        />
      ))}
    </Box>
  );
};

export default Timeline;
