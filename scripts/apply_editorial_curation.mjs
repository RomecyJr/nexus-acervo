import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(__dirname, '../data/catalog.json');
const schemaPath = path.resolve(__dirname, '../schema/catalog.schema.json');
const exportPath = 'C:\\Users\\romecy.veiga\\Downloads\\nexus_acervo_export_2026-09-24.json';

console.log('--- APLICANDO CURADORIA EDITORIAL DO CATÁLOGO NEXUS ACERVO ---');

// 1. Carregar catálogo atual e catálogo exportado
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const exportData = fs.existsSync(exportPath) ? JSON.parse(fs.readFileSync(exportPath, 'utf8')) : { items: [] };

// 2. Extrair itens do export que são válidos (ignorando o item de teste custom-1790255595915)
const expItems = exportData.items || [];
const openClawRaw = expItems.find(i => i.id === 'custom-1790285481240');
const terceiraOndaRaw = expItems.find(i => i.id === 'custom-1790284330901');

// 3. Normalizar e padronizar os dois itens custom para o padrão editorial de excelência
const openClawEditorial = {
  id: 'course-openclaw-negocios',
  title: 'OpenClaw nos Negócios — Imersão em Automação com Agentes',
  kind: 'curso',
  area: 'Negócios',
  intents: ['Aprender', 'Automatizar'],
  segment: 'Produtividade e Gestão',
  url: openClawRaw?.url || 'https://lastlink.com/f/imersaoopenclawnosnegocios/classroom/ae609e37-7d82-4039-ad5f-96d0a0cb8d56/023c607c-215c-44b0-bf40-eb741c7a4274',
  description: 'Curso prático focado na aplicação operacional de agentes autônomos e fluxos inteligentes com OpenClaw em processos de negócios.',
  deliverable: 'Capacidade de diagnosticar gargalos operacionais e prototipar fluxos de automação autônomos orientados a resultado e redução de custos.',
  practicalExample: 'Mapear o fluxo de triagem e qualificação de leads, integrando agente OpenClaw para resposta e atualização de CRM sem intervenção manual.',
  targetAudience: 'Empreendedores, operadores e gestores de tecnologia interessados em automação com IA',
  tags: ['openclaw', 'automacao', 'agentes', 'negocios', 'curso', 'produtividade'],
  summary: 'Imersão prática na construção de fluxos com agentes autônomos OpenClaw para ganho operacional e eficiência empresarial.',
  keyTakeaways: [
    'Identificação cirúrgica de processos manuais automatizáveis',
    'Construção de fluxos orientados a entrega de resultado de negócio',
    'Operação e monitoramento de agentes autônomos em produção'
  ],
  action: 'Mapear uma rotina operacional manual repetitiva da sua operação e desenhar o fluxo de teste com agente OpenClaw.',
  effort: '4-6 horas',
  impact: 'alto',
  confidence: 'high',
  thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  status: 'estudo',
  year: 2026,
  source: 'Nexus Segundo Cérebro',
  addedAt: '2026-09-24',
  updatedAt: '2026-09-25'
};

