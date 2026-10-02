# Nexus Acervo — contexto para quem abre o projeto

App estático: um HTML, um JSON, zero backend. Interface em português.

## Ligar agora

```bash
npm install
npm test
npm start
```

Abre em http://localhost:3000. Na primeira vez neste navegador, a tela pede um usuário/senha **locais**. Não altere as senhas hardcoded em `checkVaultCredentials`.

## O que editar

| Arquivo | Papel |
|---|---|
| `nexus-acervo.html` | Única fonte da UI. Nunca edite `index.html` à mão. |
| `data/catalog.json` | Catálogo. Depois: `npm test` (isso gera `data/catalog.js` e copia o HTML). |

`npm test` = sync + lint editorial + schema + JS + checagem estática (`scripts/check_static.mjs`).

## Regras que já quebraram o app

- `$('sel')` devolve **um** elemento. Listas usam `$$('sel')`.
- Token CSS novo precisa existir em `:root` **ou nos dois temas**.
- Paleta semântica só via tokens (`--success`, `--info`, `--danger`, `--warning`, `--accent`). Hex neon/emerald/sky fora dos blocos de tema falha o teste.
- Não declare “testado” sem ter rodado `npm test` (e preview no navegador, se a mudança for visual).
- Não commite `.claude/`, a pasta aninhada `09_Projeto_Informacoes/`, `.env`, senhas.

Padrão editorial e de design: `GEMINI.md`. Visão de produto e deploy: `README.md`.
