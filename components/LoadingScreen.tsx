
import React, { useState, useEffect, useRef } from 'react';
import { aiService } from '../services/aiService';
import { audioService } from '../services/audioService';
import { Difference, Language } from '../types';
import LottiePlayer from './LottiePlayer';

const FindDifference: React.FC<{ lang: Language, onClose: () => void }> = ({ lang, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<{ base: string, modified: string } | null>(null);
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const topics = ["Ampera Bridge", "Pempek Shop", "River Market", "Songket Weaver", "Srivijaya Palace"];

  const loadNewGame = async () => {
    setLoading(true);
    setIsFinished(false);
    setScore(0);
    setTimer(60);
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const data = await aiService.generateDifferenceSet(randomTopic);
    setImages({ base: data.base, modified: data.modified });
    setDifferences(data.differences);
    setLoading(false);
  };

  useEffect(() => {
    loadNewGame();
  }, []);

  useEffect(() => {
    if (loading || isFinished || timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [loading, isFinished, timer]);

  useEffect(() => {
    if (timer <= 0 && !isFinished) {
      setIsFinished(true);
      audioService.playEffect('whoosh');
    }
  }, [timer, isFinished]);

  const handleTap = (e: React.MouseEvent, type: 'base' | 'modified') => {
    if (isFinished || loading) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Create temporary tap ripple
    const ripple = document.createElement('div');
    ripple.className = 'absolute w-12 h-12 border-4 border-white/50 rounded-full animate-ping pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-xl';
    ripple.style.left = `${x}%`;
    ripple.style.top = `${y}%`;
    e.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    const threshold = 15; // Increased radius for easier tapping
    const foundIdx = differences.findIndex(d => 
      !d.found && 
      Math.abs(d.x - x) < threshold && 
      Math.abs(d.y - y) < threshold
    );

    if (foundIdx !== -1) {
      const newDiffs = [...differences];
      newDiffs[foundIdx].found = true;
      setDifferences(newDiffs);
      setScore(s => s + 100);
      audioService.playEffect('success');
      if (navigator.vibrate) navigator.vibrate([10, 50, 10]);

      if (newDiffs.every(d => d.found)) {
        setIsFinished(true);
      }
    } else {
      // Miss indicator (Red X)
      const miss = document.createElement('div');
      miss.className = 'absolute w-12 h-12 flex items-center justify-center text-red-500 font-black text-4xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 select-none z-50';
      miss.innerHTML = '✕';
      miss.style.left = `${x}%`;
      miss.style.top = `${y}%`;
      e.currentTarget.appendChild(miss);
      setTimeout(() => miss.remove(), 600);

      if (navigator.vibrate) navigator.vibrate(50);
      audioService.playEffect('whoosh');
      setMistakes(m => m + 1);
      setScore(s => Math.max(0, s - 10));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[300] bg-cyan-900/90 backdrop-blur-xl flex flex-col items-center justify-center p-6">
        <div className="w-64 h-64"><LottiePlayer url="https://lottie.host/9e4d5884-6997-4007-96a1-633005a76953/6pW6O5ZOnA.json" className="w-full h-full" /></div>
        <p className="text-3xl font-black text-white animate-pulse">Gemini is hiding things... ✨</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] bg-cyan-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        <div className="flex justify-between items-center bg-white/10 backdrop-blur rounded-[2.5rem] p-6 border-4 border-white/10 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-green-400 font-black text-xs uppercase tracking-widest">Correct</p>
              <p className="text-3xl font-black text-white">{differences.filter(d => d.found).length} / {differences.length}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-cyan-400 font-black text-xs uppercase tracking-widest">Time</p>
              <p className={`text-3xl font-black ${timer < 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timer}s</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-red-400 font-black text-xs uppercase tracking-widest">Mistakes</p>
              <p className="text-3xl font-black text-white">{mistakes}</p>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tighter hidden md:block">Find the Differences! 🧩</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-cyan-400 font-black text-xs uppercase tracking-widest">Score</p>
              <p className="text-3xl font-black text-white">{score}</p>
            </div>
            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white font-black hover:bg-red-500 transition-colors">✕</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center max-w-4xl mx-auto w-full">
          <div onClick={(e) => handleTap(e, 'base')} className="relative aspect-square w-full bg-white rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl cursor-crosshair">
            <img src={images?.base} className="w-full h-full object-cover select-none" alt="Original" />
            {differences.filter(d => d.found).map(d => (
              <div key={d.id} className="absolute w-12 h-12 border-4 border-green-500 bg-green-500/20 rounded-full flex items-center justify-center shadow-lg pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
                <span className="text-green-600 text-xl font-black">✓</span>
              </div>
            ))}
          </div>
          <div onClick={(e) => handleTap(e, 'modified')} className="relative aspect-square w-full bg-white rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl cursor-crosshair">
            <img src={images?.modified} className="w-full h-full object-cover select-none" alt="Modified" />
            {differences.filter(d => d.found).map(d => (
              <div key={d.id} className="absolute w-12 h-12 border-4 border-green-500 bg-green-500/20 rounded-full flex items-center justify-center shadow-lg pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
                <span className="text-green-600 text-xl font-black">✓</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-3xl p-4 text-center">
          <p className="text-cyan-200/60 font-bold italic">Tap the modified image to reveal what Gemini changed!</p>
        </div>
      </div>

      {isFinished && (
        <div className="absolute inset-0 z-50 bg-cyan-900/95 flex flex-col items-center justify-center p-12 text-center fade-in backdrop-blur-3xl">
          <div className="w-72 h-72 mb-8">
            <LottiePlayer url={differences.every(d => d.found) ? "https://lottie.host/801a24d5-83f6-4d2d-8b6a-9f5e55e3782a/D6W2hX8v1C.json" : "https://lottie.host/3141f486-4f40-410c-8433-f54f76274094/R08Rk7q9w2.json"} className="w-full h-full" />
          </div>
          <h3 className="text-6xl font-black text-white mb-4">{differences.every(d => d.found) ? "PUZZLE SOLVED! ✨" : "TIME'S UP! ⏰"}</h3>
          <p className="text-2xl font-bold text-cyan-200 mb-12">Total Score: <span className="text-white font-black text-4xl">{score}</span></p>
          <div className="flex gap-4">
            <button onClick={loadNewGame} className="bg-cyan-500 text-white px-12 py-6 rounded-[2.5rem] text-2xl font-black shadow-lg hover:scale-105 transition active:scale-95">Play Again</button>
            <button onClick={onClose} className="bg-white text-cyan-900 px-12 py-6 rounded-[2.5rem] text-2xl font-black shadow-lg hover:scale-105 transition active:scale-95">Back Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindDifference;
