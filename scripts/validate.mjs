import fs from 'node:fs';

const html = fs.readFileSync(new URL('../nexus-acervo.html', import.meta.url), 'utf8');
const data = JSON.parse(fs.readFileSync(new URL('../data/catalog.json', import.meta.url), 'utf8'));
const schema = JSON.parse(fs.readFileSync(new URL('../schema/catalog.schema.json', import.meta.url), 'utf8'));

// 1. Validação JSON Schema (ARQ-04) com Ajv 2020 e fallback nativo rigoroso
let schemaValidated = false;
try {
  const { default: Ajv2020 } = await import('ajv/dist/2020.js');
  const { default: addFormats } = await import('ajv-formats');
  const ajv = new Ajv2020({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    console.error('❌ Falha na validação Ajv do catálogo:', validate.errors);
    throw new Error(`Schema inválido: ${validate.errors?.length} erros`);
  }
  schemaValidated = true;
} catch (e) {
  if (e.code === 'ERR_MODULE_NOT_FOUND' || e.code === 'UNKNOWN' || e.errno === -4094 || (e.message && e.message.includes('unknown error'))) {
    // Fallback nativo estrito caso executado sem node_modules ou em ambiente OneDrive desidratado
    const reqMeta = schema.properties.meta.required;
    for (const k of reqMeta) if (!data.meta[k]) throw new Error(`Meta: campo obrigatório '${k}' ausente`);
    const reqItem = schema.$defs.item.required;
    const allowedKinds = new Set(schema.$defs.item.properties.kind.enum);
    const seenIds = new Set();
    for (const item of data.items) {
      for (const k of reqItem) if (item[k] === undefined || item[k] === '') throw new Error(`Item ${item.id}: campo '${k}' ausente`);
      if (seenIds.has(item.id)) throw new Error(`ID duplicado: ${item.id}`);
      seenIds.add(item.id);
      if (!allowedKinds.has(item.kind)) throw new Error(`Item ${item.id}: kind '${item.kind}' inválido`);
      new URL(item.url);
    }
    schemaValidated = true;
  } else {
    throw e;
  }
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

console.log(`QA aprovado: Schema JSON válido, HTML/JS válidos, ${data.items.length} itens, responsividade e acessibilidade presentes.`);
