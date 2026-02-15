
import React, { useState } from 'react';
import { CultureItem, Language, ScrapbookSticker } from '../types';
import { CULTURE_DATA } from '../constants';

// Fixed: Updated Props interface to include earnedBadgeIds
interface Props {
  completedIds: string[];
  masteredIds: string[];
  lang: Language;
  onClose: () => void;
  stickers: ScrapbookSticker[];
  onUpdateStickers: (stickers: ScrapbookSticker[]) => void;
  earnedBadgeIds: string[];
}

const Scrapbook: React.FC<Props> = ({ 
  completedIds, 
  masteredIds, 
  lang, 
  onClose, 
  stickers, 
  onUpdateStickers,
  earnedBadgeIds
}) => {
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);

  const addSticker = (itemId: string) => {
    const newSticker: ScrapbookSticker = {
      id: `sticker-${Date.now()}`,
      itemId,
      posX: 20 + Math.random() * 60,
      posY: 20 + Math.random() * 60,
      rotation: (Math.random() - 0.5) * 30,
      scale: 1
    };
    onUpdateStickers([...stickers, newSticker]);
  };

  const removeSticker = (id: string) => {
    onUpdateStickers(stickers.filter(s => s.id !== id));
  };

  const updateStickerProperty = (id: string, updates: Partial<ScrapbookSticker>) => {
    onUpdateStickers(stickers.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <div className="fixed inset-0 z-[250] bg-orange-900/40 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="clay-card bg-white w-full max-w-6xl h-[90vh] flex flex-col md:flex-row overflow-hidden relative border-b-[12px] border-orange-100">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center font-black text-orange-400 hover:bg-red-500 hover:text-white transition-all">✕</button>

        {/* Sticker Bin (Left Sidebar) */}
        <div className="w-full md:w-80 bg-orange-50/50 p-8 border-r-4 border-dashed border-orange-100 overflow-y-auto shrink-0">
          <h3 className="text-2xl font-black text-orange-900 mb-6 flex items-center gap-2">
            <span>✨</span> Sticker Bin
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
            {CULTURE_DATA.map(item => {
              const isCollected = completedIds.includes(item.id);
              const isMastered = masteredIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  disabled={!isCollected}
                  onClick={() => addSticker(item.id)}
                  className={`relative aspect-square rounded-2xl border-4 transition-all overflow-hidden group ${
                    isCollected 
                    ? 'border-white shadow-md hover:scale-110 active:scale-95 bg-white' 
                    : 'border-transparent bg-gray-200 grayscale opacity-40 cursor-not-allowed'
                  }`}
                >
                  {isCollected ? (
                    <>
                      <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title[lang]} />
                      {isMastered && (
                        <div className="absolute top-1 right-1 bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border border-white">
                          <span className="text-[10px]">⭐</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="flex items-center justify-center h-full text-2xl">🔒</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Fixed: Added earnedBadgeIds display to fix type error and enhance UI */}
          {earnedBadgeIds && earnedBadgeIds.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-black text-orange-900 mb-4 flex items-center gap-2">
                <span>🏅</span> Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                {earnedBadgeIds.map((badgeId) => (
                  <div key={badgeId} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border-2 border-yellow-400 animate-pulse" title={badgeId}>
                    <span className="text-2xl">🎖️</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeStickerId && (
            <div className="mt-8 p-4 bg-white rounded-2xl border-2 border-orange-100 shadow-sm fade-in">
              <h4 className="text-xs font-black text-orange-900 uppercase mb-4 tracking-widest">Modify Sticker</h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-orange-300">Rotation</label>
                  <input 
                    type="range" min="-180" max="180" 
                    value={stickers.find(s => s.id === activeStickerId)?.rotation || 0}
                    onChange={(e) => updateStickerProperty(activeStickerId, { rotation: parseInt(e.target.value) })}
                    className="w-full h-2 bg-orange-50 rounded-full appearance-none accent-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-orange-300">Scale</label>
                  <input 
                    type="range" min="0.5" max="2" step="0.1"
                    value={stickers.find(s => s.id === activeStickerId)?.scale || 1}
                    onChange={(e) => updateStickerProperty(activeStickerId, { scale: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-orange-50 rounded-full appearance-none accent-orange-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scrapbook Canvas */}
        <div className="flex-1 bg-[#fdfcf0] relative overflow-hidden group/canvas p-10 cursor-crosshair">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          
          <div className="absolute top-10 left-10 z-10">
            <h2 className="text-5xl font-black text-sky-900/20 rotate-[-2deg] pointer-events-none select-none">
              My Palembang Memories
            </h2>
          </div>

          {stickers.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-200 pointer-events-none">
              <span className="text-8xl mb-4 opacity-50">📔</span>
              <p className="text-2xl font-black uppercase tracking-widest">Your page is empty...</p>
              <p className="font-bold">Tap a sticker from the bin to start decorating!</p>
            </div>
          )}

          {stickers.map((sticker) => {
            const item = CULTURE_DATA.find(i => i.id === sticker.itemId)!;
            const isMastered = masteredIds.includes(item.id);
            return (
              <div
                key={sticker.id}
                className={`absolute cursor-move select-none group/sticker transition-shadow ${
                  activeStickerId === sticker.id ? 'z-40 ring-4 ring-orange-400 ring-offset-4 rounded-xl shadow-2xl scale-[1.02]' : 'z-20 hover:z-30'
                }`}
                style={{
                  left: `${sticker.posX}%`,
                  top: `${sticker.posY}%`,
                  transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
                }}
                onMouseDown={() => setActiveStickerId(sticker.id)}
              >
                <div className="relative clay-card bg-white p-2 border-b-4 border-gray-200 shadow-lg">
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-sm rotate-3 border border-white/50" />
                   
                   <img 
                    src={item.imageUrl} 
                    className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg pointer-events-none" 
                    alt={item.title[lang]} 
                   />
                   
                   <div className="mt-2 text-center">
                     <span className="text-xs font-black text-sky-900 block truncate max-w-[120px] md:max-w-[180px]">
                       {item.title[lang]}
                     </span>
                   </div>

                   {isMastered && (
                     <div className="absolute -top-3 -right-3 bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                       <span className="text-xl">⭐</span>
                     </div>
                   )}

                   <button
                    onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                    className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover/sticker:opacity-100 transition-opacity shadow-lg"
                   >
                     ✕
                   </button>
                </div>

                <div 
                  className="absolute inset-0"
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const onMouseMove = (moveEvent: MouseEvent) => {
                      const dx = ((moveEvent.clientX - startX) / window.innerWidth) * 100;
                      const dy = ((moveEvent.clientY - startY) / window.innerHeight) * 100;
                      updateStickerProperty(sticker.id, {
                        posX: Math.max(5, Math.min(95, sticker.posX + dx)),
                        posY: Math.max(5, Math.min(95, sticker.posY + dy))
                      });
                    };
                    const onMouseUp = () => {
                      window.removeEventListener('mousemove', onMouseMove);
                      window.removeEventListener('mouseup', onMouseUp);
                    };
                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scrapbook;
