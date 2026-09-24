import fs from 'node:fs';

const filePath = new URL('../nexus-acervo.html', import.meta.url);
const indexPath = new URL('../index.html', import.meta.url);

let html = fs.readFileSync(filePath, 'utf8');

// 1. Replace Styles
// We replace the styles between /* --- THEME VARIABLES --- */ and </style>
const oldStyleStart = '/* --- PALETA EXECUTIVA OBSIDIAN & TITANIUM PLATINUM --- */';
const oldStyleEnd = '</style>';

const newStyles = `/* --- DESIGN TOKENS SHADCN/UI (OFICIAIS DARK MODE) --- */
:root[data-theme="dark"] {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 4.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 4.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
  --radius: 0.5rem;

  --bg: #09090b;
  --surface: #121215;
  --surface2: #18181b;
  --surface3: #27272a;
  --text: #fafafa;
  --muted-text: #a1a1aa;
  --faint: #71717a;
  --border-color: #27272a;
  --border-strong: #3f3f46;
  --border-focus: #e4e4e7;
  --primary-bg: #fafafa;
  --primary-text: #09090b;
  --primary-hover: #e4e4e7;

  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.24);
  --card-hover-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
  --modal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);

  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --trans: 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

:root[data-theme="light"] {
  --bg: #f8fafc;
  --surface: #ffffff;
  --surface2: #f1f5f9;
  --surface3: #e2e8f0;
  --text: #09090b;
  --muted-text: #64748b;
  --faint: #94a3b8;
  --border-color: #e2e8f0;
  --border-strong: #cbd5e1;
  --border-focus: #0f172a;
  --primary-bg: #09090b;
  --primary-text: #fafafa;
  --primary-hover: #1e293b;
  --card-shadow: 0 1px 3px rgba(0,0,0,0.06);
  --card-hover-shadow: 0 10px 20px rgba(0,0,0,0.08);
  --modal-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: inherit;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  height: 100dvh;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button, input, select, textarea { font-family: inherit; color: inherit; border: none; background: none; }

/* APP LAYOUT */
.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100dvh;
  overflow: hidden;
}

/* SIDEBAR LINEAR / RAYCAST */
.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  z-index: 40;
}

.sidebar-header {
  padding: 1.15rem 1rem 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.brand-icon-box {
  width: 32px;
  height: 32px;
  border-radius: var(--radius);
  background: var(--text);
  color: var(--bg);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 0.95rem;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.brand-title-group h1 {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
}

.brand-title-group span {
  font-size: 0.7rem;
  color: var(--faint);
  display: block;
}

.sidebar-menu-body {
  padding: 1rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.menu-group-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--faint);
  padding: 0 0.5rem;
  margin-bottom: 0.35rem;
}

.nav-pills-list {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius);
  font-size: 0.815rem;
  font-weight: 500;
  color: var(--muted-text);
  transition: all var(--trans);
  cursor: pointer;
}

.nav-btn-inner {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.nav-btn-inner i {
  width: 15px;
  height: 15px;
  opacity: 0.8;
}

.nav-btn:hover {
  background: var(--surface2);
  color: var(--text);
}

.nav-btn.active {
  background: var(--surface3);
  color: var(--text);
  font-weight: 700;
}

.nav-pill-count {
  font-size: 0.68rem;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: var(--surface2);
  color: var(--faint);
  font-weight: 700;
  font-family: var(--font-mono);
}

.nav-btn.active .nav-pill-count {
  background: var(--text);
  color: var(--bg);
}

.sidebar-footer {
  padding: 0.85rem 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface2);
  font-size: 0.72rem;
}

.status-badge-clean {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 600;
  color: #10b981;
}

.status-dot-clean {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}

/* MAIN VIEWPORT */
.main-viewport {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  background: var(--bg);
}

/* TOPBAR */
.topbar {
  height: 52px;
  background: var(--surface);
  border-bottom: 1px solid var(--border-color);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
  z-index: 30;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  max-width: 540px;
}

.menu-trigger-btn {
  display: none;
  padding: 0.4rem;
  color: var(--muted-text);
  cursor: pointer;
}

.search-field {
  position: relative;
  width: 100%;
}

.search-field i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  color: var(--faint);
}

.search-field input {
  width: 100%;
  height: 34px;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 0 3.75rem 0 2.25rem;
  font-size: 0.815rem;
  transition: all var(--trans);
}

.search-field input:focus {
  outline: none;
  border-color: var(--border-focus);
  background: var(--surface);
}

.search-kbd-pill {
  position: absolute;
  right: 0.45rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.15rem 0.35rem;
  background: var(--surface3);
  border-radius: 4px;
  font-size: 0.65rem;
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--faint);
  cursor: pointer;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* SHADCN BUTTONS */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  height: 34px;
  padding: 0 0.8rem;
  border-radius: var(--radius);
  font-size: 0.815rem;
  font-weight: 600;
  border: 1px solid var(--border-color);
  background: var(--surface);
  color: var(--text);
  transition: all var(--trans);
  white-space: nowrap;
  cursor: pointer;
}

.btn:hover {
  background: var(--surface2);
  border-color: var(--border-strong);
}

.btn.primary {
  background: var(--primary-bg);
  border-color: var(--primary-bg);
  color: var(--primary-text);
  font-weight: 700;
}

.btn.primary:hover {
  background: var(--primary-hover);
}

.btn.secondary {
  background: var(--surface2);
  border-color: var(--border-color);
  color: var(--text);
}

.btn.secondary:hover {
  background: var(--surface3);
}

.btn.icon-only {
  width: 34px;
  padding: 0;
}

/* SCROLLABLE MAIN CONTENT */
.scroll-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

/* HEADER EXECUTIVO CONTEMPORÂNEO */
.exec-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.exec-header-text h2 {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text);
}

.exec-header-text p {
  color: var(--muted-text);
  font-size: 0.815rem;
  margin-top: 0.2rem;
  max-width: 650px;
}

.stats-cluster {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.55rem;
  border-radius: var(--radius);
  background: var(--surface2);
  border: 1px solid var(--border-color);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted-text);
}

.stat-chip strong {
  color: var(--text);
  font-weight: 800;
  font-family: var(--font-mono);
}

/* SHADCN TOOLBAR & VIEW CONTROLS */
.controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.segmented-control {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background: var(--surface2);
  padding: 0.2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  overflow-x: auto;
}

.segment-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.65rem;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted-text);
  transition: all var(--trans);
  white-space: nowrap;
  cursor: pointer;
}

.segment-tab:hover {
  color: var(--text);
}

.segment-tab.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  font-weight: 700;
}

.toolbar-right-cluster {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* TOGGLE GROUP DE MODOS (GRID / LISTA / TILES) */
.view-toggle-group {
  display: flex;
  align-items: center;
  background: var(--surface2);
  padding: 0.2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
}

.view-toggle-btn {
  padding: 0.3rem 0.55rem;
  border-radius: calc(var(--radius) - 2px);
  color: var(--muted-text);
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: all var(--trans);
}

.view-toggle-btn:hover {
  color: var(--text);
}

.view-toggle-btn.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

/* POPOVER DE CUSTOMIZAÇÃO SHADCN */
.customizer-popover-wrap {
  position: relative;
}

.customizer-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: 320px;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  box-shadow: var(--modal-shadow);
  padding: 1rem;
  z-index: 100;
  display: none;
  flex-direction: column;
  gap: 1rem;
}

.customizer-menu.open {
  display: flex;
  animation: popoverFadeIn 150ms ease forwards;
}

@keyframes popoverFadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.customizer-section-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--faint);
  margin-bottom: 0.4rem;
}

.customizer-btn-cluster {
  display: flex;
  gap: 0.3rem;
  background: var(--surface2);
  padding: 0.2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
}

.customizer-option-btn {
  flex: 1;
  padding: 0.35rem 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  text-align: center;
  border-radius: calc(var(--radius) - 2px);
  color: var(--muted-text);
  cursor: pointer;
  transition: all var(--trans);
  white-space: nowrap;
}

.customizer-option-btn:hover {
  color: var(--text);
}

.customizer-option-btn.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

/* FILTRO CHIPS HORIZONTAIS */
.filter-chips-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.filter-chip-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted-text);
  cursor: pointer;
  transition: all var(--trans);
  white-space: nowrap;
}

.filter-chip-item:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.filter-chip-item.active {
  background: var(--surface3);
  border-color: var(--border-strong);
  color: var(--text);
  font-weight: 700;
}

/* WORKSPACE GRID */
.workspace-layout {
  display: grid;
  grid-template-columns: 1fr 270px;
  gap: 1.5rem;
  align-items: start;
}

/* STREAM CONTAINER (MULTI-MODAL: GRID, LISTA, TILES) */
.stream-container {
  display: grid;
  transition: all var(--trans);
}

/* 1. MODO GRID (CARDS MULTI-COLUNA) */
.stream-container.view-grid {
  grid-template-columns: repeat(var(--ui-cols, 3), minmax(0, 1fr));
  gap: var(--ui-gap, 1.25rem);
}

.stream-container.cols-2 { --ui-cols: 2; }
.stream-container.cols-3 { --ui-cols: 3; }
.stream-container.cols-4 { --ui-cols: 4; }

.stream-container.gap-compact { --ui-gap: 0.75rem; }
.stream-container.gap-normal { --ui-gap: 1.25rem; }
.stream-container.gap-relaxed { --ui-gap: 1.75rem; }

/* 2. MODO LISTA */
.stream-container.view-list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

/* 3. MODO TILES / BOTÕES */
.stream-container.view-tiles {
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 0.65rem;
}

/* CARDS SHADCN (FÓRMULA UNIVERSAL ESTRUTURADA) */
.card-item {
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
  transition: transform var(--trans), border-color var(--trans), box-shadow var(--trans);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.card-item:hover {
  border-color: var(--border-strong);
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-2px);
}

/* THUMBNAIL DO VÍDEO NO MODO GRID VERTICAL */
.card-thumb-top {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
}

.card-thumb-top img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 250ms ease;
}

.card-item:hover .card-thumb-top img {
  transform: scale(1.05);
}

.video-hover-play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity var(--trans);
}

.card-item:hover .video-hover-play { opacity: 1; }

.play-bubble {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  color: #09090b;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.video-label-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: var(--font-mono);
}

/* VÍDEO HORIZONTAL (QUANDO MINIATURA É MÉDIA / PEQUENA) */
.card-video-horizontal {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.15rem;
}

.card-video-horizontal .card-thumb-side {
  position: relative;
  width: 160px;
  min-width: 160px;
  max-width: 160px;
  aspect-ratio: 16 / 9;
  border-radius: calc(var(--radius) - 2px);
  overflow: hidden;
  background: #000;
  border: 1px solid var(--border-color);
  flex-shrink: 0;
}

.card-video-horizontal.thumb-sm .card-thumb-side {
  width: 110px;
  min-width: 110px;
  max-width: 110px;
}

.card-video-horizontal .card-thumb-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-video-horizontal .card-content-body {
  padding: 0;
}

/* REPOSITÓRIO GITHUB */
.card-repo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.repo-mono-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--text);
}

.repo-mono-title i {
  width: 15px;
  height: 15px;
}

/* CARROSSEL NO GRID */
.card-carousel-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--surface2);
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
}

.card-carousel-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slides-counter-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
}

/* CORPO DO CARD COM ESPAÇAMENTO INTENCIONAL */
.card-content-body {
  padding: 1.15rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 0.75rem;
  min-width: 0;
}

.card-title-line {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.card-title-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.35;
}

.card-summary-desc {
  font-size: 0.815rem;
  color: var(--muted-text);
  line-height: 1.5;
}

/* CAIXAS DE DESTAQUE ELEGANTES (O QUE ENTREGA / EXEMPLO PRÁTICO) */
.callout-deliverable {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.55rem 0.75rem;
  border-radius: calc(var(--radius) - 2px);
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.2);
  font-size: 0.78rem;
  color: var(--text);
  line-height: 1.45;
}

.callout-deliverable i {
  color: #f59e0b;
  flex-shrink: 0;
  margin-top: 1px;
  width: 14px;
  height: 14px;
}

.callout-example {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.55rem 0.75rem;
  border-radius: calc(var(--radius) - 2px);
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  font-size: 0.78rem;
  color: var(--text);
  line-height: 1.45;
}

.callout-example i {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 1px;
  width: 14px;
  height: 14px;
}

.card-foot-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.55rem;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.card-chips-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.meta-chip-tag {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: calc(var(--radius) - 3px);
  background: var(--surface2);
  border: 1px solid var(--border-color);
  color: var(--muted-text);
  cursor: pointer;
  transition: all var(--trans);
}

.meta-chip-tag:hover {
  background: var(--surface3);
  color: var(--text);
}

.card-favorite-toggle {
  padding: 0.3rem;
  color: var(--faint);
  cursor: pointer;
  transition: all var(--trans);
  border-radius: 4px;
}

.card-favorite-toggle:hover {
  color: #f59e0b;
}

.card-favorite-toggle.is-fav {
  color: #f59e0b;
}

.card-button-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon-action-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  color: var(--muted-text);
  background: var(--surface2);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--trans);
}

.icon-action-btn:hover {
  background: var(--surface3);
  color: var(--text);
  border-color: var(--border-strong);
}

/* ==========================================================================
   ESTILOS ESPECÍFICOS DO MODO LISTA (LINHAS EXECUTIVAS TABULADAS)
   ========================================================================== */
.list-row-item {
  display: grid;
  grid-template-columns: 80px minmax(220px, 1.2fr) 2fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 0.65rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  transition: all 150ms ease;
  cursor: pointer;
}

.list-row-item:hover {
  background: var(--surface2);
  border-color: var(--border-strong);
  transform: translateX(2px);
}

.list-thumb-img {
  width: 76px;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  object-fit: cover;
  background: #000;
  border: 1px solid var(--border-color);
}

.list-avatar-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius);
  background: var(--surface2);
  border: 1px solid var(--border-color);
  display: grid;
  place-items: center;
}

.list-col-title {
  min-width: 0;
}

.list-col-deliverable {
  min-width: 0;
}

.list-deliverable-text {
  font-size: 0.78rem;
  color: var(--muted-text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.list-col-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* ==========================================================================
   ESTILOS ESPECÍFICOS DO MODO BOTÕES / MOSAICO (TILES DINÂMICOS)
   ========================================================================== */
.tile-button-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 0.85rem;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  transition: all 150ms ease;
  cursor: pointer;
  text-align: left;
  position: relative;
}

.tile-button-card:hover {
  background: var(--surface2);
  border-color: var(--border-strong);
  transform: translateY(-2px);
  box-shadow: var(--card-hover-shadow);
}

.tile-media-avatar {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  flex-shrink: 0;
  overflow: hidden;
}

.tile-media-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile-info-block {
  flex: 1;
  min-width: 0;
}

.tile-info-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tile-info-meta {
  font-size: 0.68rem;
  color: var(--muted-text);
  margin-top: 1px;
}

/* SIDE PANEL DIREITO */
.side-panel {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.panel-card-box {
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.15rem;
}

.panel-header-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.segment-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--trans);
}

.segment-row:hover, .segment-row.active {
  background: var(--surface2);
}

.segment-row.active {
  border-left: 2px solid var(--text);
}

.segment-row-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted-text);
}

.segment-track {
  height: 4px;
  background: var(--surface3);
  border-radius: 9999px;
  overflow: hidden;
}

.segment-fill {
  height: 100%;
  background: var(--muted-text);
  border-radius: 9999px;
}

/* MODAIS SHADCN */
.clean-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: none;
  place-items: center;
  padding: 1.5rem;
}

.clean-modal.open { display: grid; }

.modal-dialog {
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  box-shadow: var(--modal-shadow);
  width: min(780px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-close-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface2);
  color: var(--muted-text);
  display: grid;
  place-items: center;
  z-index: 20;
  transition: all var(--trans);
  cursor: pointer;
}

.modal-close-icon:hover {
  background: var(--surface3);
  color: var(--text);
}

.modal-media-wrap {
  width: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.modal-media-wrap.has-video {
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid var(--border-color);
}

.modal-media-wrap.has-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.carousel-slider-view {
  position: relative;
  width: 100%;
  background: #000;
  aspect-ratio: 4 / 3;
  max-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slider-view img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all var(--trans);
}

.slider-btn:hover { background: #000; transform: translateY(-50%) scale(1.08); }
.slider-btn.prev { left: 1rem; }
.slider-btn.next { right: 1rem; }

.slider-counter {
  position: absolute;
  bottom: 1rem;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
}

.modal-inner-padding {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

/* COMMAND PALETTE */
.cmd-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: none;
  place-items: start center;
  padding-top: 10vh;
}

.cmd-backdrop.open { display: grid; }

.cmd-modal-window {
  width: min(600px, calc(100% - 32px));
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  box-shadow: var(--modal-shadow);
  overflow: hidden;
}

.cmd-input-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  border-bottom: 1px solid var(--border-color);
}

.cmd-input-bar i {
  color: var(--faint);
  width: 17px;
  height: 17px;
}

.cmd-input-bar input {
  width: 100%;
  font-size: 0.95rem;
  color: var(--text);
  outline: none;
}

.cmd-results-list {
  max-height: 380px;
  overflow-y: auto;
  padding: 0.5rem;
}

.cmd-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.85rem;
  border-radius: calc(var(--radius) - 2px);
  cursor: pointer;
  transition: all var(--trans);
}

.cmd-item-row:hover, .cmd-item-row.active {
  background: var(--surface2);
}

.toast-bar {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 2000;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 0.65rem 1rem;
  box-shadow: var(--card-hover-shadow);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.815rem;
  transform: translateY(150%);
  opacity: 0;
  transition: all var(--trans);
}

.toast-bar.show { transform: none; opacity: 1; }
.toast-bar i { color: #10b981; width: 17px; height: 17px; }

/* RESPONSIVIDADE E ACESSIBILIDADE OBRIGATÓRIA */
@media(max-width:767px) {
  .app { grid-template-columns: 1fr; }
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: 270px;
    transform: translateX(-100%);
    transition: transform var(--trans);
  }
  .sidebar.open { transform: none; box-shadow: 0 0 40px rgba(0,0,0,0.8); }
  .menu-trigger-btn { display: inline-flex; }
  .workspace-layout { grid-template-columns: 1fr; }
  .side-panel { display: none; }
  .stream-container.view-grid { grid-template-columns: 1fr !important; }
  .stream-container.view-tiles { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .list-row-item { grid-template-columns: 60px 1fr auto; }
  .list-col-deliverable { display: none; }
  .exec-header { flex-direction: column; align-items: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  *, *:before, *:after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

// Extract everything before the old styles and after the old styles
const beforeStyles = html.substring(0, html.indexOf(oldStyleStart));
const afterStyles = html.substring(html.indexOf(oldStyleEnd) + oldStyleEnd.length);

let newHtml = beforeStyles + newStyles + '</style>' + afterStyles;

// Now update the Controls Bar HTML in newHtml:
const oldControlsBar = `<div class="controls-bar">
          <div class="segmented-control">
            <button class="segment-tab active" data-kind="all"><i data-lucide="layout-grid"></i> Todos</button>
            <button class="segment-tab" data-kind="vídeo"><i data-lucide="play-circle"></i> Vídeos</button>
            <button class="segment-tab" data-kind="repositório"><i data-lucide="git-branch"></i> Repositórios</button>
            <button class="segment-tab" data-kind="carrossel"><i data-lucide="layers"></i> Carrosséis</button>
            <button class="segment-tab" data-kind="ferramenta"><i data-lucide="wrench"></i> Ferramentas</button>
            <button class="segment-tab" data-kind="conhecimento"><i data-lucide="book-open"></i> Conhecimento</button>
          </div>

          <div class="toolbar-actions">
            <select class="select-box" id="segmentSelect" aria-label="Filtrar por segmento">
              <option value="all">Todos os segmentos</option>
              <option value="Design e UX">Design e UX</option>
              <option value="Aprendizado">Aprendizado</option>
              <option value="Conteúdo e mídia">Conteúdo e mídia</option>
              <option value="Métricas de negócio">Métricas de negócio</option>
              <option value="Produtividade">Produtividade</option>
              <option value="Importação">Importação</option>
            </select>

            <select class="select-box" id="sortSelect" aria-label="Ordenar itens">
              <option value="recent">Mais recentes</option>
              <option value="title">Título (A-Z)</option>
              <option value="segment">Por segmento</option>
            </select>

            <button class="btn icon-only" id="btnToggleView" aria-label="Alternar visualização"><i data-lucide="grid"></i></button>
            <button class="btn icon-only" id="btnViewList" aria-label="Modo lista"><i data-lucide="list"></i></button>
          </div>
        </div>`;

const newControlsBar = `<div class="controls-bar">
          <!-- SEGMENTED TABS (FORMATO) -->
          <div class="segmented-control">
            <button class="segment-tab active" data-kind="all"><i data-lucide="layout-grid"></i> Todos</button>
            <button class="segment-tab" data-kind="vídeo"><i data-lucide="play-circle"></i> Vídeos</button>
            <button class="segment-tab" data-kind="repositório"><i data-lucide="git-branch"></i> Repositórios</button>
            <button class="segment-tab" data-kind="carrossel"><i data-lucide="layers"></i> Carrosséis</button>
            <button class="segment-tab" data-kind="ferramenta"><i data-lucide="wrench"></i> Ferramentas</button>
            <button class="segment-tab" data-kind="conhecimento"><i data-lucide="book-open"></i> Conhecimento</button>
          </div>

          <div class="toolbar-right-cluster">
            <!-- TOGGLE GROUP DE MODOS SHADCN -->
            <div class="view-toggle-group" role="group" aria-label="Modo de visualização">
              <button class="view-toggle-btn active" id="btnModeGrid" data-mode="grid" title="Visualização em Cards Multi-Coluna"><i data-lucide="layout-grid" style="width:14px;height:14px;"></i> Cards</button>
              <button class="view-toggle-btn" id="btnModeList" data-mode="list" title="Visualização em Lista Executiva"><i data-lucide="list" style="width:14px;height:14px;"></i> Lista</button>
              <button class="view-toggle-btn" id="btnModeTiles" data-mode="tiles" title="Visualização em Botões / Mosaico"><i data-lucide="grid-3x3" style="width:14px;height:14px;"></i> Botões</button>
            </div>

            <!-- BOTÃO E POPOVER DE CUSTOMIZAÇÃO AO VIVO -->
            <div class="customizer-popover-wrap">
              <button class="btn secondary" id="btnCustomizerToggle" aria-label="Personalizar layout e caixas">
                <i data-lucide="sliders-horizontal" style="width:14px;height:14px;"></i>
                <span>Personalizar</span>
                <i data-lucide="chevron-down" style="width:12px;height:12px;opacity:0.6;"></i>
              </button>

              <div class="customizer-menu" id="customizerMenu">
                <div>
                  <div class="customizer-section-title">Colunas no Grid</div>
                  <div class="customizer-btn-cluster" id="colCluster">
                    <button class="customizer-option-btn" data-cols="2">2 Colunas</button>
                    <button class="customizer-option-btn active" data-cols="3">3 Colunas</button>
                    <button class="customizer-option-btn" data-cols="4">4 Colunas</button>
                  </div>
                </div>

                <div>
                  <div class="customizer-section-title">Miniatura do YouTube</div>
                  <div class="customizer-btn-cluster" id="thumbCluster">
                    <button class="customizer-option-btn active" data-thumb="large" title="Grande 16:9 no topo do card">Grande (16:9)</button>
                    <button class="customizer-option-btn" data-thumb="medium" title="Média lateral">Média</button>
                    <button class="customizer-option-btn" data-thumb="small" title="Pequena">Pequena</button>
                    <button class="customizer-option-btn" data-thumb="none" title="Sem imagem">Ocultar</button>
                  </div>
                </div>

                <div>
                  <div class="customizer-section-title">Nível de Detalhe</div>
                  <div class="customizer-btn-cluster" id="detailCluster">
                    <button class="customizer-option-btn active" data-detail="full">Completo</button>
                    <button class="customizer-option-btn" data-detail="focused">Foco Entregável</button>
                    <button class="customizer-option-btn" data-detail="minimal">Minimalista</button>
                  </div>
                </div>

                <div>
                  <div class="customizer-section-title">Espaçamento</div>
                  <div class="customizer-btn-cluster" id="gapCluster">
                    <button class="customizer-option-btn" data-gap="compact">Compacto</button>
                    <button class="customizer-option-btn active" data-gap="normal">Padrão</button>
                    <button class="customizer-option-btn" data-gap="relaxed">Amplo</button>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
                  <button class="btn" id="btnResetPrefs" style="font-size:0.72rem; height:28px; padding:0 0.5rem;">Restaurar Padrão</button>
                  <button class="btn primary" id="btnCloseCustomizer" style="font-size:0.72rem; height:28px; padding:0 0.6rem;">Fechar</button>
                </div>
              </div>
            </div>

            <!-- ORDENAÇÃO -->
            <select class="btn secondary" id="sortSelect" aria-label="Ordenar itens" style="padding-right: 1.5rem; cursor: pointer;">
              <option value="recent">Mais recentes</option>
              <option value="title">Título (A-Z)</option>
              <option value="segment">Por segmento</option>
            </select>
          </div>
        </div>

        <!-- FILTROS POR CHIP INLINE -->
        <div class="filter-chips-row">
          <button class="filter-chip-item active" data-segment="all">Todos os segmentos</button>
          <button class="filter-chip-item" data-segment="Design e UX">🎨 Design e UX</button>
          <button class="filter-chip-item" data-segment="Aprendizado">🧠 Aprendizado</button>
          <button class="filter-chip-item" data-segment="Conteúdo e mídia">🎬 Conteúdo & Mídia</button>
          <button class="filter-chip-item" data-segment="Métricas de negócio">📈 Métricas</button>
          <button class="filter-chip-item" data-segment="Produtividade">⚡ Produtividade</button>
          <button class="filter-chip-item" data-segment="Importação">📦 Importação</button>
        </div>`;

// Replace controls bar
const norm = s => s.replace(/\r\n/g, '\n');
newHtml = norm(newHtml).replace(norm(oldControlsBar), norm(newControlsBar));

fs.writeFileSync(filePath, newHtml, 'utf8');
fs.writeFileSync(indexPath, newHtml, 'utf8');
console.log('Styles and controls bar updated successfully in nexus-acervo.html and index.html!');
