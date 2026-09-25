import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const pkgPath = path.resolve(rootDir, 'package.json');
const catalogPath = path.resolve(rootDir, 'data/catalog.json');
const schemaPath = path.resolve(rootDir, 'schema/catalog.schema.json');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');

console.log('=== INICIANDO CONSTRUÇÃO DA VERSÃO 3.0 (NEXUS ACERVO $50K STANDARD) ===');

// 1. Atualizar package.json para versão 3.0.0
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = '3.0.0';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('✓ package.json atualizado para v3.0.0');

// 2. Atualizar data/catalog.json para versão 3.0.0
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
catalog.meta.version = '3.0.0';
catalog.meta.updatedAt = new Date().toISOString().slice(0, 10);
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log('✓ catalog.json atualizado para v3.0.0');

// 3. Atualizar schema/catalog.schema.json
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
if (schema.properties?.meta?.properties?.version) {
  schema.properties.meta.properties.version.default = '3.0.0';
}
fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2) + '\n');
console.log('✓ catalog.schema.json atualizado');

// 4. Atualizar nexus-acervo.html
let html = fs.readFileSync(htmlPath, 'utf8');

// A. Atualizar Title e Meta Tags
html = html.replace(
  '<title>Nexus Acervo · Segundo Cérebro Profissional</title>',
  '<title>Nexus Acervo v3.0 · Sistema Editorial de Referência</title>'
);

// B. Atualizar Hero Headline Section
const oldHero = `<section class="hero-headline-section">
        <div class="hero-headline-eyebrow">
          <span class="eyebrow-indicator"></span>
          <span class="eyebrow-text">Hub de Inteligência & Acervo Pessoal</span>
        </div>
        <div class="hero-headline-main">
          <div class="hero-headline-text">
            <h1 class="main-hero-title">Nexus Acervo <span class="hero-accent-text">· Segundo Cérebro</span></h1>
            <p class="main-hero-subtitle">Diretório curado de ferramentas web sem cadastro, automações, códigos de referência e metodologias com aplicação imediata.</p>
          </div>
        </div>
      </section>`;

const newHero = `<section class="hero-headline-section">
        <div class="hero-headline-eyebrow">
          <span class="eyebrow-indicator"></span>
          <span class="eyebrow-text">Nexus Acervo v3.0 · Padrão Editorial Curado ($50k Standard)</span>
        </div>
        <div class="hero-headline-main">
          <div class="hero-headline-text">
            <h1 class="main-hero-title">Nexus Acervo <span class="hero-accent-text">· Sistema de Referência</span></h1>
            <p class="main-hero-subtitle">Acervo canônico de engenharia, agentes autônomos, modelos mentais e ferramentas essenciais com validação executiva e rigor técnico.</p>
          </div>
        </div>
      </section>`;

if (html.includes(oldHero)) {
  html = html.replace(oldHero, newHero);
  console.log('✓ Hero Headline atualizado para Versão 3.0.');
}

// C. Injetar Capa OpenGraph no topo dos cards de Repositório GitHub e Suporte Especializado a Curso
const oldRepoBlock = `// B. REPOSITÓRIO GITHUB
      if (item.kind === 'repositório') {
        const repoName = extractGitHubRepo(item.url) || esc(item.title);
        const license = esc(item.license || 'Open Source');
        return \`
          <article class="card-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
            <div class="card-content-body">
              <div>
                <div class="card-meta-header">
                  <div class="card-meta-left">
                    <span class="meta-chip-tag" style="text-transform: uppercase; font-weight:700;">REPO</span>
                    <span class="meta-chip-tag" style="color:var(--faint);">\${esc(item.segment)}</span>
                    <span class="meta-chip-tag" style="background:var(--surface3); font-family:var(--font-mono); font-size:0.65rem;">\${license}</span>
                  </div>`;

