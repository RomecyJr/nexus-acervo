import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.resolve(rootDir, 'data', 'catalog.json');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');
const indexPath = path.resolve(rootDir, 'index.html');

console.log('=== ETAPA 1: IMPORTANDO VÍDEO DO DANNY WHY NO CATALOG.JSON ===');

const catalogRaw = fs.readFileSync(catalogPath, 'utf8');
const catalog = JSON.parse(catalogRaw);

const videoId = 'video-danny-why-youtube-algorithm-update';
const existingIndex = catalog.items.findIndex(i => i.id === videoId || i.url.includes('phQWga1difM'));

const dannyWhyItem = {
  id: videoId,
  title: 'Danny Why — Estratégias de Adaptação ao Novo Algoritmo do YouTube',
  kind: 'vídeo',
  segment: 'Conteúdo e Mídia',
  url: 'https://www.youtube.com/watch?v=phQWga1difM',
  description: 'Análise aprofundada das recentes alterações no sistema de recomendação e métricas de distribuição do YouTube, detalhando como criadores devem reposicionar sua produção para sustentar relevância e monetização.',
  deliverable: 'Roteiro tático de reformulação dos primeiros 30 segundos, refinamento de CTR de miniaturas e calibração de cadência para se beneficiar da nova lógica algorítmica da plataforma.',
  practicalExample: 'Canal especializado em tecnologia e inteligência artificial ajusta os ganchos iniciais dos vídeos e dobra a retenção média dos espectadores em menos de três semanas.',
  targetAudience: 'Criadores de Conteúdo, Produtores de Vídeo, Estrategistas Digitais e Gestores de Comunicação',
  tags: [
    'youtube',
    'algoritmo',
    'estrategia',
    'criação de conteúdo',
    'IA'
  ],
  status: 'ativo',
  year: 2026,
  source: 'Danny Why',
  addedAt: '2026-09-25',
  updatedAt: '2026-09-25',
  youtubeId: 'phQWga1difM',
  thumbnail: 'https://i.ytimg.com/vi/phQWga1difM/hqdefault.jpg',
  thumbnailSource: 'youtube-hq',
  notes: 'Vídeo essencial conduzido por Danny Why analisando a virada de chave do YouTube em 2026: priorização de satisfação do usuário e tempo de sessão qualificado sobre cliques sensacionalistas de baixo engajamento.',
  area: 'Mídia',
  intents: [
    'Aprender',
    'Praticar'
  ],
  summary: 'Análise profunda sobre o impacto das novas diretrizes de recomendação e retenção do YouTube para criadores e marcas.',
  keyTakeaways: [
    'O algoritmo privilegia retenção contínua e sessões completas sobre métricas de vaidade',
    'Títulos e miniaturas devem prometer valor tangível e demonstrar entrega logo nos primeiros 15 segundos',
    'Canais que dominam a nova dinâmica de feed ganham prioridade de distribuição orgânica nos motores de busca e na página inicial'
  ],
  action: 'Auditar as métricas de retenção dos últimos uploads do canal e aplicar o gancho estruturado no próximo roteiro.',
  effort: 'Médio',
  impact: 'Alto',
  confidence: '95%'
};

if (existingIndex !== -1) {
  catalog.items[existingIndex] = dannyWhyItem;
  console.log(`✓ Recurso atualizado na posição ${existingIndex} do catálogo.`);
} else {
  catalog.items.push(dannyWhyItem);
  console.log(`✓ Recurso adicionado com sucesso. Total agora: ${catalog.items.length} itens.`);
}

catalog.meta.generatedAt = new Date().toISOString();
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log('✓ catalog.json salvo com sucesso.');


console.log('\n=== ETAPA 2: APLICANDO IDENTIDADE NEXUS CLAW & ÍCONE CYBERBOT NO FRONTEND ===');

let html = fs.readFileSync(htmlPath, 'utf8');

// Definir o SVG do Nexus Claw
const NEXUS_CLAW_SVG = `<svg class="nexus-claw-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" stroke="url(#clawGrad)" stroke-width="1.8"/>
  <path d="M7 10.5l5 3.5 5-3.5" stroke="#38bdf8" stroke-width="1.6"/>
  <path d="M9 14.5l3 2 3-2" stroke="#38bdf8" stroke-width="1.4"/>
  <circle cx="12" cy="8.5" r="1.5" fill="#38bdf8"/>
  <defs>
    <linearGradient id="clawGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10b981"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
</svg>`;

