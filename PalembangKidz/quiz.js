// Quiz System untuk PalembangKidz

class QuizManager {
    constructor() {
        this.currentLanguage = 'id';
        this.currentCulture = null;
        this.currentScore = 0;
        this.totalQuestions = 0;
        this.quizData = this.initializeQuizData();
    }
    
    // Initialize quiz data untuk setiap konten budaya
    initializeQuizData() {
        return {
            pempek: {
                id: [
                    {
                        question: "Apa bahan utama pembuatan pempek?",
                        options: ["Ikan dan Sagu", "Ayam dan Tepung", "Daging dan Kentang", "Udang dan Jagung"],
                        correct: 0,
                        explanation: "Pempek dibuat dari ikan (biasanya ikan tenggiri atau belida) dan sagu!"
                    },
                    {
                        question: "Apa nama saus khas yang dimakan bersama pempek?",
                        options: ["Sambal", "Cuko", "Kecap", "Saus Tomat"],
                        correct: 1,
                        explanation: "Cuko adalah saus khas yang terbuat dari gula merah, cuka, dan cabai!"
                    },
                    {
                        question: "Pempek jenis apa yang berisi telur di dalamnya?",
                        options: ["Pempek Lenjer", "Pempek Kapal Selam", "Pempek Adaan", "Pempek Keriting"],
                        correct: 1,
                        explanation: "Pempek Kapal Selam dinamakan demikian karena telurnya seperti 'tenggelam' di dalam!"
                    },
                    {
                        question: "Dari manakah asal usul pempek?",
                        options: ["Palembang", "Jakarta", "Surabaya", "Medan"],
                        correct: 0,
                        explanation: "Pempek adalah makanan khas asli dari Palembang, Sumatera Selatan!"
                    },
                    {
                        question: "Berapa lama pempek bisa bertahan tanpa kulkas?",
                        options: ["1 hari", "2 hari", "3 hari", "5 hari"],
                        correct: 2,
                        explanation: "Pempek bisa bertahan hingga 3 hari dalam suhu ruangan!"
                    }
                ],
                en: [
                    {
                        question: "What are the main ingredients of pempek?",
                        options: ["Fish and Sago", "Chicken and Flour", "Meat and Potato", "Shrimp and Corn"],
                        correct: 0,
                        explanation: "Pempek is made from fish (usually mackerel or belida) and sago!"
                    },
                    {
                        question: "What is the name of the special sauce eaten with pempek?",
                        options: ["Sambal", "Cuko", "Ketchup", "Tomato Sauce"],
                        correct: 1,
                        explanation: "Cuko is a special sauce made from palm sugar, vinegar, and chili!"
                    },
                    {
                        question: "Which type of pempek contains egg inside?",
                        options: ["Pempek Lenjer", "Pempek Kapal Selam", "Pempek Adaan", "Pempek Keriting"],
                        correct: 1,
                        explanation: "Pempek Kapal Selam is named so because the egg 'sinks' inside!"
                    },
                    {
                        question: "Where does pempek originate from?",
                        options: ["Palembang", "Jakarta", "Surabaya", "Medan"],
                        correct: 0,
                        explanation: "Pempek is a traditional food originally from Palembang, South Sumatra!"
                    },
                    {
                        question: "How long can pempek last without refrigeration?",
                        options: ["1 day", "2 days", "3 days", "5 days"],
                        correct: 2,
                        explanation: "Pempek can last up to 3 days at room temperature!"
                    }
                ],
                plm: [
                    {
                        question: "Apo bahan utamo bikin pempek?",
                        options: ["Ikan samo Sagu", "Ayam samo Tepung", "Daging samo Kentang", "Udang samo Jagung"],
                        correct: 0,
                        explanation: "Pempek dibuat dari ikan (biasonyo ikan tenggiri atau belida) samo sagu!"
                    },
                    {
                        question: "Apo namo saus khas yang dimakan samo pempek?",
                        options: ["Sambal", "Cuko", "Kecap", "Saus Tomat"],
                        correct: 1,
                        explanation: "Cuko tu saus khas yang dibuat dari gulo merah, cuko, samo cabe!"
                    },
                    {
                        question: "Pempek jenis apo yang isinya ado telur?",
                        options: ["Pempek Lenjer", "Pempek Kapal Selam", "Pempek Adaan", "Pempek Keriting"],
                        correct: 1,
                        explanation: "Pempek Kapal Selam dinamo begitu karena telurnyo macam 'tenggelam' di dalam!"
                    },
                    {
                        question: "Dari mano asal usul pempek?",
                        options: ["Palembang", "Jakarta", "Surabaya", "Medan"],
                        correct: 0,
                        explanation: "Pempek tu makanan khas asli dari Palembang, Sumatera Selatan!"
                    },
                    {
                        question: "Berapa lamo pempek biso bertahan tanpo kulkas?",
                        options: ["1 hari", "2 hari", "3 hari", "5 hari"],
                        correct: 2,
                        explanation: "Pempek biso bertahan sampe 3 hari dalam suhu ruangan!"
                    }
                ]
            },
            
            "rumah-adat": {
                id: [
                    {
                        question: "Apa nama rumah adat khas Palembang?",
                        options: ["Rumah Gadang", "Rumah Limas", "Rumah Panggung", "Rumah Joglo"],
                        correct: 1,
                        explanation: "Rumah Limas adalah rumah adat khas Palembang dengan atap berbentuk limas!"
                    },
                    {
                        question: "Berapa tingkat atap yang dimiliki Rumah Limas?",
                        options: ["3 tingkat", "4 tingkat", "5 tingkat", "6 tingkat"],
                        correct: 2,
                        explanation: "Rumah Limas memiliki 5 tingkat atap yang melambangkan 5 rukun Islam!"
                    },
                    {
                        question: "Dari kayu apa Rumah Limas biasanya dibuat?",
                        options: ["Kayu Jati", "Kayu Mahoni", "Kayu Ulin", "Kayu Kelapa"],
                        correct: 2,
                        explanation: "Kayu Ulin sangat kuat dan tahan lama, cocok untuk rumah tradisional!"
                    },
                    {
                        question: "Mengapa Rumah Limas dibangun dengan struktur panggung?",
                        options: ["Supaya terlihat megah", "Untuk menghindari banjir", "Agar lebih sejuk", "Untuk menyimpan barang"],
                        correct: 1,
                        explanation: "Struktur panggung melindungi rumah dari banjir dan binatang buas!"
                    },
                    {
                        question: "Apa fungsi bagian bawah Rumah Limas?",
                        options: ["Tempat tidur", "Menyimpan hasil panen", "Ruang tamu", "Dapur"],
                        correct: 1,
                        explanation: "Bagian bawah Rumah Limas biasanya digunakan untuk menyimpan hasil panen!"
                    }
                ],
                en: [
                    {
                        question: "What is the name of the traditional Palembang house?",
                        options: ["Rumah Gadang", "Rumah Limas", "Rumah Panggung", "Rumah Joglo"],
                        correct: 1,
                        explanation: "Rumah Limas is a traditional Palembang house with a pyramid-shaped roof!"
                    },
                    {
                        question: "How many roof levels does Rumah Limas have?",
                        options: ["3 levels", "4 levels", "5 levels", "6 levels"],
                        correct: 2,
                        explanation: "Rumah Limas has 5 roof levels symbolizing the 5 pillars of Islam!"
                    },
                    {
                        question: "What wood is Rumah Limas usually made from?",
                        options: ["Teak Wood", "Mahogany Wood", "Ironwood", "Coconut Wood"],
                        correct: 2,
                        explanation: "Ironwood is very strong and durable, perfect for traditional houses!"
                    },
                    {
                        question: "Why is Rumah Limas built with a stilt structure?",
                        options: ["To look grand", "To avoid floods", "To be cooler", "To store items"],
                        correct: 1,
                        explanation: "The stilt structure protects the house from floods and wild animals!"
                    },
                    {
                        question: "What is the function of the lower part of Rumah Limas?",
                        options: ["Bedroom", "Storing harvests", "Living room", "Kitchen"],
                        correct: 1,
                        explanation: "The lower part of Rumah Limas is usually used to store harvests!"
                    }
                ],
                plm: [
                    {
                        question: "Apo namo rumah adat khas Palembang?",
                        options: ["Rumah Gadang", "Rumah Limas", "Rumah Panggung", "Rumah Joglo"],
                        correct: 1,
                        explanation: "Rumah Limas tu rumah adat khas Palembang samo atok berbentuk limas!"
                    },
                    {
                        question: "Berapa tingkat atok yang dipunyai Rumah Limas?",
                        options: ["3 tingkat", "4 tingkat", "5 tingkat", "6 tingkat"],
                        correct: 2,
                        explanation: "Rumah Limas ado 5 tingkat atok yang melambangkan 5 rukun Islam!"
                    },
                    {
                        question: "Dari kayu apo Rumah Limas biasonyo dibuat?",
                        options: ["Kayu Jati", "Kayu Mahoni", "Kayu Ulin", "Kayu Kelapa"],
                        correct: 2,
                        explanation: "Kayu Ulin tu sangat kuat samo tahan lamo, cocok untuk rumah tradisional!"
                    },
                    {
                        question: "Apo sebab Rumah Limas dibangun samo struktur panggung?",
                        options: ["Supayo keliatan megah", "Untuk ngindari banjir", "Biar lebih sejuk", "Untuk nyimpen barang"],
                        correct: 1,
                        explanation: "Struktur panggung melindungi rumah dari banjir samo binatang buas!"
                    },
                    {
                        question: "Apo fungsi bagian bawah Rumah Limas?",
                        options: ["Tempat tidur", "Nyimpen hasil panen", "Ruang tamu", "Dapur"],
                        correct: 1,
                        explanation: "Bagian bawah Rumah Limas biasonyo dipake untuk nyimpen hasil panen!"
                    }
                ]
            },
            
            jembatan: {
                id: [
                    {
                        question: "Kapan Jembatan Ampera dibangun?",
                        options: ["1950", "1962", "1970", "1980"],
                        correct: 1,
                        explanation: "Jembatan Ampera dibangun pada tahun 1962!"
                    },
                    {
                        question: "Di atas sungai apa Jembatan Ampera berada?",
                        options: ["Sungai Musi", "Sungai Ogan", "Sungai Komering", "Sungai Lematang"],
                        correct: 0,
                        explanation: "Jembatan Ampera membentang di atas Sungai Musi yang megah!"
                    },
                    {
                        question: "Berapa panjang Jembatan Ampera?",
                        options: ["977 meter", "1.077 meter", "1.177 meter", "1.277 meter"],
                        correct: 2,
                        explanation: "Jembatan Ampera memiliki panjang 1.177 meter!"
                    },
                    {
                        question: "Apa kepanjangan dari AMPERA?",
                        options: ["Amanat Merdeka Rakyat", "Amanat Penderitaan Rakyat", "Amanah Persatuan Rakyat", "Amanah Perdamaian Rakyat"],
                        correct: 1,
                        explanation: "AMPERA adalah singkatan dari Amanat Penderitaan Rakyat!"
                    },
                    {
                        question: "Sejak kapan mekanisme angkat Jembatan Ampera tidak digunakan lagi?",
                        options: ["1965", "1970", "1975", "1980"],
                        correct: 1,
                        explanation: "Mekanisme angkat jembatan sudah tidak digunakan sejak tahun 1970!"
                    }
                ],
                en: [
                    {
                        question: "When was Ampera Bridge built?",
                        options: ["1950", "1962", "1970", "1980"],
                        correct: 1,
                        explanation: "Ampera Bridge was built in 1962!"
                    },
                    {
                        question: "Over which river is Ampera Bridge located?",
                        options: ["Musi River", "Ogan River", "Komering River", "Lematang River"],
                        correct: 0,
                        explanation: "Ampera Bridge spans over the magnificent Musi River!"
                    },
                    {
                        question: "How long is Ampera Bridge?",
                        options: ["977 meters", "1,077 meters", "1,177 meters", "1,277 meters"],
                        correct: 2,
                        explanation: "Ampera Bridge has a length of 1,177 meters!"
                    },
                    {
                        question: "What does AMPERA stand for?",
                        options: ["Amanat Merdeka Rakyat", "Amanat Penderitaan Rakyat", "Amanah Persatuan Rakyat", "Amanah Perdamaian Rakyat"],
                        correct: 1,
                        explanation: "AMPERA stands for Amanat Penderitaan Rakyat (Mandate of People's Suffering)!"
                    },
                    {
                        question: "Since when has the bridge lifting mechanism not been used?",
                        options: ["1965", "1970", "1975", "1980"],
                        correct: 1,
                        explanation: "The bridge lifting mechanism has not been used since 1970!"
                    }
                ],
                plm: [
                    {
                        question: "Kapan Jembatan Ampera dibangun?",
                        options: ["1950", "1962", "1970", "1980"],
                        correct: 1,
                        explanation: "Jembatan Ampera dibangun tahun 1962!"
                    },
                    {
                        question: "Di atas sungai apo Jembatan Ampera ado?",
                        options: ["Sungai Musi", "Sungai Ogan", "Sungai Komering", "Sungai Lematang"],
                        correct: 0,
                        explanation: "Jembatan Ampera membentang di atas Sungai Musi yang megah!"
                    },
                    {
                        question: "Berapa panjang Jembatan Ampera?",
                        options: ["977 meter", "1.077 meter", "1.177 meter", "1.277 meter"],
                        correct: 2,
                        explanation: "Jembatan Ampera punyo panjang 1.177 meter!"
                    },
                    {
                        question: "Apo kepanjangan dari AMPERA?",
                        options: ["Amanat Merdeka Rakyat", "Amanat Penderitaan Rakyat", "Amanah Persatuan Rakyat", "Amanah Perdamaian Rakyat"],
                        correct: 1,
                        explanation: "AMPERA tu singkatan dari Amanat Penderitaan Rakyat!"
                    },
                    {
                        question: "Sejak kapan mekanisme angkat Jembatan Ampera idak dipake lagi?",
                        options: ["1965", "1970", "1975", "1980"],
                        correct: 1,
                        explanation: "Mekanisme angkat jembatan dah idak dipake sejak tahun 1970!"
                    }
                ]
            },
            
            // Quiz untuk konten lainnya bisa ditambahkan dengan pola yang sama
            tari: this.generateGenericQuiz('tari'),
            sriwijaya: this.generateGenericQuiz('sriwijaya'),
            pakaian: this.generateGenericQuiz('pakaian'),
            musik: this.generateGenericQuiz('musik'),
            songket: this.generateGenericQuiz('songket'),
            sejarah: this.generateGenericQuiz('sejarah'),
            permainan: this.generateGenericQuiz('permainan')
        };
    }
    
