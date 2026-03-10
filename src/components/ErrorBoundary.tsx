import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            p: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: 'center',
              maxWidth: 500,
              backdropFilter: 'blur(12px) saturate(180%)',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(255, 255, 255, 0.7)',
              border: (theme) =>
                `1px solid ${
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)'
                }`,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'error.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <AlertTriangle size={32} color="#f44336" />
            </Box>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 700, color: 'error.main' }}
            >
              Oops! Something went wrong
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              {this.state.error?.message ||
                'An unexpected error occurred. Our team has been notified.'}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<RefreshCw size={20} />}
              onClick={this.handleReset}
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                boxShadow: '0 4px 20px rgba(156, 39, 176, 0.3)',
              }}
            >
              Try Again
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
