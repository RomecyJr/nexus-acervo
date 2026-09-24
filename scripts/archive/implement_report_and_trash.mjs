import fs from 'node:fs';

const catalogFile = new URL('../data/catalog.json', import.meta.url);
const htmlFile = new URL('../nexus-acervo.html', import.meta.url);

// -------------------------------------------------------------
// 1. ATUALIZAÇÃO DO CATÁLOGO DE DADOS (data/catalog.json)
// -------------------------------------------------------------
const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));

// 1.1 Novos itens do Relatório
const newItems = [
  {
    id: "conhecimento-metodo-10-dias",
    title: "Processo de 10 Dias de Mudança e Identidade — Carl Jung & Clube Natural",
    kind: "conhecimento",
    segment: "Conhecimento & Hacks",
    url: "https://www.instagram.com/reel/Db81e33RPDM/?stkn=d2Q4NjN4OGE5am56",
    description: "Método prático de 10 dias baseado em princípios junguianos para transformar objetivos vagos em uma direção concreta de mudança de identidade e hábitos por meio de ação deliberada e repetição contínua.",
    deliverable: "Framework em 4 etapas: questionamento profundo ('O que desejaria se parasse de fingir que não desejo?'), visualização sensorial da experiência concreta, alinhamento com a identidade capaz de sustentar o resultado e compromisso diário de 10 dias de pequenas ações coerentes.",
    practicalExample: "Substitua a meta abstrata 'quero ser produtivo' pela descrição vívida 'acordo sem pressa, domino minha rotina matinal e executo a tarefa mais complexa antes do meio-dia', praticando esse padrão por 10 dias consecutivos sem esperar motivação prévia.",
    tags: ["Desenvolvimento Pessoal", "Psicologia", "Produtividade", "Identidade", "Hábitos"],
    status: "ativo",
    year: 2026,
    source: "@clubenatural (Instagram Reel Db81e33RPDM)",
    addedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    openAccess: true,
    author: "Clube Natural / Carl Jung"
  },
  {
    id: "conhecimento-checklist-seguranca",
    title: "Checklist de Segurança Cibernética para Extensões, IAs e Agentes Autônomos",
    kind: "conhecimento",
    segment: "Conhecimento & Hacks",
    url: "https://importhelper.com/privacy-policy/",
    description: "Protocolo operacional rigoroso de auditoria e segurança da informação antes de conceder permissões a extensões de navegador, conectar chaves de API em ferramentas de terceiros ou rodar agentes de programação locais.",
    deliverable: "Checklist com 5 diretrizes vitais: validação de manifest e permissões de extensões no Chrome/Edge, armazenamento estritamente local de API keys (localStorage), isolamento de agentes autônomos em containers/VMs, verificação de políticas de retenção de dados e auditoria de tráfego de rede.",
    practicalExample: "Auditar permissões de extensões via chrome://extensions, proibir inserção de API keys do OpenAI/Gemini em páginas sem processamento client-side certificado, e rodar agentes de código (como Droids/Factory ou Manus) com credenciais com privilégios mínimos.",
    tags: ["Segurança", "Privacidade", "Extensões Web", "API Keys", "Auditoria"],
    status: "ativo",
    year: 2026,
    source: "Relatório Consolidado de Segurança de Posts",
    addedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    openAccess: true,
    author: "Nexus SecOps & DevSec"
  },
  {
    id: "repo-fcksignups",
    title: "NoSignups / F*CKSIGNUPS — Diretório de Ferramentas Web Sem Cadastro",
    kind: "repositório",
    segment: "Repositórios & Ferramentas Open Source",
    url: "https://github.com/BraveOPotato/FckSignups",
    description: "Diretório colaborativo e de código aberto reunindo centenas de utilitários e ferramentas web para desenvolvedores, designers e criadores que funcionam instantaneamente sem exigir cadastro, cartão de crédito ou login.",
    deliverable: "Acesso a mais de 260 ferramentas web zero-login catalogadas em 9 categorias (produtividade, design, dev, escrita, privacidade, dados, mídia, educação), incluindo utilitários de alta relevância como Bundlephobia, Excalidraw, drawDB, Hoppscotch e OpenCut.",
    practicalExample: "Calcular o impacto e peso de dependências npm no bundle frontend via Bundlephobia ou criar diagramas relacionais e gerar SQL no drawDB em segundos sem expor seu e-mail ou registrar contas.",
    tags: ["Open Source", "Ferramentas Web", "Privacidade", "Sem Cadastro", "Produtividade"],
    status: "ativo",
    year: 2026,
    source: "BraveOPotato (GitHub)",
    addedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    license: "Open Source",
    openAccess: true,
    author: "BraveOPotato"
  },
  {
    id: "conhecimento-cssbuy-guia",
    title: "CSSBuy — Guia Prático de Redirecionamento e Logística na China",
    kind: "conhecimento",
    segment: "Conhecimento & Hacks",
    url: "https://www.cssbuy.com/",
    description: "Guia operacional e logístico para utilização de agentes de compras e armazéns internacionais na China (Taobao, Xianyu, 1688, Weidian), com inspeção de qualidade de mercadorias, consolidação de pacotes e remessa alfandegária.",
    deliverable: "Pipeline passo a passo de compra assistida: recebimento no armazém chinês, conferência com fotos de controle de qualidade (QC Photos) em alta resolução, remoção de caixas volumosas para reduzir peso cúbico, consolidação em caixa única e suporte a desembaraço aduaneiro no Brasil.",
    practicalExample: "Comprar eletrônicos ou componentes industriais no Xianyu/Taobao via extensão ImportHelper, receber no armazém da CSSBuy em Hangzhou, solicitar fotos QC para atestar o funcionamento e consolidar 5 pedidos em um frete único para o Brasil com rastreio prioritário.",
    tags: ["Importação", "China", "E-commerce", "Logística", "CSSBuy"],
    status: "ativo",
    year: 2026,
    source: "Relatório de Importação e Logística Internacional",
    addedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    openAccess: true,
    author: "CSSBuy / ImportHelper"
  }
];

