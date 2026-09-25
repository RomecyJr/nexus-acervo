import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');
const catalogPath = path.resolve(rootDir, 'data/catalog.json');

console.log('=== APLICANDO REMEDIAÇÃO PERFEITA V3.0 (PADRÃO $50K LINEAR & SINDRE SORHUS) ===');

// 1. Limpeza rigorosa no catalog.json
let catalogRaw = fs.readFileSync(catalogPath, 'utf8');
let catalog = JSON.parse(catalogRaw);

let updatedSources = 0;
catalog.items.forEach(item => {
  if (item.source === 'Segundo Cérebro / Instagram') {
    item.source = 'Curadoria Nexus / Instagram';
    updatedSources++;
  } else if (item.source === 'Nexus Segundo Cérebro') {
    item.source = 'Nexus Acervo';
    updatedSources++;
  }
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`✓ Catalog.json sanitizado (${updatedSources} fontes atualizadas).`);

// 2. Refinamento cirúrgico no HTML
let html = fs.readFileSync(htmlPath, 'utf8');

// A. Meta tags e scripts do head
html = html.replace(
  /<meta name="description" content="Nexus Acervo - Segundo Cérebro[^"]*">/i,
  '<meta name="description" content="Nexus Acervo v3.0 - Catálogo de Referência & Curadoria Técnica de Ferramentas, Repositórios, Vídeos e Recursos com Exemplos Práticos.">'
);

html = html.replace('catalog.js?v=2.0.0', 'catalog.js?v=3.0.0');

// B. Eliminação definitiva de justify-content: space-between na sidebar
// Isso elimina o espaçamento bizarro e indesejado apontado pelo usuário!
const oldSidebarCss = `.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  z-index: 40;
}`;

const newSidebarCss = `.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  z-index: 40;
}`;

if (html.includes(oldSidebarCss)) {
  html = html.replace(oldSidebarCss, newSidebarCss);
  console.log('✓ Sidebar convertida para layout fixo 100dvh com overflow controlado.');
}

// C. Injeção de CSS de alta precisão para nav-body e microinterações
const navBodyCssSnippet = `
.nav-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.65rem 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.nav-body::-webkit-scrollbar {
  width: 5px;
}
.nav-body::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 9999px;
}

.nav-section-title {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--faint);
  padding: 0 0.5rem;
  margin-bottom: 0.35rem;
}

/* Ícones semânticos da sidebar estilo Linear / Raycast */
.nav-btn[data-kind="all"] i { color: #f4f4f5; }
.nav-btn[data-kind="vídeo"] i { color: #38bdf8; }
.nav-btn[data-kind="repositório"] i { color: #e2e8f0; }
.nav-btn[data-kind="ferramenta"] i { color: #a78bfa; }
.nav-btn[data-kind="conhecimento"] i { color: #34d399; }
.nav-btn[data-kind="carrossel"] i { color: #fb7185; }

.nav-btn[data-kind="favorites"] i { color: #fbbf24; }
.nav-btn[data-read="unseen"] i { color: #60a5fa; }
.nav-btn[data-read="seen"] i { color: #34d399; }
.nav-btn[data-read="deleted"] i { color: #f87171; }

.nav-btn.active {
  background: var(--surface3) !important;
  color: #fff !important;
  box-shadow: inset 2px 0 0 #10b981;
}

/* Estrela de favoritos preenchida em dourado radiante quando ativa */
.card-favorite-toggle.is-fav svg,
.card-favorite-toggle.is-fav i {
  color: #f59e0b !important;
  fill: #f59e0b !important;
}

/* Botão de exclusão nítido no rodapé do card */
.card-delete-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  height: 26px;
  padding: 0 0.5rem;
  border-radius: 6px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--faint);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 140ms ease;
}
.card-delete-action-btn:hover {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.35);
  color: #f87171;
}
`;

if (!html.includes('.nav-btn.active {') && !html.includes('navBodyCssSnippet')) {
  html = html.replace('/* User Profile & Auth Badges */', `${navBodyCssSnippet}\n\n/* User Profile & Auth Badges */`);
  console.log('✓ CSS de elite para sidebar e cartões injetado.');
}