const terceiraOndaEditorial = {
  id: 'video-terceira-onda-ia',
  title: 'A 3ª Onda da IA: Vender Resultados, Não Ferramentas',
  kind: 'vídeo',
  area: 'Negócios',
  intents: ['Aprender', 'Avaliar oportunidade'],
  segment: 'Conteúdo e Mídia',
  url: 'https://www.youtube.com/watch?v=qqdoGv3ae-8',
  youtubeId: 'qqdoGv3ae-8',
  description: 'Análise aprofundada sobre a migração do modelo SaaS tradicional de ferramentas para negócios de IA que garantem e entregam o resultado final em mercados operacionais tradicionais.',
  deliverable: 'Framework prático de 8 perguntas de viabilidade para avaliar ideias de negócios em IA antes de investir tempo e capital.',
  practicalExample: 'Aplicar o teste de validação das 8 perguntas em uma oportunidade de automação contábil ou jurídica para aferir defensabilidade contra concorrentes.',
  targetAudience: 'Fundadores de startups, desenvolvedores e operadores de produto avaliando novos modelos de IA',
  tags: ['IA', 'SaaS', 'negocios', 'oportunidades', 'estrategia', 'startups'],
  summary: 'Análise estratégica sobre a criação de negócios de IA orientados a resultado final em mercados corporativos tradicionais.',
  keyTakeaways: [
    'O modelo SaaS tradicional de software-como-ferramenta está cedendo lugar a soluções de resultado contratado',
    'Mercados operacionais tradicionais oferecem menor disputa e disposição real de pagamento',
    'Defensabilidade e retenção exigem integração profunda ao fluxo de trabalho do cliente'
  ],
  action: 'Submeter sua tese ou projeto atual ao checklist de 8 perguntas do vídeo para validar o potencial de escala.',
  effort: '25 min',
  impact: 'alto',
  confidence: 'high',
  thumbnail: 'https://i.ytimg.com/vi/qqdoGv3ae-8/hqdefault.jpg',
  status: 'estudo',
  year: 2026,
  source: 'Nexus Segundo Cérebro',
  addedAt: '2026-09-24',
  updatedAt: '2026-09-25'
};

// 4. Filtrar itens existentes, remover qualquer item de teste ou custom legado
let items = catalog.items.filter(i => {
  if (i.id === 'custom-1790255595915') return false;
  if (i.title && i.title.toLowerCase().trim() === 'teste') return false;
  if (i.segment && i.segment.toLowerCase().includes('teste')) return false;
  if (i.id === 'custom-1790285481240') return false;
  if (i.id === 'custom-1790284330901') return false;
  if (i.id === 'course-openclaw-negocios') return false;
  if (i.id === 'video-terceira-onda-ia') return false;
  return true;
});

// Adicionar os dois itens enriquecidos
items.push(openClawEditorial);
items.push(terceiraOndaEditorial);

// 5. Ajustar e enriquecer os itens existentes conforme o relatório de curadoria
const itemsMap = new Map(items.map(i => [i.id, i]));

// A. Consolidar Grupo CSSBuy
const cssbuyTool = itemsMap.get('tool-cssbuy');
const cssbuyGuide = itemsMap.get('conhecimento-cssbuy-guia');

if (cssbuyTool) {
  cssbuyTool.title = 'CSSBuy — Agente de Compras, Inspeção e Logística na China';
  cssbuyTool.description = 'Plataforma completa de compras assistidas, controle de qualidade, consolidação de pacotes e frete internacional da China para o Brasil.';
  cssbuyTool.area = 'Operações';
  cssbuyTool.intents = ['Comprar', 'Operar'];
  cssbuyTool.deliverable = 'Capacidade de adquirir produtos em plataformas chinesas (Taobao, 1688, Weidian) com inspeção prévia de fotos e pesagem antes do envio.';
  cssbuyTool.practicalExample = 'Comprar componentes ou amostras pelo 1688 via link direto, solicitar fotos detalhadas de medidas no armazém e despachar via frete com rastreio.';
  cssbuyTool.targetAudience = 'Empreendedores de e-commerce, importadores e pesquisadores de hardware';
  cssbuyTool.relations = [{ type: 'has_guide', targetId: 'conhecimento-cssbuy-guia' }];
  cssbuyTool.thumbnail = 'https://www.google.com/s2/favicons?domain=cssbuy.com&sz=128';
}