for (const item of newItems) {
  const existingIdx = catalog.items.findIndex(x => x.id === item.id);
  if (existingIdx >= 0) {
    catalog.items[existingIdx] = { ...catalog.items[existingIdx], ...item };
  } else {
    catalog.items.push(item);
  }
}

// 1.2 Enriquecimento dos 6 Repositórios com Dados Comerciais do Relatório
const repoEnrichments = {
  'repo-openbb': {
    notes: 'Substituto open-source completo para Bloomberg Terminal, Refinitiv Eikon, FactSet e plataformas de dados de mercado com assinaturas de US$ 24k+/ano. Integração direta com Python, APIs quants e agentes de IA.'
  },
  'repo-twenty': {
    notes: 'Alternativa open-source self-hosted ao Salesforce CRM e HubSpot CRM, eliminando cobrança por assento/usuário mensal (seat-based pricing). Suporta objetos personalizados, pipelines e IA.'
  },
  'repo-openvoice': {
    notes: 'Alternativa de clonagem instantânea de voz com controle granular de tom e estilo ao ElevenLabs e Resemble AI, sem custo de caracteres por API e com suporte a V2 multilíngue.'
  },
  'repo-agenticseek': {
    notes: 'Alternativa local e self-hosted a agentes autônomos proprietários em nuvem como Manus AI e Devin. Executa navegação web, terminal e código mantendo 100% da soberania de dados no dispositivo local.'
  },
  'repo-coolify': {
    notes: 'Alternativa self-hosted a Vercel, Heroku, Netlify e Render. Permite deploy de aplicações full-stack, bancos de dados e serviços em VPS própria (Hetzner, DigitalOcean, AWS) sem limites abusivos de bandwidth.'
  },
  'repo-scrapling': {
    notes: 'Alternativa de alta performance a Bright Data, ScraperAPI e Zyte. Framework adaptativo de web scraping com recuperação automática de seletores quando o layout muda, bypass inteligente e rotação de proxies.'
  }
};

