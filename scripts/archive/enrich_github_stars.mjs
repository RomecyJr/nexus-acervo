import fs from 'node:fs';

const catalogPath = new URL('../../data/catalog.json', import.meta.url);
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const repoData = {
  'repo-scrapling': { stars: 83418, forks: 8525, githubRepo: 'D4Vinci/Scrapling' },
  'design-animate-css': { stars: 82816, forks: 15891, githubRepo: 'animate-css/animate.css' },
  'repo-openbb': { stars: 73438, forks: 7602, githubRepo: 'OpenBB-finance/OpenBB' },
  'repo-coolify': { stars: 62237, forks: 5540, githubRepo: 'coollabsio/coolify' },
  'repo-twenty': { stars: 57445, forks: 9275, githubRepo: 'twentyhq/twenty' },
  'repo-open-notebook': { stars: 39458, forks: 4570, githubRepo: 'lfnovo/open-notebook' },
  'repo-openvoice': { stars: 37655, forks: 4243, githubRepo: 'myshell-ai/OpenVoice' },
  'repo-agenticseek': { stars: 27306, forks: 3061, githubRepo: 'Fosowl/agenticSeek' },
  'design-simple-icons': { stars: 25906, forks: 3170, githubRepo: 'simple-icons/simple-icons' },
  'repo-documenso': { stars: 15177, forks: 3270, githubRepo: 'documenso/documenso' },
  'repo-no-ai-slop': { stars: 11184, forks: 757, githubRepo: 'petergyang/no-ai-slop' },
  'repo-fcksignups': { stars: 4340, forks: 257, githubRepo: 'BraveOPotato/FckSignups' }
};

let updatedCount = 0;
for (const item of catalog.items) {
  if (repoData[item.id]) {
    item.stars = repoData[item.id].stars;
    item.forks = repoData[item.id].forks;
    item.githubRepo = repoData[item.id].githubRepo;
    updatedCount++;
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
console.log(`Enriquecidos ${updatedCount} repositórios com contagem de estrelas e forks no catálogo.`);
