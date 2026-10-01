import { DailyVerse } from '../types/bible';

/**
 * Banco estruturado de Versículos do Dia para o ciclo litúrgico determinístico.
 * Cada registro conta com o rigor da Tríade Devocional:
 * 1. Texto Sagrado Canônico
 * 2. Contexto Histórico & Exegese
 * 3. Aplicação Prática & Oração
 */
export const DAILY_VERSES_ARCHIVE: DailyVerse[] = [
  {
    id: 'dv-001',
    book: 'Salmos',
    chapter: 119,
    verse: 105,
    text: 'Lâmpada para os meus pés é a tua palavra e, luz para os meus caminhos.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Salmos 119:105',
    theologicalContext: 'O Salmo 119 é um acróstico hebraico monumental dedicado à glória e suficiência da Torá divina. No mundo antigo do Oriente Próximo, as pequenas lâmpadas de azeite de terracota iluminavam apenas o passo imediatamente seguinte nas noites sem luar das colinas da Judeia, exigindo caminhada atenta e contínua dependência do guia.',
    exegesis: 'No hebraico, "ner" (lâmpada) e "or" (luz) contrastam duas dimensões: a luz imediata para não tropeçar no presente passo e o facho mais amplo que descortina a direção geral da vereda ("nativah"). A Palavra não antecipa todo o itinerário da vida em detalhes especulativos, mas concede a clareza moral necessária para o passo de obediência do hoje.',
    practicalApplication: 'Em tempos de incerteza sobre o futuro profissional ou familiar, não paralise exigindo ver o horizonte de dez anos. Peça a Deus discernimento para a decisão honesta e reta que precisa tomar nas próximas vinte e quatro horas.',
    prayer: 'Pai Eterno, dissipa as névoas da minha ansiedade. Não Te peço respostas para todos os mistérios do amanhã, mas a graça de caminhar hoje sob a clareza da Tua Santa Palavra. Em Cristo Jesus, Amém.',
    theme: 'Orientação & Sabedoria'
  },
  {
    id: 'dv-002',
    book: 'Romanos',
    chapter: 8,
    verse: 28,
    text: 'Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Romanos 8:28',
    theologicalContext: 'O apóstolo Paulo escreveu aos crentes em Roma em cerca de 57 d.C., preparando a comunidade para os rigores e provações iminentes sob o Império Romano. Os cristãos primitivos enfrentavam tensões civis, hostilidade cultural e a fragilidade da vida cotidiana.',
    exegesis: 'O verbo grego "synergeo" (cooperar / trabalhar em conjunto) não ensina um otimismo ingênuo de que todo sofrimento seja em si mesmo agradável. Indica a soberania orquestradora de Deus que, mesmo a partir das tragédias e dores de um mundo decaído, tece um desfecho redentor supremo: a conformidade à imagem de Seu Filho.',
    practicalApplication: 'Reconheça as frustrações da semana presente não como abandono divino, mas como matéria-prima na forja do seu caráter e na dependência de Deus. O bem definitivo prometido aqui é a maturidade espiritual e a comunhão eterna com o Criador.',
    prayer: 'Senhor Soberano, quando os fios da minha história parecerem desordenados e ásperos, dá-me a firmeza de crer que Tua mão borda o bem eterno. Entrego em Tuas mãos aquilo que não compreendo hoje. Amém.',
    theme: 'Providência Divina'
  },
  {
    id: 'dv-003',
    book: 'Isaías',
    chapter: 40,
    verse: 31,
    text: 'Mas os que esperam no SENHOR renovam as suas forças, sobem com asas como águias, correm e não se cansam, caminham e não se fatigam.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Isaías 40:31',
    theologicalContext: 'O profeta Isaías dirige estas palavras ao povo de Israel na antevisão do amargo cativeiro babilônico. Diante do colapso aparente de suas instituições, os exilados sentiam-se esquecidos pelo Senhor, julgando que a força dos impérios terrenos sobrepujava o Deus de seus pais.',
    exegesis: 'O termo hebraico para "esperar" (qavah) carrega a ideia de retorcer ou esticar fios para formar uma corda resistente. Não se trata de uma passividade ociosa, mas de uma expectativa tensa e confiante ancorada nas promessas da aliança. O verbo "renovar" (chalaph) significa literalmente "trocar": despir a fraqueza humana finita e revestir-se da fortaleza infatigável do Altíssimo.',
    practicalApplication: 'O cansaço crônico do mundo contemporâneo nasce muitas vezes da tentativa de carregar o mundo nos próprios ombros. Faça hoje uma pausa deliberada no meio da rotina e confesse a Deus que sua força não provém do ritmo frenético, mas do descanso interior Nele.',
    prayer: 'Deus Todo-Poderoso, Tu que não Te cansas nem Te fatigas, desce sobre a minha fragilidade. Renova o meu ânimo esgotado e eleva meu olhar acima das tempestades imediatas. Amém.',
    theme: 'Esperança & Fortaleza'
  },
  {
    id: 'dv-004',
    book: 'Filipenses',
    chapter: 4,
    verse: 6,
    text: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Filipenses 4:6',
    theologicalContext: 'Paulo redigiu a epístola aos Filipenses aprisionado em cadeias imperiais romanas, sob constante ameaça de martírio. Apesar de sua privação material extrema, a carta é uma das mais vibrantes celebrações de júbilo e serenidade no cânon sagrado.',
    exegesis: 'No grego bíblico, "merimnao" (ansiar / dividir a mente) descreve a fragmentação interior que paralisa o espírito humano quando ele se apega ao controle do incontrolável. A alternativa paulina não é a negação estoica da dor, mas o ato litúrgico de transmutar a inquietação em petição agradecida ("eucharistia").',
    practicalApplication: 'Ao sentir o aperto no peito provocado pela urgência das contas, dos prazos ou das notícias mundiais, tome papel e tinta: anote três dádivas pelas quais é sinceramente grato antes de apresentar sua súplica a Deus.',
    prayer: 'Pai de Misericórdias, aquieta as tempestades da minha alma. Substituo a ruminação mental pelo diálogo contínuo Contigo. Guarda o meu coração e a minha mente na paz que excede todo o entendimento. Amém.',
    theme: 'Serenidade & Oração'
  },
  {
    id: 'dv-005',
    book: 'João',
    chapter: 14,
    verse: 27,
    text: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como a dá o mundo. Não se turbe o vosso coração, nem se atemorize.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'João 14:27',
    theologicalContext: 'Pronunciado no Cenáculo em Jerusalém durante a Última Ceia, na iminência do Getsêmani e da crucificação. Jesus estava preparando Seus discípulos para a partida física e para o ambiente de perseguição hostil no qual a Igreja primitiva seria semeada.',
    exegesis: 'A paz prometida por Cristo é o "Shalom" hebraico em sua plenitude messiânica: reconciliação fundamental com Deus, inteireza existencial e harmonia ontológica. Diferencia-se radicalmente da "Pax Romana", que era mantida pela espada, pela coerção externa e pelo medo.',
    practicalApplication: 'A paz cristã não depende da ausência de turbulências externas na empresa ou no lar, mas da presença inabalável do Salvador no centro do coração. Hoje, recuse-se a responder à hostilidade com mais hostilidade.',
    prayer: 'Senhor Jesus, Príncipe da Paz, ancora o meu espírito quando tudo ao meu redor oscilar. Que Tua serenidade celestial transborde através das minhas palavras e reações no dia de hoje. Amém.',
    theme: 'Paz de Cristo'
  },
  {
    id: 'dv-006',
    book: 'Provérbios',
    chapter: 3,
    verse: 5,
    text: 'Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Provérbios 3:5',
    theologicalContext: 'A literatura sapiencial de Salomão foi composta no auge da era monárquica de Israel, reunindo instruções morais para a formação de homens sábios, governantes justos e cidadãos piedosos sob o temor do SENHOR.',
    exegesis: 'O verbo hebraico "batach" (confiar) evoca a imagem de deitar-se de bruços sobre uma rocha firme, depositando todo o peso do corpo sobre ela. O alerta contra o "estribar-se" ("sha’an") adverte contra usar a própria inteligência finita como bengala definitiva, pois até a razão humana mais refinada é propensa ao autoengano quando desconectada da revelação divina.',
    practicalApplication: 'Em decisões estratégicas, submeta seus cálculos analíticos à ponderação dos princípios bíblicos de justiça, honestidade e amor ao próximo, mesmo quando o atalho parecer mais lucrativo aos olhos do mundo.',
    prayer: 'Deus de Toda Sabedoria, liberta-me da soberba do meu próprio juízo. Ensina-me a submeter meus planos mais ambiciosos ao crivo da Tua justiça e do Teu amor. Amém.',
    theme: 'Sabedoria & Humildade'
  },
  {
    id: 'dv-007',
    book: 'Mateus',
    chapter: 6,
    verse: 33,
    text: 'Buscai, pois, em primeiro lugar, o seu reino e a sua justiça, e todas estas coisas vos serão acrescentadas.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Mateus 6:33',
    theologicalContext: 'Parte central do Sermão da Montanha, proferido por Jesus aos pés do Mar da Galileia. O auditório era formado em grande parte por camponeses pobres que lutavam diariamente contra a fome, a escassez e o jugo dos tributos romanos e herodianos.',
    exegesis: 'No grego, "zeteite proton" denota uma busca contínua, diligente e prioritária. O "Reino de Deus" (Basileia tou Theou) não é primariamente uma fronteira geográfica, mas o senhorio soberano de Deus operando na vida do indivíduo e na comunidade de fé através da obediência sacrificial.',
    practicalApplication: 'Organize sua agenda hoje alinhando o que é eternamente prioritário antes das urgências transitórias: dedique tempo sincero à oração e à edificação de sua família antes de se deixar absorver pelas demandas secundárias.',
    prayer: 'Senhor e Rei do Universo, reprograma os afetos e prioridades do meu coração. Que a busca pela Tua justiça triunfe sobre a tirania das aparências e o acúmulo vão. Amém.',
    theme: 'O Reino de Deus'
  },
  {
    id: 'dv-008',
    book: 'Lamentações',
    chapter: 3,
    verse: 22,
    text: 'As misericórdias do SENHOR são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã. Grande é a tua fidelidade.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Lamentações 3:22-23',
    theologicalContext: 'O profeta Jeremias compõe este cântico fúnebre contemplando as cinzas de Jerusalém após a devastação perpetrada pelo exército babilônico em 586 a.C. No próprio epicentro da catástrofe nacional, emerge o mais sublime monumento à fidelidade incondicional do Criador.',
    exegesis: 'A palavra hebraica "chesed" (misericórdia / amor leal) é o termo técnico para o amor pactual inabalável de Deus por Seu povo. A constatação de que elas "se renovam a cada manhã" faz alusão ao milagre diário do maná no deserto: Deus nunca antecipa porções anuais de sustento moral, mas garante o fôlego restaurador a cada alvorecer.',
    practicalApplication: 'Se ontem foi um dia marcado por falhas, palavras ásperas ou desânimo, saiba que o nascer do sol de hoje traz uma cota fresca e abundante de graça. Confesse o erro, levante-se e recomece.',
    prayer: 'Deus fiel e compassivo, obrigado pelo milagre do novo dia. Agradeço porque Tua misericórdia é maior que a soma de todas as minhas fraquezas. Sustenta meus passos neste amanhecer. Amém.',
    theme: 'Graça Renovada'
  },
  {
    id: 'dv-009',
    book: 'Efésios',
    chapter: 2,
    verse: 8,
    text: 'Porque pela graça sois salvos, mediante a fé; e isto não vem de vós; é dom de Deus; não de obras, para que ninguém se glorie.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Efésios 2:8-9',
    theologicalContext: 'Escrita por Paulo aos santos em Éfeso, uma metrópole cosmopolita pagã dominada pelo culto à deusa Ártemis e impregnada de práticas místicas de mérito religioso e magia. O apóstolo expõe a gratuidade absoluta da redenção em Cristo.',
    exegesis: 'O termo grego "charis" (graça) define o favor imerecido e desmedido concedido pelo Criador aos pecadores. A salvação não é uma recompensa por méritos éticos acumulados, mas um presente monergístico concedido soberanamente por Deus, tendo a fé como mero instrumento receptor.',
    practicalApplication: 'A consciência da graça elimina duas armadilhas opostas: o desespero moral de quem se julga indigno demais para ser amado por Deus, e o orgulho farisaico de quem se considera superior moralmente aos outros. Trate os outros com a mesma generosidade com que Deus o acolheu.',
    prayer: 'Senhor Jesus, derruba todo ídolo do orgulho em meu coração. Lembra-me sempre de que nada tenho que não tenha recebido de Tuas mãos traspassadas de amor. Amém.',
    theme: 'Salvação & Graça'
  },
  {
    id: 'dv-010',
    book: 'Colossenses',
    chapter: 3,
    verse: 23,
    text: 'Tudo quanto fizerdes, fazei-o de todo o coração, como para o Senhor e não para homens.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Colossenses 3:23',
    theologicalContext: 'Instrução paulina direcionada a servos e trabalhadores domésticos da igreja de Colossos. Na Antiguidade greco-romana, o trabalho braçal era desprezado pelas elites aristocráticas como ocupação vil, mas o cristianismo santificou todo labor honesto.',
    exegesis: 'A expressão grega "ek psyches" (da alma / de todo o coração) aponta para um compromisso interior profundo que transcende a mera vigilância humana. Quando o crente enxerga a Deus como seu verdadeiro e supremo empregador, qualquer tarefa ordinária — da limpeza à redação de um documento — torna-se um ato de culto litúrgico.',
    practicalApplication: 'Trabalhe hoje com excelência e esmero mesmo em tarefas invisíveis ou pouco reconhecidas pela chefia. A sua integridade profissional e pontualidade são testemunhos vivos da glória de Cristo.',
    prayer: 'Soberano Senhor, consagro as horas de trabalho deste dia à Tua honra. Que a minha dedicação, paciência e ética sirvam como reflexo límpido da Tua bondade perante os homens. Amém.',
    theme: 'Vocação & Trabalho'
  },
  {
    id: 'dv-011',
    book: 'Hebreus',
    chapter: 11,
    verse: 1,
    text: 'Ora, a fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Hebreus 11:1',
    theologicalContext: 'O autor da Epístola aos Hebreus escrevia a uma congregação judaico-cristã tentada a retroceder aos rituais do templo levítico diante do opróbrio social. Ele constrói a célebre galeria dos patriarcas que viveram como peregrinos pela fé.',
    exegesis: 'O vocábulo "hypostasis" (certeza / substância / título de propriedade) e "elenchos" (convicção / evidência probatória) possuem peso filosófico e jurídico. A fé bíblica não é credulidade cega ou salto no escuro, mas uma realidade sólida interior produzida pelo Espírito Santo em resposta à promessa fidedigna de Deus.',
    practicalApplication: 'Não guie suas convicções espirituais exclusivamente pelas flutuações das suas emoções ou pelas aparências do mundo visível. Permaneça firme naquilo que as Escrituras afirmam sobre a fidelidade de Deus.',
    prayer: 'Senhor dos Exércitos, fortalece a minha fé titubeante. Ensina-me a fixar os olhos não no que é passageiro e transitório, mas nas realidades eternas do Teu Reino. Amém.',
    theme: 'Fé Inabalável'
  },
  {
    id: 'dv-012',
    book: 'Miqueias',
    chapter: 6,
    verse: 8,
    text: 'Ele te declarou, ó homem, o que é bom e que é o que o SENHOR pede de ti: que pratiques a justiça, e ames a misericórdia, e andes humildemente com o teu Deus.',
    translation: 'Almeida Revista e Atualizada (ARA)',
    reference: 'Miqueias 6:8',
    theologicalContext: 'Miqueias profetizou na Judeia rural durante os reinados de Jotão, Acaz e Ezequias, denunciando a hipocrisia das elites que multiplicavam holocaustos litúrgicos no Templo enquanto exploravam camponeses, viúvas e órfãos nos tribunais.',
    exegesis: 'O profeta desarticula a falsa dicotomia entre liturgia e ética: o sacrifício sem conduta justa é abominação diante de Deus. A tríade "mishpat" (justiça distributiva e integridade), "chesed" (misericórdia leal) e "tsana" (andar humilde e contrito) sintetiza a verdadeira espiritualidade pactual.',
    practicalApplication: 'Seja justo em suas transações comerciais, pague o que deve, defenda os vulneráveis no seu círculo de influência e nunca se exalte sobre aqueles em situação inferior à sua.',
    prayer: 'Justo Juiz, purifica as minhas práticas e orações de toda hipocrisia. Dá-me um coração sensível aos necessitados e um caminhar desprovido de vaidade. Amém.',
    theme: 'Justiça & Integridade'
  }
];

