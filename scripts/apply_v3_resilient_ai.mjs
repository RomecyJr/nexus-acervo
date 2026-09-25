import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');
const indexPath = path.resolve(rootDir, 'index.html');

console.log('=== APLICANDO ARQUITETURA RESILIENTE DE IA COM MODO AUTO-SELECT E CORREÇÃO DE MODAIS ===');

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Injetar z-index e estilos específicos para modais de IA no bloco CSS
const cssTarget = `.clean-modal.open {
  display: flex !important;
  opacity: 1;
  pointer-events: auto;
}`;

const cssReplacement = `.clean-modal.open {
  display: flex !important;
  opacity: 1;
  pointer-events: auto;
}

#aiCopilotModal {
  z-index: 1050;
}

#aiConfigModal {
  z-index: 2100 !important;
}`;

if (html.includes(cssTarget) && !html.includes('#aiConfigModal {\n  z-index: 2100 !important;')) {
  html = html.replace(cssTarget, cssReplacement);
  console.log('✓ CSS de z-index aplicado para #aiCopilotModal (1050) e #aiConfigModal (2100).');
}

// 2. Atualizar o botão no cabeçalho do Copilot para exibir "Configurar I.A" de forma clara
const oldCopilotHeaderBtn = `<button type="button" class="btn secondary sm" id="btnCopilotConfigKey" title="Configurações de Modelos e Chave" style="font-size: 0.7rem; height: 26px; padding: 0 0.5rem; gap: 0.3rem;"><i data-lucide="sliders-horizontal" style="width: 11px; height: 11px;"></i><span>Modelos</span></button>`;
const newCopilotHeaderBtn = `<button type="button" class="btn secondary sm" id="btnCopilotConfigKey" title="Configurar Modelos Gratuitos e Chave OpenRouter" style="font-size: 0.72rem; height: 28px; padding: 0 0.65rem; gap: 0.35rem; border-color: rgba(56, 189, 248, 0.35); color: #38bdf8;">
          <i data-lucide="settings-2" style="width: 12px; height: 12px;"></i>
          <span>Configurar I.A</span>
        </button>`;

if (html.includes(oldCopilotHeaderBtn)) {
  html = html.replace(oldCopilotHeaderBtn, newCopilotHeaderBtn);
  console.log('✓ Botão do cabeçalho do Copilot atualizado para "Configurar I.A".');
}

// 3. Atualizar o modal #aiConfigModal para ter z-index direto e opções com "Automático"
const oldAiConfigModalTag = `<div class="clean-modal" id="aiConfigModal" role="dialog" aria-modal="true" aria-labelledby="aiConfigModalTitle">`;
const newAiConfigModalTag = `<div class="clean-modal" id="aiConfigModal" role="dialog" aria-modal="true" aria-labelledby="aiConfigModalTitle" style="z-index: 2100 !important;">`;

if (html.includes(oldAiConfigModalTag)) {
  html = html.replace(oldAiConfigModalTag, newAiConfigModalTag);
  console.log('✓ Tag #aiConfigModal atualizada com z-index inline 2100.');
}

const oldSelectBlock = `<select id="selectOpenRouterModel" style="width: 100%; height: 38px; background: var(--surface2); border: 1px solid var(--border-color); border-radius: 6px; padding: 0 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text); cursor: pointer;">
            <option value="nvidia/nemotron-3-ultra-550b-a55b:free" selected>⭐ NVIDIA Nemotron 3 Ultra 550B (Gratuito · Flagship 1M Context)</option>
            <option value="nvidia/nemotron-3-super-120b-a12b:free">⚡ NVIDIA Nemotron 3 Super 120B (Gratuito · Alta Densidade)</option>
            <option value="nvidia/nemotron-3.5-lightning:free">🚀 NVIDIA Nemotron 3.5 Lightning (Gratuito · 1M Context)</option>
            <option value="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free">🧠 NVIDIA Nemotron 3 Nano Omni 30B (Gratuito · Raciocínio Rápido)</option>
            <option value="openrouter/free">🌐 OpenRouter Free Auto-Router (Gratuito · Roteador Inteligente)</option>
          </select>`;

