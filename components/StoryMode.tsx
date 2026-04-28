
import React, { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { audioService } from '../services/audioService';
import { Language, StorySegment } from '../types';
import { VOICE_AVATARS } from '../constants';
import LottiePlayer from './LottiePlayer';

const StoryMode: React.FC<{ lang: Language, onClose: () => void }> = ({ lang, onClose }) => {
  const [segment, setSegment] = useState<StorySegment | null>(null);
  const [loading, setLoading] = useState(true);
  const [visualUrl, setVisualUrl] = useState<string | null>(null);

  const loadSegment = async (promptText: string) => {
    setLoading(true);
    try {
      const data = await aiService.getStorySegment(promptText, lang);
      setSegment(data);
      audioService.speak(data.text, 'Zephyr');
      
      // Load image in background
      aiService.generateClayImage(data.visualPrompt).then(img => {
        setVisualUrl(img);
        setLoading(false);
      }).catch(() => setLoading(false));

    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSegment("Start a magical journey exploring Palembang culture for a child.");
  }, []);

  if (loading && !segment) {
    return (
      <div className="fixed inset-0 z-[300] bg-pink-900/90 backdrop-blur-xl flex flex-col items-center justify-center p-6">
        <div className="w-64 h-64"><LottiePlayer url="https://lottie.host/626d9101-70e1-451e-9243-913495147f20/vL6T9H6w8b.json" className="w-full h-full" /></div>
        <p className="text-3xl font-black text-white animate-pulse">Writing the legends... 📜</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[250] bg-pink-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="max-w-5xl w-full h-full flex flex-col gap-8 relative">
        <button onClick={onClose} className="absolute -top-4 -right-4 z-50 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-500 font-black shadow-lg hover:bg-red-500 hover:text-white transition-all">✕</button>

        {/* Visual Scene */}
        <div className="relative flex-1 bg-pink-900/40 rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-inner flex items-center justify-center">
          {loading ? (
             <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-white/40 font-black">Baking the scene...</p>
             </div>
          ) : visualUrl && (
            <img src={visualUrl} className="w-full h-full object-cover fade-in" alt="Scene" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent" />
          
          {/* Zephyr Portrait */}
          <div className={`absolute bottom-6 left-10 flex items-center gap-6 transition-all duration-700 ${loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl bg-white overflow-hidden relative">
              <img src={VOICE_AVATARS.Zephyr.img} className="w-full h-full scale-110" alt="Zephyr" />
              <div className="absolute inset-0 bg-sky-400/10" />
            </div>
            <div className="bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border-4 border-pink-100 max-w-lg relative animate-clay-jerky">
              <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-l-4 border-b-4 border-pink-100" />
              <p className="text-xl font-black text-pink-900 leading-tight italic tracking-tight">
                "{segment?.text}"
              </p>
            </div>
          </div>
        </div>

        {/* Choices */}
        <div className="h-48 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && segment?.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => loadSegment(choice.nextPrompt)}
              className="bg-white p-6 rounded-[2rem] border-b-[10px] border-pink-100 flex items-center justify-center text-center font-black text-xl text-pink-900 shadow-xl hover:-translate-y-2 hover:bg-pink-50 transition-all active:translate-y-2 active:border-b-0"
            >
              {choice.text} ➔
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryMode;
