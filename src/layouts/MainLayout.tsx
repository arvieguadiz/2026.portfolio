import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
    </Box>
  );
};

export default MainLayout;
