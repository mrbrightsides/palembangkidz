
import React, { useState } from 'react';
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

const QuizEngine: React.FC<Props> = ({ questions, lang, onComplete, onClose }) => {
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
      if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setFeedback('correct');
      if (newStreak >= 2) {
        setShowStreakCelebration(true);
        setTimeout(() => setShowStreakCelebration(false), 2000);
      }
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
      }, 1500);
    } else {
      if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
      setStreak(0);
      setFeedback('wrong');
      setIsAiLoading(true);
      const q = questions[currentIndex];
      const explanation = await aiService.getQuizFeedback(q.question, q.options[index], q.options[q.correctIndex], lang);
      setAiFeedbackText(explanation);
      setIsAiLoading(false);
      audioService.speak(explanation, 'Zephyr');
    }
  };

  const handleContinue = () => {
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

  const handleRetry = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    setFeedback(null);
    setUserChoiceIdx(null);
    setAiFeedbackText(null);
  };

  if (isFinished) {
    const isPerfect = score === questions.length;
    return (
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
        <div className="clay-card bg-white p-12 max-w-lg w-full text-center relative overflow-hidden border-b-[12px] border-sky-200">
          <div className="w-56 h-56 mx-auto mb-6">
            <LottiePlayer url={isPerfect ? "https://lottie.host/801a24d5-83f6-4d2d-8b6a-9f5e55e3782a/D6W2hX8v1C.json" : "https://lottie.host/3141f486-4f40-410c-8433-f54f76274094/R08Rk7q9w2.json"} className="w-full h-full" />
          </div>
          <h2 className="text-5xl font-black text-sky-900 mb-3">{isPerfect ? 'MASTERED! 🏆' : 'GOOD TRY! 👍'}</h2>
          <div className="bg-sky-50 rounded-[2rem] p-6 mb-8 border-2 border-sky-100">
            <p className="text-2xl text-sky-700 font-black">{score} / {questions.length} Correct</p>
          </div>
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleRetry} 
              className="bg-sky-600 text-white font-black py-4 px-10 rounded-[2rem] shadow-[0_8px_0_rgb(8,145,178)] hover:-translate-y-1 active:translate-y-2 active:shadow-none transition-all text-xl"
            >
              Retry Quiz 🔄
            </button>
            <button 
              onClick={onClose} 
              className="bg-orange-500 text-white font-black py-4 px-10 rounded-[2rem] shadow-[0_8px_0_rgb(194,65,12)] hover:-translate-y-1 active:translate-y-2 active:shadow-none transition-all text-xl"
            >
              Back to Home 🏠
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      {showStreakCelebration && (
        <div className="absolute inset-0 z-[300] pointer-events-none flex items-center justify-center">
          <h4 className="text-8xl font-black text-white drop-shadow-[0_10px_0_rgba(0,0,0,0.3)] animate-clay-jerky">{streak} COMBO! 🔥</h4>
        </div>
      )}
      <div className="clay-card bg-white p-8 max-w-lg w-full relative min-h-[500px] flex flex-col border-b-[10px] border-sky-200">
        {feedback && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 rounded-[2rem] p-8 text-center overflow-y-auto">
            {feedback === 'wrong' ? (
              <div className="space-y-6 w-full flex flex-col items-center">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-sky-50 p-1"><img src={VOICE_AVATARS.Zephyr.img} className="w-full h-full rounded-full" alt="Zephyr" /></div>
                  <div className="text-left"><h3 className="text-xl font-black text-sky-900">Sage Advice</h3></div>
                </div>
                <div className="bg-sky-50 p-6 rounded-[2rem] border-2 border-sky-100 w-full relative">
                  {isAiLoading ? <div className="h-4 w-3/4 bg-sky-200 rounded animate-pulse mx-auto" /> : <p className="text-lg font-bold text-sky-800 leading-relaxed italic">"{aiFeedbackText}"</p>}
                </div>
                {!isAiLoading && <button onClick={handleContinue} className="bg-sky-600 text-white px-10 py-4 rounded-full font-black text-xl shadow-lg active:scale-95 w-full">Got it! 🚀</button>}
              </div>
            ) : <div className="text-center"><h3 className="text-6xl font-black text-green-500 animate-bounce">YES! ⚡</h3></div>}
          </div>
        )}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-2">
            <span className="bg-sky-600 text-white px-4 py-1.5 rounded-2xl font-black text-xs uppercase tracking-widest">Question {currentIndex + 1}</span>
            <div className="w-40 h-3 bg-sky-100 rounded-full overflow-hidden border-2 border-white shadow-inner">
              <div className="h-full bg-yellow-400 transition-all duration-700" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-[1.2rem] bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center font-bold">✕</button>
        </div>
        <h2 className="text-2xl font-black text-sky-900 mb-8 leading-tight">{currentQ.question}</h2>
        <div className="grid grid-cols-1 gap-4 mt-auto">
          {currentQ.options.map((opt, idx) => (
            <button key={idx} disabled={!!feedback} onClick={() => handleAnswer(idx)} className="group p-5 rounded-[2rem] border-[4px] border-sky-50 hover:border-yellow-400 hover:bg-yellow-50 text-sky-900 font-black text-left transition-all flex items-center gap-5 active:scale-[0.97] shadow-sm">
              <span className="w-10 h-10 rounded-[1.2rem] bg-sky-100 group-hover:bg-yellow-200 flex items-center justify-center text-sky-600 group-hover:text-yellow-700 font-black">{String.fromCharCode(65 + idx)}</span>
              <span className="text-lg">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizEngine;
