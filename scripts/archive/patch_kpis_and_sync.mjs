import fs from 'node:fs';

const htmlFile = new URL('../nexus-acervo.html', import.meta.url);
let html = fs.readFileSync(htmlFile, 'utf8');

// 1. Corrigir syncFilterControls com $$
const oldSyncFilter = `function syncFilterControls() {
  $('#categoryTabs .segment-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $('.nav-btn[data-kind]').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $('#readStatusGroup .status-toggle-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.read === state.readFilter);
  });
  $('.nav-btn[data-read]').forEach(b => {
    b.classList.toggle('active', b.dataset.read === state.readFilter);
  });
  $('#segmentChipsContainer .filter-chip-item').forEach(b => {
    b.classList.toggle('active', b.dataset.segment === state.segment);
  });
  $('.segment-row').forEach(row => {
    row.classList.toggle('active', row.dataset.segment === state.segment);
  });
}`;

const newSyncFilter = `function syncFilterControls() {
  $$('#categoryTabs .segment-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('.nav-btn[data-kind]').forEach(b => {
    b.classList.toggle('active', b.dataset.kind === state.kind);
  });
  $$('#readStatusGroup .status-toggle-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.read === state.readFilter);
  });
  $$('.nav-btn[data-read]').forEach(b => {
    b.classList.toggle('active', b.dataset.read === state.readFilter);
  });
  $$('#segmentChipsContainer .filter-chip-item').forEach(b => {
    b.classList.toggle('active', b.dataset.segment === state.segment);
  });
  $$('.segment-row').forEach(row => {
    row.classList.toggle('active', row.dataset.segment === state.segment);
  });
}`;

html = html.replace(oldSyncFilter, () => newSyncFilter);

// 2. Corrigir updateKpis para calcular sobre itens ativos e setar contadores de lixeira
const oldUpdateKpisBlock = `function updateKpis() {
  const all = state.items;
  if ($('#kpiTotal')) $('#kpiTotal').textContent = all.length;
  if ($('#kpiVideos')) $('#kpiVideos').textContent = all.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#kpiRepos')) $('#kpiRepos').textContent = all.filter(x => x.kind === 'repositório').length;
  if ($('#kpiCarousels')) $('#kpiCarousels').textContent = all.filter(x => x.kind === 'carrossel').length;
  if ($('#kpiFavs')) $('#kpiFavs').textContent = storedFavorites.size;

  const seenCount = all.filter(x => storedSeen.has(x.id)).length;
  const unseenCount = all.length - seenCount;
  if ($('#kpiSeen')) $('#kpiSeen').textContent = seenCount;
  if ($('#countSeen')) $('#countSeen').textContent = seenCount;
  if ($('#countUnseen')) $('#countUnseen').textContent = unseenCount;
  if ($('#statusCountAll')) $('#statusCountAll').textContent = all.length;
  if ($('#statusCountUnseen')) $('#statusCountUnseen').textContent = unseenCount;
  if ($('#statusCountSeen')) $('#statusCountSeen').textContent = seenCount;

  if ($('#countAll')) $('#countAll').textContent = all.length;
  if ($('#countVideo')) $('#countVideo').textContent = all.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#countRepo')) $('#countRepo').textContent = all.filter(x => x.kind === 'repositório').length;
  if ($('#countCarousel')) $('#countCarousel').textContent = all.filter(x => x.kind === 'carrossel').length;
  if ($('#countTool')) $('#countTool').textContent = all.filter(x => x.kind === 'ferramenta').length;
  if ($('#countDoc')) $('#countDoc').textContent = all.filter(x => x.kind === 'conhecimento' || x.kind === 'diretório').length;
  if ($('#countFav')) $('#countFav').textContent = storedFavorites.size;

  renderSegmentList();
  renderSegmentChips();

  // Popula datalist de segmentos (BUG-10)
  const segmentDl = $('#segmentDatalist');
  if (segmentDl) {
    const uniqueSegs = Array.from(new Set(state.items.map(x => x.segment).filter(Boolean)));
    segmentDl.innerHTML = uniqueSegs.map(s => \`<option value="\${s}">\`).join('');
  }
  renderQueuePreview();
}`;

