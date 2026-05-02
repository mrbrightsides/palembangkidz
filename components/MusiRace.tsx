
import React, { useState, useEffect, useRef } from 'react';

const MusiRace: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [level, setLevel] = useState(1);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTap, setShowTap] = useState(false);
  const lastTapRef = useRef<number>(0);
  const targetDistance = 500 + (level * 500);

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
      // Friction: Boat slows down over time
      setSpeed(prev => Math.max(0, prev - (0.05 + (level * 0.02))));
      
      // Reset combo if speed drops too low
      if (speed < 0.5) setCombo(0);
    }, 50);
    return () => clearInterval(timer);
  }, [speed, level, targetDistance]);

  const handlePaddle = () => {
    if (isFinished) return;
    
    const now = Date.now();
    const diff = now - lastTapRef.current;
    
    // Rhythm Detection (250ms to 650ms is the sweet spot)
    const isPerfect = diff < 650 && diff > 250;
    const isTooFast = diff < 250;

    if (isTooFast) {
      // Penalty for spamming
      setCombo(0);
      setSpeed(s => Math.max(0, s - 2));
      if (navigator.vibrate) navigator.vibrate(100);
      return;
    }

    if (isPerfect) {
      // SUCCESSFUL RHYTHMIC TAP
      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
      setCombo(c => Math.min(100, c + 1));
      setShowTap(true);
      setTimeout(() => setShowTap(false), 200);
      
      // Speed boost scales with combo
      const comboBonus = combo * 0.5;
      setSpeed(s => Math.min(40 + level * 5, s + 5 + comboBonus));
    } else {
      // STANDARD TAP (Out of rhythm)
      if (navigator.vibrate) navigator.vibrate(20);
      setCombo(0);
      setSpeed(s => Math.min(25, s + 2));
    }
    lastTapRef.current = now;
  };

  const nextLevel = () => {
    setLevel(l => l + 1);
    setDistance(0);
    setSpeed(0);
    setCombo(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-[300] bg-sky-400 flex flex-col items-center justify-center p-6 overflow-hidden">
      <button onClick={onClose} className="absolute top-10 right-10 z-50 w-16 h-16 bg-white/20 rounded-full text-white text-3xl font-black hover:bg-red-500 transition-colors">✕</button>
      
      {/* Level Badge */}
      <div className="absolute top-10 left-10 bg-white/90 px-8 py-4 rounded-[2rem] shadow-xl border-4 border-sky-600">
        <p className="text-sky-600 font-black text-sm uppercase">Race Level</p>
        <p className="text-3xl font-black text-sky-900">{level}</p>
      </div>
      
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
              <span className={`text-3xl animate-pulse ${combo > 5 ? 'text-orange-500' : ''}`}>
                {combo > 10 ? '⚡️⚡️' : '💨'}
              </span>
            </div>
            {combo > 0 && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-sky-900 px-3 py-1 rounded-full text-xs font-black shadow-lg animate-bounce border-2 border-sky-400">
                x{combo}
              </div>
            )}
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
        <p className="text-sky-100/60 text-sm font-bold">(Don't tap too fast or you'll lose your combo!)</p>
      </div>

      {isFinished && (
        <div className="absolute inset-0 z-50 bg-yellow-400 flex flex-col items-center justify-center p-12 text-center fade-in backdrop-blur-xl">
          <div className="bg-white p-12 rounded-[4rem] shadow-2xl border-[12px] border-yellow-500 max-w-2xl w-full">
            <h2 className="text-8xl font-black text-yellow-500 drop-shadow-xl mb-4">GOAL! 🏁</h2>
            <p className="text-4xl font-black text-sky-900 mb-2">Race #{level} Complete!</p>
            <p className="text-xl font-bold text-sky-700/60 mb-12">You're becoming a Musi River Legend!</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={nextLevel} 
                className="bg-sky-500 text-white px-12 py-6 rounded-[2.5rem] text-3xl font-black shadow-[0_10px_0_rgb(14,165,233)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-4"
              >
                <span>Next Race</span>
                <span className="text-2xl">➡</span>
              </button>
              <button 
                onClick={onClose} 
                className="bg-white text-sky-900 px-12 py-6 rounded-[2.5rem] text-3xl font-black shadow-[0_10px_0_rgb(203,213,225)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
              >
                Back Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusiRace;
