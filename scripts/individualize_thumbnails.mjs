import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(__dirname, '../data/catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

console.log('--- INDIVIDUALIZANDO THUMBNAILS E IDENTIDADES VISUAIS (SINDRE SORHUS AWESOME STANDARD) ---');

function extractGitHubOwnerRepo(url = '') {
  const m = url.match(/github\.com\/([^\/]+)\/([^\/#\?]+)/);
  if (m) {
    return `${m[1]}/${m[2].replace(/\.git$/, '')}`;
  }
  return null;
}

function extractDomain(url = '') {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

let modifiedCount = 0;

for (const item of catalog.items) {
  const isVideo = item.kind === 'vídeo' || !!item.youtubeId;
  const isRepo = item.kind === 'repositório' || (item.url && item.url.includes('github.com/'));
  const ghSlug = extractGitHubOwnerRepo(item.url);
  const domain = extractDomain(item.url);

  // 1. Repositórios GitHub: usar OpenGraph card oficial do GitHub
  if (isRepo && ghSlug) {
    const ghOg = `https://opengraph.githubassets.com/1/${ghSlug}`;
    if (item.thumbnail !== ghOg) {
      item.thumbnail = ghOg;
      item.thumbnailSource = 'github-opengraph';
      modifiedCount++;
    }
  }
  // 2. Vídeos: usar thumbnail oficial do YouTube em alta resolução
  else if (isVideo) {
    const ytId = item.youtubeId || (item.url.match(/v=([\w-]{11})/) || [])[1];
    if (ytId) {
      item.youtubeId = ytId;
      item.thumbnail = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
      item.thumbnailSource = 'youtube-hq';
      modifiedCount++;
    }
  }
  // 3. Ferramentas Web e Diretórios: Usar Google Favicon 128px de alta resolução
  else if (domain && (item.kind === 'ferramenta' || item.kind === 'diretório' || item.kind === 'conhecimento')) {
    // Se o item tinha thumbnail do Unsplash repetida, trocar por favicon 128px oficial da marca
    if (item.thumbnail && item.thumbnail.includes('unsplash.com')) {
      item.thumbnail = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      item.thumbnailSource = 'domain-favicon-hd';
      modifiedCount++;
    }
  }
  // 4. Métricas de Negócio: Capa temática de precisão visual financeira
  else if (item.parentId === 'carrossel-metricas-instagram' || item.id.startsWith('metric-')) {
    item.thumbnail = `https://www.google.com/s2/favicons?domain=instagram.com&sz=128`;
    item.thumbnailSource = 'instagram-official';
    modifiedCount++;
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`Sucesso: ${modifiedCount} itens tiveram suas identidades visuais individualizadas.`);
