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
    fullDescription: 'This comprehensive e-commerce solution was built to handle high-traffic retail needs. It includes a complete shopping cart system, secure payment processing via Stripe, and an extensive admin interface for inventory management.',
    challenges: [
      'Implementing real-time inventory synchronization across multiple sessions.',
      'Optimizing MongoDB aggregation pipelines for complex reporting in the admin dashboard.',
      'Managing complex state with Redux Toolkit for the checkout flow.'
    ],
    architecture: 'The system follows a typical MERN stack architecture with a decoupled frontend and backend. The backend is a RESTful API built with Express and Node.js, using JWT for stateless authentication. The frontend is a React-based SPA with Material UI for styling.',
    techStack: ['React', 'Redux Toolkit', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT']
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
    fullDescription: 'A modern chat experience focusing on low latency and reliable message delivery. Users can create private rooms, share media, and see real-time updates of their friends\' online status.',
    challenges: [
      'Handling socket reconnections and state recovery after network interruptions.',
      'Implementing message persistence and efficient loading of chat history.',
      'Ensuring low latency for real-time indicators like "typing..." and "read receipts".'
    ],
    architecture: 'Uses Socket.io for bidirectional event-based communication. The server handles load balancing of socket connections and persists messages to MongoDB. Redis is used for pub/sub to support multiple server instances.',
    techStack: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
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
    fullDescription: 'Designed for productivity, this tool helps teams organize their work through visual boards. It features customizable workflows, automated notifications, and productivity tracking metrics.',
    challenges: [
      'Implementing smooth drag-and-drop interactions for Kanban columns and cards.',
      'Building a flexible notification system that supports both in-app and email alerts.',
      'Developing complex data visualizations using Chart.js to track team velocity.'
    ],
    architecture: 'Micro-services inspired architecture where different modules handle authentication, board logic, and notification services independently. Frontend uses React with a modular component design.',
    techStack: ['React', 'React-Beautiful-Dnd', 'Chart.js', 'Node.js', 'Express', 'MongoDB', 'Nodemailer']
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
    fullDescription: 'This portfolio showcases my technical skills and projects through a highly interactive and visually appealing interface. It emphasizes performance, accessibility, and modern design principles.',
    challenges: [
      'Implementing a custom terminal emulator with command history and complex logic.',
      'Creating smooth, performant page transitions and scroll-based animations.',
      'Ensuring a consistent theme-aware design across all components.'
    ],
    architecture: 'A static-first React application optimized for performance. Uses Framer Motion for animations and Material UI for a consistent design system. State is managed using Redux Toolkit.',
    techStack: ['React', 'TypeScript', 'Redux Toolkit', 'Material UI', 'Framer Motion', 'Vite']
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
    fullDescription: 'A developer-centric API service designed to be the backbone of modern web applications. It provides robust authentication, fine-grained access control, and extensive logging capabilities.',
    challenges: [
      'Designing a scalable database schema to handle polymorphic relationships.',
      'Implementing multi-layered security including rate limiting, CORS, and helmet headers.',
      'Automatically generating and maintaining up-to-date documentation with Swagger/OpenAPI.'
    ],
    architecture: 'A layered architecture separating controllers, services, and data access layers. Follows REST principles and uses middleware for cross-cutting concerns like logging and error handling.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger/OpenAPI', 'Winston', 'Jest']
  },
];
