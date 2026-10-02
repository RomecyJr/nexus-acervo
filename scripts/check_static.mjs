// Checagens estáticas de regressão para nexus-acervo.html (sem dependências).
// Cada regra cobre um defeito real já encontrado no projeto:
//  1. $('sel').forEach  -> $ retorna um elemento; quebrou o DOMContentLoaded inteiro.
//  2. var(--x) sem definição para algum tema -> tema claro caía em Times New Roman.
//  3. ids duplicados no markup estático.
//  4. $('#id') apontando para id inexistente -> foco de modal em elemento fantasma.
//  5. cores semânticas hardcoded fora dos tokens -> quebra de contraste no tema claro.
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../nexus-acervo.html', import.meta.url), 'utf8');
const errors = [];
const lineOf = idx => html.slice(0, idx).split('\n').length;

const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');
const css = html.slice(styleStart, styleEnd);

// 1. Seletor único usado como lista
for (const m of html.matchAll(/(?<![\w$])\$\((['"`])[^'"`]*\1\)\s*\.forEach/g)) {
  errors.push(`L${lineOf(m.index)}: $(...).forEach — use $$(...) (retorna array)`);
}

// 2. Custom properties: definidas globalmente, por tema, ou localmente em regras
const block = sel => {
  const i = css.indexOf(sel);
  if (i < 0) return '';
  return css.slice(i, css.indexOf('}', i));
};
const defsIn = text => new Set([...text.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
const rootDefs = new Set();
for (const m of css.matchAll(/:root\s*\{([^}]*)\}/g)) for (const d of defsIn(m[1])) rootDefs.add(d);
const darkDefs = defsIn(block(':root[data-theme="dark"]'));
const lightDefs = defsIn(block(':root[data-theme="light"]'));
const allDefs = defsIn(html); // inclui regras locais (ex.: .cols-2 { --ui-cols })

for (const m of html.matchAll(/var\((--[\w-]+)\s*(,)?/g)) {
  const name = m[1];
  if (m[2]) continue; // tem fallback
  if (rootDefs.has(name)) continue;
  const inDark = darkDefs.has(name), inLight = lightDefs.has(name);
  if (inDark && inLight) continue;
  if (inDark !== inLight) {
    errors.push(`L${lineOf(m.index)}: ${name} só existe no tema ${inDark ? 'escuro' : 'claro'}`);
  } else if (!allDefs.has(name)) {
    errors.push(`L${lineOf(m.index)}: ${name} não está definida`);
  }
}

// 3. ids duplicados no markup estático (fora de <script>)
const markup = html.replace(/<script[\s\S]*?<\/script>/g, s => ' '.repeat(s.length));
const ids = new Map();
for (const m of markup.matchAll(/\sid="([^"$]+)"/g)) {
  if (ids.has(m[1])) errors.push(`L${lineOf(m.index)}: id duplicado "${m[1]}" (primeiro em L${ids.get(m[1])})`);
  else ids.set(m[1], lineOf(m.index));
}

// 4. Referências a ids que não existem em lugar nenhum do arquivo
const knownIds = new Set([...html.matchAll(/\bid=["'`]([\w-]+)["'`]/g)].map(m => m[1]));
for (const m of html.matchAll(/\.id\s*=\s*['"]([\w-]+)['"]/g)) knownIds.add(m[1]);
for (const m of html.matchAll(/(?:\$|getElementById|querySelector)\(\s*['"]#?([\w-]+)['"]/g)) {
  const raw = html.slice(m.index, m.index + m[0].length);
  const isIdSelector = raw.includes('getElementById') || raw.includes("'#") || raw.includes('"#');
  if (isIdSelector && !knownIds.has(m[1])) errors.push(`L${lineOf(m.index)}: referência a #${m[1]}, que não existe`);
}

// 5. Paleta semântica hardcoded fora dos blocos de token (atributos SVG são permitidos)
const tokenEnd = css.indexOf('}', css.indexOf(':root[data-theme="light"]')) + styleStart;
const palette = /#(10b981|059669|34d399|3b82f6|60a5fa|ef4444|f87171|38bdf8|f59e0b|fbbf24)\b/gi;
for (const m of html.matchAll(palette)) {
  if (m.index < tokenEnd) continue;
  const before = html.slice(Math.max(0, m.index - 14), m.index);
  if (/(stroke|fill|stop-color)="$/.test(before)) continue;
  errors.push(`L${lineOf(m.index)}: cor ${m[0]} hardcoded — use var(--success|--info|--danger|--warning|--ai)`);
}

if (errors.length) {
  console.error(`Checagem estática: ${errors.length} problema(s)`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log('Checagem estática aprovada: seletores, tokens por tema, ids e paleta.');
