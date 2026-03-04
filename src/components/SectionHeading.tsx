import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  subtitle,
}) => {
  return (
    <Box sx={{ mb: 8, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 2,
            px: 2,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            background: 'linear-gradient(90deg, #9c27b0 0%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          {children}
        </Typography>
        {subtitle && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', fontWeight: 400, px: 2 }}
          >
            {subtitle}
          </Typography>
        )}
      </motion.div>
    </Box>
  );
};

export default SectionHeading;
