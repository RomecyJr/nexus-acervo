import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');

console.log('=== APLICANDO INTERFACE FLUIDA (BORDERLESS GHOST) & ENGINE IA OPENROUTER ===');

let html = fs.readFileSync(htmlPath, 'utf8');

// ============================================================================
// 1. REFATORAÇÃO DA SIDEBAR (ORDENAÇÃO CLARA, HIERARQUIA EDITORIAL & SEM LINHAS CINZAS)
// ============================================================================
const oldSidebarNavBodyRegex = /<div class="nav-body">[\s\S]*?<\/div>\s*<div class="sidebar-footer">/;

const newSidebarNavBody = `<div class="nav-body">
      <!-- 1. ACERVO / BIBLIOTECA -->
      <div class="nav-group">
        <div class="nav-section-title">Acervo</div>
        <nav class="nav-list" id="navKind">
          <button class="nav-btn active" data-kind="all" aria-label="Todos os recursos">
            <span class="nav-btn-inner"><i data-lucide="layers"></i> Todos os Itens</span>
            <span class="nav-pill-count" id="countAll">0</span>
          </button>
          <button class="nav-btn" data-kind="repositório" aria-label="Repositórios GitHub de código">
            <span class="nav-btn-inner"><i data-lucide="github"></i> Repositórios GitHub</span>
            <span class="nav-pill-count" id="countRepo">0</span>
          </button>
          <button class="nav-btn" data-kind="ferramenta" aria-label="Ferramentas web de produtividade">
            <span class="nav-btn-inner"><i data-lucide="wrench"></i> Ferramentas Web</span>
            <span class="nav-pill-count" id="countTool">0</span>
          </button>
          <button class="nav-btn" data-kind="vídeo" aria-label="Vídeos e aulas de estudo">
            <span class="nav-btn-inner"><i data-lucide="play"></i> Vídeos & Aulas</span>
            <span class="nav-pill-count" id="countVideo">0</span>
          </button>
          <button class="nav-btn" data-kind="conhecimento" aria-label="Conhecimento, guias e cursos práticos">
            <span class="nav-btn-inner"><i data-lucide="book-open"></i> Conhecimento & Cursos</span>
            <span class="nav-pill-count" id="countDoc">0</span>
          </button>
          <button class="nav-btn" data-kind="carrossel" aria-label="Carrosséis do Instagram e posts">
            <span class="nav-btn-inner"><i data-lucide="gallery-thumbnails"></i> Carrosséis & Posts</span>
            <span class="nav-pill-count" id="countCarousel">0</span>
          </button>
        </nav>
      </div>

      <!-- 2. FLUXO DE ESTUDO & CURADORIA -->
      <div class="nav-group" style="margin-top: 1.15rem;">
        <div class="nav-section-title">Minha Curadoria</div>
        <nav class="nav-list" id="navStatusGroup">
          <button class="nav-btn" data-kind="favorites" aria-label="Recursos salvos nos favoritos">
            <span class="nav-btn-inner"><i data-lucide="star"></i> Meus Favoritos</span>
            <span class="nav-pill-count" id="countFav">0</span>
          </button>
          <button class="nav-btn" data-read="unseen" aria-label="Conteúdos pendentes de estudo">
            <span class="nav-btn-inner"><i data-lucide="bookmark"></i> A Estudar</span>
            <span class="nav-pill-count" id="countUnseen">0</span>
          </button>
          <button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos">
            <span class="nav-btn-inner"><i data-lucide="check-circle-2"></i> Concluídos</span>
            <span class="nav-pill-count" id="countSeen">0</span>
          </button>
          <button class="nav-btn" data-read="deleted" aria-label="Recursos descartados na lixeira">
            <span class="nav-btn-inner"><i data-lucide="trash-2"></i> Lixeira</span>
            <span class="nav-pill-count" id="countDeleted">0</span>
          </button>
        </nav>
      </div>

      <!-- 3. SISTEMA & INTEGRAÇÕES -->
      <div class="nav-group" style="margin-top: 1.15rem;">
        <div class="nav-section-title">Sistema & Integrações</div>
        <nav class="nav-list">
          <button class="nav-btn" id="btnOpenAiImport" aria-label="Importação Inteligente com IA">
            <span class="nav-btn-inner"><i data-lucide="sparkles" style="color:#10b981;"></i> Importar com IA</span>
          </button>
          <button class="nav-btn" id="btnOpenAiSettings" aria-label="Configurar Chave OpenRouter">
            <span class="nav-btn-inner"><i data-lucide="bot" style="color:#38bdf8;"></i> Configurar IA</span>
          </button>
          <button class="nav-btn" id="btnOpenApi" aria-label="API e documentação OpenAPI">
            <span class="nav-btn-inner"><i data-lucide="braces"></i> API & OpenAPI</span>
          </button>
          <button class="nav-btn" id="btnOpenDocumensoStudio" aria-label="Documenso Studio - Assinatura Digital">
            <span class="nav-btn-inner"><i data-lucide="pen-tool"></i> Documenso Studio</span>
          </button>
          <button class="nav-btn" id="btnExportJson" aria-label="Exportar acervo completo em JSON">
            <span class="nav-btn-inner"><i data-lucide="download"></i> Exportar Acervo</span>
          </button>
        </nav>
      </div>
    </div>

    <div class="sidebar-footer">`;

