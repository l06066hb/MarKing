# Changelog

## [1.4.6] - 2026-06-28

> Attachment storage modes, migration tool, outline panel independent close, LiteMode navigation back, editor layout fix.

### ✨ Features

- **Attachment Storage Modes**: Three storage modes — centralized (`.marking/assets/`), custom directory, and same-as-doc (optional subfolder). Switch in Settings → Attachments; supports automatic Obsidian config detection.
- **Attachment Migration Tool**: Automatically prompts to migrate existing attachments when switching storage modes. Files are flattened to the target directory root, with auto-renaming for conflicts (`_1`, `_2`); only migrates attachments actually referenced in documents; automatically updates all Markdown reference paths; optional old file deletion (enabled by default, auto-retained on migration errors).
- **Outline Panel Independent Close**: The outline panel now has its own close button, allowing it to be closed independently without affecting other panels.
- **LiteMode Navigation Back**: Lightweight mode supports quick backward navigation between documents; fixed internal link resolution.

### 🐛 Bug Fixes

- **Editor layout on window resize**: Fixed editor area not responding correctly when the window is resized.

---

## [1.4.5] - 2026-06-15

> LaTeX cross-references, new card view, outline panel three-column layout, preview line-height config, Linux clipboard fix, and link navigation optimization.

### ✨ Features

- **LaTeX Cross-References**: Mark block formulas with `\label{name}` for automatic numbering; reference them with `\eqref{name}` or `\ref{name}` — click to jump to the target formula. Override auto-numbering with manual `\tag{}`; references update automatically when numbers change.
- **Card-Style File Browsing**: Brand-new card view with tree/card mode toggle; compact/standard/relaxed density options; breadcrumb navigation and quick folder jump; drag-and-drop .md files into specific folders; keyboard navigation (arrow keys/Enter/Backspace); multi-select (Shift+arrow/Ctrl+click/Ctrl+A).
- **Outline Panel Three-Column Layout**: New right-side independent panel layout mode for the outline, with draggable width and auto-saved preferences. Defaults to traditional sidebar tab mode; switch in Appearance → Outline Panel Layout.
- **Preview Line-Height Config**: New preview area line-height setting, adjustable from 1.0 to 2.2 in 0.1 steps. Available in Appearance → Typography.

### 🐛 Bug Fixes

- **Virtual keyboard covering formula**: Fixed MathLive virtual keyboard obscuring the formula editor. The editing area now moves up automatically so formulas stay visible.
- **Block formula paste format loss**: Fixed `$$...$$` multi-line formulas being downgraded to inline `$...$` when pasted.
- **Linux clipboard issues**: Fixed copy/paste not working properly on Linux by adding a cross-platform clipboard compatibility module.
- **Link navigation errors**: Fixed relative and absolute path resolution causing internal links to fail; added anchor jump support; blocked unsafe protocol links.
- **Duplicate label formulas missing numbers**: Fixed formulas with the same label not getting numbers after the first occurrence.
- **`\tag*{}` not recognized**: Fixed starred `\tag*{}` not being recognized as manual numbering.

### ⚡ Improvements

- **Virtual keyboard theme**: Keyboard background uses frosted glass effect, automatically adapting to light/dark mode.
- **Editor close cleanup**: Virtual keyboard is now automatically hidden when closing the formula editor.
- **File management optimization**: Auto-refresh document metadata on window focus; recycle bin filename decoding compatibility; fixed context menu flicker; unified path normalization and Unicode handling.
- **Lightweight mode font sync**: Preview area and editor font styles in lightweight mode now stay consistent with main window settings.

---

## [1.4.4] - 2026-06-07

> Window state persistence across sessions, Mermaid rendering upgrade, and multiple experience fixes.

### ✨ Features

- **Window state persistence**: The app now remembers your main window size, position and maximized state across sessions, restoring seamlessly on next launch with zero flicker.
- **Mermaid rendering upgrade**: Preview mode renders diagrams at native resolution for crisp text and icons; fullscreen mode adds Ctrl+scroll zoom (0.25x–4x), mouse drag panning and one-click zoom reset.

### 🐛 Bug Fixes

- **Window restore flicker**: Fixed brief flicker when restoring from tray, and full-screen flash when launching minimized-to-tray after a maximized exit.
- **Long formula truncation**: Fixed inline and block formulas being clipped in preview and export.
- **Template name conflict**: Renaming a template now warns if the new name is already taken; old files and references are cleaned up automatically after a rename.

### ⚡ Improvements

- **UI consistency**: Dialog colors and button interactions now adapt uniformly to the active theme for consistent appearance in both light and dark modes.
- **Security dependency upgrades**: Updated core dependencies, patching multiple upstream vulnerabilities.

---

## [1.4.3] - 2026-05-26

> Smart completion for math and code, responsive navigation, and a batch of polish fixes.

### ✨ Features

