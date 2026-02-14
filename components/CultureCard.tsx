
import React, { useState, useEffect } from 'react';
import { CultureItem, Language } from '../types';
import { audioService } from '../services/audioService';

interface Props {
  item: CultureItem;
  lang: Language;
  onClick: (item: CultureItem) => void;
  isMastered?: boolean;
  isBuilderMode?: boolean;
  onEditClick?: (item: CultureItem) => void;
}

const CultureCard: React.FC<Props> = ({ 
  item, 
  lang: globalLang, 
  onClick, 
  isMastered = false,
  isBuilderMode = false,
  onEditClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const [localLang, setLocalLang] = useState<Language>(globalLang);

  // Sync with global language changes, but allow local overrides
  useEffect(() => {
    setLocalLang(globalLang);
  }, [globalLang]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHasBeenHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onClick(item);
  };

  const handleLangToggle = (e: React.MouseEvent, newLang: Language) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(5);
    setLocalLang(newLang);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(15);
    audioService.speak(item.voiceoverScript[localLang], 'Kore');
  };

  return (
    <div 
      className={`clay-card bg-white p-6 cursor-pointer group transition-all duration-500 
                 hover:scale-[1.08] hover:-translate-y-4 
                 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,1)]
                 active:scale-95 active:translate-y-1 active:duration-100
                 border-4 transition-colors relative flex flex-col
                 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 focus-visible:ring-offset-2
                 ${isMastered ? 'border-yellow-200' : 'border-transparent hover:border-white/60'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View details about ${item.title[localLang]}`}
    >
      {/* Mastery Badge Overlay */}
      {isMastered && (
        <div className="absolute -top-4 -right-4 z-20 bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce pointer-events-none">
          <span className="text-xl">⭐</span>
        </div>
      )}

      {/* Edit Button for Builder Mode */}
      {isBuilderMode && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEditClick?.(item);
          }}
          className="absolute top-4 left-4 z-30 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-emerald-600 transition-all active:scale-90"
        >
          <span className="text-xl">🛠️</span>
        </button>
      )}

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] mb-6 bg-blue-50 shadow-inner shrink-0">
        <img 
          src={item.imageUrl} 
          alt={item.title[localLang]} 
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110 ${
            isHovered ? 'opacity-0 scale-115' : 'opacity-100'
          }`}
        />

        {hasBeenHovered && (
          <video 
            src={item.videoUrl} 
            autoPlay 
            loop 
            muted 
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none" />
        
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
           <div className="w-14 h-14 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl">
             <span className="text-white text-2xl drop-shadow-md">▶</span>
           </div>
        </div>

        {/* Floating Speak Button */}
        <button
          onClick={handleSpeak}
          className="absolute bottom-4 right-4 z-30 w-12 h-12 bg-sky-500 text-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 hover:bg-sky-600 active:scale-90"
          title="Listen to pronunciation"
          aria-label="Listen to pronunciation"
        >
          <span className="text-xl">🔊</span>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className={`text-2xl font-black text-center tracking-tight transition-colors duration-300 drop-shadow-sm ${isMastered ? 'text-yellow-600' : 'text-sky-900 group-hover:text-sky-600'}`}>
          {item.title[localLang]}
        </h3>

        {/* Short Description Snippet */}
        <p className="mt-3 text-sm text-sky-800/70 font-bold text-center line-clamp-2 leading-relaxed h-10 overflow-hidden">
          {item.description[localLang]}
        </p>

        {/* Quick Language Peek Buttons */}
        <div className={`mt-3 flex justify-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          {(['id', 'en', 'plm'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={(e) => handleLangToggle(e, l)}
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all border-2 ${
                localLang === l 
                ? 'bg-orange-500 text-white border-white shadow-md scale-110' 
                : 'bg-sky-50 text-sky-400 border-sky-100 hover:bg-sky-100'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Fun Fact Bubble Section */}
        <div className="mt-4 bg-orange-50 border-2 border-dashed border-orange-200 p-4 rounded-[1.5rem] relative group-hover:bg-orange-100 group-hover:animate-clay-jerky transition-all duration-300 shadow-inner">
          <div className="absolute -top-3 -left-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-orange-100 transform -rotate-12 group-hover:rotate-0 group-hover:scale-125 transition-all duration-300">
            <span className="text-lg group-hover:animate-bounce">💡</span>
            <span className="absolute -top-1 -right-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity delay-100">✨</span>
          </div>
          <p className="text-[11px] font-black text-orange-900 leading-tight italic line-clamp-3">
            "{item.funFact[localLang]}"
          </p>
        </div>
      </div>
      
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full blur-sm group-hover:opacity-100 opacity-0 transition-opacity" />
    </div>
  );
};

export default CultureCard;