const newSelectBlock = `<select id="selectOpenRouterModel" style="width: 100%; height: 38px; background: var(--surface2); border: 1px solid var(--border-color); border-radius: 6px; padding: 0 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text); cursor: pointer;">
            <option value="auto" selected>✨ Automático (Roteamento Inteligente & Auto-Fallback Gratuito)</option>
            <option value="nvidia/nemotron-3-ultra-550b-a55b:free">🟢 NVIDIA Nemotron 3 Ultra 550B (Gratuito · Flagship 1M Context)</option>
            <option value="nvidia/nemotron-3-super-120b-a12b:free">🟢 NVIDIA Nemotron 3 Super 120B (Gratuito · Alta Densidade)</option>
            <option value="nvidia/nemotron-3.5-lightning:free">⚡ NVIDIA Nemotron 3.5 Lightning (Gratuito · Velocidade Extrema)</option>
            <option value="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free">🧠 NVIDIA Nemotron 3 Nano Omni 30B (Gratuito · Raciocínio Rápido)</option>
            <option value="openrouter/free">🌐 OpenRouter Free Auto-Router (Gratuito · Balanceador Global)</option>
          </select>
          <span style="font-size: 0.7rem; color: #71717a; margin-top: 0.3rem; display: block;">Modo Automático seleciona a melhor IA gratuita disponível e alterna transparentemente em caso de instabilidade.</span>`;

if (html.includes(oldSelectBlock)) {
  html = html.replace(oldSelectBlock, newSelectBlock);
  console.log('✓ Seletor de modelos atualizado com opção Automático (Auto-Fallback).');
}

// 4. Substituir bloco JS de IA pelas funções resilientes de Fallback
const oldJsAiSection = `// ============================================================================
// CHAVE PRE-CONFIGURADA DO OPENROUTER & MOTOR DO COPILOT IA
// ============================================================================
const CANONICAL_OPENROUTER_KEY = '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';
const CANONICAL_OPENROUTER_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';

function getOpenRouterKey() {
  const saved = localStorage.getItem(OPENROUTER_KEY_STORAGE);
  if (saved && saved.trim()) return saved.trim();
  localStorage.setItem(OPENROUTER_KEY_STORAGE, CANONICAL_OPENROUTER_KEY);
  return CANONICAL_OPENROUTER_KEY;
}

function getOpenRouterModel() {
  const saved = localStorage.getItem(OPENROUTER_MODEL_STORAGE);
  if (saved && saved.trim()) return saved.trim();
  localStorage.setItem(OPENROUTER_MODEL_STORAGE, CANONICAL_OPENROUTER_MODEL);
  return CANONICAL_OPENROUTER_MODEL;
}`;

