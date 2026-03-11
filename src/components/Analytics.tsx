import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics component to handle privacy-focused tracking (e.g., Umami, Plausible).
 * This component is designed to be extensible.
 */
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Tracking page views
    if (window.umami) {
      window.umami.track(location.pathname + location.search);
    }
  }, [location]);

  return null;
};

/**
 * Utility to track custom events
 * @param eventName Name of the event
 * @param eventData Optional data associated with the event
 */
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (window.umami) {
    window.umami.track(eventName, eventData);
  }
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event: ${eventName}`, eventData);
  }
};

// Global type definition for window.umami
declare global {
  interface Window {
    umami?: {
      track: (eventValue: string, eventData?: Record<string, any>) => void;
    };
  }
}

export default Analytics;
