import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const GlassCard = ({ children, className, hover = true, delay = 0, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { y: -5, scale: 1.02, transition: { duration: 0.2 } } : {}}
            className={cn(
                "glass p-6 relative overflow-hidden group",
                hover && "hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Neon glow effect on hover */}
            {hover && (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-blue)]/5 to-[var(--color-neon-purple)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
            {children}
        </motion.div>
    );
};

export default GlassCard;
