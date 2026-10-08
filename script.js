// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ===== Login Form Handler =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (email && password) {
            // Show success message
            showNotification('Muvaffaqiyatli kirdingiz!', 'success');
            
            // Clear form
            loginForm.reset();
            
            // In real app, you would send this to backend
            console.log('Login attempt:', { email, password });
        } else {
            showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'error');
        }
    });
}

// ===== Register Form Handler =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showNotification('Parollar mos kelmadi!', 'error');
            return;
        }
        
        // Simple validation
        if (name && email && password) {
            // Show success message
            showNotification('Ro\'yxatdan muvaffaqiyatli o\'tdingiz!', 'success');
            
            // Clear form
            registerForm.reset();
            
            // Redirect to login
            setTimeout(() => {
                window.location.hash = '#login';
            }, 1500);
            
            // In real app, you would send this to backend
            console.log('Register attempt:', { name, email, password });
        } else {
            showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'error');
        }
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #1EB53A, #27ae60)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #CE1126, #e74c3c)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #0099CC, #3498db)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Stats Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = target <= 100;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (isPercentage ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + (isPercentage ? '%' : '+');
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numbers = entry.target.querySelectorAll('.stat-number');
            
            numbers.forEach(number => {
                const target = parseInt(number.textContent.replace(/[^0-9]/g, ''));
                animateCounter(number, target);
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.visual-decoration, .auth-decoration, .dual-pattern');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Active Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Form Input Animation =====
const formInputs = document.querySelectorAll('.form-group input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Console Welcome Message =====
console.log('%cEduPlatform 🎓', 'font-size: 24px; font-weight: bold; color: #0099CC;');
console.log('%cO\'zbekistonning yetakchi ta\'lim platformasi', 'font-size: 14px; color: #1EB53A;');
console.log('%c© 2026 Barcha huquqlar himoyalangan', 'font-size: 12px; color: #6B7280;');

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.subject-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    window.scrollTo({ top: 400, behavior: 'smooth' });
}

// Test Data
const testQuestions = {
    'kvadrat-tenglamalar': [
        { question: 'x² - 5x + 6 = 0 tenglamani yeching', options: ['x = 2, x = 3', 'x = 1, x = 6', 'x = -2, x = -3', 'x = 0, x = 5'], correct: 0 },
        { question: 'x² + 6x + 9 = 0 tenglamaning ildizlari yig\'indisini toping', options: ['-6', '6', '9', '-9'], correct: 0 },
        { question: 'x² - 4 = 0 tenglamani yeching', options: ['x = ±2', 'x = ±4', 'x = 2', 'x = 4'], correct: 0 },
        { question: '2x² - 8x = 0 tenglamaning ildizlari ko\'paytmasini toping', options: ['0', '4', '8', '-8'], correct: 0 },
        { question: 'x² + x - 12 = 0 tenglamani yeching', options: ['x = 3, x = -4', 'x = -3, x = 4', 'x = 2, x = 6', 'x = -2, x = -6'], correct: 0 }
    ],
    'trigonometriya': [
        { question: 'sin²α + cos²α ning qiymati nechaga teng?', options: ['1', '0', '2', '-1'], correct: 0 },
        { question: 'sin 30° ning qiymati', options: ['1/2', '√3/2', '1', '0'], correct: 0 },
        { question: 'cos 0° ning qiymati', options: ['1', '0', '-1', '1/2'], correct: 0 },
        { question: 'tg 45° ning qiymati', options: ['1', '0', '√3', '1/2'], correct: 0 },
        { question: 'sin 90° ning qiymati', options: ['1', '0', '-1', '1/2'], correct: 0 }
    ],
    'hosilalar': [
        { question: 'y = x³ funksiyaning hosilasini toping', options: ['3x²', 'x²', '3x', 'x³'], correct: 0 },
        { question: 'y = 5x + 3 funksiyaning hosilasi', options: ['5', '3', '5x', '8'], correct: 0 },
        { question: 'y = sin(x) funksiyaning hosilasi', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correct: 0 },
        { question: 'y = eˣ funksiyaning hosilasi', options: ['eˣ', 'x·eˣ', 'eˣ⁻¹', '1'], correct: 0 },
        { question: 'y = ln(x) funksiyaning hosilasi', options: ['1/x', 'x', 'ln(x)', '1'], correct: 0 }
    ]
};

let currentTest = null;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function startTest(testId, testName, totalQuestions) {
    currentTest = testId;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    const questions = testQuestions[testId] || [];
    if (questions.length === 0) {
        alert('Bu test hozircha mavjud emas. Tez orada qo\'shiladi!');
        return;
    }

    // Create test modal
    const modal = document.createElement('div');
    modal.id = 'test-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 25px; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 3rem; position: relative;">
            <button onclick="closeTest()" style="position: absolute; top: 1.5rem; right: 1.5rem; background: #f3f4f6; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">×</button>
            
            <h2 style="color: #667eea; margin-bottom: 1rem; font-size: 2rem;">${testName}</h2>
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); height: 8px; border-radius: 10px; margin-bottom: 2rem; overflow: hidden;">
                <div id="progress-bar" style="height: 100%; background: #ffd700; width: 0%; transition: width 0.3s ease;"></div>
            </div>
            
            <div id="test-content"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    showQuestion();
}

function showQuestion() {
    const questions = testQuestions[currentTest];
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    document.getElementById('progress-bar').style.width = progress + '%';
    
    const content = document.getElementById('test-content');
    content.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <p style="color: #6B7280; margin-bottom: 0.5rem;">Savol ${currentQuestionIndex + 1} / ${questions.length}</p>
            <h3 style="font-size: 1.5rem; color: #1A1A1A; margin-bottom: 2rem;">${question.question}</h3>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${question.options.map((option, index) => `
                    <button onclick="selectAnswer(${index})" style="
                        padding: 1.5rem;
                        border: 2px solid #e5e7eb;
                        border-radius: 15px;
                        background: white;
                        text-align: left;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 1.1rem;
                    " onmouseover="this.style.borderColor='#667eea'; this.style.background='#f0f4ff';" onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='white';">
                        <span style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; background: #667eea; color: white; text-align: center; line-height: 30px; margin-right: 1rem; font-weight: bold;">${String.fromCharCode(65 + index)}</span>
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectAnswer(answerIndex) {
    const questions = testQuestions[currentTest];
    userAnswers[currentQuestionIndex] = answerIndex;
    
    if (answerIndex === questions[currentQuestionIndex].correct) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const questions = testQuestions[currentTest];
    const percentage = Math.round((score / questions.length) * 100);
    const totalPoints = Math.round((score / questions.length) * 100);
    
    let resultColor = '#f5576c';
    let resultText = 'Yaxshilanish kerak';
    let resultEmoji = '😔';
    
    if (percentage >= 80) {
        resultColor = '#1EB53A';
        resultText = 'A\'lo!';
        resultEmoji = '🎉';
    } else if (percentage >= 60) {
        resultColor = '#0099CC';
        resultText = 'Yaxshi!';
        resultEmoji = '😊';
    } else if (percentage >= 40) {
        resultColor = '#D4AF37';
        resultText = 'Qoniqarli';
        resultEmoji = '😐';
    }
    
    const content = document.getElementById('test-content');
    content.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">${resultEmoji}</div>
            <h2 style="color: ${resultColor}; font-size: 2.5rem; margin-bottom: 1rem;">${resultText}</h2>
            
            <div style="background: linear-gradient(135deg, ${resultColor}22, ${resultColor}11); border-radius: 20px; padding: 2rem; margin: 2rem 0;">
                <div style="font-size: 4rem; font-weight: 800; color: ${resultColor}; margin-bottom: 0.5rem;">${totalPoints}</div>
                <div style="color: #6B7280; font-size: 1.2rem;">100 balldan</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0;">
                <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 15px;">
                    <div style="color: #1EB53A; font-size: 2rem; font-weight: 700;">${score}</div>
                    <div style="color: #6B7280;">To'g'ri</div>
                </div>
                <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 15px;">
                    <div style="color: #f5576c; font-size: 2rem; font-weight: 700;">${questions.length - score}</div>
                    <div style="color: #6B7280;">Xato</div>
                </div>
                <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 15px;">
                    <div style="color: #667eea; font-size: 2rem; font-weight: 700;">${percentage}%</div>
                    <div style="color: #6B7280;">Foiz</div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button onclick="closeTest()" style="padding: 1rem 2rem; background: #f3f4f6; border: none; border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 1rem;">Yopish</button>
                <button onclick="closeTest(); setTimeout(() => startTest('${currentTest}', document.querySelector('.test-card h3').textContent, ${questions.length}), 300);" style="padding: 1rem 2rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 1rem;">Qayta urinish</button>
            </div>
        </div>
    `;
}

function closeTest() {
    const modal = document.getElementById('test-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Homework Functions
function downloadHomework(filename, title) {
    // Create dummy PDF content
    const content = `%PDF-1.4
%EDUPLATFORM

Bu yerda ${title} uchun topshiriqlar bo'lishi kerak edi.
Haqiqiy PDF fayl serverdan yuklab olinadi.

Uyga vazifa: ${filename}
`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('✅ Fayl yuklab olindi: ' + filename, 'success');
}

function uploadHomework(homeworkId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Simulate upload
            showNotification('📤 Yuklanmoqda...', 'info');
            
            setTimeout(() => {
                showNotification(`✅ ${file.name} muvaffaqiyatli yuklandi!`, 'success');
            }, 1500);
        }
    };
    
    input.click();
}

// Support Functions
function openSimplifiedLessons() {
    window.open('sodda-darslar.html', '_blank');
    showNotification('📖 Soddalashtirilgan darslar sahifasi ochilmoqda...', 'info');
}

function registerForTutor() {
    const modal = createModal('Shaxsiy Repetitor', `
        <form id="tutor-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="text" placeholder="Ismingiz" required style="padding: 1rem; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 1rem;">
            <input type="tel" placeholder="Telefon raqamingiz" required style="padding: 1rem; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 1rem;">
            <select required style="padding: 1rem; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 1rem;">
                <option value="">Sinfni tanlang</option>
                <option value="9">9-sinf</option>
                <option value="10">10-sinf</option>
                <option value="11">11-sinf</option>
            </select>
            <button type="submit" style="padding: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">Yuborish</button>
        </form>
    `);
    
    document.getElementById('tutor-form').onsubmit = (e) => {
        e.preventDefault();
        modal.remove();
        showNotification('✅ Arizangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.', 'success');
    };
}

function playMathGames() {
    window.open('matematik-oyinlar.html', '_blank');
    showNotification('🎮 Matematik o\'yinlar sahifasi ochilmoqda...', 'info');
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 25px; max-width: 500px; width: 90%; padding: 2rem; position: relative;">
            <button onclick="this.closest('div[style*=fixed]').remove()" style="position: absolute; top: 1rem; right: 1rem; background: #f3f4f6; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; font-size: 1.5rem;">×</button>
            <h3 style="margin-bottom: 1.5rem; color: #667eea; font-size: 1.8rem;">${title}</h3>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; z-index: 10001;
        padding: 1rem 2rem; border-radius: 12px; color: white; font-weight: 600;
        animation: slideInRight 0.3s ease;
        background: ${type === 'success' ? '#1EB53A' : type === 'error' ? '#f5576c' : '#0099CC'};
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
