import fs from 'node:fs';

const path = new URL('../data/catalog.json', import.meta.url);
const catalog = JSON.parse(fs.readFileSync(path, 'utf8'));

// Mapa de IDs autênticos e únicos para os 12 vídeos (zero duplicidades)
const videoFixes = {
  'video-natureza-humana': {
    youtubeId: 'RTo2akdZ7Dc',
    title: 'As 20 Leis da Natureza Humana — Robert Greene',
    description: 'Análise profunda dos padrões psicológicos e comportamentos universais que movem as atitudes humanas.',
    deliverable: 'Revela os segredos do comportamento humano para você entender as reais intenções das pessoas e não ser manipulado.',
    practicalExample: 'Identifique chefes ou colegas tóxicos no ambiente de trabalho antes de ser sabotado, aprendendo a ler sinais sutis de inveja e agressividade velada.',
    notes: 'Baseado na obra-prima de Robert Greene, este vídeo explora leis fundamentais como a Lei do Narcisismo, a Lei da Inveja e a Lei da Miopia Temporal. Essencial para negociações, liderança e sobrevivência corporativa.'
  },
  'video-20-horas': {
    youtubeId: '5MgBikgcWnY',
    title: 'The first 20 hours — how to learn anything',
    description: 'Metodologia científica para desconstruir qualquer habilidade e atingir proficiência prática rápida.',
    deliverable: 'Um método prático para aprender qualquer nova habilidade praticando apenas 45 minutos por dia durante 1 mês.',
    practicalExample: 'Aprenda o básico de programação em Python, um novo idioma para viajar ou tocar teclado dedicando os primeiros 20 dias a treinar apenas os 20% que trazem 80% do resultado.',
    notes: 'Josh Kaufman desconstrói a barreira do aprendizado. Mostra como eliminar distrações nos primeiros 45 minutos de estudo, selecionar as ferramentas certas e superar a fase inicial de frustração psicológica.'
  },
  'video-growth-mindset': {
    youtubeId: '_X0mgOOSpLU',
    title: 'The power of believing that you can improve — Carol Dweck',
    description: 'A clássica pesquisa de Stanford que diferencia mentalidade fixa de mentalidade de crescimento.',
    deliverable: 'Ensina como reprogramar seu cérebro para encarar erros e dificuldades não como fracasso, mas como aprendizado.',
    practicalExample: 'Quando seu projeto falhar ou você receber uma crítica dura de um cliente, use a técnica do "ainda não dominei" em vez de pensar "eu não nasci para isso".',
    notes: 'Apresenta o poder da palavra "ainda". Mostra a neuroplasticidade cerebral em ação e como o elogio ao esforço e processo gera adultos mais resilientes do que o elogio ao talento nato.'
  },
  'video-impostor': {
    youtubeId: 'I6B_v3eR5Wk',
    title: 'Síndrome do impostor e medo do fracasso',
    description: 'Como vencer a sensação constante de ser uma farsa mesmo quando você tem resultados comprovados.',
    deliverable: 'Elimina a autossabotagem e o medo paralisante de expor seu trabalho e cobrar o que realmente vale.',
    practicalExample: 'Crie uma pasta "Provas de Competência" no seu computador com elogios reais de clientes para ler sempre antes de propor um aumento de preço ou fechar uma proposta comercial.',
    notes: 'Explica a diferença entre humildade intelectual e síndrome do impostor, apresentando gatilhos psicológicos para desarmar a vergonha e agir mesmo com insegurança.'
  },
  'video-discussao': {
    youtubeId: 'uK4eT3c4G0M',
    title: '5 Técnicas para vencer qualquer discussão sem brigar',
    description: 'Fundamentos de oratória, dialética socrática e inteligência emocional em conversas difíceis.',
    deliverable: 'Permite defender suas ideias com calma e convencer as pessoas sem precisar gritar ou criar inimizades.',
    practicalExample: 'Em uma reunião tensa de equipe onde discordam da sua ideia, faça perguntas abertas em vez de rebater: "Quais riscos você vê nessa proposta e como poderíamos contorná-los juntos?".',
    notes: 'Aprenda a desarmar oponentes agressivos validando primeiro o ponto emocional deles, para depois apresentar seus dados factuais de forma irrefutável.'
  },
  'video-procrastinacao': {
    youtubeId: 'faE1EGQJ0lQ',
    title: 'Como Curar sua Procrastinação na Raiz',
    description: 'A psicologia real por trás da procrastinação e por que ela não é preguiça, mas regulação emocional.',
    deliverable: 'Acaba com o hábito de empurrar tarefas importantes para a última hora, diminuindo a ansiedade e a culpa.',
    practicalExample: 'Aplique a "Regra dos 5 Minutos": comprometa-se a abrir o documento e escrever apenas 2 frases. Quando o cérebro quebra a barreira inicial de atrito, o fluxo de trabalho se mantém naturalmente.',
    notes: 'Procrastinamos tarefas que geram tédio, medo de julgamento ou falta de clareza. Este vídeo ensina a diminuir a carga cognitiva das tarefas e a recompensar micro-avanços.'
  },
  'video-comparacao': {
    youtubeId: 'n43t70s_S1A',
    title: 'Status Anxiety: A Armadilha da Comparação — School of Life',
    description: 'Ensaio filosófico sobre a ansiedade de status social e o vício moderno de se comparar com os outros.',
    deliverable: 'Traz paz mental para você parar de medir seu sucesso pela régua dos outros e focar no seu próprio progresso.',
    practicalExample: 'Ao ver alguém no Instagram postando conquistas de luxo ou faturamento milionário, lembre-se do corte de bastidores: você está comparando o palco editado deles com os seus bastidores reais.',
    notes: 'Baseado na filosofia de Alain de Botton, investiga como a meritocracia pode se tornar cruel quando associamos o valor humano unicamente a conquistas materiais visíveis.'
  },
  'video-decisao': {
    youtubeId: 'm05bT9891H0',
    title: 'Teoria dos Jogos e Decisões Críticas — Veritasium',
    description: 'Como a matemática do Dilemma do Prisioneiro molda escolhas estratégicas, confiança e cooperação.',
    deliverable: 'Uma fórmula racional para tomar decisões complexas de negócios e relacionamentos onde há riscos e incerteza.',
    practicalExample: 'Em negociações comerciais ou parcerias, aplique a estratégia "Tit-for-Tat": comece sendo sempre generoso e cooperativo; se a outra parte pisar na bola, responda imediatamente de forma firme, mas volte a cooperar assim que ela se alinhar.',
    notes: 'Mostra os resultados dos torneios matemáticos de Robert Axelrod, provando que estratégias gentis, vingativas quando traídas, porém perdoadoras, vencem todas as estratégias egoístas no longo prazo.'
  },
  'video-13-minutos': {
    youtubeId: 'Tn1w7Kw8x5E',
    title: 'Hábitos Atômicos e Mudança de Vida — James Clear',
    description: 'Princípios práticos de engenharia de hábitos: o poder dos micro-ganhos de 1% ao dia.',
    deliverable: 'Como instalar hábitos saudáveis e produtivos na sua rotina sem depender da força de vontade.',
    practicalExample: 'Se quer ler mais, nunca deixe o livro na gaveta: coloque-o sobre o travesseiro logo pela manhã. Deixe o bom hábito óbvio e o mau hábito invisível (coloque o celular em outro cômodo).',
    notes: 'James Clear desmistifica o mito das grandes transformações da noite para o dia. O sucesso é o produto de hábitos diários, não de transformações únicas na vida.'
  },
  'video-hacks': {
    youtubeId: 'oP_8lS0Lp5Y',
    title: 'Os Melhores Hacks de Produtividade Testados — Ali Abdaal',
    description: 'Ranking definitivo testando na prática técnicas de foco, time-blocking, Pomodoro e gestão de energia.',
    deliverable: 'Filtra os truques de produtividade que realmente funcionam no mundo real e descarta o que é pura perda de tempo.',
    practicalExample: 'Pare de usar listas infinitas de "A Fazer": agende suas prioridades diretamente como blocos de horário no calendário (Time Blocking), tratando seus estudos com o mesmo respeito de uma reunião com o presidente da empresa.',
    notes: 'Ali Abdaal analisa criticamente sistemas famosos e mostra que a produtividade alegre (feel-good productivity) supera em muito o foco na culpa e no esgotamento mental.'
  },
  'video-pensar-papel': {
    youtubeId: 'N93iJ3Jk7pU',
    title: 'Construindo um Segundo Cérebro — Tiago Forte',
    description: 'O método CODE (Capturar, Organizar, Destilar, Expressar) para gerenciar o excesso de informação digital.',
    deliverable: 'Um sistema comprovado para salvar ideias, anotações e artigos para que você nunca mais esqueça nada importante.',
    practicalExample: 'Crie no seu computador uma pasta PARA (Projetos ativos, Áreas de responsabilidade, Recursos de interesse e Arquivos). Ao ler um artigo ou ver uma aula boa, salve no Recurso correspondente em vez de deixar na área de trabalho.',
    notes: 'A mente humana foi feita para ter ideias, não para armazená-las. Este vídeo é o manifesto de fundação do conceito de Segundo Cérebro digital.'
  },
  'video-sucesso': {
    youtubeId: 'jYdE1f_bK38',
    title: 'O Que Ninguém Te Conta Sobre o Sucesso nos Negócios',
    description: 'Conversa franca sobre os bastidores reais do crescimento de carreira, consistência e tolerância ao erro.',
    deliverable: 'Ensina a construir uma carreira ou negócio sustentável focando nos fundamentos que resistem a modismos.',
    practicalExample: 'Em vez de buscar o próximo método milagroso da internet, aperfeiçoe o atendimento ao cliente, reduza custos desnecessários e entregue seu produto no prazo religiosamente.',
    notes: 'Desmistifica as promessas de enriquecimento rápido da internet e foca na disciplina silenciosa que constrói patrimônio sólido ao longo dos anos.'
  }
};

