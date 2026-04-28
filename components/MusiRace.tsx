
import React, { useState, useEffect, useRef } from 'react';

const MusiRace: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTap, setShowTap] = useState(false);
  const lastTapRef = useRef<number>(0);
  const targetDistance = 1000;

  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(prev => {
        const next = prev + speed;
        if (next >= targetDistance) {
          setIsFinished(true);
          clearInterval(timer);
          return targetDistance;
        }
        return next;
      });
      setSpeed(prev => Math.max(0, prev - 0.1));
      if (speed <= 0) setCombo(0);
    }, 50);
    return () => clearInterval(timer);
  }, [speed]);

  const handlePaddle = () => {
    if (isFinished) return;
    
    const now = Date.now();
    const diff = now - lastTapRef.current;
    
    if (diff < 800 && diff > 150) {
      // SUCCESSFUL TAP
      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
      
      // Only increment combo if rhythmic (300ms-700ms)
      if (diff < 700 && diff > 300) {
        setCombo(c => Math.min(50, c + 1));
        setShowTap(true);
        setTimeout(() => setShowTap(false), 300);
      }
      
      setSpeed(s => Math.min(30, s + 4 + (combo * 0.4)));
    } else {
      // TOO FAST OR TOO SLOW TAP
      if (navigator.vibrate) navigator.vibrate(20);
      // We don't reset combo here anymore, letting the sailboat's speed handle the reset
      setSpeed(s => Math.min(25, s + 1.5));
    }
    lastTapRef.current = now;
  };

  return (
    <div className="fixed inset-0 z-[300] bg-sky-400 flex flex-col items-center justify-center p-6 overflow-hidden">
      <button onClick={onClose} className="absolute top-10 right-10 z-50 w-16 h-16 bg-white/20 rounded-full text-white text-3xl font-black">✕</button>
      
      {/* Game Track */}
      <div className="w-full h-80 relative bg-sky-300 rounded-[4rem] border-8 border-white/30 shadow-2xl overflow-hidden mb-12">
        {/* Animated Water Layers */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-[300%] h-40 bg-sky-400/50 absolute animate-drift opacity-40" />
          <div className="w-[300%] h-20 bg-sky-500/30 absolute bottom-10 animate-drift" style={{ animationDirection: 'reverse' }} />
        </div>

        {/* The Boat */}
        <div 
          className="absolute left-20 bottom-24 transition-transform duration-300"
          style={{ transform: `scale(2) translateY(${Math.sin(distance * 0.1) * 5}px) rotate(${speed * 1.5}deg)` }}
        >
          <div className="relative">
            <span className="text-6xl">🛶</span>
            <div className={`absolute -right-4 top-0 transition-opacity ${speed > 5 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-3xl animate-pulse">💨</span>
            </div>
          </div>
        </div>

        {/* Progress Finish Line */}
        <div 
          className="absolute h-full w-2 bg-yellow-400 right-0 top-0 transition-all"
          style={{ transform: `translateX(${(1 - distance/targetDistance) * 1000}px)` }}
        />
      </div>

      {/* UI Overlay */}
      <div className="text-center space-y-8 z-10">
        <div className="flex gap-12 justify-center">
          <div className="clay-card bg-white p-6 w-40">
            <p className="text-sky-400 font-black text-sm uppercase">Distance</p>
            <p className="text-3xl font-black text-sky-900">{Math.floor(distance)}m</p>
          </div>
          <div className="clay-card bg-white p-6 w-40 relative">
            <p className="text-sky-400 font-black text-sm uppercase">Combo</p>
            <p className="text-3xl font-black text-sky-900">x{combo}</p>
            {showTap && <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl animate-bounce text-white font-black drop-shadow-lg">✨ PERFECT!</div>}
          </div>
        </div>

        <button 
          onClick={handlePaddle}
          className="w-64 h-64 rounded-full bg-orange-500 border-[12px] border-white shadow-[0_20px_0_rgb(194,65,12)] active:translate-y-4 active:shadow-none transition-all flex flex-col items-center justify-center group relative"
        >
          {/* Rhythm Pulse Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/40 animate-ping pointer-events-none" style={{ animationDuration: '0.6s' }} />
          <span className="text-7xl group-active:scale-90 transition">🚣‍♂️</span>
          <span className="text-white font-black text-3xl mt-2">TAP!</span>
        </button>
        
        <p className="text-white font-black text-xl animate-pulse">Rhythmically tap to row faster!</p>
      </div>

      {isFinished && (
        <div className="absolute inset-0 z-50 bg-yellow-400 flex flex-col items-center justify-center p-12 text-center fade-in">
          <h2 className="text-8xl font-black text-white drop-shadow-xl mb-6">WINNER! 🏆</h2>
          <p className="text-4xl font-black text-orange-900 mb-12">You crossed the Musi in record time!</p>
          <button onClick={onClose} className="bg-white text-orange-500 px-16 py-8 rounded-[3rem] text-4xl font-black shadow-2xl hover:scale-110 transition">Back to City</button>
        </div>
      )}
    </div>
  );
};

export default MusiRace;
