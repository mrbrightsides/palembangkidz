
import React from 'react';
import LottiePlayer from './LottiePlayer';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-sky-100 flex flex-col items-center justify-center p-6">
      <div className="w-64 h-64 md:w-96 md:h-96">
        {/* Kid-friendly adventure/explorer animation */}
        <LottiePlayer 
<<<<<<< HEAD
          url="https://lottie.host/626d9101-70e1-451e-9243-913495147f20/vL6T9H6w8b.json" 
=======
          url="https://lottie.host/af3a1c6a-605e-4c74-8848-0ca1a86ed1f6/u0t8W3kH6R.json" 
>>>>>>> d4da2c8d353b29bb54ce98aa7985efda437195e6
          className="w-full h-full"
        />
      </div>
      <div className="text-center mt-8 space-y-4">
        <h1 className="text-4xl font-black text-sky-900 tracking-tight">
          Palembang<span className="text-orange-500">Kidz</span>
        </h1>
        <p className="text-sky-600 font-bold text-lg">Siap Jelajah Palembang? 🎒</p>
      </div>
      
      {/* Decorative clay elements */}
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/40 rounded-full animate-float blur-lg" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400/20 rounded-full animate-float blur-lg" style={{animationDelay: '1s'}} />
    </div>
  );
};

export default LoadingScreen;
