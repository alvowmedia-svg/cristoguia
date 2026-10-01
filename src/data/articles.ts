import { EditorialArticle } from '../types/bible';

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-001',
    title: 'Os Manuscritos de Qumran e a Inviolável Transmissão das Escrituras',
    subtitle: 'Como a descoberta arqueológica mais monumental do século XX silenciou o ceticismo textual e confirmou a fidelidade milenar da Bíblia Hebraica.',
    slug: 'manuscritos-qumran-preservacao-biblica',
    category: 'Arqueologia & Crítica Textual',
    author: {
      name: 'Dr. Emanuel Ben-Ami',
      title: 'Doutor em Arqueologia Bíblica pela Universidade Hebraica de Jerusalém',
      avatarInitials: 'EB'
    },
    publishedAt: 'Outubro de 2026',
    readTimeMinutes: 8,
    tags: ['Qumran', 'Manuscritos', 'Mar Morto', 'Crítica Textual', 'Isaías'],
    relatedPassages: [
      { bookId: 'is', bookName: 'Isaías', chapter: 40, verse: 8, label: 'Isaías 40:8 - A Palavra que Permanece Eternamente' },
      { bookId: 'is', bookName: 'Isaías', chapter: 53, verse: 5, label: 'Isaías 53:5 - O Grande Rolo de Isaías (1QIs-a)' },
      { bookId: 'sl', bookName: 'Salmos', chapter: 119, verse: 89, label: 'Salmos 119:89 - Estabelecida nos Céus' }
    ],
    sections: [
      {
        id: 'sec-1',
        title: '01. A Caverna 1 e a Ruptura de um Paradoxo Milenar',
        content: [
          'No final da primavera de 1947, um jovem pastor beduíno da tribo Ta\'amireh atirou uma pedra no vão escarpado de um penhasco de calcário nas imediações de Khirbet Qumran, a noroeste do Mar Morto. O eco inusitado de cerâmica despedaçada não denunciava uma cabra desgarrada, mas o rompimento de um silêncio documental de quase dois milênios.',
          'Dentro de jarros de barro cozido selados com breu, jaziam rolos de pergaminho envoltos em linho ancestral. Até aquele momento, os manuscritos hebraicos completos mais antigos em posse do mundo acadêmico eram o Códice de Alepo (século X d.C.) e o Códice de Leningrado (1008 d.C.), cópias do Texto Massorético separadas por mais de mil anos dos autógrafos originais.',
          'O ceticismo acadêmico da primeira metade do século XX sustentava a tese de que séculos ininterruptos de copistas humanos teriam inevitavelmente deformado, suavizado ou hiperbolizado as passagens messiânicas e históricas do Antigo Testamento. Qumran veio para colocar essa hipótese à prova de fogo sob a mais rigorosa análise paleográfica.'
        ],
        pullQuote: 'A descoberta em Qumran recuou a linha temporal dos manuscritos bíblicos em mais de mil anos com um único estrondo arqueológico.'
      },
      {
        id: 'sec-2',
        title: '02. O Grande Rolo de Isaías e a Consistência Textual',
        content: [
          'Entre os achados mais espetaculares estava o chamado 1QIs-a: um rolo quase perfeitamente intacto com mais de sete metros de comprimento contendo os 66 capítulos completos do profeta Isaías, datado paleograficamente de cerca de 125 a.C.',
          'Quando eruditos de renome internacional como Millar Burrows, John Trever e William Foxwell Albright realizaram o confronto palavra por palavra entre o manuscrito de Qumran e o Texto Massorético mil anos posterior, o resultado estarreceu a comunidade científica: a correspondência textual ultrapassava 95% do vocabulário.',
          'As poucas discrepâncias identificadas resumiam-se primariamente a variantes ortográficas e pequenas partículas conjuncionais, sem que nenhuma doutrina fundamental, profecia messiânica ou narrativa teológica sofresse alteração substancial. O capítulo 53 de Isaías, a espinha dorsal da expiação vicária do Servo Sofredor, revelou-se rigorosamente idêntico.'
        ],
        pullQuote: 'Seca-se a erva, cai a flor, mas a palavra do nosso Deus permanece eternamente.'
      },
      {
        id: 'sec-3',
        title: '03. A Comunidade Essênia e o Escriba Sagrado',
        content: [
          'Os habitantes de Qumran viviam sob uma disciplina quase monástica, aguardando a intervenção escatológica de Deus no deserto. No chamado "Scriptorium", arqueólogos desenterraram mesas longas de gesso e tinteiros de bronze que atestam a veneração quase reverente dedicada à reprodução manuscrita.',
          'Antes de traçar cada caractere sagrado do tetragrama divino YHWH, o copista realizava uma imersão ritual nos tanques de purificação cerimonial escavados na rocha. Cada linha era rigorosamente contada, e erros crassos resultavam no recolhimento solene do pergaminho, impedindo que textos imperfeitos circulassem.',
          'A providência que preservou as Escrituras operou não no vácuo, mas através da fidelidade sacrificial de homens que entendiam estar lidando com as próprias palavras do Deus Vivo.'
        ]
      }
    ]
  },
  {
    id: 'art-002',
    title: 'A Cidade de Davi: O Que as Pedras Revelam Sob as Colinas de Sião',
    subtitle: 'Escavações arqueológicas contemporâneas em Jerusalém desenterram os alicerces do palácio davídico e selam a historicidade da monarquia unificada.',
    slug: 'cidade-de-davi-arqueologia-jerusalem',
    category: 'Historiografia Bíblica',
    author: {
      name: 'Dra. Miriam Al-Quds',
      title: 'Pesquisadora Associada em História do Antigo Oriente Próximo',
      avatarInitials: 'MA'
    },
    publishedAt: 'Setembro de 2026',
    readTimeMinutes: 6,
    tags: ['Davi', 'Jerusalém', 'Sião', 'Monarquia', 'Ophel'],
    relatedPassages: [
      { bookId: '2sm', bookName: '2 Samuel', chapter: 5, verse: 7, label: '2 Samuel 5:7 - Davi Toma a Fortaleza de Sião' },
      { bookId: 'sl', bookName: 'Salmos', chapter: 48, verse: 2, label: 'Salmos 48:2 - Formoso de Sítio, a Alegria da Terra' }
    ],
    sections: [
      {
        id: 'sec-1',
        title: '01. Da Crítica Minimalista à Evidência Estratigráfica',
        content: [
          'Durante décadas, correntes do chamado "minimalismo bíblico" postularam que Davi e Salomão teriam sido meros chefetes tribais sem expressão militar ou urbana, cujos feitos teriam sido aumentados por cronistas posteriores.',
          'Contudo, a partir das escavações conduzidas pela arqueóloga Eilat Mazar ao sul do Monte do Templo, no cume estreito da Colina de Ophel, a história material começou a falar com autoridade incontestável.',
          'A descoberta da "Grande Estrutura de Pedra" — uma fortaleza monumental datada do século X a.C. com capitéis proto-eólicos e cerâmica fenícia — coincide precisamente com o relato de 2 Samuel sobre os artífices enviados pelo rei Hirão de Tiro para construir o palácio de Davi.'
        ],
        pullQuote: 'As muralhas e selos de argila encontrados sob a terra de Jerusalém não pertencem à mitologia poética, mas à cronologia viva da monarquia davídica.'
      },
      {
        id: 'sec-2',
        title: '02. Os Selos Reais e as Testemunhas Vivas de Jeremias',
        content: [
          'Ainda mais estarrecedora foi a localização de dezenas de bulas — minúsculos carimbos de argila queimada que selavam papiros governamentais antes da destruição babilônica de 586 a.C. Entre os nomes gravados em escrita paleo-hebraica, surgiram "Jucal, filho de Selemias" e "Gedalias, filho de Pasur".',
          'Ambos os personagens são citados textualmente pelo profeta Jeremias (Jeremias 38:1) como nobres que conspiraram durante o cerco de Nabucodonosor. As pedras de Jerusalém ressuscitam os contemporâneos da história bíblica.'
        ]
      }
    ]
  },
  {
    id: 'art-003',
    title: 'O Idioma da Aliança: Por Que o Novo Testamento Foi Escrito em Grego Koiné',
    subtitle: 'A soberania invisível de Deus que preparou uma língua comum universal para que o Evangelho rompesse todas as fronteiras étnicas e culturais.',
    slug: 'grego-koine-evangelho-fronteiras',
    category: 'Filologia & Teologia do Novo Testamento',
    author: {
      name: 'Rev. Prof. Mateus Silveira',
      title: 'Especialista em Línguas Bíblicas e Hermenêutica Patrística',
      avatarInitials: 'MS'
    },
    publishedAt: 'Agosto de 2026',
    readTimeMinutes: 7,
    tags: ['Koiné', 'Grego Bíblico', 'Novo Testamento', 'Hermenêutica', 'Septuaginta'],
    relatedPassages: [
      { bookId: 'gl', bookName: 'Gálatas', chapter: 4, verse: 4, label: 'Gálatas 4:4 - Na Plenitude do Tempo' },
      { bookId: 'rm', bookName: 'Romanos', chapter: 1, verse: 16, label: 'Romanos 1:16 - Poder de Deus Para Salvação' }
    ],
    sections: [
      {
        id: 'sec-1',
        title: '01. "Na Plenitude do Tempo": O Palco Linguístico da Graça',
        content: [
          'Quando o apóstolo Paulo afirma aos Gálatas que Deus enviou Seu Filho "na plenitude do tempo" (Gálatas 4:4), ele aponta para uma convergência providencial única na história da civilização ocidental.',
          'Três séculos antes de Cristo, as conquistas de Alexandre, o Grande, haviam unificado o Mediterrâneo sob uma versão simplificada, viva e vibrante do dialeto ático: o grego "Koiné" (comum). Diferente do grego clássico aristocrático de Platão, o Koiné era a língua franca do porto de Alexandria, das praças de Éfeso e dos quartéis de Roma.',
          'Pela primeira vez na história humana, uma mensagem originada num rincão da Judeia podia ser lida sem tradução desde a Península Ibérica até as fronteiras da Mesopotâmia.'
        ],
        pullQuote: 'Deus não escolheu uma língua reservada aos filósofos de gabinete, mas o linguajar das feiras e portos do Mediterrâneo para proclamar a salvação.'
      },
      {
        id: 'sec-2',
        title: '02. A Tradução dos Setenta (Septuaginta) e a Teologia dos Apóstolos',
        content: [
          'A tradução do Antigo Testamento hebraico para o grego Koiné — a célebre Septuaginta (LXX), produzida no Egito ptolomaico entre os séculos III e II a.C. — foi a Bíblia primária utilizada pelos apóstolos e pela Igreja Primitiva.',
          'Quando os evangelistas citavam passagens messiânicas, recorriam frequentemente ao vocabulário preciso da Septuaginta. Palavras como "Kurios" (Senhor), "Parakletos" (Consolador) e "Hilasterion" (Propiciação) ganharam contornos definitivos de profundidade moral incomparável.',
          'O Evangelho não permaneceu prisioneiro de um dialeto fechado: rompeu o casulo para convocar todos os povos diante do Trono da Graça.'
        ]
      }
    ]
  },
  {
    id: 'art-004',
    title: 'A Arca da Aliança: O Trono da Misericórdia e a Presença no Tabernáculo',
    subtitle: 'Um estudo bíblico e histórico sobre o objeto mais sagrado de Israel, o propiciatório de ouro puro e o cumprimento tipológico em Jesus Cristo.',
    slug: 'arca-da-alianca-propiciatorio-presenca',
    category: 'Teologia Bíblica & Tipologia',
    author: {
      name: 'Pr. Davi Albuquerque',
      title: 'Mestre em Antigo Testamento e Culto Veterotestamentário',
      avatarInitials: 'DA'
    },
    publishedAt: 'Julho de 2026',
    readTimeMinutes: 7,
    tags: ['Tabernáculo', 'Arca da Aliança', 'Propiciatório', 'Santíssimo Lugar', 'Hebreus'],
    relatedPassages: [
      { bookId: 'ex', bookName: 'Êxodo', chapter: 25, verse: 22, label: 'Êxodo 25:22 - Ali Virei a Ti e Falarei Contigo' },
      { bookId: 'hb', bookName: 'Hebreus', chapter: 9, verse: 11, label: 'Hebreus 9:11 - Cristo, Sumo Sacerdote dos Bens Futuros' }
    ],
    sections: [
      {
        id: 'sec-1',
        title: '01. Madeira de Acácia e Ouro Puro: A Dupla Natureza Prefigurada',
        content: [
          'Construída no deserto do Sinai sob rigorosas instruções dadas a Moisés, a Arca media dois côvados e meio de comprimento por um côvado e meio de largura e altura. Era feita de madeira de acácia (shittim), uma madeira dura, resistente e incorruptível encontrada nos oásis do deserto, revestida por dentro e por fora de ouro puríssimo.',
          'Na tipologia bíblica clássica, a madeira terrena e o ouro celestial apontam profeticamente para a humanidade genuína e a divindade eterna de Jesus Cristo. Ele é a tenda de Deus armada entre os homens, o Emanuel que habitou entre nós cheio de graça e verdade.'
        ],
        pullQuote: 'A Arca não era um amuleto mágico de guerra, mas a representação visível do pacto da misericórdia divina.'
      },
      {
        id: 'sec-2',
        title: '02. O Propiciatório (Kapporeth) e a Graça Eterna',
        content: [
          'A tampa da arca era chamada de "Kapporeth" (lugar da expiação ou propiciatório), lavrada de ouro maciço com dois querubins voltados um para o outro, cobrindo o propiciatório com suas asas.',
          'Uma vez por ano, no solene Dia da Expiação (Yom Kippur), o sumo sacerdote entrava no Santo dos Santos para aspergir o sangue do sacrifício sobre o propiciatório. Entre a Lei justa que acusava o pecado humano e a santidade de Deus, colocava-se o sangue reconciliador. Em Cristo Jesus, o véu se rasgou de alto a baixo, abrindo para todo aquele que crê o livre acesso à presença do Pai.'
        ]
      }
    ]
  },
  {
    id: 'art-005',
    title: 'As Parábolas de Jesus e a Vida Rural na Galileia do Primeiro Século',
    subtitle: 'Por que o Mestre ensinava por sementes de mostarda, redes de pesca, dracmas perdidas e ovelhas desgarradas.',
    slug: 'parabolas-jesus-galileia-primeiro-seculo',
    category: 'Evangelhos & Hermenêutica',
    author: {
      name: 'Profa. Raquel Mendonça',
      title: 'Especialista em Contexto Sociocultural dos Evangelhos',
      avatarInitials: 'RM'
    },
    publishedAt: 'Junho de 2026',
    readTimeMinutes: 6,
    tags: ['Parábolas', 'Galileia', 'Jesus', 'Semeador', 'Reino de Deus'],
    relatedPassages: [
      { bookId: 'mt', bookName: 'Mateus', chapter: 13, verse: 3, label: 'Mateus 13:3 - Eis Que o Semeador Saiu a Semear' },
      { bookId: 'lc', bookName: 'Lucas', chapter: 15, verse: 4, label: 'Lucas 15:4 - O Bom Pastor e a Ovelha Perdida' }
    ],
    sections: [
      {
        id: 'sec-1',
        title: '01. A Pedagogia dos Olhos Abertos para o Cotidiano',
        content: [
          'Jesus não utilizava a linguagem acadêmica dos rabinos de Jerusalém, mas falava a língua do povo simples que cultivava vinhas, pescava no Mar de Tiberíades e amassava farinha na gamela da cozinha.',
          'Ao apontar para o semeador jogando sementes na beira do caminho rochoso de Genesaré, Ele transformava a terra visível em parábola das disposições invisíveis do coração humano perante a Palavra de Deus.',
          'A simplicidade das histórias não diminuía a sua profundidade revolucionária: sob a aparente singeleza de um grão de mostarda, Jesus desmascarava a soberba dos impérios e anunciava o crescimento imparável do Reino de Deus.'
        ],
        pullQuote: 'As parábolas de Jesus pegavam o chão empoeirado da Galileia e mostravam nele o reflexo límpido da eternidade.'
      }
    ]
  },
  {
    id: 'art-006',
    title: 'O Monte Sinai e a Teofania: A Aliança Eterna no Deserto',
    subtitle: 'A geografia do Êxodo, os relâmpagos do cume e a outorga da Lei moral que moldou a civilização ocidental.',
    slug: 'monte-sinai-teofania-dez-mandamentos',
    category: 'Geografia Bíblica & Antigo Testamento',
    author: {
      name: 'Dr. Emanuel Ben-Ami',
      title: 'Doutor em Arqueologia Bíblica pela Universidade Hebraica de Jerusalém',
      avatarInitials: 'EB'
    },
    publishedAt: 'Maio de 2026',
    readTimeMinutes: 6,
    tags: ['Sinai', 'Moisés', 'Dez Mandamentos', 'Êxodo', 'Teofania'],
    relatedPassages: [
      { bookId: 'ex', bookName: 'Êxodo', chapter: 19, verse: 16, label: 'Êxodo 19:16 - Trovões e Relâmpagos Sobre o Monte' },
      { bookId: 'ex', bookName: 'Êxodo', chapter: 20, verse: 1, label: 'Êxodo 20:1 - Então Falou Deus Todas Estas Palavras' }
    ],
    sections: [
      {
        id: 'sec-1',
        title: '01. O Cume de Granito e o Encontro com o Santo',
        content: [
          'No terceiro mês após a libertação dos hebreus do Egito, as tribos acamparam diante do maciço rochoso do Sinai (Jebel Musa). O cenário era desolado, árido e monumental.',
          'No terceiro dia, ao amanhecer, houve trovões e relâmpagos, uma nuvem densa desceu sobre a montanha e o som estrondoso de uma trombeta ecoou com tanta força que todo o povo no acampamento tremeu. Deus desceu sobre o monte em fogo, e a fumaça subia como a de uma fornalha.',
          'Ali, Deus não revelou uma lista de opressões, mas o caminho da liberdade: o Decálogo, os Dez Mandamentos que proclamam que a adoração ao único Deus verdadeiro é indissociável da justiça, do respeito à vida e da integridade da família.'
        ],
        pullQuote: 'No Sinai, o Criador do cosmos desceu para selar um pacto de amor e santidade com um povo redimido da escravidão.'
      }
    ]
  }
];