// Estilo CSS específico para o Nexus Claw
const clawStyles = `
/* ============================================================================
   NEXUS CLAW — IDENTIDADE DE IA CYBERBOT (OPENCLAW / GROK CRAFT)
   ============================================================================ */
.nexus-claw-icon {
  display: inline-block;
  vertical-align: middle;
  filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.35));
  transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), filter 180ms ease-out;
}

.ai-copilot-trigger-btn:hover .nexus-claw-icon,
.nav-btn:hover .nexus-claw-icon {
  transform: scale(1.12);
  filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.7));
}

.ai-copilot-trigger-btn {
  position: relative;
  background: rgba(16, 185, 129, 0.08) !important;
  border: 1px solid rgba(56, 189, 248, 0.25) !important;
  transition: background 160ms var(--ease-out), border-color 160ms var(--ease-out), transform 160ms var(--ease-out) !important;
}

.ai-copilot-trigger-btn:hover {
  background: rgba(56, 189, 248, 0.15) !important;
  border-color: rgba(56, 189, 248, 0.5) !important;
  transform: scale(1.04);
}

.ai-copilot-pulse-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}

.badge-mini-claw {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  letter-spacing: 0.04em;
  font-family: var(--font-mono);
  margin-left: auto;
}
`;

if (!html.includes('NEXUS CLAW — IDENTIDADE DE IA CYBERBOT')) {
  html = html.replace('/* Entrada física de modais', clawStyles + '\n/* Entrada física de modais');
  console.log('✓ Estilos CSS do Nexus Claw injetados.');
}

// 1. Atualizar o Botão do Topbar
const oldTopbarBtn = `<button class="btn icon-only ai-copilot-trigger-btn" id="btnOpenAiCopilot" title="Conversar com a IA (Nexus Copilot · Chave de Inteligência)" aria-label="Abrir Assistente de IA com Contexto do Acervo">
          <i data-lucide="key-round" style="width:16px;height:16px;color:#10b981;"></i>
        </button>`;

const newTopbarBtn = `<button class="btn icon-only ai-copilot-trigger-btn" id="btnOpenAiCopilot" title="Nexus Claw · Inteligência Autônoma do Acervo (Padrão Grok / OpenClaw)" aria-label="Abrir Nexus Claw com Contexto do Acervo">
          ${NEXUS_CLAW_SVG}
          <span class="ai-copilot-pulse-dot" title="Nexus Claw Online"></span>
        </button>`;

if (html.includes(oldTopbarBtn)) {
  html = html.replace(oldTopbarBtn, newTopbarBtn);
  console.log('✓ Botão do Topbar atualizado com ícone exclusivo do Nexus Claw.');
}

// 2. Atualizar o Botão na Sidebar
const oldSideCopilot = `<button class="nav-btn" id="btnSideOpenAiCopilot" aria-label="Conversar com a IA">
            <span class="nav-btn-inner"><i data-lucide="key-round" style="color:#10b981;"></i> Assistente IA (Chave)</span>
          </button>`;

const newSideCopilot = `<button class="nav-btn" id="btnSideOpenAiCopilot" aria-label="Abrir Nexus Claw IA">
            <span class="nav-btn-inner" style="gap: 0.55rem;">
              ${NEXUS_CLAW_SVG}
              <span>Nexus Claw</span>
              <span class="badge-mini-claw">BOT IA</span>
            </span>
          </button>`;

if (html.includes(oldSideCopilot)) {
  html = html.replace(oldSideCopilot, newSideCopilot);
  console.log('✓ Botão da Sidebar atualizado para "Nexus Claw (BOT IA)".');
}

// 3. Atualizar o Cabeçalho do Modal do Copilot
const oldModalHeader = `<div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(16, 185, 129, 0.12); display: grid; place-items: center; color: #10b981;">
          <i data-lucide="key-round" style="width: 17px; height: 17px;"></i>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h2 style="font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text);" id="copilotModalTitle">Nexus Copilot · Assistente IA</h2>`;

const newModalHeader = `<div style="width: 34px; height: 34px; border-radius: 8px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); display: grid; place-items: center;">
          ${NEXUS_CLAW_SVG}
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h2 style="font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text);" id="copilotModalTitle">Nexus Claw · Inteligência Autônoma</h2>
            <span class="badge-mini-claw" style="font-size: 0.6rem; padding: 0.1rem 0.4rem;">GROK ENGINE</span>`;

