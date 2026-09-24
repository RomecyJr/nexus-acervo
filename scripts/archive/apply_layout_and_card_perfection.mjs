import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const nexusHtmlPath = path.join(rootDir, 'nexus-acervo.html');

console.log('Lendo nexus-acervo.html...');
let content = fs.readFileSync(nexusHtmlPath, 'utf8');

// ============================================================================
// 1. CSS: Custom Scrollbars, Zero White Scrollbars, Overflow Hidden & Layout
// ============================================================================
const oldCssLayoutTarget = `.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100dvh;
  overflow: hidden;
}`;

const newCssLayoutTarget = `.app {
  display: grid;
  grid-template-columns: 268px 1fr;
  height: 100dvh;
  overflow: hidden;
}`;

if (content.includes(oldCssLayoutTarget)) {
  content = content.replace(oldCssLayoutTarget, newCssLayoutTarget);
  console.log('✓ Largura da sidebar aumentada para 268px no grid.');
}

// Inserir regras globais de scrollbar moderna e prevenção de overflow
const scrollbarStyles = `
/* ==========================================================================
   SCROLLBARS CONTEMPORÂNEAS E ELIMINAÇÃO DE BARRAS BRANCAS NATIVAS
   ========================================================================== */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--border-strong) transparent;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--muted-text);
}

/* Ocultar barra de rolagem horizontal nativa em containers de botões e abas */
.segmented-control,
.filter-chips-row,
.status-toggle-group,
.view-toggle-group {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

.segmented-control::-webkit-scrollbar,
.filter-chips-row::-webkit-scrollbar,
.status-toggle-group::-webkit-scrollbar,
.view-toggle-group::-webkit-scrollbar {
  display: none !important;
  height: 0 !important;
  width: 0 !important;
}
`;

if (!content.includes('SCROLLBARS CONTEMPORÂNEAS')) {
  content = content.replace('/* APP LAYOUT */', `${scrollbarStyles}\n/* APP LAYOUT */`);
  console.log('✓ Regras globais de scrollbar e eliminação de barras brancas adicionadas.');
}

// ============================================================================
// 2. CSS: Remover estilos de barras de progresso nos segmentos (.segment-track)
// ============================================================================
const oldSegmentCss = `.segment-row {
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
}`;

const newSegmentCss = `.segment-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--trans);
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--muted-text);
  margin-bottom: 2px;
}

.segment-row:hover {
  background: var(--surface2);
  color: var(--text);
}

.segment-row.active {
  background: var(--surface3);
  color: var(--text);
  font-weight: 700;
}

.segment-row-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.segment-row-count {
  font-size: 0.68rem;
  font-family: var(--font-mono);
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: var(--surface2);
  color: var(--faint);
  flex-shrink: 0;
}

.segment-row.active .segment-row-count {
  background: var(--text);
  color: var(--bg);
}`;

if (content.includes(oldSegmentCss)) {
  content = content.replace(oldSegmentCss, newSegmentCss);
  console.log('✓ CSS dos segmentos atualizado (removidas barras de progresso).');
}

// ============================================================================
// 3. JavaScript: Atualizar renderSegmentList() para não renderizar as barras
// ============================================================================
const oldRenderSegmentList = `function renderSegmentList() {
  const counts = {};
  const activeItems = state.items.filter(x => !storedDeleted.has(x.id));
  activeItems.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });

  const max = Math.max(...Object.values(counts), 1);
  const container = $('#segmentsList');
  container.innerHTML = Object.entries(counts).map(([seg, count]) => {
    const pct = Math.round((count / max) * 100);
    const active = state.segment === seg ? 'active' : '';
    return \`
      <div class="segment-row \${active}" data-segment="\${esc(seg)}">
        <div class="segment-row-header">
          <span>\${esc(seg)}</span>
          <strong style="color:var(--text);">\${count}</strong>
        </div>
        <div class="segment-track"><div class="segment-fill" style="width: \${pct}%;"></div></div>
      </div>
    \`;
  }).join('');`;

const newRenderSegmentList = `function renderSegmentList() {
  const counts = {};
  const activeItems = state.items.filter(x => !storedDeleted.has(x.id));
  activeItems.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });

  const container = $('#segmentsList');
  container.innerHTML = Object.entries(counts).map(([seg, count]) => {
    const active = state.segment === seg ? 'active' : '';
    return \`
      <div class="segment-row \${active}" data-segment="\${esc(seg)}">
        <span class="segment-row-name">\${esc(seg)}</span>
        <span class="segment-row-count">\${count}</span>
      </div>
    \`;
  }).join('');`;

