/**
 * MarKing 智能下载管理器
 * 
 * 功能：
 * 1. 自动检测用户平台（Windows/macOS/Linux）
 * 2. 调用 Cloudflare Workers API 获取最优下载链接
 * 3. 支持手动镜像源切换
 * 4. 显示下载状态和进度提示
 * 5. 错误处理和降级策略
 */

class DownloadManager {
    constructor(config = {}) {
        // 配置项
        this.config = {
            // Cloudflare Workers API 端点（使用自定义域名）
            apiEndpoint: config.apiEndpoint || 'https://api.markingmd.com',
            // GitHub 仓库信息
            githubOwner: config.githubOwner || 'l06066hb',
            githubRepo: config.githubRepo || 'MarKing',
            // 缓存时间（毫秒）
            cacheTTL: config.cacheTTL || 5 * 60 * 1000, // 5分钟
            // 是否启用调试日志
            debug: config.debug || false
        };

        // 镜像源列表
        this.mirrors = [
            {
                id: 'github',
                name: 'GitHub 官方',
                nameEn: 'GitHub Official',
                region: '全球',
                regionEn: 'Global',
                speed: '国外快速',
                speedEn: 'Fast Overseas'
            },
            {
                id: 'ghproxy',
                name: 'GHProxy 镜像',
                nameEn: 'GHProxy Mirror',
                region: '中国大陆',
                regionEn: 'China Mainland',
                speed: '国内快速',
                speedEn: 'Fast in China'
            }
        ];

        // 当前选择的镜像源（从 localStorage 读取）
        this.selectedMirror = this.loadMirrorPreference();

        // 缓存的 Release 信息
        this.cachedRelease = null;
        this.cacheTimestamp = null;

        // 初始化
        this.init();
    }

    /**
     * 初始化下载管理器
     */
    init() {
        this.log('下载管理器初始化');
        
        // 检测用户平台
        this.platform = this.detectPlatform();
        this.log('检测到平台:', this.platform);

        // 检测语言
        this.language = this.detectLanguage();
        this.log('检测到语言:', this.language);
    }

    /**
     * 检测用户操作系统平台
     * @returns {string} 'windows' | 'macos' | 'linux' | 'unknown'
     */
    detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();

        if (userAgent.includes('win') || platform.includes('win')) {
            return 'windows';
        } else if (userAgent.includes('mac') || platform.includes('mac')) {
            return 'macos';
        } else if (userAgent.includes('linux') || platform.includes('linux')) {
            return 'linux';
        }

