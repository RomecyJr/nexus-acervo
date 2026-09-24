import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const nexusHtmlPath = path.join(rootDir, 'nexus-acervo.html');

console.log('Lendo nexus-acervo.html para aplicar perfeição nos cards...');
let content = fs.readFileSync(nexusHtmlPath, 'utf8');

// ============================================================================
// Nova função renderCards com reestruturação profunda
// ============================================================================
const newRenderCardsFunction = `function renderCards() {
  const container = $('#itemsList');
  const items = getFilteredItems();

  // Aplica classes de customização do layout no container
  container.className = \`stream-container view-\${uiPrefs.viewMode} cols-\${uiPrefs.gridCols} gap-\${uiPrefs.gapSize}\`;

  if (!items.length) {
    const isDeletedView = state.readFilter === 'deleted';
    container.innerHTML = \`
      <div style="grid-column: 1 / -1; padding: 3.5rem 1rem; text-align: center; color: var(--muted-text);">
        <i data-lucide="\${isDeletedView ? 'trash-2' : 'inbox'}" style="width: 40px; height: 40px; margin: 0 auto 0.75rem; opacity: 0.4; \${isDeletedView ? 'color:#ef4444;' : ''}"></i>
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text);">\${isDeletedView ? 'Lixeira Vazia' : 'Nenhum recurso encontrado'}</h3>
        <p style="font-size: 0.825rem; margin-top: 0.2rem;">\${isDeletedView ? 'Nenhum recurso foi excluído até o momento. Quando você excluir cards, eles ficarão salvos aqui para restauração a qualquer momento.' : 'Tente pesquisar outros termos ou limpe os filtros ativos.'}</p>
        \${isDeletedView ? '<button class="btn" onclick="state.readFilter=\\'all\\'; syncFilterControls(); renderCards();" style="margin-top: 0.85rem;" aria-label="Voltar para todos os recursos">Voltar ao Acervo Principal</button>' : '<button class="btn" onclick="resetAllFilters()" style="margin-top: 0.85rem;" aria-label="Limpar todos os filtros">Limpar todos os filtros</button>'}
      </div>\`;
    $('#resultCount').textContent = '0 recursos encontrados';
    lucide.createIcons();
    updateKpis();
    return;
  }

  // 1. MODO LISTA EXECUTIVA (SEM CORTAR TEXTOS)
  if (uiPrefs.viewMode === 'list') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);
      const isDeleted = storedDeleted.has(item.id);
      const ytId = item.youtubeId || extractYouTubeId(item.url);
      const thumb = ytId ? \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\` : (item.thumbnail || '');
      const isVideo = item.kind === 'vídeo' || !!ytId;
      const favicon = getItemFavicon(item.url);
      const deliverable = esc(item.deliverable || item.description);

      return \`
        <article class="list-row-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
          <div style="flex-shrink:0;">
            \${isVideo && thumb
              ? \`<img class="list-thumb-img" src="\${thumb}" alt="" loading="lazy">\`
              : \`<div class="list-avatar-icon"><img src="\${favicon}" style="width:20px;height:20px;object-fit:contain;" alt="" onerror="this.style.display='none'"></div>\`}
          </div>

          <div class="list-col-title" style="flex:1; min-width:220px;">
            <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem;">
              <span class="meta-chip-tag" style="text-transform: uppercase;">\${esc(item.kind)}</span>
              <span class="meta-chip-tag" style="color:var(--faint);">\${esc(item.segment)}</span>
            </div>
            <h3 style="font-size: 0.92rem; font-weight: 700; color: var(--text); line-height: 1.35;">\${esc(item.title)}</h3>
          </div>

          <div class="list-col-deliverable" style="flex:1; min-width:180px;">
            <span class="list-deliverable-text">⚡ \${deliverable}</span>
          </div>

          <div class="list-col-actions" style="flex-shrink:0;">
            <div style="display:flex;align-items:center;gap:0.35rem;">
              \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
              \${isDeleted ? '<span class="trash-badge-pill"><i data-lucide="trash-2" style="width:10px;height:10px;"></i> Excluído</span>' : ''}
              <button class="card-action-btn btn-trash-toggle \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" title="\${isDeleted ? 'Restaurar para acervo ativo' : 'Excluir do acervo'}" aria-label="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:13px;height:13px;"></i> <span>\${isDeleted ? 'Restaurar' : 'Excluir'}</span></button>
              \${!isDeleted ? \`
                <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para desmarcar)' : 'Marcar como visto'}" aria-label="Alternar visto"><i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i> <span>\${isSeen ? 'Visto' : 'Marcar'}</span></button>
                <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="\${storedNotes[item.id]?.text ? 'Ver anotação salva' : 'Anotar insight pessoal'}" aria-label="Anotações"><i data-lucide="file-text" style="width:13px;height:13px;"></i> <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span></button>
                <button class="card-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM" aria-label="Exportar"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
                <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:15px;height:15px;"></i></button>
              \` : ''}
            </div>
            <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
            <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir link externo" aria-label="Abrir link externo"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
          </div>
        </article>
      \`;
    }).join('');
  }

  // 2. MODO BOTÕES / MOSAICO DINÂMICO
  else if (uiPrefs.viewMode === 'tiles') {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);
      const isDeleted = storedDeleted.has(item.id);
      const ytId = item.youtubeId || extractYouTubeId(item.url);
      const thumb = ytId ? \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\` : (item.thumbnail || '');
      const favicon = getItemFavicon(item.url);

      return \`
        <button class="tile-button-card \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}" title="\${esc(item.deliverable || item.description)}">
          <div class="tile-media-avatar">
            \${thumb 
              ? \`<img src="\${thumb}" alt="">\` 
              : \`<img src="\${favicon}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'\">}
          </div>
          <div class="tile-info-block">
            <div class="tile-info-title" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3;">\${esc(item.title)}</div>
            <div class="tile-info-meta">\${esc(item.kind.toUpperCase())} · \${esc(item.segment)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:0.3rem;margin-left:auto;flex-shrink:0;">
            \${isDeleted ? '<span class="trash-badge-pill" style="font-size:0.6rem;padding:0.1rem 0.35rem;"><i data-lucide="trash-2" style="width:9px;height:9px;"></i></span>' : ''}
            <span class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" aria-label="Favoritar"><i data-lucide="star" style="width:13px;height:13px;"></i></span>
            <button class="card-action-btn btn-trash-toggle \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" style="padding:0 0.4rem; height:24px;" title="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:11px;height:11px;"></i></button>
          </div>
        </button>
      \`;
    }).join('');
  }

  // 3. MODO CARDS MULTI-COLUNA (ESTRUTURA SUPREMA HIERÁRQUICA)
  else {
    container.innerHTML = items.map(item => {
      const isFav = storedFavorites.has(item.id);
      const isSeen = storedSeen.has(item.id);
      const isDeleted = storedDeleted.has(item.id);
      const summary = esc(item.description || '');
      const deliverableText = esc(item.deliverable || item.description);
      const exampleText = esc(item.practicalExample || 'Aplicável diretamente no fluxo de trabalho e projetos.');
      const showSummary = uiPrefs.detailLevel === 'full';
      const showDeliverable = uiPrefs.detailLevel === 'full' || uiPrefs.detailLevel === 'focused';
      const showExample = uiPrefs.detailLevel === 'full';

      // Bloco comum de meta header (badges no topo + ações rápidas à direita)
      const metaHeaderHtml = \`
        <div class="card-meta-header">
          <div class="card-meta-left">
            <span class="meta-chip-tag" style="text-transform: uppercase; font-weight:700;">\${esc(item.kind)}</span>
            <span class="meta-chip-tag" style="color:var(--faint);" data-segment="\${esc(item.segment)}">\${esc(item.segment)}</span>
          </div>
          <div class="card-meta-right">
            \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
            \${isDeleted ? '<span class="trash-badge-pill"><i data-lucide="trash-2" style="width:10px;height:10px;"></i> Excluído</span>' : ''}
            <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" title="\${isFav ? 'Desfavoritar' : 'Salvar nos Favoritos'}" aria-label="Favoritar"><i data-lucide="star" style="width:14px;height:14px;"></i></button>
            <button class="card-action-btn btn-trash-toggle card-quick-trash \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" title="\${isDeleted ? 'Restaurar para acervo ativo' : 'Excluir do acervo'}" aria-label="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:12px;height:12px;"></i></button>
          </div>
        </div>
      \`;

      // Bloco comum de rodapé com ações operacionais
      const footActionsHtml = \`
        <div class="card-foot-actions">
          <div class="card-action-btns-group">
            \${!isDeleted ? \`
              <button class="card-action-btn btn-seen-toggle \${isSeen ? 'is-seen' : ''}" data-seen-id="\${esc(item.id)}" title="\${isSeen ? 'Visto / Concluído (clique para alternar)' : 'Marcar como visto'}">
                <i data-lucide="\${isSeen ? 'check-circle-2' : 'circle'}" style="width:13px;height:13px;"></i>
                <span>\${isSeen ? 'Visto' : 'Marcar'}</span>
              </button>
              <button class="card-action-btn btn-open-notes \${storedNotes[item.id]?.text ? 'has-note' : ''}" data-notes-id="\${esc(item.id)}" title="Anotar insight pessoal">
                <i data-lucide="file-text" style="width:13px;height:13px;"></i>
                <span>\${storedNotes[item.id]?.text ? 'Nota' : 'Anotar'}</span>
              </button>
              <button class="icon-action-btn btn-open-export" data-export-id="\${esc(item.id)}" title="Exportar para WhatsApp, Obsidian ou LLM"><i data-lucide="share-2" style="width:13px;height:13px;"></i></button>
            \` : \`
              <button class="card-action-btn btn-trash-toggle btn-restore-active" data-trash-id="\${esc(item.id)}" title="Restaurar para acervo ativo">
                <i data-lucide="rotate-ccw" style="width:13px;height:13px;"></i>
                <span>Restaurar</span>
              </button>
            \`}
          </div>
          <div class="card-button-links">
            <button class="icon-action-btn btn-copy" data-url="\${safeUrl(item.url)}" title="Copiar Link" aria-label="Copiar link"><i data-lucide="copy" style="width:14px;height:14px;"></i></button>
            \${item.id === 'repo-documenso' ? \`<button class="btn secondary sm btn-open-documenso" style="font-size:0.72rem; height:26px; padding:0 0.55rem; gap:0.3rem;" title="Abrir Estúdio de Assinatura" aria-label="Abrir Documenso Studio"><i data-lucide="pen-tool" style="width:12px;height:12px;"></i><span>Assinar</span></button>\` : ''}
            <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Abrir link externo" aria-label="Abrir link externo"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>
          </div>
        </div>
      \`;

      // A. VÍDEO
      if (item.kind === 'vídeo') {
        const ytId = item.youtubeId || extractYouTubeId(item.url);
        const thumb = ytId ? \`https://img.youtube.com/vi/\${ytId}/hqdefault.jpg\` : (item.thumbnail || '');
        const isHorizontal = uiPrefs.thumbSize === 'medium' || uiPrefs.thumbSize === 'small';
        const showThumb = uiPrefs.thumbSize !== 'none';

        if (isHorizontal && showThumb) {
          return \`
            <article class="card-item card-video-horizontal \${uiPrefs.thumbSize === 'small' ? 'thumb-sm' : ''} \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
              <div class="card-thumb-side">
                <img src="\${thumb}" alt="\${esc(item.title)}" loading="lazy">
                <div class="video-hover-play"><div class="play-bubble"><i data-lucide="play" style="width:15px;height:15px;"></i></div></div>
                <span class="video-label-badge">VÍDEO</span>
              </div>
              <div class="card-content-body">
                <div>
                  \${metaHeaderHtml}
                  <h3 class="card-headline-title">\${esc(item.title)}</h3>
                  \${showSummary && summary ? \`<p class="card-summary-desc">\${summary}</p>\` : ''}
                  \${storedNotes[item.id]?.text ? \`
                    <div class="note-badge-preview">
                      <i data-lucide="file-text" style="width:12px;height:12px;color:#60a5fa;flex-shrink:0;"></i>
                      <span><strong>Nota:</strong> \${esc(storedNotes[item.id].text)}</span>
                    </div>\` : ''}
                  \${showDeliverable && deliverableText ? \`
                    <div class="callout-deliverable" style="margin-top: 0.45rem;">
                      <i data-lucide="zap"></i>
                      <span><strong>O que entrega:</strong> \${deliverableText}</span>
                    </div>\` : ''}
                  \${showExample && exampleText ? \`
                    <div class="callout-example" style="margin-top: 0.35rem;">
                      <i data-lucide="lightbulb"></i>
                      <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                    </div>\` : ''}
                </div>
                \${footActionsHtml}
              </div>
            </article>
          \`;
        }

        return \`
          <article class="card-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
            \${showThumb ? \`
              <div class="card-thumb-top">
                <img src="\${thumb}" alt="\${esc(item.title)}" loading="lazy">
                <div class="video-hover-play"><div class="play-bubble"><i data-lucide="play" style="width:16px;height:16px;"></i></div></div>
                <span class="video-label-badge">VÍDEO</span>
              </div>\` : ''}
            <div class="card-content-body">
              <div>
                \${metaHeaderHtml}
                <h3 class="card-headline-title">\${esc(item.title)}</h3>
                \${showSummary && summary ? \`<p class="card-summary-desc">\${summary}</p>\` : ''}
                \${storedNotes[item.id]?.text ? \`
                  <div class="note-badge-preview">
                    <i data-lucide="file-text" style="width:12px;height:12px;color:#60a5fa;flex-shrink:0;"></i>
                    <span><strong>Nota:</strong> \${esc(storedNotes[item.id].text)}</span>
                  </div>\` : ''}
                \${showDeliverable && deliverableText ? \`
                  <div class="callout-deliverable" style="margin-top: 0.45rem;">
                    <i data-lucide="zap"></i>
                    <span><strong>O que entrega:</strong> \${deliverableText}</span>
                  </div>\` : ''}
                \${showExample && exampleText ? \`
                  <div class="callout-example" style="margin-top: 0.35rem;">
                    <i data-lucide="lightbulb"></i>
                    <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                  </div>\` : ''}
              </div>
              \${footActionsHtml}
            </div>
          </article>
        \`;
      }

      // B. REPOSITÓRIO GITHUB
      if (item.kind === 'repositório') {
        const repoName = extractGitHubRepo(item.url) || esc(item.title);
        const license = esc(item.license || 'Open Source');
        return \`
          <article class="card-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
            <div class="card-content-body">
              <div>
                <div class="card-meta-header">
                  <div class="card-meta-left">
                    <span class="meta-chip-tag" style="text-transform: uppercase; font-weight:700;">REPO</span>
                    <span class="meta-chip-tag" style="color:var(--faint);">\${esc(item.segment)}</span>
                    <span class="meta-chip-tag" style="background:var(--surface3); font-family:var(--font-mono); font-size:0.65rem;">\${license}</span>
                  </div>
                  <div class="card-meta-right">
                    \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
                    \${isDeleted ? '<span class="trash-badge-pill"><i data-lucide="trash-2" style="width:10px;height:10px;"></i> Excluído</span>' : ''}
                    <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" title="\${isFav ? 'Desfavoritar' : 'Salvar nos Favoritos'}"><i data-lucide="star" style="width:14px;height:14px;"></i></button>
                    <button class="card-action-btn btn-trash-toggle card-quick-trash \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" title="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:12px;height:12px;"></i></button>
                  </div>
                </div>

                <div class="repo-mono-title" style="margin-bottom: 0.35rem;">
                  <i data-lucide="github" style="width:14px;height:14px;"></i>
                  <span>\${esc(repoName)}</span>
                </div>

                <h3 class="card-headline-title">\${esc(item.title)}</h3>
                \${showSummary && summary ? \`<p class="card-summary-desc">\${summary}</p>\` : ''}

                \${storedNotes[item.id]?.text ? \`
                  <div class="note-badge-preview">
                    <i data-lucide="file-text" style="width:12px;height:12px;color:#60a5fa;flex-shrink:0;"></i>
                    <span><strong>Nota:</strong> \${esc(storedNotes[item.id].text)}</span>
                  </div>\` : ''}
                \${showDeliverable && deliverableText ? \`
                  <div class="callout-deliverable" style="margin-top: 0.45rem;">
                    <i data-lucide="zap"></i>
                    <span><strong>O que entrega:</strong> \${deliverableText}</span>
                  </div>\` : ''}
                \${showExample && exampleText ? \`
                  <div class="callout-example" style="margin-top: 0.35rem;">
                    <i data-lucide="lightbulb"></i>
                    <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                  </div>\` : ''}
              </div>

              \${footActionsHtml}
            </div>
          </article>
        \`;
      }

      // C. CARROSSEL (Instagram / Redes)
      if (item.kind === 'carrossel') {
        const slides = Array.isArray(item.slides) && item.slides.length ? item.slides : [item.thumbnail || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'];
        const author = esc(item.author || '@instagram');
        const showThumb = uiPrefs.thumbSize !== 'none';
        return \`
          <article class="card-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
            \${showThumb ? \`
              <div class="card-carousel-cover">
                <img src="\${slides[0]}" alt="\${esc(item.title)}" loading="lazy">
                <div class="slides-counter-tag"><i data-lucide="images" style="width:12px;height:12px;"></i> \${slides.length}</div>
              </div>\` : ''}
            <div class="card-content-body">
              <div>
                \${metaHeaderHtml}
                <div style="font-size:0.68rem; font-weight:700; color:var(--muted-text); margin-bottom:0.2rem;">\${author}</div>
                <h3 class="card-headline-title">\${esc(item.title)}</h3>
                \${showSummary && summary ? \`<p class="card-summary-desc">\${summary}</p>\` : ''}

                \${storedNotes[item.id]?.text ? \`
                  <div class="note-badge-preview">
                    <i data-lucide="file-text" style="width:12px;height:12px;color:#60a5fa;flex-shrink:0;"></i>
                    <span><strong>Nota:</strong> \${esc(storedNotes[item.id].text)}</span>
                  </div>\` : ''}
                \${showDeliverable && deliverableText ? \`
                  <div class="callout-deliverable" style="margin-top: 0.45rem;">
                    <i data-lucide="zap"></i>
                    <span><strong>O que entrega:</strong> \${deliverableText}</span>
                  </div>\` : ''}
                \${showExample && exampleText ? \`
                  <div class="callout-example" style="margin-top: 0.35rem;">
                    <i data-lucide="lightbulb"></i>
                    <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                  </div>\` : ''}
              </div>

              \${footActionsHtml}
            </div>
          </article>
        \`;
      }

      // D. FERRAMENTAS WEB E CONHECIMENTO
      const favicon = getItemFavicon(item.url);
      const isDoc = item.kind === 'conhecimento' || item.kind === 'diretório';
      return \`
        <article class="card-item \${isSeen ? 'is-item-seen' : ''} \${isDeleted ? 'is-deleted-card' : ''}" data-id="\${esc(item.id)}">
          <div class="card-content-body">
            <div>
              <div class="card-meta-header">
                <div class="card-meta-left">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: var(--surface2); border: 1px solid var(--border-color); display: grid; place-items: center; overflow: hidden; margin-right: 0.2rem;">
                    \${isDoc 
                      ? \`<i data-lucide="book-open" style="width:15px;height:15px;color:var(--text);"></i>\` 
                      : \`<img src="\${favicon}" alt="" style="width:16px;height:16px;object-fit:contain;" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'\">\`}
                  </div>
                  <span class="meta-chip-tag" style="text-transform: uppercase; font-weight:700;">\${esc(item.kind)}</span>
                  <span class="meta-chip-tag" style="color:var(--faint);">\${esc(item.segment)}</span>
                </div>
                <div class="card-meta-right">
                  \${isSeen ? '<span class="seen-badge-pill"><i data-lucide="check" style="width:10px;height:10px;"></i> Visto</span>' : ''}
                  \${isDeleted ? '<span class="trash-badge-pill"><i data-lucide="trash-2" style="width:10px;height:10px;"></i> Excluído</span>' : ''}
                  <button class="card-favorite-toggle \${isFav ? 'is-fav' : ''}" data-fav-id="\${esc(item.id)}" title="\${isFav ? 'Desfavoritar' : 'Salvar nos Favoritos'}"><i data-lucide="star" style="width:14px;height:14px;"></i></button>
                  <button class="card-action-btn btn-trash-toggle card-quick-trash \${isDeleted ? 'btn-restore-active' : ''}" data-trash-id="\${esc(item.id)}" title="\${isDeleted ? 'Restaurar' : 'Excluir'}"><i data-lucide="\${isDeleted ? 'rotate-ccw' : 'trash-2'}" style="width:12px;height:12px;"></i></button>
                </div>
              </div>

              <h3 class="card-headline-title">\${esc(item.title)}</h3>
              \${showSummary && summary ? \`<p class="card-summary-desc">\${summary}</p>\` : ''}

              \${storedNotes[item.id]?.text ? \`
                <div class="note-badge-preview">
                  <i data-lucide="file-text" style="width:12px;height:12px;color:#60a5fa;flex-shrink:0;"></i>
                  <span><strong>Nota:</strong> \${esc(storedNotes[item.id].text)}</span>
                </div>\` : ''}
              \${showDeliverable && deliverableText ? \`
                <div class="callout-deliverable" style="margin-top: 0.45rem;">
                  <i data-lucide="zap"></i>
                  <span><strong>O que entrega:</strong> \${deliverableText}</span>
                </div>\` : ''}
              \${showExample && exampleText ? \`
                <div class="callout-example" style="margin-top: 0.35rem;">
                  <i data-lucide="lightbulb"></i>
                  <span><strong>Exemplo prático:</strong> \${exampleText}</span>
                </div>\` : ''}
            </div>

            \${footActionsHtml}
          </div>
        </article>
      \`;
    }).join('');
  }

  $('#resultCount').textContent = \`Exibindo \${items.length} de \${state.items.length} recursos\`;
  updateKpis();
  lucide.createIcons();
  attachCardEvents();
}`;

