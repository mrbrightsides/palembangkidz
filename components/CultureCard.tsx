import React, { useState, useEffect } from 'react';
import { CultureItem, Language } from '../types';
import { audioService } from '../services/audioService';
import { aiService } from '../services/aiService';

interface Props {
  item: CultureItem;
  lang: Language;
  onClick: (item: CultureItem) => void;
  isMastered?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  isBuilderMode?: boolean;
  onEditClick?: (item: CultureItem) => void;
  onClose?: () => void;
}

const CultureCard: React.FC<Props> = ({ 
  item, 
  lang: globalLang, 
  onClick, 
  isMastered = false,
  isFavorite = false,
  onToggleFavorite,
  isBuilderMode = false,
  onEditClick,
  onClose
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const [localLang, setLocalLang] = useState<Language>(globalLang);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState<string | null>(null);
  const [coolFactor, setCoolFactor] = useState<string | null>(null);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [isCoolLoading, setIsCoolLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync with global language changes, but allow local overrides
  useEffect(() => {
    setLocalLang(globalLang);
    setSimplifiedText(null); // Reset simplified text when language changes globally
    setCoolFactor(null); // Reset cool factor when language changes globally
  }, [globalLang]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHasBeenHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowShareMenu(false);
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
    setSimplifiedText(null); // Reset when toggling specifically on this card
    setCoolFactor(null); // Reset when toggling specifically on this card
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(15);
    audioService.speak(coolFactor || simplifiedText || item.voiceoverScript[localLang], 'Kore');
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
  };

  const handleShareToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(10);

    // Try native share first for mobile browsers
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title[localLang],
          text: `Explore ${item.title[localLang]} on PalembangKidz! 🌟`,
          url: `${window.location.origin}${window.location.pathname}?id=${item.id}`,
        });
        return;
      } catch (err) {
        // Fallback to menu if cancelled or failed
      }
    }

    setShowShareMenu(!showShareMenu);
    audioService.playEffect('pop');
  };

  const handleSimplify = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSimplifying || simplifiedText) {
      if (simplifiedText) setSimplifiedText(null); // Toggle back
      return;
    }

    if (navigator.vibrate) navigator.vibrate([10, 30]);
    audioService.playEffect('success');
    setIsSimplifying(true);
    setCoolFactor(null); // Clear cool factor if simplifying
    
    const simple = await aiService.getSimplifiedSummary(item.description[localLang], localLang);
    setSimplifiedText(simple);
    setIsSimplifying(false);
    
    // Auto speak the simplified version
    audioService.speak(simple, 'Puck');
  };

  const handleCoolFactor = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCoolLoading || coolFactor) {
      if (coolFactor) setCoolFactor(null); // Toggle back
      return;
    }

    if (navigator.vibrate) navigator.vibrate([20, 40]);
    audioService.playEffect('success');
    setIsCoolLoading(true);
    setSimplifiedText(null); // Clear simplified text if showing cool factor
    
    // Call the AI Heritage Insight specifically for the 'coolFactor'
    const insight = await aiService.getKidFriendlyExplanation(item.title[localLang], localLang);
    setCoolFactor(insight.coolFactor);
    setIsCoolLoading(false);
    
    // Auto speak the cool factor version
    audioService.speak(insight.coolFactor, 'Zephyr');
  };

  const handleSocialShare = async (platform: 'wa' | 'tw' | 'fb' | 'copy') => {
    const text = `Explore ${item.title[localLang]} on PalembangKidz! 🌟`;
    const url = `${window.location.origin}${window.location.pathname}?id=${item.id}`;
    
    // Play playful tap/whoosh sound
    audioService.playEffect('whoosh');

    let shareUrl = '';
    switch (platform) {
      case 'wa':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'tw':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'fb':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(`${text} ${url}`);
          setCopied(true);
          audioService.playEffect('success');
          setTimeout(() => {
            setCopied(false);
            setShowShareMenu(false);
          }, 1500);
        } catch (err) {
          console.error('Clipboard failed');
        }
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      setShowShareMenu(false);
    }
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
        <div className="absolute -top-4 -right-4 z-40 bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce pointer-events-none">
          <span className="text-xl">⭐</span>
        </div>
      )}

      {/* Control Buttons Container (Top Right) */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-md text-gray-400 hover:text-red-500 shadow-lg border-2 border-white transition-all hover:scale-110 active:scale-90"
          title="Dismiss card"
        >
          <span className="text-xl font-bold">✕</span>
        </button>
        <button
          onClick={handleFavoriteClick}
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all hover:scale-110 active:scale-90 ${
            isFavorite ? 'bg-rose-500 text-white' : 'bg-white/60 backdrop-blur-md text-rose-400'
          }`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={`text-xl transition-transform ${isFavorite ? 'scale-110' : ''}`}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

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

        {/* Floating Share Button and Menu */}
        <div className="absolute bottom-4 left-4 z-40">
          {showShareMenu && (
            <div className="absolute bottom-14 left-0 bg-white/90 backdrop-blur-xl border-4 border-sky-100 p-3 rounded-[1.5rem] shadow-2xl flex flex-col gap-2 animate-clay-jerky">
              <button onClick={(e) => {e.stopPropagation(); handleSocialShare('wa');}} className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center hover:scale-110 transition shadow-sm">📱</button>
              <button onClick={(e) => {e.stopPropagation(); handleSocialShare('tw');}} className="w-10 h-10 bg-sky-400 text-white rounded-xl flex items-center justify-center hover:scale-110 transition shadow-sm">🐦</button>
              <button onClick={(e) => {e.stopPropagation(); handleSocialShare('fb');}} className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center hover:scale-110 transition shadow-sm">👥</button>
              <button 
                onClick={(e) => {e.stopPropagation(); handleSocialShare('copy');}} 
                className={`w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition shadow-sm ${copied ? 'bg-emerald-500 text-white' : 'bg-orange-100 text-orange-600'}`}
              >
                {copied ? '✓' : '🔗'}
              </button>
            </div>
          )}
          <button
            onClick={handleShareToggle}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-90 ${
              showShareMenu ? 'bg-orange-500 text-white' : 'bg-sky-100/60 backdrop-blur-md text-sky-600'
            }`}
            title="Share landmark"
          >
            <span className="text-xl">📤</span>
          </button>
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

        {/* Short Description Snippet with Magic Simplify & Cool Factor Buttons */}
        <div className="mt-3 relative flex justify-center items-center gap-2">
          <p className={`text-sm font-bold text-center leading-relaxed h-12 overflow-hidden transition-all duration-300 px-8 ${
            coolFactor ? 'text-indigo-600' : simplifiedText ? 'text-orange-600' : 'text-sky-800/70'
          }`}>
            {isSimplifying || isCoolLoading ? (
              <span className="animate-pulse flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </span>
            ) : (
              coolFactor || simplifiedText || item.description[localLang]
            )}
          </p>
          <div className="absolute -right-2 top-0 transform translate-x-full flex flex-col gap-1.5">
            <button 
              onClick={handleSimplify}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all ${
                simplifiedText ? 'bg-orange-500 text-white scale-110 rotate-12' : 'bg-white text-orange-400 hover:scale-110'
              }`}
              title="Magic Simplified Summary"
            >
              <span className={`text-xs ${isSimplifying ? 'animate-spin' : ''}`}>
                {simplifiedText ? '✨' : '🪄'}
              </span>
            </button>
            <button 
              onClick={handleCoolFactor}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all ${
                coolFactor ? 'bg-indigo-500 text-white scale-110 -rotate-12' : 'bg-white text-indigo-400 hover:scale-110'
              }`}
              title="Quick AI Cool Factor"
            >
              <span className={`text-xs ${isCoolLoading ? 'animate-pulse' : ''}`}>
                {coolFactor ? '🌟' : '💡'}
              </span>
            </button>
          </div>
        </div>

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
        <div className="mt-4 bg-orange-50 border-2 border-dashed border-orange-200 p-4 rounded-[1.5rem] relative group/fact group-hover:bg-orange-100 group-hover:animate-clay-jerky transition-all duration-300 shadow-inner">
          
          {/* Custom Whimsical Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 bg-white rounded-[1.5rem] shadow-2xl border-4 border-orange-100 opacity-0 group-hover/fact:opacity-100 transition-all duration-300 pointer-events-none z-50 text-[11px] font-black text-orange-900 leading-tight scale-90 group-hover/fact:scale-100">
            <span className="block mb-1 text-orange-400 uppercase text-[9px]">The Full Fact ✨</span>
            "{item.funFact[localLang]}"
            {/* Tooltip Tail */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-orange-100 rotate-45 -mt-2.5" />
          </div>

          <div className="absolute -top-3 -left-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-orange-100 transform -rotate-12 group-hover:rotate-0 group-hover:scale-125 transition-all duration-300">
            <span className="text-lg group-hover:animate-bounce">💡</span>
            <span className="absolute -top-1 -right-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity delay-100">✨</span>
          </div>
          <p className="text-[11px] font-black text-orange-900 leading-tight italic line-clamp-2">
            "{item.funFact[localLang]}"
          </p>
        </div>
      </div>
      
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full blur-sm group-hover:opacity-100 opacity-0 transition-opacity" />
    </div>
  );
};

export default CultureCard;