    // Generate generic quiz untuk konten yang belum punya quiz spesifik
    generateGenericQuiz(cultureKey) {
        return {
            id: [
                {
                    question: `Apakah kamu sudah membaca tentang ${cultureData[cultureKey]?.id?.title || 'topik ini'}?`,
                    options: ["Sudah, sangat menarik!", "Sudah, tapi ingin baca lagi", "Belum sempat", "Akan baca nanti"],
                    correct: 0,
                    explanation: "Bagus! Terus belajar tentang budaya Palembang ya! 🎉"
                }
            ],
            en: [
                {
                    question: `Have you read about ${cultureData[cultureKey]?.en?.title || 'this topic'}?`,
                    options: ["Yes, very interesting!", "Yes, but want to read again", "Not yet", "Will read later"],
                    correct: 0,
                    explanation: "Great! Keep learning about Palembang culture! 🎉"
                }
            ],
            plm: [
                {
                    question: `Apo kau dah baco tentang ${cultureData[cultureKey]?.plm?.title || 'topik ini'}?`,
                    options: ["Dah, menarik bana!", "Dah, tapi mau baco lagi", "Belum sempat", "Akan baco nanti"],
                    correct: 0,
                    explanation: "Bagus! Terus belajar tentang budaya Palembang yo! 🎉"
                }
            ]
        };
    }
    
