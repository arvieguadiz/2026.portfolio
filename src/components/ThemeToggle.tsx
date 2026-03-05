import React from 'react';
import { IconButton } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/features/ui/uiSlice';
import type { RootState } from '@/app/store';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.ui.darkMode);

  return (
    <IconButton
      component={motion.button}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => dispatch(toggleTheme())}
      sx={{
        color: 'text.primary',
        p: 1.5,
        backgroundColor: isDarkMode
          ? 'rgba(255, 255, 255, 0.03)'
          : 'rgba(0, 0, 0, 0.03)',
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
        backdropFilter: 'blur(4px)',
        '&:hover': {
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.08)',
          color: 'primary.main',
        },
      }}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );
};

export default ThemeToggle;
