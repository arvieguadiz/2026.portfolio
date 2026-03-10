import type { Project } from '@/features/projects/projectSlice';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Fullstack E-Commerce Platform',
    description:
      'A robust e-commerce application featuring JWT authentication, Stripe integration, and an admin dashboard.',
    imageUrl: 'https://placehold.co/400x250/000000/FFF?text=E-Commerce',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
    category: 'fullstack',
    github: '#',
    link: '#',
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description:
      'A real-time communication platform utilizing Socket.io for instant messaging, read receipts, and online presence.',
    imageUrl: 'https://placehold.co/400x250/000000/FFF?text=Chat+App',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    category: 'fullstack',
    github: '#',
    link: '#',
  },
  {
    id: '3',
    title: 'Project Management Dashboard',
    description:
      'A Kanban-style project management tool with drag-and-drop functionality and detailed analytics.',
    imageUrl: 'https://placehold.co/400x250/000000/FFF?text=Dashboard',
    tags: ['React', 'Express', 'MongoDB', 'Chart.js'],
    category: 'fullstack',
    github: '#',
    link: '#',
  },
  {
    id: '4',
    title: 'Interactive Portfolio Website',
    description:
      'A modern, responsive portfolio website with Glassmorphism design, animations, and dark mode support.',
    imageUrl: 'https://placehold.co/400x250/000000/FFF?text=Portfolio',
    tags: ['React', 'TypeScript', 'Material UI', 'Framer Motion'],
    category: 'frontend',
    github: '#',
    link: '#',
  },
  {
    id: '5',
    title: 'RESTful API Service',
    description:
      'A scalable backend API with authentication, rate limiting, and comprehensive documentation using OpenAPI.',
    imageUrl: 'https://placehold.co/400x250/000000/FFF?text=API',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    category: 'backend',
    github: '#',
    link: '#',
  },
];
