
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CultureItem, Language, AiHeritageInsight, ScrapbookSticker } from './types';
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
import Scrapbook from './components/Scrapbook';
import BuilderModal from './components/BuilderModal';
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
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [editingItem, setEditingItem] = useState<CultureItem | null>(null);
  
  // Explainable AI States
  const [aiInsight, setAiInsight] = useState<AiHeritageInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const aiSectionRef = useRef<HTMLDivElement>(null);
  
  // UI States for Modals
  const [activeModals, setActiveModals] = useState({
    studio: false,
    live: false,
    race: false,
    mixer: false,
    decoder: false,
    passport: false
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
  const [stickers, setStickers] = useState<ScrapbookSticker[]>(() => {
    const saved = localStorage.getItem('palembang-kidz-stickers');
    return saved ? JSON.parse(saved) : [];
  });
  const [mediaOverrides, setMediaOverrides] = useState<Record<string, { imageUrl: string; videoUrl: string }>>(() => {
    const saved = localStorage.getItem('palembang-kidz-media-overrides');
    return saved ? JSON.parse(saved) : {};
  });

  const cultureData = useMemo(() => {
    return CULTURE_DATA.map(item => {
      const override = mediaOverrides[item.id];
      if (override) {
        return { ...item, ...override };
      }
      return item;
    });
  }, [mediaOverrides]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleItemClick = (item: CultureItem) => {
    setSelectedItem(item);
    setModalLang(lang); // Reset modal language to global setting
    setAiInsight(null);
    if (!completedIds.includes(item.id)) {
      const newList = [...completedIds, item.id];
      setCompletedIds(newList);
      localStorage.setItem('palembang-kidz-stamps', JSON.stringify(newList));
    }
    const voice = lang === 'en' ? 'Puck' : 'Kore';
    audioService.speak(item.voiceoverScript[lang], voice);
  };

  const handleModalLangChange = (newLang: Language) => {
    if (!selectedItem) return;
    setModalLang(newLang);
    const voice = newLang === 'en' ? 'Puck' : 'Kore';
    audioService.speak(selectedItem.voiceoverScript[newLang], voice);
  };

  const fetchAiInsight = async () => {
    if (!selectedItem || isAiLoading) return;
    
    if (navigator.vibrate) navigator.vibrate(20);
    
    // Smooth scroll to the AI section so the user sees it loading
    aiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    setIsAiLoading(true);
    // AI respects the locally selected language in the modal
    const insight = await aiService.getKidFriendlyExplanation(selectedItem.title[modalLang], modalLang);
    setAiInsight(insight);
    setIsAiLoading(false);
    audioService.speak(insight.coolFactor, 'Zephyr');
  };

  const handleShare = async () => {
    if (!selectedItem) return;
    const shareText = `Explore ${selectedItem.title[modalLang]} in PalembangKidz! 🎨✨`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PalembangKidz',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.href);
      alert('Link copied to clipboard! 📋');
    }
  };

  const handleSaveMedia = (itemId: string, updates: { imageUrl: string; videoUrl: string }) => {
    const newOverrides = { ...mediaOverrides, [itemId]: updates };
    setMediaOverrides(newOverrides);
    localStorage.setItem('palembang-kidz-media-overrides', JSON.stringify(newOverrides));
    setEditingItem(null);
  };

  const toggleModal = (key: keyof typeof activeModals) => {
    setActiveModals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen pb-20 fade-in bg-[#bce7ff] relative overflow-x-hidden">
      <BackgroundMusic />

      {/* Main Sidebar Navigation */}
      <div className="fixed top-1/2 -translate-y-1/2 left-6 z-[150] flex flex-col gap-6">
        <button onClick={() => toggleModal('live')} className="group relative w-16 h-16 bg-sky-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🗣️</span>
          <span className="absolute left-20 bg-sky-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Talk to Zephyr</span>
        </button>
        <button onClick={() => toggleModal('studio')} className="group relative w-16 h-16 bg-indigo-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🔥</span>
          <span className="absolute left-20 bg-indigo-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Clay Studio</span>
        </button>
        <button onClick={() => toggleModal('race')} className="group relative w-16 h-16 bg-orange-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">🚣‍♂️</span>
          <span className="absolute left-20 bg-orange-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">River Race</span>
        </button>
        <button onClick={() => toggleModal('decoder')} className="group relative w-16 h-16 bg-yellow-500 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">⚙️</span>
          <span className="absolute left-20 bg-yellow-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Dialect Decoder</span>
        </button>
        <div className="w-16 h-1 bg-white/20 rounded-full" />
        <button onClick={() => toggleModal('passport')} className="group relative w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-sky-100 transition-all hover:scale-110 active:scale-95">
          <span className="text-3xl">📖</span>
          <span className="absolute left-20 bg-white text-sky-900 px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">Scrapbook</span>
        </button>
        <button 
          onClick={() => setIsBuilderMode(!isBuilderMode)} 
          className={`group relative w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 active:scale-95 ${isBuilderMode ? 'bg-emerald-500 text-white' : 'bg-gray-400 text-white/50'}`}
        >
          <span className="text-3xl">🛠️</span>
          <span className="absolute left-20 bg-emerald-800 text-white px-4 py-2 rounded-full text-xs font-black opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            {isBuilderMode ? 'Stop Customizing' : 'Customize Cards'}
          </span>
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
          <ExplorerMap 
            items={cultureData} 
            lang={lang} 
            onItemClick={handleItemClick} 
            completedIds={completedIds} 
            isBuilderMode={isBuilderMode}
            onEditClick={setEditingItem}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 fade-in">
            {cultureData.map((item) => (
              <CultureCard 
                key={item.id} 
                item={item} 
                lang={lang} 
                onClick={handleItemClick} 
                isMastered={masteredIds.includes(item.id)} 
                isBuilderMode={isBuilderMode}
                onEditClick={setEditingItem}
              />
            ))}
          </div>
        )}
      </main>

      {/* Feature Modals */}
      {activeModals.live && <LiveTeacher onClose={() => toggleModal('live')} />}
      {activeModals.studio && <ClayifyStudio onClose={() => toggleModal('studio')} />}
      {activeModals.race && <MusiRace onClose={() => toggleModal('race')} />}
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
        />
      )}
      {editingItem && <BuilderModal item={editingItem} lang={lang} onSave={handleSaveMedia} onClose={() => setEditingItem(null)} />}

      {/* LANDMARK DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sky-900/60 backdrop-blur-md overflow-y-auto">
          <div className="clay-card bg-white max-w-5xl w-full my-8 shadow-2xl relative fade-in border-b-[12px] border-sky-100">
             
             {/* Header Controls */}
             <div className="absolute top-6 right-6 z-50 flex gap-4">
                <button 
                  onClick={handleShare}
                  className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-black transition-all hover:bg-sky-600 hover:text-white"
                >
                  📤
                </button>
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black transition-all hover:bg-red-500 hover:text-white"
                >
                  ✕
                </button>
             </div>

             <div className="p-8 md:p-12">
               {/* Video Section */}
               <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-10 border-8 border-sky-50 shadow-2xl group">
                  <video src={selectedItem.videoUrl} className="w-full h-full object-cover" controls autoPlay />
                  <div className="absolute top-6 left-6 bg-white/40 backdrop-blur px-6 py-2 rounded-full border border-white/50">
                    <span className="text-white font-black drop-shadow-sm uppercase tracking-widest text-xs">Cultural Discovery</span>
                  </div>
               </div>

               {/* Title & Info */}
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                 <div className="space-y-3">
                    <h2 className="text-6xl font-black text-sky-900 tracking-tight leading-tight">{selectedItem.title[modalLang]}</h2>
                    <div className="flex items-center gap-4">
                      <span className="px-5 py-2 bg-sky-50 text-sky-400 font-black italic rounded-full border-2 border-sky-100">🗣️ "{selectedItem.pronunciation[modalLang]}"</span>
                      {masteredIds.includes(selectedItem.id) && <span className="text-3xl animate-bounce">⭐</span>}
                    </div>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                   <button 
                    onClick={() => setIsQuizActive(true)} 
                    className="flex-1 sm:flex-none px-12 py-6 bg-yellow-400 text-white rounded-[2.5rem] font-black text-3xl shadow-[0_12px_0_rgb(202,138,4)] transition-all hover:-translate-y-1 active:translate-y-2 active:shadow-none"
                   >
                     Play Game! 🎮
                   </button>
                   <button 
                    onClick={fetchAiInsight}
                    disabled={isAiLoading}
                    className={`flex-1 sm:flex-none px-12 py-6 bg-sky-600 text-white rounded-[2.5rem] font-black text-2xl shadow-[0_12px_0_rgb(8,145,178)] transition-all hover:-translate-y-1 active:translate-y-2 active:shadow-none ${isAiLoading ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                   >
                     {isAiLoading ? 'Consulting...' : "AI Teacher's Secret 🧙‍♂️"}
                   </button>
                 </div>
               </div>

               {/* Local Translation Switcher */}
               <div className="mb-10 flex bg-sky-50 p-2 rounded-full border-2 border-sky-100 w-fit">
                  {(['id', 'en', 'plm'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleModalLangChange(l)}
                      className={`px-8 py-3 rounded-full font-black text-sm transition-all ${
                        modalLang === l 
                        ? 'bg-white text-sky-600 shadow-md scale-105' 
                        : 'text-sky-400/60 hover:text-sky-600'
                      }`}
                    >
                      {l === 'id' ? '🇮🇩 Bahasa Indonesia' : l === 'en' ? '🇬🇧 English' : '🚣 Baso Palembang'}
                    </button>
                  ))}
               </div>

               <p className="text-3xl text-sky-800 font-bold mb-12 leading-relaxed opacity-90">{selectedItem.description[modalLang]}</p>

               {/* Explainable AI: Sage Insights */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                 {/* Static Fun Fact */}
                 <div className="bg-orange-50 border-4 border-dashed border-orange-200 p-10 rounded-[4rem] relative overflow-hidden">
                   <div className="absolute -top-4 -right-4 text-8xl opacity-10 rotate-12">💡</div>
                   <h3 className="text-2xl font-black text-orange-600 mb-4 flex items-center gap-3">
                     <span>✨</span> {UI_STRINGS.didYouKnow[modalLang]}
                   </h3>
                   <p className="text-2xl text-orange-900/80 font-bold italic leading-relaxed">"{selectedItem.funFact[modalLang]}"</p>
                 </div>

                 {/* Dynamic AI Deep Dive */}
                 <div 
                   ref={aiSectionRef}
                   className="bg-sky-50 border-4 border-sky-100 p-10 rounded-[4rem] relative overflow-hidden flex flex-col"
                 >
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-black text-sky-600 flex items-center gap-3">
                        <span>🧙‍♂️</span> Sage Wisdom
                      </h3>
                      {!aiInsight && !isAiLoading && (
                        <button 
                          onClick={fetchAiInsight}
                          className="bg-sky-600 text-white px-6 py-3 rounded-full font-black text-sm shadow-lg hover:bg-sky-700 transition"
                        >
                          Deep Dive! ✨
                        </button>
                      )}
                   </div>

                   {isAiLoading ? (
                     <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
                        <div className="w-32 h-32 opacity-50"><LottiePlayer url="https://assets2.lottiefiles.com/packages/lf20_m6cuL6.json" className="w-full h-full" /></div>
                        <p className="text-sky-400 font-black animate-pulse">Consulting the ancients...</p>
                     </div>
                   ) : aiInsight ? (
                     <div className="space-y-6 fade-in">
                        <div>
                          <span className="text-[10px] font-black text-sky-300 uppercase tracking-widest block mb-1">📜 The Legend</span>
                          <p className="text-lg font-bold text-sky-900/70 leading-relaxed">{aiInsight.originStory}</p>
                        </div>
                        <div className="bg-white/50 p-6 rounded-3xl border-2 border-white/80">
                          <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block mb-1">🌈 Why it's Awesome</span>
                          <p className="text-xl font-black text-sky-900 leading-tight">{aiInsight.coolFactor}</p>
                        </div>
                        <div className="pt-2 border-t-2 border-sky-100 border-dashed">
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">🎯 Your Mission</span>
                          <p className="text-lg font-bold text-emerald-700 italic">{aiInsight.secretChallenge}</p>
                        </div>
                     </div>
                   ) : (
                     <p className="text-sky-900/40 font-bold text-center italic py-10">
                       "Tap the AI Teacher's Secret button above to ask Sage Zephyr for magical secrets in your chosen language!"
                     </p>
                   )}
                 </div>
               </div>

               {/* Footer Action */}
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

      {isQuizActive && selectedItem && (
        <QuizModule questions={selectedItem.quiz} lang={modalLang} onClose={() => setIsQuizActive(false)} onComplete={(score) => {
          if (score === selectedItem.quiz.length) {
            const newList = [...masteredIds];
            if (!newList.includes(selectedItem.id)) {
              newList.push(selectedItem.id);
              setMasteredIds(newList);
              localStorage.setItem('palembang-kidz-mastery', JSON.stringify(newList));
            }
          }
          setIsQuizActive(false);
        }} />
      )}
    </div>
  );
};

export default App;
