import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [status, setStatus] = useState('Scanning aura...');

  useEffect(() => {
    const statuses = [
      'Aligning your chakras...',
      'Analyzing digital footprint...',
      'Calculating unhinged energy...',
      'Judging your Spotify Wrapped...',
      'Consulting the algorithm...',
      'Finalizing your roast...',
      'Vibe check almost complete...'
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setStatus(statuses[currentIndex]);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-12">
        {/* Glow effect behind loader */}
        <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 rounded-full pulse-slow scale-150"></div>
        <Loader2 size={64} className="text-purple-400 animate-spin relative z-10" />
      </div>
      
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4 h-8 animate-pulse text-center">
        {status}
      </h2>

      {/* Ad Banner Container - Tactic 1 Monetization */}
      <div className="mt-auto w-full">
        <p className="text-xs text-gray-600 text-center mb-2 uppercase tracking-widest">Advertisement</p>
        <div 
          id="ad-banner-container" 
          className="w-full h-[50px] bg-white/5 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <span className="text-gray-500 text-sm">Ad Slot (320x50)</span>
          {/* Monetag/AdMaven scripts would be inserted here */}
        </div>
      </div>
    </div>
  );
};
