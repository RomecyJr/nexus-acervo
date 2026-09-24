import { execSync } from 'node:child_process';

const code = `
openNotesModal('repo-documenso');
document.getElementById('notesTextInput').value = 'Minha nota de teste sem perda';
closeNotesModal();
localStorage.getItem('nexus_personal_notes');
`.trim().replace(/\n/g, ' ');

const cmd = `agent-browser open http://127.0.0.1:3000 && agent-browser eval "${code.replace(/"/g, '\\"')}"`;
console.log('Executando:', cmd);
const result = execSync(cmd, { shell: 'cmd.exe', encoding: 'utf8' });
console.log('Resultado:');
console.log(result);
