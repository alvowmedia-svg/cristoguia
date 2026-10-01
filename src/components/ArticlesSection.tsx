import React, { useState, useMemo } from 'react';
import { BookOpen, Clock, ChevronRight, User, ArrowUpRight, ArrowLeft, Compass, Search, Tag } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/articles';
import { EditorialArticle } from '../types/bible';

interface ArticlesSectionProps {
  onOpenPassageInBible: (bookId: string, chapter: number, verse: number) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ onOpenPassageInBible }) => {
  const [selectedArticle, setSelectedArticle] = useState<EditorialArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Categorias disponíveis
  const categories = useMemo(() => {
    const cats = Array.from(new Set(EDITORIAL_ARTICLES.map(a => a.category)));
    return ['todos', ...cats];
  }, []);

  // Filtragem de artigos
  const filteredArticles = useMemo(() => {
    return EDITORIAL_ARTICLES.filter(article => {
      const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.tags.some(t => t.toLowerCase().includes(q)) ||
        article.author.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const heroArticle = filteredArticles[0] || EDITORIAL_ARTICLES[0];
  const secondaryArticles = filteredArticles.slice(1);

  if (selectedArticle) {
    return (
      <article className="w-full py-8 sm:py-12 px-4 sm:px-8 max-w-4xl mx-auto animate-fadeIn">
        {/* Voltar */}
        <button
          onClick={() => {
            setSelectedArticle(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mb-6 px-4 py-2 text-xs font-sans-ui font-bold border border-[#E8E2D5] rounded-xl bg-white hover:border-[#C99700] text-[#1B365D] inline-flex items-center gap-2 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#C99700]" />
          <span>Voltar ao Blog & Estudos</span>
        </button>

        {/* Cabeçalho do Estudo */}
        <header className="pb-8 mb-8 bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#E8E2D5] shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans-ui text-[#C99700] uppercase tracking-wider font-bold mb-3">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FFF9E6] border border-[#E5B21A]/30">
              {selectedArticle.category}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-[#5E6D82]">
              <Clock className="w-3.5 h-3.5" />
              {selectedArticle.readTimeMinutes} min de leitura
            </span>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#1B365D] leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="font-lora text-base sm:text-lg text-[#4A5568] mt-4 leading-relaxed">
            {selectedArticle.subtitle}
          </p>

          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#E8E2D5] text-xs font-sans-ui text-[#5E6D82]">
            <div className="w-10 h-10 rounded-full bg-[#FFF9E6] border border-[#E5B21A] flex items-center justify-center font-bold text-[#C99700] shrink-0">
              {selectedArticle.author.avatarInitials}
            </div>
            <div>
              <strong className="text-[#1B365D] block font-bold text-sm">
                {selectedArticle.author.name}
              </strong>
              <span>{selectedArticle.author.title} · {selectedArticle.publishedAt}</span>
            </div>
          </div>
        </header>

        {/* Corpo do Artigo */}
        <div className="bg-white p-6 sm:p-12 rounded-3xl border-2 border-[#E8E2D5] shadow-sm space-y-8 font-lora text-base sm:text-lg text-[#2D3748] leading-relaxed">
          {selectedArticle.sections.map((section, sIdx) => (
            <section key={section.id} id={section.id} className="space-y-4">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D] pt-4">
                {section.title}
              </h2>

              {section.content.map((p, pIdx) => (
                <p key={pIdx} className={sIdx === 0 && pIdx === 0 ? 'drop-cap' : ''}>
                  {p}
                </p>
              ))}

              {section.pullQuote && (
                <aside className="my-8 p-6 rounded-2xl border-l-4 border-[#C99700] bg-[#FFFDF7] text-center shadow-xs">
                  <blockquote className="font-garamond italic text-xl sm:text-2xl text-[#1B365D] leading-snug">
                    "{section.pullQuote}"
                  </blockquote>
                </aside>
              )}
            </section>
          ))}
        </div>

        {/* Passagens Bíblicas Conexas */}
        {selectedArticle.relatedPassages && selectedArticle.relatedPassages.length > 0 && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl border-2 border-[#E8E2D5] bg-[#FFFDF7] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-cinzel text-[#C99700] uppercase tracking-wider font-bold mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Passagens Bíblicas Conectadas a Este Estudo</span>
            </div>
            <h3 className="font-cinzel text-lg font-bold text-[#1B365D] mb-4">
              Consulte diretamente nas Sagradas Escrituras:
            </h3>

            <div className="space-y-2.5">
              {selectedArticle.relatedPassages.map((rp, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenPassageInBible(rp.bookId, rp.chapter, rp.verse)}
                  className="w-full text-left p-4 rounded-xl border border-[#E8E2D5] bg-white hover:border-[#C99700] text-xs sm:text-sm font-sans-ui text-[#1B365D] flex items-center justify-between group transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C99700] shrink-0" />
                    <span className="font-bold group-hover:text-[#C99700]">{rp.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#C99700] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9E6] border border-[#E5B21A]/50 text-[#8C6B00] text-xs font-bold mb-2 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-[#C99700]" />
          <span>Blog & Arqueologia Bíblica</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#1B365D]">
          Estudos & Crônicas da Fé
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[#5E6D82] mt-1.5">
          Pesquisas aprofundadas, achados históricos e exegese sólida que confirmam a autoridade inabalável das Sagradas Escrituras.
        </p>
      </div>

      {/* Barra de Busca e Filtro de Categorias */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pesquisar estudos, autores, palavras-chave..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E2D5] bg-white text-xs sm:text-sm font-sans-ui text-[#1C2430] placeholder-stone-400 focus:outline-none focus:border-[#C99700] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Categorias em Pílulas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-sans-ui font-semibold">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1B365D] text-white shadow-2xs'
                  : 'bg-white border border-[#E8E2D5] text-[#5E6D82] hover:border-[#C99700] hover:text-[#1B365D]'
              }`}
            >
              {cat === 'todos' ? 'Todos os Artigos' : cat}
            </button>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-[#E8E2D5] p-12 text-center text-[#5E6D82]">
          <p className="font-cinzel text-lg font-bold text-[#1B365D]">Nenhum estudo encontrado</p>
          <p className="text-xs font-sans-ui mt-1">Tente buscar por outro termo ou selecione a categoria "Todos os Artigos".</p>
        </div>
      ) : (
        <>
          {/* Artigo Hero Destaque */}
          {heroArticle && (
            <div
              onClick={() => {
                setSelectedArticle(heroArticle);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer group mb-8 rounded-3xl border-2 border-[#E8E2D5] bg-white overflow-hidden transition-all hover:border-[#C99700] shadow-sm grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-5 bg-gradient-to-br from-[#1B365D] to-[#254A80] p-8 sm:p-10 flex flex-col justify-between text-white relative min-h-[260px]">
                <div>
                  <span className="font-sans-ui text-xs uppercase tracking-widest text-[#E5B21A] block font-bold mb-1">
                    Estudo em Destaque
                  </span>
                  <span className="font-serif italic text-sm text-stone-200">
                    {heroArticle.category}
                  </span>
                </div>

                <div className="my-6 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl border-2 border-[#E5B21A] flex items-center justify-center bg-white/10 shadow-inner group-hover:scale-105 transition-transform">
                    <BookOpen className="w-8 h-8 text-[#E5B21A]" />
                  </div>
                </div>

                <div className="text-[11px] font-sans-ui text-stone-300 uppercase tracking-wider font-semibold">
                  {heroArticle.tags.slice(0, 3).join(' · ')}
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans-ui text-[#C99700] uppercase tracking-wider font-bold mb-2">
                    <span>{heroArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{heroArticle.readTimeMinutes} min de leitura</span>
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D] leading-snug group-hover:text-[#C99700] transition-colors">
                    {heroArticle.title}
                  </h3>

                  <p className="font-lora text-xs sm:text-sm text-[#5E6D82] mt-3 line-clamp-3 leading-relaxed">
                    {heroArticle.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E2D5] flex items-center justify-between text-xs font-sans-ui">
                  <span className="font-bold text-[#1B365D]">{heroArticle.author.name}</span>
                  <span className="font-bold text-[#C99700] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ler Estudo Completo <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Demais Artigos em Grade */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryArticles.map(article => (
              <div
                key={article.id}
                onClick={() => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer group p-6 rounded-3xl border-2 border-[#E8E2D5] bg-white hover:border-[#C99700] transition-all flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-sans-ui text-[#C99700] uppercase tracking-wider font-bold mb-2">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTimeMinutes} min</span>
                  </div>

                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#1B365D] leading-snug group-hover:text-[#C99700] transition-colors">
                    {article.title}
                  </h4>

                  <p className="font-lora text-xs text-[#5E6D82] mt-2.5 line-clamp-3 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#E8E2D5] flex items-center justify-between text-xs font-sans-ui">
                  <span className="font-semibold text-[#1B365D] text-[11px] truncate max-w-[150px]">
                    {article.author.name}
                  </span>
                  <span className="text-[#C99700] font-bold flex items-center gap-1 shrink-0">
                    Acessar <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
