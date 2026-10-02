import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, RotateCcw, Clock, Sparkles, BookOpen, Info, X, Heart, Star, Award } from 'lucide-react';
import { WORD_SEARCH_THEMES } from '../data/wordsearch-themes';
import { WordSearchTheme, WordSearchWord } from '../types/bible';

interface CellPosition {
  r: number;
  c: number;
}

export const WordSearchGame: React.FC = () => {
  const getInitialState = () => {
    const estadoInicial = {
      currentThemeId: WORD_SEARCH_THEMES[0]?.id || 'wst-01',
      grid: [],
      foundWords: [],
      foundCoordinates: {},
      elapsedSeconds: 0,
      gameWon: false,
      hideWordList: false
    };
    if (typeof window === 'undefined') return estadoInicial;
    try {
      const salvo = localStorage.getItem('cristoguia_wordsearch_state');
      const parsed = salvo ? JSON.parse(salvo) : null;
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.foundWords)) {
        throw new Error('Estado inválido');
      }
      return { ...estadoInicial, ...parsed };
    } catch (e) {
      localStorage.removeItem('cristoguia_wordsearch_state');
      return estadoInicial;
    }
  };

  const initialState = getInitialState();
  const [currentTheme, setCurrentTheme] = useState<WordSearchTheme>(() => {
    return WORD_SEARCH_THEMES.find(t => t.id === initialState.currentThemeId) || WORD_SEARCH_THEMES[0] || { id: 'wst-00', title: 'Carregando', subtitle: '', words: [] };
  });
  const [gridSize] = useState<number>(12);
  const [grid, setGrid] = useState<string[][]>(Array.isArray(initialState.grid) ? initialState.grid : []);
  const [foundWords, setFoundWords] = useState<string[]>(Array.isArray(initialState.foundWords) ? initialState.foundWords : []);
  const [foundCoordinates, setFoundCoordinates] = useState<{ [word: string]: CellPosition[] }>(
    typeof initialState.foundCoordinates === 'object' && initialState.foundCoordinates !== null ? initialState.foundCoordinates : {}
  );
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(initialState.elapsedSeconds || 0);
  const [gameWon, setGameWon] = useState<boolean>(!!initialState.gameWon);
  const [hideWordList, setHideWordList] = useState<boolean>(!!initialState.hideWordList);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cristoguia_wordsearch_state', JSON.stringify({
        currentThemeId: currentTheme.id, grid, foundWords, foundCoordinates, elapsedSeconds, gameWon, hideWordList
      }));
    }
  }, [currentTheme, grid, foundWords, foundCoordinates, elapsedSeconds, gameWon, hideWordList]);

  useEffect(() => {
    if (grid.length === 0) {
      generateBoard(currentTheme);
      setElapsedSeconds(0);
      setGameWon(false);
    }
  }, [currentTheme]); // Only generate if grid is empty (e.g. initial load without cache or theme change handled below)

  const handleRestart = (theme = currentTheme) => {
    try {
      localStorage.removeItem('cristoguia_wordsearch_state');
    } catch(e) {}
    generateBoard(theme);
    setElapsedSeconds(0);
    setGameWon(false);
  };

  const handleChangeTheme = (theme: WordSearchTheme) => {
    setCurrentTheme(theme);
    handleRestart(theme);
  };

  // Timer
  useEffect(() => {
    if (gameWon) return;
    const interval = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    if (!currentTheme || !currentTheme.words || currentTheme.words.length === 0) {
    return <div className="p-10 text-center font-sans-ui text-[#5E6D82] font-bold bg-white rounded-3xl border-2 border-[#E8E2D5] max-w-5xl mx-auto my-8">Carregando desafios do dia...</div>;
  }

  return () => clearInterval(interval);
  }, [gameWon]);

  // Vitória
  useEffect(() => {
    if (foundWords.length > 0 && foundWords.length === currentTheme.words.length) {
      setGameWon(true);
    }
  }, [foundWords, currentTheme]);

  /**
   * Algoritmo de posicionamento de palavras bíblicas
   */
  const generateBoard = (theme: WordSearchTheme) => {
    const size = gridSize;
    let newGrid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
    const placedPositions: { [word: string]: CellPosition[] } = {};

    try {
      const date = new Date();
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      let seed = 0;
      for (let i = 0; i < dateKey.length; i++) {
        seed = (seed << 5) - seed + dateKey.charCodeAt(i);
        seed |= 0;
      }
      const random = () => {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };

      const directions: [number, number][] = [[0, 1], [1, 0], [1, 1], [-1, 1]];

      if (theme && Array.isArray(theme.words)) {
        theme.words.forEach(w => {
          if (!w || !w.term) return;
          const term = w.term.toUpperCase();
          let placed = false;
          let attempts = 0;

          while (!placed && attempts < 150) {
            attempts++;
            const dir = directions[Math.floor(random() * directions.length)];
            const [dr, dc] = dir;

            const maxR = dr === 1 ? size - term.length : dr === -1 ? size - 1 : size - 1;
            const minR = dr === -1 ? term.length - 1 : 0;
            const maxC = size - term.length;

            if (maxR < minR || maxC < 0) continue;

            const startR = Math.floor(random() * (maxR - minR + 1)) + minR;
            const startC = Math.floor(random() * (maxC + 1));

            let canPlace = true;
            const positions: CellPosition[] = [];

            for (let i = 0; i < term.length; i++) {
              const r = startR + i * dr;
              const c = startC + i * dc;
              if (r < 0 || r >= size || c < 0 || c >= size) { canPlace = false; break; }
              const currentCell = newGrid[r]?.[c];
              if (currentCell !== '' && currentCell !== term[i]) { canPlace = false; break; }
              positions.push({ r, c });
            }

            if (canPlace) {
              positions.forEach((pos, i) => {
                if (newGrid[pos.r]) newGrid[pos.r][pos.c] = term[i];
              });
              placedPositions[term] = positions;
              placed = true;
            }
          }
        });
      }

      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (newGrid[r] && !newGrid[r][c]) {
            newGrid[r][c] = letters[Math.floor(random() * letters.length)];
          }
        }
      }
    } catch (e) {
      console.error('Erro gerando grid dinâmico. Usando fallback estático:', e);
      // Fallback Estático Absoluto Garantido (12x12)
      const fallback = [
        ['J','E','S','U','S','A','B','C','D','E','F','G'],
        ['A','H','I','J','K','L','M','N','O','P','Q','R'],
        ['M','F','E','S','T','U','V','X','Y','Z','A','B'],
        ['O','C','D','P','E','F','G','H','I','J','K','L'],
        ['R','M','N','O','E','P','Q','R','S','T','U','V'],
        ['X','Y','Z','A','B','R','C','D','E','F','G','H'],
        ['I','J','K','L','M','N','A','O','P','Q','R','S'],
        ['T','U','V','G','R','A','C','A','X','Y','Z','A'],
        ['B','C','D','E','F','G','H','I','N','J','K','L'],
        ['M','N','O','P','Q','R','S','T','U','C','V','X'],
        ['P','A','Z','Y','Z','A','B','C','D','E','A','F'],
        ['G','H','I','J','K','L','M','N','O','P','Q','R']
      ];
      newGrid = fallback;
    }

    setGrid(newGrid);
    setFoundWords([]);
    setFoundCoordinates({});
    setActiveSelectedCells([]);
  };

  const computeLineCells = (start: CellPosition, end: CellPosition): CellPosition[] => {
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    if (absDr !== 0 && absDc !== 0 && absDr !== absDc) {
      return [start];
    }

    const steps = Math.max(absDr, absDc);
    if (steps === 0) return [start];

    const stepR = dr === 0 ? 0 : dr / absDr;
    const stepC = dc === 0 ? 0 : dc / absDc;

    const cells: CellPosition[] = [];
    for (let i = 0; i <= steps; i++) {
      cells.push({
        r: start.r + i * stepR,
        c: start.c + i * stepC
      });
    }
    return cells;
  };

  const handlePointerDown = (r: number, c: number) => {
    setIsSelecting(true);
    setSelectionStart({ r, c });
    setSelectionCurrent({ r, c });
    setActiveSelectedCells([{ r, c }]);
  };

  const handlePointerEnter = (r: number, c: number) => {
    if (!isSelecting || !selectionStart) return;
    setSelectionCurrent({ r, c });
    const cells = computeLineCells(selectionStart, { r, c });
    setActiveSelectedCells(cells);
  };

  const handlePointerUp = () => {
    if (!isSelecting || activeSelectedCells.length === 0) {
      setIsSelecting(false);
      return;
    }

    const selectedLetters = activeSelectedCells.map(pos => grid[pos.r]?.[pos.c] || '').join('');
    const reversedLetters = selectedLetters.split('').reverse().join('');

    const match = currentTheme.words.find(w => {
      const t = w.term.toUpperCase();
      return (t === selectedLetters || t === reversedLetters) && !foundWords.includes(t);
    });

    if (match) {
      const term = match.term.toUpperCase();
      setFoundWords(prev => [...prev, term]);
      setFoundCoordinates(prev => ({
        ...prev,
        [term]: activeSelectedCells
      }));
      setActiveMicroficha(match);
    }

    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionCurrent(null);
    setActiveSelectedCells([]);
  };

  const isCellSelected = (r: number, c: number) => {
    return activeSelectedCells.some(cell => cell.r === r && cell.c === c);
  };

  const isCellFound = (r: number, c: number) => {
    return Object.values(foundCoordinates).some(coordsList =>
      coordsList.some(cell => cell.r === r && cell.c === c)
    );
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full py-8 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Cabeçalho Alegre e Claro do Jogo */}
      <div className="bg-white border-2 border-[#E8E2D5] rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9E6] border border-[#E5B21A]/50 text-[#8C6B00] text-xs font-bold mb-2">
              <span>🧩</span>
              <span>Caça-Palavras Bíblico da Família</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1B365D]">
              {currentTheme.title}
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-[#5E6D82] mt-0.5">
              {currentTheme.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Cronômetro Amigável */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8F5EE] border border-[#E8E2D5] text-xs font-sans-ui font-bold text-[#1B365D]">
              <Clock className="w-4 h-4 text-[#C99700]" />
              <span className="font-mono tabular-nums">{formatTimer(elapsedSeconds)}</span>
            </div>

            {/* Contador de Palavras */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-sans-ui font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{foundWords.length} de {currentTheme.words.length} Encontradas</span>
            </div>

            {/* Botão Reiniciar */}
            <button
              onClick={() => handleRestart(currentTheme)}
              className="p-2 border border-[#E8E2D5] rounded-xl bg-white hover:bg-[#F8F5EE] text-[#1B365D] hover:border-[#C99700] transition-colors shadow-xs"
              title="Embaralhar novo tabuleiro"
            >
              <RotateCcw className="w-4 h-4 text-[#C99700]" />
            </button>
          </div>
        </div>

        {/* Escolha do Tema Bíblico */}
        <div className="mt-5 pt-4 border-t border-[#E8E2D5] flex flex-wrap items-center gap-2 text-xs font-sans-ui">
          <span className="font-bold text-[#1B365D] uppercase tracking-wide text-[11px] mr-1">
            Escolher Tema Bíblico:
          </span>
          {WORD_SEARCH_THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleChangeTheme(theme)}
              className={`px-3.5 py-1.5 rounded-xl border font-bold transition-all shadow-xs ${
                currentTheme.id === theme.id
                  ? 'bg-[#1B365D] text-white border-[#1B365D]'
                  : 'bg-white text-[#4A5568] border-[#E8E2D5] hover:border-[#C99700]'
              }`}
            >
              {theme.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal + Palavras a Encontrar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Tabuleiro Claro e Atraente */}
        <div className="lg:col-span-2 bg-white border-2 border-[#E8E2D5] rounded-3xl p-5 sm:p-8 shadow-sm select-none">
          <div className="text-center mb-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFF9E6] text-[#8C6B00] text-xs font-semibold">
              Toque e arraste pelas letras para formar a palavra sagrada
            </span>
          </div>

          <div
            className="grid grid-cols-12 gap-1 sm:gap-2 touch-none max-w-md sm:max-w-lg mx-auto"
            onPointerLeave={handlePointerUp}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => {
                const selected = isCellSelected(r, c);
                const found = isCellFound(r, c);

                return (
                  <div
                    key={`${r}-${c}`}
                    onPointerDown={() => handlePointerDown(r, c)}
                    onPointerEnter={() => handlePointerEnter(r, c)}
                    onPointerUp={handlePointerUp}
                    className={`aspect-square flex items-center justify-center font-bold text-xs sm:text-base rounded-xl cursor-pointer transition-all duration-150 ${
                      selected
                        ? 'bg-[#C99700] text-white shadow-md scale-105 z-10'
                        : found
                        ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400 font-extrabold'
                        : 'bg-[#F9F7F1] text-[#1B365D] hover:bg-[#F3EFE0] border border-[#E8E2D5]/70'
                    }`}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Lista de Palavras para Encontrar */}
        <div className="space-y-4">
          <div className="bg-white border-2 border-[#E8E2D5] rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E2D5] gap-2 mb-3">
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#1B365D]">
                  Palavras da Fé
                </h3>
                <span className="text-xs font-sans-ui text-[#C99700] font-bold">
                  {foundWords.length} de {currentTheme.words.length} Encontradas
                </span>
              </div>

              {/* Botão de Modo Oculto / Mistério */}
              <button
                onClick={() => setHideWordList(!hideWordList)}
                className="px-3 py-1.5 text-xs font-sans-ui font-semibold rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] hover:bg-white text-[#1B365D] hover:border-[#C99700] transition-colors shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
                title="Alterne entre ver as palavras ou escondê-las para maior desafio"
              >
                {hideWordList ? '👁️ Mostrar Lista de Palavras' : '🕵️ Ocultar Lista (Modo Desafio)'}
              </button>
            </div>

            <p className="text-[11px] font-sans-ui text-[#5E6D82] mb-3 leading-relaxed">
              {hideWordList
                ? 'Modo Desafio ativo: procure os termos sagrados na grade sem saber a lista antecipadamente!'
                : 'Padrão tradicional de caça-palavras: localize na grade as palavras bíblicas listadas abaixo.'}
            </p>

            <div className="space-y-2">
              {currentTheme.words.map((w, idx) => {
                const isFound = foundWords.includes(w.term.toUpperCase());
                const label = w.display || w.term;
                return (
                  <div
                    key={w.term}
                    onClick={() => isFound && setActiveMicroficha(w)}
                    className={`p-3 rounded-xl border transition-all text-xs font-sans-ui flex items-center justify-between ${
                      isFound
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 cursor-pointer shadow-xs hover:bg-emerald-100 font-bold'
                        : 'bg-[#FAF8F2] border-[#E8E2D5] text-[#4A5568] font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isFound ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-stone-300 shrink-0" />
                      )}
                      
                      {hideWordList && !isFound ? (
                        <span className="italic text-stone-400 truncate">
                          Palavra misteriosa #{idx + 1} ({w.term.length} letras)
                        </span>
                      ) : (
                        <span className={`break-words ${isFound ? 'line-through text-emerald-700 font-bold' : 'text-[#1B365D]'}`}>
                          {label}
                        </span>
                      )}
                    </div>

                    {isFound && (
                      <span className="text-[10px] text-emerald-800 font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 shrink-0 ml-2">
                        Ver Significado
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Banner de Vitória Alegre */}
          {gameWon && (
            <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-[#C99700] rounded-3xl text-center space-y-3 shadow-md">
              <Trophy className="w-10 h-10 text-[#C99700] mx-auto animate-bounce" />
              <h4 className="font-cinzel text-xl font-bold text-[#1B365D]">
                Parabéns, você completou!
              </h4>
              <p className="text-xs font-sans-ui text-[#4A5568]">
                Você encontrou todas as palavras da fé em <strong>{formatTimer(elapsedSeconds)}</strong>. Glória a Deus!
              </p>
              <button
                onClick={() => {
                  const nextIdx = (WORD_SEARCH_THEMES.findIndex(t => t.id === currentTheme.id) + 1) % WORD_SEARCH_THEMES.length;
                  setCurrentTheme(WORD_SEARCH_THEMES[nextIdx]);
                }}
                className="w-full py-2.5 text-xs font-sans-ui font-bold bg-[#1B365D] hover:bg-[#254A80] text-white rounded-xl shadow-xs transition-colors"
              >
                Jogar Próximo Tema Bíblico
              </button>
            </div>
          )}
        </div>
      </div>

      {/* POP-UP DE SIGNIFICADO BÍBLICO AO ENCONTRAR */}
      {activeMicroficha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#C99700] rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <div className="flex items-center gap-2 text-xs font-cinzel text-[#C99700] font-bold uppercase">
                <BookOpen className="w-4 h-4" />
                <span>Significado Bíblico</span>
              </div>
              <button
                onClick={() => setActiveMicroficha(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="my-4">
              <div className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
                ✓ Palavra Encontrada
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[#1B365D]">
                {activeMicroficha.display || activeMicroficha.term}
              </h3>
              <span className="font-sans-ui text-xs font-bold text-[#C99700] block mt-1">
                Passagem: {activeMicroficha.reference}
              </span>
              <p className="font-lora text-sm text-[#333F4E] leading-relaxed mt-3 p-4 bg-[#FFFDF7] rounded-xl border border-[#E8E2D5]">
                {activeMicroficha.definition}
              </p>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setActiveMicroficha(null)}
                className="px-5 py-2 text-xs font-sans-ui font-bold rounded-xl bg-[#1B365D] hover:bg-[#254A80] text-white shadow-xs"
              >
                Continuar Jogando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
