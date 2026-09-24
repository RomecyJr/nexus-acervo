import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const fileName of files) {
  let content = fs.readFileSync(fileName, 'utf8');

  // 1. ATUALIZA CSS DE FILTROS E BANNER
  const targetCssAnchor = '/* FILTRO CHIPS HORIZONTAIS */';
  const newCss = `/* FILTRO CHIPS HORIZONTAIS SHADCN PILLS */
.filter-chips-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.75rem;
  margin-bottom: 0.4rem;
  padding: 2px 0;
}

.filter-chip-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 32px;
  padding: 0 0.8rem;
  border-radius: 9999px;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  font-size: 0.76rem;
  font-weight: 500;
  color: var(--muted-text);
  cursor: pointer;
  transition: all var(--trans);
  white-space: nowrap;
  user-select: none;
  line-height: 1;
  box-sizing: border-box;
}

.filter-chip-item:hover {
  border-color: var(--border-strong);
  color: var(--text);
  background: var(--surface3);
}

.filter-chip-item.active {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.filter-chip-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem 0.4rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  margin-left: 0.2rem;
}

.filter-chip-item.active .filter-chip-count {
  background: rgba(0, 0, 0, 0.2);
  color: inherit;
}

/* BANNER DE FILTRO ATIVO VALIDADO (SHADCN ALERT STYLE) */
.active-tag-banner {
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  padding: 0.55rem 0.85rem;
  border-radius: var(--radius);
  margin-top: 0.65rem;
  margin-bottom: 0.75rem;
  animation: fadeIn 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

.active-tag-banner.show {
  display: flex !important;
}

.filter-tag-pill {
  display: inline-flex;
  align-items: center;
  background: var(--surface3);
  border: 1px solid var(--border-strong);
  color: var(--text);
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.35rem;
}

.clear-tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--surface);
  border: 1px solid var(--border-color);
  color: var(--muted-text);
  padding: 0.25rem 0.65rem;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--trans);
}

.clear-tag-btn:hover {
  border-color: var(--destructive);
  color: #f87171;
  background: rgba(239, 68, 68, 0.08);
}`;

  if (content.includes(targetCssAnchor)) {
    const cssStart = content.indexOf(targetCssAnchor);
    const cssEnd = content.indexOf('/* WORKSPACE GRID */', cssStart);
    if (cssEnd !== -1) {
      content = content.slice(0, cssStart) + newCss + '\n\n' + content.slice(cssEnd);
    }
  }

  // 2. ATUALIZA O HTML DO CONTAINER DE CHIPS E DO BANNER
  const targetHtmlStart = '<!-- FILTROS POR CHIP INLINE -->';
  const targetHtmlEnd = '<!-- WORKSPACE -->';
  const newHtmlBlock = `<!-- FILTROS POR CHIP DINÂMICOS (SHADCN PILLS) -->
      <div class="filter-chips-row" id="segmentChipsContainer" aria-label="Filtro por segmento"></div>

      <!-- BANNER DE FILTRO ATIVO VALIDADO -->
      <div class="active-tag-banner" id="activeTagBar" role="region" aria-live="polite">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.825rem; color: var(--text);">
          <i data-lucide="tag" style="width: 14px; height: 14px; color: var(--muted-text);"></i>
          <span>Filtrando pela tag: <strong class="filter-tag-pill" id="activeTagName"></strong></span>
        </div>
        <button class="clear-tag-btn" id="btnClearTag" aria-label="Limpar filtro de tag">
          <i data-lucide="x" style="width: 12px; height: 12px;"></i>
          <span>Limpar filtro</span>
        </button>
      </div>

      `;

  const hStart = content.indexOf(targetHtmlStart);
  const hEnd = content.indexOf(targetHtmlEnd, hStart);
  if (hStart !== -1 && hEnd !== -1) {
    content = content.slice(0, hStart) + newHtmlBlock + content.slice(hEnd);
  }

  // 3. ATUALIZA AS FUNÇÕES JAVASCRIPT
  // Adiciona renderSegmentChips() e atualiza filterByTag, clearTagFilter, resetAllFilters, syncFilterControls
  const jsSegmentChipsFn = `
function renderSegmentChips() {
  const container = $('#segmentChipsContainer');
  if (!container) return;

  const counts = {};
  state.items.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });

  const iconsBySegment = {
    'Design e UX': '🎨',
    'IA e automação': '🤖',
    'Conteúdo e mídia': '🎬',
    'Produtividade': '⚡',
    'Aprendizado': '🧠',
    'Métricas de negócio': '📈',
    'Importação': '📦',
    'Desenvolvimento': '💻',
    'Dados e APIs': '📊',
    'Infraestrutura': '☁️',
    'OSINT e pesquisa': '🔍',
    'Negócios': '💼'
  };

  const allActive = state.segment === 'all' ? 'active' : '';
  let html = \`<button class="filter-chip-item \${allActive}" data-segment="all" aria-label="Todos os segmentos">
    <span>Todos os segmentos</span>
    <span class="filter-chip-count">\${state.items.length}</span>
  </button>\`;

  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([seg, count]) => {
    const isActive = state.segment === seg ? 'active' : '';
    const icon = iconsBySegment[seg] || '📁';
    html += \`<button class="filter-chip-item \${isActive}" data-segment="\${esc(seg)}" aria-label="Segmento \${esc(seg)}">
      <span>\${icon} \${esc(seg)}</span>
      <span class="filter-chip-count">\${count}</span>
    </button>\`;
  });

  container.innerHTML = html;

  $$('#segmentChipsContainer .filter-chip-item').forEach(chip => {
    chip.onclick = () => {
      state.segment = state.segment === chip.dataset.segment ? 'all' : chip.dataset.segment;
      syncFilterControls();
      renderCards();
    };
  });
}
`;

  // Substitui syncFilterControls, renderSegmentList, filterByTag, clearTagFilter, resetAllFilters
  const targetSyncStart = 'function syncFilterControls() {';
  const targetSyncEnd = 'function updateKpis() {';
  const sStart = content.indexOf(targetSyncStart);
  const sEnd = content.indexOf(targetSyncEnd, sStart);

  if (sStart !== -1 && sEnd !== -1) {
    const newSyncBlock = `function syncFilterControls() {
  $$('#categoryTabs .segment-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('.nav-btn[data-kind]').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('#segmentChipsContainer .filter-chip-item').forEach(b => {
    b.classList.toggle('active', b.dataset.segment === state.segment);
  });
  $$('.segment-row').forEach(row => {
    row.classList.toggle('active', row.dataset.segment === state.segment);
  });
}

function filterByTag(tag) {
  state.activeTag = tag;
  $('#activeTagName').textContent = \`#\${tag}\`;
  $('#activeTagBar').classList.add('show');
  lucide.createIcons();
  renderCards();
  showToast(\`Filtrando pela tag #\${tag}\`);
}

function clearTagFilter() {
  state.activeTag = null;
  $('#activeTagName').textContent = '';
  $('#activeTagBar').classList.remove('show');
  renderCards();
  showToast('Filtro de tag removido');
}

function resetAllFilters() {
  state.kind = 'all';
  state.segment = 'all';
  state.activeTag = null;
  state.q = '';
  $('#searchInput').value = '';
  $('#activeTagName').textContent = '';
  $('#activeTagBar').classList.remove('show');
  syncFilterControls();
  renderCards();
  showToast('Todos os filtros foram limpos');
}
`;
    content = content.slice(0, sStart) + newSyncBlock + '\n' + content.slice(sEnd);
  }

  // Remove as antigas filterByTag, clearTagFilter, resetAllFilters que ficavam antes de syncFilterControls
  const oldFiltersStart = 'function filterByTag(tag) {';
  const oStart = content.indexOf(oldFiltersStart);
  if (oStart !== -1 && oStart < content.indexOf('function syncFilterControls()')) {
    const oEnd = content.indexOf('function syncFilterControls()', oStart);
    content = content.slice(0, oStart) + content.slice(oEnd);
  }

  // Insere renderSegmentChips() logo antes de renderSegmentList
  if (!content.includes('function renderSegmentChips()')) {
    const rIdx = content.indexOf('function renderSegmentList()');
    if (rIdx !== -1) {
      content = content.slice(0, rIdx) + jsSegmentChipsFn + '\n' + content.slice(rIdx);
    }
  }

  // Chama renderSegmentChips() em updateKpis()
  if (content.includes('renderSegmentList();') && !content.includes('renderSegmentChips();')) {
    content = content.replace('renderSegmentList();', 'renderSegmentList();\n  renderSegmentChips();');
  }

  // Garante chamada de renderSegmentChips() no DOMContentLoaded
  if (content.includes("document.addEventListener('DOMContentLoaded', () => {") && !content.includes('renderSegmentChips();\n  syncCustomizerUi();')) {
    content = content.replace("document.addEventListener('DOMContentLoaded', () => {\n  syncCustomizerUi();", "document.addEventListener('DOMContentLoaded', () => {\n  renderSegmentChips();\n  syncCustomizerUi();");
  }

  // Garante binding de #btnClearTag no DOMContentLoaded
  if (content.includes("$('#btnClearTag').onclick = clearTagFilter;") === false) {
    content = content.replace("renderCards();\n  };", "renderCards();\n  };\n\n  $('#btnClearTag').onclick = clearTagFilter;");
  }

  fs.writeFileSync(fileName, content, 'utf8');
  console.log(`Atualizado com sucesso: ${fileName}`);
}
