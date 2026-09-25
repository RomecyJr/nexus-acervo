# Nexus Acervo — Diretrizes Canônicas de Engenharia, Design & Curadoria ($50k Standard)

Este documento estabelece as diretrizes obrigatórias de arquitetura, qualidade de código, design visual e curadoria de conteúdo para o **Nexus Acervo**, superando padrões de mercado (Fable 5.1 e GPT Astra no modo Alto).

---

## 1. Padrão Ouro: Sindre Sorhus Awesome First
- **Consulta Obrigatória**: Toda decisão de biblioteca, arquitetura, design system, testes ou orquestração deve consultar o ecossistema canônico [sindresorhus/awesome](https://github.com/sindresorhus/awesome).
- **Pergunta de Elevação Contínua**: Para cada função, componente de UI, filtro ou modal, responda: *"Como elevo o nível desta ferramenta/função?"*, buscando as referências validadas do Awesome.

---

## 2. Curadoria Editorial de Alto Padrão
- **Regra de Entrada**: Nenhum item entra no acervo se não responder em 10 segundos: *O que é? Para quem é? Qual o entregável prático? Qual a ação concreta recomendada?*
- **Campos Estruturais Obrigatórios**:
  - `id`: slug semântico estável (proibido prefixo `custom-` em catálogo publicado).
  - `title`: fórmula de intenção (`Nome — Ação ou Proposta de Valor`).
  - `description`: ≥ 50 caracteres, redação executiva.
  - `deliverable`: ≥ 30 caracteres, resultado observável.
  - `practicalExample`: ≥ 30 caracteres, caso concreto.
  - `targetAudience`: personas reais (proibido *"Qualquer pessoa"*).
  - `tags`: ≥ 2 tags específicas (padronização estrita de **IA**, nunca *I.A*).
  - Metadados premium: `summary`, `keyTakeaways`, `action`, `effort`, `impact`, `confidence`.

---

## 3. Design Engineering & Anti-AI-Slop (Pentagram, Linear & Emil Kowalski)
- **Zero AI Slop**: Proibido gradientes fluorescentes cafonas (roxo-ciano-rosa), sparkles desnecessários e adjetivos inflados ("Supremo", "Mágico", "Elite").
- **Tipografia Suíça**: Plus Jakarta Sans com tracking negativo em títulos (`letter-spacing: -0.025em`), hierarquia ótica, elipses tipográficas (`…`) e números tabulares (`font-variant-numeric: tabular-nums`).
- **Física de Animação Tátil (Emil Kowalski)**:
  - Nunca utilizar `transition: all`. Especificar sempre propriedades e tempos (`transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms ease-out`).
  - Resposta tátil em botões: `:active { transform: scale(0.97); }`.
  - Modais com abertura suave física: entrada a partir de `scale(0.95)` e `opacity: 0` para `scale(1)` e `opacity: 1`.
  - Suporte total a `prefers-reduced-motion`.
- **Thumbnails Profissionais**:
  - Proibida a repetição de fotos genéricas de banco de imagens (Unsplash).
  - Repositórios GitHub: cartões OpenGraph oficiais em alta definição (`https://opengraph.githubassets.com/1/{owner}/{repo}`).
  - Ferramentas Web: capas com logos vetoriais oficiais (128px) sobre base em ardósia/vidro fosco.
  - Vídeos: thumbnails oficiais em alta definição (`hqdefault.jpg`).

---

## 4. Governança e Pipeline de Validação
- `npm run sync`: sincroniza `catalog.json` para `catalog.js` e espelha em `index.html`.
- `node scripts/lint_editorial.mjs`: validação semântica e linter editorial estrito.
- `npm test`: validação de schema Ajv 2020, integridade do JavaScript inline e conformidade de acessibilidade.
