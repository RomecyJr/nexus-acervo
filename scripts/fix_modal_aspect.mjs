import fs from 'node:fs';

const filePath = new URL('../nexus-acervo.html', import.meta.url);
const indexPath = new URL('../index.html', import.meta.url);

let html = fs.readFileSync(filePath, 'utf8');

// Replace CSS
const oldCss = `.modal-media-wrap {
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

const newCss = `.modal-media-wrap {
  width: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.modal-media-wrap.has-video {
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid var(--border);
}

.modal-media-wrap.has-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}`;

// Replace JS
const oldJs = `  // VÍDEO: Player Embutido Responsivo Proporcional
  const ytId = item.youtubeId || extractYouTubeId(item.url);
  if (item.kind === 'vídeo' || ytId) {
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = \`
      <div class="modal-video-frame-container">
        <iframe src="https://www.youtube.com/embed/\${ytId}?autoplay=1&rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    \`;
  }
  // CARROSSEL: Slider de Imagens
  else if (item.kind === 'carrossel' && Array.isArray(item.slides) && item.slides.length) {
    mediaContainer.style.display = 'block';
    renderCarouselSlider(item.slides);
  }
  // REPOSITÓRIO / FERRAMENTA: Sem banner desnecessário
  else {
    mediaContainer.style.display = 'none';
    mediaContainer.innerHTML = '';
  }`;

const newJs = `  // VÍDEO: Player Embutido Responsivo Proporcional
  const ytId = item.youtubeId || extractYouTubeId(item.url);
  if (item.kind === 'vídeo' || ytId) {
    mediaContainer.className = 'modal-media-wrap has-video';
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = \`<iframe src="https://www.youtube.com/embed/\${ytId}?autoplay=1&rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>\`;
  }
  // CARROSSEL: Slider de Imagens
  else if (item.kind === 'carrossel' && Array.isArray(item.slides) && item.slides.length) {
    mediaContainer.className = 'modal-media-wrap';
    mediaContainer.style.display = 'block';
    renderCarouselSlider(item.slides);
  }
  // REPOSITÓRIO / FERRAMENTA: Sem banner desnecessário
  else {
    mediaContainer.className = 'modal-media-wrap';
    mediaContainer.style.display = 'none';
    mediaContainer.innerHTML = '';
  }`;

const isCrlf = html.includes('\r\n');
const norm = s => s.replace(/\r\n/g, '\n');

let normHtml = norm(html);
if (!normHtml.includes(norm(oldCss))) {
  console.error('oldCss not found');
  process.exit(1);
}
if (!normHtml.includes(norm(oldJs))) {
  console.error('oldJs not found');
  process.exit(1);
}

normHtml = normHtml.replace(norm(oldCss), norm(newCss));
normHtml = normHtml.replace(norm(oldJs), norm(newJs));

const finalHtml = isCrlf ? normHtml.replace(/\n/g, '\r\n') : normHtml;
fs.writeFileSync(filePath, finalHtml, 'utf8');
fs.writeFileSync(indexPath, finalHtml, 'utf8');

console.log('Successfully updated modal-media-wrap aspect ratio!');