const newUpdateKpisBlock = `function updateKpis() {
  const active = state.items.filter(x => !storedDeleted.has(x.id));
  const deletedCount = state.items.filter(x => storedDeleted.has(x.id)).length;

  if ($('#kpiTotal')) $('#kpiTotal').textContent = active.length;
  if ($('#kpiVideos')) $('#kpiVideos').textContent = active.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#kpiRepos')) $('#kpiRepos').textContent = active.filter(x => x.kind === 'repositório').length;
  if ($('#kpiCarousels')) $('#kpiCarousels').textContent = active.filter(x => x.kind === 'carrossel').length;
  if ($('#kpiFavs')) $('#kpiFavs').textContent = active.filter(x => storedFavorites.has(x.id)).length;

  const seenCount = active.filter(x => storedSeen.has(x.id)).length;
  const unseenCount = active.length - seenCount;
  if ($('#kpiSeen')) $('#kpiSeen').textContent = seenCount;
  if ($('#countSeen')) $('#countSeen').textContent = seenCount;
  if ($('#countUnseen')) $('#countUnseen').textContent = unseenCount;
  if ($('#statusCountAll')) $('#statusCountAll').textContent = active.length;
  if ($('#statusCountUnseen')) $('#statusCountUnseen').textContent = unseenCount;
  if ($('#statusCountSeen')) $('#statusCountSeen').textContent = seenCount;

  if ($('#countDeleted')) $('#countDeleted').textContent = deletedCount;
  if ($('#statusCountDeleted')) $('#statusCountDeleted').textContent = deletedCount;

  if ($('#countAll')) $('#countAll').textContent = active.length;
  if ($('#countVideo')) $('#countVideo').textContent = active.filter(x => x.kind === 'vídeo' || !!x.youtubeId).length;
  if ($('#countRepo')) $('#countRepo').textContent = active.filter(x => x.kind === 'repositório').length;
  if ($('#countCarousel')) $('#countCarousel').textContent = active.filter(x => x.kind === 'carrossel').length;
  if ($('#countTool')) $('#countTool').textContent = active.filter(x => x.kind === 'ferramenta').length;
  if ($('#countDoc')) $('#countDoc').textContent = active.filter(x => x.kind === 'conhecimento' || x.kind === 'diretório').length;
  if ($('#countFav')) $('#countFav').textContent = active.filter(x => storedFavorites.has(x.id)).length;

  renderSegmentList();
  renderSegmentChips();

  // Popula datalist de segmentos (BUG-10)
  const segmentDl = $('#segmentDatalist');
  if (segmentDl) {
    const uniqueSegs = Array.from(new Set(active.map(x => x.segment).filter(Boolean)));
    segmentDl.innerHTML = uniqueSegs.map(s => \`<option value="\${s}">\`).join('');
  }
  renderQueuePreview();
}`;

html = html.replace(oldUpdateKpisBlock, () => newUpdateKpisBlock);

// 3. renderSegmentChips contando sobre itens ativos
const oldRenderChips = `function renderSegmentChips() {
  const container = $('#segmentChipsContainer');
  if (!container) return;

  const counts = {};
  state.items.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });`;

const newRenderChips = `function renderSegmentChips() {
  const container = $('#segmentChipsContainer');
  if (!container) return;

  const activeItems = state.items.filter(x => !storedDeleted.has(x.id));
  const counts = {};
  activeItems.forEach(x => {
    counts[x.segment] = (counts[x.segment] || 0) + 1;
  });`;

html = html.replace(oldRenderChips, () => newRenderChips);

html = html.replace(
  '<span class="filter-chip-count">${state.items.length}</span>',
  '<span class="filter-chip-count">${activeItems.length}</span>'
);

// 4. renderQueuePreview filtrando itens ativos
const oldQueuePreview = `  const vids = state.items.filter(x => x.youtubeId).slice(0, 3);`;
const newQueuePreview = `  const vids = state.items.filter(x => !storedDeleted.has(x.id) && x.youtubeId).slice(0, 3);`;
html = html.replace(oldQueuePreview, () => newQueuePreview);

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('✅ patch_kpis_and_sync aplicado com sucesso.');
