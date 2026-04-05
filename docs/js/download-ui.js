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
            
            // 1. 并发请求：获取完整的 GitHub Release 资产列表 和 CF 路由检测
            const detectedPlatform = this.dm.platform || 'windows';
            const repoUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
            const cfUrl = `${this.dm.config.apiEndpoint}/api/download?platform=${detectedPlatform}`;

            const [releaseRes, cfRes] = await Promise.allSettled([
                fetch(repoUrl, { headers: { 'Accept': 'application/vnd.github.v3+json' } }),
                fetch(cfUrl, { headers: { 'Accept': 'application/json' }, cache: 'no-store' })
            ]);

            if (releaseRes.status !== 'fulfilled' || !releaseRes.value.ok) {
                throw new Error('Github API 请求失败');
            }
            const releaseData = await releaseRes.value.json();

            // 2. 探测 Cloudflare 路由状态并提取 Proxy 前缀
            let proxyPrefix = '';
            let isProxyEnabled = false;

            if (cfRes.status === 'fulfilled' && cfRes.value.ok) {
                try {
                    const cfData = await cfRes.value.json();
                    if (cfData.proxy || (cfData._debug && cfData._debug.should_use_proxy)) {
                        isProxyEnabled = true;
                        const cfUrlVal = cfData.url || '';
                        const ghIdx = cfUrlVal.indexOf('https://github.com');
                        if (ghIdx > 0) {
                            // 典型代理：提取类似 "https://mirror.ghproxy.com/" 的前缀
                            proxyPrefix = cfUrlVal.substring(0, ghIdx);
                        } else if (!cfUrlVal.includes('github.com')) {
                            // 备选逻辑：如果 CF 完全重写了域名，我们默认使用常用的国内开源代理保证联通
                            proxyPrefix = 'https://mirror.ghproxy.com/';
                        }
                    }
                } catch (e) {
                    this.dm.log('解析 CF 代理路由失败', e);
                }
            }

            // Fallback: 如果网络环境看起来较差或处在特殊网络下，且 CF 没有返回代理信息，可以强行设置偏好镜像
            const savedMirror = this.dm.loadMirrorPreference();
            if (savedMirror === 'ghproxy' && !proxyPrefix) {
                proxyPrefix = 'https://mirror.ghproxy.com/';
                isProxyEnabled = true;
            }

            this.dm.log(`智能路由检测完毕 - 代理状态: ${isProxyEnabled}, 前缀: ${proxyPrefix || '直连'}`);

            // 3. 将代理前缀应用到所有下载资源
            const assets = releaseData.assets.map(asset => {
                asset.original_url = asset.browser_download_url;
                if (isProxyEnabled && proxyPrefix) {
                    // 如果已经是完整的 https://github.com/ 前缀，直接拼接
                    asset.browser_download_url = proxyPrefix + asset.browser_download_url;
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
                title = this.isEn ? 'Apple Silicon (M1/M2/M3)' : 'Apple Silicon 芯片版 (M1/M2/M3)';
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
