import { execSync } from 'node:child_process';

const testScript = `
(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  
  // 1. Verificar novos itens carregados
  const item1 = state.items.find(x => x.id === 'conhecimento-metodo-10-dias');
  const item2 = state.items.find(x => x.id === 'conhecimento-checklist-seguranca');
  const item3 = state.items.find(x => x.id === 'repo-fcksignups');
  const item4 = state.items.find(x => x.id === 'conhecimento-cssbuy-guia');
  
  const initialActiveCount = getFilteredItems().length;
  console.log('Total de itens no estado:', state.items.length);
  console.log('Itens novos encontrados:', Boolean(item1 && item2 && item3 && item4));
  
  // 2. Testar exclusão de um item
  const testId = 'conhecimento-metodo-10-dias';
  deleteItem(testId);
  await wait(100);
  
  const inActiveListAfterDelete = getFilteredItems().some(x => x.id === testId);
  console.log('Item está na lista ativa após exclusão (deve ser false):', inActiveListAfterDelete);
  
  // 3. Testar busca: item excluído não pode aparecer na busca
  state.q = 'Jung';
  const searchResultsWhileActive = getFilteredItems();
  console.log('Resultados de busca por "Jung" no acervo ativo (deve ser 0):', searchResultsWhileActive.length);
  state.q = '';
  
  // 4. Mudar para a aba de Excluídos
  state.readFilter = 'deleted';
  syncFilterControls();
  renderCards();
  await wait(100);
  
  const deletedItems = getFilteredItems();
  console.log('Total na lixeira de Excluídos (deve ser >= 1):', deletedItems.length);
  const foundInDeleted = deletedItems.some(x => x.id === testId);
  console.log('Item de teste encontrado na aba Excluídos (deve ser true):', foundInDeleted);
  
  // 5. Testar restauração do item
  restoreItem(testId);
  await wait(100);
  
  const deletedAfterRestore = getFilteredItems().some(x => x.id === testId);
  console.log('Item ainda está na lixeira após restaurar (deve ser false):', deletedAfterRestore);
  
  // Voltar para Todos
  state.readFilter = 'all';
  syncFilterControls();
  renderCards();
  await wait(100);
  
  const inActiveListAfterRestore = getFilteredItems().some(x => x.id === testId);
  console.log('Item retornou com sucesso para a lista ativa (deve ser true):', inActiveListAfterRestore);
  
  return {
    success: !inActiveListAfterDelete && searchResultsWhileActive.length === 0 && foundInDeleted && !deletedAfterRestore && inActiveListAfterRestore,
    totalItems: state.items.length,
    activeCount: getFilteredItems().length
  };
})()
`.trim().replace(/\n/g, ' ');

const cmd = `agent-browser open "http://127.0.0.1:3000" && agent-browser wait 1500 && agent-browser eval "${testScript.replace(/"/g, '\\"')}"`;
console.log('Executando teste via browser...');
try {
  const out = execSync(cmd, { shell: 'cmd.exe', encoding: 'utf8' });
  console.log('Output do Browser:\n', out);
} catch (e) {
  console.error('Erro na execução do teste:', e.stdout || e.message);
}
