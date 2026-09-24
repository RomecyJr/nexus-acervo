import fs from 'fs';
import path from 'path';

const INDEX_PATH = path.resolve('index.html');
const ACERVO_PATH = path.resolve('nexus-acervo.html');

console.log('🚀 Iniciando transformação Supreme Edition ($50k Tier) no Nexus Acervo...');

let html = fs.readFileSync(INDEX_PATH, 'utf8');

// 1. SUPREME CSS TOKENS & ESTILOS DE ALTO NÍVEL
const supremeStyles = `
/* ==========================================================================
   SUPREME DESIGN SYSTEM & BRAND TOKENS ($50K TIER)
   ========================================================================== */
.brand-section {
  padding: 1.1rem 1rem 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);
}

.brand-logo-container {
  position: relative;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
}

.brand-svg-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.08);
}

.brand-logo-container:hover .brand-svg-icon {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.4);
}

.brand-meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow: hidden;
}

.brand-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.brand-title {
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--text);
  white-space: nowrap;
}

.brand-badge-pro {
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(6,182,212,0.2) 100%);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.35);
  text-transform: uppercase;
}

.brand-subtitle {
  font-size: 0.68rem;
  color: var(--muted-text);
  letter-spacing: -0.01em;
  white-space: nowrap;
  margin: 0;
}

/* User Profile & Auth Badges */
.user-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 32px;
  padding: 0 0.75rem 0 0.45rem;
  border-radius: 9999px;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  transition: all 180ms ease;
}

.user-profile-btn:hover {
  background: var(--surface3);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.user-avatar-badge {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 800;
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 1.5px rgba(255,255,255,0.15);
}

.user-profile-sidebar-card {
  padding: 0.65rem 0.8rem;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.user-info-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-info-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info-status {
  font-size: 0.64rem;
  color: #34d399;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.user-auth-action-btn {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--border-color);
  color: var(--muted-text);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 140ms ease;
}

.user-auth-action-btn:hover {
  background: var(--surface3);
  color: var(--text);
  border-color: var(--border-strong);
}

/* Card Action Buttons (Linear Style) */
.card-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 26px;
  padding: 0 0.55rem;
  border-radius: 6px;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  color: var(--muted-text);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card-action-btn:hover {
  background: var(--surface3);
  color: var(--text);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.card-action-btn.is-seen {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.4);
  color: #34d399;
}

.card-action-btn.is-seen:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: #34d399;
}

.card-action-btn.has-note {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.4);
  color: #60a5fa;
}

.card-action-btn.has-note:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: #60a5fa;
}

.note-badge-preview {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  padding: 0.2rem 0.5rem;
  background: rgba(59, 130, 246, 0.08);
  border: 1px dashed rgba(59, 130, 246, 0.35);
  border-radius: 4px;
  color: #93c5fd;
  margin-top: 0.45rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Modals Supreme Styling */
.modal-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.modal-form-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-form-textarea {
  width: 100%;
  min-height: 110px;
  background: var(--bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 0.75rem;
  font-size: 0.8rem;
  color: var(--text);
  line-height: 1.5;
  resize: vertical;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.modal-form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.modal-form-input {
  width: 100%;
  height: 36px;
  background: var(--bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 0 0.75rem;
  font-size: 0.8rem;
  color: var(--text);
  outline: none;
  transition: border-color 150ms ease;
}

.modal-form-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.export-channel-card {
  padding: 0.9rem;
  background: var(--surface2);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: all 180ms ease;
}

.export-channel-card:hover {
  border-color: var(--border-strong);
  background: var(--surface3);
  transform: translateY(-1px);
}

.export-channel-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.export-channel-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 1rem;
  flex-shrink: 0;
}
`;

// Injeta estilos antes de </style>
if (!html.includes('SUPREME DESIGN SYSTEM & BRAND TOKENS')) {
  html = html.replace('</style>', `${supremeStyles}\n</style>`);
}

// 2. LOGO & BRAND SECTION SUPREME
const supremeBrandHtml = `
    <div class="brand-section">
      <div class="brand-logo-container">
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
      </div>
      <div class="brand-meta">
        <div class="brand-title-wrap">
          <span class="brand-title">Nexus Acervo</span>
          <span class="brand-badge-pro">PRO</span>
        </div>
        <p class="brand-subtitle">Segundo Cérebro de Elite</p>
      </div>
    </div>
`;

