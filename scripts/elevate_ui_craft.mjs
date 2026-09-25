import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, '../nexus-acervo.html');

console.log('--- ELEVANDO APLICAÇÃO AO PADRÃO SINDRE SORHUS AWESOME ($50K STANDARD) ---');

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. REFATORAÇÃO DO LOGO DA SIDEBAR (Eliminar AI Slop / Neon Grad / Glow Blur)
const oldBrandLogo = `<div class="brand-logo-container">
        <svg class="brand-svg-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nexusSupremeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" />
              <stop offset="50%" stop-color="#06b6d4" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
            <filter id="nexusSupremeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="36" height="36" rx="9" fill="#18181b" stroke="rgba(255,255,255,0.12)" stroke-width="1.2" />
          <path d="M18 7L27 12.5V23.5L18 29L9 23.5V12.5L18 7Z" stroke="url(#nexusSupremeGrad)" stroke-width="2" stroke-linejoin="round" fill="rgba(16,185,129,0.08)" />
          <path d="M18 7V29M9 12.5L27 23.5M9 23.5L27 12.5" stroke="url(#nexusSupremeGrad)" stroke-width="1.2" stroke-linecap="round" opacity="0.65" />
          <circle cx="18" cy="18" r="2.8" fill="#fafafa" filter="url(#nexusSupremeGlow)" />
        </svg>
      </div>`;

const newBrandLogo = `<div class="brand-logo-container">
        <svg class="brand-svg-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="8" fill="#141416" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <path d="M18 8L27.5 13.5V24.5L18 30L8.5 24.5V13.5L18 8Z" stroke="#10b981" stroke-width="1.8" stroke-linejoin="round" fill="rgba(16,185,129,0.06)" />
          <path d="M18 8V30M8.5 13.5L27.5 24.5M8.5 24.5L27.5 13.5" stroke="#10b981" stroke-width="1" stroke-linecap="round" opacity="0.4" />
          <circle cx="18" cy="18" r="2.5" fill="#f4f4f5" />
        </svg>
      </div>`;

if (html.includes(oldBrandLogo)) {
  html = html.replace(oldBrandLogo, newBrandLogo);
  console.log('✓ Logo da sidebar atualizado para padrão suíço monolítico (Zero AI Slop).');
}

// 2. EMIL KOWALSKI DESIGN ENGINEERING CSS (Física de Botões, :active, Modais e Transições Explícitas)
const emilDesignCss = `
/* --- EMIL KOWALSKI DESIGN ENGINEERING: RESPOSTA TÁTIL & CURVAS FÍSICAS --- */
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}

/* Feedback tátil nos botões (:active com escala sutil de compressão física) */
.btn:active,
.nav-btn:active,
.card-action-btn:active,
.icon-action-btn:active,
.card-favorite-toggle:active,
.tile-button-card:active,
.modal-close-icon:active,
.tab-btn:active {
  transform: scale(0.97) !important;
  transition-duration: 70ms !important;
}

/* Entrada física de modais com escala de 0.95 para 1 e blur progressivo */
.clean-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms var(--ease-out);
}

.clean-modal.open {
  display: flex !important;
  opacity: 1;
  pointer-events: auto;
}

.clean-modal .modal-dialog {
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08);
  width: min(800px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  transform: scale(0.96) translateY(6px);
  opacity: 0;
  transition: transform 220ms var(--ease-out), opacity 200ms ease-out;
}

.clean-modal.open .modal-dialog {
  transform: scale(1) translateY(0);
  opacity: 1;
}

/* Tipografia de Alta Precisão (Swiss Typography & Anti-Widows) */
h1, h2, h3, .brand-title {
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.card-headline-title {
  letter-spacing: -0.015em;
  font-weight: 700;
  line-height: 1.35;
}
`;

// Substituir o bloco CSS antigo de .clean-modal pelo refinado
const oldCleanModalCss = `.clean-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: none;
  place-items: center;
  padding: 1.5rem;
}

.clean-modal.open { display: grid; }`;

if (html.includes(oldCleanModalCss)) {
  html = html.replace(oldCleanModalCss, emilDesignCss);
  console.log('✓ CSS de física e microinterações Emil Kowalski injetado.');
}

