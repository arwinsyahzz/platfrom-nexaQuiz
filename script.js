/**
 * NexaQuiz Application Engine
 * Pattern: Revealing Module Pattern (ES6+ Pure Vanilla JS)
 */

const QuizApp = (() => {
    const QUESTION_BANK = {
        IPA: [
            {
                id: "ipa-001",
                question: "Sebuah benda bermassa 4 kg bergerak dengan percepatan 3 m/s². Berapakah resultan gaya yang bekerja pada benda tersebut?",
                options: ["12 Newton", "7 Newton", "1.33 Newton", "36 Newton"],
                answer: "12 Newton",
                weight: 15,
                level: "Dasar"
            },
            {
                id: "ipa-002",
                question: "Organel sel eukariotik yang berperan utama dalam sintesis ATP melalui proses fosforilasi oksidatif adalah...",
                options: ["Mitokondria", "Retikulum Endoplasma", "Aparatus Golgi", "Lisosom"],
                answer: "Mitokondria",
                weight: 20,
                level: "Menengah"
            },
            {
                id: "ipa-003",
                question: "Ikatan kimia yang terbentuk akibat penggunaan bersama pasangan elektron oleh dua atom non-logam disebut...",
                options: ["Ikatan Kovalen", "Ikatan Ionik", "Ikatan Logam", "Ikatan Hidrogen"],
                answer: "Ikatan Kovalen",
                weight: 20,
                level: "Menengah"
            },
            {
                id: "ipa-004",
                question: "Apabila frekuensi sebuah gelombang elektromagnetik diperbesar dua kali lipat di ruang hampa, maka panjang gelombangnya akan...",
                options: ["Menjadi setengah kali semula", "Menjadi dua kali semula", "Tetap tidak berubah", "Menjadi empat kali semula"],
                answer: "Menjadi setengah kali semula",
                weight: 25,
                level: "Lanjut"
            },
            {
                id: "ipa-005",
                question: "Unsur gas mulia di bawah ini yang memiliki konfigurasi elektron oktet paling stabil pada periode ketiga adalah...",
                options: ["Argon (Ar)", "Neon (Ne)", "Helium (He)", "Kripton (Kr)"],
                answer: "Argon (Ar)",
                weight: 20,
                level: "Menengah"
            }
        ],
        IPS: [
            {
                id: "ips-001",
                question: "Instrumen kebijakan moneter di mana Bank Sentral menjual atau membeli surat berharga negara untuk mengatur jumlah uang beredar disebut...",
                options: ["Operasi Pasar Terbuka", "Politik Diskonto", "Giro Wajib Minimum", "Imbauan Moral"],
                answer: "Operasi Pasar Terbuka",
                weight: 25,
                level: "Lanjut"
            },
            {
                id: "ips-002",
                question: "Perjanjian internasional pada tahun 1494 yang membagi wilayah penjelajahan samudra antara Spanyol dan Portugis adalah...",
                options: ["Perjanjian Tordesillas", "Perjanjian Saragosa", "Perjanjian Versailles", "Perjanjian Renville"],
                answer: "Perjanjian Tordesillas",
                weight: 20,
                level: "Menengah"
            },
            {
                id: "ips-003",
                question: "Fenomena geologi berupa pergerakan lempeng tektonik yang saling menjauh sehingga membentuk kerak samudra baru disebut batas...",
                options: ["Divergen", "Konvergen", "Transform", "Subduksi"],
                answer: "Divergen",
                weight: 20,
                level: "Menengah"
            },
            {
                id: "ips-004",
                question: "Bentuk mobilitas sosial di mana seseorang berpindah profesi ke posisi yang sederajat tanpa mengubah status sosialnya disebut mobilitas...",
                options: ["Horizontal", "Vertikal Naik", "Antargenerasi", "Intragenerasi"],
                answer: "Horizontal",
                weight: 15,
                level: "Dasar"
            },
            {
                id: "ips-005",
                question: "Hukum ekonomi yang menyatakan bahwa semakin tinggi harga suatu barang, semakin sedikit jumlah barang yang diminta (ceteris paribus) berlaku pada...",
                options: ["Hukum Permintaan", "Hukum Penawaran", "Hukum Gossen I", "Hukum Engel"],
                answer: "Hukum Permintaan",
                weight: 20,
                level: "Menengah"
            }
        ],
        INFORMATIKA: [
            {
                id: "inf-001",
                question: "Berapakah kompleksitas waktu rata-rata (average time complexity) untuk mencari sebuah elemen menggunakan algoritma Binary Search pada array terurut?",
                options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
                answer: "O(log n)",
                weight: 25,
                level: "Lanjut"
            },
            {
                id: "inf-002",
                question: "Pada model referensi jaringan OSI 7 Layer, proses penentuan rute terbaik (routing) dan pengalamatan logis IP berlangsung pada lapisan...",
                options: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"],
                answer: "Network Layer",
                weight: 20,
                level: "Menengah"
            },
            {
                id: "inf-003",
                question: "Struktur data linear yang menerapkan prinsip kerja FIFO (First In, First Out) dalam antrean pemrosesan tugas CPU adalah...",
                options: ["Queue", "Stack", "Binary Tree", "Hash Table"],
                answer: "Queue",
                weight: 15,
                level: "Dasar"
            },
            {
                id: "inf-004",
                question: "Dalam basis data relasional, atribut yang secara unik mengidentifikasi setiap baris di dalam sebuah tabel tetapi merujuk pada tabel lain disebut...",
                options: ["Foreign Key", "Primary Key", "Candidate Key", "Composite Key"],
                answer: "Foreign Key",
                weight: 20,
                level: "Menengah"
            },
            {
                id: "inf-005",
                question: "Representasi bilangan biner 8-bit yang tepat untuk angka desimal 45 adalah...",
                options: ["00101101", "00110101", "00101011", "01001101"],
                answer: "00101101",
                weight: 20,
                level: "Menengah"
            }
        ]
    };

    const QUESTIONS_PER_SESSION = 5;

    let state = {
        activeCategory: null,
        sessionQuestions: [],
        currentIndex: 0,
        earnedPoints: 0,
        maxPossiblePoints: 0,
        correctCount: 0,
        wrongCount: 0,
        isLocked: false
    };

    const shuffleArray = (sourceArray) => {
        const clone = [...sourceArray];
        for (let i = clone.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clone[i], clone[j]] = [clone[j], clone[i]];
        }
        return clone;
    };

    const switchView = (targetViewId) => {
        const views = document.querySelectorAll('.view-section');
        views.forEach(v => v.classList.remove('active'));

        const navMenu = document.getElementById('landing-nav');
        if (targetViewId === 'view-landing') {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            const target = document.getElementById(targetViewId);
            if (target) target.classList.add('active');
        }, 40);
    };

    const renderCurrentQuestion = () => {
        state.isLocked = false;
        const currentQ = state.sessionQuestions[state.currentIndex];
        const cardWrapper = document.getElementById('question-Wrapper');

        document.getElementById('q-current').textContent = state.currentIndex + 1;
        document.getElementById('q-total').textContent = state.sessionQuestions.length;
        const progressPercentage = ((state.currentIndex) / state.sessionQuestions.length) * 100;
        document.getElementById('progress-bar-fill').style.width = `${progressPercentage}%`;

        document.getElementById('q-weight').textContent = `Tingkat: ${currentQ.level} (${currentQ.weight} Poin)`;
        document.getElementById('question-text').textContent = currentQ.question;

        const shuffledOptions = shuffleArray(currentQ.options);
        const optionsContainer = document.getElementById('options-list');
        optionsContainer.innerHTML = '';

        const prefixes = ['A', 'B', 'C', 'D'];

        shuffledOptions.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option-btn';
            btn.dataset.value = optText;

            const prefixSpan = document.createElement('span');
            prefixSpan.className = 'option-prefix';
            prefixSpan.textContent = prefixes[idx];

            const textSpan = document.createElement('span');
            textSpan.textContent = optText;

            btn.appendChild(prefixSpan);
            btn.appendChild(textSpan);

            btn.addEventListener('click', () => evaluateSelection(optText, btn));
            optionsContainer.appendChild(btn);
        });

        cardWrapper.classList.remove('fade-out');
    };

    const evaluateSelection = (selectedValue, clickedButton) => {
        if (state.isLocked) return;
        state.isLocked = true;

        const currentQ = state.sessionQuestions[state.currentIndex];
        const isCorrect = selectedValue === currentQ.answer;
        const allButtons = document.querySelectorAll('.option-btn');

        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.value === currentQ.answer) {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            state.earnedPoints += currentQ.weight;
            state.correctCount++;
        } else {
            clickedButton.classList.add('wrong');
            state.wrongCount++;
        }

        const nextProgress = ((state.currentIndex + 1) / state.sessionQuestions.length) * 100;
        document.getElementById('progress-bar-fill').style.width = `${nextProgress}%`;

        setTimeout(() => {
            const cardWrapper = document.getElementById('question-Wrapper');
            cardWrapper.classList.add('fade-out');

            setTimeout(() => {
                state.currentIndex++;
                if (state.currentIndex < state.sessionQuestions.length) {
                    renderCurrentQuestion();
                } else {
                    renderResults();
                }
            }, 250);
        }, 1100);
    };

    const renderResults = () => {
        const normalizedScore = Math.round((state.earnedPoints / state.maxPossiblePoints) * 100);

        document.getElementById('result-category').textContent = `EVALUASI ${state.activeCategory}`;
        document.getElementById('final-score').textContent = normalizedScore;
        document.getElementById('stat-correct').textContent = state.correctCount;
        document.getElementById('stat-wrong').textContent = state.wrongCount;

        let feedbackText = "";
        if (normalizedScore === 100) {
            feedbackText = "Penguasaan konsep sangat komprehensif. Anda menyelesaikan seluruh soal termasuk tingkat lanjut tanpa kesalahan.";
        } else if (normalizedScore >= 75) {
            feedbackText = "Performa akademik sangat solid. Anda memahami sebagian besar konsep fundamental dan terapan.";
        } else if (normalizedScore >= 50) {
            feedbackText = "Pemahaman dasar cukup baik, namun diperlukan tinjauan ulang pada materi dengan bobot kesulitan menengah ke atas.";
        } else {
            feedbackText = "Disarankan untuk mempelajari kembali konsep dasar pada bidang studi ini sebelum mencoba sesi evaluasi berikutnya.";
        }

        document.getElementById('result-feedback').textContent = feedbackText;
        switchView('view-result');
    };

    return {
        start: (categoryKey) => {
            const rawPool = QUESTION_BANK[categoryKey];
            if (!rawPool || rawPool.length === 0) return;

            state.activeCategory = categoryKey;
            state.sessionQuestions = shuffleArray(rawPool).slice(0, QUESTIONS_PER_SESSION);
            state.currentIndex = 0;
            state.earnedPoints = 0;
            state.correctCount = 0;
            state.wrongCount = 0;
            state.maxPossiblePoints = state.sessionQuestions.reduce((acc, q) => acc + q.weight, 0);

            const labelMap = {
                IPA: "SAINS & ALAM (IPA)",
                IPS: "SOSIAL & HUMANIORA (IPS)",
                INFORMATIKA: "ILMU INFORMATIKA"
            };

            document.getElementById('quiz-badge').textContent = labelMap[categoryKey] || categoryKey;
            renderCurrentQuestion();
            switchView('view-quiz');
        },

        retry: () => {
            if (state.activeCategory) {
                QuizApp.start(state.activeCategory);
            }
        },

        returnHome: (event) => {
            if (event) event.preventDefault();
            switchView('view-landing');
        }
    };
})();