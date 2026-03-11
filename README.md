# Modern Portfolio Website

A high-performance, interactive personal portfolio website built with **React 19**, **Vite**, and **TypeScript**. Featuring a sleek "Glassmorphism" design, an enhanced terminal emulator, and detailed project case studies.

## 🚀 Live Demo

[Link to your live site here]

## ✨ Features

- **Glassmorphism UI**: Modern aesthetic with blurred backgrounds and neon accents using MUI v7.
- **Interactive Terminal**: A refactored, hook-based terminal with a mock hierarchical file system and dynamic theming.
- **Detailed Case Studies**: Dedicated project pages exploring technical challenges, architecture, and tech stacks.
- **Visual Skills Grid**: Interactive proficiency visualization with category-based iconography.
- **Dark/Light Mode**: Full theme support with persistent preferences.
- **Custom Animated Cursor**: Interactive cursor with spring physics.
- **Section-Aware Tab Titles**: Browser tab title updates automatically based on the visible section.
- **Filterable Projects**: Browse projects by category (Frontend, Backend, Fullstack, Mobile).
- **Contact Integration**: Fully functional contact form powered by EmailJS with **Zod** validation and **React Hook Form**.
- **Internationalization (i18n)**: Multi-language support (English & Tagalog) with automatic language detection and a custom switcher.
- **Privacy-Focused Analytics**: Custom analytics integration for tracking page views and engagement events without invasive cookies.
- **Enhanced Security**: Robust security posture with Content Security Policy (CSP) and optimized HTTP headers.
- **SEO Optimized**: Dynamic metadata and structured data using React Helmet.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **PWA Ready**: Installable as a progressive web app with offline support.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router v7
- **Styling**: Material UI (MUI) v7, Emotion, CSS-in-JS
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Validation**: Zod, React Hook Form
- **Internationalization**: i18next
- **Icons**: Lucide React, MUI Icons
- **Deployment**: [Your Hosting Provider, e.g., Vercel, Netlify]

## 📦 Project Structure

```text
src/
├── app/            # Redux store configuration
├── assets/         # Images and static assets
├── components/     # Reusable UI components
├── data/           # Mock data for projects and testimonials
├── features/       # Feature-specific logic (Redux slices)
├── hooks/          # Custom React hooks (useTerminal, useThemeMode)
├── i18n/           # Internationalization configuration and translations
├── layouts/        # Page layout components
├── pages/          # Page sections and Detail views
├── theme/          # MUI theme configuration
└── main.tsx        # Application entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/arvieguadiz/2026.portfolio.git
    cd 2026.portfolio
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file based on `.env.example` and add your EmailJS keys:

    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

### Building for Production

```bash
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Arvie Benito**

- GitHub: [@arvieguadiz](https://github.com/arvieguadiz)
- LinkedIn: [Arvie Benito](https://linkedin.com/in/arviebenito)
