import fs from 'node:fs';

const filePath = new URL('../nexus-acervo.html', import.meta.url);
const indexPath = new URL('../index.html', import.meta.url);

let html = fs.readFileSync(filePath, 'utf8');

const oldVideoCss = `/* CARD TIPO: VÍDEO (HORIZONTAL COMPACTO COM THUMBNAIL REAL) */
.card-video {
  display: grid;
  grid-template-columns: 160px 1fr;
}

.card-video-media {
  position: relative;
  background: #000;
  aspect-ratio: 16 / 9;
  height: 100%;
  min-height: 110px;
  overflow: hidden;
  border-right: 1px solid var(--border);
}`;

const newVideoCss = `/* CARD TIPO: VÍDEO (HORIZONTAL COMPACTO COM THUMBNAIL REAL ESTILO SIDEBAR YOUTUBE) */
.card-video {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.15rem;
  padding: 1.15rem 1.25rem;
}

.card-video-media {
  position: relative;
  width: 154px;
  min-width: 154px;
  max-width: 154px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: #000;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.card-video .card-inner-content {
  padding: 0;
  flex: 1;
  min-width: 0;
}`;

const oldCarouselCss = `/* CARD TIPO: CARROSSEL (INSTAGRAM / REDES) */
.card-carousel {
  display: grid;
  grid-template-columns: 120px 1fr;
}

.carousel-cover-col {
  position: relative;
  background: var(--surface2);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-right: 1px solid var(--border);
}`;

const newCarouselCss = `/* CARD TIPO: CARROSSEL (INSTAGRAM / REDES) */
.card-carousel {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.15rem;
  padding: 1.15rem 1.25rem;
}

.carousel-cover-col {
  position: relative;
  width: 104px;
  min-width: 104px;
  max-width: 104px;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface2);
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.card-carousel .card-inner-content {
  padding: 0;
  flex: 1;
  min-width: 0;
}`;

const oldMediaCss = `  .card-video { grid-template-columns: 1fr; }
  .card-carousel { grid-template-columns: 1fr; }
  .card-video-media { aspect-ratio: 16 / 9; }`;

const newMediaCss = `  .card-video, .card-carousel { flex-direction: column; }
  .card-video-media { width: 100%; min-width: 100%; max-width: 100%; }
  .carousel-cover-col { width: 100%; min-width: 100%; max-width: 100%; }`;

const isCrlf = html.includes('\r\n');
const norm = str => str.replace(/\r\n/g, '\n');

let normHtml = norm(html);
if (!normHtml.includes(norm(oldVideoCss))) {
  console.error('Video CSS not found!');
  process.exit(1);
}

normHtml = normHtml.replace(norm(oldVideoCss), norm(newVideoCss));
normHtml = normHtml.replace(norm(oldCarouselCss), norm(newCarouselCss));
normHtml = normHtml.replace(norm(oldMediaCss), norm(newMediaCss));

const finalHtml = isCrlf ? normHtml.replace(/\n/g, '\r\n') : normHtml;
fs.writeFileSync(filePath, finalHtml, 'utf8');
fs.writeFileSync(indexPath, finalHtml, 'utf8');

console.log('Styles successfully updated in nexus-acervo.html and index.html!');
