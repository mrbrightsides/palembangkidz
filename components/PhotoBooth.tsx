
import React, { useState, useRef, useEffect } from 'react';
import { ScrapbookSticker } from '../types';
import { CULTURE_DATA } from '../constants';
import { audioService } from '../services/audioService';

const PhotoBooth: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [stickers, setStickers] = useState<ScrapbookSticker[]>([]);
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(media);
      if (videoRef.current) videoRef.current.srcObject = media;
    } catch (e) {
      alert("Please allow camera access to use the Photo Booth! 📸");
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx?.drawImage(videoRef.current, 0, 0);
      setPhoto(canvasRef.current.toDataURL('image/png'));
      stopCamera();
      audioService.playEffect('success');
    }
  };

  const addSticker = (itemId: string) => {
    const newSticker: ScrapbookSticker = {
      id: `sticker-${Date.now()}`,
      itemId,
      posX: 50,
      posY: 50,
      rotation: 0,
      scale: 1
    };
    setStickers([...stickers, newSticker]);
    setActiveStickerId(newSticker.id);
    audioService.playEffect('pop');
  };

  const updateSticker = (id: string, updates: Partial<ScrapbookSticker>) => {
    setStickers(stickers.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeSticker = (id: string) => {
    setStickers(stickers.filter(s => s.id !== id));
    audioService.playEffect('whoosh');
  };

  const saveMasterpiece = async () => {
    if (!photo || !canvasRef.current || isSaving) return;
    setIsSaving(true);

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = canvasRef.current.width;
    finalCanvas.height = canvasRef.current.height;
    const ctx = finalCanvas.getContext('2d');
    if (!ctx) return;

    // Helper to load images
    const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

    try {
      // Load base photo
      const baseImg = await loadImage(photo);
      ctx.drawImage(baseImg, 0, 0);

      // Load and draw all stickers
      for (const s of stickers) {
        const item = CULTURE_DATA.find(i => i.id === s.itemId);
        if (!item) continue;
        
        const sImg = await loadImage(item.imageUrl);
        const x = (s.posX / 100) * finalCanvas.width;
        const y = (s.posY / 100) * finalCanvas.height;
        const size = 200 * s.scale; // Increased base sticker size in capture
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((s.rotation * Math.PI) / 180);
        ctx.drawImage(sImg, -size / 2, -size / 2, size, size);
        ctx.restore();
      }

      const dataUrl = finalCanvas.toDataURL('image/png');

      // Try Web Share first
      if (navigator.share) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'palembang-selfie.png', { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: 'My Palembang Selfie! 🤳',
            text: 'Check out my cool photo from PalembangKidz! ✨'
          });
          return;
        } catch (err) {
          console.log('Sharing failed, falling back to download', err);
        }
      }

      // Fallback to download
      const link = document.createElement('a');
      link.download = 'palembang-selfie.png';
      link.href = dataUrl;
      link.click();
      audioService.playEffect('success');
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Oh no! Something went wrong saving your photo. Try again! 💫');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] bg-emerald-900/90 backdrop-blur-xl flex items-center justify-center p-6 overflow-hidden">
      <div className="clay-card bg-white w-full max-w-6xl h-[90vh] flex flex-col md:flex-row overflow-hidden relative border-b-[12px] border-emerald-100 shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-400 font-black shadow-lg hover:bg-red-500 hover:text-white transition-all">✕</button>

        {/* Sticker Bin */}
        <div className="w-full md:w-80 bg-emerald-50/50 p-8 border-r-4 border-dashed border-emerald-100 overflow-y-auto shrink-0">
          <h3 className="text-2xl font-black text-emerald-900 mb-6 flex items-center gap-2"><span>✨</span> Props Bin</h3>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
            {CULTURE_DATA.slice(0, 10).map(item => (
              <button 
                key={item.id} 
                onClick={() => addSticker(item.id)}
                className="aspect-square bg-white rounded-2xl border-4 border-white shadow-md hover:scale-110 active:scale-95 overflow-hidden group"
              >
                <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.id} />
              </button>
            ))}
          </div>
          
          {activeStickerId && (
            <div className="mt-8 p-6 bg-white rounded-3xl border-2 border-emerald-100 shadow-inner fade-in">
              <p className="text-[10px] font-black text-emerald-300 uppercase mb-4 tracking-widest text-center">Adjust Sticker</p>
              <div className="space-y-4">
                <input type="range" min="0" max="360" onChange={(e) => updateSticker(activeStickerId, { rotation: parseInt(e.target.value) })} className="w-full accent-emerald-500" />
                <input type="range" min="0.2" max="3" step="0.1" onChange={(e) => updateSticker(activeStickerId, { scale: parseFloat(e.target.value) })} className="w-full accent-emerald-500" />
                <button onClick={() => removeSticker(activeStickerId)} className="w-full py-2 bg-red-50 text-red-500 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-colors">Remove Sticker</button>
              </div>
            </div>
          )}
        </div>

        {/* Viewport */}
        <div className="flex-1 bg-black relative flex items-center justify-center">
          {/* Instruction Bar */}
          <div className="absolute top-0 left-0 right-0 z-[60] bg-emerald-500 text-white py-2 text-center font-black text-xs uppercase tracking-widest shadow-lg">
            {!photo ? "Step 1: Strike a pose & tap the button! 📸" : "Step 2: Add props & Save! ✨"}
          </div>

          {!photo ? (
            <div className="relative w-full h-full">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover mirror scale-x-[-1]" />
              <div className="absolute inset-0 border-[20px] border-emerald-100/20 pointer-events-none" />
              <button 
                onClick={capturePhoto} 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white border-8 border-emerald-400 shadow-2xl active:scale-90 transition-all flex items-center justify-center group"
              >
                <div className="w-14 h-14 bg-emerald-500 rounded-full group-hover:scale-110 transition" />
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full bg-[#f0fff4] overflow-hidden">
              <img src={photo} className="w-full h-full object-cover" alt="Selfie" />
              
              {stickers.map(s => (
                <div
                  key={s.id}
                  className={`absolute cursor-move select-none ${activeStickerId === s.id ? 'z-50' : 'z-20'}`}
                  style={{
                    left: `${s.posX}%`,
                    top: `${s.posY}%`,
                    transform: `translate(-50%, -50%) rotate(${s.rotation}deg) scale(${s.scale})`
                  }}
                  onMouseDown={(e) => {
                    setActiveStickerId(s.id);
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const onMouseMove = (me: MouseEvent) => {
                      const dx = ((me.clientX - startX) / e.currentTarget.parentElement!.clientWidth) * 100;
                      const dy = ((me.clientY - startY) / e.currentTarget.parentElement!.clientHeight) * 100;
                      updateSticker(s.id, { posX: s.posX + dx, posY: s.posY + dy });
                    };
                    const onMouseUp = () => {
                      window.removeEventListener('mousemove', onMouseMove);
                      window.removeEventListener('mouseup', onMouseUp);
                    };
                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                  }}
                >
                  <img 
                    src={CULTURE_DATA.find(item => item.id === s.itemId)!.imageUrl} 
                    className="w-40 h-40 object-contain drop-shadow-2xl" 
                    draggable={false}
                    alt="Sticker" 
                  />
                </div>
              ))}
              
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                <button onClick={() => { setPhoto(null); setStickers([]); startCamera(); }} disabled={isSaving} className="bg-white/90 px-8 py-4 rounded-full font-black text-emerald-900 shadow-xl hover:bg-white transition active:scale-95 disabled:opacity-50">Retake 📸</button>
                <button onClick={saveMasterpiece} disabled={isSaving} className="bg-emerald-500 px-10 py-4 rounded-full font-black text-white shadow-xl hover:bg-emerald-600 transition active:scale-95 disabled:opacity-50 flex items-center gap-3">
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save & Share ✨</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoBooth;