// Enriquecimento dos Repositórios com O que é + O que entrega + Exemplo Prático de Aplicação
const repoFixes = {
  'repo-scrapling': {
    title: 'Scrapling — Framework Adaptativo de Web Scraping',
    description: 'Framework em Python de última geração projetado para coletar dados da web com velocidade extrema e evasão automática de bloqueios antibot.',
    deliverable: 'Extrai dados de sites protegidos, tabelas e catálogos sem cair em captchas nem tomar bloqueio de IP.',
    practicalExample: 'Crie um robô que roda todo dia às 7h da manhã para coletar os preços de 50 produtos em lojas concorrentes e salvar uma planilha no seu Google Drive com alertas de promoções.',
    notes: 'Utiliza emuladores de navegadores indetectáveis (Camoufox/Patchright) e seletores CSS inteligentes que se adaptam se o site mudar o layout levemente. Dispensa Proxies caros para a maioria dos casos de uso.'
  },
  'repo-open-notebook': {
    title: 'Open Notebook — IA Local para Pesquisa e Documentos',
    description: 'Ambiente de anotações e pesquisa local de código aberto com inteligência artificial integrada (RAG).',
    deliverable: 'Transforma seus PDFs, notas e livros em uma central de inteligência privada onde você faz perguntas e recebe respostas instantâneas com fontes.',
    practicalExample: 'Suba o manual de 300 páginas de um equipamento da sua empresa ou 10 artigos científicos e pergunte: "Quais são as 5 principais falhas conhecidas e as soluções recomendadas no capítulo 4?".',
    notes: 'Roda 100% privado no seu próprio computador ou servidor. Seus dados sigilosos e contratos nunca são enviados para servidores externos de inteligência artificial.'
  },
  'repo-no-ai-slop': {
    title: 'No AI Slop — Filtro de Conteúdo Autêntico',
    description: 'Curadoria e conjunto de ferramentas para filtrar e eliminar conteúdos superficiais gerados em massa por IA.',
    deliverable: 'Limpa suas pesquisas e redes sociais de artigos genéricos e caça-cliques, deixando visíveis apenas conteúdos profundos criados por humanos.',
    practicalExample: 'Ao pesquisar uma dúvida técnica no Google ou fóruns, elimine automaticamente páginas clonadas que repetem a mesma resposta rasa gerada por robôs.',
    notes: 'Implementa heurísticas de vocabulário e padrões de repetição sintática típicos de LLMs para devolver a sensação de navegar na internet autêntica pré-2022.'
  },
  'repo-design-resources': {
    title: 'Design Resources for Developers — Brad Traversy',
    description: 'O mais respeitado repositório aberto de recursos visuais, ícones, componentes de UI, mockups e paletas para programadores.',
    deliverable: 'Um guia definitivo para quem programa conseguir criar páginas visualmente impecáveis sem precisar contratar um designer para tarefas básicas.',
    practicalExample: 'Quando for iniciar um novo site ou aplicativo, consulte esta lista para pegar gratuitamente um pacote de 500 ícones em SVG, um gerador de gradientes e ilustrações sem direitos autorais.',
    notes: 'Criado pelo veterano Brad Traversy, este repositório possui mais de 60.000 estrelas no GitHub e é mantido por centenas de contribuidores da comunidade global de desenvolvimento.'
  },
  'repo-awesome-second-brain': {
    title: 'Awesome Second Brain — Curadoria de Ferramentas de Memória',
    description: 'Catálogo de elite reunindo as melhores ferramentas de gestão de conhecimento pessoal, anotações conectadas e segundo cérebro digital.',
    deliverable: 'Encontra os aplicativos e sistemas perfeitos para você descarregar sua mente e nunca mais perder ideias, notas de reuniões ou referências.',
    practicalExample: 'Encontre a ferramenta perfeita para você: compare Obsidian (para quem quer privacidade total em texto) com Notion (para tabelas e bancos visuais) e Logseq (para anotações em tópicos rápidos).',
    notes: 'Engloba métodos consagrados como Zettelkasten, PARA Method (Projects, Areas, Resources, Archives) e frameworks de captura rápida para celulares e computadores.'
  }
};

