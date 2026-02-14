
import React from 'react';
import { CultureItem, Language } from '../types';
import { CULTURE_DATA } from '../constants';

interface Props {
  completedIds: string[];
  masteredIds: string[];
  lang: Language;
  onSelectQuiz: (item: CultureItem) => void;
  onClose: () => void;
}

const QuizHub: React.FC<Props> = ({ completedIds, masteredIds, lang, onSelectQuiz, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-sky-900/60 backdrop-blur-xl">
      <div className="clay-card bg-white w-full max-w-4xl p-10 overflow-hidden relative border-b-[12px] border-yellow-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-sky-300 hover:text-red-500 font-black text-2xl transition-colors">✕</button>
        
        <div className="text-center mb-10">
          <h2 className="text-5xl font-black text-sky-900 flex items-center justify-center gap-4">
            <span className="text-6xl">🏆</span> Quiz Quest Hub
          </h2>
          <p className="text-sky-500 font-bold mt-2 text-xl">Unlock landmarks to test your mastery!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
          {CULTURE_DATA.map((item) => {
            const isUnlocked = completedIds.includes(item.id);
            const isMastered = masteredIds.includes(item.id);
            
            return (
              <button
                key={item.id}
                disabled={!isUnlocked}
                onClick={() => onSelectQuiz(item)}
                className={`group relative p-6 rounded-[2.5rem] border-4 transition-all flex flex-col items-center gap-4 text-center ${
                  isUnlocked 
                    ? 'bg-white border-sky-100 hover:border-yellow-400 hover:-translate-y-2 shadow-lg' 
                    : 'bg-gray-100 border-transparent opacity-50 cursor-not-allowed grayscale'
                }`}
              >
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-md relative">
                  <img src={item.imageUrl} alt={item.title[lang]} className="w-full h-full object-cover" />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-black text-sky-900 leading-tight">{item.title[lang]}</h3>
                  {isUnlocked && (
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isMastered ? 'bg-yellow-400 text-white' : 'bg-sky-100 text-sky-400'}`}>
                        {isMastered ? 'MASTERED ⭐' : 'CHALLENGE AVAILABLE'}
                      </span>
                    </div>
                  )}
                </div>

                {isUnlocked && (
                  <div className="mt-2 w-full py-2 bg-sky-50 rounded-2xl group-hover:bg-yellow-400 group-hover:text-white transition-colors font-black text-xs text-sky-600">
                    PLAY QUIZ ➔
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t-2 border-dashed border-sky-100 pt-8">
           <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-black text-sky-900">{completedIds.length}</p>
                <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Unlocked</p>
              </div>
              <div className="w-px h-10 bg-sky-100" />
              <div className="text-center">
                <p className="text-3xl font-black text-yellow-500">{masteredIds.length}</p>
                <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Mastered</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHub;