if (oldSidebarNavBodyRegex.test(html)) {
  html = html.replace(oldSidebarNavBodyRegex, newSidebarNavBody);
  console.log('✓ Sidebar reordenada e semântica atualizada com sucesso.');
}

// ============================================================================
// 2. CSS FLUIDO (ELIMINAÇÃO TOTAL DE BORDAS CINZAS, CAIXAS E SUB-LINHAS NATIVAS)
// ============================================================================
const fluidThemeCss = `
/* ==========================================================================
   DESIGN FLUIDO & BORDERLESS (RAYCAST / LINEAR / EMIL KOWALSKI STANDARD)
   ========================================================================== */

/* Subtítulos de seções da Sidebar */
.nav-section-title {
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  color: #71717a !important;
  padding: 0.2rem 0.55rem !important;
  margin-bottom: 0.25rem !important;
}

/* Botões da Sidebar nativos sem bordas */
.nav-btn {
  background: transparent !important;
  border: none !important;
  color: #a1a1aa !important;
  font-size: 0.815rem !important;
  font-weight: 500 !important;
  padding: 0.42rem 0.6rem !important;
  border-radius: 6px !important;
  transition: background 120ms ease, color 120ms ease !important;
}
.nav-btn:hover {
  background: rgba(255, 255, 255, 0.04) !important;
  color: #f4f4f5 !important;
}
.nav-btn.active {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  box-shadow: none !important;
  font-weight: 600 !important;
}
.nav-pill-count {
  background: transparent !important;
  color: #71717a !important;
  font-family: var(--font-mono) !important;
  font-size: 0.68rem !important;
  font-weight: 600 !important;
  border: none !important;
  padding: 0 !important;
}
.nav-btn.active .nav-pill-count {
  background: transparent !important;
  color: #a1a1aa !important;
}

/* Cluster de status superior (Ativos, Pendentes, Vistos, Lixeira) - Sem caixas cinzas */
.status-toggle-group {
  background: rgba(255, 255, 255, 0.02) !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 0.15rem !important;
  gap: 0.2rem !important;
}
.status-toggle-btn {
  background: transparent !important;
  border: none !important;
  color: #71717a !important;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  padding: 0.26rem 0.6rem !important;
  border-radius: 6px !important;
  box-shadow: none !important;
}
.status-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.04) !important;
  color: #f4f4f5 !important;
  border: none !important;
}
.status-toggle-btn.active {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #f4f4f5 !important;
  border: none !important;
  box-shadow: none !important;
  font-weight: 600 !important;
}
.status-toggle-btn.active[data-read="unseen"] { color: #60a5fa !important; }
.status-toggle-btn.active[data-read="seen"] { color: #34d399 !important; }
.status-toggle-btn.active[data-read="deleted"] { color: #f87171 !important; }

/* Botões de Ação dentro dos Cards - Estilo Ghost Nativo (Zero caixas cinzas) */
.card-action-btn {
  background: transparent !important;
  border: none !important;
  color: #a1a1aa !important;
  font-size: 0.73rem !important;
  font-weight: 500 !important;
  height: 26px !important;
  padding: 0 0.5rem !important;
  border-radius: 6px !important;
  box-shadow: none !important;
}
.card-action-btn:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: #f4f4f5 !important;
  border: none !important;
  transform: none !important;
}
.card-action-btn.is-seen {
  background: rgba(16, 185, 129, 0.08) !important;
  color: #34d399 !important;
  border: none !important;
}
.card-action-btn.is-seen:hover {
  background: rgba(16, 185, 129, 0.16) !important;
}
.card-action-btn.has-note {
  background: rgba(59, 130, 246, 0.08) !important;
  color: #60a5fa !important;
  border: none !important;
}
.card-action-btn.has-note:hover {
  background: rgba(59, 130, 246, 0.16) !important;
}

.card-delete-action-btn {
  background: transparent !important;
  border: none !important;
  color: #71717a !important;
  width: 26px !important;
  height: 26px !important;
  border-radius: 6px !important;
}
.card-delete-action-btn:hover {
  background: rgba(239, 68, 68, 0.12) !important;
  color: #f87171 !important;
  border: none !important;
}

.icon-action-btn {
  background: transparent !important;
  border: none !important;
  color: #71717a !important;
  width: 26px !important;
  height: 26px !important;
  border-radius: 6px !important;
}
.icon-action-btn:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: #f4f4f5 !important;
  border: none !important;
}

/* Badges e tags fluidas sem bordas pesadas */
.meta-chip-tag {
  background: rgba(255, 255, 255, 0.04) !important;
  border: none !important;
  color: #a1a1aa !important;
  font-size: 0.68rem !important;
  font-weight: 600 !important;
  padding: 0.12rem 0.4rem !important;
  border-radius: 4px !important;
}
.stars-chip {
  background: rgba(245, 158, 11, 0.08) !important;
  border: none !important;
  color: #fbbf24 !important;
  font-family: var(--font-mono) !important;
  font-size: 0.68rem !important;
  font-weight: 700 !important;
  padding: 0.12rem 0.4rem !important;
  border-radius: 4px !important;
}

/* Campo de busca inteligente com badge ⌘K */
.search-field input {
  height: 36px !important;
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 8px !important;
  padding: 0 4.2rem 0 2.3rem !important;
  font-size: 0.815rem !important;
  transition: all 140ms ease !important;
}
.search-field input:focus {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15) !important;
}
.search-shortcut-badge {
  position: absolute;
  right: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.12rem 0.35rem;
  font-size: 0.65rem;
  font-family: var(--font-mono);
  font-weight: 600;
  color: #71717a;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;
  user-select: none;
}
.search-clear-btn {
  position: absolute;
  right: 2.2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: none;
  place-items: center;
  color: #71717a;
  cursor: pointer;
  background: transparent;
  border: none;
}
.search-clear-btn:hover {
  color: #f4f4f5;
}
`;

