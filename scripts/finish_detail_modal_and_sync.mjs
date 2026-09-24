import fs from 'node:fs';
import path from 'node:path';

const files = ['index.html', 'nexus-acervo.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Injeta bloco de Meus Insights Pessoais no modal de detalhes caso não exista
  if (!content.includes('id="modalUserNotesWrap"')) {
    const target = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));`;
    const replacement = `<!-- MEUS INSIGHTS PESSOAIS (SEGUNDO CÉREBRO) -->
      <div id="modalUserNotesWrap" style="display: none; padding: 0.85rem 1rem; font-size: 0.85rem; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: var(--radius); margin-bottom: 0.6rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
          <div style="display: flex; align-items: center; gap: 0.4rem; color: #60a5fa; font-size: 0.76rem; font-weight: 700;">
            <i data-lucide="file-edit" style="width: 14px; height: 14px;"></i>
            <span>MEUS INSIGHTS & NOTAS DE ESTUDO:</span>
          </div>
          <button class="btn sm" id="btnModalEditNotes" style="font-size: 0.7rem; height: 24px; padding: 0 0.5rem; color: #60a5fa; border-color: rgba(59, 130, 246, 0.3);"><i data-lucide="edit-3" style="width: 11px; height: 11px;"></i> Editar Nota</button>
        </div>
        <p id="modalUserNotesText" style="color: var(--text); line-height: 1.5; white-space: pre-line; margin: 0;">-</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));`;
    
    content = content.replace(target, replacement);
  }

  // 2. Substitui os botões do footer do modal de detalhes para incluir Anotações e Exportar
  const oldButtonsRegex = /<div style="display: flex; gap: 0\.75rem; margin-top: 0\.4rem;">[\s\S]*?<button class="btn" id="btnModalCopy"[\s\S]*?<\/div>/;
  const newButtons = `<div style="display: flex; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap;">
        <a class="btn primary" id="btnModalDirect" target="_blank" rel="noopener noreferrer" style="flex: 1; min-width: 150px;"><i data-lucide="external-link"></i> Abrir Recurso</a>
        <button class="btn secondary" id="btnModalNotesAction" style="flex: 1; min-width: 115px;"><i data-lucide="file-text"></i> Anotações</button>
        <button class="btn secondary" id="btnModalExportAction" style="flex: 1; min-width: 115px;"><i data-lucide="share-2"></i> Exportar</button>
        <button class="btn" id="btnModalCopy" style="flex: 1; min-width: 115px;"><i data-lucide="copy"></i> Copiar Link</button>
      </div>`;

  content = content.replace(oldButtonsRegex, newButtons);

  // 3. Atualiza openDetailModal para preencher os dados de notas do usuário
  if (!content.includes('modalUserNotesWrap.style.display')) {
    const modalTarget = `$('#btnModalDirect').href = safeUrl(item.url);`;
    const modalRepl = `$('#btnModalDirect').href = safeUrl(item.url);

  const userNotesWrap = $('#modalUserNotesWrap');
  const userNotesText = $('#modalUserNotesText');
  const userNote = storedNotes[item.id];
  if (userNotesWrap && userNotesText) {
    if (userNote && userNote.text) {
      userNotesWrap.style.display = 'block';
      userNotesText.textContent = userNote.text + (userNote.action ? \`\\n\\n🎯 Onde aplicar: \${userNote.action}\` : '');
    } else {
      userNotesWrap.style.display = 'none';
    }
  }`;
    content = content.replace(modalTarget, modalRepl);
  }

  // 4. Injeta handlers para os botões do modal no DOMContentLoaded se ainda não existirem
  if (!content.includes('btnModalNotesAction')) {
    const domLoadedTarget = `$('#btnModalToggleSeen')?.addEventListener('click', () => {`;
    const domLoadedRepl = `$('#btnModalNotesAction')?.addEventListener('click', () => {
    if (state.selectedItem) openNotesModal(state.selectedItem.id);
  });

  $('#btnModalEditNotes')?.addEventListener('click', () => {
    if (state.selectedItem) openNotesModal(state.selectedItem.id);
  });

  $('#btnModalExportAction')?.addEventListener('click', () => {
    if (state.selectedItem) openExportModal(state.selectedItem.id);
  });

  $('#btnModalToggleSeen')?.addEventListener('click', () => {`;
    content = content.replace(domLoadedTarget, domLoadedRepl);
  }

  // Previne qualquer quebra acidental de $$ em $
  content = content.replace(/([^\$])\$\(([^)]+)\)\.forEach/g, (match, p1, p2) => {
    return `${p1}\$\$(${p2}).forEach`;
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Atualizado com sucesso: ${file}`);
}
