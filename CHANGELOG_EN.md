# Changelog

## [1.3.2] - 2026-04-28

### ✨ Features

- **Clipboard Quick Capture**: A new clipboard-capture toggle in the status bar; when enabled, a lightweight popup window appears whenever the clipboard changes. Automatically identifies the content type (Markdown / code / error logs / config files / etc.) and lets you save it as a new note in one click — without ever switching back to the main window. 
- **Document Properties Panel**: Right-click any file in the tree or use a shortcut to open a properties panel showing title, path, word count, reading time, backlinks, created/modified timestamps and more — all in a single view. The status bar offers click-to-jump access.
- **Attachment Manager Upgrade**: Scans every image, audio, video, and attachment across your Vault and groups them into "Referenced / Unreferenced / Broken references". Full toolbox: search, sort, filter, individual delete, bulk cleanup, open-in-folder, and clear stale references.
- **Tray & Status Bar Personalization**: New settings for "Tray click behavior" and "Status bar content" let you tailor quick panels to your habits.
- **Smart Copy Detection**: Copied content is now classified as Markdown / code / link / error log / etc., enabling smarter handling on the next paste.

### 🐛 Bug Fixes

- Fixed a brief "partial blank" hiccup in preview when editing 10K+ word documents; ordinary-sized notes now render in a single frame.
- Fixed F2 rename shortcut occasionally acting on items other than the currently focused one.
- Fixed PDF export failing when Microsoft Edge wasn't on the system PATH — common install locations are now auto-detected.
- Fixed Focus Mode state going inconsistent after switching between Vaults.

---

## [1.3.1] - 2026-04-25

### ✨ Features

- **Tag & Category System Overhaul**: A new Info Bar above the editor replaces the old properties dialog, paired with a popover Picker and `Alt+T` / `Alt+C` shortcuts for instant tagging. YAML frontmatter and inline `#tag` syntax now sync bi-directionally, with smart Monaco autocomplete (sorted by usage frequency).
- **Custom Shortcuts**: Every built-in shortcut can now be remapped with a single keystroke — applies and persists immediately. Shortcuts displayed in the Help Center, menus, and documentation automatically reflect your customization.
- **Auto-Start at Login**: New "Launch on system startup" toggle in Settings, with native Windows / macOS / Linux support.
- **Help Center Redesign**: Streamlined to 5 compact tabs (Feature Overview / FAQ / Shortcuts / Snippets / About), with cross-tab search and hit-count badges to find any answer in 30 seconds.
- **Refreshed App Icons**: Master icon and all platform-specific assets (Windows / macOS / Linux / Android) fully redesigned for greater clarity and craftsmanship.

### ⚡ Performance & Experience

- **Editor Scroll Sync Rewrite**: Switched to piecewise linear interpolation under the hood, eliminating Y-axis jumps, quantization jitter, and sub-pixel wobble during cross-block scrolling.
- **Theme Preload Guard**: Synchronously preloads the active theme on startup, completely eliminating cold-start theme flicker.
- **Quieter Toast Notifications**: Following the "Silent success, loud failure" principle — removed "in progress..." toasts for high-frequency operations like document formatting, and shortened success-toast duration.

### 🎨 Themes & UI

- **Light Theme Contrast Fixes**: Buttons and icons in paper-series themes (washi-paper / paper-white) no longer suffer from "white-on-white" syndrome — 10+ dialogs migrated to theme-aware adaptive colors.
- **Modernized Category/Tag Creation Dialog**: Linear-style single-row palette with live preview, replacing the heavy gradient blocks.
- **Snapshot Manager Theme Adaptation**: All hardcoded colors replaced with theme tokens, fixing visual breakage in light themes.
- **Dracula Night Theme Refresh**: Repositioned as a low-saturation black-purple professional workbench — purpose-built for long deep-work sessions.
- **Modern Brand Wordmark**: Switched from serif to a contemporary sans-serif stack (Inter / system-ui) with stable cross-platform fallbacks.

### 🐛 Bug Fixes

