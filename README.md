# Nexus Acervo

Dashboard privado e API-ready para organizar ferramentas, vídeos, repositórios e conhecimento por segmento. O catálogo inicial foi estruturado a partir do relatório consolidado fornecido pelo proprietário.

## Abrir localmente

```bash
npm test
npm run serve
```

Abra `nexus-acervo.html`. Para uso totalmente offline, os dados já estão embutidos em `data/catalog.js`; o arquivo canônico é `data/catalog.json`.

## Atualizar o catálogo

1. Edite `data/catalog.json`.
2. Execute `npm run sync` para regenerar `data/catalog.js`.
3. Execute `npm test`.
4. Faça commit e push.

O contrato segue JSON Schema Draft 2020-12 em `schema/catalog.schema.json`. A futura API está descrita em `docs/openapi.yaml`.

## Publicar no GitHub privado

Autentique a GitHub CLI e, dentro desta pasta, execute:

```bash
git init
git add .
git commit -m "feat: cria Nexus Acervo"
gh repo create nexus-acervo --private --source=. --remote=origin --push
```

A opção `--private` impede publicação pública. Não versione `.env`, tokens, cookies ou chaves. Para agentes externos, prefira um token com escopo mínimo e acesso apenas a este repositório.

## Deploy Contínuo na Vercel (Online 24/7)

1. Acesse [vercel.com/new](https://vercel.com/new) e faça login com seu GitHub (`RomecyJr`).
2. Selecione o repositório privado `nexus-acervo` e clique em **Import**.
3. O arquivo `vercel.json` já configurou automaticamente o `buildCommand` (`npm test`) e a raiz do projeto.
4. Clique em **Deploy**. A Vercel gerará o link de produção (ex.: `https://nexus-acervo-romecyjr.vercel.app`).
5. **Cada push para a branch `main` no GitHub atualizará o site automaticamente em segundos!**

## Consumo por agentes

### Imediato, via GitHub privado

Leia `data/catalog.json` usando a API de conteúdo do GitHub com autenticação. Isso mantém uma única fonte de verdade e não exige backend.

### API dedicada

Implemente `docs/openapi.yaml` em Cloudflare Workers, FastAPI, Express ou outra camada protegida por Bearer Token. Mantenha o GitHub como fonte canônica e use cache com invalidação por webhook/commit.

## Estrutura

- `nexus-acervo.html`: dashboard estático responsivo.
- `data/catalog.json`: fonte canônica para humanos, agentes e API.
- `data/catalog.js`: cópia consumida diretamente pelo dashboard.
- `schema/catalog.schema.json`: contrato de validação.
- `docs/openapi.yaml`: especificação da API futura.
- `scripts/`: sincronização e QA.
- `.github/workflows/validate.yml`: validação automática.

## Segurança

O frontend não contém segredos. Autenticação e autorização devem existir na camada da API ou no acesso ao repositório privado. Antes de automações executarem comandos ou instalarem ferramentas, revise permissões, licenças e tratamento de dados.
