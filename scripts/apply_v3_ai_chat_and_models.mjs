import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');

console.log('=== APLICANDO NEXUS COPILOT IA (ÍCONE CHAVE, CONTEXTO DO ACERVO & 5 MELHORES MODELOS GRATUITOS) ===');

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Chave fornecida pelo usuário e modelo padrão
const USER_OPENROUTER_KEY = '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';
const DEFAULT_FREE_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';

// 2. Adicionar o Ícone Chave no Topbar (ao lado de perfil e busca)
const oldTopbarRight = `<div class="topbar-right">
        <button class="user-profile-btn" id="btnUserAuth" aria-label="Acessar Perfil e Cofre">`;

const newTopbarRight = `<div class="topbar-right">
        <button class="btn icon-only ai-copilot-trigger-btn" id="btnOpenAiCopilot" title="Conversar com a IA (Nexus Copilot · Chave de Inteligência)" aria-label="Abrir Assistente de IA com Contexto do Acervo">
          <i data-lucide="key-round" style="width:16px;height:16px;color:#10b981;"></i>
        </button>
        <button class="user-profile-btn" id="btnUserAuth" aria-label="Acessar Perfil e Cofre">`;

if (html.includes(oldTopbarRight)) {
  html = html.replace(oldTopbarRight, newTopbarRight);
  console.log('✓ Ícone Chave de Inteligência integrado no Topbar.');
}

// 3. Atualizar a Sidebar para incluir o botão de Conversar com a IA
const oldSideAiButton = `<button class="nav-btn" id="btnOpenAiImport" aria-label="Importação Inteligente com IA">
            <span class="nav-btn-inner"><i data-lucide="sparkles" style="color:#10b981;"></i> Importar com IA</span>
          </button>`;

const newSideAiButton = `<button class="nav-btn" id="btnSideOpenAiCopilot" aria-label="Conversar com a IA">
            <span class="nav-btn-inner"><i data-lucide="key-round" style="color:#10b981;"></i> Assistente IA (Chave)</span>
          </button>
          <button class="nav-btn" id="btnOpenAiImport" aria-label="Importação Inteligente com IA">
            <span class="nav-btn-inner"><i data-lucide="sparkles" style="color:#38bdf8;"></i> Importar com IA</span>
          </button>`;

if (html.includes(oldSideAiButton)) {
  html = html.replace(oldSideAiButton, newSideAiButton);
  console.log('✓ Item Assistente IA (Chave) adicionado à Sidebar.');
}

