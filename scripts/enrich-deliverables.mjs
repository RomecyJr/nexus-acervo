import fs from 'node:fs';

const filePath = new URL('../data/catalog.json', import.meta.url);
const catalog = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Mapeamento de benefícios claros e descomplicados (linguagem humana de 12 a 80 anos)
const DELIVERABLES_MAP = {
  // Vídeos
  'video-natureza-humana': {
    youtubeId: 'RTo2akdZ7Dc',
    deliverable: 'Revela os segredos do comportamento humano para você entender as reais intenções das pessoas e não ser manipulado.',
    targetAudience: 'Qualquer pessoa que queira se relacionar melhor'
  },
  'video-20-horas': {
    youtubeId: '5MgBikgcWnY',
    deliverable: 'Um método prático para aprender qualquer nova habilidade (como tocar violão ou programar) praticando apenas 45 minutos por dia durante 1 mês.',
    targetAudience: 'Estudantes e mentes curiosas'
  },
  'video-growth-mindset': {
    youtubeId: '_X0mgOOSpLU',
    deliverable: 'Mostra como o cérebro se desenvolve com o esforço e ensina você a nunca mais ter medo de errar ou de novos desafios.',
    targetAudience: 'Estudantes, pais e profissionais'
  },
  'video-impostor': {
    youtubeId: 'I6B_v3eR5Wk',
    deliverable: 'Ensina técnicas mentais para superar a sensação de "não ser bom o suficiente" e ter mais autoconfiança no trabalho e na vida.',
    targetAudience: 'Profissionais e empreendedores'
  },
  'video-discussao': {
    youtubeId: 'uK4eT3c4G0M',
    deliverable: '5 técnicas psicológicas para defender suas ideias com calma, inteligência e respeito, sem precisar gritar ou brigar.',
    targetAudience: 'Qualquer pessoa'
  },
  'video-procrastinacao': {
    youtubeId: 'faE1EGQJ0lQ',
    deliverable: 'Um plano simples de ação para parar de enrolar e começar imediatamente as tarefas difíceis que você vive adiando.',
    targetAudience: 'Quem sofre com prazos e tarefas acumuladas'
  },
  'video-comparacao': {
    youtubeId: 'cnqxuqMvZaM',
    deliverable: 'Uma reflexão profunda para você parar de se comparar com a vida perfeita dos outros na internet e focar no que realmente importa para você.',
    targetAudience: 'Usuários de redes sociais'
  },
  'video-decisao': {
    youtubeId: 'cnqxuqMvZaM',
    deliverable: 'Um guia prático de clareza mental para você tomar aquela decisão importante que você vem empurrando com a barriga.',
    targetAudience: 'Quem está em encruzilhadas na carreira ou vida'
  },
  'video-13-minutos': {
    youtubeId: 'RZRritkIEA0',
    deliverable: '13 minutos de sabedoria prática sobre disciplina, tempo e foco para você reorganizar sua rotina e ter mais energia no dia a dia.',
    targetAudience: 'Quem quer melhorar sua produtividade diária'
  },
  'video-hacks': {
    youtubeId: 'RZRritkIEA0',
    deliverable: 'O teste definitivo dos melhores métodos de organização pessoal, mostrando sem rodeios o que realmente funciona e o que é perda de tempo.',
    targetAudience: 'Quem busca mais tempo livre no dia'
  },
  'video-pensar-papel': {
    youtubeId: 'RTo2akdZ7Dc',
    deliverable: 'Ensina como organizar pensamentos confusos usando apenas papel e caneta, clareando decisões difíceis e diminuindo a ansiedade.',
    targetAudience: 'Quem se sente sobrecarregado de informações'
  },
  'video-sucesso': {
    youtubeId: 'jYdE1f_bK38',
    deliverable: 'Uma conversa sincera sobre o que os ricos e bem-sucedidos realmente fazem por trás das câmeras, desmistificando fórmulas mágicas.',
    targetAudience: 'Empreendedores e sonhadores'
  },

  // Design e Ferramentas Brad Traversy
  'design-shadcn-ui': {
    deliverable: 'Blocos de construção prontos e modernos para criar sites elegantes e rápidos sem precisar desenhar botões e menus do zero.',
    targetAudience: 'Desenvolvedores e criadores de sites'
  },
  'design-aceternity-ui': {
    deliverable: 'Efeitos visuais e animações de cair o queixo para transformar qualquer página comum em uma experiência futurista.',
    targetAudience: 'Designers e programadores web'
  },
  'design-uiverse': {
    deliverable: 'Um shopping grátis com mais de 3.000 botões, cartões e loaders animados criados pela comunidade para copiar e colar.',
    targetAudience: 'Qualquer pessoa montando um site'
  },
  'design-coolors': {
    deliverable: 'Gera combinações perfeitas de cores que combinam entre si apenas apertando a barra de espaço do teclado.',
    targetAudience: 'Designers, artistas e iniciantes'
  },
  'design-realtime-colors': {
    deliverable: 'Permite testar e ver como suas cores e fontes favoritas ficam aplicadas em um site de verdade antes de publicar.',
    targetAudience: 'Quem está criando a identidade de um projeto'
  },
  'design-color-hunt': {
    deliverable: 'Milhares de paletas de cores prontas e consagradas para você nunca mais ter dúvida sobre qual cor usar na sua arte.',
    targetAudience: 'Designers gráficos e criadores'
  },
  'design-lucide-icons': {
    deliverable: 'Mais de 1.400 ícones modernos, elegantes e levíssimos que funcionam em qualquer tela e aplicativo.',
    targetAudience: 'Quem precisa de símbolos visuais limpos'
  },
  'design-tabler-icons': {
    deliverable: 'Uma imensa biblioteca com mais de 5.200 ícones de alta qualidade para usar livremente em apresentações e softwares.',
    targetAudience: 'Designers e programadores'
  },
  'design-simple-icons': {
    deliverable: 'Todos os logotipos oficiais de marcas (Instagram, Google, WhatsApp, Apple) em formato vetor limpo e perfeito.',
    targetAudience: 'Criadores de conteúdo e designers'
  },
  'design-undraw': {
    deliverable: 'Desenhos e ilustrações modernas gratuitas onde você pode escolher a cor exata para combinar com a sua empresa.',
    targetAudience: 'Quem quer deixar posts e páginas mais ilustrados'
  },
  'design-humaaans': {
    deliverable: 'Ilustrações de pessoas onde você pode trocar roupas, cabelos e poses como se fosse um brinquedo de montar.',
    targetAudience: 'Apresentações e sites modernos'
  },
  'design-hero-patterns': {
    deliverable: 'Texturas e padrões de fundo elegantes e repetíveis para seu site não ficar com fundo branco sem graça.',
    targetAudience: 'Designers de landing pages'
  },
  'design-gsap': {
    deliverable: 'A ferramenta mais potente do mundo para fazer elementos da página se moverem de forma suave conforme você rola a tela.',
    targetAudience: 'Desenvolvedores front-end avançados'
  },
  'design-lottiefiles': {
    deliverable: 'Animações profissionais super leves (como figurinhas animadas) que não deixam o seu aplicativo ou site pesado.',
    targetAudience: 'Criadores de aplicativos e sites'
  },
  'design-animate-css': {
    deliverable: 'Efeitos prontos de CSS para fazer caixas tremerem, surgirem ou pularem na tela com apenas 1 linha de código.',
    targetAudience: 'Iniciantes em criação de páginas'
  },
  'design-fontshare': {
    deliverable: 'Fontes tipográficas sofisticadas e gratuitas para dar aspecto de revista de luxo aos seus títulos e textos.',
    targetAudience: 'Quem quer tipografia de alto nível'
  },
  'design-google-fonts': {
    deliverable: 'O maior diretório do planeta com centenas de letras e fontes seguras, rápidas e gratuitas para usar em qualquer projeto.',
    targetAudience: 'Todo mundo que escreve na web'
  },
  'design-spline': {
    deliverable: 'Crie e brinque com objetos e mundos 3D diretamente no navegador mesmo sem saber computação gráfica avançada.',
    targetAudience: 'Designers 3D e mentes criativas'
  },
  'design-shots-so': {
    deliverable: 'Transforma fotos e prints feios em apresentações elegantes em molduras de celulares e notebooks em 5 segundos.',
    targetAudience: 'Quem posta nas redes sociais e portfólios'
  },
  'design-mobbin': {
    deliverable: 'Veja exatamente como os melhores aplicativos do mundo (Nubank, Airbnb, Duolingo) desenharam suas telas e fluxos.',
    targetAudience: 'Empreendedores e designers de produto'
  },

  // Outras ferramentas e conhecimentos clássicos
  'tool-excalidraw': {
    deliverable: 'Um quadro branco virtual intuitivo para rabiscar ideias, rascunhos e fluxogramas como se fosse no papel.',
    targetAudience: 'Quem precisa explicar ideias visualmente'
  },
  'tool-graphite': {
    deliverable: 'Editor gráfico gratuito e leve no navegador para criar desenhos vetoriais e ilustrações sem pagar mensalidades caras.',
    targetAudience: 'Ilustradores e designers'
  },
  'metric-roi': {
    deliverable: 'A fórmula matemática simples para saber se o dinheiro que você gastou em um projeto voltou com lucro ou com prejuízo.',
    targetAudience: 'Qualquer pessoa que cuida do próprio dinheiro ou negócio'
  },
  'metric-cac': {
    deliverable: 'Mostra na ponta do lápis quanto custou cada novo cliente que entrou na sua empresa.',
    targetAudience: 'Empreendedores e comerciantes'
  },
  'metric-ticket-medio': {
    deliverable: 'Calcula quanto cada cliente gasta em média toda vez que compra com você, ajudando a aumentar o faturamento.',
    targetAudience: 'Lojistas e prestadores de serviço'
  },
  'metric-runway': {
    deliverable: 'Calcula quantos meses de vida a sua empresa ainda tem com o dinheiro que está guardado no banco antes de quebrar.',
    targetAudience: 'Startups e donos de empresas'
  },
  'metric-churn': {
    deliverable: 'Mede a porcentagem de clientes que cancelaram ou deixaram de comprar de você no último mês.',
    targetAudience: 'Negócios de assinatura e serviços'
  },
  'metric-mrr': {
    deliverable: 'A receita previsível que cai religiosamente na sua conta todo mês com mensalidades ou assinaturas.',
    targetAudience: 'Empresas de SaaS e escolas'
  },
  'metric-ebitda': {
    deliverable: 'O lucro operacional real da empresa, mostrando se a operação dá dinheiro de verdade antes de impostos e juros de banco.',
    targetAudience: 'Investidores e empresários'
  }
};

