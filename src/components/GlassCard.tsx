import React from 'react';
import { Paper, styled, Box } from '@mui/material';
import { motion } from 'framer-motion';

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
}

const GlassCard: React.FC<GlassCardProps> = ({ children, animate = true }) => {
  return (
    <GlassContainer
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </GlassContainer>
  );
};

export default GlassCard;
