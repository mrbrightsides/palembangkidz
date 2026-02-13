
import React, { useState } from 'react';

const SoundscapeMixer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [levels, setLevels] = useState({
    river: 30,
    gamelan: 0,
    market: 0,
    forest: 20
  });

  const sounds = [
    { id: 'river', name: 'Musi Water', icon: '🌊', color: 'bg-sky-400' },
    { id: 'gamelan', name: 'Gamelan', icon: '🥁', color: 'bg-yellow-400' },
    { id: 'market', name: '16 Ilir Market', icon: '🏙️', color: 'bg-orange-500' },
    { id: 'forest', name: 'Nature', icon: '🌳', color: 'bg-emerald-500' }
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-[100] w-96 bg-white/95 backdrop-blur-xl shadow-[-20px_0_60px_rgba(0,0,0,0.1)] border-l-8 border-sky-100 p-10 flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-sky-900">Sound Mixer</h2>
        <button onClick={onClose} className="text-sky-300 font-black text-2xl">✕</button>
      </div>

      <div className="space-y-10 flex-1">
        {sounds.map(s => (
          <div key={s.id} className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-black text-sky-900">{s.name}</span>
              </div>
              <span className="text-xs font-black text-sky-300">{levels[s.id as keyof typeof levels]}%</span>
            </div>
            <input 
              type="range"
              min="0"
              max="100"
              value={levels[s.id as keyof typeof levels]}
              onChange={(e) => setLevels(prev => ({ ...prev, [s.id]: parseInt(e.target.value) }))}
              className={`w-full h-8 appearance-none rounded-full cursor-pointer border-4 border-white shadow-inner ${s.color}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 bg-sky-50 p-6 rounded-[2rem] border-2 border-sky-100">
        <p className="text-sky-800 font-bold text-center italic">"Mix the sounds of the city to help you focus or play!"</p>
      </div>
    </div>
  );
};

export default SoundscapeMixer;