if (html.includes(oldModalHeader)) {
  html = html.replace(oldModalHeader, newModalHeader);
  console.log('✓ Cabeçalho do modal atualizado para "Nexus Claw · Inteligência Autônoma".');
}

// 4. Atualizar a Mensagem de Boas-Vindas do Chat
const oldWelcomeMsg = `<div class="copilot-msg-avatar"><i data-lucide="key-round" style="width: 14px; height: 14px;"></i></div>
          <div class="copilot-msg-content">
            <p>Olá, <strong>Romecy</strong>! Sou seu assistente com inteligência artificial conectado diretamente à base de conhecimento do <strong>Nexus Acervo</strong>.</p>`;

const newWelcomeMsg = `<div class="copilot-msg-avatar" style="background: rgba(56,189,248,0.15); border: 1px solid rgba(56,189,248,0.3); color: #38bdf8;">
            ${NEXUS_CLAW_SVG}
          </div>
          <div class="copilot-msg-content">
            <p>Olá, <strong>Romecy</strong>! Sou o <strong>Nexus Claw</strong>, o agente de inteligência autônoma oficial do <strong>Nexus Acervo</strong> (arquitetura inspirada em OpenClaw e Grok).</p>
            <p style="margin-top: 0.4rem;">Tenho indexação direta de todos os seus <strong>recursos catalogados</strong>, suas tags, repositórios, vídeos em alta definição e links de estudo. O que vamos minerar ou sintetizar agora?</p>`;

if (html.includes(oldWelcomeMsg)) {
  html = html.replace(oldWelcomeMsg, newWelcomeMsg);
  console.log('✓ Mensagem de boas-vindas atualizada com a nova persona Nexus Claw.');
}

// 5. Atualizar o System Prompt do Nexus Claw
const oldSysPromptIntro = `Você é o Nexus Copilot, o assistente oficial de IA do Nexus Acervo ($50k benchmark de curadoria técnica padrão Linear e Sindre Sorhus Awesome).`;
const newSysPromptIntro = `Você é o Nexus Claw (codinome ClawBot / Grok-Engine), o agente de inteligência autônoma e orquestrador oficial do Nexus Acervo ($50k benchmark padrão Linear & Sindre Sorhus Awesome).
Sua postura é executiva, afiada, precisa e inspirada em inteligências como Grok e OpenClaw: foco implacável em entregáveis tangíveis, zero enrolação (zero AI Slop) e domínio absoluto de código, vídeo e ferramentas.`;

if (html.includes(oldSysPromptIntro)) {
  html = html.replace(oldSysPromptIntro, newSysPromptIntro);
  console.log('✓ System Prompt atualizado para a persona do Nexus Claw.');
}

// 6. Atualizar extractMetadataFromUrl para usar YouTube oEmbed Oficial (CORS Aberto) com fallback
const oldExtractYtBlock = `  // A. YOUTUBE VIDEO
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
  }`;

const newExtractYtBlock = `  // A. YOUTUBE VIDEO (EXTRAÇÃO OFICIAL VIA OEMBED COM FALLBACK DUPLO)
  const ytId = extractYouTubeId(url);
  if (ytId) {
    result.kind = 'vídeo';
    result.thumbnail = \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\`;
    result.tags = ['youtube', 'video', 'conteudo', 'algoritmo', 'IA'];
    result.segment = 'Conteúdo e Mídia';

    let fetched = false;
    // 1. YouTube oEmbed oficial (rápido e 100% canônico)
    try {
      const res = await fetch(\`https://www.youtube.com/oembed?url=\${encodeURIComponent(url)}&format=json\`);
      if (res.ok) {
        const data = await res.json();
        if (data.title) result.title = data.title;
        if (data.author_name) result.author = data.author_name;
        fetched = true;
      }
    } catch(e) {
      console.warn('Falha no oEmbed nativo, acionando fallback noembed:', e);
    }

    // 2. Fallback via noembed
    if (!fetched) {
      try {
        const res2 = await fetch(\`https://noembed.com/embed?url=\${encodeURIComponent(url)}\`);
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2.title) result.title = data2.title;
          if (data2.author_name) result.author = data2.author_name;
        }
      } catch(e2) {}
    }
    return result;
  }`;

if (html.includes(oldExtractYtBlock)) {
  html = html.replace(oldExtractYtBlock, newExtractYtBlock);
  console.log('✓ extractMetadataFromUrl atualizado com oEmbed oficial do YouTube.');
}

