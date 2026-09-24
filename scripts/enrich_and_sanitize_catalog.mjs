import fs from 'node:fs';
import path from 'node:path';

console.log('🚀 Iniciando Saneamento e Curadoria do Catálogo (Fase 1)...');

const catalogPath = path.resolve('data/catalog.json');
const rawData = fs.readFileSync(catalogPath, 'utf8');
const catalog = JSON.parse(rawData);

// 1. Definição das 8 Verticais Equilibradas (DATA-05)
const SEGMENT_MAPPING = {
  'Design e UX': 'Design e UX',
  'Aprendizado': 'Aprendizado e Filosofia',
  'Métricas de negócio': 'Negócios e Métricas',
  'Negócios': 'Negócios e Métricas',
  'Conteúdo e mídia': 'Conteúdo e Mídia',
  'Desenvolvimento': 'Desenvolvimento e Infra',
  'Infraestrutura': 'Desenvolvimento e Infra',
  'Dados e APIs': 'Dados e Inteligência',
  'OSINT e pesquisa': 'Dados e Inteligência',
  'Produtividade': 'Produtividade e Gestão',
  'IA e automação': 'Produtividade e Gestão',
  'Importação': 'Importação e E-commerce'
};

const NEW_SEGMENTS = [
  { id: 'seg-design', label: 'Design e UX' },
  { id: 'seg-aprendizado', label: 'Aprendizado e Filosofia' },
  { id: 'seg-negocios', label: 'Negócios e Métricas' },
  { id: 'seg-conteudo', label: 'Conteúdo e Mídia' },
  { id: 'seg-dev', label: 'Desenvolvimento e Infra' },
  { id: 'seg-dados', label: 'Dados e Inteligência' },
  { id: 'seg-produtividade', label: 'Produtividade e Gestão' },
  { id: 'seg-importacao', label: 'Importação e E-commerce' }
];

catalog.segments = NEW_SEGMENTS;

// 2. Normalizador de Tags (DATA-05: slug sem acento minúsculo)
function normalizeTag(tag) {
  return String(tag)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/tedx/g, 'ted');
}

