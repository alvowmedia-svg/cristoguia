import React, { useState } from 'react';
import { Search, Bookmark, BookOpen, Menu, X, Sun, Heart, Gamepad2, Compass } from 'lucide-react';
import { CristoGuiaLogo } from './CristoGuiaLogo';

interface HeaderProps {
  currentTab: 'daily' | 'bible' | 'games' | 'moments' | 'articles';
  onSelectTab: (tab: 'daily' | 'bible' | 'games' | 'moments' | 'articles') => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenBookmarks,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Formatação em português acolhedor
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E2D5] bg-[#FFFFFF]/98 backdrop-blur-md shadow-xs">
      {/* 1. Barra de Acolhimento e Saudação Cristã */}
      <div className="border-b border-[#E8E2D5]/70 bg-[#FBF9F2] py-2 px-4 sm:px-8 text-xs font-sans-ui text-[#4A5568] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-[#C99700] text-sm">✝</span>
          <span className="font-medium text-[#1B365D]">A Paz do Senhor Jesus!</span>
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="hidden sm:inline capitalize text-[#5E6D82]">{dateFormatted}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="hidden md:inline font-serif italic text-[#5E6D82]">
            "Lâmpada para os meus pés é a Tua Palavra"
          </span>
          <span className="text-[#C99700] font-semibold">cristoguia.com.br</span>
        </div>
      </div>

      {/* 2. Top Bar Principal Laranja/Dourado/Azul Marinho */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Marca: Cristo Guia com Logomarca Oficial Discreta e Elegante */}
        <button
          onClick={() => onSelectTab('daily')}
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FFFDF9] border border-[#E8E2D5] flex items-center justify-center shadow-2xs group-hover:border-[#C99700] transition-colors shrink-0 overflow-hidden">
            <CristoGuiaLogo size={32} variant="icon-only" color="#2A1A10" />
          </div>

          <div className="shrink-0">
            <span className="font-cinzel text-lg sm:text-xl font-black tracking-[0.08em] text-[#2A1A10] block leading-none">
              CRISTO GUIA
            </span>
            <span className="font-sans-ui text-[11px] text-[#5E6D82] hidden sm:block font-medium mt-0.5 leading-none">
              Luz para os teus passos
            </span>
          </div>
        </button>

        {/* Navegação Principal Alegre e Clara */}
        <nav className="hidden lg:flex items-center gap-2 font-sans-ui text-sm font-semibold">
          <button
            onClick={() => onSelectTab('daily')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'daily'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-[#4A5568] hover:bg-[#F8F5EE] hover:text-[#1B365D]'
            }`}
          >
            <Sun className="w-4 h-4 text-[#E5B21A]" />
            <span>Palavra do Dia</span>
          </button>

          <button
            onClick={() => onSelectTab('bible')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'bible'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-[#4A5568] hover:bg-[#F8F5EE] hover:text-[#1B365D]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#C99700]" />
            <span>Bíblia Sagrada</span>
          </button>

          <button
            onClick={() => onSelectTab('moments')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'moments'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-[#4A5568] hover:bg-[#F8F5EE] hover:text-[#1B365D]'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Para o seu Momento</span>
          </button>

          <button
            onClick={() => onSelectTab('games')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'games'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-[#4A5568] hover:bg-[#F8F5EE] hover:text-[#1B365D]'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-emerald-600" />
            <span>Jogos da Fé</span>
          </button>

          <button
            onClick={() => onSelectTab('articles')}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'articles'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'text-[#4A5568] hover:bg-[#F8F5EE] hover:text-[#1B365D]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C99700]" />
            <span>Estudos & Arqueologia</span>
          </button>
        </nav>

        {/* Ações Rápidas */}
        <div className="flex items-center gap-2">
          {/* Busca */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-2 text-xs font-sans-ui font-semibold border border-[#E8E2D5] rounded-lg bg-[#FAF8F2] hover:bg-white text-[#1B365D] hover:border-[#C99700] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Search className="w-4 h-4 text-[#C99700]" />
            <span className="hidden sm:inline">Pesquisar</span>
          </button>

          {/* Caderno de Versículos */}
          <button
            onClick={onOpenBookmarks}
            className="p-2 sm:px-3 sm:py-2 text-xs font-sans-ui font-semibold border border-[#E8E2D5] rounded-lg bg-[#FAF8F2] hover:bg-white text-[#1B365D] hover:border-[#C99700] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Bookmark className="w-4 h-4 text-[#C99700]" />
            <span className="hidden sm:inline">Meu Caderno</span>
            {savedCount > 0 && (
              <span className="inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.5 bg-[#C99700] text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1B365D] border border-[#E8E2D5] rounded-lg bg-[#FAF8F2]"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D5] bg-white px-5 py-4 space-y-2 shadow-md">
          <button
            onClick={() => { onSelectTab('daily'); setMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-sans-ui font-semibold flex items-center gap-2 ${
              currentTab === 'daily' ? 'bg-[#1B365D] text-white' : 'text-[#4A5568] hover:bg-[#F8F5EE]'
            }`}
          >
            <Sun className="w-4 h-4 text-[#E5B21A]" />
            <span>Palavra do Dia (Devocional)</span>
          </button>

          <button
            onClick={() => { onSelectTab('bible'); setMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-sans-ui font-semibold flex items-center gap-2 ${
              currentTab === 'bible' ? 'bg-[#1B365D] text-white' : 'text-[#4A5568] hover:bg-[#F8F5EE]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#C99700]" />
            <span>Bíblia Sagrada (66 Livros)</span>
          </button>

          <button
            onClick={() => { onSelectTab('moments'); setMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-sans-ui font-semibold flex items-center gap-2 ${
              currentTab === 'moments' ? 'bg-[#1B365D] text-white' : 'text-[#4A5568] hover:bg-[#F8F5EE]'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Versículos para o seu Momento</span>
          </button>

          <button
            onClick={() => { onSelectTab('games'); setMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-sans-ui font-semibold flex items-center gap-2 ${
              currentTab === 'games' ? 'bg-[#1B365D] text-white' : 'text-[#4A5568] hover:bg-[#F8F5EE]'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-emerald-600" />
            <span>Jogos da Fé (Caça-Palavras & Quiz)</span>
          </button>

          <button
            onClick={() => { onSelectTab('articles'); setMobileMenuOpen(false); }}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-sans-ui font-semibold flex items-center gap-2 ${
              currentTab === 'articles' ? 'bg-[#1B365D] text-white' : 'text-[#4A5568] hover:bg-[#F8F5EE]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C99700]" />
            <span>Estudos & Arqueologia Bíblica</span>
          </button>
        </div>
      )}
    </header>
  );
};
