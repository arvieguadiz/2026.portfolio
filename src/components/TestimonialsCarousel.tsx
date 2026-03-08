import React, { useState, useEffect, useCallback } from 'react';
import { Box, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const handlePause = useCallback(() => setIsPaused(true), []);
  const handleResume = useCallback(() => setIsPaused(false), []);

  // Auto-advance logic
  useEffect(() => {
    if (!autoPlay || isPaused || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, nextSlide, testimonials.length]);

  // Reset timer when manually navigating
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      // This ensures auto-play continues after manual navigation
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex]);

  if (testimonials.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          color: 'text.secondary',
        }}
      >
        No testimonials to display.
      </Box>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        px: { xs: 2, sm: 4, md: 0 },
      }}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
    >
      {/* Main Carousel Container */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          position: 'relative',
          minHeight: { xs: 380, sm: 340, md: 280 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: 'tween',
              duration: 0.5,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '100%',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                backdropFilter: 'blur(12px) saturate(180%)',
                backgroundColor: isDarkMode
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(255, 255, 255, 0.7)',
                border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
                boxShadow: isDarkMode
                  ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                  : '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                borderRadius: 3, // 12px - slightly less round than theme default (16px)
                position: 'relative',
              }}
            >
              {/* Quote Icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 16,
                  opacity: 0.15,
                  color: 'primary.main',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Quote size={40} strokeWidth={1} />
              </Box>

              {/* Quote Text */}
              <Typography
                variant="body1"
                sx={{
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                  mb: 2.5,
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                  color: 'text.primary',
                  position: 'relative',
                  zIndex: 1,
                  px: { xs: 1, sm: 0 },
                }}
              >
                "{currentTestimonial.quote}"
              </Typography>

              {/* Author Info */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                {currentTestimonial.avatar && (
                  <Box
                    component="img"
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    sx={{
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `2px solid ${theme.palette.primary.main}`,
                      flexShrink: 0,
                    }}
                  />
                )}
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      wordBreak: 'break-word',
                    }}
                  >
                    {currentTestimonial.author}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' },
                      wordBreak: 'break-word',
                    }}
                  >
                    {currentTestimonial.role}
                    {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Navigation Arrows */}
      {showArrows && testimonials.length > 1 && (
        <>
          <IconButton
            onClick={prevSlide}
            aria-label="Previous testimonial"
            sx={{
              position: 'absolute',
              left: { xs: 4, sm: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              color: 'text.primary',
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: 'primary.main',
              },
              '&:disabled': {
                opacity: 0.3,
                cursor: 'not-allowed',
              },
              p: { xs: 0.5, sm: 1 },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={nextSlide}
            aria-label="Next testimonial"
            sx={{
              position: 'absolute',
              right: { xs: 4, sm: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              color: 'text.primary',
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: 'primary.main',
              },
              '&:disabled': {
                opacity: 0.3,
                cursor: 'not-allowed',
              },
              p: { xs: 0.5, sm: 1 },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && testimonials.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: { xs: 2, sm: 3 },
          }}
        >
          {testimonials.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
              size="small"
              sx={{
                width: { xs: 10, sm: 12 },
                height: { xs: 10, sm: 12 },
                p: 0,
                borderRadius: '50%',
                bgcolor: index === currentIndex ? 'primary.main' : isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                '&:hover': {
                  bgcolor: index === currentIndex ? 'primary.main' : 'primary.light',
                  transform: 'scale(1.2)',
                },
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TestimonialsCarousel;