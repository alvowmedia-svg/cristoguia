import React from 'react';
import { Bookmark, X, Trash2, ArrowUpRight, Copy, Check, FileText } from 'lucide-react';
import { HighlightedVerse } from '../types/bible';

interface SavedVersesModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlights: HighlightedVerse[];
  onRemoveHighlight: (id: string) => void;
  onNavigateToVerse: (bookId: string, chapter: number, verse: number) => void;
}

export const SavedVersesModal: React.FC<SavedVersesModalProps> = ({
  isOpen,
  onClose,
  highlights,
  onRemoveHighlight,
  onNavigateToVerse
}) => {
  const [copiedAll, setCopiedAll] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyAll = () => {
    if (highlights.length === 0) return;
    const text = highlights
      .map(
        h =>
          `${h.bookName} ${h.chapter}:${h.verse}\n"${h.text}"${h.note ? `\nMinha Anotação: ${h.note}` : ''}`
      )
      .join('\n\n---\n\n');

    navigator.clipboard.writeText(`${text}\n\nMeu Caderno Devocional · Portal Cristo Guia (cristoguia.com.br)`);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border-2 border-[#C99700] rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF9E6] border border-[#E5B21A] text-[#C99700] flex items-center justify-center">
              <Bookmark className="w-5 h-5 fill-[#C99700]" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-[#1B365D]">
                Meu Caderno Espiritual
              </h3>
              <p className="text-xs font-sans-ui text-[#5E6D82]">
                {highlights.length} {highlights.length === 1 ? 'passagem guardada no coração' : 'passagens guardadas no coração'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {highlights.length > 0 && (
              <button
                onClick={handleCopyAll}
                className="px-3.5 py-2 text-xs font-sans-ui font-bold border border-[#E8E2D5] rounded-xl hover:border-[#C99700] text-[#1B365D] bg-[#FAF8F2] hover:bg-white flex items-center gap-1.5 transition-colors shadow-xs"
                title="Copiar todas as anotações"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C99700]" />}
                <span>{copiedAll ? 'Copiado!' : 'Copiar Tudo'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
          {highlights.length === 0 ? (
            <div className="py-12 text-center text-xs font-sans-ui text-[#5E6D82] space-y-3">
              <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-cinzel text-base text-[#1B365D] font-bold">
                Seu caderno devocional está pronto para você!
              </p>
              <p className="max-w-md mx-auto text-sm text-[#4A5568]">
                Ao ler a Bíblia ou a Palavra do Dia, toque no versículo para grifá-lo ou salvar suas orações e anotações aqui.
              </p>
            </div>
          ) : (
            highlights.map(h => (
              <div
                key={h.id}
                className={`p-4 rounded-2xl border transition-all ${
                  h.color === 'gold'
                    ? 'border-amber-200 bg-amber-50/50'
                    : 'border-emerald-200 bg-emerald-50/50'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        h.color === 'gold' ? 'bg-[#C99700]' : 'bg-emerald-600'
                      }`}
                    />
                    <span className="font-cinzel text-sm font-bold text-[#1B365D]">
                      {h.bookName} {h.chapter}:{h.verse}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        onNavigateToVerse(h.bookId, h.chapter, h.verse);
                        onClose();
                      }}
                      className="text-xs font-sans-ui font-bold text-[#C99700] hover:underline flex items-center gap-1"
                    >
                      <span>Ler na Bíblia</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveHighlight(h.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors"
                      title="Excluir do caderno"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-lora text-sm text-[#333F4E] leading-relaxed">
                  "{h.text}"
                </p>

                {h.note && (
                  <div className="mt-3 p-3 rounded-xl bg-white border border-[#E8E2D5] text-xs font-sans-ui text-[#333F4E] flex items-start gap-2 shadow-xs">
                    <FileText className="w-4 h-4 text-[#C99700] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1B365D] block mb-0.5">Minha Anotação:</strong>
                      <span>{h.note}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
