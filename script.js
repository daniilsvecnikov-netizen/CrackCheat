document.addEventListener('DOMContentLoaded', function() {
    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    console.log('VaultHub v1.0 loaded.');

    // ========== ЧАСТИЦЫ ФОНА ==========
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
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

    // ========== GSAP АНИМАЦИИ ==========
    gsap.registerPlugin(ScrollTrigger);

    // Анимация появления секций
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Анимация карточек продуктов
    gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "back.out(1.2)"
        });
    });

    // Анимация счетчиков
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('+') ? '+' : '';
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            innerText: target + suffix,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: function() {
                counter.textContent = Math.floor(counter.innerText) + suffix;
            }
        });
    });

    // ========== КНОПКИ СКАЧИВАНИЯ ==========
    const downloadButtons = document.querySelectorAll('.download-btn');
    const downloadToast = document.getElementById('downloadToast');
    const MEGA_LINK = 'https://mega.nz/file/HAtn2I4C#_3betMFSboX8b2dZZN5JXfuP7BshVaLmt3YpE7CFP4Y';

    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.product-card').dataset.product.toUpperCase();
            console.log(`Скачивание архива для ${productName}...`);

            // Показываем тост
            gsap.to(downloadToast, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });

            // Создаем временную ссылку для скачивания
            const tempLink = document.createElement('a');
            tempLink.href = MEGA_LINK;
            tempLink.setAttribute('download', `VaultHub_${productName}_Archive.zip`);
            tempLink.setAttribute('target', '_blank');
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            // Скрываем тост через 3 секунды
            setTimeout(() => {
                gsap.to(downloadToast, {
                    y: 100,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in"
                });
            }, 3000);
        });
    });

    // ========== НАВИГАЦИЯ И ТЕМА ==========
    // Активная ссылка при скролле
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Эффект при скролле навигации
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 12, 25, 0.95)';
            nav.style.padding = '0.7rem 0';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(20, 22, 40, 0.7)';
            nav.style.padding = '1rem 0';
            nav.style.backdropFilter = 'blur(15px)';
        }
    });

    // Переключение темы
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.className = 'fas fa-sun';
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        } else {
            icon.className = 'fas fa-moon';
            document.body.style.filter = 'none';
        }
    });

    // ========== ИМИТАЦИЯ YOUTUBE API ==========
    // (Здесь можно добавить реальную интеграцию YouTube IFrame API)
    const playerPlaceholder = document.querySelector('.player-placeholder');
    if (playerPlaceholder) {
        playerPlaceholder.innerHTML = `
            <i class="fab fa-youtube" style="font-size:4rem; color:#ff0000; margin-bottom:1rem;"></i>
            <p>Канал: <strong>Viserest</strong></p>
            <p style="font-size:0.9em; opacity:0.8;">Последнее видео: "Обзор NexusClient v5.0"</p>
            <a href="https://www.youtube.com/@Viserest" target="_blank" style="display:inline-block; margin-top:1rem; padding:0.7rem 1.5rem; background:#ff0000; color:white; border-radius:50px; text-decoration:none;">
                <i class="fab fa-youtube"></i> Смотреть на YouTube
            </a>
        `;
    }

    // ========== АНИМАЦИЯ ПРИ ЗАГРУЗКЕ ==========
    // Запускаем начальную анимацию элементов
    gsap.from('.hero-title, .hero-subtitle, .stats, .cta-scroll', {
        duration: 1.2,
        y: 40,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    });

    // ========== ЗВУК ПРИ НАВЕДЕНИИ НА КАРТОЧКУ (опционально) ==========
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Можно добавить микро-анимацию
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});