import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

export interface TerminalTheme {
  name: string;
  bg: string;
  fg: string;
  prompt: string;
  output: string;
  accent: string;
  error: string;
}

export const TERMINAL_THEMES: Record<string, TerminalTheme> = {
  dracula: {
    name: 'Dracula',
    bg: '#282a36',
    fg: '#f8f8f2',
    prompt: '#50fa7b',
    output: '#f8f8f2',
    accent: '#bd93f9',
    error: '#ff5555'
  },
  matrix: {
    name: 'Matrix',
    bg: '#000000',
    fg: '#00ff41',
    prompt: '#00ff41',
    output: '#00ff41',
    accent: '#008f11',
    error: '#ff0000'
  },
  classic: {
    name: 'Classic',
    bg: '#0d0d0d',
    fg: '#eeeeee',
    prompt: '#9c27b0',
    output: '#eeeeee',
    accent: '#00bcd4',
    error: '#f44336'
  },
  retro: {
    name: 'Retro',
    bg: '#333333',
    fg: '#ffb000',
    prompt: '#ffb000',
    output: '#ffb000',
    accent: '#ffb000',
    error: '#ff0000'
  }
};

export interface FileSystemNode {
  type: 'file' | 'dir';
  name: string;
  content?: string | React.ReactNode;
  children?: Record<string, FileSystemNode>;
}

export const MOCK_FS: Record<string, FileSystemNode> = {
  '~': {
    type: 'dir',
    name: '~',
    children: {
      'skills': {
        type: 'dir',
        name: 'skills',
        children: {
          'frontend.txt': { type: 'file', name: 'frontend.txt', content: 'React, Redux, Material UI, Tailwind, Framer Motion' },
          'backend.txt': { type: 'file', name: 'backend.txt', content: 'Node.js, Express, Socket.io, JWT' },
          'database.txt': { type: 'file', name: 'database.txt', content: 'MongoDB, Redis, PostgreSQL' }
        }
      },
      'projects': {
        type: 'dir',
        name: 'projects',
        children: {
          'ecommerce.md': { type: 'file', name: 'ecommerce.md', content: 'A fullstack platform with Stripe integration.' },
          'chat.md': { type: 'file', name: 'chat.md', content: 'Real-time messaging with Socket.io.' }
        }
      },
      'about.me': { type: 'file', name: 'about.me', content: 'Arvie Benito | Fullstack Developer | Philippines' },
      'contact.txt': { type: 'file', name: 'contact.txt', content: 'Email: contact@arviebenito.com | GitHub: arvieguadiz' }
    }
  }
};

export interface HistoryEntry {
  input?: string;
  output: React.ReactNode;
  path: string;
}

export const useTerminal = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>(['~']);
  const [theme, setTheme] = useState<TerminalTheme>(TERMINAL_THEMES.classic);

  const getDir = useCallback((path: string[]) => {
    let current = MOCK_FS['~'];
    for (let i = 1; i < path.length; i++) {
      if (current.children && current.children[path[i]]) {
        current = current.children[path[i]];
      } else {
        return null;
      }
    }
    return current;
  }, []);

  const handleCommand = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const parts = trimmed.toLowerCase().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    let output: React.ReactNode = '';

    if (cmd === 'clear') {
      setHistory([]);
      return;
    } else if (cmd === 'help') {
      output = (
        <Box>
          <Typography variant="body2" sx={{ color: theme.accent, mb: 1 }}>Available commands:</Typography>
          {[
            ['ls', 'List files and directories'],
            ['cd <dir>', 'Change directory'],
            ['cat <file>', 'Read file content'],
            ['theme <name>', 'Change terminal theme (matrix, dracula, classic, retro)'],
            ['themes', 'List available themes'],
            ['clear', 'Clear terminal'],
            ['help', 'Show this help']
          ].map(([c, d]) => (
            <Box key={c} sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="body2" sx={{ color: theme.prompt, minWidth: 100 }}>{c}</Typography>
              <Typography variant="body2" sx={{ color: '#aaa' }}>{d}</Typography>
            </Box>
          ))}
        </Box>
      );
    } else if (cmd === 'ls') {
      const dir = getDir(currentPath);
      if (dir && dir.children) {
        output = (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {Object.values(dir.children).map(node => (
              <Typography key={node.name} variant="body2" sx={{ 
                color: node.type === 'dir' ? theme.accent : theme.output,
                fontWeight: node.type === 'dir' ? 700 : 400
              }}>
                {node.name}{node.type === 'dir' ? '/' : ''}
              </Typography>
            ))}
          </Box>
        );
      }
    } else if (cmd === 'cd') {
      const target = args[0];
      if (!target || target === '~') {
        setCurrentPath(['~']);
      } else if (target === '..') {
        if (currentPath.length > 1) {
          setCurrentPath(prev => prev.slice(0, -1));
        }
      } else {
        const currentDir = getDir(currentPath);
        if (currentDir && currentDir.children && currentDir.children[target]) {
          if (currentDir.children[target].type === 'dir') {
            setCurrentPath(prev => [...prev, target]);
          } else {
            output = <Typography variant="body2" sx={{ color: theme.error }}>cd: not a directory: {target}</Typography>;
          }
        } else {
          output = <Typography variant="body2" sx={{ color: theme.error }}>cd: no such file or directory: {target}</Typography>;
        }
      }
    } else if (cmd === 'cat') {
      const filename = args[0];
      const cDir = getDir(currentPath);
      if (cDir && cDir.children && cDir.children[filename]) {
        if (cDir.children[filename].type === 'file') {
          output = <Typography variant="body2" sx={{ color: theme.output }}>{cDir.children[filename].content}</Typography>;
        } else {
          output = <Typography variant="body2" sx={{ color: theme.error }}>cat: {filename}: Is a directory</Typography>;
        }
      } else {
        output = <Typography variant="body2" sx={{ color: theme.error }}>cat: {filename}: No such file or directory</Typography>;
      }
    } else if (cmd === 'themes') {
      output = <Typography variant="body2" sx={{ color: theme.output }}>Available themes: {Object.keys(TERMINAL_THEMES).join(', ')}</Typography>;
    } else if (cmd === 'theme') {
      const themeName = args[0];
      if (TERMINAL_THEMES[themeName]) {
        const newTheme = TERMINAL_THEMES[themeName];
        setTheme(newTheme);
        output = <Typography variant="body2" sx={{ color: newTheme.output }}>Theme changed to {themeName}</Typography>;
      } else {
        output = <Typography variant="body2" sx={{ color: theme.error }}>Theme not found: {themeName}</Typography>;
      }
    } else {
      output = <Typography variant="body2" sx={{ color: theme.error }}>Command not found: {cmd}. Type 'help' for assistance.</Typography>;
    }

    setHistory(prev => [...prev, { input, output, path: currentPath.join('/') }]);
  }, [currentPath, theme, getDir]);

  return {
    history,
    currentPath: currentPath.join('/'),
    theme,
    handleCommand,
    clearHistory: () => setHistory([])
  };
};