if (!html.includes('DESIGN FLUIDO & BORDERLESS')) {
  html = html.replace('/* User Profile & Auth Badges */', `${fluidThemeCss}\n\n/* User Profile & Auth Badges */`);
  console.log('✓ CSS de design fluido e borderless injetado com sucesso.');
}

// ============================================================================
// 3. BARRA DE BUSCA INTELIGENTE COM BADGE ⌘K E BOTÃO LIMPAR
// ============================================================================
const oldSearchField = `<div class="search-field">
          <i data-lucide="search"></i>
          <input id="searchInput" aria-label="Pesquisar catálogo" placeholder="Buscar por título, segmento, tecnologia ou entregável...">
        </div>`;

const newSearchField = `<div class="search-field">
          <i data-lucide="search"></i>
          <input id="searchInput" aria-label="Pesquisar catálogo" placeholder="Buscar por título, tecnologia, entregável... (ex: tipo:repo, stars:>5k, ia)">
          <button class="search-clear-btn" id="btnClearSearch" title="Limpar busca (Esc)" aria-label="Limpar busca"><i data-lucide="x" style="width:13px;height:13px;"></i></button>
          <kbd class="search-shortcut-badge" id="searchKbdBadge">⌘K</kbd>
        </div>`;

if (html.includes(oldSearchField)) {
  html = html.replace(oldSearchField, newSearchField);
  console.log('✓ Campo de busca inteligente com badge ⌘K integrado.');
}

// ============================================================================
// 4. MODAL DE ADIÇÃO COM AUTO-IMPORTAÇÃO POR IA (OPENROUTER ENGINE)
// ============================================================================
const oldAddModalStart = `<div class="clean-modal" id="addModal" role="dialog" aria-modal="true" aria-labelledby="addModalTitle">
  <div class="modal-dialog" style="max-width: 580px;">
    <button class="modal-close-icon" id="btnAddModalClose" aria-label="Fechar modal"><i data-lucide="x"></i></button>
    <div style="padding: 1.75rem;">
      <h2 style="font-size: 1.2rem; font-weight: 800;" id="addModalTitle">Salvar no Acervo</h2>
      <p style="color: var(--muted-text); font-size: 0.825rem; margin-top: 0.2rem;">Adicione carrosséis do Instagram, repositórios do GitHub, vídeos de estudo ou ferramentas com exemplo prático.</p>

      <form id="addItemForm" style="display: grid; gap: 0.85rem; margin-top: 1.25rem;">`;

const newAddModalStart = `<div class="clean-modal" id="addModal" role="dialog" aria-modal="true" aria-labelledby="addModalTitle">
  <div class="modal-dialog" style="max-width: 620px; max-height: 90vh;">
    <button class="modal-close-icon" id="btnAddModalClose" aria-label="Fechar modal"><i data-lucide="x"></i></button>
    <div style="padding: 1.75rem;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 0.25rem;">
        <h2 style="font-size: 1.25rem; font-weight: 800; letter-spacing:-0.02em;" id="addModalTitle">Salvar no Acervo</h2>
        <button type="button" class="btn secondary sm" id="btnToggleAiConfigModal" style="font-size:0.7rem; height:26px; padding:0 0.5rem; gap:0.3rem;"><i data-lucide="bot" style="width:12px;height:12px;color:#38bdf8;"></i> Configurar OpenRouter</button>
      </div>
      <p style="color: var(--muted-text); font-size: 0.815rem;">Adicione novos recursos manualmente ou preencha automaticamente via IA a partir da URL.</p>

      <!-- AUTO-IMPORTADOR IA COM OPENROUTER -->
      <div class="ai-auto-import-bar" style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; padding: 0.85rem; margin: 1rem 0 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.45rem;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #10b981; display: flex; align-items: center; gap: 0.35rem;">
            <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i>
            <span>Importação Inteligente com IA</span>
          </span>
          <span id="aiEngineLabel" style="font-size: 0.68rem; color: #71717a; font-family: var(--font-mono);">OpenRouter + Extratores</span>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <input id="aiAutoUrlInput" type="url" placeholder="Cole a URL do YouTube, GitHub ou Ferramenta..." style="flex: 1; height: 36px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 0 0.75rem; font-size: 0.8rem; color: var(--text);">
          <button type="button" id="btnRunAiAutoFill" class="btn primary" style="height: 36px; font-size: 0.78rem; padding: 0 0.85rem; gap: 0.35rem;">
            <i data-lucide="sparkles" style="width: 13px; height: 13px;"></i>
            <span>Preencher com IA</span>
          </button>
        </div>
        <div id="aiAutoFillStatus" style="font-size: 0.72rem; color: var(--muted-text); margin-top: 0.45rem; display: none;"></div>
      </div>

      <form id="addItemForm" style="display: grid; gap: 0.85rem;">`;

