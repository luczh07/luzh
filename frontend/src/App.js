import React, { useState } from 'react';
import './App.css';
import StarField from './components/StarField';
import Marquee from './components/Marquee';
import LandingPage from './pages/LandingPage';
import CountdownPage from './pages/CountdownPage';
import ProposalPage from './pages/ProposalPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleEnterExperience = () => {
    setCurrentPage('countdown');
  };

  const handleCountdownComplete = () => {
    setCurrentPage('proposal');
  };

  return (
    <div className="App" data-testid="app-container">
      {/* Background star field */}
      <StarField />

      {/* Main content */}
      <div className="relative z-10">
        {currentPage === 'landing' && (
          <LandingPage onEnter={handleEnterExperience} />
        )}
        {currentPage === 'countdown' && (
          <CountdownPage onComplete={handleCountdownComplete} />
        )}
        {currentPage === 'proposal' && (
          <ProposalPage />
        )}
      </div>

      {/* Bottom marquee */}
      <Marquee />
    </div>
  );
}

export default App;
