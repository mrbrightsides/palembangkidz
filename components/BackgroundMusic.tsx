
import React, { useState, useEffect, useRef } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a whimsical, upbeat royalty-free track suitable for kids' media
    audioRef.current = new Audio('https://loose-gray-hjywktze9m.edgeone.app/gending-sriwijaya.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser. Interaction required."));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 fade-in">
      <div className="clay-card bg-white/80 backdrop-blur-md p-4 flex items-center gap-4 border-b-4 border-sky-100 group transition-all hover:scale-105 shadow-xl">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 ${
            isPlaying ? 'bg-orange-500 text-white' : 'bg-sky-400 text-white'
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <span className="text-xl transform transition-transform group-hover:scale-110">
            {isPlaying ? '⏸' : '▶'}
          </span>
        </button>

        {/* Volume Slider Section */}
        <div className="flex flex-col gap-1 w-24">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black text-sky-900/40 uppercase tracking-tighter">Music</span>
            <span className="text-[10px] font-black text-sky-900/40">{Math.round(volume * 100)}%</span>
          </div>
          <div className="relative h-4 flex items-center">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-sky-100 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all border-2 border-white shadow-inner"
            />
          </div>
        </div>

        {/* Floating Note Icon */}
        <div className={`text-2xl transition-all duration-1000 ${isPlaying ? 'animate-bounce' : 'opacity-40 grayscale'}`}>
          🎵
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;
