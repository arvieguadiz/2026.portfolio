import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { getAppTheme } from '@/theme/theme';
import type { RootState } from '@/app/store';

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeMode = useSelector((state: RootState) => state.ui.themeMode);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const isDarkMode = React.useMemo(() => {
    if (themeMode === 'system') {
      return prefersDarkMode;
    }
    return themeMode === 'dark';
  }, [themeMode, prefersDarkMode]);

  const theme = React.useMemo(() => getAppTheme(isDarkMode), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