if (cssbuyGuide) {
  cssbuyGuide.title = 'CSSBuy — Guia Prático de Redirecionamento e Logística na China';
  cssbuyGuide.description = 'Manual passo a passo de como cadastrar endereço, negociar taxas, declarar itens para alfândega brasileira e otimizar fretes consolidados.';
  cssbuyGuide.area = 'Operações';
  cssbuyGuide.intents = ['Aprender', 'Operar'];
  cssbuyGuide.deliverable = 'Roteiro seguro para evitar retenções aduaneiras e reduzir custos de frete internacional em remessas da China.';
  cssbuyGuide.practicalExample = 'Executar a declaração simplificada de 3 encomendas diferentes, combinando-as numa única caixa para economizar taxa de despacho postal.';
  cssbuyGuide.targetAudience = 'Importadores diretos e compradores de suprimentos corporativos';
  cssbuyGuide.relations = [{ type: 'guide_for', targetId: 'tool-cssbuy' }];
  cssbuyGuide.thumbnail = 'https://www.google.com/s2/favicons?domain=cssbuy.com&sz=128';
}

// B. Enriquecer as 7 Métricas do Instagram com relação, descrições executivas completas e parentId
const metricEnrichments = {
  'metric-roi': {
    title: 'Métrica: ROI — Retorno sobre Investimento',
    description: 'Indicador percentual que avalia a eficiência financeira de um investimento em relação ao seu custo inicial: (Lucro Líquido ÷ Custo do Investimento) × 100.',
    deliverable: 'Clareza imediata sobre se uma campanha, contratação ou projeto gerou retorno financeiro positivo acima do custo de capital.',
    practicalExample: 'Avaliar um investimento de R$ 10.000 em mídia paga que gerou R$ 35.000 de margem de contribuição (ROI de 250%).',
    targetAudience: 'Fundadores, diretores financeiros e gestores de tráfego/marketing',
    summary: 'Métrica financeira essencial para validar a rentabilidade de cada real investido na operação.',
    keyTakeaways: ['Diferença crítica entre faturamento bruto e lucro líquido real', 'Necessidade de incluir todos os custos ocultos de implementação']
  },
  'metric-cac': {
    title: 'Métrica: CAC — Custo de Aquisição de Clientes',
    description: 'Valor financeiro médio investido em marketing e vendas para conquistar cada novo cliente pagante: (Custos de Vendas + Marketing) ÷ Novos Clientes.',
    deliverable: 'Parâmetro de viabilidade do modelo comercial quando cruzado com o LTV (Lifetime Value).',
    practicalExample: 'Gastar R$ 20.000 no mês com equipe comercial e anúncios para fechar 40 novos clientes, resultando em um CAC unitário de R$ 500.',
    targetAudience: 'Líderes comerciais, gestores de marketing e fundadores de empresas escaláveis',
    summary: 'Custo direto e indireto para trazer um novo cliente pagante para dentro do negócio.',
    keyTakeaways: ['O CAC deve ser idealmente recuperado em até 6 a 12 meses', 'Relação LTV:CAC saudável deve ser de no mínimo 3:1']
  },
  'metric-aov': {
    title: 'Métrica: AOV — Ticket Médio por Transação',
    description: 'Valor monetário médio gasto pelos clientes em cada compra individual na plataforma: Receita Total ÷ Número de Transações.',
    deliverable: 'Alavanca de crescimento da receita sem necessidade de aumentar o tráfego ou o investimento em mídia.',
    practicalExample: 'Implementar order bump e upsell no checkout, elevando o valor médio de pedido de R$ 120 para R$ 168.',
    targetAudience: 'Operadores de e-commerce, gerentes de produto e analistas de pricing',
    summary: 'Indicador do valor monetário médio capturado por venda realizada na esteira comercial.',
    keyTakeaways: ['Estratégias de bundling e frete grátis condicional expandem o AOV', 'Aumento de 20% no ticket médio pode dobrar o lucro operacional']
  },
  'metric-runway': {
    title: 'Métrica: Runway — Fôlego e Sobrevida de Caixa',
    description: 'Tempo em meses que a empresa consegue operar antes de zerar o caixa com base no consumo mensal líquido: Saldo de Caixa ÷ Burn Rate Mensal.',
    deliverable: 'Visibilidade preventiva para planejar captação de recursos, contenção de despesas ou aceleração de receita antes de crises de liquidez.',
    practicalExample: 'Com R$ 600.000 no banco e queima líquida de R$ 50.000/mês, a empresa possui exatamente 12 meses de runway para atingir o breakeven.',
    targetAudience: 'CEOs, CFOs e investidores de empresas em estágio inicial e crescimento',
    summary: 'Medição exata da quantidade de meses de operação que o saldo de caixa atual sustenta.',
    keyTakeaways: ['Manter sempre um runway mínimo prudencial de 6 a 9 meses', 'Revisar a taxa de queima mensal a cada contratação ou compromisso fixo']
  },
  'metric-churn': {
    title: 'Métrica: Churn Rate — Taxa de Cancelamento de Clientes',
    description: 'Percentual de clientes ou receita perdida ao longo de um determinado período: (Clientes Perdidos no Período ÷ Clientes no Início) × 100.',
    deliverable: 'Diagnóstico precoce de problemas de retenção, insatisfação com produto ou desalinhamento na venda.',
    practicalExample: 'Iniciar o trimestre com 500 contas ativas e registrar 15 cancelamentos no mês, representando uma taxa de churn mensal de 3,0%.',
    targetAudience: 'Equipes de Customer Success, gerentes de produto e analistas de retenção',
    summary: 'Índice de perda de clientes que mede diretamente o balde furado da operação recorrente.',
    keyTakeaways: ['Churn alto anula completamente os ganhos obtidos com novo CAC', 'Net Revenue Churn negativo é a principal alavanca de valorização de um negócio']
  },
  'metric-mrr': {
    title: 'Métrica: MRR — Receita Recorrente Mensal',
    description: 'Valor previsível e recorrente gerado por todos os clientes ativos com planos de assinatura mensal: Total de Assinaturas × Valor Mensal.',
    deliverable: 'Previsibilidade financeira para planejamento orçamentário, contratações e expansão da infraestrutura com risco controlado.',
    practicalExample: 'Operar com 250 clientes no plano Pro de R$ 199/mês e 50 empresas no Enterprise de R$ 990/mês, totalizando um MRR de R$ 99.250.',
    targetAudience: 'Empreendedores SaaS, investidores e gestores de negócios por assinatura',
    summary: 'Faturamento recorrente previsível que sustenta modelos baseados em assinatura.',
    keyTakeaways: ['Segmentar em New MRR, Expansion MRR, Contraction MRR e Churned MRR', 'Base para avaliação de valuation múltiplo do negócio']
  },
  'metric-ebitda': {
    title: 'Métrica: EBITDA — Lucro Operacional Antes de Efeitos Não-Caixa',
    description: 'Lucro da empresa antes de deduzir juros, tributos sobre a renda, depreciações de ativos físicos e amortizações de intangíveis.',
    deliverable: 'Medição da capacidade de geração pura de caixa da atividade-fim do negócio, livre de alavancagem financeira ou regras tributárias.',
    practicalExample: 'Faturamento de R$ 1.000.000 com custos operacionais de R$ 680.000 gerando R$ 320.000 de EBITDA (margem EBITDA de 32%).',
    targetAudience: 'Contadores consultivos, analistas de M&A, diretores financeiros e sócios-proprietários',
    summary: 'Aferição do potencial operacional bruto de geração de riqueza das atividades comerciais.',
    keyTakeaways: ['Permite comparar rentabilidade operacional com concorrentes de diferentes estruturas de capital', 'É a métrica mais utilizada em processos de fusão e aquisição (valuation por múltiplos de EBITDA)']
  }
};