for (const [id, enrich] of Object.entries(repoEnrichments)) {
  const item = catalog.items.find(x => x.id === id);
  if (item) {
    Object.assign(item, enrich);
    item.updatedAt = '2026-09-24';
  }
}

catalog.meta.generatedAt = new Date().toISOString();
fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
console.log(`✅ data/catalog.json atualizado com sucesso (${catalog.items.length} itens).`);

// -------------------------------------------------------------
// 2. ATUALIZAÇÃO DA UI & SISTEMA DE EXCLUSÃO (nexus-acervo.html)
// -------------------------------------------------------------
let html = fs.readFileSync(htmlFile, 'utf8');

// 2.1 CSS Adicional para Excluídos e Ações da Lixeira
const cssToAdd = `
.status-toggle-btn.active[data-read="deleted"] {
  color: #f87171;
}

.btn-trash-toggle {
  opacity: 0.7;
  transition: opacity 0.15s, color 0.15s, border-color 0.15s, background 0.15s;
}
.btn-trash-toggle:hover {
  opacity: 1;
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}
.btn-restore-active {
  background: rgba(16, 185, 129, 0.15) !important;
  color: #34d399 !important;
  border-color: rgba(16, 185, 129, 0.4) !important;
  opacity: 1 !important;
}
.btn-restore-active:hover {
  background: #10b981 !important;
  color: #ffffff !important;
}
.card-item.is-deleted-card {
  border-color: rgba(239, 68, 68, 0.35) !important;
  background: rgba(239, 68, 68, 0.02) !important;
}
.trash-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
`;

if (!html.includes('.btn-trash-toggle')) {
  html = html.replace('.btn-seen-active {', cssToAdd + '\n.btn-seen-active {');
}

// 2.2 Adicionar botão Excluídos no #readStatusGroup
const oldStatusGroup = `<button class="status-toggle-btn" data-read="seen" aria-label="Apenas o que já assisti ou verifiquei"><i data-lucide="check-circle-2" style="width:13px;height:13px;"></i> Vistos (<span id="statusCountSeen">0</span>)</button>`;
const newStatusGroup = `<button class="status-toggle-btn" data-read="seen" aria-label="Apenas o que já assisti ou verifiquei"><i data-lucide="check-circle-2" style="width:13px;height:13px;"></i> Vistos (<span id="statusCountSeen">0</span>)</button>
            <button class="status-toggle-btn" data-read="deleted" aria-label="Recursos excluídos da listagem"><i data-lucide="trash-2" style="width:13px;height:13px;"></i> Excluídos (<span id="statusCountDeleted">0</span>)</button>`;

if (html.includes(oldStatusGroup) && !html.includes('data-read="deleted"')) {
  html = html.replace(oldStatusGroup, newStatusGroup);
}

// 2.3 Adicionar nav-btn Excluídos na Sidebar
const oldSidebarNav = `<button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos e já assistidos">
              <span class="nav-btn-inner"><i data-lucide="check-circle-2" style="color:#10b981;"></i> Já Vistos (Concluídos)</span>
              <span class="nav-pill-count" id="countSeen">0</span>
            </button>`;
const newSidebarNav = `<button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos e já assistidos">
              <span class="nav-btn-inner"><i data-lucide="check-circle-2" style="color:#10b981;"></i> Já Vistos (Concluídos)</span>
              <span class="nav-pill-count" id="countSeen">0</span>
            </button>
            <button class="nav-btn" data-read="deleted" aria-label="Recursos descartados ou excluídos">
              <span class="nav-btn-inner"><i data-lucide="trash-2" style="color:#ef4444;"></i> Excluídos (Lixeira)</span>
              <span class="nav-pill-count" id="countDeleted">0</span>
            </button>`;

if (html.includes(oldSidebarNav) && !html.includes('id="countDeleted"')) {
  html = html.replace(oldSidebarNav, newSidebarNav);
}

