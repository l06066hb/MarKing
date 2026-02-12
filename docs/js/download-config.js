/**
 * MarKing 下载系统配置文件
 */

window.MARKING_DOWNLOAD_CONFIG = {
    // Cloudflare Workers API 端点
    apiEndpoint: 'https://marking-download-api.l06066hb.workers.dev',
    
    // GitHub 仓库配置
    githubOwner: 'l06066hb',
    githubRepo: 'MarKing',
    
    // 功能开关
    debug: false,
    enableToast: true,
    
    // UI 配置
    downloadButtonSelector: '.btn-primary, [href="#download"]',
    statsContainerSelector: '.github-stats',
    
    // 缓存配置（5分钟）
    cacheTTL: 5 * 60 * 1000
};