const newJsAiSection = `// ============================================================================
// CHAVE PRE-CONFIGURADA DO OPENROUTER & MOTOR RESILIENTE DO COPILOT IA
// ============================================================================
const CANONICAL_OPENROUTER_KEY = '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';
const CANONICAL_OPENROUTER_MODEL = 'auto';

const VALID_FREE_MODELS = [
  { id: 'auto', name: '✨ Modo Automático (Melhores Modelos Gratuitos)' },
  { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', name: '🟢 NVIDIA Nemotron 3 Ultra 550B (Flagship 1M Context)' },
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', name: '🟢 NVIDIA Nemotron 3 Super 120B (Alta Densidade)' },
  { id: 'nvidia/nemotron-3.5-lightning:free', name: '⚡ NVIDIA Nemotron 3.5 Lightning (Velocidade Extrema)' },
  { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', name: '🧠 NVIDIA Nemotron 3 Nano Omni 30B (Raciocínio Rápido)' },
  { id: 'openrouter/free', name: '🌐 OpenRouter Free Auto-Router (Balanceador Global)' }
];

const AUTO_MODEL_PRIORITY = [
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'nvidia/nemotron-3.5-lightning:free',
  'openrouter/free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free'
];

function sanitizeAiStorage() {
  try {
    const currentKey = localStorage.getItem(OPENROUTER_KEY_STORAGE);
    if (!currentKey || !currentKey.trim() || currentKey.includes('sua-chave') || !currentKey.startsWith('sk-or-v1-')) {
      localStorage.setItem(OPENROUTER_KEY_STORAGE, CANONICAL_OPENROUTER_KEY);
    }

    const currentModel = localStorage.getItem(OPENROUTER_MODEL_STORAGE);
    const validIds = VALID_FREE_MODELS.map(m => m.id);
    if (!currentModel || !validIds.includes(currentModel.trim()) || currentModel.includes('gemini-2.0-flash-exp')) {
      localStorage.setItem(OPENROUTER_MODEL_STORAGE, 'auto');
    }
  } catch(e) {
    console.warn('Erro ao sanitizar storage de IA:', e);
  }
}
sanitizeAiStorage();

function getOpenRouterKey() {
  sanitizeAiStorage();
  return localStorage.getItem(OPENROUTER_KEY_STORAGE) || CANONICAL_OPENROUTER_KEY;
}

function getOpenRouterModel() {
  sanitizeAiStorage();
  return localStorage.getItem(OPENROUTER_MODEL_STORAGE) || 'auto';
}

function getModelDisplayName(modelId) {
  if (!modelId || modelId === 'auto') return '✨ Modo Automático (Melhores Modelos Gratuitos)';
  const found = VALID_FREE_MODELS.find(m => m.id === modelId);
  if (found) return found.name;
  const parts = modelId.split('/');
  return parts[1] || modelId;
}

async function callOpenRouterWithFallback({ apiKey, model, messages, maxTokens = 800, temperature = 0.3 }) {
  let candidates = [];
  if (!model || model === 'auto') {
    candidates = [...AUTO_MODEL_PRIORITY];
  } else {
    candidates = [model, ...AUTO_MODEL_PRIORITY.filter(m => m !== model)];
  }

  let lastError = null;
  for (const candidateModel of candidates) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'HTTP-Referer': 'https://nexus-acervo.vercel.app',
          'X-Title': 'Nexus Acervo',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: candidateModel,
          messages: messages,
          max_tokens: maxTokens,
          temperature: temperature
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn('[OpenRouter Fallback] Modelo ' + candidateModel + ' retornou status ' + res.status + ': ' + errText);
        lastError = new Error('HTTP ' + res.status + ': ' + errText);
        continue;
      }

      const data = await res.json();
      const rawContent = data.choices?.[0]?.message?.content;
      if (rawContent && rawContent.trim()) {
        const cleanContent = rawContent.replace(/<think>[\\s\\S]*?<\\/think>/gi, '').trim();
        return {
          content: cleanContent,
          usedModel: candidateModel
        };
      }
    } catch (e) {
      console.warn('[OpenRouter Fallback] Excecao no modelo ' + candidateModel + ':', e.message);
      lastError = e;
    }
  }

  throw lastError || new Error('Nenhum modelo gratuito da rede OpenRouter respondeu com sucesso no momento.');
}`;

if (html.includes(oldJsAiSection)) {
  html = html.replace(oldJsAiSection, newJsAiSection);
  console.log('✓ Seção JS de IA atualizada com suporte canônico a Auto-Fallback.');
}

