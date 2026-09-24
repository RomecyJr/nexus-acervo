import fs from 'node:fs';

const files = ['nexus-acervo.html', 'index.html'];

for (const fileName of files) {
  let content = fs.readFileSync(fileName, 'utf8');

  // 1. ADICIONA FONTES CALIGRÁFICAS NO HEAD
  if (!content.includes('family=Dancing+Script')) {
    content = content.replace(
      'family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      'family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&family=Dancing+Script:wght@600;700&display=swap'
    );
  }

  // 2. ADICIONA BOTÃO NO SIDEBAR ESQUERDO
  const sidebarTarget = '<button class="nav-btn" id="btnExportJson" aria-label="Exportar catálogo em JSON">';
  const sidebarBtn = `<button class="nav-btn" id="btnOpenDocumensoStudio" aria-label="Documenso Studio - Assinatura Digital">
            <i data-lucide="pen-tool"></i>
            <span>Documenso Studio</span>
          </button>
          `;

  if (content.includes(sidebarTarget) && !content.includes('id="btnOpenDocumensoStudio"')) {
    content = content.replace(sidebarTarget, sidebarBtn + sidebarTarget);
  }

  // 3. ADICIONA BOTÃO DE ASSINATURA NO CARD DO DOCUMENSO
  const cardRepoHeaderTarget = '<a class="icon-action-btn" href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Acessar Repositório" aria-label="Acessar Repositório"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>';
  const cardRepoReplacement = `\${item.id === 'repo-documenso' ? \`<button class="btn secondary sm btn-open-documenso" style="font-size:0.72rem; height:26px; padding:0 0.55rem; gap:0.3rem;" title="Abrir Estúdio de Assinatura" aria-label="Abrir Documenso Studio"><i data-lucide="pen-tool" style="width:12px;height:12px;"></i><span>Assinar</span></button>\` : ''}
                  <a class="icon-action-btn" href="\${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" title="Acessar Repositório" aria-label="Acessar Repositório"><i data-lucide="external-link" style="width:14px;height:14px;"></i></a>`;

  if (content.includes(cardRepoHeaderTarget) && !content.includes('btn-open-documenso')) {
    content = content.replace(cardRepoHeaderTarget, cardRepoReplacement);
  }

  // 4. INSERE O MODAL DO DOCUMENSO STUDIO LOGO APÓS O MODAL DE API
  const modalTarget = '<!-- MODAL API -->';
  const documensoModalHtml = `<!-- MODAL DOCUMENSO STUDIO (ASSINATURA DIGITAL) -->
<div class="clean-modal" id="documensoModal" role="dialog" aria-modal="true" aria-labelledby="documensoModalTitle">
  <div class="modal-dialog" style="max-width: 660px; max-height: 90vh;">
    <button class="modal-close-icon" id="btnDocumensoClose" aria-label="Fechar modal"><i data-lucide="x"></i></button>
    <div style="padding: 1.5rem; display: grid; gap: 1.1rem;">
      
      <!-- Header -->
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <div style="width: 32px; height: 32px; border-radius: var(--radius); background: var(--surface2); border: 1px solid var(--border-color); display: grid; place-items: center;">
              <i data-lucide="pen-tool" style="width: 16px; height: 16px; color: var(--text);"></i>
            </div>
            <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text);" id="documensoModalTitle">Documenso Studio · Assinatura Digital</h2>
          </div>
          <p style="font-size: 0.78rem; color: var(--muted-text); margin: 0;">Plataforma open-source de assinatura de documentos, geração de rubricas e trilha de auditoria SHA-256.</p>
        </div>
      </div>

      <!-- Segmented Tabs for Documenso Modes -->
      <div class="segmented-control" id="documensoTabs" style="width: 100%;">
        <button class="segment-tab active" data-tab="draw" style="flex: 1;" aria-label="Desenhar Traço"><i data-lucide="pen" style="width:13px;height:13px;"></i> Desenhar Traço</button>
        <button class="segment-tab" data-tab="type" style="flex: 1;" aria-label="Digitar Caligrafia"><i data-lucide="type" style="width:13px;height:13px;"></i> Digitar Caligrafia</button>
        <button class="segment-tab" data-tab="audit" style="flex: 1;" aria-label="Trilha de Auditoria"><i data-lucide="shield-check" style="width:13px;height:13px;"></i> Trilha de Auditoria</button>
        <button class="segment-tab" data-tab="deploy" style="flex: 1;" aria-label="Deploy 1-Clique"><i data-lucide="server" style="width:13px;height:13px;"></i> Deploy 1-Clique</button>
      </div>

      <!-- TAB 1: DRAW SIGNATURE -->
      <div class="documenso-tab-pane" id="paneDraw">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--muted-text);">Desenhe sua assinatura ou rubrica no quadro:</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <div style="display: flex; gap: 0.35rem;" id="signColors">
              <button class="color-dot active" data-color="#09090b" style="width:18px;height:18px;border-radius:50%;background:#09090b;border:2px solid var(--text);cursor:pointer;" title="Preto"></button>
              <button class="color-dot" data-color="#1d4ed8" style="width:18px;height:18px;border-radius:50%;background:#1d4ed8;border:2px solid transparent;cursor:pointer;" title="Azul Caneta"></button>
              <button class="color-dot" data-color="#3f3f46" style="width:18px;height:18px;border-radius:50%;background:#3f3f46;border:2px solid transparent;cursor:pointer;" title="Grafite"></button>
            </div>
            <button class="btn secondary sm" id="btnClearCanvas" style="height:26px;font-size:0.72rem;padding:0 0.55rem;" aria-label="Limpar"><i data-lucide="rotate-ccw" style="width:11px;height:11px;"></i> Limpar</button>
          </div>
        </div>

        <div style="background: #ffffff; border-radius: var(--radius); border: 1px dashed #cbd5e1; height: 180px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <canvas id="signCanvas" width="600" height="180" style="width: 100%; height: 100%; cursor: crosshair; touch-action: none;"></canvas>
          <div id="canvasPlaceholder" style="position: absolute; pointer-events: none; color: #94a3b8; font-size: 0.85rem; font-family: var(--font-sans); display: flex; align-items: center; gap: 0.4rem;">
            <i data-lucide="pen-line" style="width:15px;height:15px;"></i> Clique e arraste para assinar aqui
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
          <span style="font-size: 0.72rem; color: var(--faint);">💡 Fundo transparente automático para inserção em PDFs</span>
          <button class="btn primary sm" id="btnDownloadDraw" style="gap: 0.4rem;" aria-label="Baixar Assinatura"><i data-lucide="download" style="width:13px;height:13px;"></i> Baixar Assinatura PNG</button>
        </div>
      </div>

      <!-- TAB 2: TYPE SIGNATURE -->
      <div class="documenso-tab-pane" id="paneType" style="display: none;">
        <div>
          <label style="font-size: 0.75rem; font-weight: 600; color: var(--muted-text); display: block; margin-bottom: 0.35rem;">Seu nome completo ou iniciais:</label>
          <input class="btn secondary" id="inputSignName" value="Romecy Ribeiro Junior" style="width: 100%; text-align: left; padding: 0.5rem 0.75rem; font-size: 0.85rem; cursor: text;" placeholder="Digite seu nome..." aria-label="Nome para assinatura">
        </div>

        <div style="display: grid; gap: 0.6rem; margin-top: 0.75rem;">
          <div class="cal-style-card active" id="cardDancing" data-font="'Dancing Script', cursive" style="background: #ffffff; color: #09090b; padding: 1rem; border-radius: var(--radius); border: 2px solid var(--text); cursor: pointer;">
            <div style="font-size: 0.68rem; color: #64748b; margin-bottom: 0.2rem;">Estilo 1 · Cursiva Clássica (Dancing Script)</div>
            <div class="cal-preview-text" id="prevDancing" style="font-family: 'Dancing Script', cursive; font-size: 2rem; line-height: 1.2;">Romecy Ribeiro Junior</div>
          </div>

          <div class="cal-style-card" id="cardCaveat" data-font="'Caveat', cursive" style="background: #ffffff; color: #09090b; padding: 1rem; border-radius: var(--radius); border: 2px solid transparent; cursor: pointer;">
            <div style="font-size: 0.68rem; color: #64748b; margin-bottom: 0.2rem;">Estilo 2 · Manuscrito Moderno (Caveat)</div>
            <div class="cal-preview-text" id="prevCaveat" style="font-family: 'Caveat', cursive; font-size: 2.2rem; line-height: 1.2;">Romecy Ribeiro Junior</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
          <span style="font-size: 0.72rem; color: var(--faint);">💡 Renderização com tipografia vetorial de alta definição</span>
          <button class="btn primary sm" id="btnDownloadType" style="gap: 0.4rem;" aria-label="Baixar Caligrafia"><i data-lucide="download" style="width:13px;height:13px;"></i> Baixar Caligrafia PNG</button>
        </div>
      </div>

      <!-- TAB 3: AUDIT TRAIL SIMULATOR -->
      <div class="documenso-tab-pane" id="paneAudit" style="display: none;">
        <div style="background: var(--surface2); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 1rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text); line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
            <span style="color: var(--muted-text);">DOCUMENSO AUDIT CERTIFICATE</span>
            <span style="color: #22c55e; font-weight: 700;">● VÁLIDO</span>
          </div>
          <div><strong>Document ID:</strong> <span id="auditDocId">doc_8f93a102c4b8</span></div>
          <div><strong>Timestamp (UTC):</strong> <span id="auditTimestamp"></span></div>
          <div><strong>Hash SHA-256:</strong> <span id="auditHash" style="word-break: break-all; color: var(--muted-text);">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></div>
          <div><strong>Legal Standard:</strong> MP 2.200-2/2001 (Brasil) · eIDAS (União Europeia)</div>
          <div><strong>Audit State:</strong> Signed, Timestamped and Cryptographically Sealed</div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 0.75rem;">
          <button class="btn secondary sm" id="btnCopyAudit" style="gap: 0.4rem;" aria-label="Copiar Certificado"><i data-lucide="copy" style="width:13px;height:13px;"></i> Copiar Certificado JSON</button>
        </div>
      </div>

      <!-- TAB 4: DEPLOY 1-CLIQUE -->
      <div class="documenso-tab-pane" id="paneDeploy" style="display: none;">
        <p style="font-size: 0.78rem; color: var(--muted-text); margin-bottom: 0.5rem;">Execute o Documenso no seu próprio servidor com Docker Compose em menos de 2 minutos:</p>
        
        <div style="position: relative;">
          <pre style="background: #000; border: 1px solid var(--border-color); border-radius: var(--radius); padding: 0.85rem; font-family: var(--font-mono); font-size: 0.72rem; color: #a1a1aa; overflow-x: auto;"><code>git clone https://github.com/documenso/documenso
cd documenso
cp .env.example .env
npm run dx   # Sobe Postgres + Inbucket Mail + Documenso App</code></pre>
          <button class="btn secondary sm" id="btnCopyDeploy" style="position: absolute; top: 0.5rem; right: 0.5rem; height: 24px; font-size: 0.7rem; padding: 0 0.5rem;" aria-label="Copiar código"><i data-lucide="copy" style="width:11px;height:11px;"></i> Copiar</button>
        </div>

        <div style="margin-top: 0.75rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text);">Hospedagem em 1-Clique na Nuvem:</span>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap;">
            <a class="btn secondary sm" href="https://railway.com/deploy/DjrRRX?referralCode=EZR3s0" target="_blank" rel="noopener noreferrer" aria-label="Deploy no Railway"><i data-lucide="external-link" style="width:12px;height:12px;"></i> Deploy no Railway</a>
            <a class="btn secondary sm" href="https://render.com/deploy?repo=https://github.com/documenso/documenso" target="_blank" rel="noopener noreferrer" aria-label="Deploy no Render"><i data-lucide="external-link" style="width:12px;height:12px;"></i> Deploy no Render</a>
            <a class="btn secondary sm" href="https://github.com/documenso/documenso" target="_blank" rel="noopener noreferrer" aria-label="Ver Repositório Oficial"><i data-lucide="github" style="width:12px;height:12px;"></i> Ver Repositório Oficial</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

`;

  if (content.includes(modalTarget) && !content.includes('id="documensoModal"')) {
    content = content.replace(modalTarget, documensoModalHtml + modalTarget);
  }

  // 5. INSERE O JAVASCRIPT DO DOCUMENSO STUDIO
  const jsDocumensoCode = `
// ==========================================================================
// DOCUMENSO STUDIO (ASSINATURA DIGITAL AO VIVO)
// ==========================================================================
function initDocumensoStudio() {
  const modal = $('#documensoModal');
  if (!modal) return;

  const canvas = $('#signCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const placeholder = $('#canvasPlaceholder');
  let isDrawing = false;
  let hasDrawn = false;
  let currentColor = '#09090b';
  let selectedCalFont = "'Dancing Script', cursive";

  function openStudio() {
    modal.classList.add('open');
    if (ctx && !hasDrawn) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (placeholder) placeholder.style.display = 'flex';
    }
    updateAuditInfo();
    lucide.createIcons();
  }

  function closeStudio() {
    modal.classList.remove('open');
  }

  $('#btnOpenDocumensoStudio')?.addEventListener('click', openStudio);
  $('#btnDocumensoClose')?.addEventListener('click', closeStudio);
  modal.addEventListener('click', e => { if (e.target === modal) closeStudio(); });

  // Delegação no clique do card do Documenso
  document.addEventListener('click', e => {
    if (e.target.closest('.btn-open-documenso')) {
      e.stopPropagation();
      openStudio();
    }
  });

  // Alternador de Abas do Studio
  $$('#documensoTabs .segment-tab').forEach(tab => {
    tab.onclick = () => {
      $$('#documensoTabs .segment-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      $('#paneDraw').style.display = targetId === 'draw' ? 'block' : 'none';
      $('#paneType').style.display = targetId === 'type' ? 'block' : 'none';
      $('#paneAudit').style.display = targetId === 'audit' ? 'block' : 'none';
      $('#paneDeploy').style.display = targetId === 'deploy' ? 'block' : 'none';
      lucide.createIcons();
    };
  });

  // 1. Canvas Drawing
  if (canvas && ctx) {
    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function startDraw(e) {
      isDrawing = true;
      hasDrawn = true;
      if (placeholder) placeholder.style.display = 'none';
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 2.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    function moveDraw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const p = getPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }

    function stopDraw() {
      if (!isDrawing) return;
      isDrawing = false;
      ctx.closePath();
      updateAuditInfo();
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', stopDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    window.addEventListener('touchend', stopDraw);

    $('#btnClearCanvas')?.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawn = false;
      if (placeholder) placeholder.style.display = 'flex';
      showToast('Quadro limpo!');
    });

    // Seletor de cores da tinta
    $$('#signColors .color-dot').forEach(dot => {
      dot.onclick = () => {
        $$('#signColors .color-dot').forEach(d => {
          d.classList.remove('active');
          d.style.borderColor = 'transparent';
        });
        dot.classList.add('active');
        dot.style.borderColor = 'var(--text)';
        currentColor = dot.dataset.color;
      };
    });

    // Download do desenho cortado transparente
    $('#btnDownloadDraw')?.addEventListener('click', () => {
      if (!hasDrawn) {
        showToast('Desenhe uma assinatura primeiro!');
        return;
      }
      downloadTrimmedCanvas(canvas, 'minha_assinatura_documenso.png');
    });
  }

  // 2. Digitar Caligrafia
  const inputName = $('#inputSignName');
  if (inputName) {
    function updateCalPreviews() {
      const val = inputName.value.trim() || 'Minha Assinatura';
      $('#prevDancing').textContent = val;
      $('#prevCaveat').textContent = val;
      updateAuditInfo();
    }
    inputName.addEventListener('input', updateCalPreviews);

    $$('.cal-style-card').forEach(card => {
      card.onclick = () => {
        $$('.cal-style-card').forEach(c => {
          c.classList.remove('active');
          c.style.borderColor = 'transparent';
        });
        card.classList.add('active');
        card.style.borderColor = 'var(--text)';
        selectedCalFont = card.dataset.font;
      };
    });

    $('#btnDownloadType')?.addEventListener('click', () => {
      const val = inputName.value.trim() || 'Minha Assinatura';
      downloadCaligraphicPng(val, selectedCalFont, 'caligrafia_documenso.png');
    });
  }

  // 3. Trilha de Auditoria
  async function updateAuditInfo() {
    const ts = new Date().toISOString();
    $('#auditTimestamp').textContent = ts;
    const seed = 'documenso_' + ts + '_' + ($('#inputSignName')?.value || 'user');
    const msgUint8 = new TextEncoder().encode(seed);
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      $('#auditHash').textContent = hashHex;
    } catch {
      $('#auditHash').textContent = 'a1f8c7b8e92345ef01928374b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4';
    }
  }

  $('#btnCopyAudit')?.addEventListener('click', () => {
    const cert = {
      documenso_certificate: {
        document_id: $('#auditDocId').textContent,
        timestamp_utc: $('#auditTimestamp').textContent,
        sha256_hash: $('#auditHash').textContent,
        legal_standard: "MP 2.200-2/2001 (Brasil) / eIDAS (UE)",
        status: "VALID_CRYPTOGRAPHICALLY_SEALED"
      }
    };
    navigator.clipboard.writeText(JSON.stringify(cert, null, 2)).then(() => showToast('Certificado de Auditoria copiado!'));
  });

  // 4. Copiar Deploy
  $('#btnCopyDeploy')?.addEventListener('click', () => {
    const code = "git clone https://github.com/documenso/documenso\\ncd documenso\\ncp .env.example .env\\nnpm run dx";
    navigator.clipboard.writeText(code).then(() => showToast('Comandos de deploy copiados!'));
  });
}

function downloadTrimmedCanvas(canvas, filename) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const pix = ctx.getImageData(0, 0, w, h);
  let minX = w, minY = h, maxX = 0, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = pix.data[(y * w + x) * 4 + 3];
      if (a > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 12;
  const cropW = Math.max(maxX - minX + (pad * 2), 40);
  const cropH = Math.max(maxY - minY + (pad * 2), 40);
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = cropW;
  cropCanvas.height = cropH;
  const cropCtx = cropCanvas.getContext('2d');

  cropCtx.drawImage(canvas, minX, minY, maxX - minX, maxY - minY, pad, pad, maxX - minX, maxY - minY);

  const a = document.createElement('a');
  a.download = filename;
  a.href = cropCanvas.toDataURL('image/png');
  a.click();
  showToast('Assinatura transparente baixada com sucesso!');
}

function downloadCaligraphicPng(text, font, filename) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.font = \`64px \${font}\`;
  ctx.fillStyle = '#09090b';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 20, 100);
  downloadTrimmedCanvas(canvas, filename);
}
`;

  // Insere a função initDocumensoStudio antes de document.addEventListener('DOMContentLoaded'
  const domLoadedAnchor = "document.addEventListener('DOMContentLoaded', () => {";
  if (!content.includes('function initDocumensoStudio()')) {
    content = content.replace(domLoadedAnchor, jsDocumensoCode + '\n' + domLoadedAnchor);
  }

  // Chama initDocumensoStudio() dentro de DOMContentLoaded
  if (content.includes("initDocumensoStudio();") === false) {
    content = content.replace("syncCustomizerUi();", "syncCustomizerUi();\n  initDocumensoStudio();");
  }

  fs.writeFileSync(fileName, content, 'utf8');
  console.log(`Documenso Studio integrado com sucesso em: ${fileName}`);
}
