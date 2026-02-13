import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Trophy, MapPin, Utensils, Music, Brain, FileText, Calendar, Sparkles } from 'lucide-react';
import RetroWindow from '../components/RetroWindow';

// ITEMS CAN BE STRINGS OR OBJECTS WITH { text, image } 
// Example: "Simple text" OR { text: "Item with image", image: "https://your-image-url.jpg" }

const COUNTDOWN_DATA = [
  {
    number: 10,
    title: "Things I Love About You",
    icon: Heart,
    items: [
      "Your infectious laugh that lights up the room",
      "The way you scrunch your eyebrows when you're thinking",
      "Your kindness to everyone you meet",
      "How passionate you get about fasion",
      "Your beautiful smile that makes my day",
      "The way you always know how to cheer me up",
      "Your incredible sense of humor",
      "How you start singing random songs at random times",
      "Your desire to make things very over the top",
      "Simply being you - you are my favorite person"
    ]
  },
  {
    number: 9,
    title: "Accomplishments I'm Proud of You For",
    icon: Trophy,
    items: [
      "Graduating with me",
      "Getting into BARNARD COLLEGE at Columbia University in NEW YORK CITY",
      "Launching your fashion brand",
      "Surviving your "Nights Out"",
      "Curating your instagram feed",
      "Making supportive friends",
      "Getting into clubs like HOOT Mag and CUIIN",
      "Not getting lost in the city ",
      "2/14/2025 fashion show"
    ]
  },
  {
    number: 8,
    title: "Places We Should Go Together",
    icon: MapPin,
    // ADD YOUR IMAGES HERE - use { text: "...", image: "URL" } format
    items: [
      { text: "Iceland trip", image: "" },
      { text: "A beach at the South of France", image: "" },
      { text: "Paris - the city of love", image: "" },
      { text: "A road trip to the pacific northwest", image: "" },
      { text: "Uptown New York to see the foliage", image: "" },
      { text: "The cabin in Canada", image: "" },
      { text: "A stargazing trip in the desert", image: "" },
      { text: "Anywhere, as long as I'm with you", image: "" }
    ]
  },
  {
    number: 7,
    title: "Dishes We Should Try to Cook Together",
    icon: Utensils,
    // ADD YOUR IMAGES HERE
    items: [
      { text: "Homemade pasta from scratch", image: "" },
      { text: "STEAK", image: "" },
      { text: "Brussel Sprouts because they're your favorite", image: "" },
      { text: "The rattatouille one", image: "" },
      { text: "A snack with lots of MATCHA", image: "" },
      { text: "Homemade acocado toast", image: "" },
      { text: "Fried Chicken", image: "" }
    ]
  },
  {
    number: 6,
    title: "Songs That Remind Me of You",
    icon: Music,
    // ADD YOUR IMAGES HERE
    items: [
      { text: "Invisibile String - TS", image: "" },
      { text: "Buses Replace Trains - Matt Maltese", image: "" },
      { text: "Starry Eyes - Cigarettes After SEX", image: "" },
      { text: "About You - The 1975", image: "" },
      { text: "Kiss of Life - Sade", image: "" },
      { text: "No Other Way - Jack Johnson", image: "" }
    ]
  },
  {
    number: 5,
    title: "Moments I replay in my head",
    icon: Brain,
    // ADD YOUR IMAGES HERE
    items: [
      { text: "When I took photos of you at Prom", image: "" },
      { text: "LA", image: "" },
      { text: "That first hug after I got off the flight in NYC", image: "" },
      { text: "Driving down Newport Coast Drive to our playlist", image: "" },
      { text: "Everytime we hug", image: "" }
    ]
  },
  {
    number: 4,
    title: "Promises I Make to You",
    icon: FileText,
    items: [
      "To always make you laugh (even with bad jokes)",
      "To be your biggest supporter in everything",
      "To hold your hand through the hard times",
      "To celebrate every small victory with you"
    ]
  },
  {
    number: 3,
    title: "Dates to Remember",
    icon: Calendar,
    items: [
      "The Date I asked you to be my GF",
      "4/6",
      "Today - the day I asked THE question"
    ]
  },
  {
    number: 2,
    title: "2 people",
    icon: Sparkles,
    // ADD YOUR IMAGES HERE
    items: [
      { text: "You", image: "" },
      { text: "Me", image: "" }
    ]
  },
  {
    number: 1,
    title: "One Question...",
    icon: Heart,
    items: [
      "Keep going to find out..."
    ]
  }
];

export const CountdownPage = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideData = COUNTDOWN_DATA[currentSlide];
  const Icon = slideData.icon;

  const nextSlide = () => {
    if (currentSlide < COUNTDOWN_DATA.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Helper to get text from item (handles both string and object)
  const getItemText = (item) => typeof item === 'string' ? item : item.text;
  const getItemImage = (item) => typeof item === 'object' ? item.image : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-20" data-testid="countdown-page">
      <div className="w-full max-w-2xl">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <motion.button
            className="nav-arrow"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-testid="prev-button"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex gap-2">
            {COUNTDOWN_DATA.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'bg-pink-500 scale-125'
                    : idx < currentSlide
                    ? 'bg-purple-500'
                    : 'bg-gray-600'
                }`}
                style={{
                  boxShadow: idx === currentSlide ? '0 0 10px #FF007F' : 'none'
                }}
              />
            ))}
          </div>

          <motion.button
            className="nav-arrow"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-testid="next-button"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <RetroWindow title={`slide_${slideData.number}.exe`}>
              <div className="slide-container">
                {/* Big Number */}
                <motion.div
                  className="countdown-number"
                  key={`number-${slideData.number}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  data-testid="countdown-number"
                >
                  {slideData.number}
                </motion.div>

                {/* Title with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <Icon size={32} color="#FF007F" />
                  <h2
                    className="text-xl md:text-2xl text-white"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {slideData.title}
                  </h2>
                </div>

                {/* Items List */}
                <div className="w-full max-w-md">
                  {slideData.items.map((item, idx) => {
                    const itemImage = getItemImage(item);
                    const itemText = getItemText(item);
                    
                    return (
                      <motion.div
                        key={idx}
                        className="list-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ 
                          flexDirection: itemImage ? 'column' : 'row',
                          alignItems: itemImage ? 'flex-start' : 'center'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="list-number">{idx + 1}</span>
                          <span>{itemText}</span>
                        </div>
                        {itemImage && (
                          <motion.img
                            src={itemImage}
                            alt={itemText}
                            className="mt-3 rounded-lg w-full max-h-40 object-cover"
                            style={{ 
                              border: '2px solid #FF007F',
                              boxShadow: '0 0 10px rgba(255, 0, 127, 0.3)'
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 + 0.2 }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Next hint for last slide */}
                {currentSlide === COUNTDOWN_DATA.length - 1 && (
                  <motion.p
                    className="mt-6 text-lg"
                    style={{ fontFamily: 'Fredoka, sans-serif', color: '#00FFFF' }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Click next to see what's waiting for you...
                  </motion.p>
                )}
              </div>
            </RetroWindow>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CountdownPage;