// 7. Atualizar synthesizeWithOpenRouter com parser de JSON resiliente e modelos prioritários
const oldSynthesizeFuncHeader = 'async function synthesizeWithOpenRouter(url, baseData, apiKey, model) {';
const oldSynthesizeFuncEnd = 'return JSON.parse(cleanJson);\n}';

const idxSynStart = html.indexOf(oldSynthesizeFuncHeader);
if (idxSynStart !== -1) {
  const idxSynEnd = html.indexOf(oldSynthesizeFuncEnd, idxSynStart);
  if (idxSynEnd !== -1) {
    const fullOldSyn = html.substring(idxSynStart, idxSynEnd + oldSynthesizeFuncEnd.length);
    const newSynCode = `function robustExtractJson(rawText) {
  if (!rawText) return null;
  // 1. Bloco de código markdown
  const codeBlockMatch = rawText.match(/\`\`\`(?:json)?\\s*([\\s\\S]*?)\\s*\`\`\`/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try { return JSON.parse(codeBlockMatch[1].trim()); } catch(e) {}
  }
  // 2. Substring do primeiro { ao último }
  const firstBrace = rawText.indexOf('{');
  const lastBrace = rawText.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(rawText.substring(firstBrace, lastBrace + 1));
    } catch(e) {}
  }
  return null;
}

async function synthesizeWithOpenRouter(url, baseData, apiKey, model) {
  const systemPrompt = \`Você é o Nexus Claw, assistente editorial sênior do Nexus Acervo ($50k benchmark padrão Linear & Sindre Sorhus Awesome).
Sua tarefa é analisar os dados brutos de um recurso web e retornar EXCLUSIVAMENTE um objeto JSON válido (sem blocos markdown, sem divagações, sem explicações).
INICIE SUA RESPOSTA IMEDIATAMENTE COM O CARACTERE "{" E TERMINE COM "}".

Campos obrigatórios:
- title: Fórmula estrita "Nome — Ação ou Proposta de Valor" (ex: "Danny Why — Estratégias de Adaptação ao Novo Algoritmo do YouTube")
- description: Resumo executivo de altíssimo nível (mínimo 60 caracteres) explicando o conteúdo, diferenciais e valor prático.
- deliverable: O que quem consome ganha de forma tangível e observável (mínimo 35 caracteres).
- practicalExample: Caso concreto e direto de aplicação prática no mundo real (mínimo 35 caracteres).
- segment: Um dos seguintes: "Conteúdo e Mídia", "Desenvolvimento e Infra", "Produtividade e Gestão", "Design e UX", "Dados e Inteligência", "Negócios e Métricas", "Aprendizado e Filosofia".
- targetAudience: Personas reais (ex: "Criadores de Conteúdo, Produtores Audiovisuais e Estrategistas Digitais").
- tags: Array com 3 a 5 tags técnicas limpas (padronize SEMPRE "IA", nunca "I.A").\`;

  const userPrompt = \`URL: \${url}\\nDados preliminares: \${JSON.stringify(baseData)}\\n\\nRetorne exclusivamente o JSON estruturado agora.\`;

  // Para síntese de JSON rápida, priorizar modelos que respondem imediatamente com JSON
  const synthModel = (!model || model === 'auto') ? 'openrouter/free' : model;

  const result = await callOpenRouterWithFallback({
    apiKey: apiKey,
    model: synthModel,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    maxTokens: 1200,
    temperature: 0.1
  });

  const parsed = robustExtractJson(result.content);
  if (!parsed) {
    throw new Error('Não foi possível interpretar a resposta estruturada do modelo.');
  }
  return parsed;
}`;
    html = html.replace(fullOldSyn, newSynCode);
    console.log('✓ synthesizeWithOpenRouter atualizado com robustExtractJson e openrouter/free prioritário.');
  }
}

// 8. Atualizar o clique de btnRunAiAutoFill com UX de carregamento de ponta
const oldBtnAutoFillListenerStart = '  btnRunAiAutoFill?.addEventListener(\'click\', async () => {';
const oldBtnAutoFillListenerEnd = 'showToast(\'Formulário preenchido automaticamente! ✨\');\n    } catch(err) {\n      if (aiAutoFillStatus) {\n        aiAutoFillStatus.style.color = \'#f87171\';\n        aiAutoFillStatus.textContent = `Erro ao extrair: ${err.message}`;\n      }\n    }\n  });';

