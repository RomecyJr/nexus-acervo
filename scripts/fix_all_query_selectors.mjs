import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');

  // Substitui qualquer $(qualquer_coisa).forEach por $$(qualquer_coisa).forEach
  s = s.replace(/([^\$])\$\(([^)]+)\)\.forEach/g, (match, p1, p2) => {
    return `${p1}\$\$(${p2}).forEach`;
  });

  fs.writeFileSync(f, s, 'utf8');
}

// Verificação
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const remaining = s.match(/[^\$]\$\([^)]*\)\.forEach/g);
  console.log(`Verificação em ${f}: ${remaining ? remaining.length : 0} ocorrências restantes.`);
}
