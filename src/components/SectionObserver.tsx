import React, { useEffect, useState } from 'react';

interface SectionData {
  id: string;
  title: string;
}

interface SectionObserverProps {
  sections: SectionData[];
  defaultTitle: string;
}

const SectionObserver: React.FC<SectionObserverProps> = ({
  sections,
  defaultTitle,
}) => {
  const [currentTitle, setCurrentTitle] = useState(defaultTitle);

  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  useEffect(() => {
    let ticking = false;
    let checkCount = 0;
    const maxChecks = 10; // Stop checking after 10 seconds

    const updateTitle = () => {
      const titleMap = new Map<HTMLElement, string>();
      sections.forEach((section) => {
        const element = document.getElementById(section.id.toLowerCase());
        if (element) {
          titleMap.set(element, section.title);
        }
      });

      if (titleMap.size === 0) {
        // No sections found yet, keep default title
        return;
      }

      const viewportHeight = window.innerHeight;
      let mostVisibleElement: HTMLElement | null = null;
      let maxVisibleArea = 0;

      titleMap.forEach((_, element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        const visibleTop = Math.max(elementTop, 0);
        const visibleBottom = Math.min(elementBottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleArea) {
          maxVisibleArea = visibleHeight;
          mostVisibleElement = element;
        }
      });

      if (mostVisibleElement) {
        const title = titleMap.get(mostVisibleElement);
        if (title) {
          setCurrentTitle(title);
        }
      } else {
        setCurrentTitle(defaultTitle);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTitle();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial checks to handle lazy-loaded content
    const interval = setInterval(() => {
      updateTitle();
      checkCount++;
      if (checkCount >= maxChecks) {
        clearInterval(interval);
      }
    }, 500);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Also trigger once after a short delay
    setTimeout(updateTitle, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [sections, defaultTitle]);

  return null;
};

export default SectionObserver;
