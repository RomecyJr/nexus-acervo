import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(__dirname, '../data/catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

console.log('--- EXECUTANDO LINTER EDITORIAL RIGOROSO (REGRAS DE OURO) ---');

const errors = [];
const warnings = [];
const seenUrls = new Map();
const seenIds = new Set();
const thumbCounts = new Map();

for (const item of catalog.items) {
  // 1. ID estável e sem prefixo custom temporário
  if (seenIds.has(item.id)) errors.push(`[${item.id}] ID duplicado detectado.`);
  seenIds.add(item.id);

  if (item.id.startsWith('custom-')) {
    errors.push(`[${item.id}] ID não pode começar com 'custom-'. Adote um slug editorial legível.`);
  }

  // 2. Termos proibidos e marcadores de rascunho
  if (item.title && item.title.trim().toLowerCase() === 'teste') {
    errors.push(`[${item.id}] Título não pode ser 'teste'.`);
  }
  if (item.segment && item.segment.toLowerCase().includes('teste')) {
    errors.push(`[${item.id}] Segmento não pode conter 'teste': '${item.segment}'.`);
  }
  if (item.description && item.description.trim().toLowerCase() === 'teste') {
    errors.push(`[${item.id}] Descrição não pode ser 'teste'.`);
  }
  const rawFields = [item.title, item.description, item.deliverable, item.practicalExample, item.targetAudience, item.segment].join(' ').toLowerCase();
  if (rawFields.includes('undefined') || rawFields.includes('null')) {
    errors.push(`[${item.id}] Contém marcador inválido ('undefined'/'null').`);
  }
  if (item.targetAudience && item.targetAudience.toLowerCase().trim() === 'qualquer pessoa') {
    errors.push(`[${item.id}] Público-alvo genérico ('Qualquer pessoa'). Especifique a persona real.`);
  }

  // 3. Grafia correta de IA
  if (/\bI\.A\b/.test(item.title) || /\bI\.A\b/.test(item.description)) {
    errors.push(`[${item.id}] Grafia incorreta 'I.A'. Utilize 'IA'.`);
  }
  if (item.tags && item.tags.includes('I.A')) {
    errors.push(`[${item.id}] Tag incorreta 'I.A'. Utilize 'IA'.`);
  }

  // 4. Comprimentos mínimos editoriais
  if (!item.title || item.title.trim().length < 5) {
    errors.push(`[${item.id}] Título muito curto (< 5 caracteres).`);
  }
  if (!item.description || item.description.trim().length < 50) {
    errors.push(`[${item.id}] Descrição muito curta (< 50 caracteres): ${item.description?.length || 0} chars.`);
  }
  if (item.deliverable && item.deliverable.trim().length < 30) {
    errors.push(`[${item.id}] Entregável muito curto (< 30 caracteres).`);
  }
  if (item.practicalExample && item.practicalExample.trim().length < 30) {
    errors.push(`[${item.id}] Exemplo prático muito curto (< 30 caracteres).`);
  }
  if (!item.tags || item.tags.length < 2) {
    errors.push(`[${item.id}] Exige no mínimo 2 tags editoriais de busca (possui ${item.tags?.length || 0}).`);
  }

  // 5. Verificação de URLs e duplicatas não mapeadas
  try {
    const parsed = new URL(item.url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      errors.push(`[${item.id}] URL deve usar protocolo HTTP ou HTTPS.`);
    }
    // Para YouTube, a chave única é a query string ?v=
    let uniqueKey = parsed.origin + parsed.pathname;
    if (parsed.searchParams.has('v')) {
      uniqueKey += '?v=' + parsed.searchParams.get('v');
    }
    if (seenUrls.has(uniqueKey)) {
      const prevId = seenUrls.get(uniqueKey);
      if (!item.parentId && !item.relations && !item.url.includes('instagram.com') && !item.url.includes('cssbuy.com')) {
        warnings.push(`[${item.id}] Compartilha URL com [${prevId}] sem declarar 'relation' ou 'parentId'.`);
      }
    } else {
      seenUrls.set(uniqueKey, item.id);
    }
  } catch (err) {
    errors.push(`[${item.id}] URL inválida: ${item.url}`);
  }

  // 6. Rastreamento de repetição de thumbnails
  if (item.thumbnail) {
    thumbCounts.set(item.thumbnail, (thumbCounts.get(item.thumbnail) || 0) + 1);
  }
}

// 7. Auditoria de repetições excessivas de imagem
for (const [thumb, count] of thumbCounts.entries()) {
  if (count > 10) {
    warnings.push(`Thumbnail repetida em ${count} itens: ${thumb.slice(0, 80)}... (Recomenda-se individualização)`);
  }
}

if (warnings.length > 0) {
  console.log(`\n⚠️  Avisos editoriais (${warnings.length}):`);
  warnings.forEach(w => console.log('   ' + w));
}

if (errors.length > 0) {
  console.error(`\n❌ Falhas editoriais detectadas (${errors.length}):`);
  errors.forEach(e => console.error('   ' + e));
  process.exit(1);
}

console.log(`\n✅ Linter Editorial Aprovado com Louvor! Todos os ${catalog.items.length} itens cumprem os critérios de excelência.`);
