import fs from 'node:fs';

const filePath = new URL('../nexus-acervo.html', import.meta.url);
const indexPath = new URL('../index.html', import.meta.url);

let html = fs.readFileSync(filePath, 'utf8');

const headPrefix = `<!doctype html>
<html lang="pt-BR" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Nexus Acervo - Segundo Cérebro pessoal contemporâneo de ferramentas, repositórios, vídeos e carrosséis com exemplos práticos.">
<title>Nexus Acervo · Segundo Cérebro de Elite</title>
<!-- Google Fonts: Plus Jakarta Sans + JetBrains Mono -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js" defer></script>
<script src="./data/catalog.js?v=1.4.0"></script>
<style>
`;

if (!html.startsWith('<!doctype html>')) {
  html = headPrefix + html;
}

// Ensure the closing </style></head><body> is present
if (!html.includes('</style>\n</head>\n<body>') && !html.includes('</style></head><body>')) {
  // Let's check where <div class="app"> starts
  const appIndex = html.indexOf('<div class="app">');
  if (appIndex !== -1 && !html.substring(0, appIndex).includes('</head>')) {
    const beforeApp = html.substring(0, appIndex);
    const afterApp = html.substring(appIndex);
    html = beforeApp + '</head>\n<body>\n' + afterApp;
  }
}

fs.writeFileSync(filePath, html, 'utf8');
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Fixed missing HTML head!');
