import fs from 'node:fs';

const filePath = new URL('../nexus-acervo.html', import.meta.url);
const indexPath = new URL('../index.html', import.meta.url);

let html = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
html = html.replace(/\r\n/g, '\n');

// 1. Remove the old duplicate controls section if it exists
// Let's check if there is a redundant `<section class="controls-bar">`
const duplicateControlsRegex = /<!-- BARRA DE CATEGORIAS E CONTROLES -->\s*<section class="controls-bar">[\s\S]*?<\/section>/;
if (duplicateControlsRegex.test(html)) {
  html = html.replace(duplicateControlsRegex, '');
}

// 2. Ensure the new Controls Bar & Filter Chips are properly placed right after <section class="exec-header">
const execHeaderEndTag = '</section>\n\n      <!-- BARRA DE CATEGORIAS E CONTROLES -->';
const targetAfterExec = '</section>';

// Let's locate the exec-header
const execHeaderIndex = html.indexOf('class="exec-header"');
if (execHeaderIndex === -1) {
  console.error('exec-header not found!');
  process.exit(1);
}

const execHeaderCloseIndex = html.indexOf('</section>', execHeaderIndex);
const beforeExecClose = html.substring(0, execHeaderCloseIndex + '</section>'.length);
const afterExecClose = html.substring(execHeaderCloseIndex + '</section>'.length);

// Remove any existing controls-bar or filter-chips before workspace-layout
const workspaceIndex = afterExecClose.indexOf('class="workspace-layout"');
const afterWorkspace = afterExecClose.substring(workspaceIndex);

// Define the clean, official shadcn controls bar and filter chips
const cleanControlsBar = `

      <!-- BARRA DE CONTROLES SHADCN UI -->
      <section class="controls-bar" style="margin-top: 1rem;">
        <!-- SEGMENTED TABS (FORMATO) -->
        <div class="segmented-control" id="categoryTabs">
          <button class="segment-tab active" data-kind="all" aria-label="Todos os formatos"><i data-lucide="layout-grid" style="width:14px;height:14px;"></i> Todos</button>
          <button class="segment-tab" data-kind="vídeo" aria-label="Vídeos"><i data-lucide="play-circle" style="width:14px;height:14px;"></i> Vídeos</button>
          <button class="segment-tab" data-kind="repositório" aria-label="Repositórios"><i data-lucide="git-branch" style="width:14px;height:14px;"></i> Repositórios</button>
          <button class="segment-tab" data-kind="carrossel" aria-label="Carrosséis"><i data-lucide="layers" style="width:14px;height:14px;"></i> Carrosséis</button>
          <button class="segment-tab" data-kind="ferramenta" aria-label="Ferramentas"><i data-lucide="wrench" style="width:14px;height:14px;"></i> Ferramentas</button>
          <button class="segment-tab" data-kind="conhecimento" aria-label="Conhecimento"><i data-lucide="book-open" style="width:14px;height:14px;"></i> Conhecimento</button>
        </div>

        <div class="toolbar-right-cluster">
          <!-- TOGGLE GROUP DE MODOS SHADCN -->
          <div class="view-toggle-group" role="group" aria-label="Modo de visualização">
            <button class="view-toggle-btn active" id="btnModeGrid" data-mode="grid" aria-label="Visualização em Cards Multi-Coluna" title="Cards / Grade"><i data-lucide="layout-grid" style="width:14px;height:14px;"></i> Cards</button>
            <button class="view-toggle-btn" id="btnModeList" data-mode="list" aria-label="Visualização em Lista Executiva" title="Lista"><i data-lucide="list" style="width:14px;height:14px;"></i> Lista</button>
            <button class="view-toggle-btn" id="btnModeTiles" data-mode="tiles" aria-label="Visualização em Botões e Mosaico" title="Botões / Mosaico"><i data-lucide="grid-3x3" style="width:14px;height:14px;"></i> Botões</button>
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
                <div class="customizer-section-title">Colunas no Grid (Cards)</div>
                <div class="customizer-btn-cluster" id="colCluster">
                  <button class="customizer-option-btn" data-cols="2" aria-label="2 Colunas">2 Colunas</button>
                  <button class="customizer-option-btn active" data-cols="3" aria-label="3 Colunas">3 Colunas</button>
                  <button class="customizer-option-btn" data-cols="4" aria-label="4 Colunas">4 Colunas</button>
                </div>
              </div>

              <div>
                <div class="customizer-section-title">Miniatura do YouTube</div>
                <div class="customizer-btn-cluster" id="thumbCluster">
                  <button class="customizer-option-btn active" data-thumb="large" aria-label="Miniatura Grande 16:9 no Topo">Topo (16:9)</button>
                  <button class="customizer-option-btn" data-thumb="medium" aria-label="Miniatura Média Lateral">Lateral</button>
                  <button class="customizer-option-btn" data-thumb="small" aria-label="Miniatura Pequena">Pequena</button>
                  <button class="customizer-option-btn" data-thumb="none" aria-label="Sem Miniatura">Ocultar</button>
                </div>
              </div>

              <div>
                <div class="customizer-section-title">Nível de Detalhe</div>
                <div class="customizer-btn-cluster" id="detailCluster">
                  <button class="customizer-option-btn active" data-detail="full" aria-label="Detalhe Completo">Completo</button>
                  <button class="customizer-option-btn" data-detail="focused" aria-label="Foco no Entregável">Foco Entrega</button>
                  <button class="customizer-option-btn" data-detail="minimal" aria-label="Minimalista">Minimalista</button>
                </div>
              </div>

              <div>
                <div class="customizer-section-title">Espaçamento Entre Caixas</div>
                <div class="customizer-btn-cluster" id="gapCluster">
                  <button class="customizer-option-btn" data-gap="compact" aria-label="Espaçamento Compacto">Compacto</button>
                  <button class="customizer-option-btn active" data-gap="normal" aria-label="Espaçamento Padrão">Padrão</button>
                  <button class="customizer-option-btn" data-gap="relaxed" aria-label="Espaçamento Amplo">Amplo</button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
                <button class="btn" id="btnResetPrefs" style="font-size:0.72rem; height:28px; padding:0 0.5rem;" aria-label="Restaurar padrão">Restaurar Padrão</button>
                <button class="btn primary" id="btnCloseCustomizer" style="font-size:0.72rem; height:28px; padding:0 0.6rem;" aria-label="Fechar configurações">Fechar</button>
              </div>
            </div>
          </div>

          <!-- ORDENAÇÃO SHADCN -->
          <select class="btn secondary" id="sortSelect" aria-label="Ordenar itens" style="padding-right: 1.5rem; cursor: pointer;">
            <option value="recent">Mais recentes</option>
            <option value="title">Título (A-Z)</option>
            <option value="segment">Por segmento</option>
          </select>
        </div>
      </section>

      <!-- FILTROS POR CHIP INLINE -->
      <div class="filter-chips-row" style="margin-top: 0.5rem;">
        <button class="filter-chip-item active" data-segment="all" aria-label="Todos os segmentos">Todos os segmentos</button>
        <button class="filter-chip-item" data-segment="Design e UX" aria-label="Segmento Design e UX">🎨 Design e UX</button>
        <button class="filter-chip-item" data-segment="Aprendizado" aria-label="Segmento Aprendizado">🧠 Aprendizado</button>
        <button class="filter-chip-item" data-segment="Conteúdo e mídia" aria-label="Segmento Conteúdo e Mídia">🎬 Conteúdo & Mídia</button>
        <button class="filter-chip-item" data-segment="Métricas de negócio" aria-label="Segmento Métricas">📈 Métricas</button>
        <button class="filter-chip-item" data-segment="Produtividade" aria-label="Segmento Produtividade">⚡ Produtividade</button>
        <button class="filter-chip-item" data-segment="Importação" aria-label="Segmento Importação">📦 Importação</button>
      </div>

      <!-- TAG BANNER -->
      <div class="active-tag-banner" id="activeTagBar" style="margin-top: 0.5rem;">
        <span>Filtrando pela tag: <strong id="activeTagName">#design</strong></span>
        <span class="clear-tag-link" id="btnClearTag" role="button" tabindex="0" aria-label="Limpar filtro de tag">Limpar filtro ✕</span>
      </div>

      <!-- WORKSPACE -->
      <div `;