if (html.includes(oldAddModalStart)) {
  html = html.replace(oldAddModalStart, newAddModalStart);
  console.log('✓ Bloco de Auto-Importação com IA inserido no modal de adição.');
}

// ============================================================================
// 5. MODAL DE CONFIGURAÇÃO DE IA (OPENROUTER API KEY & MODELOS)
// ============================================================================
const aiConfigModalHtml = `
<!-- MODAL DE CONFIGURAÇÃO OPENROUTER IA -->
<div class="clean-modal" id="aiConfigModal" role="dialog" aria-modal="true" aria-labelledby="aiConfigModalTitle">
  <div class="modal-dialog" style="max-width: 520px;">
    <button class="modal-close-icon" id="btnAiConfigClose" aria-label="Fechar modal"><i data-lucide="x"></i></button>
    <div style="padding: 1.75rem;">
      <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(56, 189, 248, 0.12); display: grid; place-items: center; color: #38bdf8;">
          <i data-lucide="bot" style="width: 18px; height: 18px;"></i>
        </div>
        <h2 style="font-size: 1.2rem; font-weight: 800; letter-spacing: -0.02em;" id="aiConfigModalTitle">Configuração de IA · OpenRouter</h2>
      </div>
      <p style="color: var(--muted-text); font-size: 0.815rem; line-height: 1.45;">Conecte sua conta do OpenRouter para síntese automática de recursos, resumo executivo de 5s e extração de entregáveis práticos.</p>

      <div style="margin-top: 1.25rem; display: grid; gap: 0.95rem;">
        <div>
          <label style="display: block; font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--faint); margin-bottom: 0.35rem;">Chave de API OpenRouter</label>
          <div style="position: relative; display: flex; align-items: center;">
            <input id="inputOpenRouterKey" type="password" placeholder="sk-or-v1-..." style="width: 100%; height: 38px; background: var(--surface2); border: 1px solid var(--border-color); border-radius: 6px; padding: 0 2.4rem 0 0.85rem; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text);">
            <button type="button" id="btnToggleKeyVisibility" style="position: absolute; right: 0.65rem; background: none; border: none; color: var(--faint); cursor: pointer;"><i data-lucide="eye" style="width: 15px; height: 15px;"></i></button>
          </div>
          <span style="font-size: 0.7rem; color: #71717a; margin-top: 0.25rem; display: block;">Sua chave é salva apenas no localStorage local seguro deste navegador.</span>
        </div>

        <div>
          <label style="display: block; font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--faint); margin-bottom: 0.35rem;">Modelo LLM para Extração</label>
          <select id="selectOpenRouterModel" style="width: 100%; height: 38px; background: var(--surface2); border: 1px solid var(--border-color); border-radius: 6px; padding: 0 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text); cursor: pointer;">
            <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B Instruct (Gratuito / Excelente)</option>
            <option value="google/gemini-2.0-flash-exp:free">Google Gemini 2.0 Flash (Gratuito / Ultra Rápido)</option>
            <option value="deepseek/deepseek-r1:free">DeepSeek R1 (Gratuito / Raciocínio Profundo)</option>
            <option value="deepseek/deepseek-chat">DeepSeek V3 (Chat Econômico de Alta Qualidade)</option>
            <option value="mistralai/mistral-7b-instruct:free">Mistral 7B Instruct (Gratuito)</option>
          </select>
        </div>

        <div id="aiTestFeedback" style="display: none; padding: 0.55rem 0.75rem; border-radius: 6px; font-size: 0.75rem;"></div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
          <button type="button" class="btn secondary" id="btnTestOpenRouter" style="font-size: 0.75rem;"><i data-lucide="zap"></i> Testar Conexão</button>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn" id="btnCancelAiConfig">Cancelar</button>
            <button type="button" class="btn primary" id="btnSaveAiConfig"><i data-lucide="check"></i> Salvar Chave</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

if (!html.includes('id="aiConfigModal"')) {
  html = html.replace('<!-- MODAL SALVAR NO ACERVO', `${aiConfigModalHtml}\n<!-- MODAL SALVAR NO ACERVO`);
  console.log('✓ Modal de configuração do OpenRouter injetado no HTML.');
}

// ============================================================================
// 6. ENGINE JAVASCRIPT: BUSCA INTELIGENTE COM OPERADORES & EXTRAÇÃO COM IA
// ============================================================================
const jsLogicSnippet = `
// ============================================================================
// ENGINE DE PESQUISA INTELIGENTE MULTI-TOKEN E OPERADORES (LINEAR / RAYCAST STYLE)
// ============================================================================
function parseSearchQuery(rawQuery) {
  const q = (rawQuery || '').trim();
  const res = {
    kind: null,
    minStars: 0,
    status: null,
    tag: null,
    segment: null,
    textTokens: []
  };

  if (!q) return res;

  const rawTokens = q.split(/\\s+/);
  for (const token of rawTokens) {
    const lower = token.toLowerCase();
    if (lower.startsWith('tipo:') || lower.startsWith('kind:') || lower.startsWith('is:')) {
      const val = lower.split(':')[1];
      if (val.includes('video') || val.includes('vídeo') || val.includes('aula')) res.kind = 'vídeo';
      else if (val.includes('repo') || val.includes('git')) res.kind = 'repositório';
      else if (val.includes('tool') || val.includes('ferramenta')) res.kind = 'ferramenta';
      else if (val.includes('curso')) res.kind = 'curso';
      else if (val.includes('post') || val.includes('carrossel')) res.kind = 'carrossel';
      else if (val.includes('doc') || val.includes('guia') || val.includes('conhecimento')) res.kind = 'conhecimento';
    } else if (lower.startsWith('estrelas:') || lower.startsWith('stars:')) {
      const val = lower.split(':')[1].replace('>', '').replace('k', '000');
      res.minStars = parseInt(val, 10) || 0;
    } else if (lower.startsWith('status:')) {
      const val = lower.split(':')[1];
      if (val === 'visto' || val === 'concluido' || val === 'seen') res.status = 'seen';
      else if (val === 'pendente' || val === 'a-estudar' || val === 'unseen') res.status = 'unseen';
      else if (val === 'lixeira' || val === 'excluido' || val === 'deleted') res.status = 'deleted';
      else if (val === 'favorito' || val === 'fav') res.status = 'favorites';
    } else if (lower.startsWith('tag:')) {
      res.tag = normalizeStr(lower.split(':')[1]);
    } else if (lower.startsWith('segmento:') || lower.startsWith('segment:')) {
      res.segment = normalizeStr(lower.split(':')[1]);
    } else if (token.trim()) {
      res.textTokens.push(normalizeStr(token));
    }
  }
  return res;
}

