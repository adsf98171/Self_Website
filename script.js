document.addEventListener('DOMContentLoaded', function() {
    // 平滑滾動效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 技能進度條動畫
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // 當元素進入視圖時觸發動畫
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkills();
                }
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    // 觀察技能進度條
    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });

    // 導航欄滾動效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // 向下滾動
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滾動
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 初始化動畫
    animateSkills();

    // 創建粒子
    createParticles();

    // 確保所有專案詳細內容初始狀態正確
    document.querySelectorAll('.project-details').forEach(details => {
        details.style.display = 'none';
        details.style.opacity = '0';
    });
});

function toggleProject(projectId) {
    const card = document.getElementById(projectId).closest('.project-card');
    const details = document.getElementById(projectId);
    const icon = card.querySelector('.expand-icon');
    
    // 切換活動狀態
    const isActive = card.classList.toggle('active');
    
    // 更新展開圖標
    icon.textContent = isActive ? '▼' : '▶';
    
    // 直接控制顯示/隱藏
    if (isActive) {
        details.style.display = 'block';
        // 使用 setTimeout 確保 display: block 生效後再添加 opacity
        setTimeout(() => {
            details.style.opacity = '1';
        }, 10);
    } else {
        details.style.opacity = '0';
        // 等待淡出動畫完成後隱藏元素
        setTimeout(() => {
            details.style.display = 'none';
        }, 300);
    }
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // 簡化遮罩層點擊事件
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            const visibleDetails = document.querySelector('.project-details[style*="display: block"]');
            if (visibleDetails) {
                closeProject(visibleDetails.id);
            }
        }
    });
    
    document.body.appendChild(overlay);
    return overlay;
}

// 添加 ESC 鍵關閉功能
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const visibleDetails = document.querySelector('.project-details[style*="display: block"]');
        if (visibleDetails) {
            closeProject(visibleDetails.id);
        }
    }
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 隨機位置和動畫延遲
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // 改成隨機顏色
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // 使用 HSL 隨機顏色

        particlesContainer.appendChild(particle);
    }
}

// 添加浮動動畫
const floatKeyframes = `
@keyframes float {
    0% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(100px, 100px);
    }
    50% {
        transform: translate(200px, 0);
    }
    75% {
        transform: translate(100px, -100px);
    }
    100% {
        transform: translate(0, 0);
    }
}`;

particlesJS("particles-js", {
    particles: {
        number: {
            value: 100, // 粒子數量
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: { value: "#5bc0de" }, // 粒子顏色
        shape: {
            type: "star", // 形狀可選：circle, edge, triangle, polygon, star
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true, // 讓粒子之間連線
            distance: 150,
            color: "#5bc0de",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2, // 移動速度
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab" // 滑鼠懸停效果，可選 grab, bubble, repulse
            }
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: { opacity: 1 }
            }
        }
    },
    retina_detect: true
});



const styleSheet = document.createElement('style');
styleSheet.textContent = floatKeyframes;
document.head.appendChild(styleSheet);
