import fs from 'node:fs';

console.log('🚀 Aplicando refinamentos da Fase 3 (Acessibilidade WCAG 2.2 AA, Performance e Limpeza)...');

const file = 'nexus-acervo.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Font Optimization (P-3): Remove Caveat e Dancing Script do carregamento inicial crítico
content = content.replace(
  '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&family=Dancing+Script:wght@600;700&display=swap" rel="stylesheet">',
  '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
);

// Injeção de carregamento sob demanda para fontes cursivas ao abrir Documenso Studio
if (!content.includes('font-cursive-documenso')) {
  const dynamicFontCode = `  // Carregamento sob demanda de fontes caligráficas (P-3)
  if (!document.getElementById('font-cursive-documenso')) {
    const fl = document.createElement('link');
    fl.id = 'font-cursive-documenso';
    fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Dancing+Script:wght@600;700&display=swap';
    document.head.appendChild(fl);
  }`;
  content = content.replace('function initDocumensoStudio() {', `function initDocumensoStudio() {\n${dynamicFontCode}`);
}

// 2. Acessibilidade WCAG 2.2 AA: :focus-visible (A11Y-03)
if (!content.includes(':focus-visible')) {
  const focusVisibleStyle = `
/* --- ACESSIBILIDADE WCAG 2.2 AA: FOCUS VISIBLE (A11Y-03) --- */
*:focus-visible {
  outline: 2px solid #10b981 !important;
  outline-offset: 2px !important;
}
button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, [tabindex="0"]:focus-visible {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.35) !important;
}
`;
  content = content.replace('/* --- DESIGN TOKENS SHADCN/UI', `${focusVisibleStyle}\n/* --- DESIGN TOKENS SHADCN/UI`);
}

// 3. Jargões e Títulos Limpos (ARQ-08)
content = content.replace('<title>Nexus Acervo · Segundo Cérebro de Elite</title>', '<title>Nexus Acervo · Segundo Cérebro Profissional</title>');
content = content.replace('<p class="brand-subtitle">Segundo Cérebro de Elite</p>', '<p class="brand-subtitle">Segundo Cérebro de Referência</p>');
content = content.replace(/\*Exportado via Nexus Acervo · Segundo Cérebro de Elite\*/g, '*Exportado via Nexus Acervo · Segundo Cérebro Profissional*');
content = content.replace('SUPREME DESIGN SYSTEM & BRAND TOKENS ($50K TIER)', 'NEXUS DESIGN SYSTEM & BRAND TOKENS');
content = content.replace('/* Modals Supreme Styling */', '/* Modais do Sistema */');
content = content.replace('// SEGUNDO CÉREBRO: SISTEMA DE ANOTAÇÕES, EXPORTAÇÃO E COFRE SUPREME', '// SEGUNDO CÉREBRO: SISTEMA DE ANOTAÇÕES, EXPORTAÇÃO E COFRE PESSOAL');

// 4. A11y e Navegação por Teclado nos Cards (A11Y-04)
// Torna os cards acionáveis por teclado com Enter/Espaço
content = content.replace(
  '<div class="card" data-id="${item.id}"',
  '<div class="card" data-id="${item.id}" tabindex="0" role="article" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openDetailModal(\'${item.id}\');}"'
);

// 5. Lazy Loading nas Imagens (P-4)
content = content.replace(
  /<img src="\${thumb}" alt="\${esc\(item\.title\)}" class="card-thumb" \/>/g,
  '<img src="${thumb}" alt="${esc(item.title)}" class="card-thumb" loading="lazy" decoding="async" />'
);

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Refinamentos da Fase 3 aplicados com sucesso em nexus-acervo.html!');
