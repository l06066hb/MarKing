# MarKing - 专业 Markdown 编辑器

<div align="center">

[English](./README_EN.md) | 简体中文

</div>

<div align="center">

![MarKing Logo](https://img.shields.io/badge/MarKing-v1.2.0-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

[![GitHub release](https://img.shields.io/github/v/release/l06066hb/MarKing?style=flat-square)](https://github.com/l06066hb/MarKing/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/l06066hb/MarKing/total?style=flat-square)](https://github.com/l06066hb/MarKing/releases)
[![GitHub stars](https://img.shields.io/github/stars/l06066hb/MarKing?style=flat-square)](https://github.com/l06066hb/MarKing/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/l06066hb/MarKing?style=flat-square)](https://github.com/l06066hb/MarKing/issues)

**Be the King of Markdown**
 
**一款致力于提供高性能、多平台原生体验的现代 Markdown 编辑器。**
 
基于内联表格编辑器与高度可定制的排版导出引擎（DOCX/PDF），MarKing 旨在无缝衔接技术写作与商务文档交付。采用轻量级底层架构，提供稳定、流畅的高密度文本编辑环境。

[⬇️ 下载安装](#-下载) • [✨ 核心功能](#-核心功能) • [📖 使用文档](docs/FAQ.md) • [🔄 更新日志](CHANGELOG.md) • [💬 社区反馈](https://github.com/l06066hb/MarKing/issues)

</div>

---

## 📸 应用预览

![MarKing 主界面](docs/marking-markdown-editor-main-interface.png)

---

## 📥 下载

> 💡 **系统要求**：Windows 10 (64-bit) 或更高版本

### Windows

提供开箱即用的原生级编辑体验，完美集成至系统底座。

- 📦 **[下载 Windows 稳定版 (MSI & EXE) ➔](https://github.com/l06066hb/MarKing/releases/latest)** 
  - 提供 `MSI 安装器` (支持静默安装与企业统一部署)
  - 提供 `Setup.exe 安装向导` (包含环境集成与资源管理器右键注册)

> 💡 *提示：前往 Release 页面后，请展开 "Assets" 列表获取对应平台的安装包。*

### macOS

提供原生架构级支持，全面兼容各种设备生态。

- 📦 **[下载 macOS 稳定版 (DMG & APP) ➔](https://github.com/l06066hb/MarKing/releases/latest)**
  - 支持旧版 Intel 芯片架构
  - 原生支持 Apple Silicon (M1/M2/M3) 系列芯片，提供极致能效

### Linux

为开发者提供零配置的轻便环境，支持各主流发行版。

- 📦 **[下载 Linux 稳定版 (AppImage/Deb) ➔](https://github.com/l06066hb/MarKing/releases/latest)**

---

## 核心功能

### 桌面原生级沉浸体验

- **原生级无边框设计** - 12px 系统圆角过渡，摒弃冗余的浏览器外框，提供符合操作系统设计规范的原生软件观感。
- **18种内置调色盘** - 精心设计的深色与浅色双色域主题，提供从学术经典到极客暗黑的顶尖色彩方案。
- **紧凑型排版密度** - 缩减组件与视图间距，优化文字排版密度，对标 VS Code 等专业 IDE 的沉浸式阅读空间。
- **物理态微交互** - 抛弃生硬的界面反馈，采用原生柔和的单色透明度变换，每一次点击都清晰利落。

### 专业级核心编辑器

- **高性能底层驱动** - 基于优化的状态机解析算法，大幅提升超大文件的加载速度与滚动帧率，轻松应付十万字级的长期连载。
- **所见即所得的同步反馈** - 对半分栏的高颜值渲染模式，具备防抖优化的双向精准跟随滚动。
- **文档一键自动排版** - 内置全套 Markdown 格式化规则，一键规整标题、列表和图文的空格换行问题。

- **场景化智能补全** - 沉淀超 70 种最常用的文档块语法缩写，在创作过程中实现肌肉记忆般的快速调用。

  *智能文档补全引擎体验：*
  ![全场景代码智能提示](docs/marking-editor-features-preview-completion.png)

- **Mermaid 及全栈渲染支持** - 内置极具设计感的代码图文助手，原生渲染复杂的流程图、时序图、甘特图以及严谨的 KaTeX 标量数学公式。

  *复杂结构化图表渲染演示：*
  ![Mermaid 渲染视图](docs/marking-mermaid-diagram-assistant.png)

### 现代工作流应用组件

- **可视化表格系统** - 降低 Markdown 表格编写的认知成本
  - 触发机制：光标驻留即唤醒顶部独立悬浮编辑器。
  - 数据响应：所见即所得，与底层代码保持实时双向防抖同步。
  - 功能完备：支持列对齐切换、行列增删补以及通过键盘组合键快速跃迁单元格。

  *可视化表格操作演示：*
  ![可视化表格编辑器](docs/marking-visual-table-editor.png)

- **桌面级文件树结构** - 提供更具生产力的本地文件管理逻辑
  - **原生右键生态**：全面接入应用内文件或文件夹的建立、重命名及标准复制、粘贴、剪切。
  - **动态边界布局**：支持鼠标悬停无级拖拽改变侧边栏宽度，灵活应对不同显示器与分屏比例。
  - **纯键盘流支持**：适配完整的快捷键跳转逻辑及文件系统变更操作。

- **多模态纯净粘贴** - 清理内容复制中常常面临的污染干扰
  - 图像直接转存：截图 `Ctrl+V` 将自动落盘本地并转化为标准 MD 引链。
  - 外部图片引用：直接复制电脑文件夹中的独立图片对象进行粘贴转存。
  - 纯净文本模式：剥离剪贴板原本杂乱无章的 HTML 嵌套格式，仅保留标准的文本与 Markdown 属性。

- **列表自动续排系统** - 优化繁琐的格式闭环
  - 按下回车后智能补齐及顺延多级有序列表、符号无序列表以及待办清单。
  - 智能记忆上文缩进梯队，空回车自动完成安全退栈与闭合。

### 强大导出

- **DOCX 专业模板** `(当前功能 Beta 内测中，敬请期待)` - 10+ 配置项，满足各种文档需求
  - 3 个精心设计的预设模板（技术文档、商务报告、通用模板）
  - 无限自定义模板
  - 封面、目录、页眉页脚完整支持
  - 字体、间距、样式精细控制

  *所见即所得的专业 PDF 与 DOCX 导出：*
  ![专业导出功能](docs/marking-export-docx-pdf-feature.png)

- **PDF 高质量输出** - 基于 Pandoc 引擎，专业级输出质量
- **HTML 静态页面** - 完整样式保留，可直接在浏览器打开

### 美观易用

- **18 种精妙主题** - 从护眼素雅到极客赛博，总有一款完美适配你的桌面风格
  - Classic Midnight、Cool Black、Sepia Yellow、Eye Care、GitHub Style、Dracula Night
  - Indigo Purple、Ocean Blue、Forest Green、Rose Pink、Sunset Orange、Monochrome
  - Neon Cyber、Coral Reef、Lavender Dream、Warm Autumn、Cool Winter、Soft Midnight
  
- **亮色/暗色模式** - 全局主题切换，护眼舒适
- **现代化 UI** - Material Design 风格，流畅的交互动画
- **优雅滚动条** - 细腻流畅的交互体验

### 智能管理

- **工作区多库体系 (Multi-vault Sandbox)** - 为职场、学术项目设定物理或逻辑隔离，确保所有核心库数据保持严格独立、互不交叉污染。
  
  *多项目文件管理中枢：*
  ![多项目管理架构排版](docs/marking-multi-vault-management.png)

- **金融级本地数据安全体系** - 我们不信任网络云端，我们将数据自治权交还给用户。
  - **自动热备份防抖追踪**：按 2 秒级间距实行静默落盘策略，配合“近 10 版无感知时光机快照”，让你再也无需因手滑误删或断电而悔恨。
  - **全局冷备份转储**：内置功能极其硬核的离线大满贯备份系统，随时允许一键全量导出为加密压缩包。

  *独立强大的容灾备份中心：*
  ![精美备份交互组件](docs/marking-smart-backup-system.png)

- **极速全局检索核心** - 由底座并行的 Rust 检索引擎驱动，即使横跨海量历史归档区，字符匹配及定位仍旧能在毫秒内极速反馈。
- **集中化多媒体附件仓** - 重塑静态资源的维护成本，支持直接拖拽图片及多媒体对象进入编辑区，底层自动拦截、计算转存并统一分发于内置资源池，彻底终结媒体链接丢失痛点。

### 国际化支持

- **完整双语界面** - 中文/English 一键切换，覆盖所有功能模块
- **类型安全翻译** - TypeScript 类型检查，确保翻译准确
- **实时切换** - 语言切换无需重启，即时生效

---

## 适用场景

| 场景 | 应用 |
|------|------|
| **技术文档** | API 文档、开发手册、技术博客 |
| **学术写作** | 论文、报告、笔记（支持数学公式 KaTeX） |
| **项目管理** | 需求文档、设计文档、会议记录 |
| **知识管理** | 个人笔记、知识库、学习资料 |
| **内容创作** | 博客文章、教程、电子书 |

---

## 快速开始

### 1. 安装应用
下载对应平台的安装包，按照向导完成安装

### 2. 创建文档
点击工具栏 `+` 按钮或按 `Ctrl+N` 创建新文档

### 3. 开始编辑
- 左侧编辑器输入 Markdown
- 右侧实时预览效果
- 使用代码片段快速插入常用内容

### 4. 导出文档
点击工具栏"导出"按钮，选择格式（DOCX/PDF/HTML）

> 📚 **更多使用技巧**：查看 [常见问题](docs/FAQ.md) 和 [故障排除](docs/TROUBLESHOOTING.md)

---

## 为什么选择 MarKing？

### 性能卓越
- 启动时间 < 0.5 秒
- 安装包约 40MB（已包含完整 Pandoc）
- 运行内存约 30-40MB

### 体验优秀
- 现代化界面设计
- 流畅的交互动画
- 完善的快捷键支持（按 `?` 查看所有快捷键）

### 数据安全
- 本地存储，保护隐私
- 自动保存，防止丢失
- 版本快照，随时恢复
- 数据备份，安心使用
- 完整日志记录，便于问题排查

---

## 常用快捷键

| 操作 | Windows/Linux | macOS |
|------|---------------|-------|
| 新建文档 | `Ctrl+N` | `Cmd+N` |
| 保存文档 | `Ctrl+S` | `Cmd+S` |
| 全局搜索 | `Ctrl+F` | `Cmd+F` |
| 格式化文档 | `Shift+Alt+F` | `Shift+Option+F` |
| 表格编辑器 | `Ctrl+Shift+T` | `Cmd+Shift+T` |
| 快捷键帮助 | `?` | `?` |

> 完整快捷键列表：在应用中按 `?` 键查看

---

## 📄 版权声明

Copyright © 2025-2026 MarKing. All rights reserved.

本软件为专有软件，受版权法和国际条约保护。未经授权，不得复制、修改、分发或反向工程。

详见 [LICENSE](LICENSE) 文件。

### 声明

MarKing 为本软件的名称。未经授权，不得用于商业用途或暗示官方背书。

---

## 相关链接

- 📥 [下载安装](https://github.com/l06066hb/MarKing/releases) - 获取最新版本
- 🌐 [官方网站](https://markingmd.com) - 在线体验和文档
- 📝 [更新日志](CHANGELOG.md) - 查看版本历史
- 📚 [常见问题](docs/FAQ.md) - 使用技巧和问题解答
- 🔧 [故障排除](docs/TROUBLESHOOTING.md) - 解决常见问题

---

## 获取帮助

我们提供多种支持渠道，帮助您解决使用中的问题：

- 🐛 **问题反馈** - [GitHub Issues](https://github.com/l06066hb/MarKing/issues)
  - Bug 报告：[提交 Bug](https://github.com/l06066hb/MarKing/issues/new?template=bug_report.md)
  - 功能建议：[提交建议](https://github.com/l06066hb/MarKing/issues/new?template=feature_request.md)
  
- 💬 **讨论交流** - [GitHub Discussions](https://github.com/l06066hb/MarKing/discussions)
  - 使用问题咨询
  - 经验分享交流
  
- 🔒 **安全问题** - 请查看 [SECURITY.md](SECURITY.md)

- 📖 **使用文档**
  - [常见问题解答](docs/FAQ.md)
  - [故障排除指南](docs/TROUBLESHOOTING.md)

---

## 可持续发展与赞助 (Backers)

如果您认可 MarKing 的产品哲学，并希望它能保持长期的纯净无广告体验以及持续的迭代，考虑成为我们的 Backer 吧！

您的每一份支持都将作为“基石”，直接用于维持基础服务器/官网开销、代码签名证书以及核心底层引擎的研发。

- ⚡ **[爱发电 (Afdian.net) ➔](https://afdian.com/a/l06066hb)** - 国内用户推荐（支持微信/支付宝）
- 🌍 **[Ko-fi ➔](https://ko-fi.com/l06066hb)** - 国际用户推荐（支持 Visa/PayPal）

> 💡 *在浩瀚的开源世界里存活不易，感谢每一份为信仰充值的力量！如果你觉得项目不错，也请在右上角点亮 ⭐️ Star，这是对独立开发者最大的肯定。*

---

<div align="center">

**Be the King of Markdown!**

MarKing v1.2.0 | 让文档创作更高效

[⬆️ 回到顶部](#marKing---专业-markdown-编辑器)

</div>
