import { useMemo } from 'react';
import { useTheme } from '@mui/material';

export const useThemeMode = () => {
  const theme = useTheme();
  const isDarkMode = useMemo(
    () => theme.palette.mode === 'dark',
    [theme.palette.mode],
  );
  return { isDarkMode, theme };
};