    // Start quiz untuk konten tertentu
    startQuiz(cultureKey, language = 'id') {
        this.currentCulture = cultureKey;
        this.currentLanguage = language;
        this.currentScore = 0;
        this.totalQuestions = 0;
        
        const quizModal = document.getElementById('quizModal');
        const quizContent = document.getElementById('quizContent');
        
        if (!quizModal || !quizContent) return;
        
        // Get quiz questions
        const questions = this.quizData[cultureKey]?.[language] || [];
        if (questions.length === 0) {
            this.showNoQuizMessage();
            return;
        }
        
        this.totalQuestions = questions.length;
        
        // Clear previous content
        quizContent.innerHTML = '';
        
        // Create quiz questions
        questions.forEach((q, index) => {
            const questionDiv = this.createQuestionElement(q, index);
            quizContent.appendChild(questionDiv);
        });
        
        // Show modal
        quizModal.classList.add('active');
        
        // Play sound
        audioManager.playClickSound();
    }
    
    // Create question element
    createQuestionElement(questionData, index) {
        const div = document.createElement('div');
        div.className = 'quiz-question';
        div.dataset.questionIndex = index;
        
        const questionHTML = `
            <h3>❓ ${questionData.question}</h3>
            <div class="quiz-options">
                ${questionData.options.map((option, i) => `
                    <button class="quiz-option" data-option="${i}">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-explanation" style="display: none; margin-top: 15px; padding: 15px; background: #f0f0f0; border-radius: 10px;">
                <p style="margin: 0; font-weight: 600;"></p>
            </div>
        `;
        
        div.innerHTML = questionHTML;
        
        // Add event listeners to options
        const options = div.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.handleAnswer(option, questionData, index);
            });
        });
        
        return div;
    }
    
    // Handle answer selection
    handleAnswer(selectedOption, questionData, questionIndex) {
        const selectedIndex = parseInt(selectedOption.dataset.option);
        const isCorrect = selectedIndex === questionData.correct;
        
        // Disable all options for this question
        const questionDiv = selectedOption.closest('.quiz-question');
        const allOptions = questionDiv.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Show result
        if (isCorrect) {
            selectedOption.classList.add('correct');
            this.currentScore++;
            audioManager.playSuccessSound();
        } else {
            selectedOption.classList.add('incorrect');
            // Highlight correct answer
            allOptions[questionData.correct].classList.add('correct');
            audioManager.playErrorSound();
        }
        
        // Show explanation
        const explanationDiv = questionDiv.querySelector('.quiz-explanation');
        const explanationText = explanationDiv.querySelector('p');
        explanationText.textContent = questionData.explanation;
        explanationDiv.style.display = 'block';
        
        // Update score after all questions answered
        setTimeout(() => {
            this.checkQuizCompletion();
        }, 500);
    }
    
    // Check if all questions are answered
    checkQuizCompletion() {
        const allQuestions = document.querySelectorAll('.quiz-question');
        const answeredQuestions = document.querySelectorAll('.quiz-option.correct, .quiz-option.incorrect').length;
        
        if (answeredQuestions >= this.totalQuestions) {
            setTimeout(() => {
                this.showQuizResults();
            }, 1000);
        }
    }
    
    // Show quiz results
    showQuizResults() {
        const scoreDiv = document.getElementById('quizScore');
        if (!scoreDiv) return;
        
        const percentage = (this.currentScore / this.totalQuestions) * 100;
        let message = '';
        let emoji = '';
        
        if (percentage === 100) {
            message = this.currentLanguage === 'id' ? 'Sempurna! Kamu hebat!' : 
                     this.currentLanguage === 'en' ? 'Perfect! You\'re amazing!' : 
                     'Sempurna! Kau hebat!';
            emoji = '🏆';
        } else if (percentage >= 70) {
            message = this.currentLanguage === 'id' ? 'Bagus sekali!' : 
                     this.currentLanguage === 'en' ? 'Very good!' : 
                     'Bagus bana!';
            emoji = '⭐';
        } else if (percentage >= 50) {
            message = this.currentLanguage === 'id' ? 'Cukup baik, terus belajar ya!' : 
                     this.currentLanguage === 'en' ? 'Good enough, keep learning!' : 
                     'Cukup baik, terus belajar yo!';
            emoji = '👍';
        } else {
            message = this.currentLanguage === 'id' ? 'Ayo baca lagi dan coba lagi!' : 
                     this.currentLanguage === 'en' ? 'Let\'s read again and try again!' : 
                     'Ayo baco lagi samo coba lagi!';
            emoji = '📚';
        }
        
        scoreDiv.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
                <h3 style="margin-bottom: 15px;">${message}</h3>
                <p style="font-size: 2.5rem; margin: 0;">
                    ${this.currentScore} / ${this.totalQuestions}
                </p>
            </div>
        `;
        
        scoreDiv.style.display = 'block';
        
        // Celebrate with sound
        if (percentage === 100) {
            audioManager.playSuccessSound();
        }
    }
    
    // Show message when no quiz available
    showNoQuizMessage() {
        const quizModal = document.getElementById('quizModal');
        const quizContent = document.getElementById('quizContent');
        
        const message = this.currentLanguage === 'id' ? 
            'Maaf, kuis untuk topik ini sedang disiapkan. Coba kuis lainnya ya! 😊' :
            this.currentLanguage === 'en' ?
            'Sorry, quiz for this topic is being prepared. Try other quizzes! 😊' :
            'Maaf, kuis untuk topik ini lagi disiapkan. Coba kuis lainnyo yo! 😊';
        
        quizContent.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">📝</div>
                <p style="font-size: 1.3rem;">${message}</p>
            </div>
        `;
        
        quizModal.classList.add('active');
    }
    
    // Set language
    setLanguage(language) {
        this.currentLanguage = language;
    }
}

// Initialize quiz manager
const quizManager = new QuizManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizManager;
}
