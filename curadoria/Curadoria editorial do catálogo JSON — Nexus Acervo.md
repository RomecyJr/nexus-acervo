# Curadoria editorial do catálogo JSON — Nexus Acervo

**Arquivo analisado:** `nexus_acervo_export_2026-09-24.json`  
**Itens analisados:** 77  
**Versão declarada:** 1.5.0  
**Data do arquivo:** 24 de setembro de 2026

## Diagnóstico

O JSON é uma boa fonte de conteúdo, mas ainda mistura três camadas que deveriam ser separadas:

1. **Catálogo editorial oficial**, com recursos revisados e publicados.
2. **Capturas pessoais recentes**, ainda sem metadados completos.
3. **Rascunhos e registros de teste**, que não deveriam chegar ao catálogo público.

O arquivo enviado possui **77 itens**, enquanto o catálogo atualmente publicado possui **74**. Isso indica que os dados enviados ainda não estão sincronizados com a produção ou que o deploy não foi feito após a exportação.

## Achados objetivos

| Achado | Quantidade | Tratamento recomendado |
|---|---:|---|
| Itens totais no JSON enviado | 77 | Manter como fonte de trabalho |
| Itens publicados na versão observada | 74 | Confirmar pipeline de deploy/sync |
| IDs duplicados | 0 | Bom |
| URLs duplicadas | 2 grupos | Revisar se são duplicatas ou conteúdos relacionados |
| Itens `custom-*` | 3 | Migrar para IDs editoriais após revisão |
| Registros de teste | 1 | Remover antes de publicar |
| Segmentos oficiais | 10 | Consolidar e validar taxonomia |
| Segmento claramente inválido | 1: `teste segmento` | Remover |
| Itens sem `targetAudience` | 4 | Preencher ou tornar campo opcional |
| Itens sem tags | 2 | Adicionar tags de busca |
| Descrições com menos de 40 caracteres | 3 | Reescrever |
| Exemplos genéricos | 2 | Substituir por aplicação concreta |
| Thumbnail repetida em 26 itens | 1 | Criar política de imagens |

## Correções imediatas

### 1. Remover o item de teste

O registro `custom-1790255595915`, com título `teste`, segmento `teste segmento` e URL do próprio Nexus, deve ser removido do catálogo oficial. Ele prejudica a percepção de qualidade e contamina filtros, métricas e recomendações.

### 2. Revisar os dois registros recentes `custom-*`

#### Curso OpemClaw

O item está funcionalmente incompleto: título, descrição, entrega e exemplo repetem a mesma expressão. Para se tornar um registro premium, precisa responder:

- O que é o curso?
- Para quem é?
- Qual transformação ou resultado promete?
- Qual o nível de conhecimento necessário?
- Quanto tempo leva?
- Qual é o formato?
- Qual o próximo passo prático depois de consumir?
- O acesso é público, pago ou restrito?

Sugestão de estrutura editorial:

```json
{
  "title": "OpenClaw nos Negócios — Imersão",
  "description": "Curso prático sobre aplicação de agentes e automações com OpenClaw em operações de negócio.",
  "deliverable": "Ao final, o aluno deve conseguir identificar um processo automatizável e prototipar uma solução orientada a resultado.",
  "practicalExample": "Mapear o atendimento de leads, identificar tarefas repetitivas e desenhar um fluxo de automação com critérios de sucesso.",
  "targetAudience": "Empreendedores, operadores e profissionais de negócios interessados em automação com IA",
  "tags": ["openclaw", "automacao", "agentes", "negocios", "curso"]
}
```

#### Vídeo sobre a terceira onda da IA

O texto possui potencial, mas está longo demais para ser usado como resumo de card e termina aparentemente truncado. Separar em três campos:

- **Resumo:** 2 ou 3 frases.
- **Teses principais:** 3 a 5 bullets ou tags.
- **Aplicação:** uma ação concreta que o usuário pode executar.

Também corrigir a padronização de `I.A` para `IA`.

### 3. Consolidar o grupo CSSBuy

