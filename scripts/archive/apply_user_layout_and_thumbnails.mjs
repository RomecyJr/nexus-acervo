import fs from 'node:fs';

const catalogFile = new URL('../../data/catalog.json', import.meta.url);
const htmlFile = new URL('../../nexus-acervo.html', import.meta.url);

// =========================================================================
// 1. ATUALIZAÇÃO DO CATÁLOGO DE DADOS (data/catalog.json)
// =========================================================================
const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));

// 1.1 Correção dos 12 vídeos com YouTube IDs e Thumbnails 100% canônicos e contextuais
const videoMap = {
  'video-natureza-humana': {
    title: 'As 20 Leis da Natureza Humana — Robert Greene',
    youtubeId: 'RTo2akdZ7Dc',
    thumbnail: 'https://i.ytimg.com/vi/RTo2akdZ7Dc/hqdefault.jpg'
  },
  'video-20-horas': {
    title: 'The First 20 Hours: Como Aprender Qualquer Habilidade — Josh Kaufman',
    youtubeId: '5MgBikgcWnY',
    thumbnail: 'https://i.ytimg.com/vi/5MgBikgcWnY/hqdefault.jpg'
  },
  'video-growth-mindset': {
    title: 'O Poder de Acreditar que Você Pode Melhorar — Carol Dweck (TED)',
    youtubeId: '_X0mgOOSpLU',
    thumbnail: 'https://i.ytimg.com/vi/_X0mgOOSpLU/hqdefault.jpg'
  },
  'video-impostor': {
    title: 'O Que É a Síndrome do Impostor e Como Superá-la — Elizabeth Cox (TED-Ed)',
    youtubeId: 'ZQUxL4Jm1Lo',
    thumbnail: 'https://i.ytimg.com/vi/ZQUxL4Jm1Lo/hqdefault.jpg'
  },
  'video-discussao': {
    title: 'Como Discordar de Forma Produtiva e Encontrar Pontos em Comum — Julia Dhar (TED)',
    youtubeId: 'phgjouv0BUA',
    thumbnail: 'https://i.ytimg.com/vi/phgjouv0BUA/hqdefault.jpg'
  },
  'video-procrastinacao': {
    title: 'Como Curar sua Procrastinação na Raiz — Eslen Delanogare',
    youtubeId: 'faE1EGQJ0lQ',
    thumbnail: 'https://i.ytimg.com/vi/faE1EGQJ0lQ/hqdefault.jpg'
  },
  'video-comparacao': {
    title: 'Status Anxiety: Uma Filosofia Mais Gentil do Sucesso — Alain de Botton (TED)',
    youtubeId: 'MtSE4rglxbY',
    thumbnail: 'https://i.ytimg.com/vi/MtSE4rglxbY/hqdefault.jpg'
  },
  'video-decisao': {
    title: 'Teoria dos Jogos e Decisões Críticas no Mundo Real — Veritasium',
    youtubeId: 'mScpHTIi-kM',
    thumbnail: 'https://i.ytimg.com/vi/mScpHTIi-kM/hqdefault.jpg'
  },
  'video-13-minutos': {
    title: 'Hábitos Atômicos: Como Melhorar 1% a Cada Dia — James Clear',
    youtubeId: 'U_nzqnXWvSo',
    thumbnail: 'https://i.ytimg.com/vi/U_nzqnXWvSo/hqdefault.jpg'
  },
  'video-hacks': {
    title: 'Os Melhores Hacks de Produtividade Testados — Ali Abdaal',
    youtubeId: '4aYVLpY5FYU',
    thumbnail: 'https://i.ytimg.com/vi/4aYVLpY5FYU/hqdefault.jpg'
  },
  'video-pensar-papel': {
    title: 'Construindo um Segundo Cérebro — Tiago Forte',
    youtubeId: 'OP3dA2GcAh8',
    thumbnail: 'https://i.ytimg.com/vi/OP3dA2GcAh8/hqdefault.jpg'
  },
  'video-sucesso': {
    title: 'O Que Ninguém Te Conta Sobre o Sucesso nos Negócios — Flávio Augusto',
    youtubeId: 'jYdE1f_bK38',
    thumbnail: 'https://i.ytimg.com/vi/jYdE1f_bK38/hqdefault.jpg'
  }
};

for (const [id, patch] of Object.entries(videoMap)) {
  const item = catalog.items.find(x => x.id === id);
  if (item) {
    Object.assign(item, patch);
    item.updatedAt = '2026-09-24';
  }
}