for (const [id, enh] of Object.entries(metricEnrichments)) {
  const item = itemsMap.get(id);
  if (item) {
    Object.assign(item, enh);
    item.parentId = 'carrossel-metricas-instagram';
    item.area = 'Negócios';
    item.intents = ['Medir', 'Aprender'];
    item.effort = '5 min';
    item.impact = 'alto';
    item.confidence = 'high';
  }
}

// C. Preencher targetAudience ausentes ou genéricos
const audienceFixes = {
  'video-natureza-humana': 'Líderes, negociadores e profissionais que buscam inteligência social e domínio sobre dinâmicas interpessoais',
  'video-discussao': 'Gestores, comunicadores e equipes multidisciplinares lidando com debates difíceis e divergências estratégicas',
  'design-uiverse': 'Desenvolvedores front-end, designers de produto e entusiastas de prototipagem rápida de UI com Tailwind e CSS puro',
  'carrossel-modelos-mentais': 'Tomadores de decisão, investidores e estrategistas focados em reduzir pontos cegos e viés cognitivo',
  'conhecimento-metodo-10-dias': 'Profissionais buscando reprogramação comportamental, clareza mental e disciplina de execução pessoal',
  'conhecimento-checklist-seguranca': 'Desenvolvedores, analistas de segurança e usuários de inteligência artificial que manuseiam credenciais e dados sensíveis',
  'repo-fcksignups': 'Engenheiros de software, criadores e pesquisadores que priorizam ferramentas web imediatas sem atrito de cadastro'
};

