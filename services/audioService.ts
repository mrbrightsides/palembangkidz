
import { GoogleGenAI, Modality } from "@google/genai";

// Audio utility functions as required by guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class AudioService {
  private audioContext: AudioContext | null = null;

  async speak(text: string, voice: 'Kore' | 'Puck' | 'Zephyr' = 'Kore') {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    try {
      // Use process.env.API_KEY directly for initialization
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice },
            },
          },
        },
      });

      // Extract text output using .text getter (though this is audio)
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio data received");

      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        this.audioContext,
        24000,
        1
      );

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();
    } catch (error) {
      console.error("TTS Error:", error);
    }
  }

  playEffect(type: 'pop' | 'whoosh' | 'success') {
    const urls = {
      pop: 'https://www.soundjay.com/buttons/sounds/button-16.mp3',
      whoosh: 'https://www.soundjay.com/buttons/sounds/button-17.mp3',
      success: 'https://www.soundjay.com/buttons/sounds/button-3.mp3'
    };
    const audio = new Audio(urls[type]);
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Browsers often block audio until user interaction
    });
  }
}

export const audioService = new AudioService();
