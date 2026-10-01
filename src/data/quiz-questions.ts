import { QuizQuestion } from '../types/bible';

export const THEOLOGICAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // NÍVEL 1: NEÓFITO (Fundamentos Bíblicos)
  {
    id: 'q-neo-1',
    level: 'neofito',
    question: 'Qual dos livros do Pentateuco registra a outorga dos Dez Mandamentos no Monte Sinai?',
    options: ['Gênesis', 'Êxodo', 'Levítico', 'Josué'],
    correctIndex: 1,
    theologicalRationale: 'O livro de Êxodo (Shemot) narra a teofania no Sinai e o momento solene em que o Decálogo é entregue a Moisés como coração da aliança mosaica.',
    biblicalProof: 'Êxodo 20:1-17: "Então falou Deus todas estas palavras, dizendo: Eu sou o SENHOR, teu Deus, que te tirei da terra do Egito, da casa da servidão..."',
    passageRef: 'Êxodo 20:1-17'
  },
  {
    id: 'q-neo-2',
    level: 'neofito',
    question: 'Qual profeta foi engolido por um grande peixe após tentar fugir da ordem divina de pregar em Nínive?',
    options: ['Isaías', 'Jeremias', 'Jonas', 'Ezequiel'],
    correctIndex: 2,
    theologicalRationale: 'Jonas tentou embarcar para Társis no sentido oposto ao chamado de Deus, sendo repreendido e preservado pelo grande peixe preparado pelo SENHOR.',
    biblicalProof: 'Jonas 1:17: "Deparou o SENHOR um grande peixe, para que tragasse a Jonas; e esteve Jonas três dias e três noites no ventre do peixe."',
    passageRef: 'Jonas 1:17'
  },
  {
    id: 'q-neo-3',
    level: 'neofito',
    question: 'No Sermão do Monte, a que elementos vitais Jesus comparou Seus discípulos em relação à sociedade?',
    options: ['À espada e ao escudo', 'Ao sal da terra e à luz do mundo', 'Ao trigo e ao cedro do Líbano', 'À arca e ao maná'],
    correctIndex: 1,
    theologicalRationale: 'O sal atua como conservante contra a putrefação moral e tempero espiritual; a luz dissipa a escuridão do pecado e aponta a glória do Pai celeste.',
    biblicalProof: 'Mateus 5:13-14: "Vós sois o sal da terra... Vós sois a luz do mundo. Não se pode esconder uma cidade edificada sobre um monte."',
    passageRef: 'Mateus 5:13-14'
  },
  {
    id: 'q-neo-4',
    level: 'neofito',
    question: 'Quem sucedeu a Moisés como líder do povo de Israel para conduzir a conquista da terra de Canaã?',
    options: ['Calebe', 'Gideão', 'Josué', 'Arão'],
    correctIndex: 2,
    theologicalRationale: 'Josué, filho de Num, foi investido de autoridade divina e encorajado com a promessa de presença contínua: "Não to mandei eu? Sê forte e corajoso".',
    biblicalProof: 'Josué 1:1-2: "Sucedeu, depois da morte de Moisés, servo do SENHOR, que este falou a Josué, filho de Num, servidor de Moisés, dizendo: Moisés, meu servo, é morto; dispõe-te, agora, passa este Jordão..."',
    passageRef: 'Josué 1:1-2'
  },

  // NÍVEL 2: DISCÍPULO (Doutrina, Aliança & História Bíblica)
  {
    id: 'q-disc-1',
    level: 'discipulo',
    question: 'Em qual capítulo de Isaías encontramos a mais explícita profecia sobre os sofrimentos vicários do Messias?',
    options: ['Isaías 9', 'Isaías 40', 'Isaías 53', 'Isaías 61'],
    correctIndex: 2,
    theologicalRationale: 'Isaías 53 constitui o quarto Cântico do Servo, descrevendo com riqueza de detalhes a expiação substitutiva: "Ele foi traspassado pelas nossas transgressões e moído pelas nossas iniquidades".',
    biblicalProof: 'Isaías 53:5: "Mas ele foi traspassado pelas nossas transgressões e moído pelas nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas suas pisaduras fomos sarados."',
    passageRef: 'Isaías 53:5'
  },
  {
    id: 'q-disc-2',
    level: 'discipulo',
    question: 'De acordo com a Epístola aos Gálatas, qual é a principal função pedagógica da Lei antes da vinda de Cristo?',
    options: [
      'Garantir a justificação por mérito humano',
      'Servir como aio (tutor) para nos conduzir a Cristo',
      'Substituir a aliança da promessa dada a Abraão',
      'Extinguir a necessidade da graça'
    ],
    correctIndex: 1,
    theologicalRationale: 'No mundo helênico, o "paidagogos" era o servo encarregado de conduzir a criança à escola. A Lei evidencia nossa incapacidade e pecado para nos conduzir à justificação pela fé em Cristo.',
    biblicalProof: 'Gálatas 3:24: "De maneira que a lei nos serviu de aio para nos conduzir a Cristo, a fim de que fôssemos justificados por fé."',
    passageRef: 'Gálatas 3:24'
  },
  {
    id: 'q-disc-3',
    level: 'discipulo',
    question: 'Qual patriarca teve seu nome mudado para Israel após lutar com o Anjo do Senhor junto ao vau de Jaboque?',
    options: ['Abraão', 'Isaque', 'Jacó', 'José'],
    correctIndex: 2,
    theologicalRationale: 'Jacó, cujo nome evocava o usurpador/suplantador, foi quebrantado no Jaboque e recebeu o nome de "Israel" ("o que luta com Deus e prevalece").',
    biblicalProof: 'Gênesis 32:28: "Então, disse: Já não te chamarás Jacó, e sim Israel, pois como príncipe lutaste com Deus e com os homens e prevaleceste."',
    passageRef: 'Gênesis 32:28'
  },
  {
    id: 'q-disc-4',
    level: 'discipulo',
    question: 'Na celebração da Páscoa judaica e na teologia paulina, Cristo é tipificado como:',
    options: ['O novo rei Davi', 'O Cordeiro Pascal imolado', 'O Templo físico reconstruído', 'O maná do deserto apenas'],
    correctIndex: 1,
    theologicalRationale: 'Assim como o sangue do cordeiro nos umbrais livrou os primogênitos no Egito, o sangue de Cristo, o Cordeiro imaculado, nos redime da condenação eterna.',
    biblicalProof: '1 Coríntios 5:7: "Lançai fora o velho fermento... pois Cristo, nosso Cordeiro pascal, foi imolado."',
    passageRef: '1 Coríntios 5:7'
  },

  // NÍVEL 3: MESTRE DAS LETRAS (Exegese, Teologia Bíblica & Idiomas Bíblicos)
  {
    id: 'q-mes-1',
    level: 'mestre',
    question: 'No prólogo de João (1:1), o termo grego "Logos" evoca tanto a filosofia grega quanto qual conceito hebraico fundamental do Antigo Testamento?',
    options: [
      'A "Shekinah" (Glória visível)',
      'O "Dabar Yahweh" (A Palavra criadora e reveladora do SENHOR)',
      'O "Urim e Tumim" do sumo sacerdote',
      'O "Goel" (Parente remidor)'
    ],
    correctIndex: 1,
    theologicalRationale: 'Embora o público gentílico conhecesse o "Logos" como o princípio cósmico da razão, João ancora a cristologia no "Dabar Yahweh" do Antigo Testamento — a Palavra viva e eficaz pela qual Deus cria os mundos e Se comunica com os profetas.',
    biblicalProof: 'Salmos 33:6: "Os céus por sua palavra (Dabar) se fizeram, e, pelo sopro de sua boca, o exército deles." João 1:1: "No princípio era o Verbo (Logos), e o Verbo estava com Deus..."',
    passageRef: 'João 1:1 / Salmos 33:6'
  },
  {
    id: 'q-mes-2',
    level: 'mestre',
    question: 'Na Epístola aos Hebreus, Cristo é proclamado Sumo Sacerdote eterno não segundo a ordem de Arão (levítica), mas segundo qual ordem régia?',
    options: ['Ordem de Davi', 'Ordem de Melquisedeque', 'Ordem de Samuel', 'Ordem de Moisés'],
    correctIndex: 1,
    theologicalRationale: 'Melquisedeque, rei de Salém e sacerdote do Deus Altíssimo em Gênesis 14, unia a realeza e o sacerdócio sem linhagem genealógica levítica, prefigurando o sacerdócio perpétuo e celestial de Cristo.',
    biblicalProof: 'Hebreus 7:17: "Porque dele assim se testifica: Tu és sacerdote para sempre, segundo a ordem de Melquisedeque."',
    passageRef: 'Hebreus 7:17 / Salmos 110:4'
  },
  {
    id: 'q-mes-3',
    level: 'mestre',
    question: 'Qual profecia de Daniel estabelece o período exato das "Setenta Semanas" determinadas sobre o povo judeu até a unção do Santo dos Santos e a consumação messiânica?',
    options: ['Daniel 2', 'Daniel 7', 'Daniel 9', 'Daniel 12'],
    correctIndex: 2,
    theologicalRationale: 'Em Daniel 9, o anjo Gabriel responde à oração intercessória do profeta com o cronograma escatológico de 70 semanas de anos (490 anos) até a expiação da iniquidade e o corte do Messias.',
    biblicalProof: 'Daniel 9:24: "Setenta semanas estão determinadas sobre o teu povo e sobre a tua santa cidade, para fazer cessar a transgressão, para dar fim aos pecados, para expiar a iniquidade..."',
    passageRef: 'Daniel 9:24-27'
  },
  {
    id: 'q-mes-4',
    level: 'mestre',
    question: 'O termo teológico "Quenose" (Kenosis), que se refere ao autoesvaziamento humilde de Cristo ao assumir a natureza humana, tem sua sede bíblica primária em qual passagem?',
    options: ['Romanos 5:12-21', 'Filipenses 2:5-11', 'Colossenses 1:15-20', 'Hebreus 1:1-4'],
    correctIndex: 1,
    theologicalRationale: 'O célebre "Carmen Christi" (hino cristológico) de Filipenses 2:7 utiliza o verbo grego "ekenosen" (esvaziou-se a si mesmo), renunciando não à Sua divindade, mas às prerrogativas da glória celestial para assumir a forma de servo.',
    biblicalProof: 'Filipenses 2:6-7: "Pois ele, subsistindo em forma de Deus, não julgou como usurpação o ser igual a Deus; antes, a si mesmo se esvaziou (ekenosen), assumindo a forma de servo..."',
    passageRef: 'Filipenses 2:6-7'
  }
];
