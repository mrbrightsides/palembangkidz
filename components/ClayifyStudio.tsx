
import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import LottiePlayer from './LottiePlayer';
import { audioService } from '../services/audioService';

const SUGGESTIONS = [
  "Ampera Bridge at sunset with golden clouds",
  "Floating market with colorful boats on the Musi River",
  "An ancient Srivijaya palace garden with tropical flowers",
  "A cozy traditional kitchen full of Pempek",
  "A festive street decorated for the Bidar boat race",
  "A mystical Kemaro Island with a giant Pagoda"
];

const ClayifyStudio: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isBaking, setIsBaking] = useState(false);
  const [isBakingBg, setIsBakingBg] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);

  const handleBake = async () => {
    if (!prompt.trim()) return;
    if (navigator.vibrate) navigator.vibrate(20);
    setIsBaking(true);
    const img = await aiService.generateClayImage(prompt);
    setResultImage(img);
    setIsBaking(false);
    audioService.playEffect('success');
  };

  const handleBakeBackground = async () => {
    if (!prompt.trim()) return;
    if (navigator.vibrate) navigator.vibrate(20);
    setIsBakingBg(true);
    
    // Enhanced prompt following visual_direction.md strictly
    const bgPrompt = `A high-detail 3D claymation background scene of ${prompt} in Palembang, Indonesia. Whimsical and friendly style, soft studio lighting with warm morning vibes. Color palette: Palembang Gold (#facc15), Heritage Crimson (#ef4444), and vibrant sky blue. Matte clay textures with rounded corners, wide shot, cinematic depth of field, Octane render, masterpiece quality.`;
    
    const img = await aiService.generateClayImage(bgPrompt);
    setBgImage(img);
    setIsBakingBg(false);
    audioService.playEffect('success');
  };

  const useSuggestion = (text: string) => {
    setPrompt(text);
    if (navigator.vibrate) navigator.vibrate(10);
    audioService.playEffect('pop');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-indigo-900/80 backdrop-blur-xl">
      <div className="clay-card bg-white w-full max-w-2xl p-10 overflow-hidden relative border-b-[12px] border-indigo-200 max-h-[90vh] flex flex-col">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-indigo-300 hover:text-indigo-600 font-black text-2xl z-10"
        >
          ✕
        </button>
        
        <div className="text-center mb-6 shrink-0">
          <h2 className="text-4xl font-black text-indigo-900 flex items-center justify-center gap-3">
            <span className="text-5xl animate-bounce">🔥</span> Clay Magic Studio
          </h2>
          <p className="text-indigo-500 font-bold mt-2">Bake your ideas into real clay masterpieces!</p>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 px-2">
          {!resultImage && !bgImage ? (
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your magic Palembang idea... (e.g., A chocolate flavored Pempek with wings!)"
                  className="w-full h-32 p-6 rounded-[2.5rem] border-4 border-indigo-50 bg-indigo-50/30 text-indigo-900 font-bold text-xl focus:ring-4 focus:ring-indigo-200 focus:outline-none placeholder:text-indigo-200 transition-all shadow-inner resize-none"
                />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-2xl">✏️</span>
                </div>
              </div>

              {/* Magic Suggestions Chips */}
              <div className="space-y-3">
                <p className="text-xs font-black text-indigo-300 uppercase tracking-widest ml-4">✨ Need a magic idea?</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => useSuggestion(s)}
                      className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black hover:bg-indigo-600 hover:text-white transition-all border-2 border-indigo-100 shadow-sm active:scale-95"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={handleBake}
                  disabled={isBaking || isBakingBg || !prompt.trim()}
                  className={`w-full py-6 rounded-[2.5rem] font-black text-2xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-4 ${
                    isBaking ? 'bg-indigo-100 text-indigo-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isBaking ? (
                    <>
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      Baking Object...
                    </>
                  ) : (
                    <>🔥 Bake Main Object!</>
                  )}
                </button>
                
                <button
                  onClick={handleBakeBackground}
                  disabled={isBakingBg || isBaking || !prompt.trim()}
                  className={`w-full py-4 rounded-[2rem] font-black text-xl shadow-md border-4 border-indigo-100 transform transition-all active:scale-95 flex items-center justify-center gap-4 ${
                    isBakingBg ? 'bg-indigo-50 text-indigo-200' : 'bg-white text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {isBakingBg ? (
                    <>
                      <div className="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                      Baking Scene...
                    </>
                  ) : (
                    <>🖼️ Bake Background Scene</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 fade-in text-center pb-6">
              <div className="relative group aspect-square rounded-[3rem] border-8 border-indigo-50 shadow-2xl overflow-hidden bg-indigo-50 mx-auto max-w-[400px]">
                {bgImage && (
                  <img src={bgImage} alt="Clay Background" className={`absolute inset-0 w-full h-full object-cover ${resultImage ? 'blur-[2px] opacity-80' : 'opacity-100'} transition-all duration-700`} />
                )}
                {resultImage && (
                  <img src={resultImage} alt="Clay Object" className="relative z-10 w-full h-full object-contain scale-90 drop-shadow-2xl animate-float" />
                )}
                
                {!resultImage && bgImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-indigo-900/10">
                     <p className="text-white font-black bg-indigo-600/80 px-4 py-2 rounded-full text-sm shadow-lg">Background ready! Now bake an object.</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => { setResultImage(null); setBgImage(null); }} 
                  className="px-8 py-4 bg-indigo-100 text-indigo-600 rounded-full font-black text-lg hover:bg-indigo-200 transition shadow-sm"
                >
                  Bake Another!
                </button>
                
                {!resultImage && bgImage && (
                  <button 
                    onClick={handleBake} 
                    className="px-8 py-4 bg-indigo-600 text-white rounded-full font-black text-lg hover:bg-indigo-700 transition shadow-lg active:scale-95"
                  >
                    Add Object ✨
                  </button>
                )}
                
                {(resultImage || bgImage) && (
                  <button 
                    onClick={() => {
                      const canvas = document.createElement('canvas');
                      canvas.width = 1024;
                      canvas.height = 1024;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        const draw = (src: string) => new Promise(resolve => {
                          const img = new Image();
                          img.crossOrigin = "anonymous";
                          img.onload = () => { ctx.drawImage(img, 0, 0, 1024, 1024); resolve(true); };
                          img.src = src;
                        });
                        
                        (async () => {
                          if (bgImage) await draw(bgImage);
                          if (resultImage) await draw(resultImage);
                          const link = document.createElement('a');
                          link.href = canvas.toDataURL();
                          link.download = `palembang-clay-${Date.now()}.png`;
                          link.click();
                          audioService.playEffect('success');
                        })();
                      }
                    }}
                    className="px-8 py-4 bg-emerald-500 text-white rounded-full font-black text-lg hover:bg-emerald-600 transition shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <span>💾</span> Save Masterpiece
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {(isBaking || isBakingBg) && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-[2.5rem]">
             <div className="w-64 h-64">
               <LottiePlayer url="https://lottie.host/9e4d5884-6997-4007-96a1-633005a76953/6pW6O5ZOnA.json" className="w-full h-full" />
             </div>
             <div className="text-center space-y-2 mt-4">
               <p className="text-2xl font-black text-indigo-600 animate-pulse">Mixing the clay... ✨</p>
               <p className="text-sm font-bold text-indigo-300">Adding some Palembang magic!</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClayifyStudio;
