import fs from 'node:fs';
const html=fs.readFileSync(new URL('../nexus-acervo.html',import.meta.url),'utf8');
const data=JSON.parse(fs.readFileSync(new URL('../data/catalog.json',import.meta.url),'utf8'));
const scripts = html.match(/<script[\s\S]*?<\/script>/g) || [];
const lastScriptTag = [...scripts].reverse().find(s => !/^<script[^>]*src=/i.test(s) && !s.includes('id="theme-anti-flash"'));
const js = lastScriptTag ? lastScriptTag.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '') : null;
if(!js) throw new Error('JavaScript inline não encontrado');
new Function(js);
if(new Set(data.items.map(x=>x.id)).size!==data.items.length) throw new Error('IDs duplicados');
for(const x of data.items){new URL(x.url);if(!x.title||!x.kind||!x.segment)throw new Error(`Item inválido: ${x.id}`)}
for(const token of ['data-theme="dark"','@media(max-width:767px)','aria-label','prefers-reduced-motion'])if(!html.includes(token))throw new Error(`Requisito ausente: ${token}`);
console.log(`QA aprovado: HTML/JS válidos, ${data.items.length} itens, responsividade e acessibilidade presentes.`);
