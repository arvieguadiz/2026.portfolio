import type { Testimonial } from '@/components/TestimonialsCarousel';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Arvie is an exceptional fullstack developer who delivered our e-commerce platform ahead of schedule. His attention to detail and problem-solving skills are remarkable. The codebase he built was clean, well-documented, and easy to maintain.",
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'TechStart Inc.',
    linkedin: 'https://linkedin.com/in/sarahchen',
    avatar: undefined, // Could add actual avatar URL
  },
  {
    id: '2',
    quote: "Working with Arvie on our real-time chat application was a pleasure. He implemented complex Socket.io features with ease and ensured the application was scalable and performant. His MERN stack expertise is top-notch.",
    author: 'Michael Rodriguez',
    role: 'Senior Software Engineer',
    company: 'CloudSync Solutions',
    github: 'https://github.com/mrodriguez',
    avatar: undefined,
  },
  {
    id: '3',
    quote: "Arvie transformed our outdated project management tool into a modern, intuitive dashboard. His ability to understand user requirements and translate them into elegant technical solutions is impressive. Highly recommended!",
    author: 'Emily Johnson',
    role: 'Product Manager',
    company: 'Innovate Labs',
    email: 'emily.johnson@innovatelabs.com',
    avatar: undefined,
  },
  {
    id: '4',
    quote: "As a mentor, Arvie is patient, knowledgeable, and passionate about helping others grow. His deep understanding of React and Node.js helped me transition from junior to mid-level developer in just 6 months.",
    author: 'David Kim',
    role: 'Fullstack Developer',
    company: 'Freelance',
    linkedin: 'https://linkedin.com/in/davidkim',
    avatar: undefined,
  },
];