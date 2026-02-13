import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import RetroWindow from '../components/RetroWindow';

export const ProposalPage = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const fireConfetti = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF007F', '#FF69B4', '#BD00FF', '#00FFFF', '#CCFF00', '#FFFFFF'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF007F', '#FF69B4', '#BD00FF', '#00FFFF', '#CCFF00', '#FFFFFF'],
      });
    }, 250);
  };

  const handleYes = () => {
    setAccepted(true);
    fireConfetti();
  };

  const handleNoHover = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const maxX = rect.width - 150;
    const maxY = rect.height - 60;

    setNoButtonPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
  }, []);

  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pb-20" data-testid="proposal-accepted">
        <RetroWindow title="celebration.exe" className="w-full max-w-xl">
          <div className="flex flex-col items-center gap-6 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Heart size={150} fill="#FF007F" color="#FF007F" className="pulse-heart" />
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl font-bold neon-glow"
              style={{ fontFamily: 'Orbitron, sans-serif', color: '#FF007F' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              YAAAAY!
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl"
              style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFFFFF' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I knew you'd say yes! 
            </motion.p>

            <motion.p
              className="text-lg"
              style={{ fontFamily: 'Fredoka, sans-serif', color: '#00FFFF' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Happy Valentine's Day, Anna!
            </motion.p>

            <motion.div
              className="flex gap-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                >
                  <Heart size={30} fill="#FF69B4" color="#FF69B4" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </RetroWindow>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4 pb-20 relative"
      data-testid="proposal-page"
    >
      <RetroWindow title="the_big_question.exe" className="w-full max-w-xl">
        <div className="flex flex-col items-center gap-8 py-12 text-center relative" style={{ minHeight: '400px' }}>
          {/* Decorative hearts */}
          <div className="absolute top-4 left-4">
            <Sparkles size={24} color="#CCFF00" className="float" />
          </div>
          <div className="absolute top-4 right-4">
            <Sparkles size={24} color="#00FFFF" className="float" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Main heart */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart size={100} fill="#FF007F" color="#FF007F" />
          </motion.div>

          {/* The Question */}
          <motion.h1
            className="text-2xl md:text-4xl font-bold glitch-text"
            style={{ fontFamily: 'Orbitron, sans-serif', color: '#FF007F' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Anna...
          </motion.h1>

          <motion.h2
            className="text-xl md:text-3xl"
            style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFFFFF' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Will you be my Valentine?
          </motion.h2>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-8 mt-6 relative w-full" style={{ minHeight: '150px' }}>
            {/* YES Button */}
            <motion.button
              className="yes-button"
              onClick={handleYes}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              data-testid="yes-button"
            >
              YES!
            </motion.button>

            {/* NO Button - runs away */}
            <motion.button
              className="no-button"
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              data-testid="no-button"
            >
              no...
            </motion.button>
          </div>
        </div>
      </RetroWindow>
    </div>
  );
};

export default ProposalPage;
