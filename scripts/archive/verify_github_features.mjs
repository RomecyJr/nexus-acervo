import { execSync } from 'node:child_process';
import path from 'node:path';

const artifactDir = 'C:\\Users\\romecy.veiga\\.gemini\\antigravity\\brain\\a9d247c7-afe0-4942-b1ed-6da86bfa507b';

function runCmd(cmd) {
  return execSync(cmd, { encoding: 'utf8', shell: 'pwsh.exe' });
}

console.log('=== INICIANDO SUÍTE DE TESTES AUTOMATIZADOS: GITHUB STARS & FILTROS ===');

const testScript = `
(async () => {
  const results = {};
  const wait = ms => new Promise(r => setTimeout(r, ms));

  // 1. Verificar estado inicial
  const starsFilter = document.getElementById('starsFilter');
  const sortSelect = document.getElementById('sortSelect');
  results.hasStarsFilter = Boolean(starsFilter);
  results.hasSortSelect = Boolean(sortSelect);
  results.initialChips = document.querySelectorAll('.stars-chip').length;

  // 2. Testar filtro > 10.000 estrelas
  starsFilter.value = '10000';
  starsFilter.dispatchEvent(new Event('change'));
  await wait(300);
  const items10k = Array.from(document.querySelectorAll('#itemsList article')).map(el => {
    const title = el.querySelector('.card-headline-title, h3')?.textContent?.trim();
    const chip = el.querySelector('.stars-chip')?.textContent?.trim();
    return { title, chip };
  });
  results.filter10kCount = items10k.length;
  results.filter10kItems = items10k.slice(0, 5);
  // Verificar que FckSignups (4.3k) NÃO está presente
  results.fckSignupsExcludedFrom10k = !items10k.some(x => (x.title || '').includes('FckSignups'));

  // 3. Testar filtro > 50.000 estrelas
  starsFilter.value = '50000';
  starsFilter.dispatchEvent(new Event('change'));
  await wait(300);
  const items50k = Array.from(document.querySelectorAll('#itemsList article')).map(el => {
    const title = el.querySelector('.card-headline-title, h3')?.textContent?.trim();
    const chip = el.querySelector('.stars-chip')?.textContent?.trim();
    return { title, chip };
  });
  results.filter50kCount = items50k.length;
  results.filter50kTitles = items50k.map(x => x.title);

  // 4. Testar Ordenação por Mais Estrelas (desc)
  starsFilter.value = '0';
  starsFilter.dispatchEvent(new Event('change'));
  sortSelect.value = 'stars-desc';
  sortSelect.dispatchEvent(new Event('change'));
  await wait(300);
  const itemsDesc = Array.from(document.querySelectorAll('#itemsList article')).map(el => {
    const title = el.querySelector('.card-headline-title, h3')?.textContent?.trim();
    const chip = el.querySelector('.stars-chip')?.textContent?.trim();
    return { title, chip };
  });
  results.sortDescTop3 = itemsDesc.slice(0, 3);

  // 5. Testar Ordenação por Menos Estrelas (asc)
  sortSelect.value = 'stars-asc';
  sortSelect.dispatchEvent(new Event('change'));
  await wait(300);
  const itemsAsc = Array.from(document.querySelectorAll('#itemsList article')).map(el => {
    const title = el.querySelector('.card-headline-title, h3')?.textContent?.trim();
    const chip = el.querySelector('.stars-chip')?.textContent?.trim();
    return { title, chip };
  });
  results.sortAscTop3 = itemsAsc.slice(0, 3);

  // 6. Testar Modal de Detalhes com Repositório (Scrapling)
  const scraplingCard = Array.from(document.querySelectorAll('#itemsList article')).find(el => (el.textContent || '').includes('Scrapling'));
  if (scraplingCard) {
    scraplingCard.click();
    await wait(300);
    const modal = document.getElementById('detailModal');
    const badge = document.getElementById('modalStarsBadge');
    const gridCol = document.getElementById('modalStarsGridCol');
    results.modalOpen = modal.classList.contains('open');
    results.modalBadgeVisible = badge.style.display !== 'none';
    results.modalBadgeText = badge.textContent?.trim();
    results.modalGridVisible = gridCol.style.display !== 'none';
    results.modalGridText = gridCol.textContent?.trim();
  }

  return results;
})()
`;

// Executar ações encadeadas no agent-browser
const out = runCmd(`agent-browser open http://localhost:3333 && agent-browser eval "${testScript.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`);
console.log('Resultados dos testes DOM:');
console.log(out);
