# Nexus Acervo

Biblioteca pessoal para organizar ferramentas, repositórios, vídeos e guias. Cada item tem o que entrega e um exemplo de uso. Roda no navegador, sem banco de dados.

**Ao vivo:** [nexus-acervo.vercel.app](https://nexus-acervo.vercel.app)

> A tela de entrada **não é autenticação de verdade**. Quem tem a URL lê o HTML e o catálogo. Use [Vercel Deployment Protection](https://vercel.com/docs/security/deployment-protection) se o acervo for privado.

---

## Em 2 minutos

Precisa de [Node.js 20+](https://nodejs.org/) e um navegador.

```bash
git clone https://github.com/RomecyJr/nexus-acervo.git
cd nexus-acervo
npm install
npm test
npm start
```

Abra [http://localhost:3000](http://localhost:3000).

Na primeira vez neste navegador o app pede um **usuário e uma senha locais**. Eles ficam só no `localStorage` deste computador. Se você já usa o acervo, clique em **Já tenho acesso. Entrar**.

`Ctrl+C` para o servidor.

---

## O que você pode fazer

- Filtrar por tipo (repositório, ferramenta, vídeo, conhecimento, carrossel), status e segmento
- Buscar por título, tag, entregável (`tipo:repo`, `stars:>5k`, `ia`)
- Ver em cards, lista ou mosaico
- Marcar visto, favoritar, anotar — tudo neste navegador
- Exportar o acervo em JSON
- (Opcional) conversar com o catálogo via [OpenRouter](https://openrouter.ai/) — a chave fica só neste navegador

---

## Como o projeto está organizado

Edite **só** `nexus-acervo.html` e `data/catalog.json`. O resto é gerado ou é contrato.

```
nexus-acervo.html     ← app (HTML + CSS + JS). Fonte da verdade da interface.
index.html            ← cópia gerada. Não edite à mão.
data/catalog.json     ← catálogo canônico (o que você edita)
data/catalog.js       ← cópia gerada para o navegador
schema/catalog.schema.json
docs/openapi.yaml     ← contrato da API futura
scripts/              ← sync, lint editorial, validação
.github/workflows/validate.yml
```

Notas, vistos e favoritos **não** vão para o Git. Moram no `localStorage` do navegador.

---

## Comandos

| Comando | O que faz |
|---|---|
| `npm start` | Sobe em http://localhost:3000 |
| `npm test` | Sincroniza o catálogo, valida schema, JS, tokens e paleta |
| `npm run sync` | Regenera `data/catalog.js` e copia o HTML para `index.html` |

---

## Atualizar o catálogo

1. Edite `data/catalog.json`.
2. Rode `npm test`.
3. Commit e push.

Cada item precisa responder em 10 segundos: o que é, para quem é, o que entrega, qual a ação. O linter editorial recusa o que faltar. O contrato está em `schema/catalog.schema.json`.

---

## Inteligência (opcional)

No app: **Configurar IA**. Cole uma chave do [OpenRouter](https://openrouter.ai/). Ela **não** entra no Git. Sem chave, o acervo continua inteiro — só o assistente fica desligado.

`.env.example` é para uma API futura. O frontend estático **não** lê `.env`.

---

## Publicar

O repositório já está ligado à Vercel. Push em `main` atualiza [nexus-acervo.vercel.app](https://nexus-acervo.vercel.app).

Para um fork:

1. `npm test` passando.
2. Importe o repositório em [vercel.com/new](https://vercel.com/new).
3. Sem build especial: é um site estático. `vercel.json` já manda os headers.
4. Se o acervo for privado, ligue Deployment Protection no painel da Vercel.

Não versione `.env`, tokens, cookies ou chaves. A tela de bloqueio impede olhares casuais, não um visitante determinado.

---

## Segurança, em uma frase

Tudo que o app “protege” (senha da tela, chave do OpenRouter, notas) vive no navegador e está no HTML ou no `localStorage`. Trate como biblioteca pessoal, não como cofre de produção.

---

## Licença e curadoria

Uso pessoal de [Romecy Veiga](https://github.com/RomecyJr). Itens de terceiros seguem a licença original de cada um (MIT, Apache, etc. — veja o próprio recurso).
