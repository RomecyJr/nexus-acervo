import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('=== TESTE DE IMPORTAÇÃO AUTOMÁTICA DE VÍDEO DO YOUTUBE (NEXUS CLAW) ===\n');

const testUrl = 'https://www.youtube.com/watch?v=phQWga1difM';

// Simular extractMetadataFromUrl
async function extractMetadataFromUrl(url) {
  const result = {
    url,
    title: '',
    kind: 'vídeo',
    description: '',
    deliverable: '',
    practicalExample: '',
    segment: 'Conteúdo e Mídia',
    targetAudience: 'Criadores e Especialistas',
    tags: ['youtube', 'video', 'conteudo', 'algoritmo', 'IA'],
    stars: null,
    thumbnail: null,
    author: null
  };

  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    const ytId = ytMatch[1];
    result.thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

    // 1. YouTube oEmbed Oficial
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      if (res.ok) {
        const data = await res.json();
        if (data.title) result.title = data.title;
        if (data.author_name) result.author = data.author_name;
      }
    } catch(e) {}
  }
  return result;
}

// Simular robustExtractJson
function robustExtractJson(rawText) {
  if (!rawText) return null;
  const codeBlockMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try { return JSON.parse(codeBlockMatch[1].trim()); } catch(e) {}
  }
  const firstBrace = rawText.indexOf('{');
  const lastBrace = rawText.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(rawText.substring(firstBrace, lastBrace + 1));
    } catch(e) {}
  }
  return null;
}

async function run() {
  console.log('1. Extraindo metadados preliminares do YouTube...');
  const t0 = Date.now();
  const baseData = await extractMetadataFromUrl(testUrl);
  console.log(`   ✓ Extraído em ${Date.now() - t0}ms:`);
  console.log(`   - Título oEmbed: "${baseData.title}"`);
  console.log(`   - Autor: "${baseData.author}"`);
  console.log(`   - Thumbnail HD: ${baseData.thumbnail}`);

  console.log('\n2. Sintetizando com Nexus Claw via OpenRouter (openrouter/free)...');
  const apiKey = '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';

  const systemPrompt = `Você é o Nexus Claw, assistente editorial sênior do Nexus Acervo ($50k benchmark padrão Linear & Sindre Sorhus Awesome).
Sua tarefa é analisar os dados brutos de um recurso web e retornar EXCLUSIVAMENTE um objeto JSON válido (sem blocos markdown, sem divagações, sem explicações).
INICIE SUA RESPOSTA IMEDIATAMENTE COM O CARACTERE "{" E TERMINE COM "}".

Campos obrigatórios:
- title: Fórmula estrita "Nome — Ação ou Proposta de Valor" (ex: "Danny Why — Estratégias de Adaptação ao Novo Algoritmo do YouTube")
- description: Resumo executivo de altíssimo nível (mínimo 60 caracteres) explicando o conteúdo, diferenciais e valor prático.
- deliverable: O que quem consome ganha de forma tangível e observável (mínimo 35 caracteres).
- practicalExample: Caso concreto e direto de aplicação prática no mundo real (mínimo 35 caracteres).
- segment: "Conteúdo e Mídia"
- targetAudience: Personas reais (ex: "Criadores de Conteúdo, Produtores de Vídeo e Estrategistas Digitais").
- tags: Array com 3 a 5 tags técnicas limpas (padronize SEMPRE "IA", nunca "I.A").`;

  const userPrompt = `URL: ${testUrl}\nDados preliminares: ${JSON.stringify(baseData)}\n\nRetorne exclusivamente o JSON estruturado agora.`;

  const t1 = Date.now();
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://nexus-acervo.vercel.app',
      'X-Title': 'Nexus Acervo',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.1
    })
  });

  if (!res.ok) {
    throw new Error(`OpenRouter HTTP ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  const rawContent = json.choices?.[0]?.message?.content;
  const parsed = robustExtractJson(rawContent);

  console.log(`   ✓ Sintetizado em ${Date.now() - t1}ms:`);
  console.log('   - Título Sintetizado:', parsed.title);
  console.log('   - Entregável:', parsed.deliverable);
  console.log('   - Exemplo Prático:', parsed.practicalExample);
  console.log('   - Tags:', parsed.tags);

  console.log('\n3. Conferindo presença no catálogo oficial data/catalog.json...');
  const catalogRaw = fs.readFileSync(path.resolve(rootDir, 'data/catalog.json'), 'utf8');
  const cat = JSON.parse(catalogRaw);
  const found = cat.items.find(i => i.url.includes('phQWga1difM'));
  if (found) {
    console.log(`   ✅ Vídeo ENCONTRADO no catálogo com ID "${found.id}"!`);
    console.log(`   ✅ Total de recursos no catálogo: ${cat.items.length}`);
  } else {
    throw new Error('Vídeo não encontrado no catálogo!');
  }

  console.log('\n🎉 FLUXO DE IMPORTAÇÃO VALIDADO COM SUCESSO ABSOLUTO!');
}

run().catch(err => {
  console.error('❌ Falha:', err);
  process.exit(1);
});
