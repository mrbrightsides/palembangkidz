
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { X, ChevronRight, ChevronLeft, Sparkles, Map as MapIcon, Play, Trophy, Palette } from 'lucide-react';

interface TutorialStep {
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: React.ReactNode;
  color: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: {
      en: 'Welcome! 🌟',
      id: 'Selamat Datang! 🌟',
      plm: 'Payo Datang! 🌟'
    },
    description: {
      en: 'Welcome to PalembangKidz! Ready to explore the magic of Palembang?',
      id: 'Selamat datang di PalembangKidz! Siap menjelajahi keajaiban Palembang?',
      plm: 'Selamat datang di PalembangKidz! Siap dak kito jalan-jalan keliling Palembang?'
    },
    icon: <Sparkles className="w-12 h-12 text-yellow-500" />,
    color: 'bg-yellow-100'
  },
  {
    title: {
      en: 'Explore the Map! 🗺️',
      id: 'Jelajahi Peta! 🗺️',
      plm: 'Jingok Peto! 🗺️'
    },
    description: {
      en: 'Use your finger or mouse to move around the map. Look for the floating icons!',
      id: 'Gunakan jari atau mouse untuk berkeliling peta. Cari ikon yang melayang!',
      plm: 'Pake jari atau mouse buat muter-muter di peto. Cari bae ikon yang melayang-layang tu!'
    },
    icon: <MapIcon className="w-12 h-12 text-blue-500" />,
    color: 'bg-blue-100'
  },
  {
    title: {
      en: 'Learn & Listen! 🎧',
      id: 'Belajar & Dengar! 🎧',
      plm: 'Belajau & Dengerke! 🎧'
    },
    description: {
      en: 'Click on any icon to see a video and hear a story about that place or food.',
      id: 'Klik ikon apa saja untuk melihat video dan mendengar cerita tentang tempat atau makanan itu.',
      plm: 'Klik bae ikonnyo buat jingok video samo denger cerito tentang tempat atau makanan itu.'
    },
    icon: <Play className="w-12 h-12 text-green-500" />,
    color: 'bg-green-100'
  },
  {
    title: {
      en: 'Play & Win! 🎮',
      id: 'Main & Menang! 🎮',
      plm: 'Maen & Menang! 🎮'
    },
    description: {
      en: 'Try the Quizzes, Puzzles, and Games to earn cool badges and stamps!',
      id: 'Coba Kuis, Teka-teki, dan Game untuk mendapatkan lencana dan stempel keren!',
      plm: 'Cobo Kuis, Teka-teki, samo Game biar dapet lencana samo stempel yang mantap!'
    },
    icon: <Trophy className="w-12 h-12 text-purple-500" />,
    color: 'bg-purple-100'
  },
  {
    title: {
      en: 'Be Creative! 🎨',
      id: 'Jadi Kreatif! 🎨',
      plm: 'Pacak Kreatif! 🎨'
    },
    description: {
      en: 'Visit the Clayify Studio or Photo Booth to make your own Palembang art!',
      id: 'Kunjungi Studio Clayify atau Photo Booth untuk membuat karya seni Palembangmu sendiri!',
      plm: 'Ke Studio Clayify atau Photo Booth bae buat buat karyo seni Palembang dewek!'
    },
    icon: <Palette className="w-12 h-12 text-pink-500" />,
    color: 'bg-pink-100'
  }
];

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, lang }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden bg-white clay-card"
          >
            {/* Header */}
            <div className={`p-8 flex flex-col items-center text-center ${TUTORIAL_STEPS[currentStep].color} transition-colors duration-500`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <motion.div
                key={currentStep}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-6 p-6 bg-white rounded-full shadow-lg"
              >
                {TUTORIAL_STEPS[currentStep].icon}
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {TUTORIAL_STEPS[currentStep].title[lang]}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {TUTORIAL_STEPS[currentStep].description[lang]}
              </p>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 py-6">
              {TUTORIAL_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep ? 'w-8 bg-blue-500' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 flex items-center justify-between border-t border-gray-100">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {lang === 'en' ? 'Back' : lang === 'id' ? 'Kembali' : 'Balek'}
              </button>

              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all"
              >
                {currentStep === TUTORIAL_STEPS.length - 1 
                  ? (lang === 'en' ? 'Let\'s Go!' : lang === 'id' ? 'Ayo Mulai!' : 'Payo!')
                  : (lang === 'en' ? 'Next' : lang === 'id' ? 'Lanjut' : 'Laju')}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TutorialModal;