const newRepoAndCourseBlock = `// B. REPOSITÓRIO GITHUB
      if (item.kind === 'repositório') {
        const repoName = extractGitHubRepo(item.url) || esc(item.title);
        const license = esc(item.license || 'Open Source');
        const showThumb = uiPrefs.thumbSize !== 'none' && item.thumbnail;
        return \`
          <article class="card-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
            \${showThumb ? \`
              <div class="card-thumb-top card-repo-thumb" style="aspect-ratio: 2/1; overflow: hidden; background: #0d1117; border-bottom: 1px solid var(--border-color); position: relative;">
                <img src="\${item.thumbnail}" alt="\${esc(item.title)}" loading="lazy" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.style.display='none'">
                <span class="video-label-badge" style="background: rgba(13, 17, 23, 0.85); border-color: rgba(255,255,255,0.15);"><i data-lucide="github" style="width:10px;height:10px;"></i> REPOSITÓRIO</span>
              </div>\` : ''}
            <div class="card-content-body">
              <div>
                <div class="card-meta-header">
                  <div class="card-meta-left">
                    <span class="meta-chip-tag" style="text-transform: uppercase; font-weight:700;">REPO</span>
                    <span class="meta-chip-tag" style="color:var(--faint);">\${esc(item.segment)}</span>
                    <span class="meta-chip-tag" style="background:var(--surface3); font-family:var(--font-mono); font-size:0.65rem;">\${license}</span>
                  </div>`;

if (html.includes(oldRepoBlock)) {
  html = html.replace(oldRepoBlock, newRepoAndCourseBlock);
  console.log('✓ Cards de repositório atualizados com suporte a capa OpenGraph oficial.');
}

// D. Suporte a kind: 'curso' no renderCards (após Carrossel)
const targetCarouselEnd = `// D. FERRAMENTAS WEB E CONHECIMENTO`;
const courseBlock = `// E. CURSO / FORMAÇÃO IMERSIVA
      if (item.kind === 'curso') {
        const showThumb = uiPrefs.thumbSize !== 'none' && item.thumbnail;
        return \`
          <article class="card-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
            \${showThumb ? \`
              <div class="card-thumb-top" style="aspect-ratio: 16/9; overflow: hidden; background: var(--surface2); border-bottom: 1px solid var(--border-color); position: relative;">
                <img src="\${item.thumbnail}" alt="\${esc(item.title)}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
                <span class="video-label-badge" style="background: rgba(16, 185, 129, 0.9); color: #fff; font-weight: 700;"><i data-lucide="graduation-cap" style="width:11px;height:11px;"></i> CURSO</span>
              </div>\` : ''}
            <div class="card-content-body">
              <div>
                \${metaHeaderHtml}
                <h3 class="card-headline-title">\${esc(item.title)}</h3>
                \${showSummary && summary ? \`<p class="card-summary-desc">\${summary}</p>\` : ''}
                \${item.effort ? \`<div style="font-size: 0.75rem; color: #10b981; font-weight: 600; margin-top: 0.35rem; display: flex; align-items: center; gap: 0.3rem;"><i data-lucide="clock" style="width:12px;height:12px;"></i> Duração estimada: \${esc(item.effort)}</div>\` : ''}
                \${showDeliverable && deliverableText ? \`
                  <div class="callout-deliverable" style="margin-top: 0.45rem;">
                    <i data-lucide="zap"></i>
                    <span><strong>O que entrega:</strong> \${deliverableText}</span>
                  </div>\` : ''}
                \${showExample && exampleText ? \`
                  <div class="callout-example" style="margin-top: 0.35rem;">
                    <i data-lucide="lightbulb"></i>
                    <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                  </div>\` : ''}
              </div>
              \${footActionsHtml}
            </div>
          </article>
        \`;
      }

      // D. FERRAMENTAS WEB E CONHECIMENTO`;

if (html.includes(targetCarouselEnd) && !html.includes('// E. CURSO / FORMAÇÃO IMERSIVA')) {
  html = html.replace(targetCarouselEnd, courseBlock);
  console.log('✓ Renderizador dedicado para cursos injetado no grid.');
}

// E. Injetar Metadados de Decisão e Relações no Modal de Detalhes
const targetModalAction = `<p id="modalAction" style="color: var(--text); margin: 0; font-weight: 500;">-</p>
      </div>`;

