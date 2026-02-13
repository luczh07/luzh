import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FloatingHeart = ({ x, y, color = '#FF007F' }) => {
  return (
    <motion.div
      className="floating-heart"
      initial={{ x, y, scale: 1, opacity: 1 }}
      animate={{
        y: y - 200,
        scale: 0.5,
        opacity: 0,
        rotate: Math.random() * 60 - 30,
      }}
      transition={{ duration: 2, ease: 'easeOut' }}
      style={{ position: 'fixed', zIndex: 100, pointerEvents: 'none' }}
    >
      <Heart fill={color} color={color} size={30} />
    </motion.div>
  );
};

export default FloatingHeart;
