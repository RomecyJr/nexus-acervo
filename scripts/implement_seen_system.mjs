import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const fileName of files) {
  let content = fs.readFileSync(fileName, 'utf8');

  // 1. CSS PARA O SISTEMA DE VISTO / NÃO VISTO
  const cssAnchor = '/* WORKSPACE GRID */';
  const newCss = `
/* --- SISTEMA DE VISTO / NÃO VISTO (INBOX ZERO DE CONTEÚDO) --- */
.card-seen-toggle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--faint);
  background: var(--surface2);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--trans);
  flex-shrink: 0;
}

.card-seen-toggle:hover {
  color: #10b981;
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  transform: scale(1.08);
}

.card-seen-toggle.is-seen {
  color: #ffffff;
  background: #059669;
  border-color: #059669;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.35);
}

.card-seen-toggle.is-seen:hover {
  background: #047857;
  border-color: #047857;
}

.seen-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.12rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.66rem;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* TOGGLE GROUP DE STATUS (TODOS / NÃO VISTOS / VISTOS) */
.status-toggle-group {
  display: inline-flex;
  align-items: center;
  background: var(--surface2);
  padding: 0.2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  gap: 0.2rem;
}

.status-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.65rem;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--muted-text);
  cursor: pointer;
  transition: all var(--trans);
  white-space: nowrap;
}

.status-toggle-btn:hover {
  color: var(--text);
}

.status-toggle-btn.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.status-toggle-btn.active[data-read="unseen"] {
  color: #60a5fa;
}

.status-toggle-btn.active[data-read="seen"] {
  color: #34d399;
}

.btn-seen-active {
  background: #059669 !important;
  color: #ffffff !important;
  border-color: #059669 !important;
}

.card-item.is-item-seen {
  border-color: rgba(16, 185, 129, 0.2);
}

`;

  if (content.includes(cssAnchor) && !content.includes('SISTEMA DE VISTO / NÃO VISTO')) {
    content = content.replace(cssAnchor, newCss + '\n' + cssAnchor);
  }

  // 2. ADICIONA KPI DE VISTOS NO HEADER EXECUTIVO
  const kpiTarget = '<div class="stat-chip"><i data-lucide="star" style="width:13px;height:13px;color:#f59e0b;"></i> <strong id="kpiFavs">0</strong> favoritos</div>';
  const kpiSeen = `<div class="stat-chip"><i data-lucide="check-circle-2" style="width:13px;height:13px;color:#10b981;"></i> <strong id="kpiSeen">0</strong> vistos</div>`;

  if (content.includes(kpiTarget) && !content.includes('id="kpiSeen"')) {
    content = content.replace(kpiTarget, kpiTarget + '\n          ' + kpiSeen);
  }

  // 3. ADICIONA OPÇÕES DE VISTOS E PENDENTES NA SIDEBAR ESQUERDA
  const sidebarNavTarget = '<button class="nav-btn" data-kind="favorites" aria-label="Recursos salvos nos favoritos">';
  const sidebarNavSeen = `<button class="nav-btn" data-read="unseen" aria-label="Conteúdos pendentes que ainda não vi">
            <span class="nav-btn-inner"><i data-lucide="inbox"></i> A Estudar (Não Vistos)</span>
            <span class="nav-count" id="countUnseen">0</span>
          </button>
          <button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos e já assistidos">
            <span class="nav-btn-inner"><i data-lucide="check-circle-2" style="color:#10b981;"></i> Já Vistos (Concluídos)</span>
            <span class="nav-count" id="countSeen">0</span>
          </button>
          `;

  if (content.includes(sidebarNavTarget) && !content.includes('data-read="unseen"')) {
    content = content.replace(sidebarNavTarget, sidebarNavSeen + sidebarNavTarget);
  }

  // 4. ADICIONA STATUS TOGGLE GROUP NA BARRA SUPERIOR DE CONTROLES
  const toolbarTarget = '<div class="segmented-control" id="categoryTabs">';
  const statusGroupHtml = `<!-- FILTRO DE ESTADO INBOX ZERO (TODOS / NÃO VISTOS / VISTOS) -->
        <div class="status-toggle-group" id="readStatusGroup" role="group" aria-label="Filtrar por status de visualização" style="margin-bottom: 0.5rem;">
          <button class="status-toggle-btn active" data-read="all" aria-label="Todos os recursos (vistos e não vistos)"><i data-lucide="layers" style="width:13px;height:13px;"></i> Todos (<span id="statusCountAll">0</span>)</button>
          <button class="status-toggle-btn" data-read="unseen" aria-label="Apenas o que ainda não vi"><i data-lucide="inbox" style="width:13px;height:13px;"></i> Não Vistos (<span id="statusCountUnseen">0</span>)</button>
          <button class="status-toggle-btn" data-read="seen" aria-label="Apenas o que já assisti ou verifiquei"><i data-lucide="check-circle-2" style="width:13px;height:13px;"></i> Vistos (<span id="statusCountSeen">0</span>)</button>
        </div>

        `;

  if (content.includes(toolbarTarget) && !content.includes('id="readStatusGroup"')) {
    content = content.replace(toolbarTarget, statusGroupHtml + toolbarTarget);
  }

  // 5. ADICIONA BOTÃO DE "MARCAR COMO VISTO" NO MODAL DE DETALHES
  const modalFavTarget = '<button class="btn secondary" id="btnModalFav"><i data-lucide="star"></i> Favoritar</button>';
  const modalSeenBtn = `<button class="btn secondary" id="btnModalToggleSeen" aria-label="Alternar status visto"><i data-lucide="circle"></i> Marcar como Visto</button>`;

  if (content.includes(modalFavTarget) && !content.includes('id="btnModalToggleSeen"')) {
    content = content.replace(modalFavTarget, modalSeenBtn + '\n          ' + modalFavTarget);
  }

  // 6. ATUALIZA O ESTADO JS E AS FUNÇÕES DE FILTRAGEM E TOGGLE
  // Localiza a declaração de storedFavorites e adiciona storedSeen
  if (!content.includes('const storedSeen =')) {
    content = content.replace(
      "const storedFavorites = new Set(JSON.parse(localStorage.getItem('nexus_favorites') || '[]'));",
      "const storedFavorites = new Set(JSON.parse(localStorage.getItem('nexus_favorites') || '[]'));\nconst storedSeen = new Set(JSON.parse(localStorage.getItem('nexus_seen_items') || '[]'));"
    );
  }

  // Adiciona readFilter no objeto state
  if (!content.includes("readFilter: 'all'")) {
    content = content.replace(
      "segment: 'all',\n  activeTag: null,",
      "segment: 'all',\n  readFilter: 'all',\n  activeTag: null,"
    );
  }

  // Atualiza getFilteredItems() para aplicar o filtro de visualização (unseen / seen)
  const filterOldSnippet = "if (state.segment !== 'all' && item.segment !== state.segment) return false;";
  const filterNewSnippet = `if (state.segment !== 'all' && item.segment !== state.segment) return false;
    if (state.readFilter === 'unseen' && storedSeen.has(item.id)) return false;
    if (state.readFilter === 'seen' && !storedSeen.has(item.id)) return false;`;

  if (content.includes(filterOldSnippet) && !content.includes("state.readFilter === 'unseen'")) {
    content = content.replace(filterOldSnippet, filterNewSnippet);
  }

  // Adiciona função toggleSeen
  const toggleSeenFn = `
function toggleSeen(id) {
  const isNowSeen = !storedSeen.has(id);
  if (isNowSeen) {
    storedSeen.add(id);
    showToast('Marcado como visto ✓');
  } else {
    storedSeen.delete(id);
    showToast('Desmarcado (retornou aos pendentes)');
  }
  localStorage.setItem('nexus_seen_items', JSON.stringify([...storedSeen]));
  updateKpis();
  renderCards();

  if (state.selectedItem && state.selectedItem.id === id) {
    updateModalSeenState(id);
  }
}

function updateModalSeenState(id) {
  const isSeen = storedSeen.has(id);
  const btn = $('#btnModalToggleSeen');
  if (btn) {
    btn.innerHTML = \`<i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}"></i> \${isSeen ? 'Visto (Concluído)' : 'Marcar como Visto'}\`;
    btn.className = isSeen ? 'btn sm btn-seen-active' : 'btn secondary sm';
    lucide.createIcons();
  }
}
`;

  if (!content.includes('function toggleSeen(id)')) {
    content = content.replace('function toggleFavorite(id) {', toggleSeenFn + '\nfunction toggleFavorite(id) {');
  }

  // Atualiza updateKpis() com as contagens de vistos e pendentes
  const kpisTarget = "$('#kpiFavs').textContent = storedFavorites.size;";
  const kpisSeenUpdate = `$('#kpiFavs').textContent = storedFavorites.size;
  const seenCount = all.filter(x => storedSeen.has(x.id)).length;
  const unseenCount = all.length - seenCount;
  $('#kpiSeen').textContent = seenCount;
  $('#countSeen').textContent = seenCount;
  $('#countUnseen').textContent = unseenCount;
  $('#statusCountAll').textContent = all.length;
  $('#statusCountUnseen').textContent = unseenCount;
  $('#statusCountSeen').textContent = seenCount;`;

  if (content.includes(kpisTarget) && !content.includes('const seenCount =')) {
    content = content.replace(kpisTarget, kpisSeenUpdate);
  }

  // Atualiza renderCards() para injetar o botão de visto em todos os cards
  // Substitui a definição de isFav para const isSeen = storedSeen.has(item.id);
  content = content.replaceAll(
    'const isFav = storedFavorites.has(item.id);',
    'const isFav = storedFavorites.has(item.id);\n      const isSeen = storedSeen.has(item.id);'
  );

  // Injeta o botão .card-seen-toggle ao lado do botão de favorito nos cartões
  // No card horizontal de vídeo
  content = content.replaceAll(
    '<button class="card-favorite-toggle ${isFav ? \'is-fav\' : \'\'}" data-fav-id="${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>',
    `<div style="display:flex;align-items:center;gap:0.35rem;">
                      \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
                      <button class="card-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto / assistido'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:15px;height:15px;"></i></button>
                      <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                    </div>`
  );

  // No card de repositório
  content = content.replaceAll(
    '<span class="meta-chip-tag">${license}</span>\n                    <button class="card-favorite-toggle ${isFav ? \'is-fav\' : \'\'}" data-fav-id="${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>',
    `<span class="meta-chip-tag">\${license}</span>
                    \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
                    <button class="card-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Verificado / Auditado (clique para desmarcar)' : 'Marcar como visto / auditado'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:15px;height:15px;"></i></button>
                    <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>`
  );

  // No card de lista executiva
  content = content.replaceAll(
    '<div class="list-col-actions">\n            <button class="card-favorite-toggle ${isFav ? \'is-fav\' : \'\'}" data-fav-id="${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>',
    `<div class="list-col-actions">
            \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
            <button class="card-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto' : 'Marcar visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:15px;height:15px;"></i></button>
            <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>`
  );

  // No modo tiles
  content = content.replaceAll(
    '<span class="card-favorite-toggle ${isFav ? \'is-fav\' : \'\'}" data-fav-id="${esc(item.id)}" style="margin-left: auto;" aria-label="Favoritar"><i data-lucide="star" style="width:13px;height:13px;"></i></span>',
    `<div style="display:flex;align-items:center;gap:0.3rem;margin-left:auto;">
            <button class="card-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" style="width:20px;height:20px;" title="\${isSeen ? 'Visto' : 'Marcar visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:11px;height:11px;"></i></button>
            <span class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:13px;height:13px;"></i></span>
          </div>`
  );

  // Injeta eventos no attachCardEvents
  const attachAnchor = "$$('.card-favorite-toggle').forEach(btn => {";
  const seenEventBinding = `$$('.card-seen-toggle').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      toggleSeen(btn.dataset.seenId);
    };
  });\n\n  `;

  if (content.includes(attachAnchor) && !content.includes("$$('.card-seen-toggle')")) {
    content = content.replace(attachAnchor, seenEventBinding + attachAnchor);
  }

  // Previne click no card ao clicar em .card-seen-toggle
  content = content.replace(
    "if (e.target.closest('.card-favorite-toggle') ||",
    "if (e.target.closest('.card-seen-toggle') || e.target.closest('.card-favorite-toggle') ||"
  );

  // No openDetailModal, atualiza botão de visto
  const openModalAnchor = "$('#btnModalFav').innerHTML =";
  const openModalSeen = `updateModalSeenState(item.id);
  `;
  if (content.includes(openModalAnchor) && !content.includes('updateModalSeenState(item.id);')) {
    content = content.replace(openModalAnchor, openModalSeen + openModalAnchor);
  }

  // No DOMContentLoaded, vincula alternador de status superior e sidebar
  const domLoadedTarget = "document.addEventListener('DOMContentLoaded', () => {";
  const domLoadedBindings = `
  // Alternador de Leitura (Inbox Zero: Todos / Não Vistos / Vistos)
  $$('#readStatusGroup .status-toggle-btn').forEach(btn => {
    btn.onclick = () => {
      $$('#readStatusGroup .status-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.readFilter = btn.dataset.read;
      $$('.nav-btn[data-read]').forEach(nb => nb.classList.toggle('active', nb.dataset.read === state.readFilter));
      renderCards();
    };
  });

  // Nav pills da Sidebar com data-read
  $$('.nav-btn[data-read]').forEach(btn => {
    btn.onclick = () => {
      state.readFilter = btn.dataset.read;
      state.kind = 'all';
      $$('#readStatusGroup .status-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.read === state.readFilter));
      $$('.nav-btn').forEach(nb => nb.classList.remove('active'));
      btn.classList.add('active');
      renderCards();
      if (window.innerWidth <= 767) $('.sidebar').classList.remove('open');
    };
  });

  $('#btnModalToggleSeen').onclick = () => {
    if (state.selectedItem) {
      toggleSeen(state.selectedItem.id);
    }
  };
`;

  if (content.includes(domLoadedTarget) && !content.includes('#readStatusGroup .status-toggle-btn')) {
    content = content.replace(domLoadedTarget, domLoadedTarget + domLoadedBindings);
  }

  fs.writeFileSync(fileName, content, 'utf8');
  console.log(`Sistema de Visto / Não Visto implementado com sucesso em: ${fileName}`);
}