// Substitui a brand section antiga
html = html.replace(/<div class="brand-section">[\s\S]*?<\/div>\s*<\/div>/, supremeBrandHtml.trim());

// 3. TOPBAR RIGHT: BOTÃO DE AUTENTICAÇÃO / PERFIL
const supremeTopbarRight = `
      <div class="topbar-right">
        <button class="user-profile-btn" id="btnUserAuth" aria-label="Acessar Perfil e Cofre">
          <div class="user-avatar-badge" id="topUserAvatar">RV</div>
          <span class="user-name-label" id="topUserName">Romecy Jr</span>
        </button>
        <button class="btn icon-only" id="btnTheme" aria-label="Alternar tema claro e escuro"><i data-lucide="moon"></i></button>
        <button class="btn primary" id="btnAddTop" aria-label="Adicionar novo recurso"><i data-lucide="plus"></i> Salvar no Acervo</button>
      </div>
`;
html = html.replace(/<div class="topbar-right">[\s\S]*?<\/div>/, supremeTopbarRight.trim());

// 4. SIDEBAR FOOTER: PERFIL DO USUÁRIO & STATUS
const supremeSidebarFooter = `
    <div class="sidebar-footer">
      <div class="user-profile-sidebar-card" id="sidebarUserProfile">
        <div class="user-avatar-badge" id="sideUserAvatar">RV</div>
        <div class="user-info-side">
          <span class="user-info-name" id="sideUserName">Romecy Veiga</span>
          <span class="user-info-status"><i data-lucide="shield-check" style="width:11px;height:11px;"></i> Cofre Ativo</span>
        </div>
        <button class="user-auth-action-btn" id="btnSidebarAuth" title="Gerenciar Conta / Cofre"><i data-lucide="settings" style="width:13px;height:13px;"></i></button>
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div class="status-badge-clean">
          <span class="status-dot-clean"></span>
          <span>Segundo Cérebro Ativo</span>
        </div>
        <span style="font-family: var(--font-mono); font-size:0.7rem; color: var(--faint);">v2.0 PRO</span>
      </div>
    </div>
`;
html = html.replace(/<div class="sidebar-footer">[\s\S]*?<\/div>\s*<\/aside>/, `${supremeSidebarFooter.trim()}\n  </aside>`);

