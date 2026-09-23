import fs from 'node:fs';

const filePath = new URL('../nexus-acervo.html', import.meta.url);
const indexPath = new URL('../index.html', import.meta.url);

let html = fs.readFileSync(filePath, 'utf8');

const target = `  $('#detailModal').classList.add('open');
  lucide.createIcons();`;

const replace = `  $('#detailModal').classList.add('open');
  const dialog = document.querySelector('.modal-dialog');
  if (dialog) dialog.scrollTop = 0;
  lucide.createIcons();`;

if (!html.includes(target)) {
  console.error('Target string not found in nexus-acervo.html');
  process.exit(1);
}

html = html.replace(target, replace);
fs.writeFileSync(filePath, html, 'utf8');
fs.writeFileSync(indexPath, html, 'utf8');
console.log('ScrollTop reset added successfully!');
