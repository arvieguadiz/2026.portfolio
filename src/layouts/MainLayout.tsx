import React from 'react';
import { Box, Container, CssBaseline, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/app/store';
import { closeResumeSnackbar } from '@/features/ui/uiSlice';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { resumeSnackbarOpen } = useSelector((state: RootState) => state.ui);

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    dispatch(closeResumeSnackbar());
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <CssBaseline />
      <CustomCursor />
      <Navbar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          pt: { xs: 10, md: 15 },
          pb: 10,
        }}
      >
        {children}
      </Container>

      <Snackbar
        open={resumeSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          Thank you for downloading my resume! Let's build something great
          together.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainLayout;
