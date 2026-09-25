import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.resolve(rootDir, 'nexus-acervo.html');
const indexPath = path.resolve(rootDir, 'index.html');

console.log('=== POLIMENTO ESTÉTICO DOS AVATARES DO NEXUS CLAW ===');

let html = fs.readFileSync(htmlPath, 'utf8');

const CLAW_AVATAR_INNER = `<svg class="nexus-claw-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" stroke="url(#clawGrad)" stroke-width="1.8"/><path d="M7 10.5l5 3.5 5-3.5" stroke="#38bdf8" stroke-width="1.6"/><path d="M9 14.5l3 2 3-2" stroke="#38bdf8" stroke-width="1.4"/><circle cx="12" cy="8.5" r="1.5" fill="#38bdf8"/></svg>`;

// Substituir avatar da digitação
html = html.replace(
  `<div class="copilot-msg-avatar"><i data-lucide="key-round" style="width:14px;height:14px;"></i></div>\n      <div class="copilot-msg-content copilot-typing-indicator">`,
  `<div class="copilot-msg-avatar" style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.25);">${CLAW_AVATAR_INNER}</div>\n      <div class="copilot-msg-content copilot-typing-indicator">`
);

// Substituir avatar da mensagem da IA
html = html.replace(
  `<div class="copilot-msg-avatar"><i data-lucide="key-round" style="width:14px;height:14px;"></i></div>\n      <div class="copilot-msg-content">\n        \${formattedReply}`,
  `<div class="copilot-msg-avatar" style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.25);">${CLAW_AVATAR_INNER}</div>\n      <div class="copilot-msg-content">\n        \${formattedReply}`
);

// Substituir avatar da limpeza de histórico
html = html.replace(
  `<div class="copilot-msg-avatar"><i data-lucide="key-round" style="width: 14px; height: 14px;"></i></div>\n          <div class="copilot-msg-content">\n            <p>Histórico limpo. Estou pronto para ajudar com novas questões de texto, imagens ou exploração do acervo!</p>`,
  `<div class="copilot-msg-avatar" style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.25);">${CLAW_AVATAR_INNER}</div>\n          <div class="copilot-msg-content">\n            <p>Histórico limpo. <strong>Nexus Claw</strong> pronto para minerar novos recursos, calibrar entregáveis ou analisar o acervo!</p>`
);

// Atualizar contadores estáticos de 76 para 77 itens
html = html.replaceAll('76 recursos catalogados', '77 recursos catalogados');
html = html.replaceAll('76 recursos de alta densidade', '77 recursos de alta densidade');
html = html.replaceAll('76 ITENS CARREGADOS', '77 ITENS CARREGADOS');

// Substituir o ícone de chave no botão de autenticação do cofre por shield-check
html = html.replace(
  `<button class="user-profile-btn" id="btnUserAuth" aria-label="Acessar Perfil e Cofre">\n        <i data-lucide="key-round" style="width:15px;height:15px;"></i>`,
  `<button class="user-profile-btn" id="btnUserAuth" aria-label="Acessar Perfil e Cofre">\n        <i data-lucide="shield-check" style="width:15px;height:15px;color:#34d399;"></i>`
);

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ Avatares do Nexus Claw e contadores sincronizados com sucesso.');
