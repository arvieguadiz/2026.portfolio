import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Chip, LinearProgress, Portal } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '@/hooks/useThemeMode';

interface Skill {
  name: string;
  level: number;
  category: string;
  relatedProject: string;
  description: string;
}

interface SkillChipProps {
  skill: Skill;
}

const SkillChip: React.FC<SkillChipProps> = ({ skill }) => {
  const { isDarkMode } = useThemeMode();
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const chipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (chipRef.current) {
      const rect = chipRef.current.getBoundingClientRect();
      setPos({
        top: rect.top - 10, // above chip in viewport
        left: rect.left + rect.width / 2, // horizontal centre in viewport
      });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setHovered(true);
  };

  useEffect(() => {
    if (hovered) {
      window.addEventListener('scroll', updatePosition, { passive: true });
    }
    return () => window.removeEventListener('scroll', updatePosition);
  }, [hovered]);

  const popupBg = isDarkMode
    ? 'rgba(18, 18, 28, 0.98)'
    : 'rgba(255, 255, 255, 0.99)';
  const borderColor = isDarkMode
    ? 'rgba(156, 39, 176, 0.35)'
    : 'rgba(156, 39, 176, 0.2)';

  return (
    <>
      <Box ref={chipRef} sx={{ display: 'inline-block' }}>
        <Chip
          component={motion.div}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          label={skill.name}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setHovered(false)}
          sx={{
            cursor: 'pointer',
            bgcolor: isDarkMode
              ? 'rgba(156, 39, 176, 0.12)'
              : 'rgba(156, 39, 176, 0.06)',
            border: `1px solid ${isDarkMode ? 'rgba(156, 39, 176, 0.3)' : 'rgba(156, 39, 176, 0.15)'}`,
            color: isDarkMode ? '#fff' : '#9c27b0',
            fontWeight: 600,
            fontSize: '0.8rem',
            '&:hover': {
              bgcolor: isDarkMode
                ? 'rgba(156, 39, 176, 0.25)'
                : 'rgba(156, 39, 176, 0.18)',
              boxShadow: '0 4px 20px rgba(156, 39, 176, 0.25)',
            },
          }}
        />
      </Box>

      {/* Portal: renders outside parent DOM so it's never clipped */}
      <Portal>
        <AnimatePresence>
          {hovered && (
            /*
             * IMPORTANT: Outer Box handles positioning ONLY (position:fixed + translate).
             * Inner motion.div handles animation ONLY (opacity + scale).
             * Keeping them separate prevents Framer Motion from overwriting the CSS transform.
             */
            <Box
              sx={{
                position: 'fixed',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -100%)',
                zIndex: 9999,
                pointerEvents: 'none',
              }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.15 }}
                sx={{
                  width: 220,
                  bgcolor: popupBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  p: 1.5,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
                }}
              >
                {/* Header row */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 0.8,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      fontSize: '0.78rem',
                    }}
                  >
                    {skill.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontSize: '0.64rem' }}
                  >
                    {skill.category}
                  </Typography>
                </Box>

                {/* Proficiency bar */}
                <Box sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.3,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', fontSize: '0.64rem' }}
                    >
                      Proficiency
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 700,
                        fontSize: '0.64rem',
                      }}
                    >
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: isDarkMode
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(0,0,0,0.08)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #9c27b0, #00bcd4)',
                      },
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    mb: 0.5,
                    lineHeight: 1.4,
                    fontSize: '0.67rem',
                  }}
                >
                  {skill.description}
                </Typography>

                {/* Related project */}
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode
                      ? 'rgba(255,255,255,0.38)'
                      : 'rgba(0,0,0,0.38)',
                    fontSize: '0.62rem',
                  }}
                >
                  {'📂 '}
                  {skill.relatedProject}
                </Typography>

                {/* Arrow pointing DOWN toward chip */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -6,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: 10,
                    height: 10,
                    bgcolor: popupBg,
                    border: `1px solid ${borderColor}`,
                    borderTop: 'none',
                    borderLeft: 'none',
                  }}
                />
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default SkillChip;
export type { Skill };
