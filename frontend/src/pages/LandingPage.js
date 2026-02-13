import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import RetroWindow from '../components/RetroWindow';
import FloatingHeart from '../components/FloatingHeart';

const CLICKS_REQUIRED = 20;

export const LandingPage = ({ onEnter }) => {
  const [clicks, setClicks] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleHeartClick = useCallback((e) => {
    if (isUnlocked) return;

    const newClick = clicks + 1;
    setClicks(newClick);

    // Spawn floating heart at click position
    const heartId = Date.now() + Math.random();
    const colors = ['#FF007F', '#FF69B4', '#BD00FF', '#00FFFF', '#CCFF00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setFloatingHearts(prev => [...prev, {
      id: heartId,
      x: e.clientX - 15,
      y: e.clientY - 15,
      color: randomColor,
    }]);

    // Remove heart after animation
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== heartId));
    }, 2000);

    if (newClick >= CLICKS_REQUIRED) {
      setIsUnlocked(true);
    }
  }, [clicks, isUnlocked]);

  const progressPercent = Math.min((clicks / CLICKS_REQUIRED) * 100, 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" data-testid="landing-page">
      <RetroWindow title="heart_blaster.exe" className="w-full max-w-lg">
        <div className="flex flex-col items-center gap-6 py-8">
          {/* Title */}
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-center glitch-text"
            style={{ fontFamily: 'Orbitron, sans-serif', color: '#FF007F' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            CLICK THE HEART
          </motion.h1>
          
          <p className="text-white text-center" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Charge it up to unlock your surprise!
          </p>

          {/* Main Heart Button */}
          <motion.div
            className="main-heart cursor-pointer"
            onClick={handleHeartClick}
            whileTap={{ scale: 0.9 }}
            data-testid="main-heart-button"
            style={{ animation: 'none' }}
          >
            <Heart
              size={200}
              fill={`hsl(${330 + (progressPercent * 0.3)}, 100%, ${50 + progressPercent * 0.2}%)`}
              color="#FF007F"
              strokeWidth={1}
              style={{
                filter: `drop-shadow(0 0 ${10 + progressPercent * 0.5}px #FF007F) drop-shadow(0 0 ${20 + progressPercent}px #FF69B4)`,
              }}
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs">
            <div className="progress-bar-y2k" data-testid="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-center mt-2" style={{ fontFamily: 'VT323, monospace', color: '#00FFFF', fontSize: '18px' }}>
              {clicks} / {CLICKS_REQUIRED} CLICKS
            </p>
          </div>

          {/* Enter Button */}
          <AnimatePresence>
            {isUnlocked && (
              <motion.button
                className="y2k-button mt-4"
                onClick={onEnter}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-testid="enter-button"
              >
                ENTER THE EXPERIENCE
              </motion.button>
            )}
          </AnimatePresence>

          {!isUnlocked && (
            <p className="text-sm text-center" style={{ fontFamily: 'Fredoka, sans-serif', color: '#FF69B4' }}>
              Keep clicking! You're doing great!
            </p>
          )}
        </div>
      </RetroWindow>

      {/* Floating Hearts */}
      <AnimatePresence>
        {floatingHearts.map(heart => (
          <FloatingHeart key={heart.id} x={heart.x} y={heart.y} color={heart.color} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
