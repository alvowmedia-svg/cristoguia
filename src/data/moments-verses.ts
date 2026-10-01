export interface MomentCategory {
  id: string;
  name: string;
  emoji: string;
  badgeColor: string;
  verse: {
    reference: string;
    bookId: string;
    chapter: number;
    verseNumber?: number;
    text: string;
    conversationalIntro: string;
    message: string;
    prayer: string;
  };
}

export const MOMENT_CATEGORIES: MomentCategory[] = [
  {
    id: 'ansiedade',
    name: 'Estou Ansioso(a)',
    emoji: '🌿',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    verse: {
      reference: '1 Pedro 5:7',
      bookId: '1pe',
      chapter: 5,
      verseNumber: 7,
      text: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.',
      conversationalIntro: 'Meu irmão(ã), o Senhor conhece o aperto no peito e as noites sem dormir. Respire fundo neste momento: você não precisa carregar o peso do amanhã sozinho.',
      message: 'Deus cuida dos lírios do campo e das aves do céu com zelo perfeito, e o cuidado dEle pela sua vida é infinitamente mais profundo. Entregue cada preocupação nas mãos daquele que governa o universo.',
      prayer: 'Pai Amado, entrego em Tuas mãos tudo aquilo que foge ao meu controle e rouba minha calma. Tira o aperto do meu peito, aquieta minha mente e preenche minha alma com a Tua graça infinita. Amém.'
    }
  },
  {
    id: 'paz',
    name: 'Preciso de Paz',
    emoji: '🕊️',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    verse: {
      reference: 'Filipenses 4:7',
      bookId: 'fp',
      chapter: 4,
      verseNumber: 7,
      text: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.',
      conversationalIntro: 'A paz que você procura não está nas circunstâncias do mundo, mas na presença viva de Jesus dentro do seu coração.',
      message: 'A paz que vem dos céus não é simplesmente a ausência de lutas, mas a certeza absoluta de que Cristo está no barco com você, ordenando aos ventos e ao mar que se aquietem.',
      prayer: 'Senhor Jesus, derrama a Tua paz no meu íntimo agora. Que a serenidade do Teu Santo Espírito guarde meus pensamentos contra todo desespero. Em Ti descanso e encontro refúgio. Amém.'
    }
  },
  {
    id: 'forca',
    name: 'Preciso de Força',
    emoji: '🛡️',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    verse: {
      reference: 'Isaías 41:10',
      bookId: 'is',
      chapter: 41,
      verseNumber: 10,
      text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.',
      conversationalIntro: 'Você sente que suas energias chegaram ao fim? Ouça a voz do seu Criador: Ele é a fonte inesgotável de vigor para os cansados.',
      message: 'Quando as suas próprias forças humanas se esgotam, é exatamente nesse instante que o poder soberano de Deus se aperfeiçoa na sua fraqueza. Levante a cabeça, Ele caminha ao seu lado.',
      prayer: 'Deus Todo-Poderoso, renova minhas forças físicas, emocionais e espirituais. Dá-me vigor para continuar a jornada com fé, sabendo que a Tua mão forte me sustenta a cada passo. Amém.'
    }
  },
  {
    id: 'tristeza',
    name: 'Estou Triste / Luto',
    emoji: '💧',
    badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    verse: {
      reference: 'Salmos 34:18',
      bookId: 'sl',
      chapter: 34,
      verseNumber: 18,
      text: 'Perto está o SENHOR dos que têm o coração quebrantado e salva os de espírito abatido.',
      conversationalIntro: 'Nenhuma lágrima que você derramou caiu no esquecimento de Deus. Ele não está distante; Ele está bem perto de você agora.',
      message: 'Nos momentos de dor profunda, perda ou tristeza, o Senhor se faz o mais terno Consolador. Permita-se ser abraçado pelo amor que cura todas as feridas da alma.',
      prayer: 'Pai de Misericórdias, Tu vês a minha dor e o meu pranto. Enxuga minhas lágrimas, conforta minha alma enlutada e traz de volta o consolo da Tua presença salvadora. Amém.'
    }
  },
  {
    id: 'direcao',
    name: 'Preciso de Direção',
    emoji: '🧭',
    badgeColor: 'bg-teal-50 text-teal-900 border-teal-200',
    verse: {
      reference: 'Provérbios 3:5-6',
      bookId: 'pv',
      chapter: 3,
      verseNumber: 5,
      text: 'Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
      conversationalIntro: 'Está diante de decisões difíceis e sem saber qual caminho escolher? Coloque seus planos aos pés do Senhor.',
      message: 'Deus não quer que você caminhe na escuridão da incerteza. Quando você consagra os seus passos a Ele em oração, Ele mesmo aplaina as veredas e abre as portas certas no tempo certo.',
      prayer: 'Senhor Deus, ilumina minhas decisões. Não quero agir pela minha própria razão limitada, mas pela sabedoria do Teu Espírito. Guia meus passos pelo caminho da retidão e da bênção. Amém.'
    }
  },
  {
    id: 'familia',
    name: 'Pela Minha Família',
    emoji: '🏡',
    badgeColor: 'bg-rose-50 text-rose-900 border-rose-200',
    verse: {
      reference: 'Josué 24:15',
      bookId: 'js',
      chapter: 24,
      verseNumber: 15,
      text: 'Porém eu e a minha casa serviremos ao SENHOR.',
      conversationalIntro: 'A sua família é um tesouro precioso diante de Deus. Cada joelho dobrado pela sua casa tem poder para transformar corações.',
      message: 'Não desanime por desentendimentos ou desafios no seu lar. Plante orações silenciosas, amor sacrificial e paciência diária. Deus tem promessas vivas sobre a sua descendência.',
      prayer: 'Senhor Jesus, entra na minha casa hoje. Visita cada cômodo, abençoa meus pais, filhos, cônjuge e parentes. Que a Tua paz reine sobre nós e que nossa casa seja um refúgio de amor e fé. Amém.'
    }
  },
  {
    id: 'gratidao',
    name: 'Quero Agradecer',
    emoji: '🌻',
    badgeColor: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    verse: {
      reference: 'Salmos 103:2',
      bookId: 'sl',
      chapter: 103,
      verseNumber: 2,
      text: 'Bendigam o SENHOR, ó minha alma, e não se esqueçam de nenhum de todos os seus benefícios!',
      conversationalIntro: 'Que lindo quando nos achegamos a Deus não apenas para pedir, mas com um cântico sincero de gratidão nos lábios!',
      message: 'Um coração agradecido atrai o favor e a presença do Pai. Mesmo nas pequenas dádivas — o ar que respiramos, o pão na mesa, a saúde e o perdão — Deus tem sido grandemente fiel.',
      prayer: 'Senhor Deus, meu coração hoje se derrama em gratidão! Obrigado por tudo o que fizeste, por tudo o que tens feito e por tudo o que ainda farás. Toda glória seja dada ao Teu Santo Nome. Amém!'
    }
  },
  {
    id: 'esperanca',
    name: 'Renovar Esperança',
    emoji: '🌅',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
    verse: {
      reference: 'Jeremias 29:11',
      bookId: 'jr',
      chapter: 29,
      verseNumber: 11,
      text: 'Porque sou eu que conheço os planos que tenho para vocês, diz o SENHOR, planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.',
      conversationalIntro: 'O que parece o fim para os olhos humanos é apenas o início do mover sobrenatural de Deus na sua história.',
      message: 'Deus nunca chega atrasado e nenhuma das Suas promessas cai por terra. Ele está forjando o seu caráter no deserto para te conduzir à terra que mana leite e mel. Espere nEle!',
      prayer: 'Senhor, renova minha esperança e alegria de viver. Ensina-me a confiar que os Teus planos são maiores que as minhas dores e que o meu futuro está guardado em Tuas mãos. Amém.'
    }
  }
];