Existem dois itens para `https://www.cssbuy.com/`: `CSSBuy` e `CSSBuy — Guia Prático de Redirecionamento e Logística na China`. Eles podem ser mantidos se um for a ferramenta e o outro um guia, mas precisam de tipos distintos e relação explícita:

```json
{
  "relation": {
    "type": "guide_for",
    "targetId": "tool-cssbuy"
  }
}
```

Se forem o mesmo recurso descrito duas vezes, consolidar em um único item.

### 4. Corrigir as métricas do Instagram

Sete itens compartilham a mesma URL de Instagram. Isso pode ser intencional se o post for um carrossel com várias métricas, mas o modelo atual faz cada métrica parecer um recurso independente. Há duas alternativas melhores:

- Um único item “Métricas essenciais de negócio”, com as sete métricas em `concepts`.
- Um item por métrica com `parentId` apontando para o carrossel original.

A segunda opção é melhor para busca, desde que a interface mostre “Parte de: Métricas essenciais”.

## Problema de taxonomia

O catálogo mistura segmentos editoriais muito amplos, como “Conteúdo e Mídia”, com segmentos muito específicos, como “Repositórios & Ferramentas Open Source”. Recomendo usar uma taxonomia em duas camadas:

| Camada | Exemplos |
|---|---|
| Área | Negócios, Conteúdo, Design, Desenvolvimento, Aprendizado, Operações |
| Intenção | Criar, Aprender, Automatizar, Pesquisar, Medir, Publicar, Comprar |

Assim, um item pode ser simultaneamente `area=Negócios` e `intent=Medir`, sem criar dezenas de segmentos rígidos.

O segmento `Conhecimento & Hacks` também deve ser revisado: “hacks” é genérico e tem menor valor editorial que uma intenção específica, como “Métodos e frameworks”.

## Modelo de dados recomendado

O modelo atual é bom para começar, mas precisa separar metadados editoriais, operacionais e de confiança.

```json
{
  "id": "video-terceira-onda-ia",
  "title": "A 3ª onda da IA: vender resultados, não ferramentas",
  "kind": "video",
  "area": "Negócios",
  "intents": ["Aprender", "Avaliar oportunidade"],
  "status": "reviewed",
  "summary": "Análise sobre negócios de IA orientados a resultado em mercados operacionais.",
  "keyTakeaways": [
    "SaaS está migrando de ferramenta para resultado",
    "Mercados operacionais podem oferecer oportunidades menos disputadas",
    "A oportunidade deve ser validada por critérios de demanda e defesa"
  ],
  "action": "Avaliar uma ideia própria usando as oito perguntas do vídeo.",
  "targetAudience": ["empreendedores", "profissionais de produto"],
  "tags": ["IA", "SaaS", "negocios", "oportunidades"],
  "effort": "20-40min",
  "impact": "alto",
  "confidence": "medium",
  "source": {
    "type": "youtube",
    "url": "https://www.youtube.com/watch?v=qqdoGv3ae-8",
    "checkedAt": "2026-09-24"
  },
  "relations": [],
  "createdAt": "2026-09-24T18:00:00Z",
  "updatedAt": "2026-09-24T18:00:00Z",
  "reviewedAt": null
}
```

### Campos prioritários a adicionar

- `summary`: resumo curto para card.
- `keyTakeaways`: aprendizados objetivos.
- `action`: próxima ação concreta.
- `area` e `intents`: taxonomia mais flexível.
- `effort`: tempo estimado.
- `impact`: impacto potencial.
- `confidence`: confiança na qualidade/relevância.
- `source.checkedAt`: data da última verificação.
- `reviewedAt`: última revisão editorial.
- `relations`: conexão entre itens.
- `visibility`: `private`, `shared` ou `public`.
- `contentStatus`: `draft`, `review`, `published`, `archived`.

## Padrão editorial recomendado

Cada registro publicado deveria passar por este teste:

> **Uma pessoa que nunca viu o item consegue entender em 10 segundos o que é, para quem serve e qual ação pode tomar?**