// 2.4 Adicionar botão Excluir/Restaurar no Modal de Detalhes
const oldModalButtons = `<button class="btn secondary sm" id="btnModalToggleSeen" style="flex-shrink: 0;" aria-label="Marcar como visto"><i data-lucide="circle"></i> Marcar Visto</button>
        <button class="btn" id="btnModalFav" style="flex-shrink: 0;"><i data-lucide="star"></i> Salvar</button>`;
const newModalButtons = `<button class="btn secondary sm" id="btnModalToggleSeen" style="flex-shrink: 0;" aria-label="Marcar como visto"><i data-lucide="circle"></i> Marcar Visto</button>
        <button class="btn" id="btnModalFav" style="flex-shrink: 0;"><i data-lucide="star"></i> Salvar</button>
        <button class="btn secondary sm" id="btnModalTrashAction" style="flex-shrink: 0;" aria-label="Excluir ou restaurar recurso"><i data-lucide="trash-2"></i> Excluir</button>`;

if (html.includes(oldModalButtons) && !html.includes('id="btnModalTrashAction"')) {
  html = html.replace(oldModalButtons, newModalButtons);
}

// 2.5 JavaScript: Armazenamento e Funções de Exclusão
const oldStorageSection = `const storedFavorites = new Set(safeStore.get('nexus_favorites', []));
const storedSeen = new Set(safeStore.get('nexus_seen_items', []));`;

const newStorageSection = `const storedFavorites = new Set(safeStore.get('nexus_favorites', []));
const storedSeen = new Set(safeStore.get('nexus_seen_items', []));
const storedDeleted = new Set(safeStore.get('nexus_deleted_items', []));

function saveDeletedStorage() {
  localStorage.setItem('nexus_deleted_items', JSON.stringify([...storedDeleted]));
}

function deleteItem(id) {
  storedDeleted.add(id);
  saveDeletedStorage();
  if (state.selectedItem && state.selectedItem.id === id) {
    closeDetailModal();
  }
  updateKpis();
  renderCards();
  showToast('Item movido para Excluídos 🗑️');
}

function restoreItem(id) {
  storedDeleted.delete(id);
  saveDeletedStorage();
  updateKpis();
  renderCards();
  showToast('Item restaurado com sucesso! 🔄');
}`;

if (html.includes(oldStorageSection) && !html.includes('nexus_deleted_items')) {
  html = html.replace(oldStorageSection, newStorageSection);
}

// 2.6 JavaScript: Atualizar getFilteredItems com isolamento estrito
const oldGetFiltered = `// FILTRAGEM
function getFilteredItems() {
  let list = state.items.filter(item => {
    if (!matchesKind(item, state.kind)) return false;
    if (state.segment !== 'all' && item.segment !== state.segment) return false;
    if (state.readFilter === 'unseen' && storedSeen.has(item.id)) return false;
    if (state.readFilter === 'seen' && !storedSeen.has(item.id)) return false;
    if (state.activeTag && !item.tags.includes(state.activeTag)) return false;

    if (state.q.trim()) {
      const qNorm = normalizeStr(state.q);
      const text = normalizeStr([item.title, item.description, item.deliverable, item.practicalExample || '', item.segment, ...item.tags].join(' '));
      if (!text.includes(qNorm)) return false;
    }
    return true;
  });`;

const newGetFiltered = `// FILTRAGEM
function getFilteredItems() {
  let list = state.items.filter(item => {
    const isItemDeleted = storedDeleted.has(item.id);

    // Regra estrita de exclusão: se o usuário estiver vendo os Excluídos, apenas itens deletados aparecem.
    // Em qualquer outro filtro ('all', 'unseen', 'seen', pesquisa, etc.), itens deletados NUNCA aparecem.
    if (state.readFilter === 'deleted') {
      if (!isItemDeleted) return false;
    } else {
      if (isItemDeleted) return false;
      if (state.readFilter === 'unseen' && storedSeen.has(item.id)) return false;
      if (state.readFilter === 'seen' && !storedSeen.has(item.id)) return false;
    }

    if (!matchesKind(item, state.kind)) return false;
    if (state.segment !== 'all' && item.segment !== state.segment) return false;
    if (state.activeTag && !item.tags.includes(state.activeTag)) return false;

    if (state.q.trim()) {
      const qNorm = normalizeStr(state.q);
      const text = normalizeStr([item.title, item.description, item.deliverable, item.practicalExample || '', item.segment, ...item.tags].join(' '));
      if (!text.includes(qNorm)) return false;
    }
    return true;
  });`;