- Fixed app-wide i18n placeholder issue where `{{var}}` was rendered literally (e.g., `{1}`, `{name}` showing in the UI) instead of being interpolated.
- Fixed knowledge graph (global / document) still showing stale data after switching vaults.
- Fixed table cells being stretched by long URLs, which would compress short-content columns into vertical single characters.
- Fixed intermittent failures of the `?` and `F1` Help shortcuts.
- Fixed redundant double-toast notifications when formatting documents.
- Corrected 7 FAQ entries that did not match actual product behavior (DOCX templates, file import, categories vs. tags, search, snippet count, etc.).

---

## [1.3.0] - 2026-04-20

### ✨ Features

- **Bi-directional Links & Knowledge Graph**: Full `[[WikiLink]]` backlink system paired with an interactive knowledge graph featuring force-directed layout, zoom & pan, node highlighting, and focus-based navigation. Handles 10K+ nodes smoothly, with graph export (PNG/SVG), immersive fullscreen, node filtering, and link-density analysis.
- **Command Palette**: `Ctrl+Shift+P` to summon a global search-and-execute panel for all editor commands and shortcuts.
- **Quick Switcher**: `Ctrl+P` for instant fuzzy file-name search with millisecond-level navigation to any document.
- **Breadcrumb Navigation**: A real-time directory path breadcrumb above the editor, with clickable segments for quick folder traversal.
- **Focus Mode**: One-click immersive writing environment featuring Typewriter Mode (current line always centered) and Highlight Mode (dims non-active paragraphs) for distraction-free authoring.
- **Callout Blocks**: Renders `> [!NOTE]`, `> [!WARNING]` and other admonition types in real-time, compatible with both GitHub Alerts and Obsidian Callout syntax.
- **Tray Close Strategy**: On window close, presents a choice between quitting entirely or minimizing to tray, with a "Remember my choice" option for future sessions.

### 🎨 Themes & UI

- **Paper-Series Dual Themes**: Added washi-paper and sepia-yellow presets inspired by East-Asian aesthetics, with a full-scope theme audit and UI refinements.
- **Global Theme Consistency**: Vault Manager, Vault Switcher, Lightweight Mode, and more fully adapt to the active theme — no more hardcoded backgrounds.
- **macOS Compatibility**: Fixed styling issues on older Safari / WebKit versions.
- **File Tree Hover Cards**: Hover over any file to see size, modification date, word count, and more at a glance.
- **Sidebar Tree Layout**: Refined file-tree indentation and template entry placement for clearer visual hierarchy.
- **Command Palette & Switcher Styling**: Unified frosted-glass popover aesthetics and keyboard-driven navigation.
- **Splash Screen & Transition Polish**: Improved loading skeleton and fade-in transitions on first launch.
- **About Page Logo Refresh**: Updated app icon rendering on the About dialog.
- **Update Dialog Layout**: Pinned download / install actions to a fixed footer — no more scrolling past changelogs to install.

### 🐛 Bug Fixes

- Fixed macOS double-click titlebar failing to toggle fullscreen.
- Fixed text copy in the preview area not working.
- Fixed first-run tips failing to persist, causing repeated pop-ups.
- Fixed Data Integrity Center showing false alerts after importing a vault in Lightweight Mode.
- Fixed inability to select subdirectories when importing a vault in Lightweight Mode.
- Fixed file content desync between Lightweight Mode and the main editor after saving.
- Fixed horizontal rule `---` inadvertently affecting subsequent content rendering.
- Fixed drag-and-drop anomalies in the visual table editor.

---

## [1.2.1] - 2026-04-12

### ✨ Features

- **MathLive Formula Editor**: Integrated visual math formula editing with WYSIWYG support for inline and block equations, a virtual math keyboard, and offline MathML export — no manual LaTeX required.
- **Excalidraw Whiteboard**: Embed freeform hand-drawn flowcharts, architecture sketches, and diagrams directly within your documents.
- **DOCX Export v2.0**: Completely redesigned template-based export architecture with live layout preview and fine-grained typography controls for professional Word document generation.
- **Smart URL Paste**: Automatically fetches page titles when pasting URLs, instantly generating properly formatted Markdown links.
- **Preview Border Control**: Added a toggle for decorative theme borders on images and videos in the preview area.