### Fórmula de título

Evitar títulos genéricos ou puramente nominais quando a intenção puder ser incorporada:

- Fraco: `Google AI Studio`
- Melhor: `Google AI Studio — Prototipagem e testes com Gemini`

- Fraco: `CSSBuy`
- Melhor: `CSSBuy — Redirecionamento, inspeção e consolidação de compras na China`

### Fórmula de descrição

`O que é + para quem é + resultado principal.`

### Fórmula de entrega

`Ao usar/estudar este recurso, você consegue [resultado observável].`

### Fórmula de exemplo

`Situação concreta + ação + resultado esperado.`

## Governança do catálogo

O README estabelece `data/catalog.json` como fonte canônica e `data/catalog.js` como cópia consumida pelo dashboard. Isso é correto, mas o processo precisa impedir que exportações locais incompletas ou dados de teste cheguem à produção.

### Pipeline recomendado

1. Editar ou importar dados em uma área de rascunho.
2. Validar schema.
3. Executar lint editorial.
4. Bloquear segmentos desconhecidos.
5. Bloquear títulos de teste e URLs duplicadas não justificadas.
6. Verificar campos obrigatórios e comprimento mínimo.
7. Gerar `catalog.js` a partir do JSON.
8. Executar testes de UI.
9. Gerar diff editorial legível.
10. Publicar somente após aprovação.

### Regras automáticas mínimas

- `title`: 5–100 caracteres.
- `description`: 60–500 caracteres.
- `deliverable`: 40–300 caracteres.
- `practicalExample`: 60–400 caracteres.
- `tags`: pelo menos 2 para itens publicados.
- `segment`/`area`: deve pertencer ao vocabulário oficial.
- `url`: HTTPS e sem credenciais embutidas.
- `id`: estável e sem prefixo temporal para itens editoriais.
- `status`: vocabulário fechado.
- Nenhum título contendo `teste`, salvo em ambiente de desenvolvimento.
- URLs duplicadas exigem `relation` ou aprovação explícita.

## Curadoria de thumbnails

A repetição da mesma imagem do Unsplash em 26 itens faz o catálogo parecer gerado por template. Para elevar a percepção:

- usar favicon/logo da fonte quando disponível;
- usar thumbnail oficial do conteúdo para vídeos e repositórios;
- criar imagens abstratas por área apenas quando não houver imagem oficial;
- registrar `thumbnailSource` e `thumbnailCheckedAt`;
- evitar depender diretamente de URLs externas sem fallback;
- definir proporção e tratamento visual por tipo de recurso.

## Prioridade de execução

### Agora

1. Remover o item de teste.
2. Revisar o curso OpenClaw.
3. Corrigir o resumo truncado do vídeo.
4. Resolver o grupo CSSBuy.
5. Modelar corretamente o carrossel de métricas.
6. Sincronizar os 77 itens com a produção ou explicar por que 3 não devem ser publicados.

### Próxima versão

1. Adicionar `summary`, `action`, `effort`, `impact`, `confidence` e `reviewedAt`.
2. Adotar IDs estáveis editoriais.
3. Implementar lint de conteúdo no CI.
4. Trocar “status” por estado editorial e estado de uso separados.
5. Criar relações entre itens.

### Evolução premium

1. Fila “Hoje” baseada em intenção, esforço e impacto.
2. Recomendações explicáveis usando relações e histórico de uso.
3. Changelog do catálogo.
4. Revisão periódica de links e fontes.
5. Score de qualidade editorial por item.

## Conclusão

O JSON mostra que o Nexus já possui matéria-prima suficiente para se tornar um produto diferenciado. O salto de qualidade não virá de adicionar centenas de novos links, mas de **revisar, normalizar, relacionar e tornar acionável o conteúdo já coletado**.

A regra central para a próxima fase deve ser:

> **Nenhum item entra no acervo premium apenas porque é interessante; ele entra porque está claro qual problema resolve, para quem, com qual esforço e qual próximo passo.**
