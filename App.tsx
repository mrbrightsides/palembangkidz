
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CultureItem, Language, AiHeritageInsight, ScrapbookSticker } from './types';
import { CULTURE_DATA, UI_STRINGS, VOICE_AVATARS } from './constants';
import CultureCard from './components/CultureCard';
import QuizEngine from './components/QuizEngine';
import QuizHub from './components/QuizHub';
import LoadingScreen from './components/LoadingScreen';
import LottiePlayer from './components/LottiePlayer';
import ExplorerMap from './components/ExplorerMap';
import BackgroundMusic from './components/BackgroundMusic';
import ClayifyStudio from './components/ClayifyStudio';
import LiveTeacher from './components/LiveTeacher';
import MusiRace from './components/MusiRace';
import SoundscapeMixer from './components/SoundscapeMixer';
import DialectDecoder from './components/DialectDecoder';
import Scrapbook from './components/Scrapbook';
import BuilderModal from './components/BuilderModal';
import PuzzledWords from './components/PuzzledWords';
import FindDifference from './components/FindDifference';
import PhotoBooth from './components/PhotoBooth';
import StoryMode from './components/StoryMode';
import { audioService } from './services/audioService';
import { aiService } from './services/aiService';

const getInitialLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'id';
  const browserLang = navigator.language || (navigator as any).userLanguage || 'id';
  const shortLang = browserLang.split('-')[0].toLowerCase();
  if (shortLang === 'id') return 'id';
  if (shortLang === 'en') return 'en';
  return 'id';
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(getInitialLanguage());
  const [selectedItem, setSelectedItem] = useState<CultureItem | null>(null);
  const [modalLang, setModalLang] = useState<Language>(getInitialLanguage());
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [editingItem, setEditingItem] = useState<CultureItem | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [isCopying, setIsCopying] = useState(false);
  
  // Quiz specific states
  const [activeQuizItem, setActiveQuizItem] = useState<CultureItem | null>(null);

  // UI States for Modals
  const [activeModals, setActiveModals] = useState({
    studio: false,
    live: false,
    race: false,
    mixer: false,
    decoder: false,
    passport: false,
    quizHub: false,
    puzzledWords: false,
    difference: false,
    photoBooth: false,
    story: false
  });

  // Persisted States
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-stamps');
    return saved ? JSON.parse(saved) : [];
  });
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-mastery');
    return saved ? JSON.parse(saved) : [];
  });
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [stickers, setStickers] = useState<ScrapbookSticker[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-stickers');
    return saved ? JSON.parse(saved) : [];
  });
  const [mediaOverrides, setMediaOverrides] = useState<Record<string, { imageUrl: string; videoUrl: string }>>(() => {
    const saved = localStorage.getItem('palembang-kidz-media-overrides');
    return saved ? JSON.parse(saved) : {};
  });

  // Persisted Game States
  const [solvedCount, setSolvedCount] = useState<number>(() => {
    const saved = localStorage.getItem('palembang-kidz-puzzled-solved');
    return saved ? parseInt(saved) : 0;
  });
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-badges');
    return saved ? JSON.parse(saved) : [];
  });

  // AI states for details
  const [aiInsight, setAiInsight] = useState<AiHeritageInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const aiSectionRef = useRef<HTMLDivElement>(null);

  const cultureData = useMemo(() => {
    return CULTURE_DATA
      .filter(item => !hiddenIds.includes(item.id))
      .map(item => {
        const override = mediaOverrides[item.id];
        if (override) return { ...item, ...override };
        return item;
      });
  }, [mediaOverrides, hiddenIds]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleItemClick = (item: CultureItem) => {
    setSelectedItem(item);
    setModalLang(lang);
    setAiInsight(null);
    setDescExpanded(false);
    if (!completedIds.includes(item.id)) {
      const newList = [...completedIds, item.id];
      setCompletedIds(newList);
      localStorage.setItem('palembang-kidz-stamps', JSON.stringify(newList));
    }
    const voice = lang === 'en' ? 'Puck' : 'Kore';
    audioService.speak(item.voiceoverScript[lang], voice);
  };

  const toggleModal = (key: keyof typeof activeModals) => {
    setActiveModals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStartQuiz = (item: CultureItem) => {
    setActiveQuizItem(item);
    toggleModal('quizHub');
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = favoriteIds.includes(id)
      ? favoriteIds.filter(fId => fId !== id)
      : [...favoriteIds, id];
    setFavoriteIds(newFavorites);
    localStorage.setItem('palembang-kidz-favorites', JSON.stringify(newFavorites));
    if (navigator.vibrate) navigator.vibrate(favoriteIds.includes(id) ? 10 : [10, 30]);
  };

  const handleQuizComplete = (score: number) => {
    if (activeQuizItem && score === activeQuizItem.quiz.length) {
      const newList = [...masteredIds];
      if (!newList.includes(activeQuizItem.id)) {
        newList.push(activeQuizItem.id);
        setMasteredIds(newList);
        localStorage.setItem('palembang-kidz-mastery', JSON.stringify(newList));
      }
    }
    setActiveQuizItem(null);
  };

  const handleModalShare = async () => {
    if (!selectedItem) return;
    const shareText = `Explore ${selectedItem.title[modalLang]} on PalembangKidz! 🌟`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedItem.title[modalLang],
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share failed or cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setIsCopying(true);
        audioService.playEffect('success');
        setTimeout(() => setIsCopying(false), 2000);
      } catch (err) {
        alert('Failed to copy link');
      }
    }
  };

  const handleWordSolved = () => {
    const newCount = solvedCount + 1;
    setSolvedCount(newCount);
    localStorage.setItem('palembang-kidz-puzzled-solved', newCount.toString());
  };

  const handleEarnBadge = (badgeId: string) => {
    if (!earnedBadgeIds.includes(badgeId)) {
      const newList = [...earnedBadgeIds, badgeId];
      setEarnedBadgeIds(newList);
      localStorage.setItem('palembang-kidz-badges', JSON.stringify(newList));
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen pb-20 fade-in bg-[#bce7ff] relative overflow-x-hidden">
      <BackgroundMusic />

      {/* Partner Logos Top Left */}
      <div className="fixed top-6 left-6 z-[160] flex items-center h-14 px-5 glass-panel rounded-[1.2rem] shadow-lg border-2 border-white/50 overflow-hidden">
        <img 
          src="https://raw.githubusercontent.com/mrbrightsides/palembangkidz/main/public/partners-strip.png" 
          alt="Partners: Kemdikbud, Dana Indonesiana, LPDP" 
          className="h-9 object-contain opacity-90 hover:opacity-100 transition-opacity"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/300x60/ffffff/075985?text=KEMENDIKBUD+%7C+DANA+INDONESIANA+%7C+LPDP&font=quicksand";
          }}
        />
      </div>

      {/* Main Sidebar Navigation */}
      <div className="fixed top-1/2 -translate-y-1/2 left-6 z-[150] flex flex-col gap-4">
        <button onClick={() => toggleModal('story')} className="group relative w-16 h-16 bg-pink-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">📖</span>
          <span className="absolute left-20 bg-pink-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Story Mode</span>
        </button>

        <button onClick={() => toggleModal('live')} className="group relative w-16 h-16 bg-sky-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🗣️</span>
          <span className="absolute left-20 bg-sky-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Talk to Zephyr</span>
        </button>

        <button onClick={() => toggleModal('studio')} className="group relative w-16 h-16 bg-indigo-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🎨</span>
          <span className="absolute left-20 bg-indigo-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Clay Studio</span>
        </button>

        <button onClick={() => toggleModal('photoBooth')} className="group relative w-16 h-16 bg-emerald-400 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">📸</span>
          <span className="absolute left-20 bg-emerald-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Photo Booth</span>
        </button>
        
        <button onClick={() => toggleModal('quizHub')} className="group relative w-16 h-16 bg-yellow-400 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl animate-bounce">🏆</span>
          <span className="absolute left-20 bg-yellow-600 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Quiz Quest Hub</span>
        </button>

        <button onClick={() => toggleModal('difference')} className="group relative w-16 h-16 bg-cyan-400 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🧩</span>
          <span className="absolute left-20 bg-cyan-700 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Find Differences</span>
        </button>

        <button onClick={() => toggleModal('puzzledWords')} className="group relative w-16 h-16 bg-purple-400 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🔤</span>
          <span className="absolute left-20 bg-purple-600 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Puzzled Words</span>
        </button>

        <button onClick={() => toggleModal('race')} className="group relative w-16 h-16 bg-orange-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🎮</span>
          <span className="absolute left-20 bg-orange-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">River Race Game</span>
        </button>

        <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
        
        <button onClick={() => toggleModal('passport')} className="group relative w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-sky-100 transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">📔</span>
          <span className="absolute left-20 bg-white text-sky-900 px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Scrapbook</span>
        </button>

        <button 
          onClick={() => setIsBuilderMode(!isBuilderMode)} 
          className={`group relative w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95 ${isBuilderMode ? 'bg-pink-500 text-white' : 'bg-gray-400 text-white/50'}`}
        >
          <span className="text-3xl">🛠️</span>
          <span className="absolute left-20 bg-pink-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">
            {isBuilderMode ? 'Stop Customizing' : 'Customize Cards'}
          </span>
        </button>
      </div>

      {/* Top Bar Right */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button onClick={() => toggleModal('mixer')} className="w-14 h-14 bg-white/80 backdrop-blur rounded-[1.2rem] flex items-center justify-center shadow-lg border-2 border-white/50 hover:bg-white transition-all active:scale-90">
           <span className="text-2xl">🔊</span>
        </button>
        <div className="flex bg-white/60 backdrop-blur rounded-full p-1 border border-white/40 shadow-lg">
          <button onClick={() => setViewMode('map')} className={`px-6 py-2 rounded-full font-black text-sm transition-all ${viewMode === 'map' ? 'bg-sky-600 text-white' : 'text-sky-900/60 hover:text-sky-900'}`}>Map</button>
          <button onClick={() => setViewMode('grid')} className={`px-6 py-2 rounded-full font-black text-sm transition-all ${viewMode === 'grid' ? 'bg-sky-600 text-white' : 'text-sky-900/60 hover:text-sky-900'}`}>Grid</button>
        </div>
        <div className="flex bg-white/60 backdrop-blur rounded-full p-1.5 shadow-lg border border-white/40">
          {['id', 'en', 'plm'].map((l) => (
            <button key={l} onClick={() => setLang(l as Language)} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${lang === l ? 'bg-orange-500 text-white shadow' : 'text-sky-900/60 hover:text-sky-900'}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <header className="pt-24 pb-6 flex flex-col items-center px-6">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-sm text-sky-900 cursor-default select-none">
            Palembang<span className="text-orange-500">Kidz</span>
          </h1>
          <p className="mt-2 text-2xl font-bold text-sky-800/80 italic">{UI_STRINGS.welcome[lang]}</p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-10 pt-4">
        {viewMode === 'map' ? (
          <ExplorerMap items={cultureData} lang={lang} onItemClick={handleItemClick} completedIds={completedIds} isBuilderMode={isBuilderMode} onEditClick={setEditingItem} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 fade-in">
            {cultureData.map((item) => (
              <CultureCard 
                key={item.id} 
                item={item} 
                lang={lang} 
                onClick={handleItemClick} 
                isMastered={masteredIds.includes(item.id)} 
                isFavorite={favoriteIds.includes(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                isBuilderMode={isBuilderMode} 
                onEditClick={setEditingItem} 
                onClose={() => setHiddenIds(prev => [...prev, item.id])}
              />
            ))}
          </div>
        )}
      </main>

      {/* Interactive Feature Modals */}
      {activeModals.quizHub && (
        <QuizHub 
          completedIds={completedIds} 
          masteredIds={masteredIds} 
          lang={lang} 
          onSelectQuiz={handleStartQuiz} 
          onClose={() => toggleModal('quizHub')} 
        />
      )}
      {activeQuizItem && (
        <QuizEngine 
          questions={activeQuizItem.quiz} 
          lang={lang} 
          onClose={() => setActiveQuizItem(null)} 
          onComplete={handleQuizComplete} 
        />
      )}
      {activeModals.story && <StoryMode lang={lang} onClose={() => toggleModal('story')} />}
      {activeModals.live && <LiveTeacher onClose={() => toggleModal('live')} />}
      {activeModals.studio && <ClayifyStudio onClose={() => toggleModal('studio')} />}
      {activeModals.photoBooth && <PhotoBooth onClose={() => toggleModal('photoBooth')} />}
      {activeModals.difference && <FindDifference lang={lang} onClose={() => toggleModal('difference')} />}
      {activeModals.race && <MusiRace onClose={() => toggleModal('race')} />}
      {activeModals.puzzledWords && (
        <PuzzledWords 
          lang={lang} 
          onClose={() => toggleModal('puzzledWords')} 
          solvedCount={solvedCount}
          onWordSolved={handleWordSolved}
          onEarnBadge={handleEarnBadge}
        />
      )}
      {activeModals.decoder && <DialectDecoder onClose={() => toggleModal('decoder')} />}
      {activeModals.mixer && <SoundscapeMixer onClose={() => toggleModal('mixer')} />}
      {activeModals.passport && (
        <Scrapbook 
          completedIds={completedIds} 
          masteredIds={masteredIds} 
          lang={lang} 
          stickers={stickers}
          onUpdateStickers={(s) => { setStickers(s); localStorage.setItem('palembang-kidz-stickers', JSON.stringify(s)); }}
          onClose={() => toggleModal('passport')} 
          earnedBadgeIds={earnedBadgeIds}
        />
      )}
      {editingItem && <BuilderModal item={editingItem} lang={lang} onSave={(id, up) => {
        const newOverrides = { ...mediaOverrides, [id]: up };
        setMediaOverrides(newOverrides);
        localStorage.setItem('palembang-kidz-media-overrides', JSON.stringify(newOverrides));
        setEditingItem(null);
      }} onClose={() => setEditingItem(null)} />}

      {/* Landmark Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sky-900/60 backdrop-blur-md overflow-y-auto">
          <div className="clay-card bg-white max-w-5xl w-full my-8 shadow-2xl relative fade-in border-b-[12px] border-sky-100">
             <div className="absolute top-6 right-6 z-50 flex gap-4">
                <button 
                  onClick={handleModalShare} 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${isCopying ? 'bg-emerald-500 text-white' : 'bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white'}`}
                  title="Share landmark"
                >
                  {isCopying ? '✓' : '📤'}
                </button>
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-all hover:bg-red-500 hover:text-white shadow-lg"
                  title="Close card"
                >
                  ✕
                </button>
             </div>
             <div className="p-8 md:p-12">
               <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-10 border-8 border-sky-50 shadow-2xl bg-sky-50">
                 <video src={selectedItem.videoUrl} className="w-full h-full object-cover" controls autoPlay />
                 <div className={`absolute bottom-6 right-6 px-6 py-2 rounded-full font-black text-sm border-4 border-white shadow-lg uppercase tracking-widest ${
                   selectedItem.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                   selectedItem.difficulty === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                 }`}>
                   {selectedItem.difficulty} Quiz
                 </div>
               </div>
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                 <div className="space-y-3">
                    <h2 className="text-6xl font-black text-sky-900 tracking-tight leading-tight">{selectedItem.title[modalLang]}</h2>
                    <div className="flex items-center gap-4">
                      <span className="px-5 py-2 bg-sky-50 text-sky-400 font-black italic rounded-full border-2 border-sky-100">🗣️ "{selectedItem.pronunciation[modalLang]}"</span>
                      {masteredIds.includes(selectedItem.id) && <span className="text-3xl animate-bounce">⭐</span>}
                    </div>
                 </div>
                 <button onClick={async () => {
                    if (isAiLoading) return;
                    aiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setIsAiLoading(true);
                    const insight = await aiService.getKidFriendlyExplanation(selectedItem.title[modalLang], modalLang);
                    setAiInsight(insight);
                    setIsAiLoading(false);
                    audioService.speak(insight.coolFactor, 'Zephyr');
                 }} disabled={isAiLoading} className="px-10 py-5 bg-sky-600 text-white rounded-[2rem] font-black text-xl shadow-[0_10px_0_rgb(8,145,178)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all">Teacher's Secret 🧙‍♂️</button>
               </div>
               
               <div className="mb-12">
                 <p className={`text-2xl text-sky-800 font-bold opacity-90 leading-relaxed ${descExpanded ? '' : 'line-clamp-3'}`}>
                   {selectedItem.description[modalLang]}
                 </p>
                 <button 
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="mt-2 text-sky-600 font-black hover:underline focus:outline-none"
                 >
                   {descExpanded ? 'Read Less ▴' : 'Read More ▾'}
                 </button>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                 <div className="bg-orange-50 border-4 border-dashed border-orange-200 p-8 rounded-[3rem] relative overflow-hidden"><h3 className="text-xl font-black text-orange-600 mb-4 flex items-center gap-2"><span>✨</span> Did You Know?</h3><p className="text-xl text-orange-900/80 font-bold italic">"{selectedItem.funFact[modalLang]}"</p></div>
                 <div ref={aiSectionRef} className="bg-sky-50 border-4 border-sky-100 p-8 rounded-[3rem] flex flex-col min-h-[200px]">{isAiLoading ? <div className="flex-1 flex flex-col items-center justify-center gap-2"><div className="w-20 h-20 animate-spin border-4 border-sky-400 border-t-transparent rounded-full" /><p className="text-sky-400 font-black">Consulting the ancients...</p></div> : aiInsight ? <div className="space-y-4 fade-in"><div><span className="text-[10px] font-black text-sky-300 uppercase block mb-1">📜 Legend</span><p className="font-bold text-sky-900/70">{aiInsight.originStory}</p></div><div className="bg-white/50 p-4 rounded-2xl border-2 border-white/80"><span className="text-[10px] font-black text-orange-400 uppercase block mb-1">🌈 Cool Factor</span><p className="font-black text-sky-900">{aiInsight.coolFactor}</p></div></div> : <p className="text-sky-900/30 font-bold text-center italic py-10">Tap for AI Teacher's Secret!</p>}</div>
               </div>

               <div className="flex justify-center pt-8 border-t-4 border-sky-50">
                  <button 
                    onClick={() => setSelectedItem(null)} 
                    className="px-10 py-4 bg-gray-100 text-gray-500 rounded-full font-black text-lg hover:bg-gray-200 transition active:scale-95"
                  >
                    Close Discovery Center
                  </button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
