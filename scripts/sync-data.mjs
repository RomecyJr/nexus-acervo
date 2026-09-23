import fs from 'node:fs';
const file = new URL('../data/catalog.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const ids = new Set();
for (const item of data.items) {
  const required = ['id','title','kind','segment','url','description','tags','status'];
  for (const key of required) if (item[key] === undefined || item[key] === '') throw new Error(`${item.id || 'item'}: campo ${key} ausente`);
  if (ids.has(item.id)) throw new Error(`ID duplicado: ${item.id}`);
  ids.add(item.id);
  new URL(item.url);
}
const out = new URL('../data/catalog.js', import.meta.url);
const next = `window.NEXUS_CATALOG = ${JSON.stringify(data, null, 2)};\n`;
if (!fs.existsSync(out) || fs.readFileSync(out, 'utf8') !== next) fs.writeFileSync(out, next);
const htmlSrc = new URL('../nexus-acervo.html', import.meta.url);
const htmlIdx = new URL('../index.html', import.meta.url);
if (fs.existsSync(htmlSrc)) fs.copyFileSync(htmlSrc, htmlIdx);
console.log(`Catálogo sincronizado: ${data.items.length} itens.`);
