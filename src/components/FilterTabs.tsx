import React from 'react';
import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        justifyContent: 'center',
        mb: 5,
        overflowX: { xs: 'auto', sm: 'visible' },
        py: 1,
        px: { xs: 2, sm: 0 },
      }}
    >
      {categories.map((category, index) => {
        const isActive = activeCategory === category;
        const label = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: 'easeOut',
            }}
          >
            <Button
              onClick={() => onCategoryChange(category)}
              variant={isActive ? 'contained' : 'outlined'}
              color={isActive ? 'primary' : 'inherit'}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                borderRadius: '20px',
                px: { xs: 2.5, sm: 3 },
                py: { xs: 0.75, sm: 1 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: isActive ? 700 : 500,
                backdropFilter: isActive ? 'blur(8px)' : 'none',
                borderColor: isDarkMode
                  ? isActive
                    ? 'transparent'
                    : 'rgba(255, 255, 255, 0.2)'
                  : isActive
                  ? 'transparent'
                  : 'rgba(0, 0, 0, 0.2)',
                bgcolor: isActive
                  ? 'primary.main'
                  : isDarkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                color: isActive
                  ? 'primary.contrastText'
                  : 'text.primary',
                '&:hover': {
                  bgcolor: isActive
                    ? 'primary.dark'
                    : isDarkMode
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                  borderColor: isActive
                    ? 'transparent'
                    : 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: isActive
                    ? '0 4px 12px rgba(156, 39, 176, 0.3)'
                    : 'none',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {label}
            </Button>
          </motion.div>
        );
      })}
    </Box>
  );
};

export default FilterTabs;