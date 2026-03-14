// src/components/GlassCard.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../utils/cn';

const GlassCard = ({ children, className, delay = 0, ...props }) => {
  const ref = useRef(null);

  // Spec: useSpring(useMotionValue(0)) with direct .set() — NOT useTransform chain
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function onMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -12); // –12° to +12°
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 12);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'glass p-6 relative group',
        'hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] transition-colors duration-300',
        className
      )}
      {...props}
    >
      {/* Glass reflection layer — uses glass-highlight token */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(105deg, var(--color-glass-highlight) 0%, transparent 60%)',
        }}
      />
      {children}
    </motion.div>
  );
};

export default GlassCard;
