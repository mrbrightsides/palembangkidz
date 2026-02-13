
import React from 'react';
import LottiePlayer from './LottiePlayer';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-sky-100 flex flex-col items-center justify-center p-6">
      <div className="w-64 h-64 md:w-96 md:h-96">
        {/* A whimsical bouncing/floating animation */}
        <LottiePlayer 
          url="https://assets2.lottiefiles.com/packages/lf20_m6cuL6.json" 
          className="w-full h-full"
        />
      </div>
      <div className="text-center mt-8 space-y-4">
        <h1 className="text-4xl font-black text-sky-900 tracking-tight animate-pulse">
          Palembang<span className="text-yellow-500">Kidz</span>
        </h1>
        <p className="text-sky-600 font-bold text-lg">Preparing the magic... ✨</p>
      </div>
      
      {/* Decorative clay elements */}
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/40 rounded-full animate-float blur-lg" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400/20 rounded-full animate-float blur-lg" style={{animationDelay: '1s'}} />
    </div>
  );
};

export default LoadingScreen;
