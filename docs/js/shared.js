/* ============================================================
   MarKing Landing Page — Shared JavaScript
   Extracted from index.html / index-en.html
   ============================================================ */

// ========== GitHub Stats Data Fetching ==========
async function fetchGitHubStats() {
    const CACHE_KEY = 'github_stats_cache';
    const CACHE_DURATION = 5 * 60 * 1000;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                updateStatsUI(data);
                return;
            }
        } catch (e) { /* continue to fetch */ }
    }

    try {
        const repoResponse = await fetch('https://api.github.com/repos/l06066hb/MarKing');
        if (!repoResponse.ok) throw new Error(`HTTP ${repoResponse.status}`);
        const repoData = await repoResponse.json();

        const releasesResponse = await fetch('https://api.github.com/repos/l06066hb/MarKing/releases');
        if (!releasesResponse.ok) throw new Error(`HTTP ${releasesResponse.status}`);
        const releases = await releasesResponse.json();

        let totalDownloads = 0;
        releases.forEach(release => {
            if (release.assets) {
                release.assets.forEach(asset => {
                    totalDownloads += asset.download_count || 0;
                });
            }
        });

        const data = { stars: repoData.stargazers_count || 0, downloads: totalDownloads };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        updateStatsUI(data);
    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        const starsEl = document.getElementById('github-stars');
        const downloadsEl = document.getElementById('total-downloads');
        if (starsEl) starsEl.textContent = '-';
        if (downloadsEl) downloadsEl.textContent = '-';
    }
}

function updateStatsUI(data) {
    const starsEl = document.getElementById('github-stars');
    const downloadsEl = document.getElementById('total-downloads');
    if (starsEl && data.stars !== undefined) starsEl.textContent = data.stars.toLocaleString();
    if (downloadsEl && data.downloads !== undefined) downloadsEl.textContent = data.downloads.toLocaleString();
}

window.addEventListener('load', fetchGitHubStats);

// ========== Mobile Menu Toggle ==========
(function () {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('navLinks');
    const menuIcon = btn?.querySelector('.menu-icon');
    const closeIcon = btn?.querySelector('.close-icon');
    if (!btn || !nav || !menuIcon || !closeIcon) return;

    function closeMenu() {
        nav.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation menu');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }

    btn.addEventListener('click', function () {
        const isActive = nav.classList.toggle('active');
        btn.setAttribute('aria-expanded', isActive);
        btn.setAttribute('aria-label', isActive ? 'Close navigation menu' : 'Open navigation menu');
        menuIcon.style.display = isActive ? 'none' : 'block';
        closeIcon.style.display = isActive ? 'block' : 'none';
    });

    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
        if (!nav.classList.contains('active')) return;
        if (!btn.contains(e.target) && !nav.contains(e.target)) closeMenu();
    });
})();

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        e.preventDefault();
        try {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) { /* invalid selector, ignore */ }
    });
});

// ========== Scroll Effects (consolidated) ==========
(function () {
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.pageYOffset;

            // Header scroll state
            if (header) header.classList.toggle('scrolled', y > 100);

            // Scroll progress bar
            if (scrollProgress) {
                const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                scrollProgress.style.transform = `scaleX(${total > 0 ? y / total : 0})`;
            }

            // Back to top visibility
            if (backToTop) backToTop.classList.toggle('visible', y > 500);
            ticking = false;
        });
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
})();

// ========== Scroll Reveal Animation (Intersection Observer) ==========
(function () {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bento-item, .platform-card, .sponsor-card, .showcase-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
})();

// ========== Logo Preload ==========
window.addEventListener('load', () => {
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) logoIcon.style.opacity = '1';
});

// ========== Screenshot Carousel (with touch swipe) ==========
(function () {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const items = track.querySelectorAll('.screenshot-item');
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let autoPlayInterval;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        items.forEach((item, i) => item.classList.toggle('active', i === currentIndex));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function nextSlide() { currentIndex = (currentIndex + 1) % items.length; updateCarousel(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + items.length) % items.length; updateCarousel(); }
    function goToSlide(i) { currentIndex = i; updateCarousel(); }
    function startAutoPlay() { autoPlayInterval = setInterval(nextSlide, 5000); }
    function stopAutoPlay() { clearInterval(autoPlayInterval); }
    function restartAutoPlay() { stopAutoPlay(); startAutoPlay(); }

    prevBtn.addEventListener('click', () => { prevSlide(); restartAutoPlay(); });
    nextBtn.addEventListener('click', () => { nextSlide(); restartAutoPlay(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goToSlide(i); restartAutoPlay(); });
    });

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); restartAutoPlay(); }
        else if (e.key === 'ArrowRight') { nextSlide(); restartAutoPlay(); }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50;

    track.addEventListener('touchstart', (e) => {
        if (!e.changedTouches.length) return;
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!e.changedTouches.length) return;
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            if (diff > 0) nextSlide(); else prevSlide();
        }
        startAutoPlay();
    }, { passive: true });

    startAutoPlay();
})();

// ========== Showcase Tabbed Gallery ==========
(function () {
    const tabs = document.querySelectorAll('.showcase-tab');
    const panels = document.querySelectorAll('.showcase-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            panels.forEach(p => p.classList.remove('active'));
            const activePanel = document.querySelector(`.showcase-panel[data-panel="${target}"]`);
            if (activePanel) activePanel.classList.add('active');
        });
    });
})();