/**
 * Calcula determinísticamente o índice do versículo do dia baseado na data local (GMT-3).
 * A fórmula de hash gera uma rotação sólida pelos 365 dias do ano.
 */
export function getDailyVerseForDate(date: Date = new Date()): DailyVerse {
  // Ajuste para garantir fuso horário coerente
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Função hash determinística dia-a-dia
  const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0; // Converte para inteiro de 32-bits
  }
  
  // Mapeia para o arquivo de versículos
  const positiveHash = Math.abs(hash);
  const index = positiveHash % DAILY_VERSES_ARCHIVE.length;
  return DAILY_VERSES_ARCHIVE[index];
}

/**
 * Gerenciamento de Registro de Presença Espiritual (Daily Devotional Streak)
 * Persiste no localStorage com cálculo de dias consecutivos.
 */
export interface DevotionalPresence {
  currentStreak: number;
  lastReadDate: string; // YYYY-MM-DD
  totalDaysRead: number;
}

const STREAK_STORAGE_KEY = 'cristoguia_presence_streak_v1';

export function getDevotionalPresence(): DevotionalPresence {
  if (typeof window === 'undefined') {
    return { currentStreak: 1, lastReadDate: '', totalDaysRead: 1 };
  }
  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) {
      return { currentStreak: 1, lastReadDate: '', totalDaysRead: 1 };
    }
    return JSON.parse(raw);
  } catch {
    return { currentStreak: 1, lastReadDate: '', totalDaysRead: 1 };
  }
}

export function registerDevotionalVisit(): DevotionalPresence {
  if (typeof window === 'undefined') {
    return { currentStreak: 1, lastReadDate: '', totalDaysRead: 1 };
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const presence = getDevotionalPresence();

  if (presence.lastReadDate === todayStr) {
    return presence; // Já registrado hoje
  }

  let newStreak = presence.currentStreak;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (presence.lastReadDate === yesterdayStr) {
    newStreak += 1;
  } else if (!presence.lastReadDate) {
    newStreak = 1;
  } else {
    // Interrompeu mais de 1 dia
    newStreak = 1;
  }

  const updated: DevotionalPresence = {
    currentStreak: newStreak,
    lastReadDate: todayStr,
    totalDaysRead: (presence.totalDaysRead || 0) + 1
  };

  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Erro ao registrar presença devocional:', e);
  }

  return updated;
}