// 4. Injetar o Modal do Nexus Copilot Chat
const copilotModalHtml = `
<!-- ==========================================================================
     MODAL NEXUS COPILOT (CHAT COM IA & CONTEXTO DO ACERVO)
     ========================================================================== -->
<div class="clean-modal" id="aiCopilotModal" role="dialog" aria-modal="true" aria-labelledby="copilotModalTitle">
  <div class="modal-dialog" style="max-width: 660px; height: 86vh; display: flex; flex-direction: column;">
    <!-- Header -->
    <div style="padding: 1.1rem 1.25rem 0.95rem; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;">
      <div style="display: flex; align-items: center; gap: 0.65rem;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(16, 185, 129, 0.12); display: grid; place-items: center; color: #10b981;">
          <i data-lucide="key-round" style="width: 17px; height: 17px;"></i>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h2 style="font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text);" id="copilotModalTitle">Nexus Copilot · Assistente IA</h2>
            <span style="font-size: 0.62rem; font-weight: 700; padding: 0.1rem 0.4rem; border-radius: 4px; background: rgba(16, 185, 129, 0.15); color: #34d399; font-family: var(--font-mono);" id="copilotCatalogCountPill">76 ITENS CARREGADOS</span>
          </div>
          <p style="font-size: 0.72rem; color: var(--muted-text); margin-top: 0.1rem;" id="copilotModelActiveLabel">NVIDIA Nemotron 3 Ultra (550B Flagship Free)</p>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.4rem;">
        <button type="button" class="btn secondary sm" id="btnCopilotConfigKey" title="Configurações de Modelos e Chave" style="font-size: 0.7rem; height: 26px; padding: 0 0.5rem; gap: 0.3rem;"><i data-lucide="sliders-horizontal" style="width: 11px; height: 11px;"></i><span>Modelos</span></button>
        <button class="modal-close-icon" id="btnCopilotClose" aria-label="Fechar Copilot" style="position: static; margin-left: 0.25rem;"><i data-lucide="x"></i></button>
      </div>
    </div>

    <!-- Quick Prompts Chips -->
    <div style="padding: 0.6rem 1.25rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; gap: 0.4rem; overflow-x: auto; flex-shrink: 0;" class="copilot-quick-chips">
      <button type="button" class="copilot-chip-btn" data-prompt="Quais são os 3 melhores repositórios de automação e scraping do acervo?">🔍 Melhores Repos</button>
      <button type="button" class="copilot-chip-btn" data-prompt="Como devo escrever a descrição e entregável de uma ferramenta no padrão de 50 mil dólares?">✍️ Padrão de Texto</button>
      <button type="button" class="copilot-chip-btn" data-prompt="Onde encontrar as capas e imagens oficiais de alta definição para repositórios e vídeos?">🖼️ Dicas de Imagens</button>
      <button type="button" class="copilot-chip-btn" data-prompt="Faça um diagnóstico do meu acervo: quantos recursos tenho, quais segmentos se destacam e o que estudar a seguir?">📊 Diagnóstico do Acervo</button>
    </div>

    <!-- Messages Area -->
    <div id="copilotMessages" style="flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.95rem;">
      <!-- Welcome Message -->
      <div class="copilot-msg msg-ai">
        <div class="copilot-msg-avatar"><i data-lucide="key-round" style="width: 14px; height: 14px;"></i></div>
        <div class="copilot-msg-content">
          <p>Olá, <strong>Romecy</strong>! Sou seu assistente com inteligência artificial conectado diretamente à base de conhecimento do <strong>Nexus Acervo</strong>.</p>
          <p style="margin-top: 0.4rem;">Tenho acesso em tempo real aos seus <strong>76 recursos catalogados</strong>, suas tags, repositórios, favoritos e status de estudo. Como posso te ajudar hoje?</p>
          <ul style="margin: 0.45rem 0 0 1.2rem; font-size: 0.78rem; display: grid; gap: 0.25rem;">
            <li><strong>Textos & Curadoria:</strong> revisar descrições, lapidar entregáveis tangíveis e formular títulos canônicos.</li>
            <li><strong>Imagens & Capas:</strong> orientar links oficiais do GitHub OpenGraph, YouTube HD e Favicons 128px.</li>
            <li><strong>Recomendações:</strong> descobrir ferramentas e repositórios para seu objetivo atual.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div style="padding: 0.85rem 1.25rem 1.15rem; border-top: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; background: var(--surface);">
      <form id="copilotChatForm" style="display: flex; gap: 0.5rem; align-items: flex-end;">
        <div style="flex: 1; position: relative;">
          <textarea id="copilotChatInput" rows="1" placeholder="Pergunte sobre textos, imagens, repositórios ou ideias de estudo..." style="width: 100%; min-height: 42px; max-height: 120px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.65rem 0.85rem; font-size: 0.825rem; color: var(--text); resize: none; line-height: 1.4;"></textarea>
        </div>
        <button type="submit" class="btn primary" id="btnSendCopilotMsg" style="height: 42px; padding: 0 1rem; border-radius: 8px; font-weight: 700; gap: 0.35rem;">
          <i data-lucide="send" style="width: 14px; height: 14px;"></i>
          <span>Enviar</span>
        </button>
      </form>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.45rem; font-size: 0.68rem; color: var(--faint);">
        <span>Pressione Enter para enviar, Shift+Enter para nova linha</span>
        <button type="button" id="btnClearCopilotHistory" style="background: none; border: none; color: #71717a; cursor: pointer; text-decoration: underline;">Limpar histórico</button>
      </div>
    </div>
  </div>
</div>
`;

if (!html.includes('id="aiCopilotModal"')) {
  html = html.replace('<!-- MODAL DE CONFIGURAÇÃO OPENROUTER IA', `${copilotModalHtml}\n<!-- MODAL DE CONFIGURAÇÃO OPENROUTER IA`);
  console.log('✓ Modal do Nexus Copilot Chat integrado ao HTML.');
}

// 5. Atualizar o selector de modelos para incluir EXCLUSIVAMENTE os 5 melhores modelos gratuitos
const oldModelSelect = `<select id="selectOpenRouterModel" style="width: 100%; height: 38px; background: var(--surface2); border: 1px solid var(--border-color); border-radius: 6px; padding: 0 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text); cursor: pointer;">
            <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B Instruct (Gratuito / Excelente)</option>
            <option value="google/gemini-2.0-flash-exp:free">Google Gemini 2.0 Flash (Gratuito / Ultra Rápido)</option>
            <option value="deepseek/deepseek-r1:free">DeepSeek R1 (Gratuito / Raciocínio Profundo)</option>
            <option value="deepseek/deepseek-chat">DeepSeek V3 (Chat Econômico de Alta Qualidade)</option>
            <option value="mistralai/mistral-7b-instruct:free">Mistral 7B Instruct (Gratuito)</option>
          </select>`;