// 5. Substituir sendCopilotMessage por versão com auto-recuperação e feedback claro
const oldSendCopilot = `async function sendCopilotMessage(userText) {
  const messagesContainer = $('#copilotMessages');
  if (!messagesContainer) return;

  // 1. Renderizar mensagem do usuário
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'copilot-msg msg-user';
  userMsgEl.innerHTML = \`
    <div class="copilot-msg-avatar">RV</div>
    <div class="copilot-msg-content">\${esc(userText).replace(/\\n/g, '<br>')}</div>
  \`;
  messagesContainer.appendChild(userMsgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // 2. Renderizar indicador de digitação da IA
  const typingEl = document.createElement('div');
  typingEl.className = 'copilot-msg msg-ai';
  typingEl.id = 'copilotTyping';
  typingEl.innerHTML = \`
    <div class="copilot-msg-avatar"><i data-lucide="key-round" style="width:14px;height:14px;"></i></div>
    <div class="copilot-msg-content copilot-typing-indicator">
      <span class="copilot-typing-dot"></span>
      <span class="copilot-typing-dot"></span>
      <span class="copilot-typing-dot"></span>
    </div>
  \`;
  messagesContainer.appendChild(typingEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  lucide.createIcons();

  // 3. Montar mensagens para a API
  copilotChatHistory.push({ role: 'user', content: userText });
  const messages = [
    { role: 'system', content: buildNexusCopilotSystemPrompt() },
    ...copilotChatHistory.slice(-8)
  ];

  const apiKey = getOpenRouterKey();
  const model = getOpenRouterModel();

  try {
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
        messages: messages,
        max_tokens: 800,
        temperature: 0.3
      })
    });

    typingEl.remove();

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(\`Erro HTTP \${res.status}: \${errText}\`);
    }

    const data = await res.json();
    let reply = data.choices?.[0]?.message?.content || 'Não foi possível obter resposta do modelo.';

    // Se o modelo retornou raciocínio interno separado, garante a extração do conteúdo limpo
    reply = reply.replace(/<think>[\\s\\S]*?<\\/think>/gi, '').trim();

    copilotChatHistory.push({ role: 'assistant', content: reply });

    // Renderizar resposta da IA
    const aiMsgEl = document.createElement('div');
    aiMsgEl.className = 'copilot-msg msg-ai';
    
    // Markdown básico para negrito, código e links
    const formattedReply = reply
      .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
      .replace(/\\n/g, '<br>');

    aiMsgEl.innerHTML = \`
      <div class="copilot-msg-avatar"><i data-lucide="key-round" style="width:14px;height:14px;"></i></div>
      <div class="copilot-msg-content">\${formattedReply}</div>
    \`;
    messagesContainer.appendChild(aiMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    lucide.createIcons();
  } catch(err) {
    typingEl.remove();
    const errorEl = document.createElement('div');
    errorEl.className = 'copilot-msg msg-ai';
    errorEl.innerHTML = \`
      <div class="copilot-msg-avatar"><i data-lucide="alert-circle" style="width:14px;height:14px;color:#f87171;"></i></div>
      <div class="copilot-msg-content" style="border-color:rgba(239,68,68,0.3);color:#f87171;">
        Desculpe, ocorreu uma falha na chamada à IA: \${esc(err.message)}
      </div>
    \`;
    messagesContainer.appendChild(errorEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    lucide.createIcons();
  }
}`;

