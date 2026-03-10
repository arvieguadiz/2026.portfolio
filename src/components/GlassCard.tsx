import React from 'react';
import { Paper, styled, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeMode } from '@/hooks/useThemeMode';

const MotionPaper = motion(Paper);

const GlassContainer = styled(MotionPaper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    border: '1px solid rgba(156, 39, 176, 0.3)',
  },
}));

interface GlassCardProps {
  children: React.ReactNode;
  animate?: boolean;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  animate = true,
  delay = 0,
}) => {
  const { isDarkMode } = useThemeMode();

  return (
    <GlassContainer
      initial={animate ? { opacity: 0, y: 30 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      sx={{
        backdropFilter: 'blur(12px) saturate(180%)',
        backgroundColor: isDarkMode
          ? 'rgba(255, 255, 255, 0.03)'
          : 'rgba(255, 255, 255, 0.7)',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
        boxShadow: isDarkMode
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
          : '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </GlassContainer>
  );
};

export default GlassCard;