// 3. Tabela de Enriquecimento Cirúrgico de Vídeos (DATA-01)
const VIDEO_UPDATES = {
  'video-natureza-humana': {
    youtubeId: 'RTo2akdZ7Dc',
    url: 'https://www.youtube.com/watch?v=RTo2akdZ7Dc',
    status: 'ativo',
    title: 'As 20 Leis da Natureza Humana — Robert Greene',
    deliverable: 'Síntese profunda sobre motivações inconscientes, leitura comportamental e inteligência emocional para antecipar reações humanas.',
    practicalExample: 'Analise atitudes de colegas e parceiros comerciais observando padrões de inveja, orgulho ou fragilidade antes de reuniões decisivas.'
  },
  'video-20-horas': {
    youtubeId: '5MgBikgcWnY',
    url: 'https://www.youtube.com/watch?v=5MgBikgcWnY',
    status: 'ativo',
    title: 'The First 20 Hours: Como Aprender Qualquer Habilidade — Josh Kaufman',
    deliverable: 'Metodologia acelerada de 4 etapas para atingir nível de proficiência satisfatório em qualquer nova disciplina com 20 horas de treino intencional.',
    practicalExample: 'Decomponha uma habilidade como falar em público ou tocar instrumento em 3 sub-habilidades fundamentais e pratique 45 minutos por dia durante um mês.'
  },
  'video-growth-mindset': {
    youtubeId: '_X0mgOOSpLU',
    url: 'https://www.youtube.com/watch?v=_X0mgOOSpLU',
    status: 'ativo',
    title: 'O Poder de Acreditar que Você Pode Melhorar — Carol Dweck (TED)',
    deliverable: 'Conceito científico de Mentalidade de Crescimento (Growth Mindset) comprovando que habilidades cognitivas e técnicas são maleáveis.',
    practicalExample: 'Ao cometer um erro de código ou receber feedback duro de cliente, substitua a frase \"não sei fazer isso\" por \"ainda não domino isso esta semana\".'
  },
  'video-impostor': {
    youtubeId: 'ZQUxL4Jm1Lo',
    url: 'https://www.youtube.com/watch?v=ZQUxL4Jm1Lo',
    status: 'ativo',
    title: 'O Que É a Síndrome do Impostor e Como Superá-la — Elizabeth Cox (TED-Ed)',
    deliverable: 'Explicação psicológica animada de por que profissionais de alto desempenho sentem que são fraudes e técnicas práticas para neutralizar essa ilusão.',
    practicalExample: 'Mantenha um diário de fatos concretos (elogios documentados, entregas concluídas e métricas batidas) para consultar sempre que a sensação de fraude surgir.'
  },
  'video-discussao': {
    youtubeId: 'phgjouv0BUA',
    url: 'https://www.youtube.com/watch?v=phgjouv0BUA',
    status: 'ativo',
    title: 'Como Discordar de Forma Produtiva e Encontrar Pontos em Comum — Julia Dhar (TED)',
    deliverable: 'Framework comprovado de debates de classe mundial para desarmar conflitos e defender posições com elegância sem criar atrito pessoal.',
    practicalExample: 'Em uma negociação tensa, valide primeiro a intenção positiva da outra parte antes de contra-argumentar, separando o problema da pessoa.'
  },
  'video-procrastinacao': {
    youtubeId: 'faE1EGQJ0lQ',
    url: 'https://www.youtube.com/watch?v=faE1EGQJ0lQ',
    status: 'ativo',
    title: 'Como Curar sua Procrastinação na Raiz — Eslen Delanogare',
    deliverable: 'Explicação neurocientífica sobre regulação de dopamina, tolerância ao desconforto e criação de rituais de início imediato de tarefas difíceis.',
    practicalExample: 'Estabeleça a regra dos 5 minutos: comprometa-se a apenas abrir o arquivo e trabalhar 5 minutos sem compromisso de concluir; a inércia faz você continuar.'
  },
  'video-comparacao': {
    youtubeId: 'MtSE4rglxbY',
    url: 'https://www.youtube.com/watch?v=MtSE4rglxbY',
    status: 'ativo',
    title: 'Status Anxiety: Uma Filosofia Mais Gentil do Sucesso — Alain de Botton (TED)',
    deliverable: 'Ensaio filosófico essencial da The School of Life sobre a ansiedade de status e a armadilha de medir valor próprio pela régua alheia.',
    practicalExample: 'Defina seu próprio placar interno de sucesso (liberdade de horário, saúde e qualidade das relações) para não se abalar com conquistas exibidas em feeds sociais.'
  },
  'video-decisao': {
    youtubeId: 'mScpHTIi-kM',
    url: 'https://www.youtube.com/watch?v=mScpHTIi-kM',
    status: 'ativo',
    title: 'Teoria dos Jogos e Decisões Críticas no Mundo Real — Veritasium',
    deliverable: 'Simulação matemática de cooperação, traição e equilíbrio de Nash aplicada a interações humanas, mercado e estratégias de sobrevivência.',
    practicalExample: 'Adote a estratégia \"Tit for Tat\": inicie sempre cooperando em parcerias, retalie desvios pontualmente e perdoe de imediato se o outro voltar a cooperar.'
  },
  'video-13-minutos': {
    youtubeId: 'U_nzqnXWvSo',
    url: 'https://www.youtube.com/watch?v=U_nzqnXWvSo',
    status: 'ativo',
    title: 'Hábitos Atômicos: Como Melhorar 1% a Cada Dia — James Clear',
    deliverable: 'Sistema prático de formação de hábitos baseado em pistas visuais, redução de atrito e reforço de identidade para transformações de longo prazo.',
    practicalExample: 'Deixe o livro técnico aberto na mesa de trabalho ou posicione o ícone da ferramenta de estudo na barra de tarefas para zerar o atrito de começar.'
  },
  'video-hacks': {
    youtubeId: '4aYVLpY5FYU',
    url: 'https://www.youtube.com/watch?v=4aYVLpY5FYU',
    status: 'ativo',
    title: 'Os Melhores Hacks de Produtividade de Todos os Tempos — Ali Abdaal',
    deliverable: 'Auditoria e ranking testado de dezenas de técnicas de gestão de tempo, bloqueio de agenda e execução fluida sem esgotamento mental.',
    practicalExample: 'Aplique o conceito de \"Timeblocking\": reserve blocos fixos e inegociáveis de 90 minutos pela manhã dedicados exclusivamente ao projeto mais importante do dia.'
  },
  'video-pensar-papel': {
    youtubeId: 'OP3dA2GcAh8',
    url: 'https://www.youtube.com/watch?v=OP3dA2GcAh8',
    status: 'ativo',
    title: 'Construindo um Segundo Cérebro: O Sistema Definitivo de Produtividade — Ali Abdaal & Tiago Forte',
    deliverable: 'Framework CODE (Capture, Organize, Distill, Express) e método PARA para gerenciar conhecimento pessoal e transformar consumo passivo em criação ativa.',
    practicalExample: 'Estruture suas pastas e notas digitais em apenas 4 níveis: Projetos ativos, Áreas de responsabilidade, Recursos de referência e Arquivo inativo.'
  },
  'video-sucesso': {
    youtubeId: 'jYdE1f_bK38',
    url: 'https://www.youtube.com/watch?v=jYdE1f_bK38',
    status: 'ativo',
    title: 'O Que Ninguém Te Conta Sobre o Sucesso nos Negócios — Flávio Augusto',
    deliverable: 'Lições de trincheira sobre resiliência operacional, vendas, gestão de crises e a mentalidade necessária para construir empresas multimilionárias.',
    practicalExample: 'Ao lançar um novo produto, foque obsessivamente em validação direta de caixa e clientes pagantes antes de desenhar planos ou apresentações complexas.'
  }
};

