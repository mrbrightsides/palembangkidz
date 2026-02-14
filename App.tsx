
import React, { useState, useEffect } from 'react';
import { CultureItem, Language, AiHeritageInsight } from './types';
import { CULTURE_DATA, UI_STRINGS, VOICE_AVATARS } from './constants';
import CultureCard from './components/CultureCard';
import QuizModule from './components/QuizModule';
import LoadingScreen from './components/LoadingScreen';
import LottiePlayer from './components/LottiePlayer';
import ExplorerMap from './components/ExplorerMap';
import BackgroundMusic from './components/BackgroundMusic';
import ClayifyStudio from './components/ClayifyStudio';
import LiveTeacher from './components/LiveTeacher';
import MusiRace from './components/MusiRace';
import SoundscapeMixer from './components/SoundscapeMixer';
import DialectDecoder from './components/DialectDecoder';
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
  const [aiInsight, setAiInsight] = useState<AiHeritageInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiSectionExpanded, setIsAiSectionExpanded] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');
  const [currentSpeaker, setCurrentSpeaker] = useState<'Kore' | 'Puck' | 'Zephyr' | null>(null);
  
  // UI States for New Features
  const [activeModals, setActiveModals] = useState({
    studio: false,
    live: false,
    race: false,
    mixer: false,
    decoder: false,
    passport: false
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-stamps');
    return saved ? JSON.parse(saved) : [];
  });
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-mastery');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleItemClick = async (item: CultureItem) => {
    setSelectedItem(item);
    setAiInsight(null);
    setIsAiSectionExpanded(false);
    setIsAiLoading(false);
    
    if (!completedIds.includes(item.id)) {
      const newList = [...completedIds, item.id];
      setCompletedIds(newList);
      localStorage.setItem('palembang-kidz-stamps', JSON.stringify(newList));
    }

    const voice = lang === 'en' ? 'Puck' : 'Kore';
    setCurrentSpeaker(voice);
    audioService.speak(item.voiceoverScript[lang], voice);
    setTimeout(() => setCurrentSpeaker(null), 5000);
  };

  const toggleModal = (key: keyof typeof activeModals) => {
    setActiveModals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen pb-20 fade-in bg-[#bce7ff] relative overflow-x-hidden">
      <BackgroundMusic />

      {/* Main Sidebar Navigation (Vertical Clay Tray) */}
      <div className="fixed top-1/2 -translate-y-1/2 left-6 z-50 flex flex-col gap-6">
        <button onClick={() => toggleModal('live')} className="group relative w-16 h-16 bg-sky-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🗣️</span>
          <span className="absolute left-20 bg-sky-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Talk to Teacher</span>
        </button>
        <button onClick={() => toggleModal('studio')} className="group relative w-16 h-16 bg-indigo-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🔥</span>
          <span className="absolute left-20 bg-indigo-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Clay Studio</span>
        </button>
        <button onClick={() => toggleModal('race')} className="group relative w-16 h-16 bg-orange-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🚣‍♂️</span>
          <span className="absolute left-20 bg-orange-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Musi Race</span>
        </button>
        <button onClick={() => toggleModal('decoder')} className="group relative w-16 h-16 bg-yellow-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">⚙️</span>
          <span className="absolute left-20 bg-yellow-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Baso Decoder</span>
        </button>
        <div className="w-16 h-1 bg-white/20 rounded-full" />
        <button onClick={() => toggleModal('passport')} className="group relative w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-sky-100 transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">📖</span>
          <span className="absolute left-20 bg-sky-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">My Scrapbook</span>
        </button>
      </div>

      {/* Top Bar Navigation */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button onClick={() => toggleModal('mixer')} className="w-14 h-14 bg-white/80 backdrop-blur rounded-[1.2rem] flex items-center justify-center shadow-lg border-2 border-white/50 hover:bg-white transition">
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

      <header className="pt-16 pb-6 flex flex-col items-center px-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-sm text-sky-900 cursor-default select-none">
            Palembang<span className="text-orange-500">Kidz</span>
          </h1>
          <p className="mt-2 text-xl font-bold text-sky-800/80">{UI_STRINGS.welcome[lang]}</p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-10 pt-4">
        {viewMode === 'map' ? (
          <ExplorerMap items={CULTURE_DATA} lang={lang} onItemClick={handleItemClick} completedIds={completedIds} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 fade-in">
            {CULTURE_DATA.map((item) => (
              <CultureCard key={item.id} item={item} lang={lang} onClick={handleItemClick} isMastered={masteredIds.includes(item.id)} />
            ))}
          </div>
        )}
      </main>

      {/* Modals for Features */}
      {activeModals.live && <LiveTeacher onClose={() => toggleModal('live')} />}
      {activeModals.studio && <ClayifyStudio onClose={() => toggleModal('studio')} />}
      {activeModals.race && <MusiRace onClose={() => toggleModal('race')} />}
      {activeModals.decoder && <DialectDecoder onClose={() => toggleModal('decoder')} />}
      {activeModals.mixer && <SoundscapeMixer onClose={() => toggleModal('mixer')} />}

      {/* SELECTED ITEM DETAIL (Overlay remains similar) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sky-900/50 backdrop-blur-md">
          <div className="clay-card bg-white max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative fade-in">
             {/* Detail view content as before... */}
             <div className="p-8">
               <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center font-black">✕</button>
               <video src={selectedItem.videoUrl} className="w-full h-[400px] object-cover rounded-[3rem] mb-8" controls autoPlay />
               <h2 className="text-5xl font-black text-sky-900 mb-4">{selectedItem.title[lang]}</h2>
               <p className="text-2xl text-sky-800 font-bold mb-8 leading-relaxed">{selectedItem.description[lang]}</p>
               <div className="flex gap-4">
                 <button onClick={() => setIsQuizActive(true)} className="flex-1 py-6 bg-yellow-400 text-white rounded-[2rem] font-black text-2xl shadow-lg hover:bg-yellow-500">Play Quiz! 🎮</button>
               </div>
             </div>
          </div>
        </div>
      )}

      {isQuizActive && selectedItem && (
        <QuizModule questions={selectedItem.quiz} lang={lang} onClose={() => setIsQuizActive(false)} onComplete={(score) => {
          if (score === selectedItem.quiz.length) setMasteredIds(prev => [...prev, selectedItem.id]);
          setIsQuizActive(false);
        }} />
      )}
    </div>
  );
};

export default App;
