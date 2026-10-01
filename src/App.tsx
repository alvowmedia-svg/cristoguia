import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyVerseHero } from './components/DailyVerseHero';
import { BibleReader } from './components/BibleReader';
import { WordSearchGame } from './components/WordSearchGame';
import { BibleQuiz } from './components/BibleQuiz';
import { ArticlesSection } from './components/ArticlesSection';
import { VersesByFeeling } from './components/VersesByFeeling';
import { SearchModal } from './components/SearchModal';
import { SavedVersesModal } from './components/SavedVersesModal';
import { HighlightedVerse, DailyVerse } from './types/bible';
import { Cross, Book, Award, BookOpen, Compass, Heart, Sun, Gamepad2, Sparkles, ChevronRight, Music, Clock } from 'lucide-react';
import { CristoGuiaLogo } from './components/CristoGuiaLogo';
import { EDITORIAL_ARTICLES } from './data/articles';

const HIGHLIGHTS_STORAGE_KEY = 'cristoguia_highlights_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'daily' | 'bible' | 'games' | 'moments' | 'articles'>('daily');
  const [gamesSubTab, setGamesSubTab] = useState<'wordsearch' | 'quiz'>('wordsearch');

  // Navegação contextual para a Bíblia
  const [bibleTarget, setBibleTarget] = useState<{ bookId: string; chapter: number; verse?: number }>({
    bookId: 'sl',
    chapter: 23,
    verse: 1
  });

  // Versículos salvos no Caderno Espiritual
  const [highlights, setHighlights] = useState<HighlightedVerse[]>([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedH = localStorage.getItem(HIGHLIGHTS_STORAGE_KEY);
      if (savedH) {
        setHighlights(JSON.parse(savedH));
      }
    } catch (e) {
      console.error('Erro ao ler dados do localStorage:', e);
    }
  }, []);

  const handleSaveHighlight = (item: HighlightedVerse) => {
    setHighlights(prev => {
      const filtered = prev.filter(h => h.id !== item.id);
      const updated = [item, ...filtered];
      localStorage.setItem(HIGHLIGHTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveHighlight = (id: string) => {
    setHighlights(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem(HIGHLIGHTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveDailyVerse = (dailyVerse: DailyVerse) => {
    const id = `dv-${dailyVerse.book.toLowerCase()}-${dailyVerse.chapter}-${dailyVerse.verse}`;
    const newHighlight: HighlightedVerse = {
      id,
      bookId: 'sl',
      bookName: dailyVerse.book,
      chapter: dailyVerse.chapter,
      verse: dailyVerse.verse,
      text: dailyVerse.text,
      color: 'gold',
      note: `Versículo do Dia · ${dailyVerse.theme}`,
      createdAt: new Date().toISOString()
    };
    handleSaveHighlight(newHighlight);
  };

  const handleOpenPassageInBible = (bookId: string, chapter: number, verse?: number) => {
    setBibleTarget({ bookId, chapter, verse });
    setCurrentTab('bible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#1C2430]">
      {/* Cabeçalho Acolhedor e Luminoso */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBookmarks={() => setBookmarksModalOpen(true)}
        savedCount={highlights.length}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* 1. PALAVRA DO DIA (DEVOCIONAL ACOLHEDOR) */}
        {currentTab === 'daily' && (
          <div className="space-y-8">
            <DailyVerseHero
              onOpenPassageInBible={handleOpenPassageInBible}
              onSaveToBookmarks={handleSaveDailyVerse}
              isSaved={highlights.some(h => h.note?.includes('Versículo do Dia'))}
              onOpenMomentsTab={() => setCurrentTab('moments')}
            />

            {/* Atalhos Rápidos e Amigáveis */}
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setCurrentTab('bible')}
                  className="p-5 text-left rounded-3xl border-2 border-[#E8E2D5] bg-white hover:border-[#C99700] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF9E6] text-[#C99700] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Book className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1B365D]">
                    Bíblia Completa
                  </h3>
                  <p className="font-sans-ui text-xs text-[#5E6D82] mt-1 leading-relaxed">
                    66 livros canônicos com leitor fácil, busca e anotações.
                  </p>
                </button>

                <button
                  onClick={() => setCurrentTab('moments')}
                  className="p-5 text-left rounded-3xl border-2 border-[#E8E2D5] bg-white hover:border-[#C99700] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1B365D]">
                    Para o seu Momento
                  </h3>
                  <p className="font-sans-ui text-xs text-[#5E6D82] mt-1 leading-relaxed">
                    Paz, alívio da ansiedade, força, gratidão e família.
                  </p>
                </button>

                <button
                  onClick={() => { setCurrentTab('games'); setGamesSubTab('wordsearch'); }}
                  className="p-5 text-left rounded-3xl border-2 border-[#E8E2D5] bg-white hover:border-[#C99700] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1B365D]">
                    Caça-Palavras Bíblico
                  </h3>
                  <p className="font-sans-ui text-xs text-[#5E6D82] mt-1 leading-relaxed">
                    Aprenda termos das Escrituras com explicações bíblicas.
                  </p>
                </button>

                <button
                  onClick={() => { setCurrentTab('games'); setGamesSubTab('quiz'); }}
                  className="p-5 text-left rounded-3xl border-2 border-[#E8E2D5] bg-white hover:border-[#C99700] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1B365D]">
                    Quiz Bíblico da Fé
                  </h3>
                  <p className="font-sans-ui text-xs text-[#5E6D82] mt-1 leading-relaxed">
                    Perguntas com justificativas e certificado digital para salvar.
                  </p>
                </button>
              </div>

              {/* PLANO DE LEITURA BÍBLICA PARA HOJE */}
              <div className="mt-12 bg-white rounded-3xl border-2 border-[#E8E2D5] p-6 sm:p-10 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D5] gap-2 mb-6">
                  <div>
                    <span className="text-xs font-cinzel font-bold text-[#C99700] uppercase tracking-wider block">
                      Roteiro de Edificação
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D]">
                      Plano de Leitura Bíblica de Hoje
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentTab('bible')}
                    className="text-xs font-sans-ui font-bold text-[#C99700] hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Abrir Bíblia Completa</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Manhã */}
                  <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#E8E2D5] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#C99700] uppercase mb-2">
                        <span>🌅 Alvorecer</span>
                        <span>Salmos</span>
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-[#1B365D]">
                        Salmo 23
                      </h4>
                      <p className="font-sans-ui text-xs text-[#5E6D82] mt-1">
                        O Bom Pastor que restaura as forças e guia por caminhos de justiça.
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenPassageInBible('sl', 23, 1)}
                      className="mt-4 px-4 py-2 text-xs font-sans-ui font-bold rounded-xl bg-white border border-[#E8E2D5] hover:border-[#C99700] text-[#1B365D] flex items-center justify-between transition-colors shadow-2xs"
                    >
                      <span>Ler Passagem</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C99700]" />
                    </button>
                  </div>

                  {/* Tarde */}
                  <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#E8E2D5] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#C99700] uppercase mb-2">
                        <span>☀️ Meio-Dia</span>
                        <span>Evangelhos</span>
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-[#1B365D]">
                        João 1
                      </h4>
                      <p className="font-sans-ui text-xs text-[#5E6D82] mt-1">
                        O Verbo Eterno que se fez carne e habitou entre nós cheio de graça.
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenPassageInBible('jo', 1, 1)}
                      className="mt-4 px-4 py-2 text-xs font-sans-ui font-bold rounded-xl bg-white border border-[#E8E2D5] hover:border-[#C99700] text-[#1B365D] flex items-center justify-between transition-colors shadow-2xs"
                    >
                      <span>Ler Passagem</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C99700]" />
                    </button>
                  </div>

                  {/* Noite */}
                  <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#E8E2D5] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#C99700] uppercase mb-2">
                        <span>🌙 Descanso</span>
                        <span>Epístolas</span>
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-[#1B365D]">
                        Romanos 8
                      </h4>
                      <p className="font-sans-ui text-xs text-[#5E6D82] mt-1">
                        Nenhuma condenação há para os que estão em Cristo Jesus, nosso Senhor.
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenPassageInBible('rm', 8, 1)}
                      className="mt-4 px-4 py-2 text-xs font-sans-ui font-bold rounded-xl bg-white border border-[#E8E2D5] hover:border-[#C99700] text-[#1B365D] flex items-center justify-between transition-colors shadow-2xs"
                    >
                      <span>Ler Passagem</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C99700]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* DESTAQUES DO BLOG & ESTUDOS ARQUEOLÓGICOS */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-cinzel font-bold text-[#C99700] uppercase tracking-wider block">
                      Crônicas da Fé
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D]">
                      Estudos & Arqueologia Bíblica Recentes
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentTab('articles')}
                    className="text-xs font-sans-ui font-bold text-[#C99700] hover:underline flex items-center gap-1"
                  >
                    <span>Ver Todos os Artigos ({EDITORIAL_ARTICLES.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {EDITORIAL_ARTICLES.slice(0, 3).map(art => (
                    <div
                      key={art.id}
                      onClick={() => setCurrentTab('articles')}
                      className="cursor-pointer group p-6 rounded-3xl border-2 border-[#E8E2D5] bg-white hover:border-[#C99700] hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-sans-ui text-[#C99700] font-bold uppercase mb-2">
                          <span>{art.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.readTimeMinutes} min</span>
                        </div>
                        <h4 className="font-cinzel text-base font-bold text-[#1B365D] group-hover:text-[#C99700] transition-colors leading-snug">
                          {art.title}
                        </h4>
                        <p className="font-lora text-xs text-[#5E6D82] mt-2 line-clamp-3 leading-relaxed">
                          {art.subtitle}
                        </p>
                      </div>

                      <div className="mt-6 pt-3 border-t border-[#E8E2D5] flex items-center justify-between text-[11px] font-sans-ui text-[#5E6D82]">
                        <span>{art.author.name}</span>
                        <span className="text-[#C99700] font-bold flex items-center gap-0.5">
                          Ler Estudo <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HINOS CLÁSSICOS DE LOUVOR & GRATIDÃO */}
              <div className="mt-12 bg-gradient-to-br from-[#FFF9E6] to-[#FFFDF7] rounded-3xl border-2 border-[#E5B21A]/60 p-6 sm:p-10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-cinzel text-[#C99700] uppercase tracking-wider font-bold mb-1">
                  <Music className="w-4 h-4" />
                  <span>Harpa & Hinário Cristão</span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D] mb-2">
                  Grandioso És Tu
                </h3>
                <p className="font-garamond italic text-base sm:text-lg text-[#333F4E] max-w-2xl leading-relaxed mb-4">
                  "Senhor meu Deus, quando eu maravilhado, fico a pensar nas obras de Tuas mãos... no céu azul de estrelas pontilhado, o Seu poder mostrando a criação. Então minh'alma canta a Ti, Senhor: Quão grande és Tu! Quão grande és Tu!"
                </p>
                <div className="flex items-center gap-4 text-xs font-sans-ui text-[#5E6D82]">
                  <span>Hino Clássico de Adoração</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#8C6B00] font-bold">Carl Boberg (1885)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BÍBLIA SAGRADA (66 LIVROS) */}
        {currentTab === 'bible' && (
          <BibleReader
            key={`${bibleTarget.bookId}-${bibleTarget.chapter}`}
            initialBookId={bibleTarget.bookId}
            initialChapter={bibleTarget.chapter}
            initialVerse={bibleTarget.verse}
            onSaveHighlight={handleSaveHighlight}
            highlights={highlights}
            onRemoveHighlight={handleRemoveHighlight}
          />
        )}

        {/* 3. VERSÍCULOS PARA O SEU MOMENTO */}
        {currentTab === 'moments' && (
          <VersesByFeeling
            onOpenPassageInBible={handleOpenPassageInBible}
            onSaveBookmark={(v) => {
              handleSaveHighlight({
                id: `moment-${Date.now()}`,
                bookId: 'sl',
                bookName: v.reference,
                chapter: 1,
                verse: 1,
                text: v.text,
                color: 'gold',
                note: v.note,
                createdAt: new Date().toISOString()
              });
            }}
          />
        )}

        {/* 4. JOGOS DA FÉ (CAÇA-PALAVRAS E QUIZ) */}
        {currentTab === 'games' && (
          <div className="space-y-6">
            {/* Seletor Animado e Claro */}
            <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 flex items-center justify-center">
              <div className="inline-flex p-1.5 rounded-2xl border-2 border-[#E8E2D5] bg-white shadow-xs">
                <button
                  onClick={() => setGamesSubTab('wordsearch')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans-ui font-bold transition-all ${
                    gamesSubTab === 'wordsearch'
                      ? 'bg-[#1B365D] text-white shadow-xs'
                      : 'text-[#5E6D82] hover:text-[#1B365D]'
                  }`}
                >
                  🧩 Caça-Palavras Bíblico
                </button>
                <button
                  onClick={() => setGamesSubTab('quiz')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans-ui font-bold transition-all ${
                    gamesSubTab === 'quiz'
                      ? 'bg-[#1B365D] text-white shadow-xs'
                      : 'text-[#5E6D82] hover:text-[#1B365D]'
                  }`}
                >
                  🏆 Quiz Bíblico da Fé & Certificado
                </button>
              </div>
            </div>

            {gamesSubTab === 'wordsearch' ? <WordSearchGame /> : <BibleQuiz />}
          </div>
        )}

        {/* 5. ESTUDOS & ARQUEOLOGIA BÍBLICA */}
        {currentTab === 'articles' && (
          <ArticlesSection onOpenPassageInBible={handleOpenPassageInBible} />
        )}
      </main>

      {/* Rodapé Alegre e Cristão */}
      <footer className="border-t-2 border-[#E8E2D5] bg-white py-12 px-4 sm:px-8 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs font-sans-ui text-[#5E6D82]">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFFDF9] border border-[#E8E2D5] flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                <CristoGuiaLogo size={36} variant="icon-only" color="#2A1A10" />
              </div>
              <div>
                <span className="font-cinzel text-xl font-black tracking-widest text-[#2A1A10] block leading-none">
                  CRISTO GUIA
                </span>
                <span className="font-sans-ui text-[11px] text-[#5E6D82] font-semibold">
                  Luz para os teus passos, alimento para a tua alma
                </span>
              </div>
            </div>
            <p className="font-lora text-sm text-[#4A5568] max-w-md leading-relaxed">
              Portal cristão dedicado à leitura das Escrituras, edificação da família e estudo da Palavra viva de Deus.
            </p>
            <p className="text-xs text-[#C99700] font-bold">
              "Lâmpada para os meus pés é a Tua palavra e luz para o meu caminho." — Salmos 119:105
            </p>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1B365D] mb-3">
              Áreas do Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentTab('daily')} className="hover:text-[#C99700] transition-colors font-medium">
                  Palavra do Dia
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('bible')} className="hover:text-[#C99700] transition-colors font-medium">
                  Bíblia Sagrada (66 Livros)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('moments')} className="hover:text-[#C99700] transition-colors font-medium">
                  Versículos para o seu Momento
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('games'); setGamesSubTab('wordsearch'); }} className="hover:text-[#C99700] transition-colors font-medium">
                  Caça-Palavras Bíblico
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('games'); setGamesSubTab('quiz'); }} className="hover:text-[#C99700] transition-colors font-medium">
                  Quiz Bíblico da Fé
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1B365D] mb-3">
              Fé & Esperança
            </h4>
            <p className="text-xs leading-relaxed text-[#4A5568]">
              Textos bíblicos baseados na tradução de João Ferreira de Almeida. Que a paz e o amor de Cristo Jesus reinem no seu lar todos os dias.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-ui text-[#5E6D82]">
          <div>
            © {new Date().getFullYear()} Portal Cristo Guia (cristoguia.com.br) · Que Deus abençoe você e sua família!
          </div>
          <div className="flex items-center gap-3 font-semibold text-[#1B365D]">
            <span>Paz</span>
            <span aria-hidden="true">·</span>
            <span>Graça</span>
            <span aria-hidden="true">·</span>
            <span>Esperança</span>
          </div>
        </div>
      </footer>

      {/* Modais */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectBook={(bookId, chapter = 1) => handleOpenPassageInBible(bookId, chapter)}
        onSelectArticle={_id => setCurrentTab('articles')}
      />

      <SavedVersesModal
        isOpen={bookmarksModalOpen}
        onClose={() => setBookmarksModalOpen(false)}
        highlights={highlights}
        onRemoveHighlight={handleRemoveHighlight}
        onNavigateToVerse={handleOpenPassageInBible}
      />
    </div>
  );
}
