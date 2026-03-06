import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface HistoryEntry {
  input?: string;
  output: React.ReactNode;
}

const COMMANDS: Record<string, () => React.ReactNode> = {
  help: () => (
    <Box component="span" sx={{ display: 'block' }}>
      <Typography variant="body2" sx={{ color: '#00bcd4', mb: 0.5 }}>
        Available commands:
      </Typography>
      {[
        ['whoami', 'Display info about Arvie'],
        ['ls skills', 'List all technical skills'],
        ['cat contact.txt', 'Show contact information'],
        ['cat experience.txt', 'Show work experience'],
        ['cat projects.txt', 'Show featured projects'],
        ['clear', 'Clear the terminal'],
        ['help', 'Show this help message'],
      ].map(([cmd, desc]) => (
        <Box key={cmd} sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#9c27b0', minWidth: 140 }}>
            {cmd}
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            {desc}
          </Typography>
        </Box>
      ))}
    </Box>
  ),

  whoami: () => (
    <Box>
      <Typography variant="body2" sx={{ color: '#4caf50', lineHeight: 2 }}>
        {'{ '}
        <br />
        &nbsp;&nbsp;"name": "Arvie Benito",
        <br />
        &nbsp;&nbsp;"title": "Fullstack MERN Developer",
        <br />
        &nbsp;&nbsp;"location": "Philippines",
        <br />
        &nbsp;&nbsp;"status": "Available for hire 🚀",
        <br />
        &nbsp;&nbsp;"passion": "Building scalable, end-to-end web applications"
        <br />
        {'}'}
      </Typography>
    </Box>
  ),

  'ls skills': () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 0.5 }}>
      {[
        'React',
        'Node.js',
        'Express.js',
        'MongoDB',
        'TypeScript',
        'Redux Toolkit',
        'REST APIs',
        'Socket.io',
        'Material UI',
        'Git',
        'Docker',
        'AWS',
      ].map((skill) => (
        <Typography
          key={skill}
          variant="body2"
          sx={{
            color: '#00bcd4',
            bgcolor: 'rgba(0,188,212,0.08)',
            px: 1.5,
            py: 0.3,
            borderRadius: 1,
            border: '1px solid rgba(0,188,212,0.2)',
          }}
        >
          {skill}
        </Typography>
      ))}
    </Box>
  ),

  'cat contact.txt': () => (
    <Box sx={{ lineHeight: 2 }}>
      <Typography variant="body2">
        📧 <span style={{ color: '#9c27b0' }}>email:</span>{' '}
        <span style={{ color: '#eee' }}>contact@arviebenito.com</span>
      </Typography>
      <Typography variant="body2">
        💼 <span style={{ color: '#9c27b0' }}>linkedin:</span>{' '}
        <span style={{ color: '#eee' }}>linkedin.com/in/arviebenito</span>
      </Typography>
      <Typography variant="body2">
        🐙 <span style={{ color: '#9c27b0' }}>github:</span>{' '}
        <span style={{ color: '#eee' }}>github.com/arvieguadiz</span>
      </Typography>
      <Typography variant="body2">
        🌍 <span style={{ color: '#9c27b0' }}>location:</span>{' '}
        <span style={{ color: '#eee' }}>Philippines (Remote-friendly)</span>
      </Typography>
    </Box>
  ),

  'cat experience.txt': () => (
    <Box sx={{ lineHeight: 2.2 }}>
      <Typography
        variant="body2"
        sx={{ color: '#4caf50', fontWeight: 700, mb: 0.5 }}
      >
        Work Experience:
      </Typography>
      <Typography variant="body2">
        🚀 <span style={{ color: '#9c27b0' }}>2023–Present</span> — Fullstack
        Web Developer (Freelance)
      </Typography>
      <Typography variant="body2">
        💻 <span style={{ color: '#9c27b0' }}>2021–2023</span> — Frontend
        Developer (Tech Startup)
      </Typography>
      <Typography variant="body2">
        🎓 <span style={{ color: '#9c27b0' }}>2017–2021</span> — B.S. Computer
        Science
      </Typography>
    </Box>
  ),

  'cat projects.txt': () => (
    <Box sx={{ lineHeight: 2.2 }}>
      <Typography
        variant="body2"
        sx={{ color: '#4caf50', fontWeight: 700, mb: 0.5 }}
      >
        Featured Projects:
      </Typography>
      <Typography variant="body2">
        🛒 <span style={{ color: '#9c27b0' }}>E-Commerce Platform</span> —
        React, Node.js, MongoDB, Stripe
      </Typography>
      <Typography variant="body2">
        💬 <span style={{ color: '#9c27b0' }}>Real-time Chat App</span> — React,
        Socket.io, Node.js, MongoDB
      </Typography>
      <Typography variant="body2">
        📊 <span style={{ color: '#9c27b0' }}>Project Dashboard</span> — React,
        Express, MongoDB, Chart.js
      </Typography>
    </Box>
  ),
};

