const candidates = [
  { key: 'impostor-ted-ed', id: 'ZQUxL4Jm1Lo' },
  { key: 'disagree-ted', id: 'phgjouv0BUA' },
  { key: 'school-of-life-status', id: 'MtSE4rglxbY' },
  { key: 'ali-abdaal-hacks', id: '4aYVLpY5FYU' }
];

for (const c of candidates) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${c.id}&format=json`);
    if (res.ok) {
      const info = await res.json();
      console.log(`✅ [${c.key}] (${c.id}): "${info.title}" por ${info.author_name}`);
    } else {
      console.log(`❌ [${c.key}] (${c.id}): HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`⚠️ [${c.key}] (${c.id}): Erro na requisição - ${err.message}`);
  }
}