const newSendCopilot = `async function sendCopilotMessage(userText) {
  const messagesContainer = $('#copilotMessages');
  if (!messagesContainer) return;

  // 1. Renderizar mensagem do usuário
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'copilot-msg msg-user';
  userMsgEl.innerHTML = \`
    <div class="copilot-msg-avatar">RV</div>
    <div class="copilot-msg-content">\${esc(userText).replace(/\\n/g, '<br>')}</div>
  \`;
  messagesContainer.appendChild(userMsgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // 2. Renderizar indicador de digitação da IA
  const typingEl = document.createElement('div');
  typingEl.className = 'copilot-msg msg-ai';
  typingEl.id = 'copilotTyping';
  typingEl.innerHTML = \`
    <div class="copilot-msg-avatar"><i data-lucide="key-round" style="width:14px;height:14px;"></i></div>
    <div class="copilot-msg-content copilot-typing-indicator">
      <span class="copilot-typing-dot"></span>
      <span class="copilot-typing-dot"></span>
      <span class="copilot-typing-dot"></span>
    </div>
  \`;
  messagesContainer.appendChild(typingEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  lucide.createIcons();

  // 3. Montar mensagens para a API
  copilotChatHistory.push({ role: 'user', content: userText });
  const messages = [
    { role: 'system', content: buildNexusCopilotSystemPrompt() },
    ...copilotChatHistory.slice(-8)
  ];

  const apiKey = getOpenRouterKey();
  const selectedModel = getOpenRouterModel();

  try {
    const result = await callOpenRouterWithFallback({
      apiKey: apiKey,
      model: selectedModel,
      messages: messages,
      maxTokens: 800,
      temperature: 0.3
    });

    typingEl.remove();

    const reply = result.content || 'Não foi possível obter resposta do modelo.';
    copilotChatHistory.push({ role: 'assistant', content: reply });

    // Renderizar resposta da IA
    const aiMsgEl = document.createElement('div');
    aiMsgEl.className = 'copilot-msg msg-ai';
    
    // Markdown básico para negrito, código e links
    const formattedReply = reply
      .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
      .replace(/\\n/g, '<br>');

    const usedModelShort = result.usedModel.split('/')[1]?.replace(':free', '') || result.usedModel;

    aiMsgEl.innerHTML = \`
      <div class="copilot-msg-avatar"><i data-lucide="key-round" style="width:14px;height:14px;"></i></div>
      <div class="copilot-msg-content">
        \${formattedReply}
        <div style="margin-top: 0.55rem; padding-top: 0.45rem; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.68rem; color: var(--faint); display: flex; align-items: center; justify-content: space-between;">
          <span>⚡ \${esc(usedModelShort)} · Gratuito</span>
          <span style="color: #34d399;">● Online</span>
        </div>
      </div>
    \`;
    messagesContainer.appendChild(aiMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    lucide.createIcons();
  } catch(err) {
    typingEl.remove();
    const errorEl = document.createElement('div');
    errorEl.className = 'copilot-msg msg-ai';
    errorEl.innerHTML = \`
      <div class="copilot-msg-avatar"><i data-lucide="alert-circle" style="width:14px;height:14px;color:#f87171;"></i></div>
      <div class="copilot-msg-content" style="border-color:rgba(239,68,68,0.3);color:#f87171;">
        <p style="margin-bottom: 0.45rem;"><strong>Falha na comunicação com a IA:</strong> \${esc(err.message)}</p>
        <button type="button" class="btn secondary sm btn-error-config-ai" style="font-size: 0.72rem; height: 26px; padding: 0 0.55rem; gap: 0.3rem;">
          <i data-lucide="settings-2" style="width: 12px; height: 12px;"></i>
          <span>Configurar I.A</span>
        </button>
      </div>
    \`;
    messagesContainer.appendChild(errorEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    lucide.createIcons();

    errorEl.querySelector('.btn-error-config-ai')?.addEventListener('click', () => {
      openAiConfig();
    });
  }
}`;

if (html.includes(oldSendCopilot)) {
  html = html.replace(oldSendCopilot, newSendCopilot);
  console.log('✓ sendCopilotMessage atualizado com chamada resiliente e botão de configuração em caso de erro.');
}

// 6. Atualizar synthesizeWithOpenRouter para usar callOpenRouterWithFallback
const oldSynthesizeTarget = 'async function synthesizeWithOpenRouter(url, baseData, apiKey, model) {';
const oldSynthesizeEnd = 'return JSON.parse(cleanJson);\n}';

const idxSynthesizeStart = html.indexOf(oldSynthesizeTarget);
if (idxSynthesizeStart !== -1) {
  const idxSynthesizeEnd = html.indexOf(oldSynthesizeEnd, idxSynthesizeStart);
  if (idxSynthesizeEnd !== -1) {
    const fullOldSynthesize = html.substring(idxSynthesizeStart, idxSynthesizeEnd + oldSynthesizeEnd.length);
    const newSynthesizeFunction = `async function synthesizeWithOpenRouter(url, baseData, apiKey, model) {
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

  const result = await callOpenRouterWithFallback({
    apiKey: apiKey,
    model: model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    maxTokens: 600,
    temperature: 0.2
  });

  const rawContent = result.content || '{}';
  const cleanJson = rawContent.replace(/^` + '```' + `json\\s*/i, '').replace(/` + '```' + `\\s*$/i, '').trim();
  return JSON.parse(cleanJson);
}`;
    html = html.replace(fullOldSynthesize, newSynthesizeFunction);
    console.log('✓ synthesizeWithOpenRouter atualizado com auto-fallback.');
  }
}

