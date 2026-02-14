
import React from 'react';
import { CultureItem, Language } from '../types';

interface Props {
  items: CultureItem[];
  lang: Language;
  onItemClick: (item: CultureItem) => void;
  completedIds: string[];
  isBuilderMode?: boolean;
  onEditClick?: (item: CultureItem) => void;
}

const ExplorerMap: React.FC<Props> = ({ items, lang, onItemClick, completedIds, isBuilderMode, onEditClick }) => {
  return (
    <div className="relative w-full aspect-[16/9] bg-sky-200 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl fade-in group">
      {/* Stylized Musi River (SVG Path) */}
      <svg 
        viewBox="0 0 1000 500" 
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <path 
          d="M0 250 Q 250 150, 500 250 T 1000 250" 
          fill="none" 
          stroke="#7dd3fc" 
          strokeWidth="120" 
          strokeLinecap="round"
          className="animate-pulse opacity-50"
          style={{ animationDuration: '4s' }}
        />
        <path 
          d="M0 250 Q 250 150, 500 250 T 1000 250" 
          fill="none" 
          stroke="#38bdf8" 
          strokeWidth="60" 
          strokeLinecap="round"
        />
      </svg>

      {/* Map Content Layer */}
      <div className="absolute inset-0 p-12">
        {items.filter(i => i.mapPos).map((item) => {
          const isDone = completedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:z-20 transition-all duration-300 group/pin"
              style={{ left: `${item.mapPos!.x}%`, top: `${item.mapPos!.y}%` }}
            >
              {/* Builder Mode Action Button */}
              {isBuilderMode && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onEditClick?.(item); }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce"
                >
                  <span className="text-sm">🛠️</span>
                </button>
              )}

              {/* Bouncing Pin Wrapper */}
              <button
                onClick={() => onItemClick(item)}
                className="relative flex flex-col items-center animate-float outline-none"
                style={{ animationDelay: `${Math.random() * 2}s` }}
              >
                {/* Pin Tooltip/Preview */}
                <div className="absolute -top-36 opacity-0 group-hover/pin:opacity-100 transition-all duration-500 scale-50 group-hover/pin:scale-100 -translate-y-4 group-hover/pin:translate-y-0 pointer-events-none z-30">
                  <div className="clay-card bg-white p-3 w-44 flex flex-col items-center gap-2 border-b-8 border-sky-100 shadow-2xl">
                    <img src={item.imageUrl} className="w-full h-24 object-cover rounded-2xl" alt={item.title[lang]} />
                    <span className="text-sm font-black text-sky-900 text-center leading-tight px-1">
                      {item.title[lang]}
                    </span>
                  </div>
                  {/* Tooltip Tail */}
                  <div className="w-4 h-4 bg-white rotate-45 mx-auto -mt-2 border-r-8 border-b-8 border-sky-100/20" />
                </div>

                {/* Outer Pulse Glow (Visible on Hover) */}
                <div className={`absolute inset-0 rounded-full transition-all duration-700 opacity-0 group-hover/pin:opacity-100 group-hover/pin:scale-[1.8] blur-xl ${isDone ? 'bg-orange-400' : 'bg-sky-400'}`} />

                {/* Actual Pin Handle */}
                <div className={`
                  w-14 h-14 rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-all duration-300 relative z-10
                  active:scale-90
                  ${isDone 
                    ? 'bg-orange-500 scale-125 group-hover/pin:scale-[1.35] group-hover/pin:shadow-[0_0_30px_rgba(249,115,22,0.6)]' 
                    : 'bg-sky-500 group-hover/pin:scale-125 group-hover/pin:shadow-[0_0_30px_rgba(56,189,248,0.6)]'
                  }
                `}>
                  <span className="text-white text-2xl drop-shadow-md transform group-hover/pin:rotate-12 transition-transform">
                    {isDone ? '⭐' : '📍'}
                  </span>

                  {/* Inner highlighting ring on hover */}
                  <div className="absolute inset-1 rounded-full border-2 border-white/20 opacity-0 group-hover/pin:opacity-100 transition-opacity" />
                </div>
                
                {/* Pin Shadow */}
                <div className={`
                  w-10 h-2 bg-black/10 rounded-full mt-3 blur-sm transition-all duration-300
                  group-hover/pin:bg-black/20 group-hover/pin:scale-x-150 group-hover/pin:blur-md
                `} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Decorative Map Elements */}
      <div className="absolute bottom-10 right-10 flex items-center gap-3 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/40 shadow-lg">
        <span className="text-2xl animate-spin-slow">🗺️</span>
        <span className="font-black text-sky-900 tracking-tight">Musi River Explorer</span>
      </div>
    </div>
  );
};

export default ExplorerMap;
