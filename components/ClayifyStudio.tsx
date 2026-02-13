
import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import LottiePlayer from './LottiePlayer';

const ClayifyStudio: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isBaking, setIsBaking] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleBake = async () => {
    if (!prompt.trim()) return;
    setIsBaking(true);
    const img = await aiService.generateClayImage(prompt);
    setResultImage(img);
    setIsBaking(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-indigo-900/80 backdrop-blur-xl">
      <div className="clay-card bg-white w-full max-w-2xl p-10 overflow-hidden relative border-b-[12px] border-indigo-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-indigo-300 hover:text-indigo-600 font-black text-2xl">✕</button>
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-indigo-900 flex items-center justify-center gap-3">
            <span className="text-5xl animate-bounce">🔥</span> Clay Magic Studio
          </h2>
          <p className="text-indigo-500 font-bold mt-2">Bake your ideas into real clay masterpieces!</p>
        </div>

        {!resultImage ? (
          <div className="space-y-8">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your magic Palembang idea... (e.g., A chocolate flavored Pempek with wings!)"
                className="w-full h-40 p-6 rounded-[2.5rem] border-4 border-indigo-50 bg-indigo-50/30 text-indigo-900 font-bold text-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none placeholder:text-indigo-200 transition-all shadow-inner"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-3xl">✏️</span>
              </div>
            </div>

            <button
              onClick={handleBake}
              disabled={isBaking || !prompt.trim()}
              className={`w-full py-6 rounded-[2.5rem] font-black text-2xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-4 ${
                isBaking ? 'bg-indigo-100 text-indigo-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isBaking ? (
                <>
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  Baking in the Kiln...
                </>
              ) : (
                <>🔥 Bake My Idea!</>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6 fade-in text-center">
            <div className="relative group">
              <img src={resultImage} alt="Clay Result" className="w-full aspect-square rounded-[3rem] border-8 border-indigo-50 shadow-2xl object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem] pointer-events-none" />
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setResultImage(null)} className="flex-1 py-4 bg-indigo-100 text-indigo-600 rounded-full font-black text-lg hover:bg-indigo-200 transition">Bake Another!</button>
              <button 
                onClick={() => {
                   const link = document.createElement('a');
                   link.href = resultImage;
                   link.download = 'my-clay-creation.png';
                   link.click();
                }}
                className="flex-1 py-4 bg-emerald-500 text-white rounded-full font-black text-lg hover:bg-emerald-600 transition shadow-lg"
              >
                💾 Save to Gallery
              </button>
            </div>
          </div>
        )}

        {isBaking && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
             <div className="w-64 h-64">
               <LottiePlayer url="https://lottie.host/9e4d5884-6997-4007-96a1-633005a76953/6pW6O5ZOnA.json" className="w-full h-full" />
             </div>
             <p className="text-2xl font-black text-indigo-600 animate-pulse mt-4">Mixing the clay... ✨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClayifyStudio;