// 1.2 Atribuição de capas temáticas de alta resolução para itens que não possuíam thumbnail
const THEMATIC_COVERS = {
  produtividade: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80',
  cerebro: 'https://images.unsplash.com/photo-1507842229451-7f01be7ff6ab?w=800&auto=format&fit=crop&q=80',
  habitos: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
  negocios: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
  codigo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  ia: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
  design: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  financas: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
  importacao: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
  seguranca: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
  psicologia: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  ferramenta: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
};

function assignItemCover(item) {
  if (item.thumbnail || item.youtubeId) return;

  const t = (item.title + ' ' + (item.description || '') + ' ' + (item.segment || '') + ' ' + (item.tags || []).join(' ')).toLowerCase();
  if (t.includes('import') || t.includes('china') || t.includes('cssbuy') || t.includes('taobao') || t.includes('xianyu')) {
    item.thumbnail = THEMATIC_COVERS.importacao;
  } else if (t.includes('seguran') || t.includes('ciber') || t.includes('privacid') || t.includes('auditoria')) {
    item.thumbnail = THEMATIC_COVERS.seguranca;
  } else if (t.includes('psicolog') || t.includes('carl jung') || t.includes('identidade') || t.includes('habito')) {
    item.thumbnail = THEMATIC_COVERS.psicologia;
  } else if (t.includes('mrr') || t.includes('ebitda') || t.includes('cac') || t.includes('roi') || t.includes('aov') || t.includes('runway') || t.includes('churn')) {
    item.thumbnail = THEMATIC_COVERS.financas;
  } else if (t.includes('design') || t.includes('ui') || t.includes('ux') || t.includes('cor') || t.includes('icon') || t.includes('font') || t.includes('spline')) {
    item.thumbnail = THEMATIC_COVERS.design;
  } else if (t.includes('ia') || t.includes('ai studio') || t.includes('factory') || t.includes('elevenlabs') || t.includes('vidiq') || t.includes('tubelab')) {
    item.thumbnail = THEMATIC_COVERS.ia;
  } else if (item.kind === 'repositório' || t.includes('github') || t.includes('código') || t.includes('bundlephobia') || t.includes('hoppscotch')) {
    item.thumbnail = THEMATIC_COVERS.codigo;
  } else {
    item.thumbnail = THEMATIC_COVERS.ferramenta;
  }
}

for (const item of catalog.items) {
  assignItemCover(item);
}

catalog.meta.generatedAt = new Date().toISOString();
fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
console.log(`✅ data/catalog.json atualizado (${catalog.items.length} itens, 12 vídeos corrigidos com capas canônicas).`);

// =========================================================================
// 2. ATUALIZAÇÃO DA UI (nexus-acervo.html)
// =========================================================================
let html = fs.readFileSync(htmlFile, 'utf8');

// 2.1 Remover .stats-cluster da Hero Headline (deixa a headline limpa e espaçosa)
const oldHeroMainRegex = /<div class="hero-headline-main">[\s\S]*?<div class="hero-headline-text">([\s\S]*?<\/div>)\s*<div class="stats-cluster"[\s\S]*?<\/div>\s*<\/div>/;
if (oldHeroMainRegex.test(html)) {
  html = html.replace(oldHeroMainRegex, `<div class="hero-headline-main">\n          <div class="hero-headline-text">$1\n        </div>`);
  console.log('✅ .stats-cluster removido do hero headline.');
}

// 2.2 Substituir a barra de status antiga (azul) e remover a barra de categorias redundante (amarela)
const oldControlsBarRegex = /<!-- BARRA DE CONTROLES SHADCN UI -->[\s\S]*?<section class="controls-bar"[^>]*>[\s\S]*?<!-- FILTRO DE ESTADO INBOX ZERO[\s\S]*?<div class="status-toggle-group" id="readStatusGroup"[\s\S]*?<\/div>\s*<div class="segmented-control" id="categoryTabs">[\s\S]*?<\/div>/;

const newStatusToggleGroup = `<!-- BARRA DE CONTROLES SHADCN UI -->
      <section class="controls-bar" style="margin-top: 1rem;">
        <!-- FILTROS DE STATUS INBOX ZERO (CHIPS EXECUTIVOS ATIVOS) -->
        <div class="status-toggle-group" id="readStatusGroup" role="group" aria-label="Filtrar por status de visualização">
          <button class="status-toggle-btn active" data-read="all" aria-label="Todos os recursos ativos">
            <i data-lucide="database" style="width:13px;height:13px;"></i>
            <strong id="kpiTotal">0</strong> <span>ativos</span>
          </button>
          <button class="status-toggle-btn" data-read="unseen" aria-label="Recursos pendentes de estudo">
            <i data-lucide="inbox" style="width:13px;height:13px;color:#60a5fa;"></i>
            <strong id="kpiUnseen">0</strong> <span>pendentes</span>
          </button>
          <button class="status-toggle-btn" data-read="seen" aria-label="Recursos já vistos ou concluídos">
            <i data-lucide="check-circle-2" style="width:13px;height:13px;color:#10b981;"></i>
            <strong id="kpiSeen">0</strong> <span>vistos</span>
          </button>
          <button class="status-toggle-btn" data-read="deleted" aria-label="Recursos na lixeira">
            <i data-lucide="trash-2" style="width:13px;height:13px;color:#ef4444;"></i>
            <strong id="kpiDeleted">0</strong> <span>lixeira</span>
          </button>
        </div>`;

