# Changelog

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
