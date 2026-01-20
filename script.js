document.addEventListener('DOMContentLoaded', function() {
    console.log('VaultHub Pro v2.0 loaded');

    // ===== MODAL AND DOWNLOAD =====
    const modal = document.getElementById('warningModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const acceptCheckbox = document.getElementById('acceptWarning');
    const downloadBtn = document.getElementById('downloadAll');
    const toast = document.getElementById('toast');

    // Прямая ссылка на файл
    const DOWNLOAD_URL = 'https://www.dropbox.com/scl/fi/yugitnie26kl3cruj53h3/CRACK-PASS-1234.rar?rlkey=js1wjscuxi36l1wl9i13fm9jk&st=q8fxe7sz&dl=1';

    // Открытие модалки при нажатии на скачивание
    downloadBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        gsap.to(modal, {
            opacity: 1,
            duration: 0.3
        });
    });

    // Подтверждение скачивания
    confirmBtn.addEventListener('click', function() {
        if (!acceptCheckbox.checked) {
            gsap.to(acceptCheckbox, {
                x: -10,
                duration: 0.1,
                yoyo: true,
                repeat: 2
            });
            return;
        }

        // Закрываем модалку
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
                startDownload();
            }
        });
    });

    // Отмена скачивания
    cancelBtn.addEventListener('click', function() {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    });

    // Функция скачивания
    function startDownload() {
        // Показываем тост
        toast.classList.add('show');
        
        // Анимация прогресс-бара
        const progressFill = toast.querySelector('.progress-fill');
        gsap.to(progressFill, {
            width: '100%',
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
                // Создаем скрытую ссылку для скачивания
                const link = document.createElement('a');
                link.href = DOWNLOAD_URL;
                link.download = 'VaultHub_Full_Arsenal.rar';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Прячем тост через 3 секунды
                setTimeout(() => {
                    toast.classList.remove('show');
                    // Сбрасываем прогресс
                    progressFill.style.width = '0%';
                }, 3000);
            }
        });
    }

    // ===== ANIMATIONS =====
    gsap.registerPlugin(ScrollTrigger);

    // Анимация карточек продуктов
    gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power2.out"
        });
    });

    // Анимация счетчиков
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('+') ? '+' : '';
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        const value = Math.floor(this.targets()[0].innerText);
                        counter.textContent = value.toLocaleString() + suffix;
                    }
                });
            }
        });
    });

    // Анимация при загрузке
    gsap.from('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });

    // ===== ONLINE COUNTER =====
    function updateOnlineCount() {
        const counter = document.getElementById('onlineCount');
        const base = 25847;
        const random = Math.floor(Math.random() * 200) - 100;
        const newCount = Math.max(25000, base + random);
        
        gsap.to(counter, {
            innerText: newCount.toLocaleString(),
            duration: 0.5,
            snap: { innerText: 1 }
        });
    }
    setInterval(updateOnlineCount, 5000);

    // ===== THEME TOGGLE =====
    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.addEventListener('click', function() {
        const icon = themeBtn.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.className = 'fas fa-sun';
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        } else {
            icon.className = 'fas fa-moon';
            document.body.style.filter = 'none';
        }
    });

    // ===== QUICK DEMO =====
    const demoBtn = document.getElementById('quickDemo');
    demoBtn.addEventListener('click', function() {
        // Простая анимация демо
        gsap.to(demoBtn, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                // Показываем уведомление
                const originalText = demoBtn.querySelector('span').textContent;
                demoBtn.querySelector('span').textContent = 'ДЕМО ЗАПУЩЕНО';
                demoBtn.disabled = true;
                
                setTimeout(() => {
                    demoBtn.querySelector('span').textContent = originalText;
                    demoBtn.disabled = false;
                }, 2000);
            }
        });
    });

    // ===== NAVIGATION SCROLL =====
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-3d');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 12, 25, 0.98)';
            nav.style.padding = '0.7rem 0';
        } else {
            nav.style.background = 'rgba(10, 12, 25, 0.9)';
            nav.style.padding = '1rem 0';
        }
    });

    // ===== PARTICLES BACKGROUND =====
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#b026ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
});