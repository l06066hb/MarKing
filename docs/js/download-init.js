/**
 * MarKing 下载系统初始化脚本
 * 
 * 在页面加载完成后自动初始化下载管理器和 UI
 */

(function() {
    'use strict';

    // 从全局配置读取，如果没有则使用默认值
    const CONFIG = window.MARKING_DOWNLOAD_CONFIG || {
        apiEndpoint: 'https://marking-download-api.l06066hb.workers.dev',
        githubOwner: 'l06066hb',
        githubRepo: 'MarKing',
        debug: false,
        downloadButtonSelector: '.platform-card .btn-primary',
        statsContainerSelector: '.github-stats',
        enableToast: true
    };

    /**
     * 初始化下载系统
     */
    async function initDownloadSystem() {
        try {
            console.log('[MarKing] 初始化下载系统...');

            // 检查依赖是否加载
            if (typeof DownloadManager === 'undefined') {
                console.error('[MarKing] DownloadManager 未加载');
                return;
            }

            if (typeof DownloadUI === 'undefined') {
                console.error('[MarKing] DownloadUI 未加载');
                return;
            }

            // 创建下载管理器实例
            const downloadManager = new DownloadManager({
                apiEndpoint: CONFIG.apiEndpoint,
                githubOwner: CONFIG.githubOwner,
                githubRepo: CONFIG.githubRepo,
                debug: CONFIG.debug
            });

            // 创建 UI 实例
            const downloadUI = new DownloadUI(downloadManager);

            // 初始化 UI
            await downloadUI.init({
                downloadButtonSelector: CONFIG.downloadButtonSelector,
                statsContainerSelector: CONFIG.statsContainerSelector,
                enableToast: CONFIG.enableToast
            });

            console.log('[MarKing] 下载系统初始化完成');

            // 将实例挂载到全局对象，方便调试和外部访问
            window.markingDownload = {
                manager: downloadManager,
                ui: downloadUI
            };

        } catch (error) {
            console.error('[MarKing] 下载系统初始化失败:', error);
        }
    }

    /**
     * 等待 DOM 加载完成
     */
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // 页面加载完成后初始化
    ready(initDownloadSystem);

})();