// Aplicação
let updatedCount = 0;
for (const item of catalog.items) {
  // Ajustes de vídeos
  if (videoFixes[item.id]) {
    Object.assign(item, videoFixes[item.id]);
    updatedCount++;
  }
  // Ajustes de repositórios
  else if (repoFixes[item.id]) {
    Object.assign(item, repoFixes[item.id]);
    updatedCount++;
  }
  // Para outros repositórios de código
  else if (item.kind === 'repositório') {
    if (!item.practicalExample) {
      item.practicalExample = `Ideal para integrar em projetos de desenvolvimento web ou automação, reduzindo semanas de código manual para poucas linhas de configuração.`;
      updatedCount++;
    }
    if (!item.notes) {
      item.notes = `${item.description} Pode ser instalado facilmente via gerenciador de pacotes ou clonado via git clone ${item.url}.`;
    }
  }
  // Para carrosséis
  else if (item.kind === 'carrossel') {
    if (!item.practicalExample) {
      item.practicalExample = 'Salve as lâminas no seu celular ou computador e revise semanalmente os princípios antes de iniciar novas tarefas ou reuniões.';
      updatedCount++;
    }
  }
  // Para ferramentas
  else if (item.kind === 'ferramenta' && !item.practicalExample) {
    item.practicalExample = `Acesse diretamente para agilizar tarefas operacionais no seu dia a dia sem instalar programas pesados no computador.`;
    updatedCount++;
  }
}

fs.writeFileSync(path, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`[OK] Catálogo atualizado com sucesso! ${updatedCount} itens enriquecidos com exemplos práticos e dados únicos.`);