const newDecisionAndRelationsHtml = `<p id="modalAction" style="color: var(--text); margin: 0; font-weight: 500;">-</p>
      </div>

      <!-- METADADOS DE DECISÃO RÁPIDA (ESFORÇO & IMPACTO) -->
      <div id="modalDecisionMeta" style="display: none; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.35rem;">
        <span id="modalEffortPill" class="meta-chip-tag" style="background: var(--surface2); color: var(--text); font-weight: 600;"><i data-lucide="clock" style="width:12px;height:12px;"></i> <span id="modalEffortText">-</span></span>
        <span id="modalImpactPill" class="meta-chip-tag" style="background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 700;"><i data-lucide="trending-up" style="width:12px;height:12px;"></i> <span id="modalImpactText">Impacto Alto</span></span>
        <span id="modalConfidencePill" class="meta-chip-tag" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; font-weight: 600;"><i data-lucide="shield-check" style="width:12px;height:12px;"></i> Confiança Alta</span>
      </div>

      <!-- RECURSOS RELACIONADOS / CONEXÕES -->
      <div id="modalRelationsWrap" style="display: none; background: var(--surface2); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-top: 0.4rem;">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--muted-text); text-transform: uppercase; margin-bottom: 0.4rem;">🔗 Recurso Conectado no Acervo:</div>
        <div id="modalRelationsList" style="display: flex; flex-direction: column; gap: 0.4rem;"></div>
      </div>`;

if (html.includes(targetModalAction) && !html.includes('id="modalDecisionMeta"')) {
  html = html.replace(targetModalAction, newDecisionAndRelationsHtml);
  console.log('✓ Bloco de Metadados de Decisão e Conexões injetado no HTML do modal.');
}

// F. Injetar Lógica de Relações e Metadados no openDetailModal
const targetJsAction = `if (item.action && actionWrap && actionEl) {
    actionWrap.style.display = 'block';
    actionEl.textContent = item.action;
  } else if (actionWrap) {
    actionWrap.style.display = 'none';
  }`;

const newJsDecisionLogic = `if (item.action && actionWrap && actionEl) {
    actionWrap.style.display = 'block';
    actionEl.textContent = item.action;
  } else if (actionWrap) {
    actionWrap.style.display = 'none';
  }

  // Metadados de Decisão Rápida
  const decisionMeta = $('#modalDecisionMeta');
  const effortPill = $('#modalEffortPill');
  const effortText = $('#modalEffortText');
  const impactPill = $('#modalImpactPill');
  const impactText = $('#modalImpactText');
  if (item.effort || item.impact) {
    if (decisionMeta) decisionMeta.style.display = 'flex';
    if (item.effort && effortText) {
      if (effortPill) effortPill.style.display = 'inline-flex';
      effortText.textContent = item.effort;
    } else if (effortPill) {
      effortPill.style.display = 'none';
    }
    if (item.impact && impactText) {
      if (impactPill) impactPill.style.display = 'inline-flex';
      impactText.textContent = 'Impacto ' + item.impact.charAt(0).toUpperCase() + item.impact.slice(1);
    } else if (impactPill) {
      impactPill.style.display = 'none';
    }
  } else if (decisionMeta) {
    decisionMeta.style.display = 'none';
  }

  // Relações e Conexões entre Recursos
  const relationsWrap = $('#modalRelationsWrap');
  const relationsList = $('#modalRelationsList');
  if (Array.isArray(item.relations) && item.relations.length && relationsWrap && relationsList) {
    relationsWrap.style.display = 'block';
    relationsList.innerHTML = item.relations.map(rel => {
      const target = state.items.find(x => x.id === rel.targetId);
      const targetTitle = target ? target.title : rel.targetId;
      const relLabel = rel.type === 'guide_for' ? 'Guia para a ferramenta' : (rel.type === 'has_guide' ? 'Guia prático disponível' : 'Item relacionado');
      return \`<button class="btn secondary sm" onclick="openDetailModal('\${esc(rel.targetId)}')" style="justify-content: flex-start; text-align: left; width: 100%; gap: 0.4rem;"><i data-lucide="arrow-right" style="width:13px;height:13px;flex-shrink:0;"></i> <span><strong>\${relLabel}:</strong> \${esc(targetTitle)}</span></button>\`;
    }).join('');
  } else if (relationsWrap) {
    relationsWrap.style.display = 'none';
  }`;

if (html.includes(targetJsAction) && !html.includes('// Metadados de Decisão Rápida')) {
  html = html.replace(targetJsAction, newJsDecisionLogic);
  console.log('✓ Lógica JS de decisões e conexões injetada em openDetailModal.');
}

// G. Atualizar Footer
const oldFooter = `<span>Nexus Acervo · Segundo Cérebro Profissional</span>`;
const newFooter = `<span>Nexus Acervo v3.0 · Sistema Editorial de Referência ($50k Standard)</span>`;
if (html.includes(oldFooter)) {
  html = html.replace(oldFooter, newFooter);
  console.log('✓ Footer atualizado para v3.0.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ nexus-acervo.html consolidado para a Versão 3.0.');
