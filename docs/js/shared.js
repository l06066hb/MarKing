/* ============================================================
   MarKing Landing — shared.js v2.0.0
   「墨与纸」交互模块：下载入口 / 系统适配 / 导航 / 揭示 /
   打字演示 / 行内 AI / 知识图谱 / 主题切换 / 灯箱 / 日期。
   零依赖；所有模块对缺失元素静默跳过。
   ============================================================ */
(function () {
    'use strict';

    var docEl = document.documentElement;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hoverable = window.matchMedia && window.matchMedia('(hover: hover)').matches;
    var OS = docEl.getAttribute('data-os') || 'win';
    var GITHUB_LATEST = 'https://github.com/l06066hb/MarKing/releases/latest';

    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
    function rand(min, max) { return Math.floor(min + Math.random() * (max - min + 1)); }
    function esc(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ---------- 1. 下载入口 ---------- */

    function openDownload(platform) {
        var p = (platform === 'win' || platform === 'mac' || platform === 'linux') ? platform : null;
        if (typeof window.DownloadUI_openModal === 'function') {
            window.DownloadUI_openModal(p);
        } else {
            window.open(GITHUB_LATEST, '_blank', 'noopener');
        }
    }

    $$('[data-download]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            openDownload(el.getAttribute('data-download') || null);
        });
    });

    /* ---------- 2. 系统适配 ---------- */

    if (OS === 'win' || OS === 'mac' || OS === 'linux') {
        $$('[data-dl-label]').forEach(function (el) {
            var label = el.getAttribute('data-label-' + OS);
            if (label) el.textContent = label;
        });
        $$('.platform[data-platform]').forEach(function (el) {
            el.classList.toggle('is-current', el.getAttribute('data-platform') === OS);
        });
    }

    if (OS === 'mac') {
        var KEY_MAP = { 'Ctrl': '⌘', 'Shift': '⇧', 'Alt': '⌥' };
        $$('.keys[data-keys]').forEach(function (el) {
            var parts = el.getAttribute('data-keys').split('+');
            el.innerHTML = parts.map(function (k) {
                return '<kbd>' + esc(KEY_MAP[k.trim()] || k.trim()) + '</kbd>';
            }).join('');
        });
    }

    /* ---------- 3. 导航 ---------- */

    (function initNav() {
        var header = $('.site-header');
        if (!header) return;
        var ticking = false;
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                header.classList.toggle('is-scrolled', window.scrollY > 4);
                ticking = false;
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        var btn = $('.menu-btn');
        var sheet = $('#mobileMenu');
        if (!btn || !sheet) return;

        var isEn = /^en/.test(docEl.lang || '');
        function setOpen(open, restoreFocus) {
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.setAttribute('aria-label', open ? (isEn ? 'Close menu' : '关闭菜单') : (isEn ? 'Open menu' : '打开菜单'));
            sheet.hidden = !open;
            header.classList.toggle('menu-open', open);
            document.body.classList.toggle('nav-open', open);
            if (!open && restoreFocus) btn.focus();
        }
        btn.addEventListener('click', function () {
            setOpen(btn.getAttribute('aria-expanded') !== 'true');
        });
        sheet.addEventListener('click', function (e) {
            if (e.target.closest('a')) setOpen(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !sheet.hidden) setOpen(false, true);
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 880 && !sheet.hidden) setOpen(false);
        });
    })();

    /* ---------- 4. 揭示 ---------- */

    (function initReveal() {
        var items = $$('[data-reveal]');
        if (!items.length) return;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }
        var delivered = false;
        var io = new IntersectionObserver(function (entries) {
            delivered = true;
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('is-in');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        items.forEach(function (el) { io.observe(el); });
        setTimeout(function () {
            if (delivered) return;
            io.disconnect();
            items.forEach(function (el) { el.classList.add('is-in'); });
        }, 2000);
    })();

    /* ---------- 5. 打字演示 ---------- */

    (function initDemo() {
        var demo = $('[data-demo]');
        if (!demo) return;
        var srcEl = $('[data-demo-src]', demo);
        var pvEl = $('[data-demo-preview]', demo);
        var countEl = $('[data-demo-count]', demo);
        var replayBtn = $('[data-demo-replay]', demo);
        var docScript = $('[data-demo-doc]', demo);
        if (!srcEl || !pvEl || !docScript) return;

        var doc = (docScript.textContent || '').replace(/^\s+|\s+$/g, '');
        var countMode = demo.getAttribute('data-count-mode') || 'words';
        var unit = demo.getAttribute('data-unit') || 'words';
        var tipLabel = demo.getAttribute('data-tip-label') || 'Tip';
        var CJK_RE = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
        var BULB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/></svg>';
        var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

        /* 源码行着色 */
        function inlineSrc(text) {
            var out = '';
            var i = 0;
            while (i < text.length) {
                var two = text.substr(i, 2);
                if (two === '[[' || two === ']]') {
                    out += '<span class="tk-m">' + two + '</span>'; i += 2;
                } else if (two === '**' || two === '==') {
                    out += '<span class="tk-p">' + two + '</span>'; i += 2;
                } else {
                    out += esc(text.charAt(i)); i += 1;
                }
            }
            return out;
        }

        function colorLine(raw) {
            var m;
            if ((m = raw.match(/^#\s+(.*)$/))) {
                return '<span class="tk-m">#</span> <span class="tk-h">' + inlineSrc(m[1]) + '</span>';
            }
            if ((m = raw.match(/^>\s+(\[![A-Z]+\])(.*)$/))) {
                return '<span class="tk-q">&gt;</span> <span class="tk-q">' + esc(m[1]) + '</span>' + inlineSrc(m[2]);
            }
            if ((m = raw.match(/^>\s+(.*)$/))) {
                return '<span class="tk-q">&gt;</span> ' + inlineSrc(m[1]);
            }
            if ((m = raw.match(/^(- \[[ x]\] )(.*)$/))) {
                return '<span class="tk-s">' + esc(m[1]) + '</span>' + inlineSrc(m[2]);
            }
            if ((m = raw.match(/^(- )(.*)$/))) {
                return '<span class="tk-s">- </span>' + inlineSrc(m[2]);
            }
            return inlineSrc(raw);
        }

        function renderSrc(text, withCaret) {
            var lines = text.split('\n');
            var html = '';
            for (var i = 0; i < lines.length; i++) {
                var content = colorLine(lines[i]);
                if (withCaret && i === lines.length - 1) content += '<span class="demo-caret"></span>';
                html += '<div class="sl"><span class="ln">' + (i + 1) + '</span><span class="sc">' + (content || '&nbsp;') + '</span></div>';
            }
            srcEl.innerHTML = html;
        }

        /* 行内渲染（预览） */
        function inlinePv(text) {
            var s = esc(text);
            s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            s = s.replace(/==([^=]+)==/g, '<mark>$1</mark>');
            s = s.replace(/\[\[([^\]]+)\]\]/g, '<span class="pv-link">$1</span>');
            s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
            return s;
        }

        /* 迷你渲染器 */
        function renderPv(text) {
            var lines = text.split('\n');
            var html = '';
            var i = 0;
            while (i < lines.length) {
                var line = lines[i];
                var m;
                if ((m = line.match(/^#\s+(.*)$/))) {
                    html += '<div class="pv-h1">' + inlinePv(m[1]) + '</div>';
                } else if (line.match(/^>\s+\[![A-Z]+\]/)) {
                    var body = [];
                    var j = i + 1;
                    while (j < lines.length && (m = lines[j].match(/^>\s+(.*)$/)) && !lines[j].match(/^>\s+\[![A-Z]+\]/)) {
                        body.push(m[1]); j++;
                    }
                    html += '<div class="pv-callout"><div class="pv-callout-title">' + BULB + '<span>' + esc(tipLabel) + '</span></div>' +
                        body.map(function (b) { return '<p class="pv-p" style="margin:0">' + inlinePv(b) + '</p>'; }).join('') + '</div>';
                    i = j - 1;
                } else if ((m = line.match(/^>\s+(.*)$/))) {
                    html += '<div class="pv-quote">' + inlinePv(m[1]) + '</div>';
                } else if (line.match(/^- \[[ x]\] /) || line.match(/^- /)) {
                    var isTask = line.match(/^- \[[ x]\] /);
                    var tag = isTask ? 'pv-tasks' : 'pv-list';
                    html += '<ul class="' + tag + '">';
                    while (i < lines.length && ((isTask && lines[i].match(/^- \[[ x]\] /)) || (!isTask && lines[i].match(/^- /) && !lines[i].match(/^- \[[ x]\] /)))) {
                        var checked = lines[i].match(/^- \[x\] /);
                        var txt = lines[i].replace(/^- \[[ x]\] /, '').replace(/^- /, '');
                        html += '<li><span class="pv-box' + (checked ? ' is-checked' : '') + '">' + (checked ? CHECK : '') + '</span><span>' + inlinePv(txt) + '</span></li>';
                        i++;
                    }
                    html += '</ul>';
                    continue;
                } else if (line.trim() === '') {
                    /* 空行分段 */
                } else {
                    html += '<p class="pv-p">' + inlinePv(line) + '</p>';
                }
                i++;
            }
            pvEl.innerHTML = html;
        }

        /* 字数统计 */
        function countText(text) {
            var clean = text
                .replace(/\[![A-Z]+\]/g, '')
                .replace(/[\[\]\*`=>#\-]/g, ' ')
                .replace(/\s+/g, ' ');
            if (countMode === 'cjk') {
                var han = (clean.match(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g) || []).length;
                var words = (clean.replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
                return han + words + ' ' + unit;
            }
            return ((clean.match(/\S+/g) || []).length) + ' ' + unit;
        }

        /* 步进队列 */
        function buildSteps(text) {
            var steps = [];
            var i = 0;
            while (i < text.length) {
                var c = text.charAt(i);
                var chunk, delay;
                if (CJK_RE.test(c)) {
                    chunk = '';
                    while (i < text.length && CJK_RE.test(text.charAt(i)) && chunk.length < 3) {
                        chunk += text.charAt(i); i++;
                    }
                    delay = rand(110, 210);
                } else {
                    chunk = c; i++;
                    delay = /[\x00-\x7F]/.test(c) ? rand(26, 62) : rand(110, 210);
                }
                var extra = 0;
                if (chunk === '\n') extra = rand(240, 420);
                else if (/^[，。！？,.!?]$/.test(chunk)) extra = rand(140, 240);
                steps.push({ chunk: chunk, delay: delay + extra });
            }
            return steps;
        }

        var playing = false;
        var timer = null;

        function setCount(text) {
            if (countEl) countEl.textContent = countText(text);
        }

        function renderFinal() {
            renderSrc(doc, true);
            renderPv(doc);
            setCount(doc);
        }

        function finish() {
            demo.classList.remove('is-typing');
            playing = false;
            if (replayBtn && !reduceMotion) replayBtn.hidden = false;
        }

        function play() {
            if (playing) return;
            playing = true;
            demo.classList.add('is-typing');
            if (replayBtn) replayBtn.hidden = true;
            var typed = '';
            var steps = buildSteps(doc);
            var idx = 0;
            function step() {
                if (idx >= steps.length) { finish(); return; }
                var st = steps[idx];
                typed += st.chunk;
                renderSrc(typed, true);
                renderPv(typed);
                setCount(typed);
                srcEl.scrollTop = srcEl.scrollHeight;
                idx++;
                timer = setTimeout(step, st.delay);
            }
            timer = setTimeout(step, 120);
        }

        if (reduceMotion) {
            renderFinal();
            return;
        }

        if ('IntersectionObserver' in window) {
            var delivered = false;
            var io = new IntersectionObserver(function (entries) {
                delivered = true;
                entries.forEach(function (en) {
                    if (en.isIntersecting) {
                        io.disconnect();
                        play();
                    }
                });
            }, { threshold: 0.35 });
            io.observe(demo);
            setTimeout(function () {
                if (!delivered) { io.disconnect(); play(); }
            }, 2000);
        } else {
            play();
        }

        if (replayBtn) {
            replayBtn.addEventListener('click', function () {
                clearTimeout(timer);
                play();
            });
        }
    })();

    /* ---------- 6. 行内 AI 流式 ---------- */

    (function initAi() {
        var card = $('[data-ai-demo]');
        if (!card) return;
        var stream = $('[data-ai-stream]', card);
        if (!stream) return;

        function done() { card.classList.add('is-done'); }

        if (reduceMotion) { done(); return; }

        var fullText = stream.textContent;
        var CJK_RE = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u3000-\u30FF\uFF00-\uFFEF]/;

        function run() {
            var h = stream.offsetHeight;
            stream.style.minHeight = h + 'px';
            stream.textContent = '';
            var caret = document.createElement('span');
            caret.className = 'demo-caret';
            stream.appendChild(caret);
            var i = 0;
            (function tick() {
                if (i >= fullText.length) {
                    caret.remove();
                    done();
                    return;
                }
                var c = fullText.charAt(i);
                stream.insertBefore(document.createTextNode(c), caret);
                i++;
                setTimeout(tick, CJK_RE.test(c) ? rand(35, 60) : rand(18, 30));
            })();
        }

        if ('IntersectionObserver' in window) {
            var delivered = false;
            var io = new IntersectionObserver(function (entries) {
                delivered = true;
                entries.forEach(function (en) {
                    if (en.isIntersecting) { io.disconnect(); run(); }
                });
            }, { threshold: 0.5 });
            io.observe(card);
            setTimeout(function () {
                if (!delivered) { io.disconnect(); run(); }
            }, 2000);
        } else {
            run();
        }
    })();

    /* ---------- 7. 知识图谱悬停 ---------- */

    (function initGraph() {
        var svg = $('svg.graph');
        if (!svg || !hoverable) return;
        var edges = $$('.ge', svg);
        var nodes = $$('.gn', svg);

        function neighbors(id) {
            var set = {};
            edges.forEach(function (e) {
                var a = e.getAttribute('data-a'), b = e.getAttribute('data-b');
                if (a === id) { set[b] = true; e.classList.add('is-hot'); }
                else if (b === id) { set[a] = true; e.classList.add('is-hot'); }
            });
            return set;
        }

        nodes.forEach(function (gn) {
            gn.addEventListener('mouseenter', function () {
                var id = gn.getAttribute('data-id');
                svg.classList.add('is-dim');
                var hot = neighbors(id);
                nodes.forEach(function (n) {
                    n.classList.toggle('is-hot', n.getAttribute('data-id') === id || !!hot[n.getAttribute('data-id')]);
                });
            });
            gn.addEventListener('mouseleave', function () {
                svg.classList.remove('is-dim');
                edges.forEach(function (e) { e.classList.remove('is-hot'); });
                nodes.forEach(function (n) { n.classList.remove('is-hot'); });
            });
        });
    })();

    /* ---------- 8. 主题切换器 ---------- */

    (function initThemes() {
        var root = $('[data-themes]');
        if (!root) return;
        var stage = $('.themes-stage', root);
        var swatches = $$('.swatch', root);
        if (!stage || !swatches.length) return;

        function imgFor(key) { return $('img[data-theme="' + key + '"]', stage); }
        function swatchFor(key) {
            for (var i = 0; i < swatches.length; i++) {
                if (swatches[i].getAttribute('data-theme') === key) return swatches[i];
            }
            return null;
        }

        function preload(key) {
            var img = imgFor(key);
            if (img && !img.getAttribute('src') && img.getAttribute('data-src')) {
                img.setAttribute('src', img.getAttribute('data-src'));
            }
        }

        function activate(key, focus) {
            var img = imgFor(key);
            var sw = swatchFor(key);
            if (!img || !sw) return;
            swatches.forEach(function (s) {
                var on = s === sw;
                s.setAttribute('aria-checked', on ? 'true' : 'false');
                s.tabIndex = on ? 0 : -1;
            });
            if (focus) sw.focus();
            function show() {
                $$('img', stage).forEach(function (im) {
                    im.classList.toggle('is-active', im === img);
                });
            }
            if (!img.getAttribute('src')) {
                img.setAttribute('src', img.getAttribute('data-src'));
                if (img.complete) show();
                else img.addEventListener('load', show, { once: true });
            } else {
                show();
            }
        }

        function move(delta, toEnd) {
            var idx = swatches.findIndex(function (s) { return s.getAttribute('aria-checked') === 'true'; });
            if (idx < 0) idx = 0;
            var next = toEnd === 'home' ? 0 : toEnd === 'end' ? swatches.length - 1
                : (idx + delta + swatches.length) % swatches.length;
            activate(swatches[next].getAttribute('data-theme'), true);
        }

        swatches.forEach(function (sw) {
            sw.addEventListener('click', function () {
                activate(sw.getAttribute('data-theme'), false);
            });
            sw.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(1); }
                else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
                else if (e.key === 'Home') { e.preventDefault(); move(0, 'home'); }
                else if (e.key === 'End') { e.preventDefault(); move(0, 'end'); }
            });
            sw.addEventListener('mouseenter', function () { preload(sw.getAttribute('data-theme')); });
            sw.addEventListener('focus', function () { preload(sw.getAttribute('data-theme')); });
        });

        /* 进入视口后预取下一张 */
        if ('IntersectionObserver' in window && 'requestIdleCallback' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                    if (!en.isIntersecting) return;
                    io.disconnect();
                    requestIdleCallback(function () {
                        var cur = swatches.findIndex(function (s) { return s.getAttribute('aria-checked') === 'true'; });
                        var next = swatches[(cur + 1) % swatches.length];
                        if (next) preload(next.getAttribute('data-theme'));
                    });
                });
            }, { threshold: 0.2 });
            io.observe(root);
        }
    })();

    /* ---------- 9. 灯箱 ---------- */

    (function initLightbox() {
        var zoomables = $$('img[data-zoom]');
        if (!zoomables.length) return;

        var isEn = docEl.lang === 'en';
        var box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-label', isEn ? 'Image preview' : '图片预览');
        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', docEl.lang === 'en' ? 'Close' : '关闭');
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
        var img = document.createElement('img');
        img.alt = '';
        var hint = document.createElement('p');
        hint.className = 'lightbox-hint';
        hint.textContent = docEl.lang === 'en' ? 'Click anywhere or press Esc to close' : '点击任意处或按 Esc 关闭';
        box.appendChild(img);
        box.appendChild(closeBtn);
        box.appendChild(hint);
        document.body.appendChild(box);

        var lastFocus = null;

        function open(src, trigger) {
            lastFocus = trigger || null;
            img.src = src;
            box.classList.add('is-open');
            document.body.classList.add('nav-open');
            closeBtn.focus();
        }
        function close() {
            box.classList.remove('is-open');
            document.body.classList.remove('nav-open');
            if (lastFocus && lastFocus.focus) lastFocus.focus();
            lastFocus = null;
        }

        zoomables.forEach(function (z) {
            z.addEventListener('click', function () {
                open(z.currentSrc || z.src, z);
            });
            z.setAttribute('tabindex', '0');
            z.setAttribute('role', 'button');
            z.setAttribute('aria-label', (z.getAttribute('alt') ? z.getAttribute('alt') + ' — ' : '') + (isEn ? 'Enlarge' : '放大查看'));
            z.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open(z.currentSrc || z.src, z);
                }
            });
        });
        closeBtn.addEventListener('click', close);
        box.addEventListener('click', function (e) {
            if (e.target !== img) close();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && box.classList.contains('is-open')) close();
        });
    })();

    /* ---------- 9.5 下载弹窗焦点管理（不动 download-*.js 契约，外置补丁） ---------- */

    (function initModalA11y() {
        var overlay = $('#downloadModal');
        if (!overlay || !('MutationObserver' in window)) return;
        var lastFocus = null;

        function focusables() {
            return $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', overlay)
                .filter(function (el) { return el.offsetParent !== null; });
        }
        function onToggle() {
            if (overlay.classList.contains('active')) {
                lastFocus = document.activeElement;
                var list = focusables();
                if (list.length) list[0].focus();
            } else {
                if (lastFocus && lastFocus.focus) lastFocus.focus();
                lastFocus = null;
            }
        }
        new MutationObserver(onToggle).observe(overlay, { attributes: true, attributeFilter: ['class'] });
        overlay.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') return;
            var list = focusables();
            if (!list.length) return;
            var first = list[0], last = list[list.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
    })();

    /* ---------- 10. 今日日期 ---------- */

    $$('[data-today]').forEach(function (el) {
        var d = new Date();
        var p = function (n) { return (n < 10 ? '0' : '') + n; };
        el.textContent = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
    });

    /* ---------- 11. 屏蔽无效的 GitHub 统计请求 ---------- */

    // download-ui 初始化时会无条件拉取仓库 stars/下载量，写入 #github-stars 等元素；
    // v2.0 起页面已无这些元素，请求（未鉴权、易触发 403 限流）纯属噪音，这里短路掉。
    // 本脚本先于 download-init.js 注册 DOMContentLoaded，此补丁必在其 init 之前生效。
    document.addEventListener('DOMContentLoaded', function () {
        if (window.DownloadUI && window.DownloadUI.prototype) {
            window.DownloadUI.prototype.loadGitHubStats = function () { return Promise.resolve(); };
        }
    });

})();
