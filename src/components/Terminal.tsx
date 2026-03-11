import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTerminal } from '@/hooks/useTerminal';

const BOOT_LINES = [
  '> Initializing portfolio.sh ...',
  '> Loading modules: [react] [node] [mongodb] [express]',
  '> All systems online ✓',
  '> Type "help" to see available commands.',
];

const Terminal: React.FC = () => {
  const { history, currentPath, theme, handleCommand } = useTerminal();
  const [input, setInput] = useState('');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Typewriter boot sequence
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setBootLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setBootDone(true);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Scroll terminal body to bottom on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, bootLines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (input.trim()) {
        handleCommand(input);
        setInput('');
      }
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${theme.accent}4d`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        fontFamily: '"Fira Code", "Courier New", monospace',
      }}
    >
      {/* Title Bar */}
      <Box
        sx={{
          bgcolor: theme.bg,
          filter: 'brightness(1.5)',
          px: 2,
          py: 1.2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28ca41' }} />
        <Typography variant="caption" sx={{ ml: 2, color: theme.fg, opacity: 0.7, fontFamily: 'inherit', letterSpacing: 1 }}>
          arvie@portfolio: {currentPath}
        </Typography>
      </Box>

      {/* Terminal Body */}
      <Box
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        sx={{
          bgcolor: theme.bg,
          px: { xs: 2, md: 3 },
          py: 2.5,
          minHeight: 320,
          maxHeight: 420,
          overflowY: 'auto',
          cursor: 'text',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: `${theme.accent}66`,
            borderRadius: '3px',
          },
        }}
      >
        {/* Boot sequence */}
        {bootLines.map((line, i) => (
          <Typography key={i} variant="body2" sx={{ color: theme.prompt, fontFamily: 'inherit', lineHeight: 2 }}>
            {line}
          </Typography>
        ))}

        {/* Command history */}
        {history.map((entry, i) => (
          <Box key={i} sx={{ mt: 1.5 }}>
            {entry.input && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: theme.prompt, fontFamily: 'inherit' }}>
                  arvie@portfolio:{entry.path}$
                </Typography>
                <Typography variant="body2" sx={{ color: theme.fg, fontFamily: 'inherit' }}>
                  {entry.input}
                </Typography>
              </Box>
            )}
            <Box sx={{ pl: 0, mt: 0.5, fontFamily: 'inherit', color: theme.output }}>
              {entry.output}
            </Box>
          </Box>
        ))}

        {/* Input row */}
        {bootDone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
            <Typography variant="body2" sx={{ color: theme.prompt, fontFamily: 'inherit', flexShrink: 0 }}>
              arvie@portfolio:{currentPath}$
            </Typography>
            <Box
              component="input"
              ref={inputRef}
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              sx={{
                flex: 1,
                bgcolor: 'transparent',
                border: 'none',
                outline: 'none',
                color: theme.fg,
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                caretColor: theme.prompt,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Terminal;
