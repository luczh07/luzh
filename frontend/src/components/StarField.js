import React, { useEffect, useState } from 'react';

export const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 1,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="star-field" data-testid="star-field">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            background: Math.random() > 0.7 ? '#FF69B4' : '#FFFFFF',
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