### 🐛 Bug Fixes

- Fixed images not being correctly embedded during PDF/HTML export.
- Fixed external image links failing to render in the preview area.
- Fixed inaccurate prompts and data residue when purging missing files in the Data Integrity Center.
- Completed missing i18n text across editor components for full bilingual coverage.
- Improved state persistence and resource cleanup during application shutdown.

### 📋 Compliance

- Added `THIRD-PARTY-NOTICES.md` with a complete inventory of all third-party open-source components and their licenses.
- Bundled Pandoc GPL v2 full license text (`PANDOC-LICENSE.txt`) alongside the application binary.

---

## [1.2.0] - 2026-03-28

### ✨ Features

- **Cross-Platform Domination**: Penetrating the system boundaries! Native, flawless compatibility is now achieved for macOS (both Intel & M-series Apple Silicon) and Linux, bringing an incredibly silky and uniform experience across all major operating systems.
- **File System Overhaul**: We introduced a heavyweight native right-click floating menu in the sidebar (supporting Copy, Paste, and Cut) along with comprehensive keyboard shortcut mappings, significantly boosting your file organization efficiency.
- **Maximized UI Flexibility**: Experience the silky-smooth drag-to-resize boundary line between the File Tree and the Editing Area, complete with optimized visual drop-shadow tracking when dragging document icons.
- **Themes & Visual Polish**: Expanded our dark-mode code preview themes with ultra-high contrast options, and perfected the edge rendering on window borders across all operating systems to ensure premium rounded corners.

### 🐛 Bug Fixes

- **Giant-File Performance Meta-Shift**: We've completely rewritten the document parsing algorithm inside "Lite Mode.
- **Squashing False Alarms**: Fixed a rare bug where deleting a file would inadvertently trigger a "Missing File" warning popup.
- **Explorer Logic Enhancement**: Patched an underlying parsing flaw that prevented clicking and opening files/folders that contained "spaces" in their names.
- **Picture Preview Fix**: Resolved an edge-case visual glitch in specific dark themes where exceptionally tall images failed to zoom correctly upon clicking.

---

## [1.1.2] - 2026-03-19

### 🚀 Architecture & Core Evolution
- **Core Engine Overhaul**: Fully upgraded the underlying architecture, unlocking superior performance ceilings, noticeably faster response times, and rock-solid system stability.
- **Standalone Lite Mode**: Implemented a standalone, single-page Lite mode for unindexed external files, streamlining fast-reading scenarios. Added native "Open in File Explorer" and "Copy Absolute Path" quick actions.

### ✨ Editor & Table Experience 
- **Inline Table Toolbar**: Say goodbye to clunky floating windows and right-click menus! Text formatting, cell alignment, and row/column management are now elegantly integrated right above your cursor via an instantaneous, minimalist Inline Toolbar.
- **Preview Enhancements**: Added a toggle for custom long-screen (full-width) display in the right-hand preview panel, satisfying hardcore developers' dense-reading habits.

### 🎨 UI & Interactive Polish
- **Dialogs Remastered**: Completely redesigned the core "Delete Document" and "Move Document" confirmation panels. Injected top-layer Portal rendering, customized danger-red neumorphic highlights, and exquisite card-type drop shadows.
- **Badge Logic**: Beautifully optimized the badge calculation and visual rendering logic for the Recent and Favorite lists.
- **Visual Overhaul**: Brought glassmorphism and transition animations to the document rename input modal.

---## [1.1.1] - 2026-03-06

### 🐛 Bug Fixes

- **Editor Functions Fixed**: Resolved issues where code snippets and list features failed under certain conditions
- **Language Switching Optimized**: Fixed UI elements not updating properly after language switch
- **Image Paste Improved**: Enhanced stability of clipboard image pasting
- **Link Function Fixed**: Resolved Markdown link functionality issues

### ✨ Feature Enhancements