if (content.includes(oldRenderSegmentList)) {
  content = content.replace(oldRenderSegmentList, newRenderSegmentList);
  console.log('✓ renderSegmentList() atualizado para eliminar renderização de barras.');
}

// ============================================================================
// 4. Sidebar Brand & Footer ("Segundo Cérebro de Referênci" & "v2.0 PRO" fix)
// ============================================================================
const oldBrandSubtitleCss = `.brand-subtitle {
  font-size: 0.68rem;
  color: var(--muted-text);
  letter-spacing: -0.01em;
  white-space: nowrap;
  margin: 0;
}`;

const newBrandSubtitleCss = `.brand-subtitle {
  font-size: 0.7rem;
  color: var(--muted-text);
  letter-spacing: -0.01em;
  white-space: nowrap;
  margin: 0;
  line-height: 1.2;
}`;

if (content.includes(oldBrandSubtitleCss)) {
  content = content.replace(oldBrandSubtitleCss, newBrandSubtitleCss);
}

const oldSidebarFooterStatus = `<div style="display:flex; align-items:center; justify-content:space-between;">
        <div class="status-badge-clean">
          <span class="status-dot-clean"></span>
          <span>Segundo Cérebro Ativo</span>
        </div>
        <span style="font-family: var(--font-mono); font-size:0.7rem; color: var(--faint);">v2.0 PRO</span>
      </div>`;

const newSidebarFooterStatus = `<div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; width:100%;">
        <div class="status-badge-clean" style="white-space:nowrap;">
          <span class="status-dot-clean"></span>
          <span>Segundo Cérebro Ativo</span>
        </div>
        <span style="font-family: var(--font-mono); font-size:0.68rem; font-weight:700; color:var(--faint); background:var(--surface3); padding:0.12rem 0.45rem; border-radius:4px; white-space:nowrap; flex-shrink:0;">v2.0 PRO</span>
      </div>`;

if (content.includes(oldSidebarFooterStatus)) {
  content = content.replace(oldSidebarFooterStatus, newSidebarFooterStatus);
  console.log('✓ Rodapé da sidebar ajustado para evitar quebra de v2.0 PRO.');
}

// ============================================================================
// 5. Hero Headline Section & CSS (Alto Impacto / $50k Design)
// ============================================================================
const heroStyles = `
/* HERO HEADLINE SUPREMO */
.hero-headline-section {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.hero-headline-top-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.headline-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34d399;
  letter-spacing: 0.02em;
}

.headline-version-pill {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  color: var(--faint);
}

.hero-headline-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero-headline-text {
  flex: 1;
  min-width: 280px;
}

.main-hero-title {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
  line-height: 1.2;
}

.hero-accent-text {
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-hero-subtitle {
  color: var(--muted-text);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-top: 0.35rem;
  max-width: 680px;
}

/* Card Hierarchy Improvements */
.card-meta-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  margin-bottom: 0.45rem;
}

.card-meta-left {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.card-meta-right {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
}

.card-headline-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.4;
  margin-bottom: 0.4rem;
  word-break: break-word;
}

.card-quick-trash {
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 4px;
  display: grid;
  place-items: center;
}

.card-action-btns-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

/* FOOTER EXECUTIVO E VOLTAR AO TOPO */
.acervo-executive-footer {
  margin-top: 2.5rem;
  padding: 1.5rem 0 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-brand-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.footer-brand-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
}

.footer-brand-desc {
  font-size: 0.78rem;
  color: var(--muted-text);
}

.footer-bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--border-color);
  font-size: 0.72rem;
  color: var(--faint);
}

.footer-meta-badges {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.footer-meta-pill {
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--muted-text);
}

/* BOTÃO FLUTUANTE DE SUBIR AO TOPO */
.floating-scroll-top-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.75rem;
  z-index: 90;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  border-radius: 9999px;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  box-shadow: 0 4px 16px rgba(0,0,0,0.35);
  color: var(--text);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-scroll-top-btn.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.floating-scroll-top-btn:hover {
  background: var(--surface2);
  border-color: #10b981;
  color: #10b981;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
  transform: translateY(-2px);
}
`;

