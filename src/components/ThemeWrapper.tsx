import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getAppTheme } from '@/theme/theme';
import type { RootState } from '@/app/store';

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const theme = React.useMemo(() => getAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