// ============================================================================
// ENGINE DE IMPORTAÇÃO AUTOMÁTICA COM IA (OPENROUTER & EXTRATORES CANÔNICOS)
// ============================================================================
const OPENROUTER_KEY_STORAGE = 'nexus_openrouter_key';
const OPENROUTER_MODEL_STORAGE = 'nexus_openrouter_model';

function getOpenRouterKey() {
  return localStorage.getItem(OPENROUTER_KEY_STORAGE) || '';
}

function getOpenRouterModel() {
  return localStorage.getItem(OPENROUTER_MODEL_STORAGE) || 'meta-llama/llama-3.3-70b-instruct:free';
}

async function extractMetadataFromUrl(url) {
  const result = {
    url,
    title: '',
    kind: 'ferramenta',
    description: '',
    deliverable: '',
    practicalExample: '',
    segment: 'Produtividade',
    targetAudience: 'Profissionais e Especialistas',
    tags: ['ia', 'produtividade'],
    stars: null,
    thumbnail: null,
    author: null
  };

  const lowerUrl = url.toLowerCase();

  // A. YOUTUBE VIDEO
  const ytId = extractYouTubeId(url);
  if (ytId) {
    result.kind = 'vídeo';
    result.thumbnail = \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\`;
    result.tags = ['video', 'aula', 'ia'];
    try {
      const res = await fetch(\`https://noembed.com/embed?url=\${encodeURIComponent(url)}\`);
      if (res.ok) {
        const data = await res.json();
        if (data.title) result.title = data.title;
        if (data.author_name) result.author = data.author_name;
      }
    } catch(e) {}
    return result;
  }

  // B. GITHUB REPO
  const ghMatch = url.match(/github\\.com\\/([^\\/]+)\\/([^\\/\\?#]+)/i);
  if (ghMatch) {
    const owner = ghMatch[1];
    const repo = ghMatch[2].replace(/\\.git$/i, '');
    result.kind = 'repositório';
    result.thumbnail = \`https://opengraph.githubassets.com/1/\${owner}/\${repo}\`;
    result.tags = ['github', 'open-source', 'desenvolvimento'];
    result.segment = 'Desenvolvimento';
    try {
      const res = await fetch(\`https://api.github.com/repos/\${owner}/\${repo}\`);
      if (res.ok) {
        const data = await res.json();
        result.title = \`\${data.name} — \${data.description || 'Repositório de Código Aberto'}\`;
        result.description = data.description || '';
        result.stars = data.stargazers_count;
        if (Array.isArray(data.topics) && data.topics.length) {
          result.tags = Array.from(new Set([...result.tags, ...data.topics.slice(0, 4)]));
        }
      }
    } catch(e) {}
    return result;
  }

  // C. FERRAMENTA WEB GERAL
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname.replace(/^www\\./, '');
    result.kind = 'ferramenta';
    result.title = domain.charAt(0).toUpperCase() + domain.slice(1);
    result.thumbnail = \`https://www.google.com/s2/favicons?domain=\${domain}&sz=128\`;
  } catch(e) {}

  return result;
}

async function synthesizeWithOpenRouter(url, baseData, apiKey, model) {
  const systemPrompt = \`Você é o assistente editorial sênior do Nexus Acervo ($50k benchmark padrão Linear & Sindre Sorhus Awesome).
Sua tarefa é analisar os dados brutos de um recurso web e retornar EXCLUSIVAMENTE um objeto JSON válido (sem blocos markdown extras) com os campos:
- title: Fórmula estrita "Nome — Ação ou Proposta de Valor" (ex: "v0 by Vercel — Geração Rápida de UI com React e Tailwind")
- description: Resumo executivo de altíssimo nível (mínimo 60 caracteres) explicando o que é e seu diferencial.
- deliverable: O que a ferramenta entrega de forma tangível e observável (mínimo 35 caracteres).
- practicalExample: Caso concreto e direto de aplicação prática no mundo real (mínimo 35 caracteres).
- segment: Um dos seguintes segmentos canônicos: "Desenvolvimento", "Inteligência Artificial", "Produtividade", "Design & UI", "Negócios", "Carreira", "Segurança".
- targetAudience: Personas reais (ex: "Desenvolvedores Full-stack e Engenheiros de Produto").
- tags: Array com 3 a 5 tags técnicas limpas (padronize SEMPRE "IA", nunca "I.A").\`;

  const userPrompt = \`URL: \${url}\\nDados preliminares extraídos: \${JSON.stringify(baseData)}\`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
      'HTTP-Referer': 'https://nexus-acervo.vercel.app',
      'X-Title': 'Nexus Acervo',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(\`OpenRouter HTTP \${res.status}: \${errText}\`);
  }

  const json = await res.json();
  const rawContent = json.choices?.[0]?.message?.content || '{}';
  const cleanJson = rawContent.replace(/^\`\`\`json\\s*/i, '').replace(/\`\`\`\\s*$/i, '').trim();
  return JSON.parse(cleanJson);
}
`;

if (!html.includes('function parseSearchQuery')) {
  html = html.replace('// FILTRAGEM\nfunction getFilteredItems()', `${jsLogicSnippet}\n\n// FILTRAGEM\nfunction getFilteredItems()`);
  console.log('✓ Funções de Pesquisa Inteligente e Motor OpenRouter injetadas no JS.');
}

// ============================================================================
// 7. ATUALIZAÇÃO DA FUNÇÃO getFilteredItems() PARA USAR parseSearchQuery()
// ============================================================================
const oldFilterSearchBlock = `    if (state.q.trim()) {
      const qNorm = normalizeStr(state.q);
      const text = normalizeStr([item.title, item.description, item.deliverable, item.practicalExample || '', item.segment, ...item.tags].join(' '));
      if (!text.includes(qNorm)) return false;
    }`;

const newFilterSearchBlock = `    if (state.q.trim()) {
      const parsedQuery = parseSearchQuery(state.q);

      // Operador kind:
      if (parsedQuery.kind && !matchesKind(item, parsedQuery.kind)) return false;

      // Operador minStars:
      if (parsedQuery.minStars > 0 && (item.stars || 0) < parsedQuery.minStars) return false;

      // Operador status:
      if (parsedQuery.status === 'seen' && !storedSeen.has(item.id)) return false;
      if (parsedQuery.status === 'unseen' && storedSeen.has(item.id)) return false;
      if (parsedQuery.status === 'deleted' && !storedDeleted.has(item.id)) return false;
      if (parsedQuery.status === 'favorites' && !storedFavorites.has(item.id)) return false;

      // Operador tag:
      if (parsedQuery.tag && !item.tags.some(t => normalizeStr(t).includes(parsedQuery.tag))) return false;

      // Operador segmento:
      if (parsedQuery.segment && !normalizeStr(item.segment).includes(parsedQuery.segment)) return false;

      // Match multi-token (todos os termos digitados devem estar presentes no recurso)
      if (parsedQuery.textTokens.length > 0) {
        const itemContent = normalizeStr([item.title, item.description, item.deliverable, item.practicalExample || '', item.segment, ...(item.tags || []), item.url || ''].join(' '));
        for (const token of parsedQuery.textTokens) {
          if (!itemContent.includes(token)) return false;
        }
      }
    }`;

if (html.includes(oldFilterSearchBlock)) {
  html = html.replace(oldFilterSearchBlock, newFilterSearchBlock);
  console.log('✓ getFilteredItems() atualizado com suporte completo a multi-tokens e operadores de busca.');
}

// ============================================================================
// 8. EVENT LISTENERS PARA ATALHOS ⌘K, LIMPEZA DE BUSCA E AUTO-FILL COM IA
// ============================================================================
const initEventListenersSnippet = `
  // --------------------------------------------------------------------------
  // ATALHOS GLOBAIS DE TECLADO (⌘K, /, ESC) E CONTROLE DE BUSCA
  // --------------------------------------------------------------------------
  const searchInput = $('#searchInput');
  const btnClearSearch = $('#btnClearSearch');

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      state.q = e.target.value;
      if (btnClearSearch) btnClearSearch.style.display = state.q ? 'grid' : 'none';
      renderCards();
    });

    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        searchInput.value = '';
        state.q = '';
        btnClearSearch.style.display = 'none';
        renderCards();
        searchInput.focus();
      });
    }

    window.addEventListener('keydown', e => {
      // ⌘K ou Ctrl+K para focar busca
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
      // Barra / para focar busca se não estiver digitando em campo de texto
      if (e.key === '/' && document.activeElement !== searchInput && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInput.focus();
      }
      // Esc para limpar e desfocar
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        if (searchInput.value) {
          searchInput.value = '';
          state.q = '';
          if (btnClearSearch) btnClearSearch.style.display = 'none';
          renderCards();
        }
        searchInput.blur();
      }
    });
  }

  // --------------------------------------------------------------------------
  // MODAL DE CONFIGURAÇÃO DE IA (OPENROUTER)
  // --------------------------------------------------------------------------
  const aiConfigModal = $('#aiConfigModal');
  const btnOpenAiSettings = $('#btnOpenAiSettings');
  const btnToggleAiConfigModal = $('#btnToggleAiConfigModal');
  const btnAiConfigClose = $('#btnAiConfigClose');
  const btnCancelAiConfig = $('#btnCancelAiConfig');
  const btnSaveAiConfig = $('#btnSaveAiConfig');
  const btnTestOpenRouter = $('#btnTestOpenRouter');
  const inputOpenRouterKey = $('#inputOpenRouterKey');
  const selectOpenRouterModel = $('#selectOpenRouterModel');
  const aiTestFeedback = $('#aiTestFeedback');
  const btnToggleKeyVisibility = $('#btnToggleKeyVisibility');

  function openAiConfig() {
    if (inputOpenRouterKey) inputOpenRouterKey.value = getOpenRouterKey();
    if (selectOpenRouterModel) selectOpenRouterModel.value = getOpenRouterModel();
    if (aiTestFeedback) aiTestFeedback.style.display = 'none';
    if (aiConfigModal) aiConfigModal.classList.add('open');
    lucide.createIcons();
  }

  btnOpenAiSettings?.addEventListener('click', openAiConfig);
  btnToggleAiConfigModal?.addEventListener('click', openAiConfig);
  btnAiConfigClose?.addEventListener('click', () => aiConfigModal?.classList.remove('open'));
  btnCancelAiConfig?.addEventListener('click', () => aiConfigModal?.classList.remove('open'));

  btnToggleKeyVisibility?.addEventListener('click', () => {
    if (!inputOpenRouterKey) return;
    const isPass = inputOpenRouterKey.type === 'password';
    inputOpenRouterKey.type = isPass ? 'text' : 'password';
    btnToggleKeyVisibility.innerHTML = \`<i data-lucide="\${isPass ? 'eye-off' : 'eye'}" style="width:15px;height:15px;"></i>\`;
    lucide.createIcons();
  });

  btnSaveAiConfig?.addEventListener('click', () => {
    const key = (inputOpenRouterKey?.value || '').trim();
    const model = selectOpenRouterModel?.value || 'meta-llama/llama-3.3-70b-instruct:free';
    if (key) {
      localStorage.setItem(OPENROUTER_KEY_STORAGE, key);
      localStorage.setItem(OPENROUTER_MODEL_STORAGE, model);
      showToast('Configurações de IA salvas com sucesso! ✨');
    } else {
      localStorage.removeItem(OPENROUTER_KEY_STORAGE);
      showToast('Chave OpenRouter removida.');
    }
    aiConfigModal?.classList.remove('open');
  });

  btnTestOpenRouter?.addEventListener('click', async () => {
    const key = (inputOpenRouterKey?.value || '').trim();
    const model = selectOpenRouterModel?.value || 'meta-llama/llama-3.3-70b-instruct:free';
    if (!key) {
      if (aiTestFeedback) {
        aiTestFeedback.style.display = 'block';
        aiTestFeedback.style.background = 'rgba(239, 68, 68, 0.1)';
        aiTestFeedback.style.color = '#f87171';
        aiTestFeedback.textContent = 'Por favor, digite uma chave de API para testar.';
      }
      return;
    }

    if (aiTestFeedback) {
      aiTestFeedback.style.display = 'block';
      aiTestFeedback.style.background = 'rgba(59, 130, 246, 0.1)';
      aiTestFeedback.style.color = '#60a5fa';
      aiTestFeedback.textContent = 'Testando conexão com OpenRouter...';
    }

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${key}\`,
          'HTTP-Referer': 'https://nexus-acervo.vercel.app',
          'X-Title': 'Nexus Acervo',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Ping' }],
          max_tokens: 5
        })
      });
      if (res.ok) {
        aiTestFeedback.style.background = 'rgba(16, 185, 129, 0.1)';
        aiTestFeedback.style.color = '#34d399';
        aiTestFeedback.textContent = '✓ Conexão validada com sucesso no OpenRouter!';
      } else {
        const err = await res.text();
        aiTestFeedback.style.background = 'rgba(239, 68, 68, 0.1)';
        aiTestFeedback.style.color = '#f87171';
        aiTestFeedback.textContent = \`Falha na autenticação (HTTP \${res.status}). Verifique a chave.\`;
      }
    } catch(err) {
      aiTestFeedback.style.background = 'rgba(239, 68, 68, 0.1)';
      aiTestFeedback.style.color = '#f87171';
      aiTestFeedback.textContent = \`Erro de rede: \${err.message}\`;
    }
  });

  // --------------------------------------------------------------------------
  // AUTO-PREENCHIMENTO COM IA NO MODAL DE NOVO RECURSO
  // --------------------------------------------------------------------------
  const btnRunAiAutoFill = $('#btnRunAiAutoFill');
  const aiAutoUrlInput = $('#aiAutoUrlInput');
  const aiAutoFillStatus = $('#aiAutoFillStatus');
  const btnOpenAiImport = $('#btnOpenAiImport');

  btnOpenAiImport?.addEventListener('click', () => {
    $('#addModal')?.classList.add('open');
    setTimeout(() => aiAutoUrlInput?.focus(), 150);
  });

  btnRunAiAutoFill?.addEventListener('click', async () => {
    const url = (aiAutoUrlInput?.value || '').trim();
    if (!url) {
      showToast('Por favor, informe uma URL para importação.');
      aiAutoUrlInput?.focus();
      return;
    }

    if (aiAutoFillStatus) {
      aiAutoFillStatus.style.display = 'block';
      aiAutoFillStatus.style.color = '#60a5fa';
      aiAutoFillStatus.textContent = '⚡ Analisando recurso e extraindo metadados...';
    }

    try {
      const baseData = await extractMetadataFromUrl(url);

      const apiKey = getOpenRouterKey();
      let finalData = baseData;

      if (apiKey) {
        if (aiAutoFillStatus) {
          aiAutoFillStatus.textContent = '🤖 Sintetizando descrição executiva e entregável via IA...';
        }
        try {
          const aiData = await synthesizeWithOpenRouter(url, baseData, apiKey, getOpenRouterModel());
          finalData = { ...baseData, ...aiData };
        } catch(aiErr) {
          console.warn('Falha no OpenRouter, aplicando extração base:', aiErr);
        }
      }

      // Preencher formulário
      const form = $('#addItemForm');
      if (form) {
        if (form.elements['title'] && finalData.title) form.elements['title'].value = finalData.title;
        if (form.elements['kind'] && finalData.kind) form.elements['kind'].value = finalData.kind;
        if (form.elements['url']) form.elements['url'].value = url;
        if (form.elements['segment'] && finalData.segment) form.elements['segment'].value = finalData.segment;
        if (form.elements['description'] && finalData.description) form.elements['description'].value = finalData.description;
        if (form.elements['deliverable'] && finalData.deliverable) form.elements['deliverable'].value = finalData.deliverable;
        if (form.elements['practicalExample'] && finalData.practicalExample) form.elements['practicalExample'].value = finalData.practicalExample;
        if (form.elements['targetAudience'] && finalData.targetAudience) form.elements['targetAudience'].value = finalData.targetAudience;
        if (form.elements['tags'] && Array.isArray(finalData.tags)) form.elements['tags'].value = finalData.tags.join(', ');
      }

      if (aiAutoFillStatus) {
        aiAutoFillStatus.style.color = '#34d399';
        aiAutoFillStatus.textContent = apiKey 
          ? '✓ Recurso sintetizado e preenchido com IA com sucesso!'
          : '✓ Metadados extraídos! (Adicione sua chave OpenRouter para síntese executiva por IA).';
      }

      showToast('Formulário preenchido automaticamente! ✨');
    } catch(err) {
      if (aiAutoFillStatus) {
        aiAutoFillStatus.style.color = '#f87171';
        aiAutoFillStatus.textContent = \`Erro ao extrair: \${err.message}\`;
      }
    }
  });
`;

if (!html.includes('btnRunAiAutoFill?.addEventListener')) {
  html = html.replace('// Formulário Salvar no Acervo', `${initEventListenersSnippet}\n\n  // Formulário Salvar no Acervo`);
  console.log('✓ Event Listeners para ⌘K, OpenRouter e Auto-Fill integrados.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('=== CONSOLIDAÇÃO CONCLUÍDA EM nexus-acervo.html ===');
