import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Share2, Copy, Check, Download, Bookmark, Heart, Sun, BookOpen, Quote, ChevronRight } from 'lucide-react';
import { DailyVerse } from '../types/bible';
import { getDailyVerseForDate } from '../data/daily-verse-engine';
import { CristoGuiaLogo } from './CristoGuiaLogo';

interface DailyVerseHeroProps {
  onOpenPassageInBible: (bookId: string, chapter: number, verse: number) => void;
  onSaveToBookmarks: (verse: DailyVerse) => void;
  isSaved?: boolean;
  onOpenMomentsTab?: () => void;
}

export const DailyVerseHero: React.FC<DailyVerseHeroProps> = ({
  onOpenPassageInBible,
  onSaveToBookmarks,
  isSaved = false,
  onOpenMomentsTab
}) => {
  const [dailyVerse, setDailyVerse] = useState<DailyVerse>(getDailyVerseForDate());
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardFormat, setCardFormat] = useState<'square' | 'story'>('square');
  const [activeTabDevotional, setActiveTabDevotional] = useState<'exegese' | 'pratica' | 'oracao'>('pratica');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealedSectionRef = useRef<HTMLDivElement | null>(null);

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => {
      revealedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  useEffect(() => {
    setDailyVerse(getDailyVerseForDate());
  }, []);

  // Leitura por voz nativa serena
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
    const spokenText = `${dailyVerse.reference}. ${dailyVerse.text}. Aplicação para hoje: ${dailyVerse.practicalApplication}. Oração: ${dailyVerse.prayer}`;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopyText = () => {
    const formatted = `"${dailyVerse.text}"\n— ${dailyVerse.reference} (${dailyVerse.translation})\n\nQue Deus abençoe o seu dia! · Portal Cristo Guia (cristoguia.com.br)`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Gerador de Cartão Visual (Canvas 1:1 e 9:16)
  useEffect(() => {
    if (!cardModalOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Logo Oficial no Cartão
    const logoImg = new Image();
    logoImg.src = '/logo.svg';
    const drawContent = () => {
      const isStory = cardFormat === 'story';
      const width = 1080;
      const height = isStory ? 1920 : 1080;

      canvas.width = width;
      canvas.height = height;

      // Fundo caloroso em degradê dourado/creme celestial
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#FFFDF7');
      grad.addColorStop(0.7, '#FDF6E3');
      grad.addColorStop(1, '#F7E8C3');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Borda dupla em ouro nobre
      ctx.strokeStyle = '#C99700';
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.strokeStyle = 'rgba(46, 31, 24, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(54, 54, width - 108, height - 108);

      // Desenha o emblema da logo oficial
      const logoSize = isStory ? 130 : 100;
      const logoY = isStory ? 150 : 80;
      try {
        ctx.drawImage(logoImg, width / 2 - logoSize / 2, logoY, logoSize, logoSize);
      } catch {
        // Fallback caso a imagem ainda esteja carregando
      }

      // Logotipo CRISTO GUIA
      const textBrandY = logoY + logoSize + 36;
      ctx.fillStyle = '#1B365D';
      ctx.font = '900 38px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('CRISTO GUIA', width / 2, textBrandY);

      ctx.fillStyle = '#C99700';
      ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('VERSÍCULO DO DIA · SAGRADAS ESCRITURAS', width / 2, textBrandY + 32);

      // Linha divisória
      ctx.strokeStyle = 'rgba(201, 151, 0, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 140, textBrandY + 60);
      ctx.lineTo(width / 2 + 140, textBrandY + 60);
      ctx.stroke();

      // Texto do Versículo
      ctx.fillStyle = '#1C2430';
      ctx.font = isStory ? 'italic 52px "Cormorant Garamond", serif' : 'italic 46px "Cormorant Garamond", serif';
      ctx.textAlign = 'center';

      const words = `"${dailyVerse.text}"`.split(' ');
      const maxWidth = width - 240;
      const lineHeight = isStory ? 74 : 64;
      let line = '';
      const lines: string[] = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      const totalTextHeight = lines.length * lineHeight;
      let startY = isStory ? (height / 2) + 20 : (height / 2) + 60;

      for (let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k].trim(), width / 2, startY + (k * lineHeight));
      }

      // Referência em destaque
      const refY = startY + totalTextHeight + 45;
      ctx.fillStyle = '#2E1F18';
      ctx.font = 'bold 36px "Cinzel", serif';
      ctx.letterSpacing = '2px';
      ctx.fillText(dailyVerse.reference, width / 2, refY);

      ctx.fillStyle = '#5E6D82';
      ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Sagradas Escrituras · ${dailyVerse.translation}`, width / 2, refY + 38);

      // Rodapé
      ctx.fillStyle = '#2E1F18';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('cristoguia.com.br · Luz para o seu caminho', width / 2, height - 90);
    };

    if (logoImg.complete) {
      drawContent();
    } else {
      logoImg.onload = drawContent;
      drawContent(); // Renderiza inicialmente
    }
  }, [cardModalOpen, cardFormat, dailyVerse]);

  const handleDownloadCard = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `cristo-guia-${dailyVerse.reference.toLowerCase().replace(/[\s:]+/g, '-')}-${cardFormat}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <section className="relative w-full py-8 sm:py-14 px-4 sm:px-8 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EC] to-[#F5EEDC] border-b border-[#E8E2D5]">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho Acolhedor e Limpo */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF9E6] border border-[#E5B21A]/50 text-[#8C6B00] text-xs font-bold mb-2 shadow-xs">
            <Sun className="w-4 h-4 text-[#C99700]" />
            <span>Palavra de Hoje para a sua Vida</span>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-[#1B365D]">
            Alimento Espiritual Diário
          </h1>
          <p className="font-sans-ui text-xs sm:text-sm text-[#5E6D82] mt-0.5">
            Tema: <strong className="text-[#1B365D] font-bold">{dailyVerse.theme}</strong>
          </p>
        </div>

        {/* ESTADO 1: ANTES DE CLICAR (Convite para Ler o Versículo do Dia) */}
        {!isRevealed ? (
          <div className="bg-white rounded-3xl border-2 border-[#E8E2D5] p-8 sm:p-12 text-center shadow-md relative overflow-hidden transition-all">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C99700] via-[#E5B21A] to-[#1B365D]" />

            <div className="w-16 h-16 rounded-full bg-[#FFF9E6] border-2 border-[#E5B21A] flex items-center justify-center mx-auto mb-5 text-[#C99700] shadow-sm">
              <BookOpen className="w-8 h-8" />
            </div>

            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D] mb-2">
              Que a paz de Cristo esteja com você!
            </h2>
            <p className="font-sans-ui text-sm text-[#5E6D82] max-w-md mx-auto mb-8 leading-relaxed">
              O Senhor tem uma mensagem edificante para abençoar as suas decisões, renovar sua fé e trazer descanso ao seu coração hoje.
            </p>

            <button
              onClick={handleReveal}
              className="px-8 py-4 text-sm sm:text-base font-sans-ui font-black rounded-2xl bg-gradient-to-r from-[#C99700] to-[#E5B21A] hover:from-[#B58600] hover:to-[#D4A017] text-white shadow-lg hover:shadow-xl hover:scale-102 transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-white" />
              <span>Ler meu versículo do dia</span>
            </button>
          </div>
        ) : (
          /* ESTADO 2: VERSÍCULO REVELADO */
          <div
            ref={revealedSectionRef}
            className="bg-white rounded-3xl border-2 border-[#E8E2D5] p-6 sm:p-12 shadow-sm relative overflow-hidden animate-fadeIn scroll-mt-24"
          >
            {/* Faixa decorativa em ouro suave */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C99700] via-[#E5B21A] to-[#1B365D]" />

            <div className="text-center">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E2D5]/60">
                <span className="text-xs font-sans-ui font-bold text-[#C99700] uppercase tracking-wider flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" />
                  Sua Palavra de Hoje Revelada
                </span>
                <button
                  onClick={() => setIsRevealed(false)}
                  className="text-xs font-sans-ui text-[#5E6D82] hover:text-[#1B365D] underline font-medium"
                >
                  Recolher
                </button>
              </div>

              <div className="w-12 h-12 rounded-full bg-[#FFF9E6] text-[#C99700] flex items-center justify-center mx-auto mb-4 border border-[#E5B21A]/30">
                <Quote className="w-6 h-6 rotate-180" />
              </div>

              <blockquote className="font-garamond italic text-2xl sm:text-4xl text-[#1C2430] leading-snug sm:leading-relaxed max-w-3xl mx-auto break-words">
                "{dailyVerse.text}"
              </blockquote>

              <div className="mt-6 flex flex-col items-center justify-center">
                <cite className="font-cinzel not-italic text-xl sm:text-2xl font-bold tracking-wider text-[#1B365D]">
                  {dailyVerse.reference}
                </cite>
                <span className="text-xs font-sans-ui text-[#5E6D82] mt-1 font-medium">
                  {dailyVerse.translation}
                </span>
              </div>

              {/* Barra de Ações Rápidas: Áudio, Compartilhar, Copiar, Ler */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-sans-ui">
                {/* Leitura em Voz Alta */}
                <button
                  onClick={handleToggleSpeech}
                  className={`px-4 py-2.5 rounded-xl font-semibold border transition-all flex items-center gap-2 shadow-xs ${
                    isSpeaking
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-[#FFF9E6] border-[#E5B21A] text-[#8C6B00] hover:bg-[#FFEFC2]'
                  }`}
                  title="Ouvir leitura deste versículo"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C99700]" />}
                  <span>{isSpeaking ? 'Pausar Voz' : 'Ouvir Versículo'}</span>
                </button>

                {/* Gerador de Cartão */}
                <button
                  onClick={() => setCardModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl font-semibold bg-white border border-[#E8E2D5] hover:border-[#C99700] text-[#1B365D] hover:bg-[#FAF8F2] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Share2 className="w-4 h-4 text-[#C99700]" />
                  <span>Criar Imagem para Compartilhar</span>
                </button>

                {/* Copiar */}
                <button
                  onClick={handleCopyText}
                  className="px-4 py-2.5 rounded-xl font-semibold bg-white border border-[#E8E2D5] hover:border-[#C99700] text-[#1B365D] hover:bg-[#FAF8F2] transition-colors flex items-center gap-2 shadow-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#C99700]" />}
                  <span>{copied ? 'Copiado com Sucesso!' : 'Copiar'}</span>
                </button>

                {/* Guardar no Caderno */}
                <button
                  onClick={() => onSaveToBookmarks(dailyVerse)}
                  className={`px-4 py-2.5 rounded-xl font-semibold border transition-colors flex items-center gap-2 shadow-xs ${
                    isSaved
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-white border-[#E8E2D5] hover:border-[#C99700] text-[#1B365D] hover:bg-[#FAF8F2]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-700 fill-amber-700' : 'text-[#C99700]'}`} />
                  <span>{isSaved ? 'Guardado no Caderno' : 'Guardar'}</span>
                </button>

                {/* Ler na Bíblia */}
                <button
                  onClick={() => onOpenPassageInBible('sl', dailyVerse.chapter, dailyVerse.verse)}
                  className="px-4 py-2.5 rounded-xl font-semibold bg-white border border-[#E8E2D5] hover:border-[#C99700] text-[#1B365D] hover:bg-[#FAF8F2] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-[#1B365D]" />
                  <span>Ler na Bíblia</span>
                </button>
              </div>
            </div>

            {/* Devocional Prático, Contexto e Oração */}
            <div className="mt-10 pt-8 border-t border-[#E8E2D5]">
              <div className="flex items-center justify-center mb-6">
                <div className="inline-flex p-1 rounded-xl bg-[#F8F5EE] border border-[#E8E2D5]">
                  <button
                    onClick={() => setActiveTabDevotional('pratica')}
                    className={`px-4 py-2 text-xs font-sans-ui font-bold rounded-lg transition-all ${
                      activeTabDevotional === 'pratica'
                        ? 'bg-white text-[#1B365D] shadow-xs'
                        : 'text-[#5E6D82] hover:text-[#1B365D]'
                    }`}
                  >
                    Aplicação Prática no Dia a Dia
                  </button>
                  <button
                    onClick={() => setActiveTabDevotional('oracao')}
                    className={`px-4 py-2 text-xs font-sans-ui font-bold rounded-lg transition-all ${
                      activeTabDevotional === 'oracao'
                        ? 'bg-white text-[#1B365D] shadow-xs'
                        : 'text-[#5E6D82] hover:text-[#1B365D]'
                    }`}
                  >
                    Oração para Hoje
                  </button>
                  <button
                    onClick={() => setActiveTabDevotional('exegese')}
                    className={`px-4 py-2 text-xs font-sans-ui font-bold rounded-lg transition-all ${
                      activeTabDevotional === 'exegese'
                        ? 'bg-white text-[#1B365D] shadow-xs'
                        : 'text-[#5E6D82] hover:text-[#1B365D]'
                    }`}
                  >
                    Entenda o Contexto Bíblico
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#FCFBF8] border border-[#E8E2D5] max-w-2xl mx-auto">
                {activeTabDevotional === 'pratica' && (
                  <div className="space-y-3">
                    <h4 className="font-cinzel text-sm font-bold text-[#1B365D] flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#C99700]" />
                      <span>Como viver isso hoje:</span>
                    </h4>
                    <p className="font-lora text-base text-[#333F4E] leading-relaxed break-words">
                      {dailyVerse.practicalApplication}
                    </p>
                  </div>
                )}

                {activeTabDevotional === 'oracao' && (
                  <div className="space-y-3 text-center">
                    <h4 className="font-cinzel text-sm font-bold text-[#1B365D] flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Faça esta oração em silêncio:</span>
                    </h4>
                    <p className="font-garamond italic text-xl text-[#1B365D] leading-relaxed break-words">
                      "{dailyVerse.prayer}"
                    </p>
                  </div>
                )}

                {activeTabDevotional === 'exegese' && (
                  <div className="space-y-3">
                    <h4 className="font-cinzel text-sm font-bold text-[#1B365D]">
                      Cenário Histórico da Passagem:
                    </h4>
                    <p className="font-lora text-sm sm:text-base text-[#333F4E] leading-relaxed break-words">
                      {dailyVerse.theologicalContext}
                    </p>
                    <p className="font-lora text-xs sm:text-sm text-[#5E6D82] pt-2 border-t border-[#E8E2D5] break-words">
                      <strong>Estudo das Palavras:</strong> {dailyVerse.exegesis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Convite Caloroso para os Versículos por Sentimento */}
        {onOpenMomentsTab && (
          <div className="mt-8 p-5 rounded-2xl bg-white border border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-2xl">🕊️</span>
              <div>
                <h3 className="font-sans-ui text-sm font-bold text-[#1B365D]">
                  Precisando de uma palavra específica para o seu momento?
                </h3>
                <p className="text-xs text-[#5E6D82]">
                  Encontre conforto em versículos selecionados para ansiedade, paz, força, gratidão e família.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenMomentsTab}
              className="px-4 py-2 text-xs font-sans-ui font-bold rounded-xl bg-[#1B365D] text-white hover:bg-[#254A80] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Ver Palavras de Conforto</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* MODAL: CRIADOR DE CARTÃO PARA INSTAGRAM STORIES E WHATSAPP */}
      {cardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#C99700] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#1B365D]">
                  Compartilhar a Palavra
                </h3>
                <p className="text-xs font-sans-ui text-[#5E6D82]">
                  Gere uma imagem bonita com o versículo para enviar no WhatsApp ou postar no Instagram
                </p>
              </div>
              <button
                onClick={() => setCardModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Alternador de Formato */}
            <div className="flex items-center justify-center gap-2 my-4">
              <button
                onClick={() => setCardFormat('square')}
                className={`px-4 py-2 text-xs font-sans-ui font-bold rounded-lg border ${
                  cardFormat === 'square'
                    ? 'bg-[#1B365D] text-white border-[#1B365D]'
                    : 'border-[#E8E2D5] text-[#5E6D82]'
                }`}
              >
                WhatsApp / Feed (1:1 Quadrado)
              </button>
              <button
                onClick={() => setCardFormat('story')}
                className={`px-4 py-2 text-xs font-sans-ui font-bold rounded-lg border ${
                  cardFormat === 'story'
                    ? 'bg-[#1B365D] text-white border-[#1B365D]'
                    : 'border-[#E8E2D5] text-[#5E6D82]'
                }`}
              >
                Instagram Stories (9:16 Vertical)
              </button>
            </div>

            {/* Canvas Preview */}
            <div className="flex items-center justify-center p-3 bg-stone-100 rounded-xl max-h-[380px] overflow-hidden">
              <canvas
                ref={canvasRef}
                className="max-h-[360px] max-w-full rounded-lg shadow-md object-contain"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setCardModalOpen(false)}
                className="px-4 py-2 text-xs font-sans-ui font-semibold border border-[#E8E2D5] rounded-xl text-[#5E6D82]"
              >
                Fechar
              </button>
              <button
                onClick={handleDownloadCard}
                className="px-5 py-2.5 text-xs font-sans-ui font-bold rounded-xl bg-[#C99700] hover:bg-[#A07800] text-white shadow-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Salvar Imagem no Celular/PC</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
