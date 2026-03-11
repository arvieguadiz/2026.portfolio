import React from 'react';
import { Box, Typography, Grid, LinearProgress, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Layout, 
  Server, 
  Smartphone, 
  Terminal as TerminalIcon,
  Cpu,
  Workflow
} from 'lucide-react';
import { type Skill } from './SkillChip';
import { useThemeMode } from '@/hooks/useThemeMode';

interface SkillsGridProps {
  skills: Skill[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend': <Layout size={20} />,
  'Backend': <Server size={20} />,
  'Database': <Database size={20} />,
  'Language': <Code2 size={20} />,
  'State Mgmt': <Layers size={20} />,
  'UI Library': <Globe size={20} />,
  'Architecture': <Workflow size={20} />,
  'Tools': <TerminalIcon size={20} />,
  'System': <Cpu size={20} />,
  'Mobile': <Smartphone size={20} />,
};

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  const { isDarkMode } = useThemeMode();

  return (
    <Grid container spacing={3}>
      {skills.map((skill, index) => (
        <Grid size={{ xs: 12, sm: 6 }} key={skill.name}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Tooltip 
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{skill.description}</Typography>
                  {skill.relatedProject && (
                    <Typography variant="caption" display="block" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                      Used in: {skill.relatedProject}
                    </Typography>
                  )}
                </Box>
              }
              arrow
              placement="top"
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.04)',
                    transform: 'translateY(-2px)',
                    borderColor: 'primary.main',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 1,
                      borderRadius: '8px',
                      bgcolor: isDarkMode ? 'rgba(156, 39, 176, 0.1)' : 'rgba(156, 39, 176, 0.05)',
                    }}
                  >
                    {categoryIcons[skill.category] || <Code2 size={20} />}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {skill.level}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={skill.level} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      background: 'linear-gradient(90deg, #9c27b0 0%, #d05ce3 100%)',
                    }
                  }} 
                />
              </Box>
            </Tooltip>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkillsGrid;