if (!content.includes('HERO HEADLINE SUPREMO')) {
  content = content.replace('/* MODAIS SHADCN */', `${heroStyles}\n/* MODAIS SHADCN */`);
  console.log('✓ Estilos de Headline, Footer e Botão Flutuante injetados.');
}

// Substituir o cabeçalho executivo no HTML
const oldExecHeaderHtml = `      <h1 class="sr-only-h1" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Nexus Acervo — Segundo Cérebro de Ferramentas, Repositórios e Vídeos</h1>
      <!-- HEADER EXECUTIVO LIMPO -->
      <section class="exec-header">
        <div class="exec-header-text">
          <h2>Nexus Acervo · Segundo Cérebro</h2>
          <p>Repositório pessoal de ferramentas, códigos de alto nível, vídeos de estudo e carrosséis com explicação clara do que é, do que entrega e com exemplo prático de aplicação.</p>
        </div>

        <div class="stats-cluster" aria-label="Estatísticas do Acervo">
          <div class="stat-chip"><i data-lucide="database" style="width:13px;height:13px;"></i> <strong id="kpiTotal">0</strong> itens</div>
          <div class="stat-chip"><i data-lucide="play" style="width:13px;height:13px;"></i> <strong id="kpiVideos">0</strong> vídeos</div>
          <div class="stat-chip"><i data-lucide="github" style="width:13px;height:13px;"></i> <strong id="kpiRepos">0</strong> repos</div>
          <div class="stat-chip"><i data-lucide="gallery-thumbnails" style="width:13px;height:13px;"></i> <strong id="kpiCarousels">0</strong> carrosséis</div>
          <div class="stat-chip"><i data-lucide="star" style="width:13px;height:13px;color:#f59e0b;"></i> <strong id="kpiFavs">0</strong> favoritos</div>
          <div class="stat-chip"><i data-lucide="check-circle-2" style="width:13px;height:13px;color:#10b981;"></i> <strong id="kpiSeen">0</strong> vistos</div>
        </div>
      </section>`;

const newExecHeaderHtml = `      <!-- HERO HEADLINE SECTION -->
      <section class="hero-headline-section">
        <div class="hero-headline-top-badge">
          <span class="headline-pill"><i data-lucide="sparkles" style="width:13px;height:13px;color:#10b981;"></i> Base de Conhecimento & Curadoria de Elite</span>
          <span class="headline-version-pill">v2.0 PRO</span>
        </div>
        <div class="hero-headline-main">
          <div class="hero-headline-text">
            <h1 class="main-hero-title">Nexus Acervo <span class="hero-accent-text">· Segundo Cérebro</span></h1>
            <p class="main-hero-subtitle">Diretório de alta performance com ferramentas web sem cadastro, códigos de elite, vídeos e metodologias com aplicação prática imediata.</p>
          </div>
          <div class="stats-cluster" aria-label="Estatísticas do Acervo">
            <div class="stat-chip"><i data-lucide="database" style="width:13px;height:13px;"></i> <strong id="kpiTotal">0</strong> ativos</div>
            <div class="stat-chip"><i data-lucide="inbox" style="width:13px;height:13px;color:#60a5fa;"></i> <strong id="kpiUnseen">0</strong> pendentes</div>
            <div class="stat-chip"><i data-lucide="check-circle-2" style="width:13px;height:13px;color:#10b981;"></i> <strong id="kpiSeen">0</strong> vistos</div>
            <div class="stat-chip"><i data-lucide="play" style="width:13px;height:13px;"></i> <strong id="kpiVideos">0</strong> vídeos</div>
            <div class="stat-chip"><i data-lucide="github" style="width:13px;height:13px;"></i> <strong id="kpiRepos">0</strong> repos</div>
            <div class="stat-chip"><i data-lucide="trash-2" style="width:13px;height:13px;color:#ef4444;"></i> <strong id="kpiDeleted">0</strong> lixeira</div>
          </div>
        </div>
      </section>`;

if (content.includes(oldExecHeaderHtml)) {
  content = content.replace(oldExecHeaderHtml, newExecHeaderHtml);
  console.log('✓ Novo Hero Headline injetado no lugar do header antigo.');
}

// Injetar Footer no final do main
const oldWorkspaceEnd = `        </aside>
      </div>
    </main>`;

