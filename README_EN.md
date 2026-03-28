# MarKing - Professional Markdown Editor

<div align="center">

English | [简体中文](./README.md)

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
 
**A modern, high-performance, and cross-platform Markdown editor designed for native desktop experiences.**
 
Featuring an inline table editor and highly customizable formatting engines for DOCX and PDF exports, MarKing seamlessly connects technical writing with professional business delivery. Built on a lightweight architecture, it provides a stable and fluid environment for high-density reading and writing.

[⬇️ Download](#-download) • [✨ Features](#-core-features) • [📖 Documentation](docs/FAQ.md) • [🔄 Changelog](CHANGELOG_EN.md) • [💬 Community](https://github.com/l06066hb/MarKing/issues)
 
</div>
 
---
 
## 📸 Application Preview
 
![MarKing Main Interface](docs/marking-markdown-editor-main-interface-en.png)
 
---
 
## 📥 Download
 
> 💡 **System Requirements**: Windows 10 (64-bit) or higher
 
### Windows
 
Experience a native editing environment that integrates seamlessly into the OS framework.

- 📦 **[Download Windows Stable Release (MSI & EXE) ➔](https://github.com/l06066hb/MarKing/releases/latest)** 
  - Provides `MSI Installer` (Supports silent install & enterprise-wide deployment)
  - Provides `Setup.exe Wizard` (Full environment integration with context menu registration)
 
> 💡 *Note: Expand the "Assets" dropdown on the Release page to find the installer for your architecture.*
 
### macOS
 
Natively supported architecture ensuring optimal performance across the Apple ecosystem.

- 📦 **[Download macOS Stable Release (DMG & APP) ➔](https://github.com/l06066hb/MarKing/releases/latest)**
  - Backwards-compatible with Intel architecture
  - Native support for Apple Silicon (M1/M2/M3) chips maximizing energy-efficiency
 
### Linux
 
A lightweight, zero-configuration environment ready for mainstream Linux distributions.

- **[Download Linux Stable Release (AppImage/Deb) ➔](https://github.com/l06066hb/MarKing/releases/latest)**
 
---
 
## Core Features
 
### Native Desktop Integration
 
- **Borderless Design** - Implements a 12px system-level corner radius to eliminate redundant browser borders, ensuring a native software appearance aligned with modern OS guidelines.
- **18 Built-in Color Palettes** - Offers an array of meticulously designed dark and light themes ranging from academic classics to high-contrast dark modes.
- **Compact UI Typography** - Reduces padding across components and views to optimize readability density, rivaling the immersive workspace of professional IDEs like VS Code.
- **Subtle Micro-interactions** - Employs understated, monochromatic transparency transitions rather than jarring feedback, ensuring every click feels crisp and professional.
 
### Professional Editing Engine
 
- **High-Performance Parsing** - Our O(N) single-pass state machine parsing algorithm drastically accelerates load times and scrolling frame rates for massive documents (100MB+).
- **Synchronized Preview** - A side-by-side rendering mode backed by a debounced, highly precise bidirectional scroll tracking system.
- **One-Click Code Formatter** - Complete suite of internal formatting rules to instantly reorganize spacing around headings, lists, and embedded elements.

- **Contextual Auto-Completion** - Over 70 core snippet templates are built-in, enabling rapid muscle-memory expansions for common Markdown syntaxes.
  *Intelligent Authoring Experience:*
  ![Omni-scenario Smart Completion](docs/marking-editor-features-preview-completion-en.png)

- **Mermaid & Full-Stack Render Support** - Integrated syntax helpers for flowcharts, sequence diagrams, Gantt charts, and KaTeX-based mathematical formulas.
  *Advanced Diagram Rendering in Action:*
  ![Mermaid Diagram Rendering](docs/marking-mermaid-diagram-assistant-en.png)
 
### Modern Productivity Workflows
 
- **Visual Table System** - Reduces the cognitive load of drafting Markdown tables.
  - Activation: Hovering over any table automatically invokes the floating toolbar.
  - Data Binding: Real-time, bidirectional sync with the underlying Markdown source code.
  - Features: Alignment toggles, row/column insertion, and smooth navigational hotkeys.

  *Visual Table Editor in action:*
  ![Visual Table Editor](docs/marking-visual-table-editor-en.png)
 
- **Desktop-class File Management** - Streamlining your local repository workflow.
  - **Native Context Menus**: Full right-click support for cutting, copying, and pasting files or directories.
  - **Dynamic Layout Boundaries**: Drag the vertical split-pane to adjust sidebar width smoothly, catering to different monitor proportions.
  - **Full Keyboard Navigation**: Broad keyboard shortcuts have been mapped for sidebar focus and interactions.
 
- **Smart Purity Paste** - Clearing the clutter during copy-paste operations.
  - Image Serialization: Pressing `Ctrl+V` seamlessly saves screenshot data to a local folder and converts it into a valid Markdown link.
  - File Import: Paste image files directly from your system clipboard to embed them automatically.
  - Clean Text Mode: Strips away bloated HTML tags from clipboard contents to retain pure text and standard Markdown attributes.
 
- **Auto List Continuation** - Optimizing formatting closure.
  - Emits auto-numbered extensions for ordered lists, unordered markers, and task lists after striking Enter.
  - Intelligently recalls prior indentation depths and automatically exits the list block upon an empty return.

### Powerful Export

- **DOCX Professional Templates** `(Beta Testing - Coming Soon)` - 10+ configuration options
  - 3 carefully designed preset templates (Technical, Business, General)
  - Unlimited custom templates
  - Complete cover, table of contents, header/footer support
  - Fine control of fonts, spacing, and styles

  *Professional PDF & DOCX Export:*
  ![Export Features](docs/marking-export-docx-pdf-feature-en.png)

- **High-quality PDF Output** - Based on Pandoc engine
- **HTML Static Pages** - Complete style preservation, browser-ready

### Beautiful & Easy to Use

- **18 Exquisite Themes** - From minimalist eye-care to cyberpunk, perfectly matching your desktop vibes
  - Classic Midnight, Cool Black, Sepia Yellow, Eye Care, GitHub Style, Dracula Night
  - Indigo Purple, Ocean Blue, Forest Green, Rose Pink, Sunset Orange, Monochrome
  - Neon Cyber, Coral Reef, Lavender Dream, Warm Autumn, Cool Winter, Soft Midnight
  
- **Light/Dark Mode** - Global theme switching, eye-friendly
- **Modern UI** - Material Design style, smooth animations
- **Elegant Scrollbars** - Refined interaction experience

### Smart Management

- **Multi-vault Sandbox Architecture** - Establish stringent physical logic isolations between your personal, academic, and professional projects. Ensures root directory autonomy across independent vaults.
  
  *Centralized Workspace Management:*
  ![Multi-vault Sandbox](docs/marking-multi-vault-management-en.png)

- **Enterprise-Grade Local Security Paradigm** - Rejecting the cloud, we return absolute data sovereignty back to the creator.
  - **Debounced Active State Backup**: Employs a silent 2-second background drop-to-disk logic mapped alongside a 10-step retroactive "Time-machine" snapshot memory. You are physically immune to data loss out of accidents or power outages.
  - **Cold Storage Archive Deployment**: Contains a robust, offline-first backup utility capable of compressing and vaulting all application assets into a secure offline payload in a single click.

  *Dedicated Disaster Recovery Hub:*
  ![Advanced Smart Backup Dashboard](docs/marking-smart-backup-system-en.png)

- **Millisecond Global Search Engine** - Powered under the hood by a multi-threaded Rust concurrency runtime. Full-text indexing and retrieval execute instantaneously regardless of archiving scale.
- **Centralized Multimedia Asset Pooling** - Drag and drop heavy file types seamlessly into the editor. The underlying layer autonomously redirects, localizes, and distributes multi-media payloads into the localized asset directory structure, permanently defeating broken image links.

### International Support

- **Complete Bilingual Interface** - Chinese/English one-click switching, covers all modules
- **Type-safe Translation** - TypeScript type checking ensures accuracy
- **Real-time Switching** - Instant language change, smooth experience

---

## Use Cases

| Scenario | Application |
|----------|-------------|
| **Technical Documentation** | API docs, development manuals, tech blogs |
| **Academic Writing** | Papers, reports, notes (supports KaTeX formulas) |
| **Project Management** | Requirements docs, design docs, meeting minutes |
| **Knowledge Management** | Personal notes, knowledge base, learning materials |
| **Content Creation** | Blog articles, tutorials, e-books |

---

## Quick Start

### 1. Install Application
Download the installer for your platform and follow the wizard

### 2. Create Document
Click the `+` button in toolbar or press `Ctrl+N`

### 3. Start Editing
- Type Markdown in left editor
- View real-time preview on right
- Use code snippets for quick content insertion

### 4. Export Document
Click "Export" button in toolbar, choose format (DOCX/PDF/HTML)

> 📚 **More Tips**: See [FAQ](docs/FAQ.md) and [Troubleshooting](docs/TROUBLESHOOTING.md)

---

## Why Choose MarKing?

### Excellent Performance
- Startup time < 0.5 seconds
- Installer size ~40MB (includes complete Pandoc)
- Runtime memory ~30-40MB

### Great Experience
- Modern interface design
- Smooth interactive animations
- Complete keyboard shortcut support (press `?` to view all)

### Data Security
- Local storage, protect privacy
- Auto-save, prevent loss
- Version snapshots, restore anytime
- Data backup, peace of mind
- Complete logging for troubleshooting

---

## Common Shortcuts

| Operation | Windows/Linux | macOS |
|-----------|---------------|-------|
| New Document | `Ctrl+N` | `Cmd+N` |
| Save Document | `Ctrl+S` | `Cmd+S` |
| Global Search | `Ctrl+F` | `Cmd+F` |
| Format Document | `Shift+Alt+F` | `Shift+Option+F` |
| Table Editor | `Ctrl+Shift+T` | `Cmd+Shift+T` |
| Shortcut Help | `?` | `?` |

> Complete shortcut list: Press `?` in app

---

## 📄 Copyright

Copyright © 2024-2026 MarKing. All rights reserved.

This software is proprietary and protected by copyright law and international treaties. Unauthorized copying, modification, distribution, or reverse engineering is prohibited.

See [LICENSE](LICENSE) file for details.

### Disclaimer

MarKing is the name of this software. Unauthorized use for commercial purposes or implying official endorsement is prohibited.

---

## Related Links

- 📥 [Download](https://github.com/l06066hb/MarKing/releases) - Get the latest version
- 🌐 [Official Website](https://markingmd.com) - Online experience and documentation
- 📝 [Changelog](CHANGELOG.md) - View version history
- 📚 [FAQ](docs/FAQ.md) - Usage tips and Q&A
- 🔧 [Troubleshooting](docs/TROUBLESHOOTING.md) - Solve common issues

---

## Get Help

We provide multiple support channels to help you solve problems:

- 🐛 **Issue Reporting** - [GitHub Issues](https://github.com/l06066hb/MarKing/issues)
  - Bug Report: [Submit Bug](https://github.com/l06066hb/MarKing/issues/new?template=bug_report.md)
  - Feature Request: [Submit Suggestion](https://github.com/l06066hb/MarKing/issues/new?template=feature_request.md)
  
- 💬 **Discussion** - [GitHub Discussions](https://github.com/l06066hb/MarKing/discussions)
  - Usage questions
  - Experience sharing
  
- 🔒 **Security Issues** - See [SECURITY.md](SECURITY.md)

- 📖 **Documentation**
  - [FAQ](docs/FAQ.md)
  - [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

---

## Sustaining the Project & Backers

If you resonate with MarKing's product philosophy and wish to see it maintain its ad-free, pure text-editing experience alongside continuous R&D, consider becoming a Backer!

Your direct support serves as the foundational pillar—funding infrastructure costs, code signing certificates, and the development of our core engine.

- 🌍 **[Ko-fi ➔](https://ko-fi.com/l06066hb)** - Global Backers (Visa/PayPal supported)
- ⚡ **[Afdian.net ➔](https://afdian.com/a/l06066hb)** - Domestic/CN Backers (WeChat/Alipay supported)

> 💡 *Surviving as an independent desktop tool is a massive challenge. We deeply appreciate every contribution! If you find this project valuable, please consider giving us a ⭐️ Star at the top right—it's the greatest encouragement for an indie developer.*

---

<div align="center">

**Be the King of Markdown!**

MarKing v1.2.0 | Making Document Creation More Efficient

[⬆️ Back to Top](#marking---professional-markdown-editor)

</div>