        return 'unknown';
    }

    /**
     * 检测用户语言
     * @returns {string} 'zh' | 'en'
     */
    detectLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        return lang.startsWith('zh') ? 'zh' : 'en';
    }

    /**
     * 获取翻译文本
     * @param {string} key - 翻译键
     * @returns {string} 翻译后的文本
     */
    t(key) {
        const translations = {
            zh: {
                'download.preparing': '正在准备下载...',
                'download.started': '下载已开始',
                'download.failed': '下载失败',
                'download.retry': '重试',
                'download.fallback': '使用备用下载',
                'error.network': '网络连接失败，请检查网络设置',
                'error.notFound': '未找到适合您系统的安装包',
                'error.api': '无法获取下载信息',
                'platform.windows': 'Windows',
                'platform.macos': 'macOS',
                'platform.linux': 'Linux',
                'mirror.using': '使用',
                'mirror.speed': '下载速度'
            },
            en: {
                'download.preparing': 'Preparing download...',
                'download.started': 'Download started',
                'download.failed': 'Download failed',
                'download.retry': 'Retry',
                'download.fallback': 'Use fallback download',
                'error.network': 'Network connection failed, please check your network',
                'error.notFound': 'Installation package not found for your system',
                'error.api': 'Unable to get download information',
                'platform.windows': 'Windows',
                'platform.macos': 'macOS',
                'platform.linux': 'Linux',
                'mirror.using': 'Using',
                'mirror.speed': 'Download speed'
            }
        };

        return translations[this.language]?.[key] || key;
    }

    /**
     * 从 localStorage 加载镜像源偏好
     * @returns {string|null} 镜像源 ID
     */
    loadMirrorPreference() {
        try {
            return localStorage.getItem('marking_mirror_preference');
        } catch (e) {
            this.log('无法读取 localStorage:', e);
            return null;
        }
    }

    /**
     * 保存镜像源偏好到 localStorage
     * @param {string} mirrorId - 镜像源 ID
     */
    saveMirrorPreference(mirrorId) {
        try {
            localStorage.setItem('marking_mirror_preference', mirrorId);
            this.selectedMirror = mirrorId;
            this.log('已保存镜像源偏好:', mirrorId);
        } catch (e) {
            this.log('无法保存到 localStorage:', e);
        }
    }

    /**
     * 获取最新 Release 信息
     * @param {boolean} forceRefresh - 是否强制刷新缓存
     * @returns {Promise<Object>} Release 信息
     */
    async getLatestRelease(forceRefresh = false) {
        // 检查缓存
        if (!forceRefresh && this.cachedRelease && this.cacheTimestamp) {
            const age = Date.now() - this.cacheTimestamp;
            if (age < this.config.cacheTTL) {
                this.log('使用缓存的 Release 信息');
                return this.cachedRelease;
            }
        }

        try {
            this.log('从 API 获取 Release 信息');
            
            // 调用 Cloudflare Workers API
            const response = await fetch(
                `${this.config.apiEndpoint}/api/download?platform=${this.platform}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`API 请求失败: ${response.status}`);
            }

            const data = await response.json();
            
            // 缓存结果
            this.cachedRelease = data;
            this.cacheTimestamp = Date.now();
            
            this.log('获取到 Release 信息:', data);
            return data;

        } catch (error) {
            this.log('API 请求失败，尝试降级到 GitHub API:', error);
            
            // 降级：直接调用 GitHub API
            return await this.fallbackToGitHubAPI();
        }
    }

    /**
     * 降级方案：直接调用 GitHub API
     * @returns {Promise<Object>} Release 信息
     */
    async fallbackToGitHubAPI() {
        try {
            const apiUrl = `https://api.github.com/repos/${this.config.githubOwner}/${this.config.githubRepo}/releases/latest`;
            
            const response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API 请求失败: ${response.status}`);
            }

            const release = await response.json();
            
            // 查找对应平台的文件
            const asset = this.findAssetForPlatform(release.assets, this.platform);
            
            if (!asset) {
                throw new Error('未找到适合当前平台的安装包');
            }

            // 转换为统一格式
            return {
                url: asset.browser_download_url,
                filename: asset.name,
                version: release.tag_name,
                size: this.formatBytes(asset.size),
                size_bytes: asset.size,
                mirror: false,
                mirror_source: null,
                download_count: asset.download_count,
                published_at: release.published_at
            };

        } catch (error) {
            this.log('GitHub API 降级也失败:', error);
            throw new Error(this.t('error.api'));
        }
    }

    /**
     * 查找平台对应的安装包
     * @param {Array} assets - GitHub Release assets
     * @param {string} platform - 平台名称
     * @returns {Object|null} 匹配的 asset
     */
    findAssetForPlatform(assets, platform) {
        const patterns = {
            windows: /\.(exe|msi)$/i,
            macos: /\.(dmg|pkg)$/i,
            linux: /\.(AppImage|deb|rpm|tar\.gz)$/i
        };

        const pattern = patterns[platform];
        if (!pattern) return null;

        return assets.find(asset => {
            const name = asset.name.toLowerCase();
            return pattern.test(name) && !name.includes('debug') && !name.includes('symbols');
        });
    }

    /**
     * 开始下载
     * @param {Object} options - 下载选项
     * @returns {Promise<void>}
     */
    async startDownload(options = {}) {
        const {
            onProgress = null,
            onSuccess = null,
            onError = null
        } = options;

        try {
            // 显示准备中状态
            if (onProgress) {
                onProgress({ status: 'preparing', message: this.t('download.preparing') });
            }

            // 获取下载信息
            const releaseInfo = await this.getLatestRelease();
            
            // 触发浏览器下载
            this.log('开始下载:', releaseInfo.url);
            
            // 创建隐藏的下载链接
            const link = document.createElement('a');
            link.href = releaseInfo.url;
            link.download = releaseInfo.filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 显示成功状态
            if (onSuccess) {
                onSuccess({
                    status: 'started',
                    message: this.t('download.started'),
                    releaseInfo
                });
            }

        } catch (error) {
            this.log('下载失败:', error);
            
            if (onError) {
                onError({
                    status: 'failed',
                    message: error.message || this.t('download.failed'),
                    error
                });
            }
        }
    }

    /**
     * 获取 GitHub 统计数据
     * @returns {Promise<Object>} 统计数据
     */
    async getGitHubStats() {
        try {
            // 获取仓库信息
            const repoResponse = await fetch(
                `https://api.github.com/repos/${this.config.githubOwner}/${this.config.githubRepo}`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (!repoResponse.ok) {
                throw new Error('无法获取仓库信息');
            }

            const repoData = await repoResponse.json();

            // 获取所有 Releases 的下载量
            const releasesResponse = await fetch(
                `https://api.github.com/repos/${this.config.githubOwner}/${this.config.githubRepo}/releases`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            let totalDownloads = 0;
            if (releasesResponse.ok) {
                const releases = await releasesResponse.json();
                totalDownloads = releases.reduce((total, release) => {
                    return total + release.assets.reduce((sum, asset) => sum + asset.download_count, 0);
                }, 0);
            }

            return {
                stars: repoData.stargazers_count,
                downloads: totalDownloads,
                forks: repoData.forks_count,
                watchers: repoData.watchers_count
            };

        } catch (error) {
            this.log('获取 GitHub 统计失败:', error);
            return {
                stars: 0,
                downloads: 0,
                forks: 0,
                watchers: 0
            };
        }
    }

    /**
     * 格式化字节数
     * @param {number} bytes - 字节数
     * @returns {string} 格式化后的字符串
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * 格式化数字（添加千位分隔符）
     * @param {number} num - 数字
     * @returns {string} 格式化后的字符串
     */
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    /**
     * 获取降级下载链接（直接跳转到 GitHub Release 页面）
     * @returns {string} GitHub Release 页面 URL
     */
    getFallbackUrl() {
        return `https://github.com/${this.config.githubOwner}/${this.config.githubRepo}/releases/latest`;
    }

    /**
     * 调试日志
     * @param {...any} args - 日志参数
     */
    log(...args) {
        if (this.config.debug) {
            console.log('[DownloadManager]', ...args);
        }
    }
}

// 导出为全局变量（用于 HTML 页面）
if (typeof window !== 'undefined') {
    window.DownloadManager = DownloadManager;
}

// 导出为模块（用于现代构建工具）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DownloadManager;
}