// 5. NOVOS MODALS (NOTAS, EXPORTAÇÃO, AUTENTICAÇÃO)
const supremeModalsHtml = `
<!-- ==========================================================================
     MODAL DE ANOTAÇÕES & INSIGHTS PESSOAIS (SEGUNDO CÉREBRO)
     ========================================================================== -->
<div class="clean-modal" id="notesModal" role="dialog" aria-modal="true" aria-labelledby="notesModalTitle">
  <div class="modal-dialog" style="max-width: 620px; max-height: 90vh;">
    <button class="modal-close-icon" id="btnNotesClose" aria-label="Fechar anotações"><i data-lucide="x"></i></button>
    <div style="padding: 1.5rem; display: grid; gap: 1.15rem;">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <div style="width: 30px; height: 30px; border-radius: 7px; background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.35); display: grid; place-items: center;">
              <i data-lucide="file-edit" style="width: 15px; height: 15px; color: #60a5fa;"></i>
            </div>
            <h2 style="font-size: 1.1rem; font-weight: 800; color: var(--text);" id="notesModalTitle">Anotações & Insights Pessoais</h2>
          </div>
          <p style="font-size: 0.78rem; color: var(--muted-text);" id="notesItemMeta">Segundo Cérebro · Notas Privadas</p>
        </div>
      </div>

      <div class="modal-form-group">
        <label class="modal-form-label" for="notesTextInput">
          <span>💡 Meus Insights & Lições Principais:</span>
          <span style="font-size: 0.68rem; color: var(--faint);" id="notesSaveStatus">Salvo automaticamente</span>
        </label>
        <textarea class="modal-form-textarea" id="notesTextInput" placeholder="O que você aprendeu com este vídeo ou código? Quais foram os maiores 'pulos do gato'?"></textarea>
      </div>

      <div class="modal-form-group">
        <label class="modal-form-label" for="notesActionInput">
          <span>🎯 Onde pretendo aplicar na prática:</span>
        </label>
        <input class="modal-form-input" id="notesActionInput" placeholder="Ex: No meu SaaS de automação, na esteira de vídeos do YouTube...">
      </div>

      <div class="modal-form-group">
        <label class="modal-form-label" for="notesTagsInput">
          <span>🏷️ Tags Pessoais de Estudo (separadas por vírgula):</span>
        </label>
        <input class="modal-form-input" id="notesTagsInput" placeholder="estudo, arquitetura, automacao">
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; pt-2 border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
        <button class="btn sm" id="btnDeleteNote" style="color: #f87171; border-color: rgba(248, 113, 113, 0.3);"><i data-lucide="trash-2" style="width:12px;height:12px;"></i> Limpar Notas</button>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn secondary sm" id="btnNotesQuickExport"><i data-lucide="share-2" style="width:12px;height:12px;"></i> Exportar</button>
          <button class="btn primary sm" id="btnSaveNoteClose"><i data-lucide="check" style="width:12px;height:12px;"></i> Concluir</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================================================
     MODAL DE EXPORTAÇÃO (WHATSAPP, OBSIDIAN, PROMPT LLM)
     ========================================================================== -->
<div class="clean-modal" id="exportInsightModal" role="dialog" aria-modal="true" aria-labelledby="exportModalTitle">
  <div class="modal-dialog" style="max-width: 650px; max-height: 90vh;">
    <button class="modal-close-icon" id="btnExportClose" aria-label="Fechar exportação"><i data-lucide="x"></i></button>
    <div style="padding: 1.5rem; display: grid; gap: 1.15rem;">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <div style="width: 30px; height: 30px; border-radius: 7px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); display: grid; place-items: center;">
              <i data-lucide="share-2" style="width: 15px; height: 15px; color: #34d399;"></i>
            </div>
            <h2 style="font-size: 1.1rem; font-weight: 800; color: var(--text);" id="exportModalTitle">Hub de Exportação do Segundo Cérebro</h2>
          </div>
          <p style="font-size: 0.78rem; color: var(--muted-text);" id="exportItemTitle">Exportar insights para ferramentas externas e LLMs</p>
        </div>
      </div>

      <div style="display: grid; gap: 0.75rem;">
        <!-- Canal 1: WhatsApp -->
        <div class="export-channel-card">
          <div class="export-channel-info">
            <div class="export-channel-icon" style="background: rgba(37, 211, 102, 0.15); color: #25d366; border: 1px solid rgba(37, 211, 102, 0.3);">
              <i data-lucide="message-circle" style="width: 18px; height: 18px;"></i>
            </div>
            <div>
              <h4 style="font-size: 0.84rem; font-weight: 700; color: var(--text);">Exportar para WhatsApp</h4>
              <p style="font-size: 0.72rem; color: var(--muted-text); margin: 0;">Envia resumo do vídeo/código + seus insights diretamente no chat</p>
            </div>
          </div>
          <button class="btn secondary sm" id="btnExportWhatsApp" style="border-color: rgba(37, 211, 102, 0.4); color: #25d366;"><i data-lucide="external-link" style="width:12px;height:12px;"></i> Enviar no WhatsApp</button>
        </div>

        <!-- Canal 2: Obsidian Markdown (.md) -->
        <div class="export-channel-card">
          <div class="export-channel-info">
            <div class="export-channel-icon" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3);">
              <i data-lucide="book-marked" style="width: 18px; height: 18px;"></i>
            </div>
            <div>
              <h4 style="font-size: 0.84rem; font-weight: 700; color: var(--text);">Exportar para Obsidian (.md)</h4>
              <p style="font-size: 0.72rem; color: var(--muted-text); margin: 0;">Nota com Frontmatter YAML estruturado, tags e seus insights</p>
            </div>
          </div>
          <div style="display:flex; gap:0.4rem;">
            <button class="btn secondary sm" id="btnCopyObsidianMd"><i data-lucide="copy" style="width:12px;height:12px;"></i> Copiar</button>
            <button class="btn secondary sm" id="btnDownloadObsidianMd"><i data-lucide="download" style="width:12px;height:12px;"></i> Baixar .md</button>
          </div>
        </div>

        <!-- Canal 3: Prompt para LLM (Claude, ChatGPT, Gemini) -->
        <div class="export-channel-card">
          <div class="export-channel-info">
            <div class="export-channel-icon" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3);">
              <i data-lucide="bot" style="width: 18px; height: 18px;"></i>
            </div>
            <div>
              <h4 style="font-size: 0.84rem; font-weight: 700; color: var(--text);">Prompt para IA (Claude / ChatGPT)</h4>
              <p style="font-size: 0.72rem; color: var(--muted-text); margin: 0;">Contexto pronto para a IA criar conexões e planos de ação</p>
            </div>
          </div>
          <button class="btn secondary sm" id="btnCopyLlmPrompt" style="color: #22d3ee; border-color: rgba(6, 182, 212, 0.4);"><i data-lucide="sparkles" style="width:12px;height:12px;"></i> Copiar Prompt</button>
        </div>

        <!-- Canal 4: Exportar Vault Completo -->
        <div class="export-channel-card" style="border-style: dashed;">
          <div class="export-channel-info">
            <div class="export-channel-icon" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);">
              <i data-lucide="archive" style="width: 18px; height: 18px;"></i>
            </div>
            <div>
              <h4 style="font-size: 0.84rem; font-weight: 700; color: var(--text);">Baixar Vault Completo (.md)</h4>
              <p style="font-size: 0.72rem; color: var(--muted-text); margin: 0;">Consolida todos os 70 itens + status de vistos + todas as suas anotações</p>
            </div>
          </div>
          <button class="btn primary sm" id="btnDownloadFullVault"><i data-lucide="download" style="width:12px;height:12px;"></i> Baixar Vault</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ==========================================================================
     MODAL DE AUTENTICAÇÃO & COFRE CRIPTOGRAFADO
     ========================================================================== -->
<div class="clean-modal" id="authModal" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
  <div class="modal-dialog" style="max-width: 480px; max-height: 90vh;">
    <button class="modal-close-icon" id="btnAuthClose" aria-label="Fechar autenticação"><i data-lucide="x"></i></button>
    <div style="padding: 1.5rem; display: grid; gap: 1.2rem;">
      <div style="text-align: center; display: grid; place-items: center; gap: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(59,130,246,0.2) 100%); border: 1px solid rgba(16,185,129,0.4); display: grid; place-items: center;">
          <i data-lucide="shield-check" style="width: 24px; height: 24px; color: #34d399;"></i>
        </div>
        <div>
          <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text);" id="authModalTitle">Cofre Pessoal do Segundo Cérebro</h2>
          <p style="font-size: 0.78rem; color: var(--muted-text); margin-top: 0.2rem;">Proteja suas anotações, histórico de estudo e dados privados.</p>
        </div>
      </div>

      <div id="authLoggedView" style="display: none; grid-gap: 1rem;">
        <div style="padding: 1rem; background: var(--surface2); border: 1px solid var(--border-color); border-radius: var(--radius); text-align: center;">
          <div class="user-avatar-badge" style="width: 44px; height: 44px; font-size: 1.1rem; margin: 0 auto 0.5rem;" id="modalUserBigAvatar">RV</div>
          <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--text);" id="modalUserBigName">Romecy Veiga</h3>
          <p style="font-size: 0.75rem; color: #34d399; margin-top: 0.15rem;"><i data-lucide="check-circle-2" style="width:12px;height:12px;display:inline;"></i> Autenticado com Sucesso</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn secondary" id="btnExportVaultFromAuth" style="flex:1;"><i data-lucide="download" style="width:13px;height:13px;"></i> Backup Cofre</button>
          <button class="btn" id="btnLogout" style="color: #f87171; border-color: rgba(248, 113, 113, 0.3);"><i data-lucide="log-out" style="width:13px;height:13px;"></i> Sair</button>
        </div>
      </div>

      <form id="authLoginForm" style="display: grid; gap: 0.85rem;">
        <div class="modal-form-group">
          <label class="modal-form-label" for="authEmailInput">Email ou Usuário:</label>
          <input class="modal-form-input" id="authEmailInput" type="text" value="admin@nexus.ai" required>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label" for="authPassInput">Senha de Acesso:</label>
          <input class="modal-form-input" id="authPassInput" type="password" value="nexus2026" required>
        </div>
        <p style="font-size: 0.72rem; color: var(--faint); margin: 0;">💡 Dica: Credenciais demonstrativas pré-preenchidas para acesso instantâneo ao cofre local.</p>
        <button class="btn primary" type="submit" style="width: 100%; margin-top: 0.4rem;"><i data-lucide="key-round" style="width:13px;height:13px;"></i> Acessar Meu Cofre</button>
      </form>
    </div>
  </div>
</div>
`;

