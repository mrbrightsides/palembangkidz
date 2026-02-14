
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { VOICE_AVATARS } from '../constants';

// Helper functions from guidelines for robust encoding/decoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const LiveTeacher: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcription]);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      // Use process.env.API_KEY directly for initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are Zephyr, a wise and friendly 3D claymation Palembang culture teacher. Talk to the child warmly about Palembang food, history, and landmarks. Keep it simple and fun.',
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const input = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(input.length);
              for (let i = 0; i < input.length; i++) int16[i] = input[i] * 32768;
              // Use manual encode function to avoid stack overflow with large arrays
              const base64 = encode(new Uint8Array(int16.buffer));
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64 = msg.serverContent.modelTurn.parts[0].inlineData.data;
              const bytes = decode(base64);
              
              const ctx = audioContextRef.current!;
              const int16 = new Int16Array(bytes.buffer);
              const buffer = ctx.createBuffer(1, int16.length, 24000);
              const channelData = buffer.getChannelData(0);
              for (let i = 0; i < int16.length; i++) channelData[i] = int16[i] / 32768.0;

              // Schedule gapless playback
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (msg.serverContent?.outputTranscription) {
              setTranscription(prev => [...prev, `Zephyr: ${msg.serverContent!.outputTranscription!.text}`]);
            }
            if (msg.serverContent?.inputTranscription) {
              setTranscription(prev => [...prev, `You: ${msg.serverContent!.inputTranscription!.text}`]);
            }
          },
          onclose: () => setIsActive(false),
          onerror: (e) => console.error("Live Error:", e)
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error(e);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    setIsActive(false);
  };

  return (
    <div className="fixed inset-0 z-[250] bg-sky-950 flex flex-col items-center justify-center p-6 backdrop-blur-3xl">
      <div className="max-w-4xl w-full h-full flex flex-col gap-8">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <img src={VOICE_AVATARS.Zephyr.img} className="w-16 h-16 rounded-full border-4 border-sky-400" />
            <div>
              <h2 className="text-3xl font-black">Live with Zephyr</h2>
              <p className="text-sky-300 font-bold">{isActive ? '🟢 Connected' : '🔴 Ready to talk'}</p>
            </div>
          </div>
          <button onClick={() => { stopSession(); onClose(); }} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white font-black hover:bg-red-500">✕</button>
        </div>

        <div ref={scrollRef} className="flex-1 bg-black/40 rounded-[3rem] p-8 overflow-y-auto space-y-4 border-4 border-white/5 scroll-smooth shadow-inner">
          {transcription.length === 0 && !isConnecting && (
            <div className="h-full flex flex-col items-center justify-center text-sky-200/40 text-center space-y-4">
              <span className="text-6xl">🎙️</span>
              <p className="text-xl font-bold">Press Start to talk to Sage Zephyr!</p>
            </div>
          )}
          {isConnecting && (
            <div className="h-full flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
            </div>
          )}
          {transcription.map((line, i) => (
            <div key={i} className={`p-4 rounded-3xl max-w-[80%] font-bold text-lg ${line.startsWith('Zephyr') ? 'bg-sky-600 text-white self-start' : 'bg-white/10 text-sky-100 self-end ml-auto'}`}>
              {line}
            </div>
          ))}
        </div>

        <div className="flex justify-center pb-8">
          {!isActive ? (
            <button 
              onClick={startSession}
              disabled={isConnecting}
              className="px-12 py-6 bg-green-500 text-white rounded-[2.5rem] font-black text-2xl shadow-[0_12px_0_rgb(34,197,94)] active:translate-y-2 active:shadow-none transition-all hover:-translate-y-1 flex items-center gap-4"
            >
              <span>🎙️</span> Start Conversation
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4 items-center mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-12 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
              </div>
              <button 
                onClick={stopSession}
                className="px-12 py-6 bg-red-500 text-white rounded-[2.5rem] font-black text-2xl shadow-[0_12px_0_rgb(239,68,68)] active:translate-y-2 active:shadow-none transition-all"
              >
                End Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTeacher;
