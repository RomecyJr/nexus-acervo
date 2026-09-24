import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const html = fs.readFileSync(new URL('../nexus-acervo.html', import.meta.url), 'utf8');
const data = JSON.parse(fs.readFileSync(new URL('../data/catalog.json', import.meta.url), 'utf8'));
const schema = JSON.parse(fs.readFileSync(new URL('../schema/catalog.schema.json', import.meta.url), 'utf8'));

// 1. Validação JSON Schema com Ajv Draft 2020-12 (ARQ-04)
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const valid = validate(data);
if (!valid) {
  console.error('❌ Falha na validação do schema do catálogo:', validate.errors);
  throw new Error(`Schema inválido: ${validate.errors?.length} erros encontrados`);
}

// 2. Validação do JavaScript da Aplicação
const scripts = html.match(/<script[\s\S]*?<\/script>/g) || [];
const lastScriptTag = [...scripts].reverse().find(s => !/^<script[^>]*src=/i.test(s) && !s.includes('id="theme-anti-flash"'));
const js = lastScriptTag ? lastScriptTag.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '') : null;
if (!js) throw new Error('JavaScript inline não encontrado');
new Function(js);

// 3. Regras de Acessibilidade e Integridade
for (const token of ['data-theme="dark"', '@media(max-width:767px)', 'aria-label', 'prefers-reduced-motion']) {
  if (!html.includes(token)) throw new Error(`Requisito ausente: ${token}`);
}

console.log(`QA aprovado: Schema JSON válido (Ajv), HTML/JS válidos, ${data.items.length} itens, responsividade e acessibilidade presentes.`);