const newWorkspaceEnd = `        </aside>
      </div>

      <!-- FOOTER EXECUTIVO COM AÇÃO DE SUBIR AO TOPO -->
      <footer class="acervo-executive-footer">
        <div class="footer-top-row">
          <div class="footer-brand-info">
            <div class="footer-brand-title">
              <i data-lucide="shield-check" style="width:16px;height:16px;color:#10b981;"></i>
              <span>Nexus Acervo · Segundo Cérebro Profissional</span>
            </div>
            <p class="footer-brand-desc">Plataforma de inteligência pessoal, catalogações técnicas e referências validadas em produção.</p>
          </div>
          <div class="footer-actions-cluster">
            <button class="btn secondary sm" id="btnFooterBackToTop" aria-label="Subir ao topo da página">
              <i data-lucide="arrow-up" style="width:14px;height:14px;"></i>
              <span>Voltar ao Topo</span>
            </button>
          </div>
        </div>
        <div class="footer-bottom-row">
          <span class="footer-meta-text">© 2026 Nexus Acervo · Curadoria Romecy Jr · Soberania Digital & Local-First</span>
          <div class="footer-meta-badges">
            <span class="footer-meta-pill" id="footerTotalBadge">74 Itens Ativos</span>
            <span class="footer-meta-pill">Armazenamento Local Criptografado</span>
          </div>
        </div>
      </footer>
    </main>`;

if (content.includes(oldWorkspaceEnd)) {
  content = content.replace(oldWorkspaceEnd, newWorkspaceEnd);
  console.log('✓ Footer executivo injetado no final da área de conteúdo.');
}

// Injetar Botão Flutuante de Subir ao Topo antes de </body>
const floatingBtnHtml = `
<!-- BOTÃO FLUTUANTE DE SUBIR AO TOPO -->
<button class="floating-scroll-top-btn" id="btnFloatingScrollTop" aria-label="Voltar ao topo da página" title="Subir ao Topo">
  <i data-lucide="arrow-up" style="width:15px;height:15px;"></i>
  <span>Subir ao Topo</span>
</button>
`;

if (!content.includes('id="btnFloatingScrollTop"')) {
  content = content.replace('</body>', `${floatingBtnHtml}\n</body>`);
  console.log('✓ Botão flutuante de subir ao topo injetado antes de </body>.');
}

// ============================================================================
// 6. JavaScript: Conectar scroll do botão flutuante e do footer
// ============================================================================
const scrollJsSnippet = `
  // Conexão dos botões de Subir ao Topo
  const scrollContainer = $('#content');
  const btnFloating = $('#btnFloatingScrollTop');
  const btnFooterTop = $('#btnFooterBackToTop');

  function scrollToTop() {
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (scrollContainer && btnFloating) {
    scrollContainer.addEventListener('scroll', () => {
      if (scrollContainer.scrollTop > 300) {
        btnFloating.classList.add('show');
      } else {
        btnFloating.classList.remove('show');
      }
    });
    btnFloating.onclick = scrollToTop;
  }
  if (btnFooterTop) {
    btnFooterTop.onclick = scrollToTop;
  }
`;

if (!content.includes('btnFloatingScrollTop')) {
  content = content.replace("document.addEventListener('DOMContentLoaded', () => {", `document.addEventListener('DOMContentLoaded', () => {\n${scrollJsSnippet}`);
} else if (!content.includes('btnFloating.onclick = scrollToTop;')) {
  content = content.replace("document.addEventListener('DOMContentLoaded', () => {", `document.addEventListener('DOMContentLoaded', () => {\n${scrollJsSnippet}`);
}

// ============================================================================
// 7. Atualizar updateKpis() para preencher novos KPIs
// ============================================================================
if (!content.includes("$('#kpiDeleted').textContent = deletedCount;")) {
  content = content.replace(
    "if ($('#kpiSeen')) $('#kpiSeen').textContent = seenCount;",
    `if ($('#kpiSeen')) $('#kpiSeen').textContent = seenCount;\n  if ($('#kpiUnseen')) $('#kpiUnseen').textContent = unseenCount;\n  if ($('#kpiDeleted')) $('#kpiDeleted').textContent = deletedCount;\n  if ($('#footerTotalBadge')) $('#footerTotalBadge').textContent = \`\${active.length} Recursos Ativos\`;`
  );
  console.log('✓ updateKpis() estendido com contadores de não vistos, excluídos e footer.');
}

// Salvar nexus-acervo.html
fs.writeFileSync(nexusHtmlPath, content, 'utf8');
console.log('nexus-acervo.html atualizado com sucesso.');