// Substitui renderCards antiga
const startRenderCards = content.indexOf('function renderCards() {');
const endRenderCards = content.indexOf('function attachCardEvents() {');

if (startRenderCards !== -1 && endRenderCards !== -1) {
  content = content.slice(0, startRenderCards) + newRenderCardsFunction + '\n\n' + content.slice(endRenderCards);
  console.log('✓ Função renderCards() substituída com a nova arquitetura de cards e headlines.');
} else {
  console.error('Falha ao encontrar delimitações de renderCards()');
}

// Atualizar attachCardEvents para ignorar cliques em todos os botões de ação do card
const oldAttachCardEvents = `function attachCardEvents() {
  $$('.card-item, .list-row-item, .tile-button-card').forEach(card => {
    card.onclick = e => {
      if (e.target.closest('.btn-trash-toggle') || e.target.closest('.card-seen-toggle') || e.target.closest('.card-favorite-toggle') || e.target.closest('.icon-action-btn') || e.target.closest('.meta-chip-tag')) return;
      const item = state.items.find(x => x.id === card.dataset.id);
      if (item) openDetailModal(item);
    };
  });`;

const newAttachCardEvents = `function attachCardEvents() {
  $$('.card-item, .list-row-item, .tile-button-card').forEach(card => {
    card.onclick = e => {
      if (
        e.target.closest('.btn-trash-toggle') ||
        e.target.closest('.card-quick-trash') ||
        e.target.closest('.btn-seen-toggle') ||
        e.target.closest('.card-seen-toggle') ||
        e.target.closest('.card-favorite-toggle') ||
        e.target.closest('.icon-action-btn') ||
        e.target.closest('.btn-open-notes') ||
        e.target.closest('.btn-open-export') ||
        e.target.closest('.btn-open-documenso') ||
        e.target.closest('.meta-chip-tag')
      ) return;
      const item = state.items.find(x => x.id === card.dataset.id);
      if (item) openDetailModal(item);
    };
  });`;

if (content.includes(oldAttachCardEvents)) {
  content = content.replace(oldAttachCardEvents, newAttachCardEvents);
  console.log('✓ attachCardEvents() atualizado para prevenir conflito de cliques.');
}

// Salvar nexus-acervo.html
fs.writeFileSync(nexusHtmlPath, content, 'utf8');
console.log('nexus-acervo.html atualizado.');
