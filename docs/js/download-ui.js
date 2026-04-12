/**
 * MarKing 下载 UI 辅助模块
 * 
 * 功能：
 * 1. 处理 Modal 弹窗逻辑
 * 2. 动态获取 Github Release 包列表渲染到对应的平台架构
 * 3. 更新 GitHub 统计数据
 */

class DownloadUI {
    constructor(downloadManager) {
        this.dm = downloadManager;
        this.initialized = false;
        this.releaseData = null;
        this.isEn = document.documentElement.lang === 'en';
    }

    /**
     * 初始化下载 UI
     */
    async init(options = {}) {
        // 设置全局暴露便于 HTML 行内 onclick 调用
        window.DownloadUI_openModal = this.openModal.bind(this);
        window.DownloadUI_instance = this;

        this.modal = document.getElementById('downloadModal');
        if (!this.modal) {
            this.dm.log('Warning: Modal not found in DOM.');
            return;
        }

        this.bindModalEvents();

        // 加载 GitHub 统计数据（复用原有逻辑）
        await this.loadGitHubStats();

        this.initialized = true;
        this.dm.log('下载 Modal UI 初始化完成');
    }

    /**
     * 绑定 Modal 的事件
     */
    bindModalEvents() {
        const closeBtn = document.getElementById('closeDownloadModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // 点击蒙层本身关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // 键盘 Esc 关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // 选项卡切换
        const tabs = this.modal.querySelectorAll('.modal-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const platform = tab.getAttribute('data-platform');
                this.switchTab(platform);
            });
        });
    }

    /**
     * 开启下载 Modal 弹窗
     * @param {string|null} targetPlatform - 'win', 'mac', 'linux' 默认为系统检测
     */
    async openModal(targetPlatform = null) {
        if (!this.modal) return;
        
        document.body.style.overflow = 'hidden'; // 阻止底层滚动
        this.modal.classList.add('active');

        // 检测平台
        let platform = targetPlatform;
        if (!platform) {
            platform = this.detectOS();
        }

        this.switchTab(platform);

        // 如果还没拉取 release 数据，拉取数据
        if (!this.releaseData) {
            await this.fetchAndRenderReleases();
        }
    }

    /**
     * 关闭弹窗
     */
    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * 切换平台 Tab
     * @param {string} platform - 'win', 'mac', 'linux'
     */
    switchTab(platform) {
        if (!['win', 'mac', 'linux'].includes(platform)) platform = 'win';

        // 切换按钮状态
        const tabs = this.modal.querySelectorAll('.modal-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-platform') === platform);
        });

        // 切换面板状态
        const panels = this.modal.querySelectorAll('.modal-panel');
        panels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `panel-${platform}`);
        });
    }

    /**
     * 简单系统检测
     */
    detectOS() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('mac') !== -1) return 'mac';
        if (userAgent.indexOf('linux') !== -1) return 'linux';
        return 'win';
    }

    /**
     * 拉取 Github Release 并渲染列表，同时支持 Cloudflare 智能路由判断
     */
    async fetchAndRenderReleases() {
        try {
            this.showLoading();

            const owner = this.dm.config.githubOwner || 'l06066hb';
            const repo = this.dm.config.githubRepo || 'MarKing';
            
            // 1. 并发请求：从 CF Worker 获取 Release 数据 + CF 路由检测
            //    CF Worker 代理 GitHub API，国内用户不受 GitHub 连通性影响
            const detectedPlatform = this.dm.platform || 'windows';
            const cfReleasesUrl = `${this.dm.config.apiEndpoint}/api/releases?limit=1`;
            const cfUrl = `${this.dm.config.apiEndpoint}/api/download?platform=${detectedPlatform}`;

            const [cfReleasesRes, cfRes] = await Promise.allSettled([
                fetch(cfReleasesUrl, { headers: { 'Accept': 'application/json' } }),
                fetch(cfUrl, { headers: { 'Accept': 'application/json' }, cache: 'no-store' })
            ]);

            let releaseData = null;

            // 2. 优先使用 CF Worker 返回的 Release 数据
            if (cfReleasesRes.status === 'fulfilled' && cfReleasesRes.value.ok) {
                try {
                    const cfData = await cfReleasesRes.value.json();
                    if (cfData.releases && cfData.releases.length > 0) {
                        const latest = cfData.releases[0];
                        // 将 CF 格式映射为 GitHub 兼容格式
                        releaseData = {
                            assets: latest.assets.map(a => ({
                                name: a.name,
                                browser_download_url: a.url,
                                size: a.size_bytes,
                                download_count: a.download_count
                            }))
                        };
                        this.dm.log('从 CF Worker 获取 Release 数据成功');
                    }
                } catch (e) {
                    this.dm.log('解析 CF Release 数据失败', e);
                }
            }

            // 3. CF Worker 失败时，降级到 GitHub API 直连
            if (!releaseData) {
                this.dm.log('CF Worker 未返回有效数据，降级到 GitHub API');
                const repoUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
                const releaseRes = await fetch(repoUrl, {
                    headers: { 'Accept': 'application/vnd.github.v3+json' }
                });
                if (!releaseRes.ok) {
                    throw new Error('Release 数据获取失败（CF Worker 和 GitHub API 均不可用）');
                }
                releaseData = await releaseRes.json();
            }

            // 4. 探测 Cloudflare 路由状态并提取代理策略
            let proxyMode = 'direct'; // 'direct' | 'worker' | 'ghproxy'
            let isProxyEnabled = false;

            if (cfRes.status === 'fulfilled' && cfRes.value.ok) {
                try {
                    const cfData = await cfRes.value.json();
                    if (cfData.proxy || (cfData._debug && cfData._debug.should_use_proxy)) {
                        isProxyEnabled = true;
                        // 检测 CF Worker 代理模式
                        if (cfData.proxy_mode === 'worker_direct') {
                            // CF Worker 直接代理（推荐：无广告、速度快、有统计）
                            proxyMode = 'worker';
                        } else {
                            const cfUrlVal = cfData.url || '';
                            const ghIdx = cfUrlVal.indexOf('https://github.com');
                            if (ghIdx > 0) {
                                // 第三方镜像前缀（如 ghproxy）
                                proxyMode = 'ghproxy';
                            } else {
                                // 默认走 CF Worker 代理
                                proxyMode = 'worker';
                            }
                        }
                    }
                } catch (e) {
                    this.dm.log('解析 CF 代理路由失败', e);
                }
            }

            // Fallback: 手动偏好镜像
            const savedMirror = this.dm.loadMirrorPreference();
            if (savedMirror === 'ghproxy' && !isProxyEnabled) {
                proxyMode = 'ghproxy';
                isProxyEnabled = true;
            }

            this.dm.log(`智能路由检测完毕 - 代理状态: ${isProxyEnabled}, 模式: ${proxyMode}`);

            // 5. 根据代理模式改写下载链接
            const cfApiEndpoint = this.dm.config.apiEndpoint;
            const assets = releaseData.assets.map(asset => {
                asset.original_url = asset.browser_download_url;
                if (isProxyEnabled) {
                    if (proxyMode === 'worker') {
                        // 使用 CF Worker /api/proxy 代理（国内最优，且有下载统计）
                        asset.browser_download_url = `${cfApiEndpoint}/api/proxy?url=${encodeURIComponent(asset.browser_download_url)}`;
                    } else if (proxyMode === 'ghproxy') {
                        // 使用第三方 ghproxy 镜像
                        asset.browser_download_url = 'https://mirror.ghproxy.com/' + asset.browser_download_url;
                    }
                }
                return asset;
            });

            this.releaseData = assets;
            this.renderAssets(assets);
        } catch (err) {
            this.dm.log('获取 Release 数据失败', err);
            this.showError();
        }
    }

    showLoading() {
        // UI 默认是 loading 状态，如果需要重新 loading 则刷新
    }

    showError() {
        const msg = this.isEn ? 'Failed to fetch release data from GitHub.' : '从 GitHub 获取版本数据失败，可能是网络问题。';
        const retry = this.isEn ? 'Try Again' : '重试';
        const html = `
            <div class="dl-error">
                <p>${msg}</p>
                <button class="dl-retry" onclick="window.DownloadUI.prototype.fetchAndRenderReleases.call(window.DownloadUI_instance)">${retry}</button>
            </div>
        `;
        document.getElementById('list-win').innerHTML = html;
        document.getElementById('list-mac').innerHTML = html;
        document.getElementById('list-linux').innerHTML = html;
    }

    /**
     * 渲染各类安装包资产
     */
    renderAssets(assets) {
        if (!assets || assets.length === 0) {
            this.showError();
            return;
        }

        // 分类数组
        const winAssets = [];
        const macAssets = [];
        const linuxAssets = [];

        assets.forEach(asset => {
            const name = asset.name.toLowerCase();
            // Window 解析
            if (name.endsWith('.exe') || name.endsWith('.msi')) {
                winAssets.push(this.formatAsset(asset, 'win'));
            }
            // Mac 解析
            else if (name.endsWith('.dmg')) {
                macAssets.push(this.formatAsset(asset, 'mac'));
            }
            // Linux 解析
            else if (name.endsWith('.appimage') || name.endsWith('.deb') || name.endsWith('.rpm') || (name.endsWith('.tar.gz') && !name.includes('src'))) {
                linuxAssets.push(this.formatAsset(asset, 'linux'));
            }
        });

        // 排序：将推荐版本放前面
        winAssets.sort((a, b) => (b.recommended === a.recommended) ? 0 : b.recommended ? 1 : -1);
        macAssets.sort((a, b) => (b.recommended === a.recommended) ? 0 : b.recommended ? 1 : -1);
        linuxAssets.sort((a, b) => (b.recommended === a.recommended) ? 0 : b.recommended ? 1 : -1);

        // 挂载 DOM
        document.getElementById('list-win').innerHTML = winAssets.map(a => this.createItemHTML(a)).join('');
        document.getElementById('list-mac').innerHTML = macAssets.map(a => this.createItemHTML(a)).join('');
        document.getElementById('list-linux').innerHTML = linuxAssets.map(a => this.createItemHTML(a)).join('');
    }

    formatAsset(asset, os) {
        const size = (asset.size / 1024 / 1024).toFixed(1) + ' MB';
        let title = asset.name;
        let desc = '';
        let recommended = false;

        if (os === 'win') {
            if (asset.name.includes('setup.exe')) {
                title = this.isEn ? 'Windows x64 Installer (exe)' : 'Windows x64 安装程序 (exe)';
                desc = this.isEn ? 'Standard installer for most Windows users' : '标准的 Windows x64 图形安装包（推荐）';
                recommended = true;
            } else if (asset.name.includes('.msi')) {
                title = this.isEn ? 'Windows MSI Package' : 'Windows MSI 安装包';
                desc = this.isEn ? 'For enterprise software deployment' : '适合企业静默部署的安装包';
            }
        } 
        else if (os === 'mac') {
            if (asset.name.includes('aarch64')) {
                title = this.isEn ? 'Apple Silicon (M-Series)' : 'Apple Silicon 芯片版 (M系列)';
                desc = this.isEn ? 'Optimized for Apple ARM chips' : '原生支持 Apple M 系芯片设备（性能最佳）';
                recommended = true;
            } else if (asset.name.includes('x64') || asset.name.includes('amd64')) {
                title = this.isEn ? 'Intel Processor (x64)' : 'Intel 芯片版 (x64)';
                desc = this.isEn ? 'For older Intel-based Macs' : '适用于老款使用 Intel 芯片的 Mac 设备';
            } else if (asset.name.includes('universal')) {
                title = this.isEn ? 'Universal Binary' : '通用二进制版 (Universal)';
                desc = this.isEn ? 'Works on both Apple Silicon and Intel' : '通吃平台版（体积较大）';
            }
        } 
        else if (os === 'linux') {
            if (asset.name.includes('AppImage')) {
                title = this.isEn ? 'Linux AppImage' : 'Linux AppImage (免安装)';
                desc = this.isEn ? 'Runs everywhere, no install required' : '无需安装即可运行的绿色包（推荐）';
                recommended = true;
            } else if (asset.name.includes('deb')) {
                title = this.isEn ? 'Debian/Ubuntu (.deb)' : 'Debian/Ubuntu (.deb)';
                desc = this.isEn ? 'For Debian-based distributions' : 'Debian/Ubuntu 系安装包';
            } else if (asset.name.includes('rpm')) {
                title = this.isEn ? 'Red Hat/Fedora (.rpm)' : 'Red Hat/Fedora (.rpm)';
                desc = this.isEn ? 'For RPM-based distributions' : 'CentOS/Fedora 系安装包';
            } else if (asset.name.includes('tar.gz')) {
                title = this.isEn ? 'Linux Tarball (.tar.gz)' : 'Linux 便携压缩包 (.tar.gz)';
                desc = this.isEn ? 'Compressed binary archive' : '便携式源码包，自行解压运行';
            }
        }

        return {
            name: title,
            desc: desc,
            url: asset.browser_download_url,
            size: size,
            recommended: recommended
        };
    }

    createItemHTML(asset) {
        const tagHTML = asset.recommended 
            ? `<span class="dl-tag recommended">${this.isEn ? 'Recommended' : '推荐'}</span>` 
            : `<span class="dl-tag">${asset.size}</span>`;
            
        return `
            <a href="${asset.url}" class="download-item">
                <div class="dl-info">
                    <span class="dl-name">${asset.name} ${tagHTML}</span>
                    <span class="dl-desc">${asset.desc}</span>
                </div>
                <div class="dl-action">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
            </a>
        `;
    }

    /**
     * 加载并显示 GitHub 统计数据
     */
    async loadGitHubStats() {
        try {
            const stats = await this.dm.getGitHubStats();
            this.updateStatsDisplay(stats);
        } catch (error) {
            this.dm.log('加载统计数据失败:', error);
        }
    }

    /**
     * 更新统计数据显示
     */
    updateStatsDisplay(stats) {
        const starsElement = document.getElementById('github-stars');
        if (starsElement) {
            starsElement.textContent = this.dm.formatNumber(stats.stars);
        }

        const downloadsElement = document.getElementById('total-downloads');
        if (downloadsElement) {
            downloadsElement.textContent = this.dm.formatNumber(stats.downloads);
        }
        this.dm.log('统计数据已更新:', stats);
    }
}

// 导出实例句柄辅助重试函数
if (typeof window !== 'undefined') {
    window.DownloadUI = DownloadUI;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DownloadUI;
}
