// Game System untuk PalembangKidz

class GameManager {
    constructor() {
        this.currentLanguage = 'id';
        this.currentCulture = null;
        this.gameScore = 0;
        this.gameTypes = ['memory', 'matching', 'puzzle'];
    }
    
    // Start game untuk konten tertentu
    startGame(cultureKey, language = 'id') {
        this.currentCulture = cultureKey;
        this.currentLanguage = language;
        this.gameScore = 0;
        
        const gameModal = document.getElementById('gameModal');
        const gameContent = document.getElementById('gameContent');
        
        if (!gameModal || !gameContent) return;
        
        // Clear previous content
        gameContent.innerHTML = '';
        
        // Create game selection menu
        this.createGameMenu(gameContent);
        
        // Show modal
        gameModal.classList.add('active');
        
        // Play sound
        audioManager.playClickSound();
    }
    
    // Create game menu
    createGameMenu(container) {
        const menuHTML = `
            <div class="game-menu">
                <h3 style="text-align: center; margin-bottom: 30px; font-size: 1.8rem;">
                    ${this.getTranslation('Pilih Permainan', 'Choose a Game', 'Pilih Permainan')}
                </h3>
                <div class="game-options" style="display: grid; gap: 20px;">
                    <button class="game-option-btn" data-game="memory" style="
                        padding: 30px;
                        background: linear-gradient(135deg, #FF6B6B, #FFE66D);
                        border: none;
                        border-radius: 20px;
                        font-size: 1.3rem;
                        font-weight: 700;
                        cursor: pointer;
                        color: white;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        transition: all 0.3s ease;
                    ">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🧠</div>
                        ${this.getTranslation('Tebak Gambar', 'Guess the Picture', 'Tebak Gambar')}
                    </button>
                    
                    <button class="game-option-btn" data-game="matching" style="
                        padding: 30px;
                        background: linear-gradient(135deg, #4ECDC4, #44A08D);
                        border: none;
                        border-radius: 20px;
                        font-size: 1.3rem;
                        font-weight: 700;
                        cursor: pointer;
                        color: white;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        transition: all 0.3s ease;
                    ">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🎯</div>
                        ${this.getTranslation('Cocokkan Pasangan', 'Match Pairs', 'Cocokkan Pasangan')}
                    </button>
                    
                    <button class="game-option-btn" data-game="drag" style="
                        padding: 30px;
                        background: linear-gradient(135deg, #A8E6CF, #56AB2F);
                        border: none;
                        border-radius: 20px;
                        font-size: 1.3rem;
                        font-weight: 700;
                        cursor: pointer;
                        color: white;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        transition: all 0.3s ease;
                    ">
                        <div style="font-size: 3rem; margin-bottom: 10px;">🎨</div>
                        ${this.getTranslation('Susun Kata', 'Word Arrange', 'Susun Kato')}
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = menuHTML;
        
        // Add hover effects
        const buttons = container.querySelectorAll('.game-option-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            btn.addEventListener('click', () => {
                const gameType = btn.dataset.game;
                this.loadGame(gameType);
            });
        });
    }
    
    // Load specific game
    loadGame(gameType) {
        const gameContent = document.getElementById('gameContent');
        
        switch(gameType) {
            case 'memory':
                this.createMemoryGame(gameContent);
                break;
            case 'matching':
                this.createMatchingGame(gameContent);
                break;
            case 'drag':
                this.createWordArrangeGame(gameContent);
                break;
            default:
                this.createMemoryGame(gameContent);
        }
    }
    
    // Memory Game (Tebak Gambar)
    createMemoryGame(container) {
        const cultureIcons = ['🍽️', '🏠', '🌉', '💃', '🏛️', '👘', '🎵', '🧵'];
        const gameIcons = [...cultureIcons, ...cultureIcons]; // Duplicate for pairs
        this.shuffleArray(gameIcons);
        
        const gameHTML = `
            <div class="memory-game">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3>${this.getTranslation('Cocokkan Kartu yang Sama!', 'Match the Same Cards!', 'Cocokkan Kartu yang Samo!')}</h3>
                    <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary-red);">
                        <span id="memoryScore">0</span> ${this.getTranslation('Pasangan', 'Pairs', 'Pasangan')}
                    </p>
                </div>
                <div class="memory-board" style="
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    max-width: 500px;
                    margin: 0 auto;
                ">
                    ${gameIcons.map((icon, index) => `
                        <div class="memory-card" data-icon="${icon}" data-index="${index}" style="
                            aspect-ratio: 1;
                            background: linear-gradient(135deg, var(--sky-blue), var(--warm-yellow));
                            border-radius: 15px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 3rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            box-shadow: 0 4px 15px var(--shadow);
                        ">
                            <div class="card-back" style="display: block;">❓</div>
                            <div class="card-front" style="display: none;">${icon}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = gameHTML;
        
        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;
        let matches = 0;
        
        const cards = container.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                if (lockBoard) return;
                if (this === firstCard) return;
                
                // Flip card
                const back = this.querySelector('.card-back');
                const front = this.querySelector('.card-front');
                back.style.display = 'none';
                front.style.display = 'block';
                this.style.transform = 'rotateY(180deg)';
                
                if (!firstCard) {
                    firstCard = this;
                    return;
                }
                
                secondCard = this;
                lockBoard = true;
                
                // Check match
                const match = firstCard.dataset.icon === secondCard.dataset.icon;
                
                setTimeout(() => {
                    if (match) {
                        firstCard.style.background = 'var(--success-green)';
                        secondCard.style.background = 'var(--success-green)';
                        firstCard.style.pointerEvents = 'none';
                        secondCard.style.pointerEvents = 'none';
                        matches++;
                        
                        document.getElementById('memoryScore').textContent = matches;
                        audioManager.playSuccessSound();
                        
                        if (matches === cultureIcons.length) {
                            setTimeout(() => {
                                alert(gameManager.getTranslation(
                                    '🎉 Selamat! Kamu menang!',
                                    '🎉 Congratulations! You won!',
                                    '🎉 Selamat! Kau menang!'
                                ));
                            }, 500);
                        }
                    } else {
                        const back1 = firstCard.querySelector('.card-back');
                        const front1 = firstCard.querySelector('.card-front');
                        const back2 = secondCard.querySelector('.card-back');
                        const front2 = secondCard.querySelector('.card-front');
                        
                        back1.style.display = 'block';
                        front1.style.display = 'none';
                        back2.style.display = 'block';
                        front2.style.display = 'none';
                        
                        firstCard.style.transform = 'rotateY(0deg)';
                        secondCard.style.transform = 'rotateY(0deg)';
                        
                        audioManager.playErrorSound();
                    }
                    
                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                }, 1000);
            });
        });
    }
    
    // Matching Game (Cocokkan Pasangan)
    createMatchingGame(container) {
        const content = cultureData[this.currentCulture]?.[this.currentLanguage];
        if (!content) return;
        
        const items = [
            { left: content.icon, right: content.title, match: true },
            { left: '🎯', right: this.getTranslation('Target', 'Target', 'Target'), match: false },
            { left: '⭐', right: this.getTranslation('Bintang', 'Star', 'Bintang'), match: false },
            { left: '🎨', right: this.getTranslation('Seni', 'Art', 'Seni'), match: false }
        ];
        
        this.shuffleArray(items);
        
        const gameHTML = `
            <div class="matching-game">
                <h3 style="text-align: center; margin-bottom: 30px;">
                    ${this.getTranslation('Klik pasangan yang cocok!', 'Click matching pairs!', 'Klik pasangan yang cocok!')}
                </h3>
                <div style="position: relative;">
                    <canvas id="matchingCanvas" width="700" height="400" style="
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        pointer-events: none;
                        z-index: 1;
                    "></canvas>
                    <div class="matching-container" style="
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 50px;
                        max-width: 700px;
                        margin: 0 auto;
                        position: relative;
                        z-index: 2;
                    ">
                        <div class="left-items">
                            ${items.map((item, index) => `
                                <div class="match-item left-item" data-index="${index}" style="
                                    padding: 20px;
                                    background: white;
                                    border-radius: 15px;
                                    margin-bottom: 20px;
                                    font-size: 2.5rem;
                                    text-align: center;
                                    cursor: pointer;
                                    border: 3px solid #ddd;
                                    transition: all 0.3s ease;
                                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                                ">${item.left}</div>
                            `).join('')}
                        </div>
                        <div class="right-items">
                            ${items.map((item, index) => `
                                <div class="match-item right-item" data-index="${index}" style="
                                    padding: 20px;
                                    background: white;
                                    border-radius: 15px;
                                    margin-bottom: 20px;
                                    font-size: 1.3rem;
                                    text-align: center;
                                    cursor: pointer;
                                    border: 3px solid #ddd;
                                    transition: all 0.3s ease;
                                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                                ">${item.right}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <button id="checkMatches" style="
                        padding: 15px 40px;
                        background: linear-gradient(135deg, #06D6A0, #00b894);
                        border: none;
                        border-radius: 50px;
                        font-size: 1.2rem;
                        font-weight: 700;
                        cursor: pointer;
                        color: white;
                        box-shadow: 0 4px 20px rgba(6, 214, 160, 0.4);
                    ">${this.getTranslation('Cek Jawaban', 'Check Answer', 'Cek Jawaban')}</button>
                </div>
            </div>
        `;
        
        container.innerHTML = gameHTML;
        
        const canvas = document.getElementById('matchingCanvas');
        const ctx = canvas.getContext('2d');
        let selectedLeft = null;
        let selectedRight = null;
        const matches = new Map();
        
        // Function to draw line between elements
        const drawLine = (leftEl, rightEl, color = '#06D6A0') => {
            const canvasRect = canvas.getBoundingClientRect();
            const leftRect = leftEl.getBoundingClientRect();
            const rightRect = rightEl.getBoundingClientRect();
            
            const startX = leftRect.right - canvasRect.left;
            const startY = leftRect.top + leftRect.height/2 - canvasRect.top;
            const endX = rightRect.left - canvasRect.left;
            const endY = rightRect.top + rightRect.height/2 - canvasRect.top;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;
            ctx.stroke();
        };
        
        // Function to redraw all lines
        const redrawLines = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            matches.forEach((rightIndex, leftIndex) => {
                const leftEl = container.querySelector(`.left-item[data-index="${leftIndex}"]`);
                const rightEl = container.querySelector(`.right-item[data-index="${rightIndex}"]`);
                if (leftEl && rightEl) {
                    drawLine(leftEl, rightEl, '#06D6A0');
                }
            });
        };
        
        const leftItems = container.querySelectorAll('.left-items .match-item');
        const rightItems = container.querySelectorAll('.right-items .match-item');
        
        leftItems.forEach(item => {
            item.addEventListener('click', function() {
                if (matches.has(this.dataset.index)) return; // Already matched
                
                leftItems.forEach(i => i.style.borderColor = '#ddd');
                this.style.borderColor = '#FF6B6B';
                this.style.borderWidth = '4px';
                selectedLeft = this.dataset.index;
                
                if (selectedLeft && selectedRight) {
                    if (selectedLeft === selectedRight) {
                        // Correct match!
                        matches.set(selectedLeft, selectedRight);
                        this.style.background = '#06D6A0';
                        this.style.color = 'white';
                        this.style.borderColor = '#06D6A0';
                        rightItems[selectedRight].style.background = '#06D6A0';
                        rightItems[selectedRight].style.color = 'white';
                        rightItems[selectedRight].style.borderColor = '#06D6A0';
                        
                        redrawLines();
                        audioManager.playSuccessSound();
                    } else {
                        audioManager.playErrorSound();
                    }
                    
                    selectedLeft = null;
                    selectedRight = null;
                    setTimeout(() => {
                        leftItems.forEach(i => { 
                            if (!matches.has(i.dataset.index)) {
                                i.style.borderColor = '#ddd';
                                i.style.borderWidth = '3px';
                            }
                        });
                        rightItems.forEach(i => { 
                            if (!Array.from(matches.values()).includes(i.dataset.index)) {
                                i.style.borderColor = '#ddd';
                                i.style.borderWidth = '3px';
                            }
                        });
                    }, 300);
                }
            });
        });
        
        rightItems.forEach(item => {
            item.addEventListener('click', function() {
                if (Array.from(matches.values()).includes(this.dataset.index)) return; // Already matched
                
                rightItems.forEach(i => i.style.borderColor = '#ddd');
                this.style.borderColor = '#4ECDC4';
                this.style.borderWidth = '4px';
                selectedRight = this.dataset.index;
                
                if (selectedLeft && selectedRight) {
                    if (selectedLeft === selectedRight) {
                        // Correct match!
                        matches.set(selectedLeft, selectedRight);
                        this.style.background = '#06D6A0';
                        this.style.color = 'white';
                        this.style.borderColor = '#06D6A0';
                        leftItems[selectedLeft].style.background = '#06D6A0';
                        leftItems[selectedLeft].style.color = 'white';
                        leftItems[selectedLeft].style.borderColor = '#06D6A0';
                        
                        redrawLines();
                        audioManager.playSuccessSound();
                    } else {
                        audioManager.playErrorSound();
                    }
                    
                    selectedLeft = null;
                    selectedRight = null;
                    setTimeout(() => {
                        leftItems.forEach(i => { 
                            if (!matches.has(i.dataset.index)) {
                                i.style.borderColor = '#ddd';
                                i.style.borderWidth = '3px';
                            }
                        });
                        rightItems.forEach(i => { 
                            if (!Array.from(matches.values()).includes(i.dataset.index)) {
                                i.style.borderColor = '#ddd';
                                i.style.borderWidth = '3px';
                            }
                        });
                    }, 300);
                }
            });
        });
        
        // Check button
        const checkBtn = container.getElementById('checkMatches');
        checkBtn.addEventListener('click', () => {
            if (matches.size === items.length) {
                alert(this.getTranslation(
                    '🎉 Sempurna! Semua jawaban benar!',
                    '🎉 Perfect! All answers correct!',
                    '🎉 Sempurno! Semuo jawaban benar!'
                ));
                audioManager.playSuccessSound();
            } else {
                alert(this.getTranslation(
                    `❌ Belum selesai! Kamu baru cocokkan ${matches.size} dari ${items.length} pasangan.`,
                    `❌ Not finished! You matched ${matches.size} of ${items.length} pairs.`,
                    `❌ Belum selese! Kau baru cocokkan ${matches.size} dari ${items.length} pasangan.`
                ));
            }
        });
    }
    
    // Word Arrange Game (Susun Kata)
    createWordArrangeGame(container) {
        const content = cultureData[this.currentCulture]?.[this.currentLanguage];
        if (!content) return;
        
        const word = content.title;
        const letters = word.split('').filter(l => l !== ' ');
        const shuffled = [...letters];
        this.shuffleArray(shuffled);
        
        const gameHTML = `
            <div class="word-arrange-game">
                <h3 style="text-align: center; margin-bottom: 30px;">
                    ${this.getTranslation('Seret huruf ke kotak untuk menyusun kata!', 'Drag letters to boxes to arrange the word!', 'Seret huruf ke kotak untuk susun kato!')}
                </h3>
                <div class="word-hint" style="
                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 30px;
                ">${content.icon}</div>
                <div class="answer-slots" style="
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                    min-height: 80px;
                ">
                    ${letters.map((_, index) => `
                        <div class="letter-slot" data-index="${index}" style="
                            width: 60px;
                            height: 70px;
                            border: 3px dashed #FFD93D;
                            border-radius: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 2rem;
                            font-weight: 700;
                            background: white;
                            transition: all 0.3s ease;
                        "></div>
                    `).join('')}
                </div>
                <div class="letter-options" style="
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 30px;
                ">
                    ${shuffled.map((letter, index) => `
                        <div class="letter-option" 
                             draggable="true" 
                             data-letter="${letter}" 
                             data-id="letter-${index}" 
                             style="
                            width: 60px;
                            height: 70px;
                            background: linear-gradient(135deg, #4ECDC4, #44A08D);
                            color: white;
                            border-radius: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 2rem;
                            font-weight: 700;
                            cursor: grab;
                            transition: all 0.3s ease;
                            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                            user-select: none;
                        ">${letter}</div>
                    `).join('')}
                </div>
                <div style="text-align: center; display: flex; gap: 15px; justify-content: center;">
                    <button id="resetWord" style="
                        padding: 15px 35px;
                        background: linear-gradient(135deg, #FF6B6B, #E63946);
                        border: none;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        cursor: pointer;
                        color: white;
                        box-shadow: 0 4px 20px rgba(230, 57, 70, 0.4);
                    ">${this.getTranslation('Reset', 'Reset', 'Reset')}</button>
                    <button id="checkWord" style="
                        padding: 15px 35px;
                        background: linear-gradient(135deg, #06D6A0, #00b894);
                        border: none;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        cursor: pointer;
                        color: white;
                        box-shadow: 0 4px 20px rgba(6, 214, 160, 0.4);
                    ">${this.getTranslation('Cek Jawaban', 'Check Answer', 'Cek Jawaban')}</button>
                </div>
            </div>
        `;
        
        container.innerHTML = gameHTML;
        
        const slots = container.querySelectorAll('.letter-slot');
        const options = container.querySelectorAll('.letter-option');
        const checkBtn = container.getElementById('checkWord');
        const resetBtn = container.getElementById('resetWord');
        
        let draggedElement = null;
        
        // Drag and Drop for letter options
        options.forEach(option => {
            option.addEventListener('dragstart', function(e) {
                draggedElement = this;
                this.style.opacity = '0.5';
                this.style.cursor = 'grabbing';
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
                audioManager.playClickSound();
            });
            
            option.addEventListener('dragend', function() {
                this.style.opacity = '1';
                this.style.cursor = 'grab';
            });
        });
        
        // Drop zones (slots)
        slots.forEach(slot => {
            slot.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                this.style.background = '#FFF4CC';
                this.style.borderColor = '#FFD93D';
                this.style.borderStyle = 'solid';
                this.style.transform = 'scale(1.05)';
            });
            
            slot.addEventListener('dragleave', function() {
                this.style.background = 'white';
                this.style.borderStyle = 'dashed';
                this.style.transform = 'scale(1)';
            });
            
            slot.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.background = 'white';
                this.style.borderStyle = 'dashed';
                this.style.transform = 'scale(1)';
                
                if (draggedElement && !this.dataset.filled) {
                    // Add letter to slot
                    this.textContent = draggedElement.dataset.letter;
                    this.dataset.letter = draggedElement.dataset.letter;
                    this.dataset.filled = 'true';
                    this.style.background = '#E8F8F5';
                    this.style.borderColor = '#06D6A0';
                    this.style.borderStyle = 'solid';
                    
                    // Hide the dragged letter
                    draggedElement.style.display = 'none';
                    draggedElement = null;
                    
                    audioManager.playClickSound();
                }
            });
            
            // Allow clicking slot to remove letter
            slot.addEventListener('click', function() {
                if (this.dataset.filled) {
                    const letterId = this.dataset.letterId;
                    
                    // Find and show the original letter
                    options.forEach(opt => {
                        if (opt.dataset.letter === this.dataset.letter && opt.style.display === 'none') {
                            opt.style.display = 'flex';
                            return;
                        }
                    });
                    
                    // Clear slot
                    this.textContent = '';
                    this.dataset.letter = '';
                    this.dataset.filled = '';
                    this.style.background = 'white';
                    this.style.borderColor = '#FFD93D';
                    this.style.borderStyle = 'dashed';
                    
                    audioManager.playClickSound();
                }
            });
        });
        