- **Smart math completion**: Type `\` inside `$...$` / `$$...$$` to surface common LaTeX commands — Greek letters, fractions, integrals, matrices, arrows, and more. Triggers only inside math context. Toggle in *Settings → Editor → Smart Input*.
- **Code fence language completion**: After typing ```` ``` ```` on a new line, suggest common languages (Python / TypeScript / Rust / Go / Mermaid / YAML, etc.) with shorthand expansion (`py` → `python`, `yml` → `yaml`). Toggle in *Settings → Editor → Smart Input*.
- **Responsive breadcrumb**: The path breadcrumb collapses middle segments based on available width; an overflow `…` reveals the full ancestor chain and sibling navigation via dropdown.

### ⚡ Improvements

- **File tree adds "Collapse All" and "Reveal Current File"**: Keyboard shortcuts `Alt+Shift+C` / `Alt+Shift+L`, remappable from *Settings → Keyboard Shortcuts*.
- **Math block hover toolbar simplified**: Reduced to a single "Edit" entry; preview styling follows the editor theme.

### 🐛 Bug Fixes

- **Linux .deb conflicts with system `pandoc`**: Resolved on distributions where `pandoc` is already installed (e.g. Kubuntu 24.04 / Debian).
- **Browser default context menu in the desktop app**: Suppressed in blank areas, preview panel, and other regions; custom context menus unaffected.
- **Drop overlay residual after opening a dragged `.md`**: Fixed the blue overlay not clearing once the drop completes.
- **Breadcrumb overlap and dropdown clipping on narrow windows**: Fixed path-vs-toolbar overlap and dropdowns clipped by parent containers.
- **Breadcrumb dropdown unresponsive on directories**: When a folder has no direct `.md` children, it now opens the nearest nested `.md`.

---

## [1.4.2] - 2026-05-18

> v1.4.2 is a stability and cross-platform experience release: expanded Mermaid diagram coverage, plus fixes for macOS IME input, editor interaction and Linux installation/runtime issues.

### ✨ Features

- **Expanded Mermaid diagram support**: Upgraded to Mermaid 11 and added 8 new diagram types — Architecture, Block, Wardley, Timeline, Quadrant, XY Chart, Sankey and C4. Insert them via the editor's "Diagrams" dropdown or snippet prefixes such as `mermaidarch`. The floating Mermaid assistant now correctly identifies `architecture-beta` / `C4Context` and other new code blocks and surfaces matching tools and hints.

### ⚡ Improvements

- **macOS IME (Chinese / Japanese input)**: Resolved occasional character ghosting while typing in the editor — input is now stable across compositions.
- **Editor visual polish (split mode)**: Wrapped long paragraphs no longer touch the right divider; the editor leaves a deliberate visual gutter between text and the splitter.

### 🐛 Bug Fixes

- **`/` and `?` are usable inside the editor again**: These keys were previously intercepted by global shortcuts while typing in a document. They now only trigger shortcuts outside the editor.
- **DOCX export strips frontmatter**: Aligned with HTML / PDF export — exported documents no longer carry `tags:` / `status:` etc. at the top.
- **C4 and new Architecture diagram export**: Fixed rendering failures where `C4Context` and similar Mermaid 11 diagrams reverted to source code in PDF / DOCX / HTML exports.
- **Wide-image sizing in DOCX export**: Fixed cases where some Pandoc versions ignored percentage widths and let oversized diagrams overflow the page.

### 🐧 Linux Install & Startup

- **deb / AppImage failing to launch after install**: Corrected the deb dependency names for the modern WebKitGTK ABI; the AppImage now ships with a FUSE3-compatible runtime, so Ubuntu 22.04+ users no longer need to install `libfuse2` manually.
- **White screen / loading hang / unresponsive UI on newer distributions**: On environments such as Ubuntu 24.04 + Wayland, the AppImage now enables WebKitGTK compatibility flags out of the box.
  - The system must have `libwebkit2gtk-4.1-0` installed (default on Ubuntu 22.04+ / Fedora 38+ / Arch).

### 🛡️ Security & Maintenance

- **Core dependency upgrades**: Mermaid 11; tightened transitive dependencies including `lodash-es`; resolved several upstream CVE advisories.

---

## [1.4.1] - 2026-05-10

> v1.4.1 extends the writing toolchain (Paste as Markdown, Document Templates) and adds typography and interface density controls.

### ✨ Features

- **Paste as Markdown** (`Ctrl+Shift+V`): turn rich text from web pages, Notion or WeChat MP into clean Markdown. Recognizes 10+ common sources; if the clipboard is already Markdown, content is pasted verbatim with no double-escaping. The default `Ctrl+V` flow is untouched.
- **Document Templates**: 6 built-in templates (Blank / Diary / Meeting / Reading / Tech Doc / Weekly Report) with `{{date}}` / `{{cursor}}` and other variables; drop your own under `.marking/templates/`.
- **Typography**: new "Appearance → Typography" pane — independent font size (5 levels) and font family for editor and preview; 20+ preset fonts including **LXGW WenKai**. Exports use their own font configuration.
- **Interface Density**: "Appearance → Interface Density" — compact / standard / comfortable; the default ("standard") matches v1.4.0 visually.
- **Hide Dotfile Folders**: on by default — `.obsidian/` / `.git/` / `.vscode/` and other metadata directories are hidden when opening third-party note vaults; MarKing's internal directories stay hidden either way.

