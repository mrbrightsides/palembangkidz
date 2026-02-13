# 🎨 PalembangKidz: Immersive Culture Explorer

Welcome to **PalembangKidz**, an award-winning educational platform designed to introduce children to the rich, vibrant heritage of Palembang, Indonesia. Using a whimsical **3D Claymation aesthetic** and cutting-edge **Google Gemini AI**, we transform cultural learning into a magical, interactive journey.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/mrbrightsides/palembangkidz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

### 🏛️ Interactive Heritage Map
A custom-built Musi River explorer map. Navigate through landmarks like the Ampera Bridge and Pulau Kemaro with bouncy, video-first cards that come to life on hover.

### 🎙️ Live Conversations with Sage Zephyr
Powered by the **Gemini Live API**, children can have real-time voice conversations with our AI teacher, Zephyr. Practice the local dialect or ask questions about history through low-latency, human-like spoken interaction.

### 🔥 "Clay-ify" Creative Studio
A generative AI playground where kids can "bake" their ideas. Using **Gemini 2.5 Flash Image**, the app generates 3D claymation-style masterpieces based on the child's imagination.

### 🚣‍♂️ The Great Musi River Race
A rhythm-based mini-game where kids paddle a traditional *Perahu Bidar*. It teaches teamwork and rhythm while celebrating the iconic annual river races.

### ⚙️ Basa Palembang Decoder
A "spy-themed" translation tool that uses **Gemini 3 Flash** to decode Indonesian or English phrases into the authentic Palembang dialect (*Baso Palembang*).

### 🔊 Soundscape Mixer
An immersive ambient mixer. Use clay-style sliders to blend the sounds of the Musi River, traditional Gamelan music, and the bustling 16 Ilir market.

### 📖 Heritage Passport & Scrapbook
A gamified progress system. Collect stamps for visiting landmarks and earn "Mastery Stars" by completing AI-evaluated quizzes.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS (Custom "Claymorphism" system)
- **AI Core:** [Google GenAI SDK (@google/genai)](https://www.npmjs.com/package/@google/genai)
  - **Gemini 3 Flash & Pro:** Logical reasoning, translations, and quiz feedback.
  - **Gemini 2.5 Flash Image:** High-speed 3D claymation image generation.
  - **Gemini Live API:** Real-time native audio conversation.
  - **Gemini TTS:** Multilingual narration for characters Kore, Puck, and Zephyr.
- **Animations:** Lottie (JSON-based vector animations)
- **Audio:** Web Audio API (PCM stream decoding for Live API)

---

## 🤖 AI Implementation Highlights

- **Dynamic Feedback:** When a child misses a quiz question, the AI analyzes the mistake and provides gentle, encouraging guidance in the voice of a wise sage.
- **Multilingual Bridge:** Seamlessly switches between English, Indonesian, and the Palembang dialect using advanced LLM context windowing.
- **Visual Consistency:** Every AI-generated image is strictly prompted to match the "Whimsical 3D Claymation" visual direction defined in the project's creative guidelines.

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrbrightsides/palembangkidz.git
   ```
2. **Set up Environment Variables:**
   Ensure your `process.env.API_KEY` is configured with a valid Google Gemini API key.
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Run the App:**
   ```bash
   npm start
   ```

---

## 📞 Contact & Support

We'd love to hear your feedback or ideas for new Palembang adventures!

- **GitHub:** [mrbrightsides/palembangkidz](https://github.com/mrbrightsides/palembangkidz)
- **Telegram:** [@khudriakhmad](https://t.me/khudriakhmad)
- **Discord:** `khudri_61362`
- **Email:** [support@elpeef.com](mailto:support@elpeef.com)

---

*Made with ❤️ for the next generation of Palembang Explorers.*