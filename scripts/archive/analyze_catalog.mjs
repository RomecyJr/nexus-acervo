import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('data/catalog.json', 'utf8'));

console.log('Total items:', data.items.length);

// 1. Kinds
const kindCounts = {};
data.items.forEach(x => {
  kindCounts[x.kind] = (kindCounts[x.kind] || 0) + 1;
});
console.log('\n--- KINDS ---');
console.table(kindCounts);

// 2. Segments
const segCounts = {};
data.items.forEach(x => {
  segCounts[x.segment] = (segCounts[x.segment] || 0) + 1;
});
console.log('\n--- SEGMENTS ---');
console.table(segCounts);

// 3. Carousels
console.log('\n--- CARROSSELS ---');
data.items.filter(x => x.kind === 'carrossel').forEach(x => {
  console.log(`ID: ${x.id} | Title: ${x.title} | URL: ${x.url}`);
});

// 4. Duplicate URLs
const urlMap = {};
data.items.forEach(x => {
  urlMap[x.url] = urlMap[x.url] || [];
  urlMap[x.url].push(x);
});
console.log('\n--- DUPLICATE URLS ---');
Object.entries(urlMap).filter(([url, list]) => list.length > 1).forEach(([url, list]) => {
  console.log(`URL: ${url} (${list.length} items)`);
  list.forEach(item => console.log(`  - [${item.id}] ${item.title} (${item.kind}/${item.segment})`));
});

// 5. Videos
console.log('\n--- VIDEOS ---');
data.items.filter(x => x.kind === 'vídeo' || x.youtubeId).forEach(x => {
  console.log(`ID: ${x.id} | Title: ${x.title} | ytId: ${x.youtubeId} | URL: ${x.url} | Status: ${x.status}`);
});

// 6. Generic Deliverables / Descriptions
console.log('\n--- TEXT PATTERNS (DELIVERABLE SAMPLES) ---');
data.items.slice(0, 10).forEach(x => {
  console.log(`[${x.id}] delivers: "${x.delivers}" | example: "${x.practicalExample}"`);
});
