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
        if (!btn.contains(e.target) && !nav.contains(e.target)) closeMenu();
    });
})();

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========== Scroll Effects (consolidated) ==========
(function () {
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
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
    });

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
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
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
            // Use full-resolution image (remove aspect-ratio crop)
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
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});
