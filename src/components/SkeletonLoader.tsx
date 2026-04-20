import React from 'react';
import { Box, Skeleton, Container, Grid } from '@mui/material';
import { useThemeMode } from '@/hooks/useThemeMode';

interface SkeletonLoaderProps {
  type?: 'page' | 'projects' | 'hero';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'page' }) => {
  const { isDarkMode } = useThemeMode();

  const skeletonColor = isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.05)';

  if (type === 'projects') {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.02)'
                    : 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={240}
                  sx={{ borderRadius: 3, mb: 3, bgcolor: skeletonColor }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={32}
                  sx={{ mb: 1, bgcolor: skeletonColor }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ mb: 3, bgcolor: skeletonColor }}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={40}
                    sx={{ borderRadius: 2, bgcolor: skeletonColor }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={40}
                    sx={{ borderRadius: 2, bgcolor: skeletonColor }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 15,
      }}
    >
      <Container maxWidth="lg">
        <Skeleton
          variant="text"
          width="40%"
          height={60}
          sx={{ mb: 2, mx: 'auto', bgcolor: skeletonColor }}
        />
        <Skeleton
          variant="text"
          width="70%"
          height={30}
          sx={{ mb: 8, mx: 'auto', bgcolor: skeletonColor }}
        />
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 4 }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: 4, bgcolor: skeletonColor }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SkeletonLoader;
