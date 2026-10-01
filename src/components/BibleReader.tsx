import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, ChevronLeft, Bookmark, Sliders, Type, Check, X, Search, FileText, Sun } from 'lucide-react';
import { BIBLE_BOOKS, getChapterVerses } from '../data/bible-canon';
import { BibleBookInfo, BookCategory, HighlightedVerse } from '../types/bible';

interface BibleReaderProps {
  initialBookId?: string;
  initialChapter?: number;
  initialVerse?: number;
  onSaveHighlight: (item: HighlightedVerse) => void;
  highlights: HighlightedVerse[];
  onRemoveHighlight: (id: string) => void;
}

export const BibleReader: React.FC<BibleReaderProps> = ({
  initialBookId = 'sl',
  initialChapter = 23,
  initialVerse,
  onSaveHighlight,
  highlights,
  onRemoveHighlight
}) => {
  const [selectedBook, setSelectedBook] = useState<BibleBookInfo>(
    BIBLE_BOOKS.find(b => b.id.toLowerCase() === initialBookId.toLowerCase()) || BIBLE_BOOKS[18]
  );
  const [currentChapter, setCurrentChapter] = useState<number>(initialChapter);
  const [translationVersion, setTranslationVersion] = useState<'ARA' | 'ACF'>('ARA');
  
  // Customizações de leitura
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [lineHeight, setLineHeight] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');

  // Modal de Navegação Rápida
  const [navModalOpen, setNavModalOpen] = useState(false);
  const [filterTestament, setFilterTestament] = useState<'todos' | 'antigo' | 'novo'>('todos');
  const [searchBookTerm, setSearchBookTerm] = useState('');

  // Estado de anotação de versículo
  const [activeVerseForNote, setActiveVerseForNote] = useState<{ verse: number; text: string } | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [highlightColor, setHighlightColor] = useState<'gold' | 'olive'>('gold');

  const verses = getChapterVerses(selectedBook.id, currentChapter);

  useEffect(() => {
    if (initialVerse) {
      setTimeout(() => {
        const el = document.getElementById(`verse-${initialVerse}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  }, [initialVerse, currentChapter, selectedBook]);

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < selectedBook.totalChapters) {
      setCurrentChapter(currentChapter + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmHighlight = () => {
    if (!activeVerseForNote) return;
    const highlightId = `${selectedBook.id}-${currentChapter}-${activeVerseForNote.verse}`;
    const newHighlight: HighlightedVerse = {
      id: highlightId,
      bookId: selectedBook.id,
      bookName: selectedBook.name,
      chapter: currentChapter,
      verse: activeVerseForNote.verse,
      text: activeVerseForNote.text,
      color: highlightColor,
      note: noteContent.trim() ? noteContent.trim() : undefined,
      createdAt: new Date().toISOString()
    };
    onSaveHighlight(newHighlight);
    setActiveVerseForNote(null);
    setNoteContent('');
  };

  const handleRemoveExistingHighlight = (verseNum: number) => {
    const id = `${selectedBook.id}-${currentChapter}-${verseNum}`;
    onRemoveHighlight(id);
    setActiveVerseForNote(null);
  };

  const filteredBooks = BIBLE_BOOKS.filter(book => {
    if (filterTestament !== 'todos' && book.testament !== filterTestament) return false;
    if (searchBookTerm && !book.name.toLowerCase().includes(searchBookTerm.toLowerCase())) return false;
    return true;
  });

  const fontClasses = {
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl'
  }[fontSize];

  const leadingClasses = {
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose'
  }[lineHeight];

  return (
    <div className="w-full py-8 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* 1. Barra de Acesso e Localizador Canônico */}
      <div className="border-2 border-[#E8E2D5] bg-white rounded-3xl p-5 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9E6] border border-[#E5B21A]/50 text-[#8C6B00] text-xs font-bold mb-2">
              <Book className="w-3.5 h-3.5" />
              <span>{selectedBook.testament === 'antigo' ? 'Antigo Testamento' : 'Novo Testamento'} · {selectedBook.categoryName}</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1B365D]">
              {selectedBook.name} {currentChapter}
            </h2>
            <p className="text-xs font-sans-ui text-[#5E6D82] mt-0.5">
              {selectedBook.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setNavModalOpen(true)}
              className="px-4 py-2.5 text-xs font-sans-ui font-bold bg-[#1B365D] hover:bg-[#254A80] text-white rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4 text-[#E5B21A]" />
              <span>Trocar Livro ou Capítulo</span>
            </button>

            <div className="inline-flex rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] p-1 text-xs font-sans-ui">
              <button
                onClick={() => setTranslationVersion('ARA')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  translationVersion === 'ARA' ? 'bg-[#C99700] text-white' : 'text-[#5E6D82]'
                }`}
                title="Almeida Revista e Atualizada"
              >
                ARA
              </button>
              <button
                onClick={() => setTranslationVersion('ACF')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  translationVersion === 'ACF' ? 'bg-[#C99700] text-white' : 'text-[#5E6D82]'
                }`}
                title="Almeida Corrigida Fiel"
              >
                ACF
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Ajustes de Leitura */}
        <div className="mt-4 pt-4 border-t border-[#E8E2D5] flex flex-wrap items-center justify-between gap-3 text-xs font-sans-ui text-[#5E6D82]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1B365D]">Tamanho do Texto:</span>
            <div className="flex items-center gap-1">
              {(['sm', 'base', 'lg', 'xl'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`w-7 h-7 rounded-lg border font-bold text-xs ${
                    fontSize === s
                      ? 'border-[#C99700] bg-[#FFF9E6] text-[#8C6B00]'
                      : 'border-[#E8E2D5] bg-white hover:border-[#C99700]'
                  }`}
                >
                  {s === 'sm' ? 'A-' : s === 'base' ? 'A' : s === 'lg' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1B365D]">Espaçamento:</span>
            <div className="flex items-center gap-1">
              {(['normal', 'relaxed', 'loose'] as const).map(lh => (
                <button
                  key={lh}
                  onClick={() => setLineHeight(lh)}
                  className={`px-3 py-1 rounded-lg border text-xs capitalize ${
                    lineHeight === lh
                      ? 'border-[#C99700] bg-[#FFF9E6] text-[#8C6B00] font-bold'
                      : 'border-[#E8E2D5] bg-white hover:border-[#C99700]'
                  }`}
                >
                  {lh === 'normal' ? 'Padrão' : lh === 'relaxed' ? 'Leitura Confortável' : 'Amplo'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Área de Leitura das Escrituras */}
      <article className="bg-white border-2 border-[#E8E2D5] rounded-3xl p-6 sm:p-12 shadow-sm relative">
        <header className="text-center pb-8 border-b border-[#E8E2D5] mb-8">
          <span className="font-sans-ui text-xs font-bold text-[#C99700] uppercase tracking-wider block mb-1">
            Capítulo {currentChapter} de {selectedBook.totalChapters}
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#1B365D]">
            {selectedBook.name} {currentChapter}
          </h1>
          <p className="text-xs font-sans-ui text-[#5E6D82] mt-2">
            Tradução canônica ({translationVersion}) · Toque em qualquer versículo para grifar ou fazer uma anotação devocional
          </p>
        </header>

        {/* Versículos */}
        <div className={`space-y-4 font-lora ${fontClasses} ${leadingClasses} text-[#1C2430]`}>
          {verses.map(v => {
            const highlightId = `${selectedBook.id}-${currentChapter}-${v.verse}`;
            const existingHighlight = highlights.find(h => h.id === highlightId);

            return (
              <div
                key={v.verse}
                id={`verse-${v.verse}`}
                onClick={() => {
                  setActiveVerseForNote(v);
                  setNoteContent(existingHighlight?.note || '');
                  setHighlightColor(existingHighlight?.color || 'gold');
                }}
                className={`group cursor-pointer rounded-xl p-3 transition-all relative ${
                  existingHighlight
                    ? existingHighlight.color === 'gold'
                      ? 'bg-amber-50/80 border-l-4 border-[#C99700]'
                      : 'bg-emerald-50/80 border-l-4 border-emerald-600'
                    : 'hover:bg-[#FAF8F2]'
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-[#C99700] select-none shrink-0 w-6 text-right tabular-nums">
                    {v.verse}
                  </span>
                  <p className="flex-1">
                    {v.text}
                  </p>
                </div>

                {existingHighlight?.note && (
                  <div className="mt-2 ml-9 p-3 rounded-xl border border-amber-200 bg-[#FFFDF7] text-xs font-sans-ui text-[#333F4E] flex items-start gap-2 shadow-xs">
                    <FileText className="w-4 h-4 text-[#C99700] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1B365D] block">Minha Anotação:</strong>
                      <span>{existingHighlight.note}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rodapé de Navegação */}
        <footer className="mt-12 pt-8 border-t border-[#E8E2D5] flex items-center justify-between">
          <button
            onClick={handlePrevChapter}
            disabled={currentChapter <= 1}
            className="px-4 py-2 text-xs sm:text-sm font-sans-ui font-bold border border-[#E8E2D5] rounded-xl bg-white hover:border-[#C99700] disabled:opacity-30 disabled:pointer-events-none text-[#1B365D] flex items-center gap-2 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Capítulo Anterior</span>
          </button>

          <span className="font-cinzel text-xs font-bold text-[#5E6D82]">
            {selectedBook.abbrev} {currentChapter} ({verses.length} versículos)
          </span>

          <button
            onClick={handleNextChapter}
            disabled={currentChapter >= selectedBook.totalChapters}
            className="px-4 py-2 text-xs sm:text-sm font-sans-ui font-bold border border-[#E8E2D5] rounded-xl bg-white hover:border-[#C99700] disabled:opacity-30 disabled:pointer-events-none text-[#1B365D] flex items-center gap-2 transition-colors shadow-xs"
          >
            <span>Próximo Capítulo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </article>

      {/* MODAL DE GRIFO E ANOTAÇÃO */}
      {activeVerseForNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#C99700] rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <h3 className="font-cinzel text-base font-bold text-[#1B365D]">
                {selectedBook.name} {currentChapter}:{activeVerseForNote.verse}
              </h3>
              <button
                onClick={() => setActiveVerseForNote(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="font-lora italic text-sm text-[#333F4E] my-3 p-3 bg-[#FAF8F2] rounded-xl border border-[#E8E2D5]">
              "{activeVerseForNote.text}"
            </p>

            {/* Cor do Grifo */}
            <div className="mb-4">
              <label className="text-xs font-sans-ui font-bold text-[#1B365D] block mb-2">
                Cor do Destaque:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setHighlightColor('gold')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-sans-ui font-bold ${
                    highlightColor === 'gold'
                      ? 'border-[#C99700] bg-amber-50 text-amber-900 ring-2 ring-[#C99700]/30'
                      : 'border-[#E8E2D5] text-[#5E6D82]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#C99700]" />
                  <span>Dourado</span>
                </button>

                <button
                  onClick={() => setHighlightColor('olive')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-sans-ui font-bold ${
                    highlightColor === 'olive'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30'
                      : 'border-[#E8E2D5] text-[#5E6D82]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-600" />
                  <span>Verde Esperança</span>
                </button>
              </div>
            </div>

            {/* Anotação */}
            <div className="mb-4">
              <label className="text-xs font-sans-ui font-bold text-[#1B365D] block mb-1">
                Sua Anotação Devocional (Opcional):
              </label>
              <textarea
                value={noteContent}
                onChange={e => setNoteContent(e.target.value)}
                placeholder="Escreva o que Deus falou ao seu coração através desta passagem..."
                rows={3}
                className="w-full text-xs font-sans-ui p-3 rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] text-[#1C2430] focus:outline-none focus:border-[#C99700]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleRemoveExistingHighlight(activeVerseForNote.verse)}
                className="text-xs font-sans-ui text-rose-600 hover:underline font-semibold"
              >
                Remover Destaque
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveVerseForNote(null)}
                  className="px-3.5 py-1.5 text-xs font-sans-ui border border-[#E8E2D5] rounded-xl text-[#5E6D82]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmHighlight}
                  className="px-5 py-1.5 text-xs font-sans-ui font-bold rounded-xl bg-[#1B365D] hover:bg-[#254A80] text-white flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5B21A]" />
                  <span>Salvar no Caderno</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE NAVEGAÇÃO DOS 66 LIVROS */}
      {navModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#E8E2D5] rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#1B365D]">
                  Bíblia Sagrada (66 Livros)
                </h3>
                <p className="text-xs font-sans-ui text-[#5E6D82]">
                  Selecione o livro que deseja ler e navegar
                </p>
              </div>
              <button
                onClick={() => setNavModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-4 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchBookTerm}
                  onChange={e => setSearchBookTerm(e.target.value)}
                  placeholder="Pesquisar livro (ex: Salmos, Mateus, Gênesis)..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-sans-ui rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] text-[#1C2430] focus:outline-none focus:border-[#C99700]"
                />
              </div>

              <div className="flex items-center gap-1 p-1 rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] text-xs font-sans-ui">
                <button
                  onClick={() => setFilterTestament('todos')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    filterTestament === 'todos' ? 'bg-[#1B365D] text-white' : 'text-[#5E6D82]'
                  }`}
                >
                  Todos (66)
                </button>
                <button
                  onClick={() => setFilterTestament('antigo')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    filterTestament === 'antigo' ? 'bg-[#1B365D] text-white' : 'text-[#5E6D82]'
                  }`}
                >
                  Antigo (39)
                </button>
                <button
                  onClick={() => setFilterTestament('novo')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    filterTestament === 'novo' ? 'bg-[#1B365D] text-white' : 'text-[#5E6D82]'
                  }`}
                >
                  Novo (27)
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-2">
              {filteredBooks.map(book => {
                const isSelected = selectedBook.id === book.id;
                return (
                  <button
                    key={book.id}
                    onClick={() => {
                      setSelectedBook(book);
                      setCurrentChapter(1);
                    }}
                    className={`text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-[#C99700] bg-amber-50/80 font-bold'
                        : 'border-[#E8E2D5] bg-[#FAF8F2] hover:border-[#C99700] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-xs font-bold text-[#1B365D]">
                        {book.name}
                      </span>
                      <span className="text-[10px] font-sans-ui text-[#C99700] font-bold">
                        {book.abbrev}
                      </span>
                    </div>
                    <span className="text-[10px] font-sans-ui text-[#5E6D82] block mt-1">
                      {book.totalChapters} {book.totalChapters === 1 ? 'capítulo' : 'capítulos'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Capítulos do Livro */}
            <div className="pt-4 border-t border-[#E8E2D5] mt-2">
              <h4 className="font-cinzel text-xs font-bold text-[#1B365D] mb-2 uppercase tracking-wide">
                Capítulos em {selectedBook.name}:
              </h4>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {Array.from({ length: selectedBook.totalChapters }, (_, i) => i + 1).map(ch => (
                  <button
                    key={ch}
                    onClick={() => {
                      setCurrentChapter(ch);
                      setNavModalOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center border transition-all ${
                      currentChapter === ch
                        ? 'bg-[#C99700] text-white border-[#C99700]'
                        : 'border-[#E8E2D5] bg-[#FAF8F2] text-[#1B365D] hover:border-[#C99700] hover:bg-white'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
