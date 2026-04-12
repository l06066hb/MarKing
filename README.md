<div align="center">

# MarKing

**干净、极速的跨平台 Markdown 编辑器**

[English](./README_EN.md) | 简体中文

<br>

![MarKing-v1.2.1](https://img.shields.io/badge/MarKing-v1.2.1-2563eb?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-1e293b?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-dc2626?style=for-the-badge)

[![Downloads](https://img.shields.io/github/downloads/l06066hb/MarKing/total?style=flat-square&color=2563eb)](https://github.com/l06066hb/MarKing/releases)
[![Stars](https://img.shields.io/github/stars/l06066hb/MarKing?style=flat-square&color=eab308)](https://github.com/l06066hb/MarKing/stargazers)

<br>

MarKing 是一款致力于原生性能与极致稳定性的桌面端 Markdown 编辑器。  
本地优先、零追踪、无广告 — 在提供顺滑书写体验的同时，为未来的多端同步奠定坚实底层基础。

<br>

<img src="docs/marking-markdown-editor-main-interface.png" alt="MarKing 主界面 - 专业的 Markdown 编辑环境" width="800">

</div>

---

## 下载安装

提供开箱即用的桌面客户端，所有平台均为原生编译，无需额外运行时。

| 平台 | 架构 | 安装包 |
|:---:|:---:|:---:|
| **Windows** | x64 | [EXE / MSI](https://github.com/l06066hb/MarKing/releases/latest) |
| **macOS** | Apple Silicon / Intel | [DMG](https://github.com/l06066hb/MarKing/releases/latest) |
| **Linux** | x64 / ARM64 | [AppImage / Deb / RPM](https://github.com/l06066hb/MarKing/releases/latest) |

> 前往 [Releases](https://github.com/l06066hb/MarKing/releases/latest) 页面的 **Assets** 列表获取对应平台的最新安装包。

---

## 核心功能

### 1. 性能优先的双模式架构

*   **极速轻量模式**  
    专为快速阅读和轻度编辑打造。去除侧边栏等额外组件后，双击任意 `.md` 文件即可以极低内存占用瞬间打开。

    <img src="docs/marking-lightweight-mode.png" alt="MarKing 极速轻量阅读模式" width="800">

*   **全功能专业编辑器**  
    底层基于深度定制的 Monaco 引擎，支持十万字以上的超大型文件流畅滚动。内置 70+ 种 Markdown 智能代码片段与上下文提示。

    <img src="docs/marking-editor-features-preview-completion.png" alt="MarKing 编辑器 - 智能补全与代码片段" width="800">

### 2. 创作与交互

*   **MathLive 公式编辑器** `NEW`  
    集成可视化数学公式编辑器，支持行内与块级公式的所见即所得编辑。内置虚拟数学键盘，导出采用 MathML 方案实现完全离线渲染，无需手写 LaTeX。

    <img src="docs/marking-mathlive-formula-editor.png" alt="MarKing MathLive 公式编辑器 - 可视化数学公式编辑" width="800">

*   **Excalidraw 手绘白板** `NEW`  
    在文档中嵌入自由绘制的流程图、架构草图与示意图。以手绘风格激发创意表达，让技术文档不再枯燥。

    <img src="docs/marking-excalidraw-whiteboard.png" alt="MarKing Excalidraw 手绘白板 - 自由绘制流程图与示意图" width="800">

*   **可视化表格编辑器**  
    在应用内悬浮编辑 Markdown 表格，彻底告别字符对齐的烦恼。支持类似 Excel 的行列拖拽、增删及内容对齐。

    <img src="docs/marking-visual-table-editor.png" alt="MarKing 可视化表格编辑器" width="800">

*   **Mermaid 图表助手**  
    内置专业的 Mermaid 绘图渲染支持。流程图、时序图、架构图均可通过助手系统实时预检与可视化渲染。

    <img src="docs/marking-mermaid-diagram-assistant.png" alt="MarKing Mermaid 图表编写助手" width="800">

*   **双域主题与代码块高亮**  
    12px 无边框沉浸界面。全局深浅色主题之外，独立内置多套经典代码块预设主题（Dracula、Nord、Tokyo Night 等），极致代码高亮体验。

    <img src="docs/marking-code-theme-settings.png" alt="MarKing 代码高亮主题设置" width="800">

### 3. 安全可靠的本地数据

*   **本地多库管理 (Multi-Vault)**  
    在应用内物理隔离不同文档库。个人日记与工作文档完全独立存放，零检索干扰。

    <img src="docs/marking-multi-vault-management.png" alt="MarKing 多库管理" width="800">

*   **自动防抖保存与历史快照**  
    2 秒静默自动保存 + 历史快照回溯，防止误操作或断电丢失数据。

    <img src="docs/marking-smart-backup-system.png" alt="MarKing 智能备份系统" width="800">

*   **剪贴板图片本地转存**  
    `Ctrl+V` 粘贴截图即自动保存至本地附件目录，并转为正确的相对引用链接。

### 4. 专业文档导出

*   **DOCX 模板化导出引擎 v2.0** `NEW`  
    全新模板化配置架构，支持实时排版预览、精细字体与间距控制。内置多套专业排版模板，一键生成含封面页、目录、页眉页脚的正式汇报文档。

    <img src="docs/marking-docx-export-v2-template.png" alt="MarKing DOCX 导出 v2.0 - 模板化排版引擎" width="800">

*   **PDF 与 HTML 导出**  
    导出含书签目录的高质量 PDF，或将文档及排版导出为独立 HTML 页面以便离线分享。

    <img src="docs/marking-export-docx-pdf-feature.png" alt="MarKing 多格式文档导出" width="800">

---

## 帮助文档

*   [常见问题解答 (FAQ)](docs/FAQ.md)
*   [特性更新与版本历史](CHANGELOG.md)
*   [安全提报与策略须知](SECURITY.md)

---

## 支持独立开发

维持一款纯本地化、零追踪、无广告的跨平台独立软件运转并不容易。  
如果您认可 MarKing 的质量并期待后续的跨端同步功能，请考虑成为早期赞助者：

*   **国内** — [爱发电](https://afdian.com/a/l06066hb) (微信 / 支付宝)
*   **国际** — [Ko-fi](https://ko-fi.com/l06066hb) (Visa / PayPal)

> 如果这款工具切实提高了你的写作效率，只需在页面上方点亮一个 **⭐ Star** — 这便是对独立开发者最纯粹的支持。

---

*Copyright © 2025-2026 MarKing. All rights reserved.*
