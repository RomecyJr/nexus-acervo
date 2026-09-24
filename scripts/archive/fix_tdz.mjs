import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix duplicate $ declaration (make the second one $$)
  content = content.replace(
    /const \$ = s => document\.querySelector\(s\);\s*\nconst \$ = s => \[\.\.\.document\.querySelectorAll\(s\)\];/,
    () => `const $ = s => document.querySelector(s);\nconst $$ = s => [...document.querySelectorAll(s)];`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Declaração de $$ corrigida em: ${file}`);
}