if (html.includes(oldGetFiltered)) {
  html = html.replace(oldGetFiltered, newGetFiltered);
}

// 2.7 JavaScript: Atualizar empty state para Lixeira Vazia
const oldEmptyState = `  if (!items.length) {
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
  }`;

const newEmptyState = `  if (!items.length) {
    const isDeletedView = state.readFilter === 'deleted';
    container.innerHTML = \`
      <div style="grid-column: 1 / -1; padding: 3.5rem 1rem; text-align: center; color: var(--muted-text);">
        <i data-lucide="\${isDeletedView ? 'trash-2' : 'inbox'}" style="width: 40px; height: 40px; margin: 0 auto 0.75rem; opacity: 0.4; \${isDeletedView ? 'color:#ef4444;' : ''}"></i>
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text);">\${isDeletedView ? 'Lixeira Vazia' : 'Nenhum recurso encontrado'}</h3>
        <p style="font-size: 0.825rem; margin-top: 0.2rem;">\${isDeletedView ? 'Nenhum recurso foi excluído até o momento. Quando você excluir cards, eles ficarão salvos aqui para restauração a qualquer momento.' : 'Tente pesquisar outros termos ou limpe os filtros ativos.'}</p>
        \${isDeletedView ? '<button class="btn" onclick="state.readFilter=\\'all\\'; syncFilterControls(); renderCards();" style="margin-top: 0.85rem;" aria-label="Voltar para todos os recursos">Voltar ao Acervo Principal</button>' : '<button class="btn" onclick="resetAllFilters()" style="margin-top: 0.85rem;" aria-label="Limpar todos os filtros">Limpar todos os filtros</button>'}
      </div>\`;
    $('#resultCount').textContent = '0 recursos encontrados';
    lucide.createIcons();
    updateKpis();
    return;
  }`;

if (html.includes(oldEmptyState)) {
  html = html.replace(oldEmptyState, newEmptyState);
}

// 2.8 JavaScript: Atualizar updateKpis para calcular itens ativos e contadores de lixeira
const oldUpdateKpis = `function updateKpis() {
  const all = state.items;
  if ($('#kpiTotal')) $('#kpiTotal').textContent = all.length;
  if ($('#kpiVideos')) $('#kpiVideos').textContent = all.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#kpiRepos')) $('#kpiRepos').textContent = all.filter(x => x.kind === 'repositório').length;
  if ($('#kpiCarousels')) $('#kpiCarousels').textContent = all.filter(x => x.kind === 'carrossel').length;
  if ($('#kpiFavs')) $('#kpiFavs').textContent = storedFavorites.size;

  const seenCount = all.filter(x => storedSeen.has(x.id)).length;
  const unseenCount = all.length - seenCount;
  if ($('#kpiSeen')) $('#kpiSeen').textContent = seenCount;
  if ($('#countSeen')) $('#countSeen').textContent = seenCount;
  if ($('#countUnseen')) $('#countUnseen').textContent = unseenCount;
  if ($('#statusCountAll')) $('#statusCountAll').textContent = all.length;
  if ($('#statusCountUnseen')) $('#statusCountUnseen').textContent = unseenCount;
  if ($('#statusCountSeen')) $('#statusCountSeen').textContent = seenCount;

  if ($('#countAll')) $('#countAll').textContent = all.length;
  if ($('#countVideo')) $('#countVideo').textContent = all.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#countRepo')) $('#countRepo').textContent = all.filter(x => x.kind === 'repositório').length;
  if ($('#countCarousel')) $('#countCarousel').textContent = all.filter(x => x.kind === 'carrossel').length;
  if ($('#countTool')) $('#countTool').textContent = all.filter(x => x.kind === 'ferramenta').length;
  if ($('#countDoc')) $('#countDoc').textContent = all.filter(x => x.kind === 'conhecimento' || x.kind === 'diretório').length;
  if ($('#countFav')) $('#countFav').textContent = storedFavorites.size;

  renderSegmentList();
}`;

