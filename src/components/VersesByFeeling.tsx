import React, { useState, useRef } from 'react';
import { MOMENT_CATEGORIES, MomentCategory } from '../data/moments-verses';
import { Heart, Volume2, VolumeX, Copy, Check, BookOpen, Share2, Quote, Sparkles, Send, ArrowDown, ChevronRight } from 'lucide-react';

interface VersesByFeelingProps {
  onOpenPassageInBible: (bookId: string, chapter: number, verse?: number) => void;
  onSaveBookmark?: (verseData: { text: string; reference: string; note: string }) => void;
}

export const VersesByFeeling: React.FC<VersesByFeelingProps> = ({
  onOpenPassageInBible,
  onSaveBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MomentCategory>(MOMENT_CATEGORIES[0]);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [personalPrayer, setPersonalPrayer] = useState('');
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);
  const [conversationalFeedback, setConversationalFeedback] = useState<string | null>(null);

  // Referência para rolar suavemente até a mensagem
  const messageSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSelectCategory = (cat: MomentCategory) => {
    setSelectedCategory(cat);
    setPrayerSubmitted(false);
    setPersonalPrayer('');

    // Mensagem conversacional instantânea
    setConversationalFeedback(`Ouvindo o seu momento: "${cat.name}". Deus preparou uma palavra de consolo para você agora...`);

    // Direcionamento suave até a mensagem
    setTimeout(() => {
      if (messageSectionRef.current) {
        const yOffset = -80; // Compensação da barra fixa superior
        const element = messageSectionRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura por voz.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText = `${selectedCategory.verse.conversationalIntro}. ${selectedCategory.verse.reference}. ${selectedCategory.verse.text}. ${selectedCategory.verse.message}. Oração: ${selectedCategory.verse.prayer}`;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.88; // Ritmo sereno e pausado
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopy = () => {
    const text = `"${selectedCategory.verse.text}"\n— ${selectedCategory.verse.reference}\n\n${selectedCategory.verse.message}\n\nOração: "${selectedCategory.verse.prayer}"\n\nQue Deus abençoe o seu coração! · Portal Cristo Guia (cristoguia.com.br)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalPrayer.trim()) return;
    setPrayerSubmitted(true);

    if (onSaveBookmark) {
      onSaveBookmark({
        text: selectedCategory.verse.text,
        reference: selectedCategory.verse.reference,
        note: `Meu clamor por ${selectedCategory.name}: "${personalPrayer}"`
      });
    }
  };

  return (
    <div className="w-full py-8 sm:py-12 px-4 sm:px-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Cabeçalho Acolhedor */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9E6] border border-[#E5B21A]/60 text-[#8C6B00] text-xs font-semibold mb-2 shadow-2xs">
          <span>🕊️</span>
          <span>Refúgio, Oração & Consolo</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#1B365D]">
          Uma Palavra para o seu Coração
        </h2>
        <p className="font-sans-ui text-xs sm:text-sm text-[#5E6D82] mt-1.5 leading-relaxed">
          Como está o seu íntimo diante de Deus hoje? Toque em um dos sentimentos abaixo e o Senhor conversará com você através das Escrituras.
        </p>
      </div>

      {/* Grade de Botões de Sentimentos / Momentos (Cores Acolhedoras, Nunca Azul Frio) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 mb-6">
        {MOMENT_CATEGORIES.map(cat => {
          const isSelected = selectedCategory.id === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                isSelected
                  ? 'border-[#C99700] bg-gradient-to-b from-[#FFF9E6] via-[#FFF3CC] to-[#FCEEC0] text-[#7A5B00] ring-4 ring-[#C99700]/25 shadow-md scale-102 font-bold'
                  : 'border-[#E8E2D5] bg-white text-[#333F4E] hover:border-[#C99700] hover:bg-[#FFFDF7] hover:shadow-xs font-semibold'
              }`}
            >
              <span className="text-3xl transition-transform group-hover:scale-110">{cat.emoji}</span>
              <span className="text-xs sm:text-sm font-sans-ui leading-tight">{cat.name}</span>
              {isSelected ? (
                <span className="text-[10px] font-bold text-[#C99700] bg-white px-2 py-0.5 rounded-full border border-[#C99700]/40 flex items-center gap-1">
                  ✓ Selecionado
                </span>
              ) : (
                <span className="text-[10px] text-[#8C6B00] opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver palavra →
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notificação Conversacional Suave */}
      {conversationalFeedback && (
        <div className="mb-6 p-3.5 rounded-2xl bg-[#FFF9E6] border border-[#E5B21A] text-xs font-sans-ui text-[#8C6B00] flex items-center justify-between shadow-2xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C99700] shrink-0" />
            <span>{conversationalFeedback}</span>
          </div>
          <button
            onClick={() => {
              messageSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-[11px] font-bold underline text-[#1B365D] flex items-center gap-1 shrink-0 ml-2"
          >
            <span>Ir para a mensagem</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SEÇÃO DA MENSAGEM: ONDE O SITE CONVERSA COM A PESSOA */}
      <div
        ref={messageSectionRef}
        className="bg-white rounded-3xl border-2 border-[#E8E2D5] p-6 sm:p-10 shadow-md relative overflow-hidden transition-all scroll-mt-24"
      >
        {/* Barra superior de identificação */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E8E2D5] gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9E6] border border-[#E5B21A]/50 flex items-center justify-center text-2xl shadow-2xs">
              {selectedCategory.emoji}
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#C99700] font-cinzel block">
                Palavra pastoral dedicada a quem diz:
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D]">
                "{selectedCategory.name}"
              </h3>
            </div>
          </div>

          {/* Ações: Áudio, Copiar */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleToggleSpeech}
              className={`px-3 py-2 text-xs font-sans-ui font-semibold rounded-xl border transition-all flex items-center gap-1.5 shadow-2xs ${
                isSpeaking
                  ? 'bg-[#1B365D] text-white border-[#1B365D]'
                  : 'bg-[#FFF9E6] border-[#E5B21A] text-[#8C6B00] hover:bg-[#FFEFC2]'
              }`}
              title="Ouvir esta palavra lida com voz calma"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C99700]" />}
              <span>{isSpeaking ? 'Pausar Áudio' : 'Ouvir Mensagem'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 text-xs font-sans-ui font-semibold rounded-xl border border-[#E8E2D5] bg-white hover:border-[#C99700] text-[#1B365D] hover:bg-[#FAF8F2] flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#C99700]" />}
              <span>{copied ? 'Copiado!' : 'Copiar Bênção'}</span>
            </button>
          </div>
        </div>

        {/* DIÁLOGO CONVERSACIONAL DIRETO COM A PESSOA */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFFDF7] to-[#FAF6EC] border border-[#E8E2D5] shadow-2xs">
          <p className="font-lora text-sm sm:text-base text-[#1C2430] leading-relaxed italic">
            "{selectedCategory.verse.conversationalIntro}"
          </p>
        </div>

        {/* TEXTO BÍBLICO SAGRADO EM DESTAQUE */}
        <div className="my-6 text-center max-w-3xl mx-auto p-4 sm:p-6 bg-[#FCFBF7] rounded-3xl border border-[#E8E2D5]">
          <div className="w-10 h-10 rounded-full bg-[#FFF9E6] text-[#C99700] flex items-center justify-center mx-auto mb-3 border border-[#E5B21A]/30">
            <Quote className="w-5 h-5 rotate-180" />
          </div>

          <blockquote className="font-garamond italic text-2xl sm:text-3xl text-[#1C2430] leading-snug sm:leading-relaxed">
            "{selectedCategory.verse.text}"
          </blockquote>

          <div className="mt-4 flex flex-col items-center justify-center">
            <cite className="font-cinzel not-italic text-lg sm:text-xl font-bold text-[#1B365D]">
              {selectedCategory.verse.reference}
            </cite>
            <button
              onClick={() => onOpenPassageInBible(selectedCategory.verse.bookId, selectedCategory.verse.chapter, selectedCategory.verse.verseNumber)}
              className="mt-2 text-xs font-sans-ui font-bold text-[#C99700] hover:text-[#997000] underline flex items-center gap-1 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ler este capítulo completo na Bíblia Sagrada →</span>
            </button>
          </div>
        </div>

        {/* REFLEXÃO E ORAÇÃO LITÚRGICA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E8E2D5]">
          {/* Reflexão Pastoral */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF7] border border-[#E8E2D5] flex flex-col justify-between">
            <div>
              <h4 className="font-cinzel text-xs uppercase font-bold text-[#1B365D] mb-2 flex items-center gap-2">
                <span>🌾</span>
                <span>O Que Deus Diz ao Teu Coração</span>
              </h4>
              <p className="font-lora text-sm sm:text-base text-[#333F4E] leading-relaxed">
                {selectedCategory.verse.message}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D5]/70 text-[11px] font-sans-ui text-[#5E6D82]">
              Deus não despreza o coração contrito e sincero.
            </div>
          </div>

          {/* Oração para Fazer Agora */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F5EE] border border-[#E8E2D5] flex flex-col justify-between">
            <div>
              <h4 className="font-cinzel text-xs uppercase font-bold text-[#1B365D] mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Oração Guiada para Este Instante</span>
              </h4>
              <p className="font-garamond italic text-base sm:text-lg text-[#1C2430] leading-relaxed">
                "{selectedCategory.verse.prayer}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E8E2D5]/70 flex items-center justify-between">
              <span className="text-[11px] font-sans-ui text-[#5E6D82]">Faça desta oração as suas palavras.</span>
              <span className="text-xs font-bold text-[#C99700]">Amém! 🙏</span>
            </div>
          </div>
        </div>

        {/* ESPAÇO CONVERSACIONAL: ENTREGAR UM PEDIDO PESSOAL A DEUS */}
        <div className="mt-8 p-6 rounded-2xl bg-[#FAF8F2] border border-[#E8E2D5]">
          <h4 className="font-cinzel text-sm font-bold text-[#1B365D] mb-1 flex items-center gap-2">
            <span>✍️</span>
            <span>Converse com Deus: Deixe o seu clamor aqui</span>
          </h4>
          <p className="font-sans-ui text-xs text-[#5E6D82] mb-4">
            Coloque em palavras o que está pesando no seu peito. Nenhum pedido é pequeno demais para o Senhor.
          </p>

          {!prayerSubmitted ? (
            <form onSubmit={handleSubmitPrayer} className="space-y-3">
              <textarea
                value={personalPrayer}
                onChange={e => setPersonalPrayer(e.target.value)}
                rows={3}
                placeholder={`Senhor Jesus, entrego diante de Ti o meu momento de ${selectedCategory.name.toLowerCase()}...`}
                className="w-full p-3.5 rounded-xl border border-[#E8E2D5] bg-white text-xs sm:text-sm font-sans-ui text-[#1C2430] placeholder-stone-400 focus:outline-none focus:border-[#C99700] shadow-2xs resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#5E6D82]">
                  Sua oração é pessoal e guardada no seu dispositivo.
                </span>
                <button
                  type="submit"
                  disabled={!personalPrayer.trim()}
                  className="px-5 py-2.5 text-xs font-sans-ui font-bold rounded-xl bg-[#C99700] hover:bg-[#B58600] disabled:bg-stone-300 text-white shadow-xs transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Entregar a Deus em Oração</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Oração Entregue nos Braços do Pai</span>
              </div>
              <p className="font-lora text-xs sm:text-sm italic">
                "{personalPrayer}"
              </p>
              <p className="text-xs font-sans-ui text-emerald-800 pt-1">
                🙏 <strong>Amém!</strong> Que a graça do Senhor Jesus visite a sua vida e traga descanso ao seu coração hoje.
              </p>
              <button
                onClick={() => setPrayerSubmitted(false)}
                className="text-xs text-emerald-700 underline font-semibold mt-1"
              >
                Escrever outra prece
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
