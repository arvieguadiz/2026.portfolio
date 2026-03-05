import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <Box
      component={motion.div}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      sx={{
        position: 'fixed',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: isDarkMode
          ? 'rgba(156, 39, 176, 0.3)'
          : 'rgba(156, 39, 176, 0.15)',
        border: `1px solid ${isDarkMode ? 'rgba(156, 39, 176, 0.5)' : 'rgba(156, 39, 176, 0.3)'}`,
        pointerEvents: 'none',
        zIndex: 9999,
        display: { xs: 'none', md: 'block' },
        opacity: isVisible ? 1 : 0,
        backdropFilter: 'blur(4px)',
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};

export default CustomCursor;