const newUpdateKpis = `function updateKpis() {
  const active = state.items.filter(x => !storedDeleted.has(x.id));
  const deletedCount = state.items.filter(x => storedDeleted.has(x.id)).length;

  if ($('#kpiTotal')) $('#kpiTotal').textContent = active.length;
  if ($('#kpiVideos')) $('#kpiVideos').textContent = active.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#kpiRepos')) $('#kpiRepos').textContent = active.filter(x => x.kind === 'repositório').length;
  if ($('#kpiCarousels')) $('#kpiCarousels').textContent = active.filter(x => x.kind === 'carrossel').length;
  if ($('#kpiFavs')) $('#kpiFavs').textContent = active.filter(x => storedFavorites.has(x.id)).length;

  const seenCount = active.filter(x => storedSeen.has(x.id)).length;
  const unseenCount = active.length - seenCount;
  if ($('#kpiSeen')) $('#kpiSeen').textContent = seenCount;
  if ($('#countSeen')) $('#countSeen').textContent = seenCount;
  if ($('#countUnseen')) $('#countUnseen').textContent = unseenCount;
  if ($('#statusCountAll')) $('#statusCountAll').textContent = active.length;
  if ($('#statusCountUnseen')) $('#statusCountUnseen').textContent = unseenCount;
  if ($('#statusCountSeen')) $('#statusCountSeen').textContent = seenCount;

  if ($('#countDeleted')) $('#countDeleted').textContent = deletedCount;
  if ($('#statusCountDeleted')) $('#statusCountDeleted').textContent = deletedCount;

  if ($('#countAll')) $('#countAll').textContent = active.length;
  if ($('#countVideo')) $('#countVideo').textContent = active.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#countRepo')) $('#countRepo').textContent = active.filter(x => x.kind === 'repositório').length;
  if ($('#countCarousel')) $('#countCarousel').textContent = active.filter(x => x.kind === 'carrossel').length;
  if ($('#countTool')) $('#countTool').textContent = active.filter(x => x.kind === 'ferramenta').length;
  if ($('#countDoc')) $('#countDoc').textContent = active.filter(x => x.kind === 'conhecimento' || x.kind === 'diretório').length;
  if ($('#countFav')) $('#countFav').textContent = active.filter(x => storedFavorites.has(x.id)).length;

  renderSegmentList();
}`;

if (html.includes(oldUpdateKpis)) {
  html = html.replace(oldUpdateKpis, newUpdateKpis);
}

// 2.9 JavaScript: Atualizar renderSegmentList para contar sobre itens ativos
const oldRenderSegment = `function renderSegmentList() {
  const counts = {};
  state.items.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });`;

const newRenderSegment = `function renderSegmentList() {
  const counts = {};
  const activeItems = state.items.filter(x => !storedDeleted.has(x.id));
  activeItems.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });`;

if (html.includes(oldRenderSegment)) {
  html = html.replace(oldRenderSegment, newRenderSegment);
}

// 2.10 JavaScript: Atualizar syncFilterControls e resetAllFilters
const oldSyncFilter = `function syncFilterControls() {
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
}`;

const newSyncFilter = `function syncFilterControls() {
  $$('#categoryTabs .segment-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('.nav-btn[data-kind]').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('#readStatusGroup .status-toggle-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.read === state.readFilter);
  });
  $$('.nav-btn[data-read]').forEach(b => {
    b.classList.toggle('active', b.dataset.read === state.readFilter);
  });
  $$('#segmentChipsContainer .filter-chip-item').forEach(b => {
    b.classList.toggle('active', b.dataset.segment === state.segment);
  });
  $$('.segment-row').forEach(row => {
    row.classList.toggle('active', row.dataset.segment === state.segment);
  });
}`;

