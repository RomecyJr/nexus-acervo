import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');

console.log('=== INICIANDO AUDITORIA & TESTE DE PONTA A PONTA (E2E) DO NEXUS CLAW IA ===\n');

// 1. Verificação estática do HTML
const html = fs.readFileSync(htmlPath, 'utf8');

const requiredTokens = [
  { token: 'id="btnCopilotConfigKey"', desc: 'Botão Configurar IA no Header do Copilot' },
  { token: 'id="aiConfigModal"', desc: 'Modal de Configuração de IA presente' },
  { token: 'z-index: 2100 !important;', desc: 'Z-Index prioritário do modal de configuração' },
  { token: 'z-ai/glm-5.3-flash', desc: 'Modelo Z.ai GLM 5.3 Flash configurado como prioritário' },
  { token: 'google/gemini-2.5-flash-lite', desc: 'Opção Google Gemini 2.5 Flash Lite presente' },
  { token: 'callOpenRouterWithFallback', desc: 'Função de Auto-Fallback ativa no código' },
  { token: 'extractMetadataFromUrl', desc: 'Extrator oficial e autônomo de URLs ativo' },
  { token: 'synthesizeAutonomousEditorial', desc: 'Motor de síntese editorial autônoma ($50k benchmark)' },
  { token: 'answerWithLocalSemanticEngine', desc: 'Motor semântico local resiliente para zero crashes' }
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

// 2. Testes de Extração Autônoma da Web em Tempo Real
console.log('\n--- EXECUTANDO TESTES DINÂMICOS DE CONECTIVIDADE WEB AO VIVO ---');

async function testGitHubLiveExtraction() {
  console.log('\n👉 Teste 1: Acesso ao vivo ao GitHub para o repositório "sindresorhus/awesome":');
  const t0 = Date.now();
  const url = 'https://github.com/sindresorhus/awesome';
  const ghMatch = url.match(/github\.com\/([^\/\s]+)\/([^\/\?\s#]+)/i);
  if (!ghMatch) throw new Error('Falha no regex de URL do GitHub');

  const owner = ghMatch[1];
  const repo = ghMatch[2].replace(/\.git$/i, '');
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { 'User-Agent': 'Nexus-Claw-Audit/3.0' }
  });

  if (!res.ok) {
    throw new Error(`GitHub API retornou status HTTP ${res.status}`);
  }

  const data = await res.json();
  const elapsed = Date.now() - t0;
  console.log(`✅ Teste 1 Concluído em ${elapsed}ms!`);
  console.log(`   Nome do Repositório: ${data.name}`);
  console.log(`   Estrelas no GitHub: ★ ${data.stargazers_count.toLocaleString()}`);
  console.log(`   Descrição Oficial: "${data.description.slice(0, 90)}..."`);
  console.log(`   Thumbnail OpenGraph Oficial: https://opengraph.githubassets.com/1/${owner}/${repo}`);

  if (data.stargazers_count < 100000) {
    throw new Error('Número de estrelas inesperado para sindresorhus/awesome');
  }
}

async function testYouTubeLiveExtraction() {
  console.log('\n👉 Teste 2: Acesso ao vivo ao YouTube oEmbed para vídeo canônico:');
  const t0 = Date.now();
  const videoUrl = 'https://www.youtube.com/watch?v=RTo2akdZ7Dc';
  const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`);

  if (!res.ok) {
    throw new Error(`YouTube oEmbed retornou status HTTP ${res.status}`);
  }

  const data = await res.json();
  const elapsed = Date.now() - t0;
  console.log(`✅ Teste 2 Concluído em ${elapsed}ms!`);
  console.log(`   Título Oficial do Vídeo: "${data.title}"`);
  console.log(`   Canal / Autor: "${data.author_name}"`);
  console.log(`   Thumbnail Oficial: https://img.youtube.com/vi/RTo2akdZ7Dc/hqdefault.jpg`);
}

async function testAutonomousSynthesisStandard() {
  console.log('\n👉 Teste 3: Validação da Síntese Editorial Autônoma ($50k standard):');
  
  // Extrair a função do HTML para validar execução real
  const synthMatch = html.match(/function synthesizeAutonomousEditorial[\s\S]*?\n\}/);
  if (!synthMatch) throw new Error('Função synthesizeAutonomousEditorial não encontrada no HTML');

  // Simular dados brutos extraídos do GitHub
  const baseData = {
    url: 'https://github.com/sindresorhus/awesome',
    title: 'awesome — Awesome lists about all kinds of interesting topics',
    kind: 'repositório',
    description: 'Awesome lists about all kinds of interesting topics curated by the global open source community.',
    segment: 'Desenvolvimento e Infra',
    tags: ['awesome', 'github', 'ia'],
    stars: 510000,
    thumbnail: 'https://opengraph.githubassets.com/1/sindresorhus/awesome'
  };

  // Avaliação funcional
  const evalSynth = new Function('url', 'baseData', 'extractYouTubeId', `${synthMatch[0]}; return synthesizeAutonomousEditorial(url, baseData);`);
  const synthResult = evalSynth(baseData.url, baseData, () => null);

  console.log(`✅ Teste 3 Concluído! Metadados gerados:`);
  console.log(`   ID: ${synthResult.id}`);
  console.log(`   Título: "${synthResult.title}"`);
  console.log(`   Entregável: "${synthResult.deliverable.slice(0, 80)}..."`);
  console.log(`   Exemplo Prático: "${synthResult.practicalExample.slice(0, 80)}..."`);
  console.log(`   Público-Alvo: "${synthResult.targetAudience}"`);
  console.log(`   Tags: ${JSON.stringify(synthResult.tags)}`);

  if (!synthResult.title.includes('—')) throw new Error('Título deve conter o separador de intenção "—"');
  if (synthResult.deliverable.length < 30) throw new Error('Entregável muito curto (< 30 chars)');
  if (synthResult.practicalExample.length < 30) throw new Error('Exemplo prático muito curto (< 30 chars)');
  if (!synthResult.tags.includes('IA')) throw new Error('Tag IA padronizada deve estar presente');
}

async function runAllTests() {
  await testGitHubLiveExtraction();
  await testYouTubeLiveExtraction();
  await testAutonomousSynthesisStandard();

  console.log('\n🎉 TODOS OS TESTES E2E E CONECTIVIDADE WEB FORAM APROVADOS COM 100% DE SUCESSO!');
}

runAllTests().catch(err => {
  console.error('\n❌ Falha nos testes de validação:', err);
  process.exit(1);
});
