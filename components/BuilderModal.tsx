
import React, { useState } from 'react';
import { CultureItem, Language } from '../types';

interface Props {
  item: CultureItem;
  lang: Language;
  onSave: (itemId: string, updates: { imageUrl: string; videoUrl: string }) => void;
  onClose: () => void;
}

const BuilderModal: React.FC<Props> = ({ item, lang, onSave, onClose }) => {
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [videoUrl, setVideoUrl] = useState(item.videoUrl);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="clay-card bg-white w-full max-w-md p-8 relative border-b-[10px] border-sky-100">
        <button onClick={onClose} className="absolute top-6 right-6 text-sky-300 hover:text-red-500 font-black text-xl">✕</button>
        
        <h2 className="text-2xl font-black text-sky-900 mb-6 flex items-center gap-2">
          <span>🛠️</span> Customize Media
        </h2>
        
        <p className="text-sm font-bold text-sky-600 mb-6 bg-sky-50 p-4 rounded-2xl border-2 border-sky-100">
          Editing: <span className="text-sky-900 font-black">{item.title[lang]}</span>
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-sky-400 uppercase ml-2">Image URL</label>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-4 rounded-2xl bg-sky-50 border-4 border-white shadow-inner text-sky-900 font-bold focus:outline-none focus:ring-4 focus:ring-sky-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-sky-400 uppercase ml-2">Video URL (Direct link)</label>
            <input 
              type="text" 
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-4 rounded-2xl bg-sky-50 border-4 border-white shadow-inner text-sky-900 font-bold focus:outline-none focus:ring-4 focus:ring-sky-200"
              placeholder="https://example.com/video.mp4"
            />
          </div>

          <button 
            onClick={() => onSave(item.id, { imageUrl, videoUrl })}
            className="w-full py-4 bg-sky-600 text-white rounded-2xl font-black text-xl shadow-[0_8px_0_rgb(8,145,178)] active:translate-y-1 active:shadow-none transition-all"
          >
            Update Card! ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderModal;
