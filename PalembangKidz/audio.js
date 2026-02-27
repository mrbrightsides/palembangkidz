// Audio Management System untuk PalembangKidz

class AudioManager {
    constructor() {
        this.currentAudio = null;
        this.isMuted = false;
        this.backgroundMusic = null;
        this.currentLanguage = 'id';
        this.audioQueue = [];
        
        this.initBackgroundMusic();
        this.initAudioControl();
    }
    
    // Initialize background music (optional)
    initBackgroundMusic() {
        // Untuk implementasi penuh, bisa ditambahkan background music
        // this.backgroundMusic = new Audio('assets/audio/background.mp3');
        // this.backgroundMusic.loop = true;
        // this.backgroundMusic.volume = 0.3;
    }
    
    // Initialize audio control button
    initAudioControl() {
        const audioControl = document.getElementById('audioControl');
        if (audioControl) {
            audioControl.addEventListener('click', () => {
                this.toggleMute();
            });
        }
    }
    
    // Toggle mute/unmute
    toggleMute() {
        this.isMuted = !this.isMuted;
        const audioControl = document.getElementById('audioControl');
        const audioIcon = audioControl.querySelector('.audio-icon');
        
        if (this.isMuted) {
            audioControl.classList.add('muted');
            audioIcon.textContent = '🔇';
            this.stopAll();
        } else {
            audioControl.classList.remove('muted');
            audioIcon.textContent = '🔊';
        }
    }
    
    // Play narration for specific content
    playNarration(cultureKey, language = null) {
        if (this.isMuted) {
            console.log('Audio is muted');
            return;
        }
        
        const lang = language || this.currentLanguage;
        
        // Stop current audio
        this.stopCurrent();
        
        // Get content data
        const content = cultureData[cultureKey];
        if (!content || !content[lang]) {
            console.error('Content not found:', cultureKey, lang);
            return;
        }
        
        // Create narration text
        const narrationText = this.createNarrationText(content[lang]);
        
        // Use Web Speech API for text-to-speech
        this.speakText(narrationText, lang);
        
        // Visual feedback
        this.showNarrationIndicator();
    }
    
    // Create full narration text
    createNarrationText(contentData) {
        let text = contentData.title + '. ';
        text += contentData.description + ' ';
        
        if (contentData.facts && contentData.facts.length > 0) {
            if (this.currentLanguage === 'id') {
                text += 'Fakta menarik: ';
            } else if (this.currentLanguage === 'en') {
                text += 'Interesting facts: ';
            } else {
                text += 'Fakta menarik: ';
            }
            
            contentData.facts.forEach((fact, index) => {
                text += `${index + 1}. ${fact}. `;
            });
        }
        
        if (contentData.funFact) {
            text += contentData.funFact;
        }
        
        return text;
    }
    
    // Speak text using Web Speech API
    speakText(text, language) {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set language
            switch(language) {
                case 'id':
                case 'plm':
                    utterance.lang = 'id-ID';
                    break;
                case 'en':
                    utterance.lang = 'en-US';
                    break;
                default:
                    utterance.lang = 'id-ID';
            }
            
            // Set voice properties
            utterance.rate = 0.9; // Slightly slower for children
            utterance.pitch = 1.1; // Slightly higher pitch for friendly tone
            utterance.volume = 1.0;
            
            // Event handlers
            utterance.onstart = () => {
                console.log('Narration started');
                this.showPlayingIndicator();
            };
            
            utterance.onend = () => {
                console.log('Narration ended');
                this.hidePlayingIndicator();
            };
            
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                this.hidePlayingIndicator();
            };
            