for (const [id, audience] of Object.entries(audienceFixes)) {
  const item = itemsMap.get(id);
  if (item) item.targetAudience = audience;
}

// C2. Enriquecer itens com tags insuficientes
const tagFixes = {
  'video-discussao': ['comunicacao', 'negociacao', 'ted-talks', 'soft-skills', 'resolucao-de-conflitos'],
  'video-13-minutos': ['autoconhecimento', 'habitos', 'produtividade', 'desenvolvimento-pessoal', 'james-clear'],
  'video-hacks': ['produtividade', 'gestao-de-tempo', 'rotina', 'alta-performance', 'ali-abdaal']
};

for (const [id, tags] of Object.entries(tagFixes)) {
  const item = itemsMap.get(id);
  if (item) item.tags = tags;
}

// D. Expandir descrições curtas e enriquecer ferramentas web
const descFixes = {
  'tool-vidrush': {
    description: 'Plataforma impulsionada por IA para geração, transcrição, corte inteligente e legendagem de vídeos voltados para mídias sociais e esteiras de conteúdo.',
    deliverable: 'Produção rápida de recortes verticais e legendas sincronizadas para amplificar o alcance orgânico no YouTube Shorts e TikTok.'
  },
  'tool-elevenlabs': {
    description: 'Referência global em síntese de voz, clonagem neural hiper-realista e dublagem multilíngue automatizada com nuances emocionais em alta fidelidade.',
    deliverable: 'Áudios e narrações com naturalidade humana impecável para cursos, vídeos explicativos, agentes de atendimento e podcasts.'
  },
  'tool-stackedit': {
    description: 'Editor Markdown completo, open source e baseado no navegador, com sincronização em nuvem, visualização lado a lado em tempo real e exportação para PDF e HTML.',
    deliverable: 'Ambiente de escrita técnica e redação de documentações limpo, portável e acessível sem necessidade de instalação local.'
  },
  'tool-opencut': {
    description: 'Editor de vídeo leve, moderno e open source executado diretamente na web, permitindo cortes precisos, organização de faixas e exportação rápida sem marcas d’água.',
    deliverable: 'Capacidade de realizar edições diretas e montagens de vídeo em qualquer máquina sem dependência de softwares desktop pesados.'
  }
};

for (const [id, fixes] of Object.entries(descFixes)) {
  const item = itemsMap.get(id);
  if (item) Object.assign(item, fixes);
}

