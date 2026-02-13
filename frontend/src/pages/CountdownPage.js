import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Trophy, MapPin, Utensils, Music, MessageCircle, FileText, Calendar, Sparkles } from 'lucide-react';
import RetroWindow from '../components/RetroWindow';

const COUNTDOWN_DATA = [
  {
    number: 10,
    title: "Things I Love About You",
    icon: Heart,
    items: [
      "Your infectious laugh that lights up every room",
      "The way you scrunch your nose when you're thinking",
      "Your unwavering kindness to everyone you meet",
      "How passionate you get about your interests",
      "Your beautiful smile that makes my day",
      "The way you always know how to cheer me up",
      "Your incredible sense of humor",
      "How you make even ordinary moments special",
      "Your strength and resilience through challenges",
      "Simply being you - my favorite person"
    ]
  },
  {
    number: 9,
    title: "Accomplishments I'm Proud of You For",
    icon: Trophy,
    items: [
      "Graduating and achieving your dreams",
      "Landing your amazing job",
      "Standing up for what you believe in",
      "Learning that new skill you worked so hard on",
      "Being there for your friends when they needed you",
      "Overcoming that challenge that seemed impossible",
      "Creating something beautiful with your talents",
      "Making a positive difference in someone's life",
      "Never giving up even when things got tough"
    ]
  },
  {
    number: 8,
    title: "Places We Should Go Together",
    icon: MapPin,
    items: [
      "A cozy cabin in the mountains",
      "That beach resort we've been dreaming about",
      "Paris - the city of love",
      "A road trip with no destination",
      "That cute town with the amazing scenery",
      "Japan to see the cherry blossoms",
      "A stargazing trip in the desert",
      "Anywhere, as long as I'm with you"
    ]
  },
  {
    number: 7,
    title: "Dishes We Should Try Together",
    icon: Utensils,
    items: [
      "Homemade pasta from scratch",
      "That fancy restaurant we keep passing by",
      "Street food tour in a new city",
      "Cooking class for a cuisine we've never tried",
      "The most expensive dessert on the menu",
      "A full breakfast in bed spread",
      "That viral recipe everyone's talking about"
    ]
  },
  {
    number: 6,
    title: "Songs That Remind Me of You",
    icon: Music,
    items: [
      "Our song that always makes us dance",
      "That one we heard on our first date",
      "The song playing during our best memory",
      "Your favorite that you sing in the car",
      "The one we both know all the words to",
      "That song that perfectly describes my feelings"
    ]
  },
  {
    number: 5,
    title: "Inside Jokes Only We Understand",
    icon: MessageCircle,
    items: [
      "That thing that happened at dinner that one time",
      "The voice we do when we're being silly",
      "That nickname only I'm allowed to call you",
      "The look we give each other that says everything",
      "That movie quote we overuse constantly"
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
      "The day we first met",
      "Our first adventure together",
      "Today - the day I asked THE question"
    ]
  },
  {
    number: 2,
    title: "Reasons We're Perfect Together",
    icon: Sparkles,
    items: [
      "We make each other better people",
      "Our weirdness is perfectly compatible"
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
                  {slideData.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="list-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="list-number">{idx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
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