            // Speak
            window.speechSynthesis.speak(utterance);
            this.currentAudio = utterance;
        } else {
            console.error('Speech synthesis not supported');
            this.showAlternativeNarration(text);
        }
    }
    
    // Play sound effect
    playSoundEffect(soundName) {
        if (this.isMuted) return;
        
        // Untuk implementasi penuh, tambahkan sound effects
        // const sound = new Audio(`assets/audio/effects/${soundName}.mp3`);
        // sound.play();
        
        console.log('Playing sound effect:', soundName);
    }
    
    // Stop current audio
    stopCurrent() {
        if (this.currentAudio) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            this.currentAudio = null;
        }
    }
    
    // Stop all audio
    stopAll() {
        this.stopCurrent();
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }
    
    // Set language for narration
    setLanguage(language) {
        this.currentLanguage = language;
    }
    
    // Show narration indicator
    showNarrationIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'narrationIndicator';
        indicator.className = 'narration-indicator';
        indicator.innerHTML = `
            <div class="indicator-content">
                <div class="audio-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="indicator-text" data-lang-id="Sedang memutar..." data-lang-en="Playing..." data-lang-plm="Lagi putar...">
                    Sedang memutar...
                </p>
            </div>
        `;
        
        // Add styles if not exists
        if (!document.getElementById('narrationIndicatorStyles')) {
            const style = document.createElement('style');
            style.id = 'narrationIndicatorStyles';
            style.textContent = `
                .narration-indicator {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: linear-gradient(135deg, var(--primary-blue), var(--sky-blue));
                    color: white;
                    padding: 20px 30px;
                    border-radius: 50px;
                    box-shadow: 0 10px 30px rgba(69, 123, 157, 0.5);
                    z-index: 1001;
                    animation: slideInRight 0.5s ease-out;
                }
                
                .indicator-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .audio-wave {
                    display: flex;
                    gap: 4px;
                    align-items: center;
                }
                
                .audio-wave span {
                    width: 4px;
                    height: 20px;
                    background: white;
                    border-radius: 2px;
                    animation: wave 1s ease-in-out infinite;
                }
                
                .audio-wave span:nth-child(1) { animation-delay: 0s; }
                .audio-wave span:nth-child(2) { animation-delay: 0.1s; }
                .audio-wave span:nth-child(3) { animation-delay: 0.2s; }
                .audio-wave span:nth-child(4) { animation-delay: 0.3s; }
                
                @keyframes wave {
                    0%, 100% { height: 10px; }
                    50% { height: 30px; }
                }
                
                .indicator-text {
                    margin: 0;
                    font-weight: 600;
                    font-size: 1rem;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(indicator);
    }
    
    // Show playing indicator on button
    showPlayingIndicator() {
        const narrationButton = document.getElementById('narrationButton');
        if (narrationButton) {
            narrationButton.classList.add('playing');
            const playIcon = narrationButton.querySelector('.play-icon');
            if (playIcon) {
                playIcon.textContent = '⏸️';
            }
        }
    }
    
    // Hide playing indicator
    hidePlayingIndicator() {
        const indicator = document.getElementById('narrationIndicator');
        if (indicator) {
            indicator.remove();
        }
        
        const narrationButton = document.getElementById('narrationButton');
        if (narrationButton) {
            narrationButton.classList.remove('playing');
            const playIcon = narrationButton.querySelector('.play-icon');
            if (playIcon) {
                playIcon.textContent = '▶️';
            }
        }
    }
    
    // Show alternative narration if speech synthesis not supported
    showAlternativeNarration(text) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">✖️</button>
                <h2>Narasi</h2>
                <div style="max-height: 400px; overflow-y: auto; padding: 20px;">
                    <p style="line-height: 1.8; font-size: 1.1rem;">${text}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Play welcome sound
    playWelcomeSound() {
        if (this.isMuted) return;
        
        const welcomeTexts = {
            id: 'Selamat datang di PalembangKidz! Mari belajar budaya Palembang bersama-sama.',
            en: 'Welcome to PalembangKidz! Let\'s learn Palembang culture together.',
            plm: 'Selamat datang di PalembangKidz! Mari kito belajar budaya Palembang bersamo-samo.'
        };
        
        this.speakText(welcomeTexts[this.currentLanguage], this.currentLanguage);
    }
    
    // Play click sound
    playClickSound() {
        this.playSoundEffect('click');
    }
    
    // Play success sound
    playSuccessSound() {
        this.playSoundEffect('success');
    }
    
    // Play error sound
    playErrorSound() {
        this.playSoundEffect('error');
    }
}

// Initialize audio manager
const audioManager = new AudioManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}
