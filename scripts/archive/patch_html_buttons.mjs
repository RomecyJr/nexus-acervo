import fs from 'node:fs';

const htmlFile = new URL('../nexus-acervo.html', import.meta.url);
let html = fs.readFileSync(htmlFile, 'utf8');

// 1. Inserir botão Excluídos na Sidebar após "Já Vistos"
const targetSeenNav = `<button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos e já assistidos">
            <span class="nav-btn-inner"><i data-lucide="check-circle-2" style="color:#10b981;"></i> Já Vistos (Concluídos)</span>
            <span class="nav-pill-count" id="countSeen">0</span>
          </button>`;

const replacementSeenNav = `<button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos e já assistidos">
            <span class="nav-btn-inner"><i data-lucide="check-circle-2" style="color:#10b981;"></i> Já Vistos (Concluídos)</span>
            <span class="nav-pill-count" id="countSeen">0</span>
          </button>
          <button class="nav-btn" data-read="deleted" aria-label="Recursos descartados ou excluídos">
            <span class="nav-btn-inner"><i data-lucide="trash-2" style="color:#ef4444;"></i> Excluídos (Lixeira)</span>
            <span class="nav-pill-count" id="countDeleted">0</span>
          </button>`;

if (html.includes(targetSeenNav) && !html.includes('id="countDeleted"')) {
  html = html.replace(targetSeenNav, () => replacementSeenNav);
}

// 2. Inserir botão Excluídos no #readStatusGroup após Vistos
const targetStatusBtn = `<button class="status-toggle-btn" data-read="seen" aria-label="Apenas o que já assisti ou verifiquei"><i data-lucide="check-circle-2" style="width:13px;height:13px;"></i> Vistos (<span id="statusCountSeen">0</span>)</button>`;

const replacementStatusBtn = `<button class="status-toggle-btn" data-read="seen" aria-label="Apenas o que já assisti ou verifiquei"><i data-lucide="check-circle-2" style="width:13px;height:13px;"></i> Vistos (<span id="statusCountSeen">0</span>)</button>
          <button class="status-toggle-btn" data-read="deleted" aria-label="Recursos excluídos da listagem"><i data-lucide="trash-2" style="width:13px;height:13px;"></i> Excluídos (<span id="statusCountDeleted">0</span>)</button>`;

if (html.includes(targetStatusBtn) && !html.includes('id="statusCountDeleted"')) {
  html = html.replace(targetStatusBtn, () => replacementStatusBtn);
}

// 3. Corrigir $('.card-seen-toggle') e $('.btn-trash-toggle') para $$
html = html.replace(
  "  $('.card-seen-toggle').forEach(btn => {",
  "  $$('.card-seen-toggle').forEach(btn => {"
);

html = html.replace(
  "  $('.btn-trash-toggle').forEach(btn => {",
  "  $$('.btn-trash-toggle').forEach(btn => {"
);

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('✅ nexus-acervo.html botões e queries corrigidos.');
