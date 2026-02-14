
import React, { useState, useEffect, useCallback } from 'react';
import { CULTURE_DATA } from '../constants';
import { Language } from '../types';
import { audioService } from '../services/audioService';
import LottiePlayer from './LottiePlayer';

interface Letter {
  char: string;
  id: number;
}

const PuzzledWords: React.FC<{ lang: Language, onClose: () => void }> = ({ lang, onClose }) => {
  const [targetWord, setTargetWord] = useState('');
  const [scrambledLetters, setScrambledLetters] = useState<Letter[]>([]);
  const [userLetters, setUserLetters] = useState<(Letter | null)[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [hintText, setHintText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const startNewGame = useCallback(() => {
    const randomItem = CULTURE_DATA[Math.floor(Math.random() * CULTURE_DATA.length)];
    const word = randomItem.title[lang].toUpperCase();
    setTargetWord(word);
    
    // Use the description as a text-based clue
    setHintText(randomItem.description[lang]);
    
    setShowHint(false);
    setShake(false);
    
    // Create pool of letters (excluding spaces)
    const lettersPool: Letter[] = word
      .split('')
      .filter(char => char !== ' ')
      .map((char, i) => ({ char, id: i }));
    
    // Scramble them
    setScrambledLetters([...lettersPool].sort(() => Math.random() - 0.5));
    
    setUserLetters([]); 
    setIsWon(false);
  }, [lang]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleLetterClick = (letter: Letter) => {
    if (isWon) return;
    
    if (navigator.vibrate) navigator.vibrate(5);
    audioService.playEffect('pop');
    
    const newUserLetters = [...userLetters, letter];
    setUserLetters(newUserLetters);
    setScrambledLetters(prev => prev.filter(l => l.id !== letter.id));

    // Check progress
    const currentString = newUserLetters.map(l => l.char).join('');
    const targetStringNoSpaces = targetWord.replace(/\s/g, '');
    
    if (currentString === targetStringNoSpaces) {
      setIsWon(true);
      audioService.playEffect('success');
      if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
    } else if (currentString.length === targetStringNoSpaces.length) {
      // Incorrect full length
      setShake(true);
      audioService.playEffect('whoosh');
      if (navigator.vibrate) navigator.vibrate(50);
      setTimeout(() => setShake(false), 500);
    }
  };

  const removeUserLetter = (letter: Letter) => {
    if (isWon) return;
    audioService.playEffect('whoosh');
    setUserLetters(prev => prev.filter(l => l?.id !== letter.id));
    setScrambledLetters(prev => [...prev, letter].sort((a, b) => a.id - b.id)); 
  };

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWon) return;
      const key = e.key.toUpperCase();
      
      if (key === 'BACKSPACE' && userLetters.length > 0) {
        removeUserLetter(userLetters[userLetters.length - 1] as Letter);
      } else {
        const matchingLetter = scrambledLetters.find(l => l.char === key);
        if (matchingLetter) {
          handleLetterClick(matchingLetter);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrambledLetters, userLetters, isWon]);

  const renderWordSlots = () => {
    let letterIndex = 0;
    return (
      <div className={`flex flex-wrap justify-center gap-y-4 gap-x-2 transition-transform ${shake ? 'animate-clay-jerky' : ''}`}>
        {targetWord.split(' ').map((wordPart, wordIdx) => (
          <div key={wordIdx} className="flex gap-2 mx-2">
            {wordPart.split('').map((_, charIdx) => {
              const currentLetter = userLetters[letterIndex];
              const isFilled = !!currentLetter;
              const idx = letterIndex;
              letterIndex++;

              return (
                <button
                  key={`${wordIdx}-${charIdx}`}
                  onClick={() => isFilled && removeUserLetter(currentLetter as Letter)}
                  className={`w-10 h-12 md:w-14 md:h-16 rounded-2xl border-b-4 transition-all flex items-center justify-center text-xl md:text-3xl font-black shadow-lg
                    ${isFilled 
                      ? 'bg-white border-purple-200 text-purple-900 scale-100' 
                      : 'bg-purple-100/50 border-purple-200/30 text-transparent scale-95 border-dashed border-2'
                    }
                  `}
                >
                  {currentLetter?.char}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-purple-900/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="clay-card bg-white w-full max-w-3xl p-8 md:p-12 relative border-b-[12px] border-purple-200 flex flex-col items-center">
        {/* Header Controls */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 w-10 h-10 bg-purple-50 text-purple-300 rounded-full flex items-center justify-center hover:text-purple-600 hover:bg-purple-100 transition-all font-black"
        >
          ✕
        </button>
        
        <div className="text-center mb-8">
          <div className="inline-block relative">
             <span className="text-6xl md:text-7xl block animate-spin-slow">🔤</span>
             <div className="absolute -top-2 -right-2 bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white font-black text-xs animate-bounce">
               !
             </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-purple-900 mt-4 tracking-tight">Puzzled Words</h2>
          <p className="text-purple-400 font-bold">Unscramble the secret Palembang name!</p>
        </div>

        {/* Game Area */}
        <div className="w-full flex flex-col items-center gap-12">
          
          {/* Target Slots */}
          <div className="w-full min-h-[100px] flex items-center justify-center">
            {renderWordSlots()}
          </div>

          {/* Letter Pool */}
          <div className="flex flex-wrap justify-center gap-3 max-w-lg">
            {scrambledLetters.map((l) => (
              <button
                key={l.id}
                onClick={() => handleLetterClick(l)}
                className="w-12 h-12 md:w-14 md:h-14 bg-purple-500 text-white rounded-2xl border-b-4 border-purple-700 flex items-center justify-center text-xl md:text-2xl font-black shadow-lg hover:scale-110 active:translate-y-1 active:border-b-0 transition-all hover:bg-purple-400"
              >
                {l.char}
              </button>
            ))}
          </div>

          {/* Utility Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowHint(!showHint)}
              className={`px-8 py-3 rounded-full font-black text-sm border-2 transition-all flex items-center gap-2
                ${showHint 
                  ? 'bg-yellow-500 text-white border-white scale-105 shadow-lg' 
                  : 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200'
                }
              `}
            >
              <span>{showHint ? '💡' : '❓'}</span>
              {showHint ? 'Hint Active' : 'Show Hint'}
            </button>
            
            <button 
              onClick={startNewGame}
              className="px-6 py-3 bg-purple-50 text-purple-400 rounded-full font-black text-sm hover:bg-purple-100 transition-all"
            >
              Skip Word ➔
            </button>
          </div>

          {showHint && (
            <div className="w-full max-w-md p-6 bg-yellow-50 rounded-[2rem] border-4 border-dashed border-yellow-200 shadow-xl fade-in relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
                <span className="text-4xl text-yellow-400">📜</span>
              </div>
              <h4 className="text-xs font-black text-yellow-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span>🔍</span> Clue for you:
              </h4>
              <p className="text-lg font-bold text-yellow-900 leading-relaxed italic">
                "{hintText}"
              </p>
            </div>
          )}
        </div>

        {/* Win Modal Overlay */}
        {isWon && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 rounded-[2.5rem] p-8 fade-in text-center shadow-inner">
            <div className="w-64 h-64 -mt-10">
              <LottiePlayer 
                url="https://lottie.host/801a24d5-83f6-4d2d-8b6a-9f5e55e3782a/D6W2hX8v1C.json" 
                className="w-full h-full" 
              />
            </div>
            <div className="space-y-2 mb-10">
              <h3 className="text-4xl md:text-5xl font-black text-purple-900 animate-clay-jerky">NICE WORK! ✨</h3>
              <p className="text-purple-400 font-bold text-lg italic">You decoded the mystery!</p>
            </div>
            
            <div className="bg-purple-50 px-10 py-6 rounded-[2.5rem] border-4 border-dashed border-purple-200 mb-8 transform -rotate-2">
              <p className="text-3xl md:text-4xl font-black text-purple-600 tracking-widest">
                {targetWord}
              </p>
            </div>

            <button 
              onClick={startNewGame}
              className="px-16 py-6 bg-purple-600 text-white rounded-[2.5rem] font-black text-2xl shadow-[0_12px_0_rgb(88,28,135)] active:translate-y-2 active:shadow-none transition-all hover:-translate-y-1 hover:bg-purple-700 flex items-center gap-4"
            >
              Next Word ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzledWords;