for (const item of catalog.items) {
  // Extrai YouTube ID se disponível
  if (item.url.includes('youtube.com/watch') || item.url.includes('youtu.be/')) {
    const match = item.url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[&?]|$)/);
    if (match && match[1]) {
      item.youtubeId = match[1];
      item.thumbnail = `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
  }

  // Extrai GitHub OpenGraph se for repositório
  if (item.url.includes('github.com/')) {
    const ghMatch = item.url.match(/github\.com\/([^\/]+)\/([^\/#?]+)/);
    if (ghMatch && ghMatch[1] && ghMatch[2]) {
      item.thumbnail = `https://opengraph.githubassets.com/1/${ghMatch[1]}/${ghMatch[2]}`;
    }
  }

  // Preenche dados específicos do mapa
  if (DELIVERABLES_MAP[item.id]) {
    const d = DELIVERABLES_MAP[item.id];
    if (d.youtubeId) {
      item.youtubeId = d.youtubeId;
      item.thumbnail = `https://img.youtube.com/vi/${d.youtubeId}/hqdefault.jpg`;
    }
    item.deliverable = d.deliverable;
    item.targetAudience = d.targetAudience;
  } else {
    // Fallback inteligente para itens sem texto manual
    if (!item.deliverable) {
      if (item.kind === 'ferramenta') {
        item.deliverable = `Facilita o dia a dia oferecendo recursos práticos e diretos para ${item.description.toLowerCase()}`;
      } else if (item.kind === 'vídeo') {
        item.deliverable = `Aula explicativa e objetiva sobre ${item.title.toLowerCase()}, sem jargões complicados.`;
      } else if (item.kind === 'repositório') {
        item.deliverable = `Código e documentação aberta e pronta para usar em projetos de ${item.segment.toLowerCase()}.`;
      } else {
        item.deliverable = `Conhecimento essencial e mastigado para entender ${item.title.toLowerCase()} com rapidez.`;
      }
    }
    if (!item.targetAudience) {
      item.targetAudience = 'Profissionais e entusiastas';
    }
  }
}

catalog.meta.version = '1.2.0';
catalog.meta.updatedAt = new Date().toISOString();

fs.writeFileSync(filePath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
console.log(`Enriquecimento concluído com sucesso em ${catalog.items.length} itens.`);
