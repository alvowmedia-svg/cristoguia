import React, { useState } from 'react';
import { Search, X, Book, FileText, ArrowRight } from 'lucide-react';
import { BIBLE_BOOKS } from '../data/bible-canon';
import { EDITORIAL_ARTICLES } from '../data/articles';
import { DAILY_VERSES_ARCHIVE } from '../data/daily-verse-engine';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (bookId: string, chapter?: number) => void;
  onSelectArticle: (articleId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectBook,
  onSelectArticle
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const term = searchTerm.trim().toLowerCase();

  const matchedBooks = term
    ? BIBLE_BOOKS.filter(b => b.name.toLowerCase().includes(term) || b.abbrev.toLowerCase().includes(term) || b.categoryName.toLowerCase().includes(term)).slice(0, 4)
    : [];

  const matchedArticles = term
    ? EDITORIAL_ARTICLES.filter(a => a.title.toLowerCase().includes(term) || a.subtitle.toLowerCase().includes(term) || a.tags.some(t => t.toLowerCase().includes(term))).slice(0, 3)
    : [];

  const matchedDaily = term
    ? DAILY_VERSES_ARCHIVE.filter(v => v.text.toLowerCase().includes(term) || v.reference.toLowerCase().includes(term) || v.theme.toLowerCase().includes(term)).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border-2 border-[#C99700] rounded-3xl p-6 max-w-2xl w-full shadow-2xl">
        {/* Barra de Busca */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E8E2D5]">
          <Search className="w-5 h-5 text-[#C99700]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por livro, versículo, assunto ou artigo (ex: Salmos, paz, Qumran)..."
            className="flex-1 bg-transparent text-sm sm:text-base font-sans-ui text-[#1C2430] focus:outline-none placeholder:text-stone-400 font-medium"
          />
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-5 pr-1">
          {!term && (
            <div className="py-8 text-center text-xs font-sans-ui text-[#5E6D82]">
              <span className="font-cinzel text-base uppercase block mb-1 text-[#1B365D] font-bold">
                Pesquisa na Palavra de Deus
              </span>
              Digite o nome de um livro da Bíblia ou uma palavra para encontrar passagens e estudos.
            </div>
          )}

          {term && matchedBooks.length === 0 && matchedArticles.length === 0 && matchedDaily.length === 0 && (
            <div className="py-8 text-center text-xs font-sans-ui text-[#5E6D82]">
              Nenhum resultado encontrado para "{searchTerm}". Tente pesquisar por outro termo.
            </div>
          )}

          {/* Livros */}
          {matchedBooks.length > 0 && (
            <div>
              <span className="font-sans-ui text-xs font-bold text-[#C99700] uppercase tracking-wider block mb-2">
                Livros da Bíblia ({matchedBooks.length})
              </span>
              <div className="space-y-1.5">
                {matchedBooks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBook(b.id, 1);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] hover:bg-white hover:border-[#C99700] text-xs font-sans-ui text-[#1C2430] flex items-center justify-between group transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Book className="w-4 h-4 text-[#C99700]" />
                      <span className="font-cinzel font-bold text-sm text-[#1B365D]">{b.name}</span>
                      <span className="text-stone-400">· {b.categoryName} ({b.totalChapters} caps)</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C99700]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Versículos */}
          {matchedDaily.length > 0 && (
            <div>
              <span className="font-sans-ui text-xs font-bold text-[#C99700] uppercase tracking-wider block mb-2">
                Versículos e Passagens ({matchedDaily.length})
              </span>
              <div className="space-y-2">
                {matchedDaily.map(v => (
                  <div
                    key={v.id}
                    onClick={() => {
                      onSelectBook('sl', v.chapter);
                      onClose();
                    }}
                    className="cursor-pointer p-3.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] hover:bg-white hover:border-[#C99700] transition-colors shadow-xs"
                  >
                    <span className="font-cinzel text-xs font-bold text-[#1B365D] block">
                      {v.reference}
                    </span>
                    <p className="font-lora text-xs text-[#333F4E] mt-1 line-clamp-2">
                      "{v.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artigos */}
          {matchedArticles.length > 0 && (
            <div>
              <span className="font-sans-ui text-xs font-bold text-[#C99700] uppercase tracking-wider block mb-2">
                Estudos Bíblicos ({matchedArticles.length})
              </span>
              <div className="space-y-2">
                {matchedArticles.map(a => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onSelectArticle(a.id);
                      onClose();
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] hover:bg-white hover:border-[#C99700] text-xs font-sans-ui text-[#1C2430] flex items-center justify-between group transition-colors shadow-xs"
                  >
                    <div>
                      <span className="font-cinzel font-bold text-sm text-[#1B365D] block">{a.title}</span>
                      <span className="text-stone-500 text-[11px]">{a.category} · {a.readTimeMinutes} min de leitura</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C99700]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
