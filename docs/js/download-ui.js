/**
 * MarKing 下载 UI 辅助模块
 * 
 * 功能：
 * 1. 处理下载按钮点击事件
 * 2. 显示下载状态提示
 * 3. 更新 GitHub 统计数据
 * 4. 处理错误和降级
 */

class DownloadUI {
    constructor(downloadManager) {
        this.dm = downloadManager;
        this.initialized = false;
    }

    /**
     * 初始化下载 UI
     * @param {Object} options - 配置选项
     */
    async init(options = {}) {
        const {
            downloadButtonSelector = '.btn-primary',
            statsContainerSelector = '.github-stats',
            enableToast = true
        } = options;

        this.downloadButtonSelector = downloadButtonSelector;
        this.statsContainerSelector = statsContainerSelector;
        this.enableToast = enableToast;

        // 绑定下载按钮事件
        this.bindDownloadButtons();

        // 加载 GitHub 统计数据
        await this.loadGitHubStats();

        this.initialized = true;
        this.dm.log('下载 UI 初始化完成');
    }

    /**
     * 绑定下载按钮点击事件
     */
    bindDownloadButtons() {
        const buttons = document.querySelectorAll(this.downloadButtonSelector);
        
        buttons.forEach(button => {
            // 检查是否是下载按钮（通过 href 或文本判断）
            const href = button.getAttribute('href');
            const text = button.textContent;
            
            if (href === '#download' || text.includes('下载') || text.includes('Download')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleDownloadClick(button);
                });
                
                this.dm.log('已绑定下载按钮:', button);
            }
        });
    }

    /**
     * 处理下载按钮点击
     * @param {HTMLElement} button - 按钮元素
     */
    async handleDownloadClick(button) {
        // 防止重复点击
        if (button.disabled) return;
        
        // 禁用按钮
        button.disabled = true;
        const originalText = button.innerHTML;
        
        try {
            // 显示加载状态
            this.updateButtonState(button, 'loading');
            
            // 开始下载
            await this.dm.startDownload({
                onProgress: (progress) => {
                    this.dm.log('下载进度:', progress);
                },
                onSuccess: (result) => {
                    this.dm.log('下载成功:', result);
                    this.updateButtonState(button, 'success');
                    
                    if (this.enableToast) {
                        this.showToast('success', result.message);
                    }
                    
                    // 2秒后恢复按钮状态
                    setTimeout(() => {
                        button.disabled = false;
                        button.innerHTML = originalText;
                    }, 2000);
                },
                onError: (error) => {
                    this.dm.log('下载失败:', error);
                    this.updateButtonState(button, 'error');
                    
                    if (this.enableToast) {
                        this.showToast('error', error.message, {
                            action: {
                                text: this.dm.t('download.fallback'),
                                onClick: () => {
                                    window.open(this.dm.getFallbackUrl(), '_blank', 'noopener,noreferrer');
                                }
                            }
                        });
                    }
                    
                    // 2秒后恢复按钮状态
                    setTimeout(() => {
                        button.disabled = false;
                        button.innerHTML = originalText;
                    }, 2000);
                }
            });
            
        } catch (error) {
            this.dm.log('下载异常:', error);
            button.disabled = false;
            button.innerHTML = originalText;
            
            if (this.enableToast) {
                this.showToast('error', this.dm.t('download.failed'));
            }
        }
    }

    /**
     * 更新按钮状态
     * @param {HTMLElement} button - 按钮元素
     * @param {string} state - 状态：'loading' | 'success' | 'error'
     */
    updateButtonState(button, state) {
        const states = {
            loading: {
                icon: `<svg class="btn-icon animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>`,
                text: this.dm.t('download.preparing')
            },
            success: {
                icon: `<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7" />
                </svg>`,
                text: this.dm.t('download.started')
            },
            error: {
                icon: `<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>`,
                text: this.dm.t('download.failed')
            }
        };

        const stateConfig = states[state];
        if (stateConfig) {
            button.innerHTML = `${stateConfig.icon}<span>${stateConfig.text}</span>`;
        }
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
     * @param {Object} stats - 统计数据
     */
    updateStatsDisplay(stats) {
        // 更新 Stars
        const starsElement = document.getElementById('github-stars');
        if (starsElement) {
            starsElement.textContent = this.dm.formatNumber(stats.stars);
            this.animateNumber(starsElement, stats.stars);
        }

        // 更新下载量
        const downloadsElement = document.getElementById('total-downloads');
        if (downloadsElement) {
            downloadsElement.textContent = this.dm.formatNumber(stats.downloads);
            this.animateNumber(downloadsElement, stats.downloads);
        }

        this.dm.log('统计数据已更新:', stats);
    }

    /**
     * 数字动画效果
     * @param {HTMLElement} element - 目标元素
     * @param {number} targetValue - 目标值
     */
    animateNumber(element, targetValue) {
        const duration = 1000; // 动画时长（毫秒）
        const startValue = 0;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数
            const easeOutQuad = progress * (2 - progress);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuad);
            
            element.textContent = this.dm.formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = this.dm.formatNumber(targetValue);
            }
        };

        animate();
    }

    /**
     * 显示 Toast 提示
     * @param {string} type - 类型：'success' | 'error' | 'info'
     * @param {string} message - 消息内容
     * @param {Object} options - 额外选项
     */
    showToast(type, message, options = {}) {
        const {
            duration = 3000,
            action = null
        } = options;

        // 创建 Toast 容器（如果不存在）
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }

        // 创建 Toast 元素
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: white;
            border-radius: 0.75rem;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 300px;
            max-width: 500px;
            pointer-events: auto;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        `;

        // 图标
        const icons = {
            success: `<svg width="24" height="24" fill="none" stroke="#10b981" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>`,
            error: `<svg width="24" height="24" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>`,
            info: `<svg width="24" height="24" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`
        };

        toast.innerHTML = `
            <div style="flex-shrink: 0;">${icons[type]}</div>
            <div style="flex: 1; color: #0f172a; font-size: 0.9375rem;">${message}</div>
            ${action ? `<button class="toast-action" style="
                background: transparent;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                padding: 0.375rem 0.75rem;
                font-size: 0.875rem;
                color: #3b82f6;
                cursor: pointer;
                transition: all 0.2s;
            ">${action.text}</button>` : ''}
            <button class="toast-close" style="
                background: transparent;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                padding: 0.25rem;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;

        // 添加动画样式
        if (!document.getElementById('toast-animations')) {
            const style = document.createElement('style');
            style.id = 'toast-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
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
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                .toast-action:hover {
                    background: #f1f5f9 !important;
                    border-color: #3b82f6 !important;
                }
                .toast-close:hover {
                    color: #0f172a !important;
                }
            `;
            document.head.appendChild(style);
        }

        // 关闭功能
        const closeToast = () => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                container.removeChild(toast);
                if (container.children.length === 0) {
                    document.body.removeChild(container);
                }
            }, 300);
        };

        // 绑定关闭按钮
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', closeToast);

        // 绑定操作按钮
        if (action) {
            const actionBtn = toast.querySelector('.toast-action');
            actionBtn.addEventListener('click', () => {
                action.onClick();
                closeToast();
            });
        }

        // 添加到容器
        container.appendChild(toast);

        // 自动关闭
        if (duration > 0) {
            setTimeout(closeToast, duration);
        }
    }
}

// 导出为全局变量
if (typeof window !== 'undefined') {
    window.DownloadUI = DownloadUI;
}

// 导出为模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DownloadUI;
}