// 3. ENRIQUECER MODAL DE DETALHES COM OS NOVOS CAMPOS EXECUTIVOS ($50K STANDARD)
// Inserir após a div de "O QUE ENTREGA":
const targetModalDeliverable = `<!-- O QUE ENTREGA -->
      <div class="callout-deliverable" style="padding: 0.85rem 1rem; font-size: 0.85rem;">
        <i data-lucide="zap"></i>
        <div>
          <strong style="color: var(--text); display: block; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 0.2rem;">⚡ O que entrega:</strong>
          <span id="modalDeliverable">-</span>
        </div>
      </div>`;

const newExecutiveBlocks = `<!-- RESUMO EXECUTIVO (DECISÃO EM 5S) -->
      <div id="modalSummaryWrap" style="display: none; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-size: 0.85rem; line-height: 1.55;">
        <div style="display: flex; align-items: center; gap: 0.4rem; color: #10b981; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.35rem;">
          <i data-lucide="compass" style="width:14px;height:14px;"></i>
          <span>Resumo Executivo</span>
        </div>
        <p id="modalSummary" style="color: var(--text); margin: 0; font-weight: 500;">-</p>
      </div>

      <!-- O QUE ENTREGA -->
      <div class="callout-deliverable" style="padding: 0.85rem 1rem; font-size: 0.85rem;">
        <i data-lucide="zap"></i>
        <div>
          <strong style="color: var(--text); display: block; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 0.2rem;">⚡ O que entrega:</strong>
          <span id="modalDeliverable">-</span>
        </div>
      </div>

      <!-- PRINCIPAIS APRENDIZADOS (KEY TAKEAWAYS) -->
      <div id="modalTakeawaysWrap" style="display: none; background: var(--surface2); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-size: 0.85rem;">
        <strong style="color: var(--text); display: block; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 0.45rem;">🎯 Principais Aprendizados (Key Takeaways):</strong>
        <ul id="modalTakeawaysList" style="margin: 0; padding-left: 1.2rem; color: var(--muted-text); line-height: 1.6;"></ul>
      </div>

      <!-- PRÓXIMA AÇÃO CONCRETA (ACTION) -->
      <div id="modalActionWrap" style="display: none; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 0.4rem; color: #60a5fa; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.3rem;">
          <i data-lucide="arrow-right-circle" style="width:14px;height:14px;"></i>
          <span>Próximo Passo / Ação Recomendada:</span>
        </div>
        <p id="modalAction" style="color: var(--text); margin: 0; font-weight: 500;">-</p>
      </div>`;

if (html.includes(targetModalDeliverable)) {
  html = html.replace(targetModalDeliverable, newExecutiveBlocks);
  console.log('✓ Blocos executivos (Resumo, Takeaways, Ação) injetados no HTML do modal.');
}

// 4. ATUALIZAR FUNÇÃO openDetailModal NO JAVASCRIPT PARA POPULAR OS NOVOS CAMPOS
const targetJsInModal = `$('#modalDeliverable').textContent = item.deliverable || item.description;`;
const newJsInModal = `$('#modalDeliverable').textContent = item.deliverable || item.description;

  // Renderização de Novos Metadados Premium
  const summaryWrap = $('#modalSummaryWrap');
  const summaryEl = $('#modalSummary');
  if (item.summary && summaryWrap && summaryEl) {
    summaryWrap.style.display = 'block';
    summaryEl.textContent = item.summary;
  } else if (summaryWrap) {
    summaryWrap.style.display = 'none';
  }

  const takeawaysWrap = $('#modalTakeawaysWrap');
  const takeawaysList = $('#modalTakeawaysList');
  if (Array.isArray(item.keyTakeaways) && item.keyTakeaways.length && takeawaysWrap && takeawaysList) {
    takeawaysWrap.style.display = 'block';
    takeawaysList.innerHTML = item.keyTakeaways.map(t => '<li>' + esc(t) + '</li>').join('');
  } else if (takeawaysWrap) {
    takeawaysWrap.style.display = 'none';
  }

  const actionWrap = $('#modalActionWrap');
  const actionEl = $('#modalAction');
  if (item.action && actionWrap && actionEl) {
    actionWrap.style.display = 'block';
    actionEl.textContent = item.action;
  } else if (actionWrap) {
    actionWrap.style.display = 'none';
  }`;

if (html.includes(targetJsInModal)) {
  html = html.replace(targetJsInModal, newJsInModal);
  console.log('✓ JavaScript do modal de detalhes atualizado para popular metadados executivos.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('nexus-acervo.html atualizado com sucesso.');
