import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');

  // 1. Inserir #btnModalToggleSeen ao lado de #btnModalFav se não existir
  if (!s.includes('id="btnModalToggleSeen"')) {
    const favTarget = '<button class="btn" id="btnModalFav" style="flex-shrink: 0;"><i data-lucide="star"></i> Salvar</button>';
    const seenBtn = `<button class="btn secondary sm" id="btnModalToggleSeen" style="flex-shrink: 0;" aria-label="Marcar como visto"><i data-lucide="circle"></i> Marcar Visto</button>\n        `;
    s = s.replace(favTarget, seenBtn + favTarget);
  }

  // 2. Tornar o binding seguro com optional chaining ou verificação if
  s = s.replace(
    "$('#btnModalToggleSeen').onclick = () => {",
    "$('#btnModalToggleSeen')?.addEventListener('click', () => {"
  );

  fs.writeFileSync(f, s, 'utf8');
  console.log(`Corrigido #btnModalToggleSeen em: ${f}`);
}
