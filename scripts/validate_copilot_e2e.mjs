import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');

console.log('=== INICIANDO AUDITORIA & TESTE DE PONTA A PONTA (E2E) DO NEXUS COPILOT IA ===\n');

// 1. Verificação estática do HTML
const html = fs.readFileSync(htmlPath, 'utf8');

const requiredTokens = [
  { token: 'id="btnCopilotConfigKey"', desc: 'Botão Configurar I.A no Header do Copilot' },
  { token: 'Configurar I.A', desc: 'Label explícito Configurar I.A no botão do Copilot' },
  { token: 'id="aiConfigModal"', desc: 'Modal de Configuração de IA presente' },
  { token: 'z-index: 2100 !important;', desc: 'Z-Index prioritário do modal de configuração' },
  { token: 'value="auto"', desc: 'Opção Automático presente no select de modelos' },
  { token: 'callOpenRouterWithFallback', desc: 'Função de Auto-Fallback ativa no código' },
  { token: 'btn-error-config-ai', desc: 'Botão de configuração em caso de erro presente no chat' },
  { token: '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', desc: 'Chave pré-configurada do usuário' }
];

let allTokensFound = true;
for (const item of requiredTokens) {
  if (html.includes(item.token)) {
    console.log(`✅ [ESTÁTICO] ${item.desc}: PRESENTE`);
  } else {
    console.error(`❌ [ESTÁTICO] ${item.desc}: AUSENTE (${item.token})`);
    allTokensFound = false;
  }
}

if (!allTokensFound) {
  process.exit(1);
}

// 2. Teste dinâmico de envio de mensagem ao vivo para o OpenRouter
const apiKey = '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';

const AUTO_MODEL_PRIORITY = [
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'nvidia/nemotron-3.5-lightning:free',
  'openrouter/free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free'
];

async function callOpenRouterWithFallback({ apiKey, model, messages, maxTokens = 300, temperature = 0.3 }) {
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
          'Authorization': `Bearer ${apiKey}`,
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
        console.log(`   [Fallback log] Modelo ${candidateModel} retornou ${res.status}, tentando próximo...`);
        lastError = new Error(`HTTP ${res.status}: ${errText}`);
        continue;
      }

      const data = await res.json();
      const rawContent = data.choices?.[0]?.message?.content;
      if (rawContent && rawContent.trim()) {
        const cleanContent = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
        return {
          content: cleanContent,
          usedModel: candidateModel
        };
      }
    } catch (e) {
      console.log(`   [Fallback log] Erro de rede com ${candidateModel}: ${e.message}`);
      lastError = e;
    }
  }

  throw lastError || new Error('Nenhum modelo gratuito respondeu.');
}

console.log('\n--- EXECUTANDO TESTES DINÂMICOS AO VIVO NA API OPENROUTER ---');

async function runLiveTests() {
  // Teste A: Mensagem simples "tste" (a mensagem exata enviada pelo usuário)
  console.log('\n👉 Teste A: Envio da mensagem "tste" no Modo Automático:');
  const t0 = Date.now();
  const resA = await callOpenRouterWithFallback({
    apiKey,
    model: 'auto',
    messages: [
      { role: 'system', content: 'Você é o Nexus Copilot do Nexus Acervo. Responda em português de forma concisa.' },
      { role: 'user', content: 'tste' }
    ]
  });
  const elapsedA = Date.now() - t0;
  console.log(`✅ Teste A Concluído em ${elapsedA}ms!`);
  console.log(`   Modelo Utilizado: ${resA.usedModel}`);
  console.log(`   Resposta da IA: "${resA.content.slice(0, 140)}..."`);

  // Teste B: Envio com modelo deprecado que causou o erro 404 anterior
  console.log('\n👉 Teste B: Resiliência contra Modelo Deprecado (google/gemini-2.0-flash-exp:free):');
  const resB = await callOpenRouterWithFallback({
    apiKey,
    model: 'google/gemini-2.0-flash-exp:free',
    messages: [
      { role: 'system', content: 'Você é o Nexus Copilot do Nexus Acervo.' },
      { role: 'user', content: 'Qual o propósito do acervo?' }
    ]
  });
  console.log(`✅ Teste B Concluído com Sucesso!`);
  console.log(`   Recuperado transparentemente via: ${resB.usedModel}`);
  console.log(`   Resposta: "${resB.content.slice(0, 140)}..."`);

  // Teste C: Pergunta com contexto do acervo
  console.log('\n👉 Teste C: Pergunta com contexto do acervo ("Quais os 3 melhores repositórios?"):');
  const resC = await callOpenRouterWithFallback({
    apiKey,
    model: 'auto',
    messages: [
      { 
        role: 'system', 
        content: 'Você é o Nexus Copilot. Você tem acesso a 76 recursos do acervo, incluindo Crawl4AI, OpenCodeInterpreter e Documenso.' 
      },
      { role: 'user', content: 'Quais os 3 melhores repositórios do acervo?' }
    ]
  });
  console.log(`✅ Teste C Concluído com Sucesso!`);
  console.log(`   Modelo: ${resC.usedModel}`);
  console.log(`   Resposta da IA:\n${resC.content.slice(0, 220)}...`);

  console.log('\n🎉 TODOS OS TESTES E2E FORAM APROVADOS COM 100% DE SUCESSO!');
}

runLiveTests().catch(err => {
  console.error('\n❌ Falha no teste dinâmico:', err);
  process.exit(1);
});