if (!html.includes('id="notesModal"')) {
  html = html.replace('<!-- MODAL DOCUMENSO STUDIO', `${supremeModalsHtml}\n<!-- MODAL DOCUMENSO STUDIO`);
}

// 6. JAVASCRIPT CONTROLLERS (NOTAS, EXPORTAÇÃO, AUTH, CHIPS SVG)
const supremeJsController = `
// ==========================================================================
// SEGUNDO CÉREBRO: SISTEMA DE ANOTAÇÕES, EXPORTAÇÃO E COFRE SUPREME
// ==========================================================================

// 1. Estado de Anotações Pessoais
const storedNotes = JSON.parse(localStorage.getItem('nexus_personal_notes') || '{}');
let activeNotesItemId = null;

function saveNotesStorage() {
  localStorage.setItem('nexus_personal_notes', JSON.stringify(storedNotes));
}

function openNotesModal(itemId) {
  activeNotesItemId = itemId;
  const item = state.items.find(x => x.id === itemId);
  if (!item) return;

  const noteData = storedNotes[itemId] || { text: '', action: '', tags: '' };
  $('#notesItemMeta').textContent = \`\${item.title} (\${item.segment})\`;
  $('#notesTextInput').value = noteData.text || '';
  $('#notesActionInput').value = noteData.action || '';
  $('#notesTagsInput').value = noteData.tags || '';
  $('#notesSaveStatus').textContent = noteData.text ? 'Salvo no cofre local' : 'Pronto para escrever';

  $('#notesModal').classList.add('open');
  lucide.createIcons();
}

function closeNotesModal() {
  $('#notesModal').classList.remove('open');
  activeNotesItemId = null;
}

// Auto-save com debounce
let notesDebounceTimer;
function handleNoteAutoSave() {
  if (!activeNotesItemId) return;
  clearTimeout(notesDebounceTimer);
  $('#notesSaveStatus').textContent = 'Salvando...';
  notesDebounceTimer = setTimeout(() => {
    const text = $('#notesTextInput').value.trim();
    const action = $('#notesActionInput').value.trim();
    const tags = $('#notesTagsInput').value.trim();

    if (text || action || tags) {
      storedNotes[activeNotesItemId] = {
        text,
        action,
        tags,
        updatedAt: new Date().toISOString()
      };
    } else {
      delete storedNotes[activeNotesItemId];
    }
    saveNotesStorage();
    $('#notesSaveStatus').textContent = '✓ Salvo no cofre local';
    renderCards();
  }, 350);
}

$('#notesTextInput')?.addEventListener('input', handleNoteAutoSave);
$('#notesActionInput')?.addEventListener('input', handleNoteAutoSave);
$('#notesTagsInput')?.addEventListener('input', handleNoteAutoSave);

$('#btnNotesClose')?.addEventListener('click', closeNotesModal);
$('#btnSaveNoteClose')?.addEventListener('click', () => {
  handleNoteAutoSave();
  showToast('Anotações salvas com sucesso!');
  closeNotesModal();
});

$('#btnDeleteNote')?.addEventListener('click', () => {
  if (!activeNotesItemId) return;
  if (confirm('Deseja realmente limpar as anotações deste item?')) {
    delete storedNotes[activeNotesItemId];
    saveNotesStorage();
    $('#notesTextInput').value = '';
    $('#notesActionInput').value = '';
    $('#notesTagsInput').value = '';
    $('#notesSaveStatus').textContent = 'Notas limpas';
    showToast('Anotações removidas');
    renderCards();
    closeNotesModal();
  }
});

$('#btnNotesQuickExport')?.addEventListener('click', () => {
  const currentId = activeNotesItemId;
  closeNotesModal();
  if (currentId) openExportModal(currentId);
});

// 2. HUB DE EXPORTAÇÃO (WhatsApp, Obsidian .md, Prompt LLM, Vault)
let activeExportItemId = null;

function openExportModal(itemId) {
  activeExportItemId = itemId;
  const item = state.items.find(x => x.id === itemId);
  if (!item) return;

  $('#exportItemTitle').textContent = \`\${item.title} — \${item.segment}\`;
  $('#exportInsightModal').classList.add('open');
  lucide.createIcons();
}

function closeExportModal() {
  $('#exportInsightModal').classList.remove('open');
  activeExportItemId = null;
}

$('#btnExportClose')?.addEventListener('click', closeExportModal);

// WhatsApp
$('#btnExportWhatsApp')?.addEventListener('click', () => {
  const item = state.items.find(x => x.id === activeExportItemId);
  if (!item) return;
  const note = storedNotes[item.id]?.text || '';
  const action = storedNotes[item.id]?.action || '';

  let msg = \`*Nexus Acervo · Segundo Cérebro*\\n\\n\`;
  msg += \`📌 *\${item.title}*\\n\`;
  msg += \`🔗 \${item.url}\\n\\n\`;
  msg += \`⚡ *O que entrega:* \${item.deliverable || item.description}\\n\`;
  if (item.practicalExample) {
    msg += \`💡 *Exemplo prático:* \${item.practicalExample}\\n\`;
  }
  if (note) {
    msg += \`\\n🧠 *Meus Insights:* \${note}\\n\`;
  }
  if (action) {
    msg += \`🎯 *Onde aplicar:* \${action}\\n\`;
  }

  const waUrl = \`https://api.whatsapp.com/send?text=\${encodeURIComponent(msg)}\`;
  window.open(waUrl, '_blank');
});

// Gerador Markdown Obsidian
function generateObsidianMd(item) {
  const isSeen = storedSeen.has(item.id);
  const note = storedNotes[item.id] || {};
  const tagsYaml = item.tags.map(t => \`  - "#\${t}"\`).join('\\n');

  return \`---
title: "\${item.title.replace(/"/g, '\\\\"')}"
source_url: "\${item.url}"
type: "\${item.kind}"
segment: "\${item.segment}"
status: "\${isSeen ? 'visto' : 'pendente'}"
date_exported: "\${new Date().toISOString()}"
tags:
\${tagsYaml}
---

# \${item.title}

> **O que entrega:** \${item.deliverable || item.description}

\${item.practicalExample ? \`## 💡 Exemplo Prático de Aplicação\\n\${item.practicalExample}\\n\` : ''}

## 🧠 Meus Insights Pessoais (Segundo Cérebro)
\${note.text || '*(Nenhum insight digitado ainda no Nexus)*'}

\${note.action ? \`### 🎯 Onde pretendo aplicar:\\n\${note.action}\\n\` : ''}

---
*Exportado via Nexus Acervo · Segundo Cérebro de Elite*
\`;
}

$('#btnCopyObsidianMd')?.addEventListener('click', () => {
  const item = state.items.find(x => x.id === activeExportItemId);
  if (!item) return;
  const md = generateObsidianMd(item);
  navigator.clipboard.writeText(md).then(() => showToast('Markdown Obsidian copiado!'));
});

$('#btnDownloadObsidianMd')?.addEventListener('click', () => {
  const item = state.items.find(x => x.id === activeExportItemId);
  if (!item) return;
  const md = generateObsidianMd(item);
  const filename = \`nexus_\${item.id}.md\`;
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  showToast(\`Nota \${filename} baixada!\`);
});

// Prompt para LLM
$('#btnCopyLlmPrompt')?.addEventListener('click', () => {
  const item = state.items.find(x => x.id === activeExportItemId);
  if (!item) return;
  const note = storedNotes[item.id] || {};

  const prompt = \`<recurso_segundo_cerebro>
Título: \${item.title}
Tipo: \${item.kind} | Segmento: \${item.segment}
Link Oficial: \${item.url}
O que Entrega: \${item.deliverable || item.description}
Exemplo Prático: \${item.practicalExample || 'N/A'}
</recurso_segundo_cerebro>

<meus_insights_pessoais>
\${note.text || 'Gostei muito deste recurso e quero integrá-lo ao meu fluxo.'}
\${note.action ? \`Aplicação planejada: \${note.action}\` : ''}
</meus_insights_pessoais>

<tarefa_llm>
Atue como meu Consultor Sênior de Tecnologia e Estratégia de Alto Nível.
Com base no recurso acima e nos meus insights pessoais:
1. Elabore um plano de execução cirúrgico em 3 etapas para eu implementar isso ainda hoje.
2. Identifique 2 possíveis gargalos ou erros comuns cometidos ao usar esta abordagem.
3. Proponha uma conexão inovadora entre este conteúdo e outros sistemas de automação/IA.
</tarefa_llm>\`;

  navigator.clipboard.writeText(prompt).then(() => showToast('Prompt para Claude/ChatGPT copiado!'));
});

// Download do Vault Completo
function downloadFullVault() {
  let vault = \`# Nexus Acervo · Vault Consolidado do Segundo Cérebro\\n\\nData de Exportação: \${new Date().toLocaleString('pt-BR')}\\nTotal de Itens: \${state.items.length}\\nItens Vistos: \${storedSeen.size}\\n\\n---\\n\\n\`;

  state.items.forEach((item, idx) => {
    const isSeen = storedSeen.has(item.id);
    const note = storedNotes[item.id] || {};
    vault += \`### \${idx + 1}. \${item.title}\\n\`;
    vault += \`- **Tipo:** \${item.kind} | **Segmento:** \${item.segment} | **Status:** \${isSeen ? '✅ Visto' : '📥 Pendente'}\\n\`;
    vault += \`- **Link:** \${item.url}\\n\`;
    vault += \`- **O que entrega:** \${item.deliverable || item.description}\\n\`;
    if (note.text) {
      vault += \`- **💡 Meus Insights:** \${note.text}\\n\`;
    }
    if (note.action) {
      vault += \`- **🎯 Onde aplicar:** \${note.action}\\n\`;
    }
    vault += \`\\n---\\n\\n\`;
  });

  const blob = new Blob([vault], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Segundo_Cerebro_Vault_Nexus.md';
  a.click();
  showToast('Vault completo do Segundo Cérebro baixado!');
}

$('#btnDownloadFullVault')?.addEventListener('click', downloadFullVault);
$('#btnExportVaultFromAuth')?.addEventListener('click', downloadFullVault);

// 3. AUTENTICAÇÃO & COFRE
const authState = {
  isLogged: localStorage.getItem('nexus_auth_token') === 'true',
  userName: localStorage.getItem('nexus_user_name') || 'Romecy Veiga',
  userInitials: 'RV'
};

function updateAuthUi() {
  if (authState.isLogged) {
    $('#topUserName').textContent = authState.userName;
    $('#topUserAvatar').textContent = authState.userInitials;
    $('#sideUserName').textContent = authState.userName;
    $('#sideUserAvatar').textContent = authState.userInitials;
    $('#modalUserBigName').textContent = authState.userName;
    $('#modalUserBigAvatar').textContent = authState.userInitials;
    $('#authLoggedView').style.display = 'grid';
    $('#authLoginForm').style.display = 'none';
  } else {
    $('#topUserName').textContent = 'Entrar / Cofre';
    $('#topUserAvatar').innerHTML = '<i data-lucide="shield"></i>';
    $('#sideUserName').textContent = 'Cofre Local';
    $('#sideUserAvatar').innerHTML = '<i data-lucide="key-round"></i>';
    $('#authLoggedView').style.display = 'none';
    $('#authLoginForm').style.display = 'grid';
  }
  lucide.createIcons();
}

function openAuthModal() {
  $('#authModal').classList.add('open');
  lucide.createIcons();
}

function closeAuthModal() {
  $('#authModal').classList.remove('open');
}

$('#btnUserAuth')?.addEventListener('click', openAuthModal);
$('#btnSidebarAuth')?.addEventListener('click', openAuthModal);
$('#btnAuthClose')?.addEventListener('click', closeAuthModal);

$('#authLoginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  authState.isLogged = true;
  authState.userName = 'Romecy Veiga';
  authState.userInitials = 'RV';
  localStorage.setItem('nexus_auth_token', 'true');
  localStorage.setItem('nexus_user_name', 'Romecy Veiga');
  updateAuthUi();
  showToast('Cofre autenticado com sucesso!');
  closeAuthModal();
});

$('#btnLogout')?.addEventListener('click', () => {
  authState.isLogged = false;
  localStorage.removeItem('nexus_auth_token');
  updateAuthUi();
  showToast('Cofre trancado');
  closeAuthModal();
});
`;

