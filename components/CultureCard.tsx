
import React, { useState } from 'react';
import { CultureItem, Language } from '../types';

interface Props {
  item: CultureItem;
  lang: Language;
  onClick: (item: CultureItem) => void;
  isMastered?: boolean;
}

const CultureCard: React.FC<Props> = ({ item, lang, onClick, isMastered = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div 
      className={`clay-card bg-white p-6 cursor-pointer group transition-all duration-500 
                 hover:scale-[1.08] hover:-translate-y-4 
                 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,1)]
                 active:scale-95 active:translate-y-1 active:duration-100
                 border-4 transition-colors relative
                 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 focus-visible:ring-offset-2
                 ${isMastered ? 'border-yellow-200' : 'border-transparent hover:border-white/60'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details about ${item.title[lang]}`}
    >
      {/* Mastery Badge Overlay */}
      {isMastered && (
        <div className="absolute -top-4 -right-4 z-20 bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce pointer-events-none">
          <span className="text-xl">⭐</span>
        </div>
      )}

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] mb-6 bg-blue-50 shadow-inner">
        {/* Base Image with zoom effect on group hover */}
        <img 
          src={item.imageUrl} 
          alt={`${item.title[lang]}: ${item.description[lang]}`} 
          aria-label={`${item.title[lang]} culture illustration`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110 ${
            isHovered ? 'opacity-0 scale-115' : 'opacity-100'
          }`}
        />

        {/* Video cross-fade */}
        {hasBeenHovered && (
          <video 
            src={item.videoUrl} 
            autoPlay 
            loop 
            muted 
            playsInline
            aria-label={`${item.title[lang]} culture video preview`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        )}
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none" aria-hidden="true" />
        
        {/* Play indicator */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          aria-hidden="true"
        >
           <div className="w-14 h-14 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl">
             <span className="text-white text-2xl drop-shadow-md">▶</span>
           </div>
        </div>
      </div>
      
      <h3 className={`text-2xl font-black text-center tracking-tight transition-colors duration-300 drop-shadow-sm ${isMastered ? 'text-yellow-600' : 'text-sky-900 group-hover:text-sky-600'}`}>
        {item.title[lang]}
      </h3>
      
      {/* Decorative clay highlight */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full blur-sm group-hover:opacity-100 opacity-0 transition-opacity" />
    </div>
  );
};

export default CultureCard;
