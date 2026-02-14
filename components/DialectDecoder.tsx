
import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { audioService } from '../services/audioService';

const DialectDecoder: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);

  const handleDecode = async () => {
    if (!input.trim()) return;
    setIsDecoding(true);
    const result = await aiService.translateToPalembang(input);
    setOutput(result);
    setIsDecoding(false);
  };

  const handleSpeak = () => {
    if (output) {
      audioService.speak(output, 'Zephyr');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-orange-900/60 backdrop-blur-xl">
      <div className="clay-card bg-white w-full max-w-xl p-10 relative border-b-[12px] border-orange-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-orange-200 hover:text-orange-500 font-black text-2xl">✕</button>
        
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-orange-100 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-inner">
            <span className="text-5xl animate-spin-slow">⚙️</span>
          </div>
          <h2 className="text-3xl font-black text-orange-900">Basa Decoder</h2>
          <p className="text-orange-400 font-bold">Translate anything to Baso Palembang!</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-orange-300 uppercase ml-4">Input Text</label>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type in Indonesian or English..."
              className="w-full p-6 rounded-[2rem] bg-orange-50 border-4 border-orange-100 text-orange-900 font-black text-lg focus:ring-4 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <button 
            onClick={handleDecode}
            disabled={isDecoding || !input.trim()}
            className="w-full py-5 bg-orange-500 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(194,65,12)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3"
          >
            {isDecoding ? 'Decoding...' : '✨ Decode Now!'}
          </button>

          {output && (
            <div className="mt-8 p-8 bg-yellow-50 rounded-[2.5rem] border-4 border-dashed border-yellow-200 relative fade-in flex flex-col items-center">
              <span className="absolute -top-4 left-6 bg-yellow-400 text-white px-4 py-1 rounded-full text-xs font-black uppercase">Result</span>
              <p className="text-2xl font-black text-orange-900 text-center leading-relaxed mb-4">
                "{output}"
              </p>
              <button 
                onClick={handleSpeak}
                className="flex items-center gap-2 bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-black hover:bg-orange-200 transition-colors shadow-sm"
              >
                <span>🔊</span> Listen to Zephyr
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialectDecoder;