### 🔧 Polish

- Recent Edits on Vault Overview: up to 2 real-color tag chips + "+N" overflow badge per row, hover for the full list.
- Template preview "Final Output" now performs real markdown rendering plus a frontmatter chip group.

### 🐛 Bug Fixes

- Fixed "Words this week" staying at zero on first save of a newly created document.
- Fixed stats not updating and the Data Integrity Center misreporting "missing" after deleting documents.
- Fixed YAML frontmatter `null` / `boolean` / `number` fields being coerced to strings on save/read round-trip — types are now preserved end-to-end, restoring compatibility with tools like Obsidian Dataview and Notion API.

---

## [1.4.0] - 2026-05-05

> v1.4.0 introduces Web URL Import and the Vault Overview, hardens scroll-sync stability for large documents, and refines the overall Markdown writing toolchain.

### ✨ Features

#### Web URL Import

- **Save any web page directly as a Markdown note**: Open the command palette and search "Import", or right-click a folder in the file tree and choose "Import from URL to here". Paste a URL to generate the note. No browser extension required.
- **High-fidelity conversion**: Preserves code block languages, table alignment, task lists, strikethrough, highlights, super/subscripts and hard line breaks; intra-page relative links are rewritten to absolute URLs.
- **Automatic source metadata**: Title, source URL and clipping timestamp are written into frontmatter, with an `imported` tag attached; common ad-tracking parameters are stripped automatically.
- **Clipboard auto-fill**: When the import dialog opens, a valid URL on the clipboard is pre-filled into the input.
- **Clear error messages**: Login walls, restricted access, oversized pages, non-HTML content and request timeouts are each surfaced with a dedicated bilingual message.
- **Baseline security**: Requests targeting private or reserved network ranges are rejected; per-page size, per-image size and request duration are capped to keep the application stable in the face of unusual URLs.

#### Vault Overview

- **Overview panel**: A consolidated view of total notes, total words, category and tag distribution, favorites, items needing attention and recent edits — designed to give a quick read on the state of the knowledge base.
- **Folder hover stats**: Hovering any folder in the file tree reveals its file count and last-updated time.

### ⚡ Performance & Experience

- **Scroll-sync stability**: In long documents containing Mermaid diagrams, Excalidraw boards or images, the preview no longer jumps during async render; the mapping is silently refreshed once content settles.
- **Large-document scrolling**: The scroll-sync path no longer triggers extra layout passes, keeping documents with many embedded diagrams responsive.
- **Modular Markdown formatter**: The `Shift+Alt+F` formatter has been split into independently toggleable rules (trailing whitespace, collapse blank lines, full-width spaces, indentation, final newline). Code blocks, math blocks and frontmatter are protected from modification.
- **Quick Switcher ranking**: `Ctrl+P` file switching now ranks results by exact, prefix, substring matches combined with recent-use frequency for more accurate hits.

### 🐛 Bug Fixes

- **Files missing from search in large vaults**: Fixed an issue where, in vaults exceeding a certain file count, some files could not be matched by global search.
- **Search results flickering during background saves**: Fixed result-list jitter caused by background saves re-triggering search.
- **Repeated-character search highlighting**: Highlights for queries with repeated characters (e.g. `aa`) no longer skip occurrences.
- **Quick switcher dropping results**: Fixed a case where rapid consecutive keystrokes could lose partial matches.
- **Word counting**: Corrected counting at boundaries involving emoji, CJK punctuation and grapheme clusters.
- **YAML frontmatter handling**: Hardened delimiter detection, tag add/remove and strip/restore consistency.

---

## [1.3.3] - 2026-04-30

> 🚑 v1.3.3 is a stability hotfix addressing a few editor experience issues reported on v1.3.2. **All v1.3.2 features are preserved.** All v1.3.2 users are encouraged to upgrade.

### 🐛 Bug Fixes

- Fixed an occasional character-overlap issue when switching documents — editor text rendering is back to normal.
- Improved input stability for macOS IME (Chinese / Japanese / etc.) — fixed sporadic character ghosting during typing.
- Fixed text selection in the editor — selection events were registering (a highlight indicator appeared on the right scrollbar) but the selection overlay itself wasn't visible. Selection now works as expected.
- Restored document open speed — back to the fast load experience users had on v1.3.1.

### 📝 Notes

No new features in this release. v1.3.3 focuses solely on resolving the editor regressions introduced in v1.3.2. If you upgraded to v1.3.2 and ran into any of the issues above, upgrading to v1.3.3 is strongly recommended.

---

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