const newModelSelect = `<select id="selectOpenRouterModel" style="width: 100%; height: 38px; background: var(--surface2); border: 1px solid var(--border-color); border-radius: 6px; padding: 0 0.85rem; font-size: 0.8rem; font-weight: 600; color: var(--text); cursor: pointer;">
            <option value="nvidia/nemotron-3-ultra-550b-a55b:free" selected>⭐ NVIDIA Nemotron 3 Ultra 550B (Gratuito · Flagship 1M Context)</option>
            <option value="nvidia/nemotron-3-super-120b-a12b:free">⚡ NVIDIA Nemotron 3 Super 120B (Gratuito · Alta Densidade)</option>
            <option value="nvidia/nemotron-3.5-lightning:free">🚀 NVIDIA Nemotron 3.5 Lightning (Gratuito · 1M Context)</option>
            <option value="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free">🧠 NVIDIA Nemotron 3 Nano Omni 30B (Gratuito · Raciocínio Rápido)</option>
            <option value="openrouter/free">🌐 OpenRouter Free Auto-Router (Gratuito · Roteador Inteligente)</option>
          </select>`;

if (html.includes(oldModelSelect)) {
  html = html.replace(oldModelSelect, newModelSelect);
  console.log('✓ Seletor atualizado exclusivamente com os 5 melhores modelos gratuitos do OpenRouter.');
}

// 6. Injetar CSS do Copilot Chat e Botão Chave
const copilotCss = `
/* ==========================================================================
   CSS NEXUS COPILOT (CHAT COM IA & ESTILO GHOST NATIVO)
   ========================================================================== */
.ai-copilot-trigger-btn {
  background: transparent !important;
  border: none !important;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform 120ms ease, background 120ms ease;
  border-radius: 6px;
  width: 32px;
  height: 32px;
}
.ai-copilot-trigger-btn:hover {
  background: rgba(16, 185, 129, 0.12) !important;
  transform: translateY(-1px);
}
.ai-copilot-trigger-btn:active {
  transform: scale(0.96);
}

.copilot-quick-chips::-webkit-scrollbar {
  display: none;
}
.copilot-quick-chips {
  scrollbar-width: none;
}

.copilot-chip-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: #a1a1aa;
  border-radius: 9999px;
  padding: 0.22rem 0.65rem;
  font-size: 0.72rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 120ms ease;
}
.copilot-chip-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.15);
}

.copilot-msg {
  display: flex;
  gap: 0.65rem;
  max-width: 92%;
  animation: fadeIn 150ms ease-out;
}
.copilot-msg.msg-ai {
  align-self: flex-start;
}
.copilot-msg.msg-user {
  align-self: flex-end;
  flex-direction: row-reverse;
}
.copilot-msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.copilot-msg.msg-ai .copilot-msg-avatar {
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
}
.copilot-msg.msg-user .copilot-msg-avatar {
  background: rgba(255, 255, 255, 0.08);
  color: #f4f4f5;
  font-size: 0.68rem;
  font-weight: 700;
}

.copilot-msg-content {
  border-radius: 10px;
  padding: 0.75rem 0.95rem;
  font-size: 0.825rem;
  line-height: 1.5;
  color: #e4e4e7;
  word-break: break-word;
}
.copilot-msg.msg-ai .copilot-msg-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px 12px 12px 2px;
}
.copilot-msg.msg-user .copilot-msg-content {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 12px 12px 2px 12px;
  color: #f4f4f5;
}
.copilot-msg-content pre {
  background: #000;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.5rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.4rem 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
.copilot-msg-content code {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  background: rgba(255,255,255,0.06);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}
.copilot-typing-indicator {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
}
.copilot-typing-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 1s infinite alternate;
}
.copilot-typing-dot:nth-child(2) { animation-delay: 200ms; }
.copilot-typing-dot:nth-child(3) { animation-delay: 400ms; }
`;

if (!html.includes('CSS NEXUS COPILOT')) {
  html = html.replace('/* User Profile & Auth Badges */', `${copilotCss}\n\n/* User Profile & Auth Badges */`);
  console.log('✓ CSS do Nexus Copilot injetado.');
}

