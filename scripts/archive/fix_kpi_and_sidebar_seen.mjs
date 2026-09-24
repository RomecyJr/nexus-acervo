import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');

  // 1. Inserir os botões na sidebar esquerda se ainda não estiverem com id="countSeen"
  if (!s.includes('id="countSeen"')) {
    const favTarget = '<button class="nav-btn" data-kind="favorites" aria-label="Recursos salvos nos favoritos">';
    const navSeenHtml = `<button class="nav-btn" data-read="unseen" aria-label="Conteúdos pendentes que ainda não vi">
            <span class="nav-btn-inner"><i data-lucide="inbox"></i> A Estudar (Não Vistos)</span>
            <span class="nav-pill-count" id="countUnseen">0</span>
          </button>
          <button class="nav-btn" data-read="seen" aria-label="Conteúdos concluídos e já assistidos">
            <span class="nav-btn-inner"><i data-lucide="check-circle-2" style="color:#10b981;"></i> Já Vistos (Concluídos)</span>
            <span class="nav-pill-count" id="countSeen">0</span>
          </button>
          `;
    s = s.replace(favTarget, navSeenHtml + favTarget);
  }

  // 2. Tornar updateKpis 100% à prova de falhas com checagens seguras
  const oldKpisTargetStart = 'function updateKpis() {';
  const oldKpisTargetEnd = 'function renderSegmentChips() {';
  const startIdx = s.indexOf(oldKpisTargetStart);
  const endIdx = s.indexOf(oldKpisTargetEnd);

  if (startIdx !== -1 && endIdx !== -1) {
    const safeKpisFn = `function updateKpis() {
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
  renderQueuePreview();
}

`;
    s = s.slice(0, startIdx) + safeKpisFn + s.slice(endIdx);
  }

  fs.writeFileSync(f, s, 'utf8');
  console.log(`Corrigido updateKpis e sidebar em: ${f}`);
}
