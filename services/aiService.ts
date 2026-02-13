
import { GoogleGenAI, Type } from "@google/genai";
import { Language, AiHeritageInsight } from "../types";

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
  }

  async getKidFriendlyExplanation(itemName: string, lang: Language): Promise<AiHeritageInsight> {
    const prompt = `
      You are a magical 3D claymation Palembang culture tutor.
      Provide a deep dive into "${itemName}" for a 7-year-old child.
      
      Requirements:
      1. Language: ${lang === 'plm' ? 'Indonesian with Palembang dialect flavor' : lang === 'id' ? 'Indonesian' : 'English'}.
      2. Origin Story: A short, magical legend or history about where this came from (2 sentences).
      3. Cool Factor: One specific reason why kids would find this awesome today (1-2 sentences).
      4. Secret Challenge: A tiny "Look for this" or "Think about this" challenge for the child (1 sentence).
      
      Tone: Enchanting, high-energy, and educational.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 1,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              originStory: { type: Type.STRING },
              coolFactor: { type: Type.STRING },
              secretChallenge: { type: Type.STRING }
            },
            required: ["originStory", "coolFactor", "secretChallenge"]
          }
        }
      });

      return JSON.parse(response.text || '{}') as AiHeritageInsight;
    } catch (error) {
      console.error("Gemini AI Error:", error);
      return {
        originStory: "Long ago, people in Palembang created this with love and magic!",
        coolFactor: "It's one of the most famous things in the whole city!",
        secretChallenge: "Can you see the beautiful colors and patterns?"
      };
    }
  }

  async generateClayImage(description: string): Promise<string | null> {
    const prompt = `A 3D claymation style creation of: ${description}. Soft clay textures, whimsical, friendly, vibrant colors, studio lighting, high detail, masterpiece, centered on a plain white pedestal background.`;
    
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Image Gen Error:", error);
      return null;
    }
  }

  async translateToPalembang(text: string): Promise<string> {
    const prompt = `Translate this sentence to informal Palembang dialect (Baso Palembang): "${text}". Keep it friendly and authentic. Just return the translated text.`;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      return response.text || text;
    } catch (error) {
      return "Waduuh, gagal translate nih!";
    }
  }

  async getQuizFeedback(question: string, wrongAnswer: string, correctAnswer: string, lang: Language): Promise<string> {
    const prompt = `
      You are Zephyr, the Wise Sage of Palembang culture. 
      A child just answered a quiz question incorrectly.
      Explain kindly to a 7-year-old why "${wrongAnswer}" is not the right choice for "${question}", AND why "${correctAnswer}" is the correct one.
      Keep it short (2-3 sentences).
      Language: ${lang}.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      return response.text || "Don't worry! Keep learning!";
    } catch (error) {
      return `Oops! The correct answer is ${correctAnswer}.`;
    }
  }
}

export const aiService = new AIService();
