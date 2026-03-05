import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store, type RootState } from './app/store';
import { getAppTheme } from './theme/theme';
import App from './App';
// import './index.css';

import { useSelector } from 'react-redux';

const ThemeWrapper = () => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const theme = React.useMemo(() => getAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  </React.StrictMode>,
);
