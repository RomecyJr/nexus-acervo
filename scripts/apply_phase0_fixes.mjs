import fs from 'node:fs';
import path from 'node:path';

console.log('🚀 Executando correções da Fase 0 (Quick Wins, Bugs Críticos P0/P1 e Segurança)...');

const files = ['index.html', 'nexus-acervo.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Favicon SVG inline + Script Anti-Flash de Tema no <head>
  const antiFlashSnippet = `<!-- Favicon SVG e Anti-Flash de Tema -->
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%2318181b'/%3E%3Cpath d='M16 6L24 11V21L16 26L8 21V11L16 6Z' stroke='%2310b981' stroke-width='2' fill='none'/%3E%3Ccircle cx='16' cy='16' r='2.5' fill='%23fafafa'/%3E%3C/svg%3E">
<meta name="theme-color" content="#09090b">
<script id="theme-anti-flash">
  (function() {
    try {
      var saved = localStorage.getItem('nexus_theme');
      var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      var theme = saved || (prefersLight ? 'light' : 'dark');
      document.documentElement.dataset.theme = theme;
    } catch(e) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
</script>`;

  if (!content.includes('Anti-Flash de Tema')) {
    content = content.replace('<script src="./data/catalog.js', `${antiFlashSnippet}\n<script src="./data/catalog.js`);
  }

  // 2. UI-01: Correção de Tokens CSS (:root com --radius-sm, contrastes e variáveis válidas)
  content = content.replace(/--radius: 0\.5rem;/g, '--radius-sm: 6px;\n  --radius: 8px;\n  --radius-lg: 12px;');
  
  // Ajuste de contraste WCAG AA em --faint (mínimo 4.5:1)
  content = content.replace(/--faint: #71717a;/g, '--faint: #a1a1aa;'); // dark mode: agora > 7:1
  content = content.replace(/--faint: #94a3b8;/g, '--faint: #52525b;'); // light mode: agora > 4.5:1

  // Substitui ocorrências incorretas de var(--border) e var(--muted) por tokens reais com cor
  content = content.replace(/border: 1px solid var\(--border\);/g, 'border: 1px solid var(--border-color);');
  content = content.replace(/color: var\(--muted\);/g, 'color: var(--muted-text);');
  content = content.replace(/var\(--radius-sm\)/g, 'var(--radius-sm)');

  // 3. A11Y-01: Inserção de <h1> semântico com classe acessível
  if (!content.includes('class="sr-only-h1"')) {
    const h1Snippet = `<h1 class="sr-only-h1" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Nexus Acervo — Segundo Cérebro de Ferramentas, Repositórios e Vídeos</h1>`;
    content = content.replace('<main class="scroll-content" id="content">', `<main class="scroll-content" id="content">\n      ${h1Snippet}`);
  }

  // 4. SEC-01: Remoção de credenciais padrão hardcoded no formulário de autenticação
  content = content.replace('value="admin@nexus.ai"', 'placeholder="Digite seu email..."');
  content = content.replace('value="nexus2026"', 'placeholder="Digite sua senha de acesso..."');
  content = content.replace('Credenciais demonstrativas pré-preenchidas para acesso instantâneo ao cofre local.', 'Suas notas e progresso ficam salvos localmente neste navegador com chave pessoal.');

  // 5. SEC-02 & SEC-09: Desmistificação do Documenso Studio e remoção de alegações jurídicas enganosas
  content = content.replace('Documenso Studio · Assinatura Digital', 'Documenso Studio · Demonstração Educativa');
  content = content.replace('value="Romecy Ribeiro Junior"', 'value="" placeholder="Digite seu nome para prévia..."');
  content = content.replace(/>Romecy Ribeiro Junior</g, '>Sua Assinatura<');
  content = content.replace('Legal Standard:</strong> MP 2.200-2/2001 (Brasil) · eIDAS (União Europeia)', 'Legal Notice:</strong> Demonstração interativa local — Sem validade jurídica formal');
  content = content.replace('Audit State:</strong> Signed, Timestamped and Cryptographically Sealed', 'Audit State:</strong> Simulação Educativa Local');

  // 6. SEC-08: Link de afiliado com rel="sponsored noopener"
  content = content.replace('href="https://railway.com/deploy/DjrRRX?referralCode=EZR3s0" target="_blank" rel="noopener noreferrer"', 'href="https://railway.com/deploy/DjrRRX?referralCode=EZR3s0" target="_blank" rel="sponsored noopener noreferrer"');

  // 7. BUG-01 & BUG-03: SafeStore e eliminação de condição de corrida nas anotações
  const safeStoreAndNotesFix = `// Utilitário seguro para localStorage contra travamento por dados corrompidos ou cota cheia (BUG-03)
const safeStore = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      console.warn('Erro ao ler ' + key + ' do localStorage:', e);
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Erro ao gravar no localStorage:', e);
      if (typeof showToast === 'function') {
        showToast('Aviso: Armazenamento local indisponível ou cheio.');
      }
      return false;
    }
  }
};

// Estado de Anotações Pessoais Seguro (BUG-01)
const storedNotes = safeStore.get('nexus_personal_notes', {});
let activeNotesItemId = null;
let notesDebounceTimer = null;

function saveNotesStorage() {
  safeStore.set('nexus_personal_notes', storedNotes);
}

function commitNote(id) {
  if (!id) return;
  const text = $('#notesTextInput')?.value.trim() || '';
  const action = $('#notesActionInput')?.value.trim() || '';
  const tags = $('#notesTagsInput')?.value.trim() || '';

  if (text || action || tags) {
    storedNotes[id] = {
      text,
      action,
      tags,
      updatedAt: new Date().toISOString()
    };
  } else {
    delete storedNotes[id];
  }
  saveNotesStorage();
  const statusEl = $('#notesSaveStatus');
  if (statusEl) statusEl.textContent = '✓ Salvo neste dispositivo';
}

function openNotesModal(itemId) {
  activeNotesItemId = itemId;
  const item = state.items.find(x => x.id === itemId);
  if (!item) return;

  const noteData = storedNotes[itemId] || { text: '', action: '', tags: '' };
  $('#notesItemMeta').textContent = \`\${item.title} (\${item.segment})\`;
  $('#notesTextInput').value = noteData.text || '';
  $('#notesActionInput').value = noteData.action || '';
  $('#notesTagsInput').value = noteData.tags || '';
  $('#notesSaveStatus').textContent = noteData.text ? 'Salvo neste dispositivo' : 'Pronto para escrever';

  $('#notesModal').classList.add('open');
  lucide.createIcons();
}

function closeNotesModal() {
  clearTimeout(notesDebounceTimer);
  if (activeNotesItemId) {
    commitNote(activeNotesItemId);
  }
  $('#notesModal').classList.remove('open');
  activeNotesItemId = null;
  renderCards();
}

function handleNoteAutoSave() {
  const id = activeNotesItemId;
  if (!id) return;
  clearTimeout(notesDebounceTimer);
  const statusEl = $('#notesSaveStatus');
  if (statusEl) statusEl.textContent = 'Salvando...';
  notesDebounceTimer = setTimeout(() => {
    commitNote(id);
    renderCards();
  }, 350);
}`;

  // Substitui a declaração antiga do storedNotes e funções de notas
  content = content.replace(/\/\/ 1\. Estado de Anotações Pessoais[\s\S]*?function handleNoteAutoSave\(\) \{[\s\S]*?\n\}/, safeStoreAndNotesFix);

  // 8. BUG-02 & BUG-14: Unificação de correspondência de kind e correção do Documenso como repositório
  const matchesKindSnippet = `const KIND_GROUPS = {
  conhecimento: ['conhecimento', 'diretório']
};

function matchesKind(item, filterKind) {
  if (filterKind === 'all') return true;
  if (filterKind === 'favorites') return storedFavorites.has(item.id);
  const allowed = KIND_GROUPS[filterKind] || [filterKind];
  return allowed.includes(item.kind);
}`;

  if (!content.includes('function matchesKind(')) {
    content = content.replace('// FILTRAGEM', `${matchesKindSnippet}\n\n// FILTRAGEM`);
  }

  // Atualiza getFilteredItems para usar matchesKind
  content = content.replace(/if \(state\.kind === 'favorites'\) \{[\s\S]*?\} else if \(state\.kind !== 'all' && item\.kind !== state\.kind\) \{\s*return false;\s*\}/, `if (!matchesKind(item, state.kind)) return false;`);

  // Corrige renderCards para decidir layout estritamente por item.kind (BUG-14)
  content = content.replace(/if \(item\.kind === 'vídeo' \|\| item\.youtubeId\)/g, `if (item.kind === 'vídeo')`);

  // 9. BUG-05 & BUG-10: Formulário de adicionar recurso (#carouselSlidesField e datalist)
  content = content.replace("const carouselGroup = $('#carouselFieldsGroup');", "const carouselGroup = $('#carouselSlidesField');");
  content = content.replace("carouselGroup.style.display = addKindSelect.value === 'carrossel' ? 'grid' : 'none';", "if (carouselGroup) carouselGroup.style.display = addKindSelect.value === 'carrossel' ? 'grid' : 'none';");

  // Injeta população do datalist no DOMContentLoaded
  const populateDatalistSnippet = `
  // Popula datalist de segmentos (BUG-10)
  const segmentDl = $('#segmentDatalist');
  if (segmentDl) {
    const uniqueSegs = Array.from(new Set(state.items.map(x => x.segment).filter(Boolean)));
    segmentDl.innerHTML = uniqueSegs.map(s => \`<option value="\${s}">\`).join('');
  }`;

  if (!content.includes('Popula datalist de segmentos')) {
    content = content.replace("renderSegmentChips();", `renderSegmentChips();\n${populateDatalistSnippet}`);
  }

  // 10. BUG-07: Fallback seguro para vídeos inválidos ou indisponíveis
  const videoPlayerFix = `// VÍDEO: Player Embutido Responsivo com Validação Segura (BUG-07)
  const isYt = id => /^[\\w-]{11}$/.test(id || '');
  if (item.kind === 'vídeo' && isYt(ytId) && item.status !== 'indisponível') {
    mediaContainer.className = 'modal-media-wrap has-video';
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = \`<iframe src="https://www.youtube-nocookie.com/embed/\${ytId}?autoplay=1&rel=0" title="\${esc(item.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>\`;
  } else if (item.kind === 'vídeo') {
    mediaContainer.className = 'modal-media-wrap';
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = \`<div style="padding: 2.5rem 1.5rem; text-align: center; background: var(--surface2); border: 1px solid var(--border-color); border-radius: var(--radius);">
      <i data-lucide="video-off" style="width: 32px; height: 32px; color: var(--muted-text); margin: 0 auto 0.5rem;"></i>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text);">Vídeo de Estudo / Referência</h4>
      <p style="font-size: 0.78rem; color: var(--muted-text); margin: 0.3rem 0 1rem;">O vídeo original é uma referência externa ou busca de conteúdo.</p>
      <a class="btn primary sm" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link" style="width:12px;height:12px;"></i> Abrir no YouTube</a>
    </div>\`;
  }`;

  content = content.replace(/\/\/ VÍDEO: Player Embutido Responsivo Proporcional[\s\S]*?mediaContainer\.innerHTML = `<iframe src="https:\/\/www\.youtube\.com\/embed\/\$\{ytId\}\?autoplay=1&rel=0"[\s\S]*?<\/iframe>`;\s*\}/, videoPlayerFix);

  // 11. BUG-12: Listener global de Escape fechando todos os modais
  const escapeFix = `if (e.key === 'Escape') {
      closeDetailModal();
      closeCmd();
      closeNotesModal();
      closeExportModal();
      closeAuthModal();
      $('#addModal')?.classList.remove('open');
      $('#apiModal')?.classList.remove('open');
      $('#documensoModal')?.classList.remove('open');
      $('.sidebar')?.classList.remove('open');
      const popover = $('#customizerMenu');
      if (popover) popover.classList.remove('open');
    }`;

  content = content.replace(/if \(e\.key === 'Escape'\) \{[\s\S]*?popover\.classList\.remove\('open'\);\s*\}/, escapeFix);

  // 12. Substitui chamadas antigas a JSON.parse(localStorage.getItem) por safeStore.get()
  content = content.replace(/JSON\.parse\(localStorage\.getItem\('nexus_custom_items'\) \|\| '\[\]'\)/g, `safeStore.get('nexus_custom_items', [])`);
  content = content.replace(/JSON\.parse\(localStorage\.getItem\('nexus_favorites'\) \|\| '\[\]'\)/g, `safeStore.get('nexus_favorites', [])`);
  content = content.replace(/JSON\.parse\(localStorage\.getItem\('nexus_seen_items'\) \|\| '\[\]'\)/g, `safeStore.get('nexus_seen_items', [])`);
  content = content.replace(/JSON\.parse\(localStorage\.getItem\('nexus_customizer_prefs'\) \|\| '\{\}'\)/g, `safeStore.get('nexus_customizer_prefs', {})`);

  // Previne quebra de $$ em $
  content = content.replace(/([^\$])\$\(([^)]+)\)\.forEach/g, (match, p1, p2) => {
    return `${p1}\$\$(${p2}).forEach`;
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Fase 0 aplicada com sucesso em: ${file}`);
}