// 4. Tabela de Enriquecimento de Carrosséis (DATA-02)
const CAROUSEL_UPDATES = {
  'carrossel-modelos-mentais': {
    url: 'https://fs.blog/mental-models/',
    deliverable: '5 modelos mentais fundamentais de Charlie Munger (Inversão, Círculo de Competência, Efeito Lollapalooza e Princípio 80/20) para blindar decisões.',
    practicalExample: 'Antes de assinar um contrato importante, faça uma sessão de \"Inversão\": liste tudo que levaria o acordo ao fracasso e crie cláusulas preventivas.'
  },
  'carrossel-micro-interacoes': {
    url: 'https://lawsofux.com/',
    deliverable: 'Guia visual sobre curvas de animação Bezier, feedback tátil, tempos de resposta (<100ms) e micro-interações que elevam produtos para padrão internacional.',
    practicalExample: 'Em formulários de checkout, adicione feedback tátil e animação de loading direto no botão para eliminar cliques múltiplos por ansiedade do usuário.'
  }
};

// 5. Tabela de Enriquecimento Cirúrgico das 7 Métricas (DATA-03 e DATA-04)
const METRIC_UPDATES = {
  'metric-roi': {
    title: 'Métrica: ROI — Retorno sobre Investimento',
    deliverable: 'Fórmula matemática essencial ((Ganho - Custo) / Custo * 100) para medir com precisão se o capital aplicado em projetos trouxe lucro ou prejuízo.',
    practicalExample: 'Se você gastou R$ 5.000 em uma campanha e gerou R$ 25.000 em receita líquida, seu ROI foi de 400% (R$ 4 de retorno para cada R$ 1 investido).'
  },
  'metric-cac': {
    title: 'Métrica: CAC — Custo de Aquisição de Clientes',
    deliverable: 'Indicador financeiro ((Custos de Vendas + Marketing) / Novos Clientes) que revela na ponta do lápis o custo real de colocar cada cliente na empresa.',
    practicalExample: 'Se a soma de anúncios e salários comerciais atingiu R$ 20.000 e 40 clientes entraram no mês, seu CAC é de exatamente R$ 500 por cliente.'
  },
  'metric-aov': {
    title: 'Métrica: AOV — Ticket Médio por Pedido',
    deliverable: 'Métrica de monetização (Receita Total / Número de Pedidos) para identificar o valor médio gasto por cliente em cada transação comercial.',
    practicalExample: 'Com faturamento de R$ 120.000 em 800 pedidos, seu AOV é R$ 150. Ofereça frete grátis ou descontos a partir de R$ 190 para forçar o aumento do ticket.'
  },
  'metric-runway': {
    title: 'Métrica: Runway — Sobrevida de Caixa',
    deliverable: 'Contagem regressiva (Saldo de Caixa / Burn Rate Mensal) que determina com rigor quantos meses a empresa sobrevive antes de zerar o caixa.',
    practicalExample: 'Uma startup com R$ 600.000 no banco e prejuízo operacional mensal de R$ 50.000 possui 12 meses de Runway para atingir ponto de equilíbrio.'
  },
  'metric-churn': {
    title: 'Métrica: Churn Rate — Taxa de Cancelamento',
    deliverable: 'Métrica vital de retenção (Clientes Cancelados / Clientes Ativos * 100) que acende o sinal de alerta sobre a evasão da base de assinantes.',
    practicalExample: 'Se sua base iniciou o mês com 1.000 assinantes e 30 cancelaram, o Churn foi de 3%. Em empresas SaaS B2B, a meta saudável deve ficar abaixo de 1% a 2%.'
  },
  'metric-mrr': {
    title: 'Métrica: MRR — Receita Recorrente Mensal',
    deliverable: 'O termômetro definitivo da previsibilidade financeira (Assinantes Ativos * Mensalidade Média) para modelos de assinatura e SaaS.',
    practicalExample: 'Com 200 clientes no plano de R$ 150/mês e 20 no plano Enterprise de R$ 1.000/mês, seu MRR é de R$ 50.000 (equivalente a R$ 600.000 de ARR).'
  },
  'metric-ebitda': {
    title: 'Métrica: EBITDA — Lucro Operacional Puro',
    deliverable: 'Lucro antes de Juros, Impostos, Depreciação e Amortização, mensurando o potencial genuíno de geração de caixa operacional da empresa.',
    practicalExample: 'Com receita de R$ 1.500.000 e custos operacionais de R$ 1.050.000, o EBITDA é de R$ 450.000 (margem de 30%), métrica essencial para valuation.'
  }
};

