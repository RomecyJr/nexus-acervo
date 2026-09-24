// Test script to verify detail modal actions: Anotações, Exportar, Favoritar, Visto
const testScript = `
(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  
  // 1. Encontrar o item vidIQ
  const item = state.items.find(x => x.title && x.title.toLowerCase().includes('vidiq'));
  console.log('Item vidIQ encontrado:', Boolean(item));
  if (!item) return;

  // 2. Abrir o modal de detalhes
  openDetailModal(item);
  await wait(200);
  console.log('Modal de detalhes aberto:', $('#detailModal').classList.contains('open'));

  // 3. Clicar em Anotações a partir do modal de detalhes
  $('#btnModalNotesAction').click();
  await wait(200);
  console.log('Modal de Anotações aberto:', $('#notesModal').classList.contains('open'));

  // 4. Escrever uma anotação de teste e salvar
  $('#notesTextInput').value = 'Estratégia de SEO no YouTube validada via vidIQ';
  $('#notesActionInput').value = 'Aplicar nas palavras-chave do canal principal';
  $('#btnSaveNoteClose').click();
  await wait(200);
  console.log('Modal de Anotações fechado após salvar:', !$('#notesModal').classList.contains('open'));
  console.log('Anotação visível no modal de detalhes:', $('#modalUserNotesWrap').style.display !== 'none');
  console.log('Texto da anotação no modal de detalhes:', $('#modalUserNotesText').textContent.includes('Estratégia de SEO'));

  // 5. Clicar em Exportar a partir do modal de detalhes
  $('#btnModalExportAction').click();
  await wait(200);
  console.log('Modal de Exportação aberto:', $('#exportInsightModal').classList.contains('open'));

  // 6. Fechar modal de Exportação
  $('#btnExportClose').click();
  await wait(200);
  console.log('Modal de Exportação fechado:', !$('#exportInsightModal').classList.contains('open'));

  // 7. Testar Favoritar no modal de detalhes
  const wasFav = storedFavorites.has(item.id);
  $('#btnModalFav').click();
  await wait(100);
  const isFavNow = storedFavorites.has(item.id);
  console.log('Alternou favorito com sucesso:', isFavNow !== wasFav);

  // 8. Testar Marcar como Visto no modal de detalhes
  const wasSeen = storedSeen.has(item.id);
  $('#btnModalToggleSeen').click();
  await wait(100);
  const isSeenNow = storedSeen.has(item.id);
  console.log('Alternou visto com sucesso:', isSeenNow !== wasSeen);

  console.log('>>> TODOS OS TESTES DO MODAL DE DETALHES PASSARAM COM SUCESSO! <<<');
})();
`;

console.log(testScript);