- **Backup System Upgraded**: Brand new backup interface and logic with flexible backup scope selection for better data security
- **File Management Enhanced**: Improved file status monitoring with smarter change detection
- **Attachment Handling Refined**: Optimized upload and drag-drop experience for images, audio, and video
- **Editing Tools Expanded**: Added multiple useful Markdown editing tools, including Mermaid diagram assistant
- **Table Editor Optimized**: Enhanced visual table editor user experience
- **Snapshot System Improved**: Optimized document snapshot storage and preview functionality

### 🎨 UI Improvements

- **Visual Polish**: Refined application border radius for a more polished look
- **Toolbar Fixed**: Resolved toolbar overlap issues when expanded
- **Update Experience**: Beautified application update notification interface

---

## [1.1.0] - 2026-02-25

### ✨ UI & Experience Upgrades

- **Compact Professional Layout**: Redesigned the editor interface with tighter typography and streamlined menus, bringing the visual experience closer to top-tier developer tools.
- **Outline View Tweaks**: Reduced the indentations in the left-hand outline tree so that longer headings are easier to read without scrolling.
- **Status Bar & Bottom Panel**: Reduced the height of the bottom region, firmly centering your visual focus on the writing area.
- **Export Dialog Revise**: Compressed the spacing inside the export options dialog for a sleeker console-like appearance and improved the visual previews before exporting.

### 🌍 Internationalization Fixes

- **Code Snippets Instant Sync**: Solved the issue where the "Code Snippets" dialog would still display Chinese text after the app language was switched to English. All 60+ built-in snippets will now **instantly switch** to the correct language without delay.

### 🐛 Bug Fixes

- **Trash Stat Calculation**: Fixed a bug where the Trash menu might display `NaN` for file counters after an empty-trash command.
- **UI Improvements**: Fixed a transient visual jitter affecting sidebar sliding animations, and resolved minor cropping issues in the theme configuration menu.

---

## [1.0.11] - 2026-02-14

### ✨ New Features

#### In-App Update System
- **Update Dialog Crash Fix**: Resolved a crash occurring under specific conditions in the update dialog.
- **Update Dialog UI Enhancement**: Improved visual and interactive experience of the update dialog.
- **Update Download Diagnostics**: Added diagnostic capabilities to help troubleshoot download issues.

### 🎨 UI & Aesthetics

#### Window Corner Radius
- **Windows 11 Rounded Corners Update**: Applied native window rounded corner styling.
- **Theme Synergy**: Corner radiuses perfectly match both light and dark themes.

#### Editor Reading Experience
- **Line Number Spacing**: Increased padding between line numbers and text content for reading clarity.
- **Prompt Displays**: Improved the layout and visual presentation of editor prompts.
- **Widescreen Code Blocks**: Optimized code block presentation layout heavily for ultra-wide monitors.

### 🐛 Bug Fixes

- **System Tray Minimize**: Fixed a bug preventing the app from minimizing directly to the system tray on Windows.
- **Simplifying Options**: Dropped an obsolete settings toggle for system tray visibility.

---

## [1.0.10] - 2026-02-11

### ✨ New Features

#### Application Boot Time Optimization
- **Splash Screen**: Added a beautiful splash screen providing clear progress feedback.
- **Progressive Loading Strategy**: Boot phased into 3 distinct parts (Critical Assets → Core Functionality → Secondary Services).
- **Performance Thresholds**: Achieved <100ms Splash render, <500ms Critical load, and <2s overall boot sequence.

### 🎨 Interface Polish

#### Monaco Code Snippet Floating Window
- **Glassmorphism Style**: Implemented `backdrop-filter: blur(16px)` on the snippet suggestion list.

---

## [1.0.8] - 2026-02-03

### 🌍 Internationalization Upgrade

- **Bilingual Interface**: Seamless translation mapping (zh-CN & en-US) injected into essentially all app areas (Editor, Modals, Settings).
- **Instant Swap**: Real-time language toggling without needing app reboots.

---

## Versioning Info

- **Major**: Architecture renovations / Breaking changes.
- **Minor**: Feature additions (backwards compatible).
- **Patch**: Bug fixes & polishing.
