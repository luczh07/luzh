import React from 'react';
import { motion } from 'framer-motion';

export const RetroWindow = ({ title, children, className = '', onClose }) => {
  return (
    <motion.div
      className={`retro-window ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      data-testid="retro-window"
    >
      <div className="retro-window-header">
        <span>{title}</span>
        <div className="retro-window-controls">
          <div className="retro-window-btn minimize" data-testid="window-minimize" />
          <div className="retro-window-btn maximize" data-testid="window-maximize" />
          <div 
            className="retro-window-btn close" 
            onClick={onClose}
            data-testid="window-close"
          />
        </div>
      </div>
      <div className="retro-window-content scanlines">
        {children}
      </div>
    </motion.div>
  );
};

export default RetroWindow;