// 7. Atualizar os listeners do Copilot e do Modal de Configuração
const oldListenersTarget = '  // --------------------------------------------------------------------------\n  // EVENT LISTENERS DO NEXUS COPILOT (ÍCONE CHAVE)\n  // --------------------------------------------------------------------------';
const oldListenersEnd = 'showToast(\'OpenRouter conectado e validado com sucesso! 🚀\');\n    } catch(err) {\n      if (aiTestFeedback) {\n        aiTestFeedback.style.background = \'rgba(239, 68, 68, 0.1)\';\n        aiTestFeedback.style.color = \'#f87171\';\n        aiTestFeedback.textContent = `Falha no teste: ${err.message}`;\n      }\n    }\n  });';

const idxListenersStart = html.indexOf(oldListenersTarget);
if (idxListenersStart !== -1) {
  const idxListenersEnd = html.indexOf(oldListenersEnd, idxListenersStart);
  if (idxListenersEnd !== -1) {
    const fullOldListeners = html.substring(idxListenersStart, idxListenersEnd + oldListenersEnd.length);
    const newListenersCode = `  // --------------------------------------------------------------------------
  // EVENT LISTENERS DO NEXUS COPILOT (ÍCONE CHAVE)
  // --------------------------------------------------------------------------
  const aiCopilotModal = $('#aiCopilotModal');
  const btnOpenAiCopilot = $('#btnOpenAiCopilot');
  const btnSideOpenAiCopilot = $('#btnSideOpenAiCopilot');
  const btnCopilotClose = $('#btnCopilotClose');
  const btnCopilotConfigKey = $('#btnCopilotConfigKey');
  const copilotChatForm = $('#copilotChatForm');
  const copilotChatInput = $('#copilotChatInput');
  const btnClearCopilotHistory = $('#btnClearCopilotHistory');

  function updateCopilotModelHeader() {
    const modelLabel = $('#copilotModelActiveLabel');
    if (modelLabel) {
      const activeModel = getOpenRouterModel();
      modelLabel.textContent = getModelDisplayName(activeModel);
    }
  }

  function openCopilot() {
    sanitizeAiStorage();
    if (aiCopilotModal) aiCopilotModal.classList.add('open');
    const pill = $('#copilotCatalogCountPill');
    if (pill) pill.textContent = \`\${state.items.length} ITENS CARREGADOS\`;
    updateCopilotModelHeader();
    setTimeout(() => copilotChatInput?.focus(), 120);
    lucide.createIcons();
  }

  btnOpenAiCopilot?.addEventListener('click', openCopilot);
  btnSideOpenAiCopilot?.addEventListener('click', openCopilot);
  btnCopilotClose?.addEventListener('click', () => aiCopilotModal?.classList.remove('open'));
  btnCopilotConfigKey?.addEventListener('click', () => {
    openAiConfig();
  });

  btnClearCopilotHistory?.addEventListener('click', () => {
    copilotChatHistory = [];
    const container = $('#copilotMessages');
    if (container) {
      container.innerHTML = \`
        <div class="copilot-msg msg-ai">
          <div class="copilot-msg-avatar"><i data-lucide="key-round" style="width: 14px; height: 14px;"></i></div>
          <div class="copilot-msg-content">
            <p>Histórico limpo. Estou pronto para ajudar com novas questões de texto, imagens ou exploração do acervo!</p>
          </div>
        </div>
      \`;
      lucide.createIcons();
    }
  });

  // Envio por formulário ou Enter
  copilotChatForm?.addEventListener('submit', e => {
    e.preventDefault();
    const text = (copilotChatInput?.value || '').trim();
    if (!text) return;
    copilotChatInput.value = '';
    copilotChatInput.style.height = 'auto';
    sendCopilotMessage(text);
  });

  copilotChatInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      copilotChatForm?.requestSubmit();
    }
  });

  // Chips de perguntas rápidas
  $('.copilot-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt;
      if (prompt) {
        sendCopilotMessage(prompt);
      }
    });
  });


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
    sanitizeAiStorage();
    if (inputOpenRouterKey) inputOpenRouterKey.value = getOpenRouterKey();
    if (selectOpenRouterModel) selectOpenRouterModel.value = getOpenRouterModel();
    if (aiTestFeedback) aiTestFeedback.style.display = 'none';
    if (aiConfigModal) {
      aiConfigModal.style.zIndex = '2100';
      aiConfigModal.classList.add('open');
    }
    lucide.createIcons();
  }

  function closeAiConfig() {
    if (aiConfigModal) aiConfigModal.classList.remove('open');
    updateCopilotModelHeader();
  }

  btnOpenAiSettings?.addEventListener('click', openAiConfig);
  btnToggleAiConfigModal?.addEventListener('click', openAiConfig);
  btnAiConfigClose?.addEventListener('click', closeAiConfig);
  btnCancelAiConfig?.addEventListener('click', closeAiConfig);

  btnToggleKeyVisibility?.addEventListener('click', () => {
    if (!inputOpenRouterKey) return;
    const isPass = inputOpenRouterKey.type === 'password';
    inputOpenRouterKey.type = isPass ? 'text' : 'password';
    btnToggleKeyVisibility.innerHTML = \`<i data-lucide="\${isPass ? 'eye-off' : 'eye'}" style="width:15px;height:15px;"></i>\`;
    lucide.createIcons();
  });

  btnSaveAiConfig?.addEventListener('click', () => {
    const key = (inputOpenRouterKey?.value || '').trim();
    const model = selectOpenRouterModel?.value || 'auto';
    if (key) {
      localStorage.setItem(OPENROUTER_KEY_STORAGE, key);
      localStorage.setItem(OPENROUTER_MODEL_STORAGE, model);
      showToast('Configurações de IA salvas com sucesso! ✨');
    } else {
      localStorage.removeItem(OPENROUTER_KEY_STORAGE);
      showToast('Chave OpenRouter removida.');
    }
    closeAiConfig();
  });

  btnTestOpenRouter?.addEventListener('click', async () => {
    const key = (inputOpenRouterKey?.value || '').trim();
    const model = selectOpenRouterModel?.value || 'auto';
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
      aiTestFeedback.textContent = 'Testando conexão e auto-fallback com OpenRouter...';
    }

    try {
      const result = await callOpenRouterWithFallback({
        apiKey: key,
        model: model,
        messages: [{ role: 'user', content: 'Ping' }],
        maxTokens: 10,
        temperature: 0.1
      });

      if (aiTestFeedback) {
        aiTestFeedback.style.background = 'rgba(16, 185, 129, 0.1)';
        aiTestFeedback.style.color = '#34d399';
        aiTestFeedback.innerHTML = \`✅ Conexão validada com sucesso! Respondeu via <strong>\${esc(result.usedModel)}</strong>\`;
      }
      showToast('OpenRouter conectado e validado com sucesso! 🚀');
    } catch(err) {
      if (aiTestFeedback) {
        aiTestFeedback.style.background = 'rgba(239, 68, 68, 0.1)';
        aiTestFeedback.style.color = '#f87171';
        aiTestFeedback.textContent = \`Falha no teste: \${err.message}\`;
      }
    }
  });`;
    html = html.replace(fullOldListeners, newListenersCode);
    console.log('✓ Listeners do Copilot e do Modal de Configuração atualizados com sincronização e z-index 2100.');
  }
}

// Salvar no nexus-acervo.html
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ nexus-acervo.html salvo com sucesso.');

// Espelhar integralmente no index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ index.html sincronizado com sucesso.');

console.log('\n=== APLICAÇÃO FINALIZADA COM SUCESSO ===');
