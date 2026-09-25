import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, '../nexus-acervo.html');

console.log('--- REFATORANDO SIDEBAR PARA O PADRÃO LINEAR / RAYCAST ($50K STANDARD) ---');

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Substituir a estrutura interna da aside.sidebar
const oldSidebarContent = `<div class="brand-section">
      <div class="brand-logo-container">
        <svg class="brand-svg-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="8" fill="#141416" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <path d="M18 8L27.5 13.5V24.5L18 30L8.5 24.5V13.5L18 8Z" stroke="#10b981" stroke-width="1.8" stroke-linejoin="round" fill="rgba(16,185,129,0.06)" />
          <path d="M18 8V30M8.5 13.5L27.5 24.5M8.5 24.5L27.5 13.5" stroke="#10b981" stroke-width="1" stroke-linecap="round" opacity="0.4" />
          <circle cx="18" cy="18" r="2.5" fill="#f4f4f5" />
        </svg>
      </div>
      <div class="brand-meta">
        <div class="brand-title-wrap">
          <span class="brand-title">Nexus Acervo</span>
        </div>
        <p class="brand-subtitle">Catálogo & Curadoria Técnica</p>
      </div>
    </div>

    <div class="nav-body">
      <div>
        <div class="nav-section-title">Canais & Formatos</div>
        <nav class="nav-list" id="navKind">
          <button class="nav-btn active" data-kind="all" aria-label="Todos os recursos">
            <span class="nav-btn-inner"><i data-lucide="layers"></i> Todos os Itens</span>
            <span class="nav-pill-count" id="countAll">0</span>
          </button>
          <button class="nav-btn" data-kind="vídeo" aria-label="Vídeos e aulas de estudo">
            <span class="nav-btn-inner"><i data-lucide="play-circle"></i> Vídeos & Aulas</span>
            <span class="nav-pill-count" id="countVideo">0</span>
          </button>
          <button class="nav-btn" data-kind="repositório" aria-label="Repositórios GitHub de código">
            <span class="nav-btn-inner"><i data-lucide="github"></i> Repositórios</span>
            <span class="nav-pill-count" id="countRepo">0</span>
          </button>
          <button class="nav-btn" data-kind="carrossel" aria-label="Carrosséis do Instagram e posts">
            <span class="nav-btn-inner"><i data-lucide="gallery-thumbnails"></i> Carrosséis / Posts</span>
            <span class="nav-pill-count" id="countCarousel">0</span>
          </button>
          <button class="nav-btn" data-kind="ferramenta" aria-label="Ferramentas web de produtividade">
            <span class="nav-btn-inner"><i data-lucide="wrench"></i> Ferramentas Web</span>
            <span class="nav-pill-count" id="countTool">0</span>
          </button>
          <button class="nav-btn" data-kind="conhecimento" aria-label="Conhecimento, guias e cursos práticos">
            <span class="nav-btn-inner"><i data-lucide="book-open"></i> Conhecimento & Cursos</span>
            <span class="nav-pill-count" id="countDoc">0</span>
          </button>
          <button class="nav-btn" data-read="unseen" aria-label="Conteúdos pendentes que ainda não vi">
            <span class="nav-btn-inner"><i data-lucide="inbox"></i> A Estudar (Não Vistos)</span>
            <span class="nav-pill-count" id="countUnseen">0</span>
          </button>
          <button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos e já assistidos">
            <span class="nav-btn-inner"><i data-lucide="check-circle-2" style="color:#10b981;"></i> Já Vistos (Concluídos)</span>
            <span class="nav-pill-count" id="countSeen">0</span>
          </button>
          <button class="nav-btn" data-read="deleted" aria-label="Recursos descartados ou excluídos">
            <span class="nav-btn-inner"><i data-lucide="trash-2" style="color:#ef4444;"></i> Excluídos (Lixeira)</span>
            <span class="nav-pill-count" id="countDeleted">0</span>
          </button>
          <button class="nav-btn" data-kind="favorites" aria-label="Recursos salvos nos favoritos">
            <span class="nav-btn-inner"><i data-lucide="star"></i> Meus Favoritos</span>
            <span class="nav-pill-count" id="countFav">0</span>
          </button>
        </nav>
      </div>

      <div>
        <div class="nav-section-title">Ecossistema & Dados</div>
        <nav class="nav-list">
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

    <div class="sidebar-footer">
      <div class="user-profile-sidebar-card" id="sidebarUserProfile">
        <div class="user-avatar-badge" id="sideUserAvatar">RV</div>
        <div class="user-info-side">
          <span class="user-info-name" id="sideUserName">Romecy Veiga</span>
          <span class="user-info-status"><i data-lucide="shield-check" style="width:11px;height:11px;"></i> Cofre Protegido</span>
        </div>
        <button class="user-auth-action-btn" id="btnLockVaultSidebar" title="Trancar Cofre"><i data-lucide="lock" style="width:13px;height:13px;"></i></button>
      </div>
      <div class="sidebar-footer-compact">
        <span class="status-dot-clean"></span>
        <span class="sidebar-footer-label">Nexus Acervo v3.0 · Ativo</span>
      </div>
    </div>`;