// 7. Atualizar a lógica JavaScript com o motor do Copilot com contexto do acervo
const copilotJsSnippet = `
// ============================================================================
// CHAVE PRE-CONFIGURADA DO OPENROUTER & MOTOR DO COPILOT IA
// ============================================================================
const CANONICAL_OPENROUTER_KEY = '${USER_OPENROUTER_KEY}';
const CANONICAL_OPENROUTER_MODEL = '${DEFAULT_FREE_MODEL}';

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
}

// Histórico de conversação local
let copilotChatHistory = [];

function buildNexusCopilotSystemPrompt() {
  const total = state.items.length;
  const seenCount = storedSeen.size;
  const favCount = storedFavorites.size;
  const deletedCount = storedDeleted.size;
  const unseenCount = Math.max(0, total - seenCount - deletedCount);

  // Amostra rica e estruturada dos recursos reais do catálogo
  const catalogContext = state.items.slice(0, 60).map(i => {
    return \`- [\${i.kind.toUpperCase()}] "\${i.title}" (\${i.segment}\${i.stars ? ' | ★' + i.stars : ''}): \${i.deliverable || i.description} (URL: \${i.url})\`;
  }).join('\\n');

  return \`Você é o Nexus Copilot, o assistente oficial de IA do Nexus Acervo ($50k benchmark de curadoria técnica padrão Linear e Sindre Sorhus Awesome).
Você auxilia diretamente o curador Romecy Veiga a gerenciar, enriquecer e estudar o acervo.

ESTADO ATUAL DO ACERVO:
- Total de recursos ativos: \${total} itens
- Concluídos (Já vistos): \${seenCount}
- Pendentes (A estudar): \${unseenCount}
- Favoritos: \${favCount}
- Lixeira: \${deletedCount}

DIRETRIZES TÉCNICAS E DE IMAGENS:
1. Padrão de Texto Editorial: Títulos no formato "Nome — Ação ou Proposta de Valor". Descrições executivas sem adjetivos inflados ("supremo", "mágico"). Entregáveis tangíveis e mensuráveis.
2. Padrão de Imagens e Capas:
   - YouTube: https://img.youtube.com/vi/{id}/hqdefault.jpg
   - GitHub Repos: https://opengraph.githubassets.com/1/{owner}/{repo}
   - Ferramentas Web: https://www.google.com/s2/favicons?domain={domain}&sz=128
   - Sem fotos genéricas repetidas de banco de imagens.

RECURSOS CADASTRADOS NO ACERVO:
\${catalogContext}

SUA POSTURA:
- Responda em português brasileiro de alto nível técnico, direto e executivo.
- Se o usuário pedir recomendações, use os itens reais do acervo.
- Se pedir sugestões de imagens ou capas, forneça as URLs exatas segundo os padrões acima.
- Se pedir para melhorar um texto, forneça a versão refinada com Título, Entregável e Exemplo Prático prontos para copiar.\`;
}

async function sendCopilotMessage(userText) {
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
}
`;

// Substituir declarações anteriores de getOpenRouterKey
html = html.replace(/const OPENROUTER_KEY_STORAGE = 'nexus_openrouter_key';[\s\S]*?function getOpenRouterModel\(\) \{[\s\S]*?\}/, `const OPENROUTER_KEY_STORAGE = 'nexus_openrouter_key';\nconst OPENROUTER_MODEL_STORAGE = 'nexus_openrouter_model';\n\n${copilotJsSnippet}`);

// 8. Event listeners para abrir o Copilot, enviar mensagem e chips rápidos
const copilotEventsSnippet = `
  // --------------------------------------------------------------------------
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

  function openCopilot() {
    if (aiCopilotModal) aiCopilotModal.classList.add('open');
    const pill = $('#copilotCatalogCountPill');
    if (pill) pill.textContent = \`\${state.items.length} ITENS CARREGADOS\`;
    const modelLabel = $('#copilotModelActiveLabel');
    if (modelLabel) {
      const activeModel = getOpenRouterModel();
      modelLabel.textContent = \`Modelo: \${activeModel.split('/')[1] || activeModel}\`;
    }
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
  $$('.copilot-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt;
      if (prompt) {
        sendCopilotMessage(prompt);
      }
    });
  });
`;

if (!html.includes('btnOpenAiCopilot?.addEventListener')) {
  html = html.replace('// --------------------------------------------------------------------------\n  // MODAL DE CONFIGURAÇÃO DE IA (OPENROUTER)', `${copilotEventsSnippet}\n\n  // --------------------------------------------------------------------------\n  // MODAL DE CONFIGURAÇÃO DE IA (OPENROUTER)`);
  console.log('✓ Event listeners do Nexus Copilot integrados.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('=== NEXUS COPILOT IA CONSOLIDADO COM SUCESSO ===');
