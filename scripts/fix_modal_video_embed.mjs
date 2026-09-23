import fs from 'node:fs';

const filePath = new URL('../nexus-acervo.html', import.meta.url);
const indexPath = new URL('../index.html', import.meta.url);

let html = fs.readFileSync(filePath, 'utf8');

// 1. Update CSS
const oldCss = `.modal-media-wrap {
  width: 100%;
  background: #000;
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.modal-media-wrap iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  display: block;
}`;

const newCss = `.modal-media-wrap {
  width: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
}

.modal-video-frame-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
  background: #000;
  border-bottom: 1px solid var(--border);
}

.modal-video-frame-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}`;

// 2. Update JS in openDetailModal
const oldJs = `  // VÍDEO: Player Embutido
  const ytId = item.youtubeId || extractYouTubeId(item.url);
  if (item.kind === 'vídeo' || ytId) {
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = \`<iframe src="https://www.youtube.com/embed/\${ytId}?autoplay=1&rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>\`;
  }`;

const newJs = `  // VÍDEO: Player Embutido Responsivo Proporcional
  const ytId = item.youtubeId || extractYouTubeId(item.url);
  if (item.kind === 'vídeo' || ytId) {
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = \`
      <div class="modal-video-frame-container">
        <iframe src="https://www.youtube.com/embed/\${ytId}?autoplay=1&rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    \`;
  }`;

const norm = s => s.replace(/\r\n/g, '\n');
const isCrlf = html.includes('\r\n');

let normHtml = norm(html);
if (!normHtml.includes(norm(oldCss))) {
  console.error('CSS not found');
  process.exit(1);
}

normHtml = normHtml.replace(norm(oldCss), norm(newCss));
normHtml = normHtml.replace(norm(oldJs), norm(newJs));

const finalHtml = isCrlf ? normHtml.replace(/\n/g, '\r\n') : normHtml;
fs.writeFileSync(filePath, finalHtml, 'utf8');
fs.writeFileSync(indexPath, finalHtml, 'utf8');

console.log('Modal video embed updated to responsive container!');