// ========== Image Lightbox for Showcase ==========
(function () {
    // Create lightbox DOM once
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close preview');
    closeBtn.innerHTML = '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';

    const img = document.createElement('img');
    img.alt = '';

    const hint = document.createElement('span');
    hint.className = 'lightbox-hint';

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    overlay.appendChild(hint);
    document.body.appendChild(overlay);

    // Detect language
    const isEN = document.documentElement.lang === 'en';
    hint.textContent = isEN ? 'Click anywhere or press Esc to close' : '点击任意位置或按 Esc 关闭';

    function openLightbox(src, alt) {
        img.src = src;
        img.alt = alt || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach to all showcase card images
    document.querySelectorAll('.showcase-card img').forEach(cardImg => {
        cardImg.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!cardImg.src) return;
            openLightbox(cardImg.src, cardImg.alt);
        });
    });

    // Close handlers
    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
    });
})();

// ========== Bento Card Glow Follow Effect ==========
document.querySelectorAll('.bento-item').forEach(card => {
    let rafId = null;
    card.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            rafId = null;
        });
    });
});

// ========== Enhanced Glow Follow for all interactive cards ==========
document.querySelectorAll('.showcase-card, .platform-card, .sponsor-card, .theme-item').forEach(card => {
    let rafId = null;
    card.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            rafId = null;
        });
    });
});

// ========== 3D Tilt Effect on Cards ==========
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 768px)').matches) return; // disable on mobile

    const MAX_TILT = 8; // degrees
    document.querySelectorAll('.tilt-card').forEach(card => {
        let rafId = null;
        card.addEventListener('mousemove', (e) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const rotateY = ((e.clientX - cx) / (rect.width / 2)) * MAX_TILT;
                const rotateX = -((e.clientY - cy) / (rect.height / 2)) * MAX_TILT;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
                rafId = null;
            });
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();

// ========== Magnetic Buttons ==========
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const STRENGTH = 0.35;
    document.querySelectorAll('.magnetic').forEach(wrapper => {
        const btn = wrapper.querySelector('.btn');
        if (!btn) return;
        let rafId = null;
        wrapper.addEventListener('mousemove', (e) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                wrapper.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
                btn.style.transform = `translate(${x * STRENGTH * 0.4}px, ${y * STRENGTH * 0.4}px)`;
                rafId = null;
            });
        });
        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = '';
            btn.style.transform = '';
        });
    });
})();

// Hero image now uses a subtle CSS floating animation instead of mouse-follow tilt.

// ========== Animated Number Counters ==========
(function () {
    const counters = document.querySelectorAll('.hero-stat-num[data-count]');
    if (!counters.length) return;

    const animateCount = (el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const value = Math.round(target * eased);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();

// ========== Section Reveal on Scroll ==========
(function () {
    const sections = document.querySelectorAll('.features, .showcase, .theme-showcase, .download, .sponsor, .section-header');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    sections.forEach(s => observer.observe(s));
})();

// ========== Marquee: JS-measured seamless loop ==========
(function () {
    const track = document.getElementById('marqueeTrack');
    const set = document.getElementById('marqueeSet');
    if (!track || !set) return;

    function initMarquee() {
        // 清除旧的克隆
        track.querySelectorAll('.marquee-set').forEach((el, i) => {
            if (i > 0) el.remove();
        });

        // 克隆一份，让内容首尾无缝衔接
        const clone = set.cloneNode(true);
        clone.removeAttribute('id');
        track.appendChild(clone);

        // 精确测量一个 set 的宽度
        const setWidth = Math.round(set.getBoundingClientRect().width);
        if (setWidth === 0) return; // 内容未渲染，跳过
        // 按固定速度计算动画时长，约 35 px/s，滚动更从容
        const duration = Math.max(Math.min(setWidth / 35, 120), 40);

        // 动态注入精确关键帧动画
        const styleId = 'marquee-dynamic-style';
        let style = document.getElementById(styleId);
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }
        style.textContent = `
            @keyframes marqueeScroll {
                from { transform: translateX(0); }
                to   { transform: translateX(-${setWidth}px); }
            }
            #${track.id} {
                animation: marqueeScroll ${duration}s linear infinite;
            }
        `;
    }

    initMarquee();
    // 字体加载完成后重新测量
    document.fonts?.ready?.then(initMarquee);
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initMarquee, 250);
    }, { passive: true });
})();

// ========== Hero Floating Particles ==========
(function () {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 480px)').matches) return;

    const COUNT = 14;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < COUNT; i++) {
        const span = document.createElement('span');
        const size = 2 + Math.random() * 4;
        span.style.width = `${size}px`;
        span.style.height = `${size}px`;
        span.style.left = `${Math.random() * 100}%`;
        span.style.animationDuration = `${10 + Math.random() * 14}s`;
        span.style.animationDelay = `${Math.random() * 12}s`;
        span.style.opacity = `${0.3 + Math.random() * 0.4}`;
        frag.appendChild(span);
    }
    container.appendChild(frag);
})();

// ========== Cursor Glow Follower ==========
(function () {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let rafId = null;
    let active = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!active) {
            active = true;
            glow.style.opacity = '1';
            animate();
        }
    });

    document.addEventListener('mouseleave', () => {
        active = false;
        glow.style.opacity = '0';
        if (rafId) cancelAnimationFrame(rafId);
    });

    function animate() {
        // Smooth lerp follow
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        if (Math.abs(mouseX - glowX) > 0.5 || Math.abs(mouseY - glowY) > 0.5) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null;
        }
    }
})();

// ========== Scroll Parallax for Aurora ==========
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const aurora = document.querySelector('.hero-aurora');
    const orb = document.querySelector('.hero-aurora-orb');
    if (!aurora && !orb) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.pageYOffset;
                if (aurora) aurora.style.transform = `translateY(${y * 0.25}px)`;
                if (orb) orb.style.transform = `translateX(-50%) translateY(${y * 0.15}px)`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();
