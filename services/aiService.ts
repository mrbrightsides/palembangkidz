
import { GoogleGenAI, Type } from "@google/genai";
import { Language, AiHeritageInsight, StorySegment, Difference } from "../types";

export class AIService {
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
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
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

  async getSimplifiedSummary(description: string, lang: Language): Promise<string> {
    const prompt = `
      Simplify this description for a 5-year-old child in ONE very short and super-fun sentence.
      Make it sound like a exciting discovery!
      Description: "${description}"
      Language: ${lang}.
      Just return the simplified sentence, no extra text.
    `;

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      return response.text?.trim() || description;
    } catch (error) {
      console.error("Simplification Error:", error);
      return description;
    }
  }

  async generateClayImage(description: string): Promise<string | null> {
    const prompt = `A 3D claymation style creation of: ${description}. Soft clay textures, whimsical, friendly, vibrant colors, studio lighting, high detail, masterpiece, centered on a plain white pedestal background.`;
    
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
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

  async generateDifferenceSet(topic: string): Promise<{ base: string, modified: string, differences: Difference[] }> {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
    
    // Step 1: Define differences and prompts
    const diffSpecPrompt = `Create a "Find the Difference" game spec for the topic: ${topic}. 
    Define exactly 3 subtle differences. For each difference, provide a x and y coordinate (0-100) and a brief description.
    Also provide a specific instruction for how to modify the base image to create these differences.`;
    
    const specRes = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: diffSpecPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            basePrompt: { type: Type.STRING },
            editInstruction: { type: Type.STRING },
            differences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  description: { type: Type.STRING }
                },
                required: ["id", "x", "y", "description"]
              }
            }
          },
          required: ["basePrompt", "editInstruction", "differences"]
        }
      }
    });

    const spec = JSON.parse(specRes.text || '{}');
    
    // Step 2: Generate base image
    const baseImg = await this.generateClayImage(spec.basePrompt);
    
    // Step 3: Generate modified image (editing)
    const modifiedResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: baseImg!.split(',')[1], mimeType: 'image/png' } },
          { text: spec.editInstruction }
        ]
      }
    });

    let modifiedImg = baseImg;
    for (const part of modifiedResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        modifiedImg = `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return {
      base: baseImg!,
      modified: modifiedImg!,
      differences: spec.differences.map((d: any) => ({ ...d, found: false }))
    };
  }

  async getStorySegment(currentPrompt: string, lang: Language): Promise<StorySegment> {
    const prompt = `
      You are an interactive storyteller for kids.
      Current Situation: ${currentPrompt}
      Language: ${lang}.
      Task: Continue the adventure in Palembang. 
      Incorporate landmarks like Ampera Bridge, Pempek, or Srivijaya.
      Return exactly 1 text block (max 3 sentences), 2-3 choices for the child, 
      a visual prompt for a claymation image, and a character expression.
    `;

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              choices: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    nextPrompt: { type: Type.STRING }
                  },
                  required: ["text", "nextPrompt"]
                }
              },
              visualPrompt: { type: Type.STRING },
              characterExpression: { type: Type.STRING, enum: ["happy", "thinking", "excited", "wise"] }
            },
            required: ["text", "choices", "visualPrompt", "characterExpression"]
          }
        }
      });

      return JSON.parse(response.text || '{}') as StorySegment;
    } catch (e) {
      console.error(e);
      return {
        text: "The story is taking a magic nap! Try again soon.",
        choices: [{ text: "Restart", nextPrompt: "Start of the adventure in Palembang" }],
        visualPrompt: "A cozy claymation library",
        characterExpression: "wise"
      };
    }
  }

  async translateToPalembang(text: string): Promise<string> {
    const prompt = `Translate this sentence to informal Palembang dialect (Baso Palembang): "${text}". Keep it friendly and authentic. Just return the translated text.`;
    
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
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
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
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