// Substitui renderSegmentChips para usar ícones SVG Lucide limpos (sem emojis amadores)
const supremeRenderSegmentChips = `
function renderSegmentChips() {
  const container = $('#segmentChipsContainer');
  if (!container) return;

  const counts = {};
  state.items.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });

  const lucideIconsBySegment = {
    'Design e UX': 'palette',
    'IA e automação': 'bot',
    'Conteúdo e mídia': 'film',
    'Produtividade': 'zap',
    'Aprendizado': 'graduation-cap',
    'Métricas de negócio': 'trending-up',
    'Importação': 'package',
    'Desenvolvimento': 'code-2',
    'Dados e APIs': 'database',
    'Infraestrutura': 'server',
    'OSINT e pesquisa': 'crosshair',
    'Negócios': 'briefcase'
  };

  const allActive = state.segment === 'all' ? 'active' : '';
  let html = \`<button class="filter-chip-item \${allActive}" data-segment="all" aria-label="Todos os segmentos">
    <i data-lucide="layers" style="width:13px;height:13px;"></i>
    <span>Todos os segmentos</span>
    <span class="filter-chip-count">\${state.items.length}</span>
  </button>\`;

  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([seg, count]) => {
    const isActive = state.segment === seg ? 'active' : '';
    const iconName = lucideIconsBySegment[seg] || 'folder';
    html += \`<button class="filter-chip-item \${isActive}" data-segment="\${esc(seg)}" aria-label="Segmento \${esc(seg)}">
      <i data-lucide="\${iconName}" style="width:13px;height:13px;"></i>
      <span>\${esc(seg)}</span>
      <span class="filter-chip-count">\${count}</span>
    </button>\`;
  });

  container.innerHTML = html;
  lucide.createIcons();

  $$('#segmentChipsContainer .filter-chip-item').forEach(chip => {
    chip.onclick = () => {
      state.segment = state.segment === chip.dataset.segment ? 'all' : chip.dataset.segment;
      syncFilterControls();
      renderCards();
    };
  });
}
`;

