import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode, type ThemeMode } from '@/features/ui/uiSlice';
import type { RootState } from '@/app/store';
import { useThemeMode } from '@/hooks/useThemeMode';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.ui.themeMode);
  const { isDarkMode } = useThemeMode();

  const handleToggle = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    dispatch(setThemeMode(modes[nextIndex]));
  };

  const getIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun size={20} />;
      case 'dark':
        return < Moon size={20} />;
      case 'system':
        return <Monitor size={20} />;
    }
  };

  const getLabel = () => {
    switch (themeMode) {
      case 'light':
        return 'Light Mode (Click for Dark)';
      case 'dark':
        return 'Dark Mode (Click for System)';
      case 'system':
        return 'System Mode (Click for Light)';
    }
  };

  return (
    <Tooltip title={getLabel()}>
      <IconButton
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        aria-label={getLabel()}
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={themeMode}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex' }}
          >
            {getIcon()}
          </motion.div>
        </AnimatePresence>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
