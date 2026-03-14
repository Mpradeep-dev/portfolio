// src/hooks/useCursorSpot.js
import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export function useCursorSpot() {
  const cursorX = useMotionValue(0); // normalized –1 to 1
  const cursorY = useMotionValue(0); // normalized –1 to 1

  useEffect(() => {
    const handler = (e) => {
      // Write px values for CSS var consumption (CursorSpotlight)
      document.documentElement.style.setProperty('--cx', e.clientX + 'px');
      document.documentElement.style.setProperty('--cy', e.clientY + 'px');
      // Write normalized values for Framer Motion useTransform consumption
      cursorX.set((e.clientX / window.innerWidth) * 2 - 1);
      cursorY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [cursorX, cursorY]);

  return { cursorX, cursorY };
}