html = beforeExecClose + cleanControlsBar + afterWorkspace;

// 3. Now let's update the SCRIPT section with complete dynamic customizer logic
const scriptStartTag = '<script>';
const scriptEndTag = '</script>';

const scriptStartIndex = html.indexOf(scriptStartTag);
const scriptEndIndex = html.lastIndexOf(scriptEndTag);

const beforeScript = html.substring(0, scriptStartIndex + scriptStartTag.length);
const afterScript = html.substring(scriptEndIndex);

const newScript = `
const seedCatalog = window.NEXUS_CATALOG || { meta: { version: '1.4.0' }, items: [] };

// Deduplica itens customizados com os itens semente
const storedCustomRaw = JSON.parse(localStorage.getItem('nexus_custom_items') || '[]');
const seedIds = new Set(seedCatalog.items.map(x => x.id));
const storedCustom = storedCustomRaw.filter(x => !seedIds.has(x.id));

const storedFavorites = new Set(JSON.parse(localStorage.getItem('nexus_favorites') || '[]'));

// PREFERÊNCIAS DE CUSTOMIZAÇÃO DO USUÁRIO (SHADCN CUSTOMIZER)
const defaultPrefs = {
  viewMode: 'grid',    // 'grid' | 'list' | 'tiles'
  gridCols: '3',       // '2' | '3' | '4'
  thumbSize: 'large',  // 'large' (topo 16:9) | 'medium' (lateral 160px) | 'small' (lateral 110px) | 'none' (sem thumb)
  detailLevel: 'full', // 'full' (completo) | 'focused' (só o que entrega) | 'minimal' (só título e badges)
  gapSize: 'normal'    // 'compact' | 'normal' | 'relaxed'
};

let uiPrefs = { ...defaultPrefs, ...JSON.parse(localStorage.getItem('nexus_customizer_prefs') || '{}') };

function saveUiPrefs() {
  localStorage.setItem('nexus_customizer_prefs', JSON.stringify(uiPrefs));
}

const state = {
  items: [...storedCustom, ...seedCatalog.items],
  kind: 'all',
  segment: 'all',
  activeTag: null,
  q: '',
  sort: 'recent',
  selectedItem: null,
  currentSlideIndex: 0
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function normalizeStr(v = '') {
  return String(v).normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase();
}

function esc(v = '') {
  return String(v).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}

function safeUrl(v) {
  try {
    const u = new URL(v);
    return ['http:', 'https:'].includes(u.protocol) ? esc(u.href) : '#';
  } catch {
    return '#';
  }
}

function extractYouTubeId(url = '') {
  try {
    const regExp = /(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^"&?\\/\\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function extractGitHubRepo(url = '') {
  try {
    const m = url.match(/github\\.com\\/([^\\/]+)\\/([^\\/#?]+)/);
    return (m && m[1] && m[2]) ? \`\${m[1]}/\${m[2]}\` : null;
  } catch {
    return null;
  }
}

function getItemFavicon(url = '') {
  try {
    const u = new URL(url);
    return \`https://www.google.com/s2/favicons?domain=\${u.hostname}&sz=128\`;
  } catch {
    return '';
  }
}

// FILTRAGEM
function getFilteredItems() {
  let list = state.items.filter(item => {
    if (state.kind === 'favorites') {
      if (!storedFavorites.has(item.id)) return false;
    } else if (state.kind !== 'all' && item.kind !== state.kind) {
      return false;
    }
    if (state.segment !== 'all' && item.segment !== state.segment) return false;
    if (state.activeTag && !item.tags.includes(state.activeTag)) return false;

    if (state.q.trim()) {
      const qNorm = normalizeStr(state.q);
      const text = normalizeStr([item.title, item.description, item.deliverable, item.practicalExample || '', item.segment, ...item.tags].join(' '));
      if (!text.includes(qNorm)) return false;
    }
    return true;
  });

  if (state.sort === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.sort === 'segment') {
    list.sort((a, b) => a.segment.localeCompare(b.segment));
  }
  return list;
}

// ==========================================================================
// RENDERIZADOR DINÂMICO MULTI-MODO (CARDS / LISTA / BOTÕES TILES)
// ==========================================================================
function renderCards() {
  const container = $('#itemsList');
  const items = getFilteredItems();

  // Aplica classes de customização do layout no container
  container.className = \`stream-container view-\${uiPrefs.viewMode} cols-\${uiPrefs.gridCols} gap-\${uiPrefs.gapSize}\`;

  if (!items.length) {
    container.innerHTML = \`
      <div style="grid-column: 1 / -1; padding: 3.5rem 1rem; text-align: center; color: var(--muted-text);">
        <i data-lucide="inbox" style="width: 40px; height: 40px; margin: 0 auto 0.75rem; opacity: 0.4;"></i>
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text);">Nenhum recurso encontrado</h3>
        <p style="font-size: 0.825rem; margin-top: 0.2rem;">Tente pesquisar outros termos ou limpe os filtros ativos.</p>
        <button class="btn" onclick="resetAllFilters()" style="margin-top: 0.85rem;" aria-label="Limpar todos os filtros">Limpar todos os filtros</button>
      </div>\`;
    $('#resultCount').textContent = '0 recursos encontrados';
    lucide.createIcons();
    updateKpis();
    return;
  }

  // 1. MODO LISTA EXECUTIVA
  if (uiPrefs.viewMode === 'list') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const ytId = item.youtubeId || extractYouTubeId(item.url);
      const thumb = ytId ? \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\` : (item.thumbnail || '');
      const isVideo = item.kind === 'vídeo' || !!ytId;
      const favicon = getItemFavicon(item.url);
      const deliverable = esc(item.deliverable || item.description);

      return \`
        <article class="list-row-item" data-id="\${esc(item.id)}">
          <div>
            \${isVideo && thumb
              ? \`<img class="list-thumb-img" src="\${thumb}" alt="" loading="lazy">\`
              : \`<div class="list-avatar-icon"><img src="\${favicon}" style="width:20px;height:20px;object-fit:contain;" alt="" onerror="this.style.display='none'"></div>\`}
          </div>

          <div class="list-col-title">
            <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.2rem;">
              <span class="meta-chip-tag" style="text-transform: uppercase;">\${esc(item.kind)}</span>
              <span class="meta-chip-tag" style="color:var(--faint);">\${esc(item.segment)}</span>
            </div>
            <h3 style="font-size: 0.9rem; font-weight: 700; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">\${esc(item.title)}</h3>
          </div>

          <div class="list-col-deliverable">
            <span class="list-deliverable-text">⚡ \${deliverable}</span>
          </div>

          <div class="list-col-actions">
            <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
            <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
            <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir link externo" aria-label="Abrir link externo"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
          </div>
        </article>
      \`;
    }).join('');
  }

  // 2. MODO BOTÕES / MOSAICO DINÂMICO
  else if (uiPrefs.viewMode === 'tiles') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const ytId = item.youtubeId || extractYouTubeId(item.url);
      const thumb = ytId ? \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\` : (item.thumbnail || '');
      const favicon = getItemFavicon(item.url);

      return \`
        <button class="tile-button-card" data-id="\${esc(item.id)}" title="\${esc(item.deliverable || item.description)}">
          <div class="tile-media-avatar">
            \${thumb 
              ? \`<img src="\${thumb}" alt="">\` 
              : \`<img src="\${favicon}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'">\`}
          </div>
          <div class="tile-info-block">
            <div class="tile-info-title">\${esc(item.title)}</div>
            <div class="tile-info-meta">\${esc(item.kind.toUpperCase())} · \${esc(item.segment)}</div>
          </div>
          <span class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" style="margin-left: auto;" aria-label="Favoritar"><i data-lucide="star" style="width:13px;height:13px;"></i></span>
        </button>
      \`;
    }).join('');
  }

  // 3. MODO CARDS MULTI-COLUNA (DEFAULT)
  else {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const summary = esc(item.description || '');
      const deliverableText = esc(item.deliverable || item.description);
      const exampleText = esc(item.practicalExample || 'Aplicável diretamente no fluxo de trabalho e projetos.');
      const showSummary = uiPrefs.detailLevel === 'full';
      const showDeliverable = uiPrefs.detailLevel === 'full' || uiPrefs.detailLevel === 'focused';
      const showExample = uiPrefs.detailLevel === 'full';

      // A. VÍDEO
      if (item.kind === 'vídeo' || item.youtubeId) {
        const ytId = item.youtubeId || extractYouTubeId(item.url);
        const thumb = ytId ? \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\` : (item.thumbnail || '');
        const isHorizontal = uiPrefs.thumbSize === 'medium' || uiPrefs.thumbSize === 'small';
        const showThumb = uiPrefs.thumbSize !== 'none';

        if (isHorizontal && showThumb) {
          return \`
            <article class="card-item card-video-horizontal \${uiPrefs.thumbSize === 'small' ? 'thumb-sm' : ''}" data-id="\${esc(item.id)}">
              <div class="card-thumb-side">
                <img src="\${thumb}" alt="\${esc(item.title)}" loading="lazy">
                <div class="video-hover-play"><div class="play-bubble"><i data-lucide="play" style="width:15px;height:15px;"></i></div></div>
                <span class="video-label-badge">VÍDEO</span>
              </div>
              <div class="card-content-body">
                <div>
                  <div class="card-title-line">
                    <h3 class="card-title-text">\${esc(item.title)}</h3>
                    <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                  </div>
                  \${showSummary ? \`<p class="card-summary-desc" style="margin-top: 0.35rem;">\${summary}</p>\` : ''}
                  \${showDeliverable ? \`
                    <div class="callout-deliverable" style="margin-top: 0.45rem;">
                      <i data-lucide="zap"></i>
                      <span><strong>O que entrega:</strong> \${deliverableText}</span>
                    </div>\` : ''}
                  \${showExample ? \`
                    <div class="callout-example" style="margin-top: 0.35rem;">
                      <i data-lucide="lightbulb"></i>
                      <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                    </div>\` : ''}
                </div>
                <div class="card-foot-actions">
                  <span style="font-size:0.7rem; color:var(--faint);">👥 \${esc(item.targetAudience || 'Geral')}</span>
                  <div class="card-button-links">
                    <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
                    <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir no YouTube" aria-label="Abrir no YouTube"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
                  </div>
                </div>
              </div>
            </article>
          \`;
        }

        return \`
          <article class="card-item" data-id="\${esc(item.id)}">
            \${showThumb ? \`
              <div class="card-thumb-top">
                <img src="\${thumb}" alt="\${esc(item.title)}" loading="lazy">
                <div class="video-hover-play"><div class="play-bubble"><i data-lucide="play" style="width:16px;height:16px;"></i></div></div>
                <span class="video-label-badge">VÍDEO</span>
              </div>\` : ''}
            <div class="card-content-body">
              <div>
                <div class="card-title-line">
                  <h3 class="card-title-text">\${esc(item.title)}</h3>
                  <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                </div>
                \${showSummary ? \`<p class="card-summary-desc" style="margin-top: 0.35rem;">\${summary}</p>\` : ''}
                \${showDeliverable ? \`
                  <div class="callout-deliverable" style="margin-top: 0.5rem;">
                    <i data-lucide="zap"></i>
                    <span><strong>O que entrega:</strong> \${deliverableText}</span>
                  </div>\` : ''}
                \${showExample ? \`
                  <div class="callout-example" style="margin-top: 0.4rem;">
                    <i data-lucide="lightbulb"></i>
                    <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                  </div>\` : ''}
              </div>
              <div class="card-foot-actions">
                <span style="font-size:0.7rem; color:var(--faint);">👥 \${esc(item.targetAudience || 'Geral')}</span>
                <div class="card-button-links">
                  <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
                  <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir no YouTube" aria-label="Abrir no YouTube"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
                </div>
              </div>
            </div>
          </article>
        \`;
      }

      // B. REPOSITÓRIO GITHUB
      if (item.kind === 'repositório') {
        const repoName = extractGitHubRepo(item.url) || esc(item.title);
        const license = esc(item.license || 'Open Source');
        return \`
          <article class="card-item" data-id="\${esc(item.id)}">
            <div class="card-content-body">
              <div>
                <div class="card-repo-header" style="margin-bottom: 0.5rem;">
                  <div class="repo-mono-title">
                    <i data-lucide="github"></i>
                    <span>\${esc(repoName)}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.4rem;">
                    <span class="meta-chip-tag">\${license}</span>
                    <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                  </div>
                </div>

                <h3 class="card-title-text">\${esc(item.title)}</h3>
                \${showSummary ? \`<p class="card-summary-desc" style="margin-top: 0.35rem;">\${summary}</p>\` : ''}

                \${showDeliverable ? \`
                  <div class="callout-deliverable" style="margin-top: 0.5rem;">
                    <i data-lucide="zap"></i>
                    <span><strong>O que entrega:</strong> \${deliverableText}</span>
                  </div>\` : ''}

                \${showExample ? \`
                  <div class="callout-example" style="margin-top: 0.4rem;">
                    <i data-lucide="lightbulb"></i>
                    <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                  </div>\` : ''}
              </div>

              <div class="card-foot-actions">
                <div class="card-chips-group">
                  \${item.tags.slice(0, 3).map(t => \`<span class="meta-chip-tag" data-tag="\${esc(t)}">#\${esc(t)}</span>\`).join('')}
                </div>
                <div class="card-button-links">
                  <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
                  <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Acessar Repositório" aria-label="Acessar Repositório"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
                </div>
              </div>
            </div>
          </article>
        \`;
      }

      // C. CARROSSEL (Instagram / Redes)
      if (item.kind === 'carrossel') {
        const slides = Array.isArray(item.slides) && item.slides.length ? item.slides : [item.thumbnail || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'];
        const author = esc(item.author || '@instagram');
        const showThumb = uiPrefs.thumbSize !== 'none';
        return \`
          <article class="card-item" data-id="\${esc(item.id)}">
            \${showThumb ? \`
              <div class="card-carousel-cover">
                <img src="\${slides[0]}" alt="\${esc(item.title)}" loading="lazy">
                <div class="slides-counter-tag"><i data-lucide="images" style="width:12px;height:12px;"></i> \${slides.length}</div>
              </div>\` : ''}
            <div class="card-content-body">
              <div>
                <div class="card-title-line">
                  <div>
                    <span style="font-size: 0.68rem; font-weight: 700; color: var(--muted-text);">\${author}</span>
                    <h3 class="card-title-text">\${esc(item.title)}</h3>
                  </div>
                  <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                </div>
                \${showSummary ? \`<p class="card-summary-desc" style="margin-top: 0.35rem;">\${summary}</p>\` : ''}
                \${showDeliverable ? \`
                  <div class="callout-deliverable" style="margin-top: 0.5rem;">
                    <i data-lucide="zap"></i>
                    <span><strong>O que entrega:</strong> \${deliverableText}</span>
                  </div>\` : ''}
                \${showExample ? \`
                  <div class="callout-example" style="margin-top: 0.4rem;">
                    <i data-lucide="lightbulb"></i>
                    <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                  </div>\` : ''}
              </div>
              <div class="card-foot-actions">
                <span style="font-size:0.7rem; color:var(--faint);">📸 Carrossel</span>
                <div class="card-button-links">
                  <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
                  <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir no Instagram" aria-label="Abrir no Instagram"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
                </div>
              </div>
            </div>
          </article>
        \`;
      }

      // D. FERRAMENTAS WEB E CONHECIMENTO
      const favicon = getItemFavicon(item.url);
      const isDoc = item.kind === 'conhecimento' || item.kind === 'diretório';
      return \`
        <article class="card-item" data-id="\${esc(item.id)}">
          <div class="card-content-body">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.6rem;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius); background: var(--surface2); border: 1px solid var(--border-color); display: grid; place-items: center; overflow: hidden;">
                  \${isDoc 
                    ? \`<i data-lucide="book-open" style="width:18px;height:18px;color:var(--text);"></i>\` 
                    : \`<img src="\${favicon}" alt="" style="width:20px;height:20px;object-fit:contain;" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'">\`}
                </div>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span class="meta-chip-tag">\${esc(item.segment)}</span>
                  <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                </div>
              </div>

              <h3 class="card-title-text">\${esc(item.title)}</h3>
              \${showSummary ? \`<p class="card-summary-desc" style="margin-top: 0.35rem;">\${summary}</p>\` : ''}

              \${showDeliverable ? \`
                <div class="callout-deliverable" style="margin-top: 0.5rem;">
                  <i data-lucide="zap"></i>
                  <span><strong>O que entrega:</strong> \${deliverableText}</span>
                </div>\` : ''}

              \${showExample ? \`
                <div class="callout-example" style="margin-top: 0.4rem;">
                  <i data-lucide="lightbulb"></i>
                  <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                </div>\` : ''}
            </div>

            <div class="card-foot-actions">
              <div class="card-chips-group">
                \${item.tags.slice(0, 3).map(t => \`<span class="meta-chip-tag" data-tag="\${esc(t)}">#\${esc(t)}</span>\`).join('')}
              </div>
              <div class="card-button-links">
                <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
                <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Acessar Ferramenta" aria-label="Acessar Ferramenta"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
              </div>
            </div>
          </div>
        </article>
      \`;
    }).join('');
  }

  $('#resultCount').textContent = \`Exibindo \${items.length} de \${state.items.length} recursos\`;
  updateKpis();
  lucide.createIcons();
  attachCardEvents();
}

function attachCardEvents() {
  $$('.card-item, .list-row-item, .tile-button-card').forEach(card => {
    card.onclick = e => {
      if (e.target.closest('.card-favorite-toggle') || e.target.closest('.icon-action-btn') || e.target.closest('.meta-chip-tag')) return;
      const item = state.items.find(x => x.id === card.dataset.id);
      if (item) openDetailModal(item);
    };
  });

  $$('.card-favorite-toggle').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.favId);
    };
  });

  $$('.btn-copy').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      navigator.clipboard.writeText(btn.dataset.url).then(() => showToast('Link copiado com sucesso!'));
    };
  });

  $$('.meta-chip-tag[data-tag]').forEach(tag => {
    tag.onclick = e => {
      e.stopPropagation();
      filterByTag(tag.dataset.tag);
    };
  });
}

// MODAL DE DETALHES MULTIMÍDIA
function openDetailModal(item) {
  state.selectedItem = item;
  state.currentSlideIndex = 0;
  const mediaContainer = $('#modalMediaContainer');

  // VÍDEO: Player Embutido Responsivo Proporcional
  const ytId = item.youtubeId || extractYouTubeId(item.url);
  if (item.kind === 'vídeo' || ytId) {
    mediaContainer.className = 'modal-media-wrap has-video';
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = \`<iframe src="https://www.youtube.com/embed/\${ytId}?autoplay=1&rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>\`;
  }
  // CARROSSEL: Slider de Imagens
  else if (item.kind === 'carrossel' && Array.isArray(item.slides) && item.slides.length) {
    mediaContainer.className = 'modal-media-wrap';
    mediaContainer.style.display = 'block';
    renderCarouselSlider(item.slides);
  }
  // REPOSITÓRIO / FERRAMENTA: Sem banner desnecessário
  else {
    mediaContainer.className = 'modal-media-wrap';
    mediaContainer.style.display = 'none';
    mediaContainer.innerHTML = '';
  }

  $('#modalTitle').textContent = item.title;
  $('#modalKind').textContent = item.kind.toUpperCase();
  $('#modalSegment').textContent = item.segment;
  $('#modalDescription').textContent = item.description;
  $('#modalDeliverable').textContent = item.deliverable || item.description;
  $('#modalPracticalExample').textContent = item.practicalExample || 'Aplicável diretamente nos seus projetos e rotina profissional.';
  
  const notesWrap = $('#modalNotesWrap');
  if (item.notes) {
    notesWrap.style.display = 'block';
    $('#modalNotes').textContent = item.notes;
  } else {
    notesWrap.style.display = 'none';
  }

  $('#modalAudience').textContent = item.targetAudience || 'Qualquer pessoa';
  $('#modalLicense').textContent = item.license || 'Livre / N/A';
  $('#modalSource').textContent = item.source || 'Segundo Cérebro';
  $('#btnModalDirect').href = safeUrl(item.url);

  const isFav = storedFavorites.has(item.id);
  $('#btnModalFav').innerHTML = \`<i data-lucide="star"></i> \${isFav ? 'Remover' : 'Favoritar'}\`;

  $('#detailModal').classList.add('open');
  const dialog = document.querySelector('.modal-dialog');
  if (dialog) dialog.scrollTop = 0;
  lucide.createIcons();
}

function renderCarouselSlider(slides) {
  const container = $('#modalMediaContainer');
  const currentImg = slides[state.currentSlideIndex] || slides[0];

  container.innerHTML = \`
    <div class="carousel-slider-view">
      <img id="carouselSlideImg" src="\${currentImg}" alt="Slide">
      \${slides.length > 1 ? \`
        <button class="slider-btn prev" id="btnSlidePrev" aria-label="Slide anterior"><i data-lucide="chevron-left"></i></button>
        <button class="slider-btn next" id="btnSlideNext" aria-label="Próximo slide"><i data-lucide="chevron-right"></i></button>
        <span class="slider-counter" id="slideCounter">Slide \${state.currentSlideIndex + 1} de \${slides.length}</span>
      \` : ''}
    </div>
  \`;

  if (slides.length > 1) {
    $('#btnSlidePrev').onclick = () => {
      state.currentSlideIndex = (state.currentSlideIndex - 1 + slides.length) % slides.length;
      renderCarouselSlider(slides);
    };
    $('#btnSlideNext').onclick = () => {
      state.currentSlideIndex = (state.currentSlideIndex + 1) % slides.length;
      renderCarouselSlider(slides);
    };
  }
}

function closeDetailModal() {
  $('#detailModal').classList.remove('open');
  $('#modalMediaContainer').innerHTML = '';
}

function toggleFavorite(id) {
  if (storedFavorites.has(id)) {
    storedFavorites.delete(id);
    showToast('Removido dos favoritos');
  } else {
    storedFavorites.add(id);
    showToast('Adicionado aos favoritos ⭐');
  }
  localStorage.setItem('nexus_favorites', JSON.stringify([...storedFavorites]));
  renderCards();
}

function filterByTag(tag) {
  state.activeTag = tag;
  $('#activeTagName').textContent = \`#\${tag}\`;
  $('#activeTagBar').classList.add('show');
  renderCards();
}

function clearTagFilter() {
  state.activeTag = null;
  $('#activeTagBar').classList.remove('show');
  renderCards();
}

function resetAllFilters() {
  state.kind = 'all';
  state.segment = 'all';
  state.activeTag = null;
  state.q = '';
  $('#searchInput').value = '';
  $('#activeTagBar').classList.remove('show');
  syncFilterControls();
  renderCards();
}

function syncFilterControls() {
  $$('#categoryTabs .segment-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('.nav-btn[data-kind]').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('.filter-chip-item').forEach(b => {
    b.classList.toggle('active', b.dataset.segment === state.segment);
  });
}

function updateKpis() {
  const all = state.items;
  $('#kpiTotal').textContent = all.length;
  $('#kpiVideos').textContent = all.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  $('#kpiRepos').textContent = all.filter(x => x.kind === 'repositório').length;
  $('#kpiCarousels').textContent = all.filter(x => x.kind === 'carrossel').length;
  $('#kpiFavs').textContent = storedFavorites.size;

  $('#countAll').textContent = all.length;
  $('#countVideo').textContent = all.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  $('#countRepo').textContent = all.filter(x => x.kind === 'repositório').length;
  $('#countCarousel').textContent = all.filter(x => x.kind === 'carrossel').length;
  $('#countTool').textContent = all.filter(x => x.kind === 'ferramenta').length;
  $('#countDoc').textContent = all.filter(x => x.kind === 'conhecimento' || x.kind === 'diretório').length;
  $('#countFav').textContent = storedFavorites.size;

  renderSegmentList();
  renderQueuePreview();
}

function renderSegmentList() {
  const counts = {};
  state.items.forEach(x => {
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
  }).join('');

  $$('.segment-row').forEach(row => {
    row.onclick = () => {
      state.segment = state.segment === row.dataset.segment ? 'all' : row.dataset.segment;
      syncFilterControls();
      renderCards();
    };
  });
}

function renderQueuePreview() {
  const vids = state.items.filter(x => x.youtubeId).slice(0, 3);
  $('#videoQueue').innerHTML = vids.map(v => \`
    <div style="display: flex; gap: 0.6rem; align-items: center; cursor: pointer; padding: 0.35rem 0.5rem; border-radius: 4px; background: var(--surface2);" onclick="openDetailModal(state.items.find(x => x.id === '\${v.id}'))">
      <img src="https://img.youtube.com/vi/\${v.youtubeId}/hqdefault.jpg" style="width: 54px; aspect-ratio: 16/9; object-fit: cover; border-radius: 4px;" alt="">
      <span style="font-size: 0.72rem; font-weight: 600; color: var(--text); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">\${esc(v.title)}</span>
    </div>
  \`).join('');
}

function showToast(msg) {
  const toast = $('#toast');
  $('#toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

// SINCRONIZAÇÃO DAS OPÇÕES NO POPOVER DE CUSTOMIZAÇÃO
function syncCustomizerUi() {
  // Modo de exibição
  $$('.view-toggle-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === uiPrefs.viewMode);
  });
  // Colunas
  $$('#colCluster .customizer-option-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cols === uiPrefs.gridCols);
  });
  // Thumbnails
  $$('#thumbCluster .customizer-option-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.thumb === uiPrefs.thumbSize);
  });
  // Detalhe
  $$('#detailCluster .customizer-option-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.detail === uiPrefs.detailLevel);
  });
  // Espaçamento
  $$('#gapCluster .customizer-option-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.gap === uiPrefs.gapSize);
  });
}

// INICIALIZAÇÃO DE EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  syncCustomizerUi();
  renderCards();

  // 1. Alternador de Modo de Exibição
  $$('.view-toggle-btn').forEach(btn => {
    btn.onclick = () => {
      uiPrefs.viewMode = btn.dataset.mode;
      saveUiPrefs();
      syncCustomizerUi();
      renderCards();
    };
  });

  // 2. Customizer Popover Toggle & Options
  const popover = $('#customizerMenu');
  $('#btnCustomizerToggle').onclick = e => {
    e.stopPropagation();
    popover.classList.toggle('open');
  };

  $('#btnCloseCustomizer').onclick = () => popover.classList.remove('open');

  document.addEventListener('click', e => {
    if (!e.target.closest('.customizer-popover-wrap')) {
      popover.classList.remove('open');
    }
  });

  // Colunas
  $$('#colCluster .customizer-option-btn').forEach(btn => {
    btn.onclick = () => {
      uiPrefs.gridCols = btn.dataset.cols;
      saveUiPrefs();
      syncCustomizerUi();
      renderCards();
    };
  });

  // Thumbnails
  $$('#thumbCluster .customizer-option-btn').forEach(btn => {
    btn.onclick = () => {
      uiPrefs.thumbSize = btn.dataset.thumb;
      saveUiPrefs();
      syncCustomizerUi();
      renderCards();
    };
  });

  // Detalhes
  $$('#detailCluster .customizer-option-btn').forEach(btn => {
    btn.onclick = () => {
      uiPrefs.detailLevel = btn.dataset.detail;
      saveUiPrefs();
      syncCustomizerUi();
      renderCards();
    };
  });

  // Espaçamento
  $$('#gapCluster .customizer-option-btn').forEach(btn => {
    btn.onclick = () => {
      uiPrefs.gapSize = btn.dataset.gap;
      saveUiPrefs();
      syncCustomizerUi();
      renderCards();
    };
  });

  // Restaurar Padrão
  $('#btnResetPrefs').onclick = () => {
    uiPrefs = { ...defaultPrefs };
    saveUiPrefs();
    syncCustomizerUi();
    renderCards();
    showToast('Preferências restauradas!');
  };

  // 3. Segmented Tabs de Formato
  $$('#categoryTabs .segment-tab').forEach(btn => {
    btn.onclick = () => {
      state.kind = btn.dataset.kind;
      syncFilterControls();
      renderCards();
    };
  });

  // 4. Sidebar Nav Pills
  $$('.nav-btn[data-kind]').forEach(btn => {
    btn.onclick = () => {
      state.kind = btn.dataset.kind;
      syncFilterControls();
      renderCards();
      if (window.innerWidth <= 767) $('.sidebar').classList.remove('open');
    };
  });

  // 5. Filtro por Chips de Segmento
  $$('.filter-chip-item').forEach(chip => {
    chip.onclick = () => {
      state.segment = chip.dataset.segment;
      syncFilterControls();
      renderCards();
    };
  });

  // 6. Ordenação
  $('#sortSelect').onchange = e => {
    state.sort = e.target.value;
    renderCards();
  };

  // 7. Busca em Tempo Real
  $('#searchInput').oninput = e => {
    state.q = e.target.value;
    renderCards();
  };

  // Limpar Tag
  $('#btnClearTag').onclick = clearTagFilter;

  // Tema Claro / Escuro
  $('#btnTheme').onclick = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nexus_theme', next);
    $('#btnTheme').innerHTML = \`<i data-lucide="\${next === 'dark' ? 'sun' : 'moon'}"></i>\`;
    lucide.createIcons();
  };

  // Menu Mobile
  $('#btnMenu').onclick = () => $('.sidebar').classList.toggle('open');

  // Modais Close
  $('#btnModalClose').onclick = closeDetailModal;
  $('#detailModal').onclick = e => { if (e.target === $('#detailModal')) closeDetailModal(); };
  $('#btnAddModalClose').onclick = () => $('#addModal').classList.remove('open');
  $('#addModal').onclick = e => { if (e.target === $('#addModal')) $('#addModal').classList.remove('open'); };
  $('#btnAddTop').onclick = () => $('#addModal').classList.add('open');
  $('#btnModalFav').onclick = () => {
    if (state.selectedItem) {
      toggleFavorite(state.selectedItem.id);
      const isFav = storedFavorites.has(state.selectedItem.id);
      $('#btnModalFav').innerHTML = \`<i data-lucide="star"></i> \${isFav ? 'Remover' : 'Favoritar'}\`;
      lucide.createIcons();
    }
  };
  $('#btnModalCopy').onclick = () => {
    if (state.selectedItem) {
      navigator.clipboard.writeText(state.selectedItem.url).then(() => showToast('Link copiado!'));
    }
  };

  // Modal API
  $('#btnOpenApi').onclick = () => $('#apiModal').classList.add('open');
  $('#btnApiModalClose').onclick = () => $('#apiModal').classList.remove('open');
  $('#apiModal').onclick = e => { if (e.target === $('#apiModal')) $('#apiModal').classList.remove('open'); };
  $('#btnCopyApiUrl').onclick = () => {
    navigator.clipboard.writeText(window.location.origin + '/data/catalog.json').then(() => showToast('Endpoint da API copiado!'));
  };

  // Exportar Acervo
  $('#btnExportJson').onclick = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ meta: seedCatalog.meta, items: state.items }, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', \`nexus_acervo_export_\${new Date().toISOString().split('T')[0]}.json\`);
    dl.click();
    showToast('Acervo JSON exportado!');
  };

  // Command Palette (⌘K)
  const cmdOverlay = $('#cmdOverlay');
  const cmdInput = $('#cmdInput');
  const cmdList = $('#cmdList');

  function openCmd() {
    cmdOverlay.classList.add('open');
    cmdInput.value = '';
    renderCmdResults('');
    setTimeout(() => cmdInput.focus(), 50);
  }

  function closeCmd() {
    cmdOverlay.classList.remove('open');
  }

  function renderCmdResults(q) {
    const qNorm = normalizeStr(q);
    const results = state.items.filter(x => !qNorm || normalizeStr([x.title, x.deliverable, x.segment, ...x.tags].join(' ')).includes(qNorm)).slice(0, 8);
    cmdList.innerHTML = results.map(item => \`
      <div class="cmd-item-row" data-id="\${item.id}">
        <div>
          <strong style="color:var(--text);font-size:0.85rem;">\${esc(item.title)}</strong>
          <span style="display:block;font-size:0.72rem;color:var(--muted-text);">\${esc(item.deliverable || item.description)}</span>
        </div>
        <span class="meta-chip-tag" style="text-transform:uppercase;">\${esc(item.kind)}</span>
      </div>
    \`).join('');

    $$('.cmd-item-row').forEach(row => {
      row.onclick = () => {
        const item = state.items.find(x => x.id === row.dataset.id);
        if (item) {
          closeCmd();
          openDetailModal(item);
        }
      };
    });
  }

  $('#btnKbdTrigger').onclick = openCmd;
  cmdInput.oninput = e => renderCmdResults(e.target.value);
  cmdOverlay.onclick = e => { if (e.target === cmdOverlay) closeCmd(); };

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCmd();
    }
    if (e.key === 'Escape') {
      closeDetailModal();
      closeCmd();
      $('#addModal').classList.remove('open');
      $('#apiModal').classList.remove('open');
      popover.classList.remove('open');
    }
  });

  // Formulário Salvar no Acervo
  const addKindSelect = $('select[name="kind"]');
  const carouselGroup = $('#carouselFieldsGroup');
  addKindSelect.onchange = () => {
    carouselGroup.style.display = addKindSelect.value === 'carrossel' ? 'grid' : 'none';
  };

  $('#btnAddCancel').onclick = () => $('#addModal').classList.remove('open');
  $('#addItemForm').onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const kind = fd.get('kind');
    const url = fd.get('url').trim();
    const ytId = kind === 'vídeo' ? extractYouTubeId(url) : null;
    const slides = kind === 'carrossel' ? fd.get('slides').split('\\n').map(s => s.trim()).filter(Boolean) : [];

    const newItem = {
      id: \`custom-\${Date.now()}\`,
      title: fd.get('title').trim(),
      kind: kind,
      segment: fd.get('segment'),
      url: url,
      description: fd.get('description').trim(),
      deliverable: fd.get('deliverable').trim() || fd.get('description').trim(),
      practicalExample: fd.get('practicalExample').trim(),
      targetAudience: fd.get('targetAudience').trim() || 'Qualquer pessoa',
      tags: fd.get('tags').split(',').map(t => t.trim()).filter(Boolean),
      youtubeId: ytId || undefined,
      slides: slides.length ? slides : undefined,
      status: 'estudo',
      year: new Date().getFullYear(),
      source: 'Nexus Segundo Cérebro',
      addedAt: new Date().toISOString().split('T')[0]
    };

    state.items.unshift(newItem);
    const customList = JSON.parse(localStorage.getItem('nexus_custom_items') || '[]');
    customList.unshift(newItem);
    localStorage.setItem('nexus_custom_items', JSON.stringify(customList));

    e.target.reset();
    $('#addModal').classList.remove('open');
    renderCards();
    showToast('Recurso salvo no Acervo com sucesso!');
  };
});
`;

html = beforeScript + newScript + afterScript;

// Write to files
fs.writeFileSync(filePath, html, 'utf8');
fs.writeFileSync(indexPath, html, 'utf8');

console.log('Build completed! nexus-acervo.html and index.html successfully updated.');