if (html.includes(oldSyncFilter)) {
  html = html.replace(oldSyncFilter, newSyncFilter);
}

const oldResetFilters = `function resetAllFilters() {
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
}`;

const newResetFilters = `function resetAllFilters() {
  state.kind = 'all';
  state.segment = 'all';
  state.readFilter = 'all';
  state.activeTag = null;
  state.q = '';
  $('#searchInput').value = '';
  $('#activeTagName').textContent = '';
  $('#activeTagBar').classList.remove('show');
  syncFilterControls();
  renderCards();
  showToast('Todos os filtros foram limpos');
}`;

if (html.includes(oldResetFilters)) {
  html = html.replace(oldResetFilters, newResetFilters);
}

// 2.11 Atualizar openDetailModal para tratar o botão de Excluir / Restaurar
const oldModalFavLine = `updateModalSeenState(item.id);
  $('#btnModalFav').innerHTML = \`<i data-lucide="star"></i> \${isFav ? 'Remover' : 'Favoritar'}\`;`;

const newModalFavLine = `updateModalSeenState(item.id);
  $('#btnModalFav').innerHTML = \`<i data-lucide="star"></i> \${isFav ? 'Remover' : 'Favoritar'}\`;
  
  const isDeleted = storedDeleted.has(item.id);
  const trashBtn = $('#btnModalTrashAction');
  if (trashBtn) {
    if (isDeleted) {
      trashBtn.innerHTML = '<i data-lucide="rotate-ccw"></i> Restaurar';
      trashBtn.className = 'btn primary sm';
      trashBtn.onclick = () => {
        restoreItem(item.id);
        openDetailModal(item);
      };
    } else {
      trashBtn.innerHTML = '<i data-lucide="trash-2"></i> Excluir';
      trashBtn.className = 'btn secondary sm btn-trash-toggle';
      trashBtn.onclick = () => {
        deleteItem(item.id);
      };
    }
  }`;

if (html.includes(oldModalFavLine)) {
  html = html.replace(oldModalFavLine, () => newModalFavLine);
}

// 2.12 Atualizar attachCardEvents para ouvir o clique em .btn-trash-toggle
const oldAttachEvents = `  $$('.card-seen-toggle').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      toggleSeen(btn.dataset.seenId);
    };
  });`;

const newAttachEvents = `  $$('.card-seen-toggle').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      toggleSeen(btn.dataset.seenId);
    };
  });

  $$('.btn-trash-toggle').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const id = btn.dataset.trashId;
      if (storedDeleted.has(id)) {
        restoreItem(id);
      } else {
        deleteItem(id);
      }
    };
  });`;

if (html.includes(oldAttachEvents)) {
  html = html.replace(oldAttachEvents, newAttachEvents);
}

// Também garantir que o card.onclick ignore clique no .btn-trash-toggle
if (html.includes('if (e.target.closest(\'.card-seen-toggle\')')) {
  html = html.replace(
    'if (e.target.closest(\'.card-seen-toggle\')',
    'if (e.target.closest(\'.btn-trash-toggle\') || e.target.closest(\'.card-seen-toggle\')'
  );
}

// 2.13 Inserir const isDeleted e o botão btn-trash-toggle nos 3 modos de renderização
// Modo 1: Lista Executiva
const oldListDef = `    // 1. MODO LISTA EXECUTIVA
  if (uiPrefs.viewMode === 'list') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);`;

const newListDef = `    // 1. MODO LISTA EXECUTIVA
  if (uiPrefs.viewMode === 'list') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);
      const isDeleted = storedDeleted.has(item.id);`;

if (html.includes(oldListDef)) {
  html = html.replace(oldListDef, newListDef);
}

const oldListActions = `          <div class="list-col-actions">
            <div style="display:flex;align-items:center;gap:0.35rem;">
                      \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
                      <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
          <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
          <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
                      <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                    </div>`;

