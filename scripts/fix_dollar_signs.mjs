import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');

  // Corrige os seletores que precisam ser $$
  s = s.replaceAll("$('#readStatusGroup .status-toggle-btn')", "$$('#readStatusGroup .status-toggle-btn')");
  s = s.replaceAll("$('.nav-btn[data-read]')", "$$('.nav-btn[data-read]')");
  s = s.replaceAll("$('.nav-btn').forEach", "$$('.nav-btn').forEach");

  fs.writeFileSync(f, s, 'utf8');
  console.log(`Corrigido seletores $$ em: ${f}`);
}