const idxBtnStart = html.indexOf(oldBtnAutoFillListenerStart);
if (idxBtnStart !== -1) {
  const idxBtnEnd = html.indexOf(oldBtnAutoFillListenerEnd, idxBtnStart);
  if (idxBtnEnd !== -1) {
    const fullOldBtnCode = html.substring(idxBtnStart, idxBtnEnd + oldBtnAutoFillListenerEnd.length);
    const newBtnCode = `  btnRunAiAutoFill?.addEventListener('click', async () => {
    const url = (aiAutoUrlInput?.value || '').trim();
    if (!url) {
      showToast('Por favor, informe uma URL para importação.');
      aiAutoUrlInput?.focus();
      return;
    }

    const originalBtnHtml = btnRunAiAutoFill.innerHTML;
    btnRunAiAutoFill.disabled = true;
    btnRunAiAutoFill.innerHTML = \`<i data-lucide="loader-2" class="animate-spin" style="width:13px;height:13px;"></i> <span>Sintetizando...</span>\`;
    lucide.createIcons();

    if (aiAutoFillStatus) {
      aiAutoFillStatus.style.display = 'block';
      aiAutoFillStatus.style.color = '#38bdf8';
      aiAutoFillStatus.textContent = '⚡ Nexus Claw: Extraindo dados oficiais do recurso...';
    }

    try {
      const baseData = await extractMetadataFromUrl(url);

      const apiKey = getOpenRouterKey();
      let finalData = baseData;

      if (apiKey) {
        if (aiAutoFillStatus) {
          aiAutoFillStatus.textContent = '🤖 Nexus Claw: Gerando título canônico, entregável e tags executivas...';
        }
        try {
          const aiData = await synthesizeWithOpenRouter(url, baseData, apiKey, getOpenRouterModel());
          finalData = { ...baseData, ...aiData };
        } catch(aiErr) {
          console.warn('Falha na síntese IA, aplicando dados base do recurso:', aiErr);
        }
      }

      // Preencher formulário de forma inteligente
      const form = $('#addItemForm');
      if (form) {
        if (form.elements['title']) form.elements['title'].value = finalData.title || baseData.title || '';
        if (form.elements['kind']) form.elements['kind'].value = finalData.kind || baseData.kind || 'ferramenta';
        if (form.elements['url']) form.elements['url'].value = url;
        if (form.elements['segment']) form.elements['segment'].value = finalData.segment || 'Conteúdo e Mídia';
        if (form.elements['description']) form.elements['description'].value = finalData.description || '';
        if (form.elements['deliverable']) form.elements['deliverable'].value = finalData.deliverable || '';
        if (form.elements['practicalExample']) form.elements['practicalExample'].value = finalData.practicalExample || '';
        if (form.elements['targetAudience']) form.elements['targetAudience'].value = finalData.targetAudience || 'Criadores e Especialistas';
        if (form.elements['tags']) {
          const tagsArray = Array.isArray(finalData.tags) ? finalData.tags : ['ia', 'produtividade'];
          form.elements['tags'].value = tagsArray.join(', ');
        }
      }

      if (aiAutoFillStatus) {
        aiAutoFillStatus.style.color = '#34d399';
        aiAutoFillStatus.textContent = '✓ Recurso sintetizado pelo Nexus Claw e pronto para salvar!';
      }

      showToast('Sintetizado com Nexus Claw com sucesso! 🚀');
    } catch(err) {
      if (aiAutoFillStatus) {
        aiAutoFillStatus.style.color = '#f87171';
        aiAutoFillStatus.textContent = \`Erro ao extrair: \${err.message}\`;
      }
      showToast('Erro ao processar URL. Tente novamente.');
    } finally {
      btnRunAiAutoFill.disabled = false;
      btnRunAiAutoFill.innerHTML = originalBtnHtml;
      lucide.createIcons();
    }
  });`;
    html = html.replace(fullOldBtnCode, newBtnCode);
    console.log('✓ Listener do botão Preencher com IA atualizado com feedback tátil de ponta.');
  }
}

// Salvar no nexus-acervo.html
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ nexus-acervo.html atualizado.');

// Espelhar integralmente no index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ index.html sincronizado.');

console.log('\n=== MIGRAÇÃO E IMPORTAÇÃO CONCLUÍDAS COM SUCESSO ===');