if (oldControlsBarRegex.test(html)) {
  html = html.replace(oldControlsBarRegex, newStatusToggleGroup);
  console.log('✅ Barra de status atualizada com o estilo de chips da caixa vermelha e abas amarelas removidas.');
}

// 2.3 Refinamento do CSS para .status-toggle-group e .status-toggle-btn
const oldStatusCssRegex = /\/\* TOGGLE GROUP DE STATUS \(TODOS \/ NÃO VISTOS \/ VISTOS\) \*\/[\s\S]*?\.status-toggle-btn\.active\[data-read="deleted"\]\s*\{[\s\S]*?\}/;
const newStatusCss = `/* TOGGLE GROUP DE STATUS (CHIPS EXECUTIVOS INBOX ZERO) */
.status-toggle-group {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.status-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.28rem 0.68rem;
  border-radius: var(--radius);
  background: var(--surface2);
  border: 1px solid var(--border-color);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--muted-text);
  cursor: pointer;
  transition: all var(--trans);
  white-space: nowrap;
}

.status-toggle-btn strong {
  color: var(--text);
  font-weight: 800;
  font-family: var(--font-mono);
}

.status-toggle-btn:hover {
  background: var(--surface3);
  color: var(--text);
  border-color: var(--border-strong);
}

.status-toggle-btn.active {
  background: var(--surface);
  color: var(--text);
  border-color: #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

.status-toggle-btn.active[data-read="all"] {
  border-color: rgba(59, 130, 246, 0.6);
}

.status-toggle-btn.active[data-read="unseen"] {
  border-color: #3b82f6;
  color: #60a5fa;
}

.status-toggle-btn.active[data-read="seen"] {
  border-color: #10b981;
  color: #34d399;
}

.status-toggle-btn.active[data-read="deleted"] {
  border-color: #ef4444;
  color: #f87171;
}`;

if (oldStatusCssRegex.test(html)) {
  html = html.replace(oldStatusCssRegex, newStatusCss);
  console.log('✅ CSS de .status-toggle-btn atualizado com estilo visual idêntico aos chips.');
}

