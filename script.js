// Alphabet Soup Animation
function createAlphabetSoup() {
    const alphabetSoup = document.getElementById('alphabetSoup');
    const agencies = ['HHS', 'CDC', 'ASPR', 'FDA', 'CMS', 'SAMHSA', 'NIH', 'ESF', 'FEMA', 'DMAT', 'SNS'];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Create floating letters
    for (let i = 0; i < 40; i++) {
        const letter = document.createElement('div');
        letter.className = 'letter';

        // Mix of acronyms and random letters
        if (i % 3 === 0 && i < agencies.length * 3) {
            letter.textContent = agencies[Math.floor(i / 3)];
            letter.style.fontSize = '1.5rem';
        } else {
            letter.textContent = letters[Math.floor(Math.random() * letters.length)];
        }

        // Random positioning
        letter.style.left = Math.random() * 100 + '%';
        letter.style.top = Math.random() * 100 + '%';
        letter.style.animationDelay = Math.random() * 10 + 's';
        letter.style.animationDuration = (15 + Math.random() * 10) + 's';

        alphabetSoup.appendChild(letter);
    }
}

// Flip Card Interaction
function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// Quiz Functionality
let currentQuestion = 0;
let correctAnswers = 0;
const totalQuestions = 3;

function initializeQuiz() {
    const questions = document.querySelectorAll('.quiz-question');

    questions.forEach((question, index) => {
        const options = question.querySelectorAll('.quiz-option');
        const feedback = question.querySelector('.quiz-feedback');

        options.forEach(option => {
            option.addEventListener('click', () => {
                handleAnswer(option, options, feedback, index);
            });
        });
    });
}

function handleAnswer(selectedOption, allOptions, feedback, questionIndex) {
    // Disable all options after selection
    allOptions.forEach(opt => opt.disabled = true);

    const isCorrect = selectedOption.getAttribute('data-correct') === 'true';

    if (isCorrect) {
        selectedOption.classList.add('correct');
        feedback.textContent = '✓ Correct! Well done!';
        feedback.className = 'quiz-feedback show correct';
        correctAnswers++;
    } else {
        selectedOption.classList.add('incorrect');
        // Highlight the correct answer
        allOptions.forEach(opt => {
            if (opt.getAttribute('data-correct') === 'true') {
                opt.classList.add('correct');
            }
        });
        feedback.textContent = '✗ Not quite. The correct answer is highlighted.';
        feedback.className = 'quiz-feedback show incorrect';
    }

    // Move to next question after delay
    setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
            document.getElementById(`question${questionIndex + 1}`).classList.remove('active');
            document.getElementById(`question${questionIndex + 2}`).classList.add('active');
        } else {
            showResults();
        }
    }, 2500);
}

function showResults() {
    document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));

    const resultsDiv = document.getElementById('quizResults');
    const scoreText = resultsDiv.querySelector('.score');

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    let message = '';

    if (percentage === 100) {
        message = '🎉 Perfect score! You really know your ESF #8!';
    } else if (percentage >= 66) {
        message = '👍 Great job! You have a solid understanding of ESF #8!';
    } else {
        message = '📚 Good effort! Review the material and try again!';
    }

    scoreText.textContent = `You got ${correctAnswers} out of ${totalQuestions} correct! ${message}`;
    resultsDiv.classList.add('show');
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;

    // Reset all questions
    document.querySelectorAll('.quiz-question').forEach((question, index) => {
        const options = question.querySelectorAll('.quiz-option');
        const feedback = question.querySelector('.quiz-feedback');

        options.forEach(opt => {
            opt.disabled = false;
            opt.className = 'quiz-option';
        });

        feedback.className = 'quiz-feedback';
        question.classList.remove('active');
    });

    // Hide results and show first question
    document.getElementById('quizResults').classList.remove('show');
    document.getElementById('question1').classList.add('active');
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Agency card hover effect enhancement
function enhanceAgencyCards() {
    const agencyCards = document.querySelectorAll('.agency-card[data-agency]');

    agencyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderLeftWidth = '10px';
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderLeftWidth = '5px';
        });
    });
}

// Parallax effect for hero section
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add interactive tooltips to agency cards
function addAgencyTooltips() {
    const agencyCards = document.querySelectorAll('.agency-card');

    agencyCards.forEach(card => {
        card.addEventListener('click', () => {
            const details = card.querySelector('.agency-details');
            if (details) {
                details.classList.toggle('expanded');
            }
        });
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.takeaway-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let current = 0;

                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target.toString().padStart(2, '0');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toString().padStart(2, '0');
                    }
                }, 30);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Add keyboard navigation for quiz
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const activeQuestion = document.querySelector('.quiz-question.active');
        if (!activeQuestion) return;

        const options = activeQuestion.querySelectorAll('.quiz-option:not(:disabled)');

        // Number keys 1-4 to select options
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            if (options[index]) {
                options[index].click();
            }
        }
    });
}

// Add progress indicator for quiz
function addQuizProgress() {
    const quizContainer = document.getElementById('quizContainer');
    const questions = document.querySelectorAll('.quiz-question');

    questions.forEach((question, index) => {
        const progressText = document.createElement('div');
        progressText.className = 'quiz-progress';
        progressText.textContent = `Question ${index + 1} of ${totalQuestions}`;
        progressText.style.cssText = 'text-align: center; color: #64748b; margin-bottom: 20px; font-weight: 600;';
        question.insertBefore(progressText, question.firstChild);
    });
}

// Initialize confetti effect for perfect quiz score
function triggerConfetti() {
    if (correctAnswers === totalQuestions) {
        // Simple confetti effect using DOM elements
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 50%;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                z-index: 9999;
            `;

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }
}

// Add confetti animation to stylesheet dynamically
function addConfettiAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Track user progress through the page
function trackProgress() {
    const sections = document.querySelectorAll('section');
    let viewedSections = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                viewedSections.add(entry.target);

                // Log progress (could be used for analytics)
                const progress = Math.round((viewedSections.size / sections.length) * 100);
                console.log(`Page progress: ${progress}%`);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

// Add "Back to Top" button
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createAlphabetSoup();
    initializeFlipCards();
    revealOnScroll();
    initializeQuiz();
    initializeSmoothScroll();
    enhanceAgencyCards();
    initializeParallax();
    addAgencyTooltips();
    animateCounters();
    initializeKeyboardNavigation();
    addQuizProgress();
    addConfettiAnimation();
    trackProgress();
    addBackToTopButton();

    console.log('ESF #8 Infographic loaded successfully! 🚀');
    console.log('Interactive features:');
    console.log('- Click myth cards to reveal reality');
    console.log('- Take the quiz to test your knowledge');
    console.log('- Use keyboard numbers (1-4) to answer quiz questions');
    console.log('- Scroll to explore animated content');
});

// Enhanced quiz results with confetti
const originalShowResults = showResults;
showResults = function() {
    originalShowResults();
    triggerConfetti();
};