// D. Remover a lixeira rápida ("bolinha esquisita") do topo dos cards
// Em repositórios e ferramentas, removemos card-quick-trash do cabeçalho
html = html.replace(
  /<button class="card-action-btn btn-trash-toggle card-quick-trash[^>]*><i data-lucide="[^"]*" style="width:12px;height:12px;"><\/i><\/button>/g,
  ''
);
console.log('✓ Bolinha esquisita / lixeira duplicada eliminada dos cabeçalhos dos cards.');

// E. Padronizar o rodapé dos cards para incluir botão claro de exclusão/restauração
const oldFootActionsHtml = `      const footActionsHtml = \`
        <div class="card-foot-actions">
          <div class="card-action-btns-group">
            \${!isDeleted ? \`
              <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para alternar)' : 'Marcar como visto'}">
                <i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i>
                <span>\${isSeen ? 'Visto' : 'Marcar'}</span>
              </button>
              <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="Anotar insight pessoal">
                <i data-lucide="file-text" style="width:13px;height:13px;"></i>
                <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span>
              </button>
              <button class="icon-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
            \` : \`
              <button class="card-action-btn btn-trash-toggle btn-restore-active" data-trash-id="\${esc(item.id)}" title="Restaurar para acervo ativo">
                <i data-lucide="rotate-ccw" style="width:13px;height:13px;"></i>
                <span>Restaurar</span>
              </button>
            \`}
          </div>
          <div class="card-button-links">
            <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
            \${item.id === 'repo-documenso' ? \`<button class="btn secondary sm btn-open-documenso" style="font-size:0.72rem; height:26px; padding:0 0.55rem; gap:0.3rem;" title="Abrir Estúdio de Assinatura" aria-label="Abrir Documenso Studio"><i data-lucide="pen-tool" style="width:12px;height:12px;"></i><span>Assinar</span></button>\` : ''}
            <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir link externo" aria-label="Abrir link externo"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
          </div>
        </div>
      \`;`;

const newFootActionsHtml = `      const footActionsHtml = \`
        <div class="card-foot-actions">
          <div class="card-action-btns-group">
            \${!isDeleted ? \`
              <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para alternar)' : 'Marcar como visto'}">
                <i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i>
                <span>\${isSeen ? 'Visto' : 'Marcar'}</span>
              </button>
              <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="Anotar insight pessoal">
                <i data-lucide="file-text" style="width:13px;height:13px;"></i>
                <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span>
              </button>
              <button class="card-delete-action-btn btn-trash-toggle" data-trash-id="\${esc(item.id)}" title="Excluir do acervo (enviar para lixeira)" aria-label="Excluir item">
                <i data-lucide="trash-2" style="width:13px;height:13px;"></i>
              </button>
              <button class="icon-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
            \` : \`
              <button class="card-action-btn btn-trash-toggle btn-restore-active" data-trash-id="\${esc(item.id)}" title="Restaurar para o acervo ativo">
                <i data-lucide="rotate-ccw" style="width:13px;height:13px;"></i>
                <span>Restaurar</span>
              </button>
            \`}
          </div>
          <div class="card-button-links">
            <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
            \${item.id === 'repo-documenso' ? \`<button class="btn secondary sm btn-open-documenso" style="font-size:0.72rem; height:26px; padding:0 0.55rem; gap:0.3rem;" title="Abrir Estúdio de Assinatura" aria-label="Abrir Documenso Studio"><i data-lucide="pen-tool" style="width:12px;height:12px;"></i><span>Assinar</span></button>\` : ''}
            <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir link externo" aria-label="Abrir link externo"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
          </div>
        </div>
      \`;`;

if (html.includes(oldFootActionsHtml)) {
  html = html.replace(oldFootActionsHtml, newFootActionsHtml);
  console.log('✓ Rodapé dos cards atualizado com botão de exclusão perfeitamente posicionado.');
}

// F. Atualizar lógica de sincronização da Sidebar em syncFilterControls()
const oldSyncFilterControls = `function syncFilterControls() {
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

const newSyncFilterControls = `function syncFilterControls() {
  const isCustomReadFilter = state.readFilter !== 'all';

  $$('.nav-btn[data-kind]').forEach(b => {
    // Se estiver em filtro de leitura (não visto, visto, lixeira), desativa abas de kind
    b.classList.toggle('active', !isCustomReadFilter && b.dataset.kind === state.kind);
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

if (html.includes(oldSyncFilterControls)) {
  html = html.replace(oldSyncFilterControls, newSyncFilterControls);
  console.log('✓ Sincronização inteligente dos botões da sidebar corrigida.');
}

// G. Otimização do Filtro de Estrelas GitHub
const oldStarsFilterOnchange = `  if ($('#starsFilter')) {
    $('#starsFilter').onchange = e => {
      state.minStars = parseInt(e.target.value, 10) || 0;
      renderCards();
    };
  }`;

const newStarsFilterOnchange = `  if ($('#starsFilter')) {
    $('#starsFilter').onchange = e => {
      state.minStars = parseInt(e.target.value, 10) || 0;
      // Se usuário filtrou estrelas mas estava em uma aba sem estrelas (ex: vídeo), expande para all
      if (state.minStars > 0 && state.kind !== 'all' && state.kind !== 'repositório' && state.kind !== 'ferramenta') {
        state.kind = 'all';
        syncFilterControls();
      }
      renderCards();
      const count = getFilteredItems().length;
      if (state.minStars > 0) {
        showToast(\`Filtro ativo: \${count} recursos com ≥ \${state.minStars.toLocaleString('pt-BR')} estrelas GitHub ⭐\`);
      } else {
        showToast('Filtro de estrelas resetado');
      }
    };
  }`;

if (html.includes(oldStarsFilterOnchange)) {
  html = html.replace(oldStarsFilterOnchange, newStarsFilterOnchange);
  console.log('✓ Filtro de estrelas enriquecido com auto-expansão e feedback ao usuário.');
}

// H. Substituir menções remanescentes de "Segundo Cérebro" em textos e arquivos
html = html.replace(/Segundo_Cerebro_Vault_Nexus\.md/g, 'Nexus_Acervo_Vault.md');
html = html.replace(/<recurso_segundo_cerebro>/g, '<recurso_acervo>');
html = html.replace(/<\/recurso_segundo_cerebro>/g, '<\/recurso_acervo>');
html = html.replace(/\*Nexus Acervo — Segundo Cérebro\*/g, '*Nexus Acervo — Catálogo & Curadoria*');
html = html.replace(/\*Exportado via Nexus Acervo — Segundo Cérebro Profissional\*/g, '*Exportado via Nexus Acervo*');
html = html.replace(
  /\$('#modalSource')\.textContent = item\.source \|\| 'Segundo Cérebro';/g,
  "$('#modalSource').textContent = item.source || 'Nexus Acervo';"
);
html = html.replace(/\/\/ SEGUNDO CÉREBRO: SISTEMA DE ANOTAÇÕES/g, '// SISTEMA DE ANOTAÇÕES');

// I. Enriquecer o Gatekeeper com Checkbox "Lembrar de mim"
const oldVaultForm = `<button type="submit" class="vault-submit-btn" id="btnGateUnlock">
        <i data-lucide="key-round" style="width:15px;height:15px;"></i>
        <span>Desbloquear Cofre</span>
      </button>`;

const newVaultForm = `<div style="display:flex;align-items:center;gap:0.5rem;font-size:0.78rem;color:#a1a1aa;margin:0.25rem 0;">
        <input type="checkbox" id="gateRememberMe" style="cursor:pointer;accent-color:#10b981;width:15px;height:15px;" checked>
        <label for="gateRememberMe" style="cursor:pointer;user-select:none;font-weight:500;text-transform:none;letter-spacing:normal;">Manter conectado neste navegador</label>
      </div>

      <button type="submit" class="vault-submit-btn" id="btnGateUnlock">
        <i data-lucide="key-round" style="width:15px;height:15px;"></i>
        <span>Desbloquear Cofre</span>
      </button>`;

if (html.includes(oldVaultForm)) {
  html = html.replace(oldVaultForm, newVaultForm);
  console.log('✓ Checkbox de persistência segura injetada na tela de login.');
}

// J. Atualizar a lógica de submissão do Gatekeeper para respeitar "Lembrar de mim"
const oldGateSubmitLogic = `      if (validUsers.includes(u) && validPasswords.includes(p)) {
        if (gateError) gateError.style.display = 'none';
        unlockVault(true);
      }`;

const newGateSubmitLogic = `      const remember = $('#gateRememberMe') ? $('#gateRememberMe').checked : true;
      if (validUsers.includes(u) && validPasswords.includes(p)) {
        if (gateError) gateError.style.display = 'none';
        unlockVault(remember);
      }`;

if (html.includes(oldGateSubmitLogic)) {
  html = html.replace(oldGateSubmitLogic, newGateSubmitLogic);
  console.log('✓ Lógica de autenticação com persistência seletiva ativada.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('=== REMEDIAÇÃO CONCLUÍDA EM nexus-acervo.html ===');