const BOOT_LINES = [
  '> Initializing portfolio.sh ...',
  '> Loading modules: [react] [node] [mongodb] [express]',
  '> All systems online ✓',
  '> Type "help" to see available commands.',
];

const Terminal: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [history, setHistory] = useState<HistoryEntry[]>([]);
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

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const handler = COMMANDS[trimmed];
    const output = handler ? (
      handler()
    ) : (
      <Typography variant="body2" sx={{ color: '#f44336' }}>
        Command not found: "{trimmed}". Type{' '}
        <span style={{ color: '#9c27b0' }}>help</span> for available commands.
      </Typography>
    );

    setHistory((prev) => [...prev, { input: cmd, output }]);
    setInput('');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (input.trim()) {
        handleCommand(input);
      }
    }
  };

  const bg = isDark ? '#0d0d0d' : '#111';

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
        border: '1px solid rgba(156, 39, 176, 0.3)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        fontFamily: '"Fira Code", "Courier New", monospace',
      }}
    >
      {/* Title Bar */}
      <Box
        sx={{
          bgcolor: isDark ? '#1a1a1a' : '#222',
          px: 2,
          py: 1.2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: '#ff5f57',
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: '#ffbd2e',
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: '#28ca41',
          }}
        />
        <Typography
          variant="caption"
          sx={{ ml: 2, color: '#aaa', fontFamily: 'inherit', letterSpacing: 1 }}
        >
          arvie@portfolio: ~
        </Typography>
      </Box>

      {/* Terminal Body */}
      <Box
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        sx={{
          bgcolor: bg,
          px: { xs: 2, md: 3 },
          py: 2.5,
          minHeight: 320,
          maxHeight: 420,
          overflowY: 'auto',
          cursor: 'text',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(156,39,176,0.4)',
            borderRadius: '3px',
          },
        }}
      >
        {/* Boot sequence */}
        {bootLines.map((line, i) => (
          <Typography
            key={i}
            variant="body2"
            sx={{ color: '#4caf50', fontFamily: 'inherit', lineHeight: 2 }}
          >
            {line}
          </Typography>
        ))}

        {/* Command history */}
        {history.map((entry, i) => (
          <Box key={i} sx={{ mt: 1.5 }}>
            {entry.input && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9c27b0', fontFamily: 'inherit' }}
                >
                  arvie@portfolio:~$
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#eee', fontFamily: 'inherit' }}
                >
                  {entry.input}
                </Typography>
              </Box>
            )}
            <Box sx={{ pl: 0, mt: 0.5, fontFamily: 'inherit' }}>
              {entry.output}
            </Box>
          </Box>
        ))}

        {/* Input row */}
        {bootDone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
            <Typography
              variant="body2"
              sx={{ color: '#9c27b0', fontFamily: 'inherit', flexShrink: 0 }}
            >
              arvie@portfolio:~$
            </Typography>
            <Box
              component="input"
              ref={inputRef}
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              spellCheck={false}
              sx={{
                flex: 1,
                bgcolor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#eee',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                caretColor: '#9c27b0',
              }}
            />
          </Box>
        )}

        <div />
      </Box>
    </Box>
  );
};

export default Terminal;