// 2.4 Injeção da Engine Semântica de Thumbnails e Fallback de Mídia no JS
const thumbEngineCode = `
// ==========================================================================
// ENGINE SEMÂNTICA DE THUMBNAILS E FALLBACKS VISUAIS CONTEXTUAIS
// ==========================================================================
const THEME_COVERS_MAP = {
  produtividade: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80',
  cerebro: 'https://images.unsplash.com/photo-1507842229451-7f01be7ff6ab?w=800&auto=format&fit=crop&q=80',
  habitos: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
  negocios: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
  codigo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  ia: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
  design: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  financas: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
  importacao: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
  seguranca: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
  psicologia: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  ferramenta: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
};

// IDs canônicos mapeados para evitar IDs quebrados de sessões antigas
const KNOWN_CANONICAL_YOUTUBE = {
  'video-hacks': '4aYVLpY5FYU',
  'video-pensar-papel': 'OP3dA2GcAh8',
  'oP_8lS0Lp5Y': '4aYVLpY5FYU',
  'N93iJ3Jk7pU': 'OP3dA2GcAh8'
};

function getItemThumbnail(item) {
  let ytId = item.youtubeId || extractYouTubeId(item.url);
  if (KNOWN_CANONICAL_YOUTUBE[item.id]) {
    ytId = KNOWN_CANONICAL_YOUTUBE[item.id];
  } else if (KNOWN_CANONICAL_YOUTUBE[ytId]) {
    ytId = KNOWN_CANONICAL_YOUTUBE[ytId];
  }

  if (ytId) {
    return 'https://i.ytimg.com/vi/' + ytId + '/hqdefault.jpg';
  }
  if (item.thumbnail && !item.thumbnail.includes('oP_8lS0Lp5Y') && !item.thumbnail.includes('N93iJ3Jk7pU')) {
    return item.thumbnail;
  }

  // Análise semântica contextual do recurso para retorno de capa relevante
  const str = normalizeStr((item.title || '') + ' ' + (item.description || '') + ' ' + (item.deliverable || '') + ' ' + (item.segment || '') + ' ' + ((item.tags||[]).join(' ')));
  if (str.includes('cerebro') || str.includes('segundo') || str.includes('tiago forte') || str.includes('code') || str.includes('memoria') || str.includes('notas')) {
    return THEME_COVERS_MAP.cerebro;
  }
  if (str.includes('produtiv') || str.includes('hack') || str.includes('ali abdaal') || str.includes('time-blocking') || str.includes('pomodoro') || str.includes('foco')) {
    return THEME_COVERS_MAP.produtividade;
  }
  if (str.includes('habito') || str.includes('james clear') || str.includes('atomico') || str.includes('rotina')) {
    return THEME_COVERS_MAP.habitos;
  }
  if (str.includes('sucesso') || str.includes('negocio') || str.includes('flavio augusto') || str.includes('carreira') || str.includes('empresa') || str.includes('mrr') || str.includes('ebitda')) {
    return THEME_COVERS_MAP.negocios;
  }
  if (str.includes('importa') || str.includes('china') || str.includes('cssbuy') || str.includes('taobao') || str.includes('xianyu')) {
    return THEME_COVERS_MAP.importacao;
  }
  if (str.includes('seguranc') || str.includes('ciber') || str.includes('api key') || str.includes('auditoria') || str.includes('privacidade')) {
    return THEME_COVERS_MAP.seguranca;
  }
  if (str.includes('psicolog') || str.includes('carl jung') || str.includes('identidade') || str.includes('mente') || str.includes('filosofia')) {
    return THEME_COVERS_MAP.psicologia;
  }
  if (str.includes('design') || str.includes('ui') || str.includes('ux') || str.includes('interface') || str.includes('cor') || str.includes('icone')) {
    return THEME_COVERS_MAP.design;
  }
  if (str.includes('ia') || str.includes('inteligencia artificial') || str.includes('llm') || str.includes('rag') || str.includes('bot') || str.includes('scraping')) {
    return THEME_COVERS_MAP.ia;
  }
  if (item.kind === 'repositório' || str.includes('github') || str.includes('dev')) {
    return THEME_COVERS_MAP.codigo;
  }
  return THEME_COVERS_MAP.ferramenta;
}

window.handleMediaThumbError = function(img, kind, segment, title) {
  img.onerror = null;
  img.onload = null;
  const fallback = getItemThumbnail({ kind: kind || '', segment: segment || '', title: title || '' });
  img.src = fallback;
};
`;

if (!html.includes('THEME_COVERS_MAP')) {
  html = html.replace('function getItemFavicon(url = \'\') {', thumbEngineCode + '\nfunction getItemFavicon(url = \'\') {');
  console.log('✅ Engine de thumbnails e fallback semântico injetado no JavaScript.');
}

// 2.5 Atualização do renderCards para usar getItemThumbnail e capturar placeholders 120x90
// Substitui a lógica de thumb no vídeo vertical e horizontal
const oldVideoThumbPattern = /const ytId = item\.youtubeId \|\| extractYouTubeId\(item\.url\);\s*const thumb = ytId \? `https:\/\/img\.youtube\.com\/vi\/\$\{ytId\}\/hqdefault\.jpg` : \(item\.thumbnail \|\| ''\);/g;

html = html.replaceAll(oldVideoThumbPattern, `const thumb = getItemThumbnail(item);
        const ytId = item.youtubeId || extractYouTubeId(item.url);`);

// Atualiza a tag <img> no modo vídeo
const oldImgTagTop = `<img src="\${thumb}" alt="\${esc(item.title)}" loading="lazy">`;
const newImgTagTop = `<img src="\${thumb}" alt="\${esc(item.title)}" loading="lazy" onload="if(this.naturalWidth<=120 && this.naturalHeight<=90){ handleMediaThumbError(this, '\${esc(item.kind)}', '\${esc(item.segment)}', '\${esc(item.title)}'); }" onerror="handleMediaThumbError(this, '\${esc(item.kind)}', '\${esc(item.segment)}', '\${esc(item.title)}')">`;

html = html.replaceAll(oldImgTagTop, newImgTagTop);

// Atualiza syncFilterControls para não falhar caso categoryTabs não exista mais
const oldSyncCategory = `$$('#categoryTabs .segment-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });`;
const newSyncCategory = `if ($('#categoryTabs')) {
    $$('#categoryTabs .segment-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.kind === state.kind);
    });
  }`;
html = html.replace(oldSyncCategory, newSyncCategory);

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('✅ nexus-acervo.html atualizado e salvo.');
