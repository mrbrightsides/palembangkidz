
import React, { useState, useEffect } from 'react';
import { QuizQuestion, Language } from '../types';
import LottiePlayer from './LottiePlayer';
import { aiService } from '../services/aiService';
import { audioService } from '../services/audioService';
import { VOICE_AVATARS } from '../constants';

interface Props {
  questions: QuizQuestion[];
  lang: Language;
  onComplete: (score: number) => void;
  onClose: () => void;
}

const QuizModule: React.FC<Props> = ({ questions, lang, onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [userChoiceIdx, setUserChoiceIdx] = useState<number | null>(null);
  const [aiFeedbackText, setAiFeedbackText] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);

  const handleAnswer = async (index: number) => {
    if (feedback) return;

    setUserChoiceIdx(index);
    const isCorrect = index === questions[currentIndex].correctIndex;
    
    if (isCorrect) {
      if (navigator.vibrate) {
        // Success double-tap haptic
        navigator.vibrate([10, 50, 10]);
      }
      const newStreak = streak + 1;
      setStreak(newStreak);
      setFeedback('correct');
      
      // Trigger special celebration for "series of questions" (streak of 2+)
      if (newStreak >= 2) {
        setShowStreakCelebration(true);
        setTimeout(() => setShowStreakCelebration(false), 2000);
      }

      // Automatically advance after a short delay for correct answers
      setTimeout(() => {
        const newScore = score + 1;
        setFeedback(null);
        setUserChoiceIdx(null);
        if (currentIndex < questions.length - 1) {
          setScore(newScore);
          setCurrentIndex(c => c + 1);
        } else {
          setScore(newScore);
          setIsFinished(true);
          onComplete(newScore);
        }
      }, 1800);
    } else {
      if (navigator.vibrate) {
        // Error heavy-tap haptic
        navigator.vibrate([50, 100, 50]);
      }
      setStreak(0);
      setFeedback('wrong');
      setIsAiLoading(true);

      const q = questions[currentIndex];
      const explanation = await aiService.getQuizFeedback(
        q.question, 
        q.options[index], 
        q.options[q.correctIndex], 
        lang
      );
      
      setAiFeedbackText(explanation);
      setIsAiLoading(false);
      audioService.speak(explanation, 'Zephyr');
    }
  };

  const handleContinue = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setFeedback(null);
    setAiFeedbackText(null);
    setUserChoiceIdx(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setIsFinished(true);
      onComplete(score);
    }
  };

  const handleFinishClose = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    onClose();
  };

  if (isFinished) {
    const isPerfect = score === questions.length;
    const isHighScore = score >= Math.ceil(questions.length * 0.7);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
        <div className="clay-card bg-white p-12 max-w-lg w-full text-center relative overflow-hidden fade-in border-b-[12px] border-sky-200">
          
          {(isPerfect || isHighScore) && (
            <div className="absolute inset-0 pointer-events-none z-0">
              <LottiePlayer 
                url="https://lottie.host/9e4d5884-6997-4007-96a1-633005a76953/6pW6O5ZOnA.json" 
                className="w-full h-full opacity-40 scale-150"
                loop={true}
              />
            </div>
          )}
          
          <div className="relative z-10">
            <div className="w-56 h-56 mx-auto mb-6">
              {isPerfect ? (
                <LottiePlayer 
                  url="https://lottie.host/801a24d5-83f6-4d2d-8b6a-9f5e55e3782a/D6W2hX8v1C.json" 
                  className="w-full h-full"
                  loop={true}
                />
              ) : isHighScore ? (
                <LottiePlayer 
                  url="https://lottie.host/433157e4-850c-403d-9d41-45037d00f576/p5XUfP2T9u.json" 
                  className="w-full h-full"
                  loop={true}
                />
              ) : (
                <LottiePlayer 
                  url="https://lottie.host/3141f486-4f40-410c-8433-f54f76274094/R08Rk7q9w2.json" 
                  className="w-full h-full"
                  loop={true}
                />
              )}
            </div>
            
            <h2 className="text-5xl font-black text-sky-900 mb-3 tracking-tight">
              {isPerfect ? 'PERFECT! 🏆' : isHighScore ? 'AWESOME! 🌟' : 'GOOD JOB! 👍'}
            </h2>
            
            <div className="bg-sky-50 rounded-[2rem] p-6 mb-8 border-2 border-sky-100 shadow-inner">
              <p className="text-2xl text-sky-700 font-black">
                {score} / {questions.length} Correct
              </p>
              <p className="text-lg text-sky-600/70 font-bold mt-1">
                {isPerfect 
                  ? 'You are a Palembang Legend!' 
                  : 'You are learning so fast! Keep it up!'}
              </p>
            </div>
            
            <button 
              onClick={handleFinishClose}
              className="group relative bg-orange-500 hover:bg-orange-600 text-white font-black py-5 px-14 rounded-[2.5rem] shadow-[0_12px_0_rgb(194,65,12)] transform transition hover:-translate-y-1 active:translate-y-2 active:shadow-none text-2xl tracking-tight"
            >
              <span className="relative z-10">Main Lagi! 🏠</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      {showStreakCelebration && (
        <div className="absolute inset-0 z-[60] pointer-events-none flex items-center justify-center animate-bounce">
          <div className="relative">
            <div className="w-[30rem] h-[30rem]">
              <LottiePlayer 
                url="https://lottie.host/626d9101-70e1-451e-9243-913495147f20/vL6T9H6w8b.json" 
                className="w-full h-full"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
              <h4 className="text-7xl font-black text-white drop-shadow-[0_10px_0_rgba(0,0,0,0.3)] animate-clay-jerky">
                {streak} COMBO! 🔥
              </h4>
            </div>
          </div>
        </div>
      )}

      <div className="clay-card bg-white p-8 max-w-lg w-full fade-in shadow-2xl border-b-[10px] border-sky-200 relative min-h-[500px] flex flex-col overflow-y-auto">
        {feedback && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 rounded-[2rem] p-8 fade-in text-center overflow-y-auto">
            {feedback === 'wrong' ? (
              <div className="space-y-6 w-full flex flex-col items-center">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-full border-4 border-sky-100 bg-sky-50 shadow-md p-1">
                    <img src={VOICE_AVATARS.Zephyr.img} className="w-full h-full rounded-full" alt="Zephyr" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-black text-sky-900 tracking-tight">Sage Wisdom</h3>
                    <p className="text-sky-500 font-bold text-sm">Zephyr is explaining...</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className="bg-red-50 border-2 border-red-100 p-4 rounded-3xl flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[10px] font-black text-red-300 uppercase block">Your Choice</span>
                      <span className="text-red-900 font-bold">{currentQ.options[userChoiceIdx!]}</span>
                    </div>
                    <span className="text-2xl">❌</span>
                  </div>
                  <div className="bg-green-50 border-2 border-green-100 p-4 rounded-3xl flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[10px] font-black text-green-300 uppercase block">Correct Answer</span>
                      <span className="text-green-900 font-bold">{currentQ.options[currentQ.correctIndex]}</span>
                    </div>
                    <span className="text-2xl">✅</span>
                  </div>
                </div>

                <div className="bg-sky-50 p-6 rounded-[2rem] border-2 border-sky-100 shadow-inner w-full relative">
                  <div className="absolute -top-3 left-8 w-6 h-6 bg-sky-50 rotate-45 border-l-2 border-t-2 border-sky-100" />
                  {isAiLoading ? (
                    <div className="flex flex-col items-center gap-3 animate-pulse">
                      <div className="h-4 w-3/4 bg-sky-200 rounded" />
                      <div className="h-4 w-1/2 bg-sky-200 rounded" />
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-sky-800 leading-relaxed italic">
                      "{aiFeedbackText}"
                    </p>
                  )}
                </div>

                {!isAiLoading && (
                  <button 
                    onClick={handleContinue}
                    className="mt-4 bg-sky-600 text-white px-10 py-4 rounded-full font-black text-xl shadow-lg transform transition active:scale-95 hover:bg-sky-700 w-full"
                  >
                    I Got It! 🚀
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-64 h-64">
                  <LottiePlayer 
                    url="https://lottie.host/29e16053-96b6-4074-9548-d306b38c2f1f/o8N2V5z6pM.json"
                    className="w-full h-full"
                    loop={false}
                  />
                </div>
                <h3 className="text-5xl font-black mt-2 tracking-tighter text-green-500 animate-clay-jerky">
                  YES! ⚡
                </h3>
                <p className="text-sky-900/40 font-black mt-2">Next challenge incoming...</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-sky-600 text-white px-4 py-1.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-md">
                Level {currentIndex + 1}
              </span>
              {streak > 1 && (
                <span className="bg-orange-500 text-white px-3 py-1.5 rounded-2xl font-black text-xs animate-pulse">
                  🔥 {streak} Streak
                </span>
              )}
            </div>
            <div className="w-40 h-3 bg-sky-100 rounded-full overflow-hidden border-2 border-white shadow-inner">
              <div 
                className="h-full bg-yellow-400 transition-all duration-700 ease-out" 
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 rounded-[1.2rem] bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all transform hover:rotate-90 flex items-center justify-center font-bold shadow-sm"
          >
            ✕
          </button>
        </div>

        <h2 className="text-2xl font-black text-sky-900 mb-8 leading-tight tracking-tight">
          {currentQ.question}
        </h2>

        <div className="grid grid-cols-1 gap-4 mt-auto">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={!!feedback}
              onClick={() => handleAnswer(idx)}
              className="group p-5 rounded-[2rem] border-[4px] border-sky-50 hover:border-yellow-400 hover:bg-yellow-50 text-sky-900 font-black text-left transition-all flex items-center gap-5 relative overflow-hidden active:scale-[0.97] disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              <span className="w-12 h-12 rounded-[1.2rem] bg-sky-100 group-hover:bg-yellow-200 flex items-center justify-center text-sky-600 group-hover:text-yellow-700 transition-colors font-black text-xl shadow-inner flex-shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-lg tracking-tight leading-tight">{opt}</span>
              
              <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <span className="text-2xl">✨</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizModule;