// E. Padronização de Segmento: "Conhecimento & Hacks" -> "Métodos & Frameworks"
for (const item of items) {
  if (item.segment === 'Conhecimento & Hacks') {
    item.segment = 'Métodos & Frameworks';
  }
  // Padronização rigorosa de tags: converter 'I.A' para 'IA'
  if (Array.isArray(item.tags)) {
    item.tags = item.tags.map(t => (t === 'I.A' ? 'IA' : t));
  }
  // Garantir tags mínimas
  if (!item.tags || item.tags.length === 0) {
    item.tags = [item.kind, (item.segment || 'geral').toLowerCase().replace(/\s+/g, '-')];
  }
  // Atribuir area e intents padrão se não existirem
  if (!item.area) {
    if (item.segment?.includes('Negócios') || item.segment?.includes('Importação')) item.area = 'Negócios';
    else if (item.segment?.includes('Design')) item.area = 'Design';
    else if (item.segment?.includes('Desenvolvimento') || item.segment?.includes('Repositórios')) item.area = 'Desenvolvimento';
    else if (item.segment?.includes('Produtividade') || item.segment?.includes('Métodos')) item.area = 'Operações';
    else item.area = 'Aprendizado';
  }
  if (!item.intents || item.intents.length === 0) {
    if (item.kind === 'ferramenta') item.intents = ['Criar', 'Operar'];
    else if (item.kind === 'repositório') item.intents = ['Pesquisar', 'Automatizar'];
    else if (item.kind === 'vídeo' || item.kind === 'curso') item.intents = ['Aprender'];
    else item.intents = ['Aprender', 'Pesquisar'];
  }
  // Se summary não existe, gerar resumo conciso
  if (!item.summary) {
    item.summary = item.description?.length > 130 ? item.description.slice(0, 127) + '…' : item.description;
  }
}

// 6. Atualizar os segmentos oficiais no meta do catálogo
const validSegments = [
  { id: 'produtividade-gestao', label: 'Produtividade e Gestão' },
  { id: 'conteudo-midia', label: 'Conteúdo e Mídia' },
  { id: 'desenvolvimento-infra', label: 'Desenvolvimento e Infra' },
  { id: 'design-ux', label: 'Design e UX' },
  { id: 'dados-inteligencia', label: 'Dados e Inteligência' },
  { id: 'negocios-metricas', label: 'Negócios e Métricas' },
  { id: 'aprendizado-filosofia', label: 'Aprendizado e Filosofia' },
  { id: 'importacao-ecommerce', label: 'Importação e E-commerce' },
  { id: 'metodos-frameworks', label: 'Métodos & Frameworks' },
  { id: 'repositorios-ferramentas-open-source', label: 'Repositórios & Ferramentas Open Source' }
];

catalog.segments = validSegments;
catalog.items = items;
catalog.meta.version = '2.1.0';
catalog.meta.updatedAt = new Date().toISOString().slice(0, 10);
catalog.meta.generatedAt = new Date().toISOString();

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`Catálogo atualizado com sucesso: ${catalog.items.length} itens curados e padronizados.`);

// 7. Atualizar schema para suportar os novos campos e 'curso' em kind
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const allowedKinds = schema.$defs.item.properties.kind.enum;
if (!allowedKinds.includes('curso')) {
  allowedKinds.push('curso');
}

// Adicionar propriedades ricas ao schema se ainda não existirem
const props = schema.$defs.item.properties;
if (!props.area) props.area = { type: 'string' };
if (!props.intents) props.intents = { type: 'array', items: { type: 'string' } };
if (!props.summary) props.summary = { type: 'string' };
if (!props.keyTakeaways) props.keyTakeaways = { type: 'array', items: { type: 'string' } };
if (!props.action) props.action = { type: 'string' };
if (!props.effort) props.effort = { type: 'string' };
if (!props.impact) props.impact = { type: 'string' };
if (!props.confidence) props.confidence = { type: 'string' };
if (!props.relations) props.relations = { type: 'array' };
if (!props.parentId) props.parentId = { type: 'string' };
if (!props.reviewedAt) props.reviewedAt = { type: 'string' };

fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2) + '\n');
console.log('Schema catalog.schema.json atualizado com sucesso.');
