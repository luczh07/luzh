import React from 'react';

export const Marquee = () => {
  const text = "HAPPY VALENTINES DAY ANNA <3 ";
  const repeatedText = text.repeat(10);

  return (
    <div className="marquee-container fixed bottom-0 left-0 right-0 z-50" data-testid="marquee">
      <div className="marquee-content" style={{ fontFamily: 'VT323, monospace', fontSize: '20px', color: 'white' }}>
        {repeatedText}{repeatedText}
      </div>
    </div>
  );
};

export default Marquee;