        // Reset button
        resetBtn.addEventListener('click', () => {
            slots.forEach(slot => {
                slot.textContent = '';
                slot.dataset.letter = '';
                slot.dataset.filled = '';
                slot.style.background = 'white';
                slot.style.borderColor = '#FFD93D';
                slot.style.borderStyle = 'dashed';
            });
            options.forEach(opt => {
                opt.style.display = 'flex';
                opt.style.opacity = '1';
            });
            audioManager.playClickSound();
        });
        
        // Check button
        checkBtn.addEventListener('click', () => {
            const answer = Array.from(slots).map(slot => slot.textContent).join('');
            if (answer === word) {
                alert(this.getTranslation(
                    '🎉 Benar! Kamu hebat!',
                    '🎉 Correct! You\'re amazing!',
                    '🎉 Benar! Kau hebat!'
                ));
                audioManager.playSuccessSound();
                
                // Celebrate animation
                slots.forEach(slot => {
                    slot.style.background = '#06D6A0';
                    slot.style.color = 'white';
                    slot.style.borderColor = '#06D6A0';
                });
            } else {
                alert(this.getTranslation(
                    '❌ Belum benar, coba lagi ya!',
                    '❌ Not correct yet, try again!',
                    '❌ Belum benar, coba lagi yo!'
                ));
                audioManager.playErrorSound();
            }
        });
    }
    
    // Helper: Get translation
    getTranslation(id, en, plm) {
        switch(this.currentLanguage) {
            case 'id': return id;
            case 'en': return en;
            case 'plm': return plm;
            default: return id;
        }
    }
    
    // Helper: Shuffle array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Set language
    setLanguage(language) {
        this.currentLanguage = language;
    }
}

// Initialize game manager
const gameManager = new GameManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameManager;
}