// 6. Tabela de Enriquecimento de Ferramentas e Design (DATA-04)
const TOOL_UPDATES = {
  'tool-importhelper': {
    deliverable: 'Extensão especializada para traduzir vitrines da China (Taobao e Xianyu), converter moedas em tempo real e orçar redirecionamentos.',
    practicalExample: 'Ao garimpar componentes no Taobao, veja preços convertidos para Reais e envie pedidos para consolidação aduaneira sem travar com ideogramas.'
  },
  'tool-goofish': {
    deliverable: 'Maior marketplace de itens de segunda mão da Alibaba para encontrar produtos vintage, eletrônicos seminovos e hardware com desconto.',
    practicalExample: 'Encontre teclados mecânicos raros, placas controladoras e peças de reposição importadas por até metade do preço praticado no ocidente.'
  },
  'tool-taobao': {
    deliverable: 'Acesso direto à maior plataforma de compras da Ásia, conectando consumidores diretamente a fabricantes e distribuidores de Shenzhen.',
    practicalExample: 'Compre lotes de ferramentas, sensores para automação residencial e protótipos diretamente de fábricas usando agentes de importação.'
  },
  'tool-cssbuy': {
    deliverable: 'Agente e armazém de compras na China com pesagem de precisão, fotos detalhadas de inspeção de qualidade e consolidação de fretes.',
    practicalExample: 'Receba encomendas de múltiplos fornecedores em um único galpão em Guangzhou, retire caixas desnecessárias e envie tudo em um pacote único.'
  },
  'tool-ai-studio': {
    deliverable: 'Ambiente oficial do Google para prototipagem de engenharia de prompt, ajuste de temperatura e geração de chaves de API dos modelos Gemini.',
    practicalExample: 'Carregue um documento técnico denso de 200 páginas e teste a janela de 1 milhão de tokens do Gemini para extrair schemas JSON estruturados.'
  },
  'tool-factory': {
    deliverable: 'Agentes autônomos de engenharia de software treinados para auditar código, corrigir falhas de build em CI e propor refatorações seguras.',
    practicalExample: 'Integre com seu repositório GitHub para analisar automaticamente pull requests abertos, detectando vulnerabilidades antes do merge.'
  },
  'tool-tubelab': {
    deliverable: 'Ferramenta especializada em inteligência competitiva e benchmarking de retenção, tags e padrões de títulos para o YouTube.',
    practicalExample: 'Descubra os vídeos com maior aceleração de visualizações nos últimos 7 dias dentro do seu nicho para identificar temas em alta.'
  },
  'tool-vidiq': {
    deliverable: 'Painel analítico e extensão de SEO para criadores no YouTube com análise de concorrência e sugestões de títulos otimizados para clique.',
    practicalExample: 'Avalie a pontuação de relevância e competitividade de uma palavra-chave antes de gravar um vídeo novo para maximizar a descoberta orgânica.'
  },
  'tool-vidrush': {
    deliverable: 'Esteira automatizada para fatiar vídeos longos e podcasts em cortes verticais envolventes com legendas dinâmicas pré-sincronizadas.',
    practicalExample: 'Transforme uma aula ao vivo de 40 minutos em 5 pílulas verticais prontas para Reels e TikTok com legendas coloridas e cortes rápidos.'
  },
  'tool-pikzels': {
    deliverable: 'Estúdio de inteligência artificial focado em geração de thumbnails de alto CTR com iluminação de estúdio e contraste agressivo.',
    practicalExample: 'Crie variações de miniaturas chamativas com rostos expressivos e texto legível em dispositivos móveis para testes A/B no YouTube.'
  },
  'tool-elevenlabs': {
    deliverable: 'Líder em geração de áudio neural realista, clonagem de voz e dublagem multilíngue com entonação humana ultraprecisa.',
    practicalExample: 'Gere a locução profissional do roteiro de uma aula em português com pausas naturais sem precisar de estúdio físico ou microfone caro.'
  },
  'tool-bundlephobia': {
    deliverable: 'Auditor de performance para ecossistema NPM que calcula o tamanho minificado e o tempo de download de pacotes JavaScript.',
    practicalExample: 'Consulte o custo de instalar uma biblioteca no frontend antes do npm install, evitando dependências gigantes que atrasam o carregamento da página.'
  },
  'tool-excalidraw': {
    deliverable: 'Quadro branco virtual com estética de traço à mão para desenhar arquiteturas de software, wireframes e fluxos de sistemas.',
    practicalExample: 'Esboce a topologia de microsserviços da sua empresa durante uma reunião técnica e exporte como SVG vetorial limpo para o README do projeto.'
  },
  'tool-drawdb': {
    deliverable: 'Editor visual de modelagem de entidades e relacionamentos (ERD) direto no navegador com geração instantânea de SQL DDL.',
    practicalExample: 'Desenhe visualmente as tabelas, chaves primárias e relacionamentos do banco de dados e exporte o script CREATE TABLE para PostgreSQL.'
  },
  'tool-graphite': {
    deliverable: 'Plataforma para empilhamento de alterações (Stacked PRs) no Git, acelerando o fluxo de revisão de código em equipes de alta velocidade.',
    practicalExample: 'Divida uma refatoração grande em 4 pull requests pequenos e encadeados, permitindo que a equipe aprove por partes sem bloquear seu trabalho.'
  },
  'tool-stackedit': {
    deliverable: 'Editor Markdown no navegador com prévia simultânea em duas colunas, sincronização com GitHub/Google Drive e suporte a KaTeX.',
    practicalExample: 'Elabore documentações técnicas e artigos com tabelas e fórmulas matemáticas sem depender de IDE pesada, exportando diretamente para HTML ou PDF.'
  },
  'tool-opencut': {
    deliverable: 'Editor de vídeo e áudio leve no navegador para aparar gravações, cortar silêncios e exportar mídias sem perda de fidelidade.',
    practicalExample: 'Remova os segundos iniciais e finais de uma gravação de tela com rapidez sem a complexidade de abrir softwares profissionais de edição.'
  },
  'tool-hoppscotch': {
    deliverable: 'Cliente de testes de API web open-source e extremamente ágil, servindo como alternativa leve e privativa ao Postman.',
    practicalExample: 'Valide rotas RESTful e GraphQL enviando payloads JSON e headers de autenticação diretamente do browser com zero tempo de inicialização.'
  },
  'tool-logseq': {
    deliverable: 'Aplicativo open-source de gerenciamento de conhecimento pessoal centrado na privacidade com grafo bidirecional sobre arquivos Markdown.',
    practicalExample: 'Conecte conceitos de estudo e referências de projetos via links bidirecionais [[exemplo]], visualizando um grafo dinâmico do seu conhecimento.'
  },
  'design-shadcn-ui': {
    deliverable: 'Coleção de componentes de UI reutilizáveis e acessíveis em Tailwind CSS com código-fonte aberto para controle total do design.',
    practicalExample: 'Copie e cole componentes pré-construídos (modais, menus suspensos, abas) diretamente no seu projeto sem ficar amarrado a uma biblioteca externa.'
  },
  'design-aceternity-ui': {
    deliverable: 'Componentes avançados com animações fluidas em Framer Motion e Tailwind CSS desenhados para landing pages de alto impacto visual.',
    practicalExample: 'Implemente efeitos de grade cibernética no fundo, brilho direcional em cartões e animações de texto para impressionar usuários na primeira dobra.'
  },
  'design-coolors': {
    deliverable: 'Gerador inteligente de paletas harmônicas com ferramenta de bloqueio de cores e verificação rigorosa de contraste de acessibilidade.',
    practicalExample: 'Pressione espaço para gerar combinações de cores equilibradas e exporte os códigos HEX direto para as variáveis do seu tema de design.'
  },
  'design-realtime-colors': {
    deliverable: 'Simulador em tempo real para visualizar como uma paleta de cores se comporta na prática aplicada a uma landing page completa.',
    practicalExample: 'Valide a legibilidade dos botões de ação e o contraste do texto de parágrafos antes de escrever a primeira linha de folha de estilo.'
  },
  'design-lucide-icons': {
    deliverable: 'Conjunto de ícones vetoriais modernos, limpos e consistentes para web e apps com espessura e tamanho customizáveis.',
    practicalExample: 'Adicione símbolos visuais intuitivos em botões e menus mantendo o peso da página irrisório e a consistência visual impecável.'
  },
  'design-tabler-icons': {
    deliverable: 'Mais de 5.000 ícones em grade 24x24 px desenvolvidos sob medida para dashboards corporativos e interfaces de gerenciamento densas.',
    practicalExample: 'Utilize ícones especializados de métricas financeiras, gráficos de rede e dispositivos de hardware que não existem em pacotes básicos.'
  },
  'design-humaaans': {
    deliverable: 'Ilustrações vetoriais modulares de personagens onde você pode misturar corpos, roupas e poses para compor cenas humanizadas.',
    practicalExample: 'Crie ilustrações personalizadas e acolhedoras para páginas de boas-vindas e estados vazios sem precisar contratar um ilustrador externo.'
  },
  'design-hero-patterns': {
    deliverable: 'Galeria de texturas e padrões de fundo vetoriais em SVG repetíveis e customizáveis por código para conferir profundidade visual.',
    practicalExample: 'Aplique uma textura sutil no cabeçalho da sua aplicação pesando menos de 1 KB, substituindo banners de imagens rasterizadas pesadas.'
  },
  'design-gsap': {
    deliverable: 'O motor de animações JavaScript mais rápido e premiado do mercado para coreografar interações de scroll e timelines no browser.',
    practicalExample: 'Crie animações ligadas à barra de rolagem (ScrollTrigger) onde seções da página se fixam e elementos deslizam com suavidade extrema.'
  },
  'design-lottiefiles': {
    deliverable: 'Ecossistema de animações vetoriais ultraleves em formato JSON baseadas em After Effects com execução a 60fps em qualquer tela.',
    practicalExample: 'Substitua ícones estáticos por animações interativas de check de pagamento confirmado ou carregamento acionadas ao clique do usuário.'
  },
  'design-fontshare': {
    deliverable: 'Fundição de fontes tipográficas profissionais gratuitas de nível internacional para uso pessoal e comercial sem custos de licença.',
    practicalExample: 'Utilize fontes contemporâneas como Satoshi, Clash Display ou General Sans para dar personalidade premium ao branding do seu projeto.'
  },
  'design-spline': {
    deliverable: 'Software de design e renderização 3D intuitivo direto no navegador com suporte a interações em tempo real e exportação para a web.',
    practicalExample: 'Modele um objeto 3D que acompanha a posição do cursor do mouse do visitante e incorpore na tela inicial do seu site com um iframe limpo.'
  },
  'design-shots-so': {
    deliverable: 'Criador profissional de apresentações visuais de produtos para enquadrar capturas de tela em molduras fotorrealistas de notebooks e celulares.',
    practicalExample: 'Insira o print do seu sistema em uma moldura de MacBook com sombra suave e fundo degradê para publicar no portfólio ou redes sociais.'
  }
};