const newListActions = `          <div class="list-col-actions">
            <div style="display:flex;align-items:center;gap:0.35rem;">
              \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
              \${isDeleted ? '<span class="trash-badge-pill"><i data-lucide="trash-2" style="width:10px;height:10px;"></i> Excluído</span>' : ''}
              <button class="card-action-btn btn-trash-toggle \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" title="\${isDeleted ? 'Restaurar para acervo ativo' : 'Excluir do acervo'}" aria-label="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:13px;height:13px;"></i> <span>\${isDeleted ? 'Restaurar' : 'Excluir'}</span></button>
              \${!isDeleted ? \`
                <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
                <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
                <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
                <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
              \` : ''}
            </div>`;

if (html.includes(oldListActions)) {
  html = html.replace(oldListActions, () => newListActions);
}

// Modo 2: Mosaico Dinâmico / Tiles
const oldTilesDef = `    // 2. MODO BOTÕES / MOSAICO DINÂMICO
  else if (uiPrefs.viewMode === 'tiles') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);`;

const newTilesDef = `    // 2. MODO BOTÕES / MOSAICO DINÂMICO
  else if (uiPrefs.viewMode === 'tiles') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);
      const isDeleted = storedDeleted.has(item.id);`;

if (html.includes(oldTilesDef)) {
  html = html.replace(oldTilesDef, newTilesDef);
}

const oldTilesActions = `          <div style="display:flex;align-items:center;gap:0.3rem;margin-left:auto;">
            <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
          <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
          <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
            <span class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:13px;height:13px;"></i></span>
          </div>`;

const newTilesActions = `          <div style="display:flex;align-items:center;gap:0.3rem;margin-left:auto;">
            \${isDeleted ? '<span class="trash-badge-pill" style="font-size:0.6rem;padding:0.1rem 0.35rem;"><i data-lucide="trash-2" style="width:9px;height:9px;"></i> Excluído</span>' : ''}
            <button class="card-action-btn btn-trash-toggle \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" title="\${isDeleted ? 'Restaurar para acervo ativo' : 'Excluir do acervo'}" aria-label="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:13px;height:13px;"></i> <span>\${isDeleted ? 'Restaurar' : 'Excluir'}</span></button>
            \${!isDeleted ? \`
              <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
              <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
              <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
              <span class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:13px;height:13px;"></i></span>
            \` : ''}
          </div>`;

if (html.includes(oldTilesActions)) {
  html = html.replace(oldTilesActions, () => newTilesActions);
}

// Modo 3: Cards Multi-coluna (Default)
const oldCardsDef = `    // 3. MODO CARDS MULTI-COLUNA (DEFAULT)
  else {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);`;

const newCardsDef = `    // 3. MODO CARDS MULTI-COLUNA (DEFAULT)
  else {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);
      const isDeleted = storedDeleted.has(item.id);`;

if (html.includes(oldCardsDef)) {
  html = html.replace(oldCardsDef, newCardsDef);
}

// Substituir o bloco comum de ações nos 4 tipos de cards
const oldCardItemActions = `<div style="display:flex;align-items:center;gap:0.35rem;">
                      \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
                      <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
          <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
          <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
                      <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                    </div>`;

const newCardItemActions = `<div style="display:flex;align-items:center;gap:0.35rem;">
                      \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
                      \${isDeleted ? '<span class="trash-badge-pill"><i data-lucide="trash-2" style="width:10px;height:10px;"></i> Excluído</span>' : ''}
                      <button class="card-action-btn btn-trash-toggle \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" title="\${isDeleted ? 'Restaurar para acervo ativo' : 'Excluir / Mover para lixeira'}" aria-label="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:13px;height:13px;"></i> <span>\${isDeleted ? 'Restaurar' : 'Excluir'}</span></button>
                      \${!isDeleted ? \`
                        <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
                        <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
                        <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
                        <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
                      \` : ''}
                    </div>`;

// Substituir todas as ocorrências
while (html.includes(oldCardItemActions)) {
  html = html.replace(oldCardItemActions, () => newCardItemActions);
}

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('✅ nexus-acervo.html atualizado com todos os botões de ação e lixeira.');
