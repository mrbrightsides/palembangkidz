// Main Application Controller untuk PalembangKidz

class PalembangKidzApp {
    constructor() {
        this.currentLanguage = 'id';
        this.currentPage = 'home';
        this.currentCulture = null;
        
        this.init();
    }
    
    // Initialize application
    init() {
        console.log('Initializing PalembangKidz...');
        
        // Show loading screen
        this.showLoading();
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setup();
            });
        } else {
            this.setup();
        }
    }
    
    // Setup application after DOM is ready
    setup() {
        try {
            console.log('Setting up PalembangKidz...');
            
            // Initialize event listeners
            this.initLanguageSelector();
            this.initCultureCards();
            this.initBackButton();
            this.initNarrationButton();
            this.initQuizButton();
            this.initGameButton();
            this.initModalClosers();
            
            // Update all language-dependent text
            this.updateLanguage('id');
            
            console.log('All components initialized successfully!');
            
            // Hide loading screen
            setTimeout(() => {
                this.hideLoading();
                console.log('Loading screen hidden');
                // Play welcome sound
                try {
                    audioManager.playWelcomeSound();
                } catch (e) {
                    console.log('Audio not available:', e);
                }
            }, 1000);
            
            console.log('PalembangKidz ready!');
        } catch (error) {
            console.error('Setup error:', error);
            // Force hide loading screen on error
            this.hideLoading();
            alert('Ada masalah saat memuat aplikasi. Silakan refresh halaman.');
        }
    }
    
    // Initialize language selector
    initLanguageSelector() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.updateLanguage(lang);
                
                // Update active state
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Play click sound
                audioManager.playClickSound();
            });
        });
    }
    
    // Update language throughout the app
    updateLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update audio manager language
        audioManager.setLanguage(lang);
        
        // Update quiz manager language
        quizManager.setLanguage(lang);
        
        // Update game manager language
        gameManager.setLanguage(lang);
        
        // Update all elements with language data attributes
        const elements = document.querySelectorAll('[data-lang-id]');
        elements.forEach(el => {
            const langKey = `data-lang-${lang}`;
            if (el.hasAttribute(langKey)) {
                el.textContent = el.getAttribute(langKey);
            }
        });
        
        console.log(`Language changed to: ${lang}`);
    }
    
    // Initialize culture cards on home page
    initCultureCards() {
        const cultureCards = document.querySelectorAll('.culture-card');
        cultureCards.forEach(card => {
            card.addEventListener('click', () => {
                const cultureKey = card.dataset.culture;
                this.showCultureContent(cultureKey);
                
                // Play click sound
                audioManager.playClickSound();
            });
            
            // Add hover sound effect
            card.addEventListener('mouseenter', () => {
                // Optional: add subtle sound on hover
            });
        });
    }
    
    // Show culture content page
    showCultureContent(cultureKey) {
        this.currentCulture = cultureKey;
        
        // Get content data
        const content = cultureData[cultureKey]?.[this.currentLanguage];
        if (!content) {
            console.error('Content not found:', cultureKey, this.currentLanguage);
            return;
        }
        
        // Update content
        document.getElementById('contentTitle').textContent = content.title;
        document.getElementById('contentImage').textContent = content.icon;
        
        // Build content text with facts
        let contentHTML = `<p>${content.description}</p>`;
        
        if (content.facts && content.facts.length > 0) {
            contentHTML += `<h4 style="margin-top: 30px; color: var(--primary-red);">`;
            contentHTML += this.currentLanguage === 'id' ? 'Fakta Menarik:' : 
                          this.currentLanguage === 'en' ? 'Interesting Facts:' : 
                          'Fakta Menarik:';
            contentHTML += `</h4><ul style="margin-left: 20px;">`;
            content.facts.forEach(fact => {
                contentHTML += `<li style="margin-bottom: 10px;">${fact}</li>`;
            });
            contentHTML += `</ul>`;
        }
        
        if (content.funFact) {
            contentHTML += `<div style="
                margin-top: 30px;
                padding: 20px;
                background: linear-gradient(135deg, var(--warm-yellow), var(--primary-gold));
                border-radius: 15px;
                color: var(--text-dark);
                font-weight: 600;
                font-size: 1.1rem;
            ">${content.funFact}</div>`;
        }
        
        document.getElementById('contentText').innerHTML = contentHTML;
        
        // Switch pages
        this.switchPage('content');
    }
    
    // Switch between pages
    switchPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        if (pageName === 'home') {
            document.getElementById('homePage').classList.add('active');
            this.currentPage = 'home';
            // Stop any playing audio
            audioManager.stopCurrent();
        } else if (pageName === 'content') {
            document.getElementById('contentPage').classList.add('active');
            this.currentPage = 'content';
        }
    }
    
    // Initialize back button
    initBackButton() {
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.switchPage('home');
                audioManager.playClickSound();
            });
        }
    }
    
    // Initialize narration button
    initNarrationButton() {
        const narrationButton = document.getElementById('narrationButton');
        if (narrationButton) {
            narrationButton.addEventListener('click', () => {
                if (this.currentCulture) {
                    // Check if already playing
                    if (narrationButton.classList.contains('playing')) {
                        audioManager.stopCurrent();
                        narrationButton.classList.remove('playing');
                        const playIcon = narrationButton.querySelector('.play-icon');
                        if (playIcon) playIcon.textContent = '▶️';
                    } else {
                        audioManager.playNarration(this.currentCulture, this.currentLanguage);
                    }
                }
            });
        }
    }
    
    // Initialize quiz button
    initQuizButton() {
        const quizButton = document.getElementById('quizButton');
        if (quizButton) {
            quizButton.addEventListener('click', () => {
                if (this.currentCulture) {
                    quizManager.startQuiz(this.currentCulture, this.currentLanguage);
                }
            });
        }
    }
    
    // Initialize game button
    initGameButton() {
        const gameButton = document.getElementById('gameButton');
        if (gameButton) {
            gameButton.addEventListener('click', () => {
                if (this.currentCulture) {
                    gameManager.startGame(this.currentCulture, this.currentLanguage);
                }
            });
        }
    }
    
    // Initialize modal closers
    initModalClosers() {
        // Quiz modal
        const quizModal = document.getElementById('quizModal');
        const quizCloseBtn = quizModal?.querySelector('.close-modal');
        
        if (quizCloseBtn) {
            quizCloseBtn.addEventListener('click', () => {
                quizModal.classList.remove('active');
                audioManager.playClickSound();
            });
        }
        
        if (quizModal) {
            quizModal.addEventListener('click', (e) => {
                if (e.target === quizModal) {
                    quizModal.classList.remove('active');
                }
            });
        }
        
        // Game modal
        const gameModal = document.getElementById('gameModal');
        const gameCloseBtn = gameModal?.querySelector('.close-modal');
        
        if (gameCloseBtn) {
            gameCloseBtn.addEventListener('click', () => {
                gameModal.classList.remove('active');
                audioManager.playClickSound();
            });
        }
        
        if (gameModal) {
            gameModal.addEventListener('click', (e) => {
                if (e.target === gameModal) {
                    gameModal.classList.remove('active');
                }
            });
        }
    }
    
    // Show loading screen
    showLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }
    
    // Hide loading screen
    hideLoading() {
        console.log('Hiding loading screen...');
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                console.log('Loading screen removed from DOM');
            }, 500);
        } else {
            console.error('Loading screen element not found!');
        }
    }
    
    // Get current culture data
    getCurrentCultureData() {
        if (!this.currentCulture) return null;
        return cultureData[this.currentCulture]?.[this.currentLanguage];
    }
    
    // Save progress (untuk future implementation dengan localStorage)
    saveProgress() {
        const progress = {
            visitedCultures: this.visitedCultures || [],
            completedQuizzes: this.completedQuizzes || [],
            gameScores: this.gameScores || {},
            preferredLanguage: this.currentLanguage
        };
        
        try {
            localStorage.setItem('palembangkidz_progress', JSON.stringify(progress));
            console.log('Progress saved');
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }
    
    // Load progress (untuk future implementation dengan localStorage)
    loadProgress() {
        try {
            const saved = localStorage.getItem('palembangkidz_progress');
            if (saved) {
                const progress = JSON.parse(saved);
                this.visitedCultures = progress.visitedCultures || [];
                this.completedQuizzes = progress.completedQuizzes || [];
                this.gameScores = progress.gameScores || {};
                
                // Restore preferred language
                if (progress.preferredLanguage) {
                    this.updateLanguage(progress.preferredLanguage);
                    
                    // Update language button
                    document.querySelectorAll('.lang-btn').forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.lang === progress.preferredLanguage);
                    });
                }
                
                console.log('Progress loaded');
            }
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
    }
}

// Initialize the application
const app = new PalembangKidzApp();

// Emergency timeout - force hide loading after 5 seconds no matter what
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        console.warn('Emergency timeout: forcing loading screen to hide');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}, 5000);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
        const quizModal = document.getElementById('quizModal');
        const gameModal = document.getElementById('gameModal');
        
        if (quizModal?.classList.contains('active')) {
            quizModal.classList.remove('active');
        }
        if (gameModal?.classList.contains('active')) {
            gameModal.classList.remove('active');
        }
    }
    
    // M to toggle mute
    if (e.key === 'm' || e.key === 'M') {
        audioManager.toggleMute();
    }
    
    // H to go home
    if (e.key === 'h' || e.key === 'H') {
        if (app.currentPage !== 'home') {
            app.switchPage('home');
        }
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause audio when page is hidden
        audioManager.stopCurrent();
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized, adjusting layout...');
        // Add any responsive adjustments if needed
    }, 250);
});

// Add service worker for offline capability (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Can be implemented for offline support
        console.log('Service Worker support detected');
    });
}

// Export app instance
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PalembangKidzApp;
}

console.log('PalembangKidz Application Loaded! 🎉');