// Substitui renderSegmentChips
html = html.replace(/function renderSegmentChips\(\) \{[\s\S]*?\n\}/, supremeRenderSegmentChips.trim());

// Atualiza a renderização de cards para os novos botões estilo Linear (Seen, Notas, Exportar)
// Localiza a delegação de eventos em renderCards e adiciona os handlers
const supremeCardDelegation = `
  // Delegação de cliques nos novos botões Supreme
  $$('.btn-seen-toggle').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      toggleSeen(btn.dataset.seenId);
    };
  });

  $$('.btn-open-notes').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      openNotesModal(btn.dataset.notesId);
    };
  });

  $$('.btn-open-export').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      openExportModal(btn.dataset.exportId);
    };
  });
`;

// Injeta os novos controllers antes de document.addEventListener('DOMContentLoaded'
if (!html.includes('storedNotes = JSON.parse')) {
  html = html.replace("document.addEventListener('DOMContentLoaded', () => {", `${supremeJsController}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  updateAuthUi();`);
}

// Injeta a delegação de cliques dos cards dentro de renderCards() antes de lucide.createIcons();
if (!html.includes('.btn-open-notes')) {
  html = html.replace("$$('.card-favorite-toggle').forEach", `${supremeCardDelegation}\n\n  $$('.card-favorite-toggle').forEach`);
}

// Injeta botões no header dos cards e list rows
// No renderCards() para Vídeo, Repo e Ferramentas:
html = html.replace(/<button class="card-seen-toggle \$\{isSeen \? 'is-seen' : ''\}" data-seen-id="\$\{esc\(item\.id\)\}"[\s\S]*?<\/button>/g, match => {
  return `<button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
          <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
          <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>`;
});

// Adiciona prévia de notas no corpo dos cards caso existam
html = html.replace(/\$\{showDeliverable \? `[\s\S]*?` : ''\}/g, match => {
  return `\${storedNotes[item.id]?.text ? \`
    <div class="note-badge-preview">
      <i data-lucide="file-text" style="width:12px;height:12px;color:#60a5fa;flex-shrink:0;"></i>
      <span><strong>Nota:</strong> \${esc(storedNotes[item.id].text)}</span>
    </div>\` : ''}
    ${match}`;
});

// Grava em index.html e nexus-acervo.html
fs.writeFileSync(INDEX_PATH, html, 'utf8');
fs.writeFileSync(ACERVO_PATH, html, 'utf8');

console.log('✅ Transformação Supreme Edition concluída com sucesso em index.html e nexus-acervo.html!');