// 7. Aplicação e Varredura de Todos os 70 Itens
let updatedCount = 0;
for (const item of catalog.items) {
  // Ajuste do Segmento para as 8 Verticais
  if (SEGMENT_MAPPING[item.segment]) {
    item.segment = SEGMENT_MAPPING[item.segment];
  }

  // Normalização das Tags
  item.tags = Array.from(new Set(item.tags.map(normalizeTag))).filter(Boolean);

  // Aplicação das atualizações de vídeos
  if (VIDEO_UPDATES[item.id]) {
    Object.assign(item, VIDEO_UPDATES[item.id]);
    updatedCount++;
  }

  // Aplicação das atualizações de carrosséis
  if (CAROUSEL_UPDATES[item.id]) {
    Object.assign(item, CAROUSEL_UPDATES[item.id]);
    updatedCount++;
  }

  // Aplicação das atualizações das 7 métricas
  if (METRIC_UPDATES[item.id]) {
    Object.assign(item, METRIC_UPDATES[item.id]);
    updatedCount++;
  }

  // Aplicação das atualizações de ferramentas e design
  if (TOOL_UPDATES[item.id]) {
    Object.assign(item, TOOL_UPDATES[item.id]);
    updatedCount++;
  }

  // Garante que todo item tem deliverable e practicalExample de alta qualidade
  if (!item.deliverable || item.deliverable.startsWith('Facilita o dia a dia')) {
    item.deliverable = `Recurso de referência indispensável para fluxos avançados de ${item.segment.toLowerCase()}.`;
  }
  if (!item.practicalExample || item.practicalExample.includes('sem instalar programas pesados')) {
    item.practicalExample = `Acesse o link direto e incorpore o recurso na rotina operacional para economizar horas de retrabalho manual.`;
  }
}

catalog.meta.updatedAt = new Date().toISOString();
catalog.meta.version = '1.5.0';

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`✅ Catálogo higienizado e enriquecido com sucesso: ${catalog.items.length} itens preservados, ${updatedCount} atualizados.`);