const newSidebarContent = `<div class="brand-section">
      <div class="brand-logo-container">
        <svg class="brand-svg-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="8" fill="#141416" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
          <path d="M18 8L27.5 13.5V24.5L18 30L8.5 24.5V13.5L18 8Z" stroke="#10b981" stroke-width="1.8" stroke-linejoin="round" fill="rgba(16,185,129,0.06)" />
          <path d="M18 8V30M8.5 13.5L27.5 24.5M8.5 24.5L27.5 13.5" stroke="#10b981" stroke-width="1" stroke-linecap="round" opacity="0.4" />
          <circle cx="18" cy="18" r="2.5" fill="#f4f4f5" />
        </svg>
      </div>
      <div class="brand-meta">
        <div class="brand-title-wrap">
          <span class="brand-title">Nexus Acervo</span>
        </div>
        <p class="brand-subtitle">Catálogo & Curadoria Técnica</p>
      </div>
    </div>

    <div class="nav-body">
      <!-- 1. CATEGORIAS DE CONTEÚDO -->
      <div class="nav-group">
        <div class="nav-section-title">Categorias</div>
        <nav class="nav-list" id="navKind">
          <button class="nav-btn active" data-kind="all" aria-label="Todos os recursos">
            <span class="nav-btn-inner"><i data-lucide="layers"></i> Todos os Itens</span>
            <span class="nav-pill-count" id="countAll">0</span>
          </button>
          <button class="nav-btn" data-kind="vídeo" aria-label="Vídeos e aulas de estudo">
            <span class="nav-btn-inner"><i data-lucide="play"></i> Vídeos & Aulas</span>
            <span class="nav-pill-count" id="countVideo">0</span>
          </button>
          <button class="nav-btn" data-kind="repositório" aria-label="Repositórios GitHub de código">
            <span class="nav-btn-inner"><i data-lucide="github"></i> Repositórios</span>
            <span class="nav-pill-count" id="countRepo">0</span>
          </button>
          <button class="nav-btn" data-kind="ferramenta" aria-label="Ferramentas web de produtividade">
            <span class="nav-btn-inner"><i data-lucide="wrench"></i> Ferramentas Web</span>
            <span class="nav-pill-count" id="countTool">0</span>
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

      <!-- 2. STATUS DE ESTUDO & CURADORIA -->
      <div class="nav-group" style="margin-top: 0.9rem; padding-top: 0.85rem; border-top: 1px solid var(--border-color);">
        <div class="nav-section-title">Status de Estudo</div>
        <nav class="nav-list" id="navStatusGroup">
          <button class="nav-btn" data-kind="favorites" aria-label="Recursos salvos nos favoritos">
            <span class="nav-btn-inner"><i data-lucide="star"></i> Meus Favoritos</span>
            <span class="nav-pill-count" id="countFav">0</span>
          </button>
          <button class="nav-btn" data-read="unseen" aria-label="Conteúdos pendentes de estudo">
            <span class="nav-btn-inner"><i data-lucide="inbox"></i> A Estudar</span>
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

      <!-- 3. FERRAMENTAS DO ACERVO -->
      <div class="nav-group" style="margin-top: 0.9rem; padding-top: 0.85rem; border-top: 1px solid var(--border-color);">
        <div class="nav-section-title">Ferramentas & Dados</div>
        <nav class="nav-list">
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

    <div class="sidebar-footer">
      <div class="user-profile-sidebar-card" id="sidebarUserProfile">
        <div class="user-avatar-badge" id="sideUserAvatar">RV</div>
        <div class="user-info-side">
          <span class="user-info-name" id="sideUserName">Romecy Veiga</span>
          <span class="user-info-status"><i data-lucide="shield-check" style="width:11px;height:11px;"></i> Cofre Protegido</span>
        </div>
        <button class="user-auth-action-btn" id="btnLockVaultSidebar" title="Trancar Cofre"><i data-lucide="lock" style="width:13px;height:13px;"></i></button>
      </div>
      <div class="sidebar-footer-compact">
        <span class="status-dot-clean"></span>
        <span class="sidebar-footer-label">Nexus Acervo v3.0 · Ativo</span>
      </div>
    </div>`;

if (html.includes(oldSidebarContent)) {
  html = html.replace(oldSidebarContent, newSidebarContent);
  console.log('✓ Estrutura da sidebar refatorada com sucesso.');
}

// 2. Ajustar CSS da Sidebar para eliminar espaçamentos excessivos
const oldBrandSectionCss = `.brand-section {
  padding: 1.1rem 1rem 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);
}`;

const newBrandSectionCss = `.brand-section {
  padding: 0.85rem 1rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);
}`;

if (html.includes(oldBrandSectionCss)) {
  html = html.replace(oldBrandSectionCss, newBrandSectionCss);
  console.log('✓ Padding da brand-section ajustado com precisão.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('nexus-acervo.html consolidado.');
