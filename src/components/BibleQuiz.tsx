import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Download, BookOpen, ChevronRight, Star, Heart } from 'lucide-react';
import { THEOLOGICAL_QUIZ_QUESTIONS } from '../data/quiz-questions';

export const BibleQuiz: React.FC = () => {
  const getInitialState = () => {
    const estadoInicial = {
      selectedLevel: 'neofito',
      currentIndex: 0,
      selectedAnswer: null,
      score: 0,
      showFeedback: false,
      quizFinished: false,
      userName: 'Servo(a) de Deus'
    };
    if (typeof window === 'undefined') return estadoInicial;
    try {
      const salvo = localStorage.getItem('cristoguia_quiz_state');
      const parsed = salvo ? JSON.parse(salvo) : null;
      if (!parsed || typeof parsed !== 'object' || typeof parsed.currentIndex !== 'number') {
        throw new Error('Estado inválido');
      }
      return { ...estadoInicial, ...parsed };
    } catch (e) {
      localStorage.removeItem('cristoguia_quiz_state');
      return estadoInicial;
    }
  };

  const initialState = getInitialState();
  const [selectedLevel, setSelectedLevel] = useState<'neofito' | 'discipulo' | 'mestre'>(
    ['neofito', 'discipulo', 'mestre'].includes(initialState.selectedLevel) ? initialState.selectedLevel : 'neofito'
  );
  const [currentIndex, setCurrentIndex] = useState<number>(initialState.currentIndex || 0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(initialState.selectedAnswer);
  const [score, setScore] = useState<number>(initialState.score || 0);
  const [showFeedback, setShowFeedback] = useState<boolean>(!!initialState.showFeedback);
  const [quizFinished, setQuizFinished] = useState<boolean>(!!initialState.quizFinished);
  const [userName, setUserName] = useState<string>(initialState.userName || 'Servo(a) de Deus');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cristoguia_quiz_state', JSON.stringify({
        selectedLevel, currentIndex, selectedAnswer, score, showFeedback, quizFinished, userName
      }));
    }
  }, [selectedLevel, currentIndex, selectedAnswer, score, showFeedback, quizFinished, userName]);

  const certificateCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const questions = THEOLOGICAL_QUIZ_QUESTIONS.filter(q => q.level === selectedLevel);
  const currentQ = questions[currentIndex];

  if (!quizFinished && (!questions || questions.length === 0 || !currentQ)) {
    return <div className="p-10 text-center font-sans-ui text-[#5E6D82] font-bold bg-white rounded-3xl border-2 border-[#E8E2D5]">Carregando desafios ou reiniciando nível...</div>;
  }

  const handleSelectOption = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = (level?: 'neofito' | 'discipulo' | 'mestre') => {
    if (level) setSelectedLevel(level);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
    setCertificateOpen(false);
  };

  // Certificado Dourado Lindo e Animado
  useEffect(() => {
    if (!certificateOpen || !certificateCanvasRef.current) return;
    const canvas = certificateCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const logoImg = new Image();
    logoImg.src = '/logo.svg';

    const drawCertificate = () => {
      const width = 1200;
      const height = 800;
      canvas.width = width;
      canvas.height = height;

      // Fundo Lindo em Creme Dourado
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(0.4, '#FFFDF7');
      bgGrad.addColorStop(1, '#FBF1DA');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Borda dupla em ouro nobre
      ctx.strokeStyle = '#C99700';
      ctx.lineWidth = 8;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      ctx.strokeStyle = '#2E1F18';
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, width - 96, height - 96);

      // Emblema Oficial Cristo Guia
      const logoSize = 100;
      try {
        ctx.drawImage(logoImg, width / 2 - logoSize / 2, 65, logoSize, logoSize);
      } catch {
        // Fallback
      }

      // Título do Certificado
      ctx.fillStyle = '#C99700';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '5px';
      ctx.fillText('PORTAL CRISTO GUIA · DESAFIO BÍBLICO DA FÉ', width / 2, 185);

      ctx.fillStyle = '#1B365D';
      ctx.font = 'bold 40px "Cinzel", serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('CERTIFICADO DE CONHECIMENTO BÍBLICO', width / 2, 235);

      // Divisória dourada
      ctx.strokeStyle = '#C99700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 180, 265);
      ctx.lineTo(width / 2 + 180, 265);
      ctx.stroke();

    // Texto de outorga
    ctx.fillStyle = '#5E6D82';
    ctx.font = 'italic 24px "Lora", serif';
    ctx.fillText('Certificamos com júbilo que', width / 2, 315);

    ctx.fillStyle = '#C99700';
    ctx.font = 'bold 38px "Cinzel", serif';
    ctx.fillText(userName.toUpperCase(), width / 2, 370);

    const levelTitle = selectedLevel === 'neofito' ? 'Nível Iniciante da Fé' : selectedLevel === 'discipulo' ? 'Nível Discípulo da Palavra' : 'Nível Mestre das Escrituras';
    ctx.fillStyle = '#333F4E';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`concluiu com êxito o Desafio Bíblico no ${levelTitle},`, width / 2, 425);
    ctx.fillText(`demonstrando amor, dedicação e zelo pelo estudo da Palavra de Deus.`, width / 2, 460);

    // Pontuação
    const accuracy = Math.round((score / questions.length) * 100);
    ctx.fillStyle = '#1B365D';
    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Pontuação: ${score} de ${questions.length} Questões (${accuracy}% de Aproveitamento)`, width / 2, 530);

    // Versículo
    ctx.fillStyle = '#5E6D82';
    ctx.font = 'italic 18px "Cormorant Garamond", serif';
    ctx.fillText('"Conheçamos e prossigamos em conhecer ao SENHOR." — Oseias 6:3', width / 2, 600);

    // Assinaturas e data
    const dateFormatted = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    ctx.fillStyle = '#1B365D';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Emitido em ${dateFormatted} · Portal Cristo Guia`, width / 2, 700);
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('cristoguia.com.br', width / 2, 725);
    };

    if (logoImg.complete) {
      drawCertificate();
    } else {
      logoImg.onload = drawCertificate;
      drawCertificate();
    }
  }, [certificateOpen, userName, score, questions.length, selectedLevel]);

  const handleDownloadCertificate = () => {
    if (!certificateCanvasRef.current) return;
    const link = document.createElement('a');
    link.download = `certificado-biblico-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = certificateCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  const levelLabels = {
    neofito: 'Iniciante (Histórias Bíblicas)',
    discipulo: 'Intermediário (Doutrina & Aliança)',
    mestre: 'Avançado (Teologia & Profecias)'
  };

  return (
    <div className="w-full py-8 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Cabeçalho do Quiz */}
      <div className="bg-white border-2 border-[#E8E2D5] rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9E6] border border-[#E5B21A]/50 text-[#8C6B00] text-xs font-bold mb-2">
              <Star className="w-4 h-4 text-[#C99700]" />
              <span>Desafio Bíblico da Fé</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1B365D]">
              Quiz de Conhecimento Bíblico
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-[#5E6D82] mt-0.5">
              Aprenda a Palavra de Deus de forma divertida, com explicações e versículos a cada resposta!
            </p>
          </div>

          {/* Níveis */}
          <div className="inline-flex rounded-xl border border-[#E8E2D5] bg-[#FAF8F2] p-1 text-xs font-sans-ui">
            {(['neofito', 'discipulo', 'mestre'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => handleRestart(lvl)}
                className={`px-3.5 py-1.5 rounded-lg font-bold capitalize transition-all ${
                  selectedLevel === lvl
                    ? 'bg-[#1B365D] text-white shadow-xs'
                    : 'text-[#5E6D82] hover:text-[#1B365D]'
                }`}
              >
                {lvl === 'neofito' ? 'Iniciante' : lvl === 'discipulo' ? 'Intermediário' : 'Avançado'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!quizFinished ? (
        /* ÁREA DA QUESTÃO ATIVA */
        <div className="bg-white border-2 border-[#E8E2D5] rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Progresso */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] mb-6 text-xs font-sans-ui">
            <span className="font-bold text-[#C99700]">
              {levelLabels[selectedLevel]} · Pergunta {currentIndex + 1} de {questions.length}
            </span>
            <span className="font-bold text-[#1B365D]">
              Acertos: <strong>{score}</strong>
            </span>
          </div>

          {/* Pergunta */}
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D] leading-snug mb-8">
            {currentQ.question}
          </h3>

          {/* Opções */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              let optStyle = 'border-[#E8E2D5] bg-[#FAF8F2] text-[#1C2430] hover:border-[#C99700] hover:bg-white';

              if (showFeedback) {
                if (idx === currentQ.correctIndex) {
                  optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (idx === selectedAnswer) {
                  optStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                } else {
                  optStyle = 'opacity-40 border-[#E8E2D5] bg-[#FAF8F2]';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-sm sm:text-base font-sans-ui flex items-center justify-between gap-4 ${optStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {showFeedback && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {showFeedback && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Bíblico Acolhedor */}
          {showFeedback && (
            <div className={`p-6 rounded-2xl border-2 space-y-3 animate-fadeIn ${
              selectedAnswer === currentQ.correctIndex
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-amber-50/70 border-amber-300'
            }`}>
              <div className="flex items-center gap-2 text-sm font-bold">
                {selectedAnswer === currentQ.correctIndex ? (
                  <span className="text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Glória a Deus! Resposta certa!
                  </span>
                ) : (
                  <span className="text-amber-900 flex items-center gap-1.5">
                    <BookOpen className="w-5 h-5 text-amber-700" />
                    Não se preocupe, veja a resposta certa e o que a Bíblia ensina:
                  </span>
                )}
              </div>

              <p className="font-lora text-sm sm:text-base text-[#333F4E] leading-relaxed">
                {currentQ.theologicalRationale}
              </p>

              <div className="pt-2 border-t border-black/10">
                <span className="font-bold text-xs text-[#1B365D] block mb-1">
                  📖 O que diz a Palavra ({currentQ.passageRef}):
                </span>
                <p className="font-garamond italic text-sm text-[#1C2430]">
                  {currentQ.biblicalProof}
                </p>
              </div>

              <div className="text-right pt-3">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 text-xs sm:text-sm font-sans-ui font-bold rounded-xl bg-[#1B365D] hover:bg-[#254A80] text-white flex items-center gap-2 ml-auto shadow-xs"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Meu Certificado'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* TELA FINAL DE CONCLUSÃO */
        <div className="bg-white border-2 border-[#E8E2D5] rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FFF9E6] border border-[#E5B21A] text-[#C99700] flex items-center justify-center mx-auto">
            <Award className="w-9 h-9" />
          </div>

          <h3 className="font-cinzel text-3xl font-bold text-[#1B365D]">
            Parabéns, você completou o Desafio!
          </h3>

          <p className="font-sans-ui text-base text-[#5E6D82] max-w-lg mx-auto">
            Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> perguntas no nível {levelLabels[selectedLevel]}.
          </p>

          <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E8E2D5] max-w-md mx-auto space-y-3">
            <label className="text-xs font-sans-ui font-bold text-[#1B365D] block text-left">
              Como você quer que seu nome apareça no Certificado?
            </label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Digite seu nome completo..."
              className="w-full text-xs font-sans-ui p-3 rounded-xl border border-[#E8E2D5] bg-white text-[#1B365D] focus:outline-none focus:border-[#C99700]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleRestart()}
              className="px-5 py-2.5 text-xs font-sans-ui font-bold border border-[#E8E2D5] rounded-xl text-[#5E6D82] hover:bg-[#FAF8F2] flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </button>

            <button
              onClick={() => setCertificateOpen(true)}
              className="px-6 py-2.5 text-xs font-sans-ui font-bold rounded-xl bg-[#C99700] hover:bg-[#A07800] text-white shadow-xs flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Gerar Meu Certificado Bíblico</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL DO CERTIFICADO */}
      {certificateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#C99700] rounded-3xl p-6 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <h3 className="font-cinzel text-lg font-bold text-[#1B365D]">
                Seu Certificado de Conhecimento Bíblico
              </h3>
              <button
                onClick={() => setCertificateOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="my-4 flex items-center justify-center bg-stone-100 p-2 rounded-xl max-h-[380px] overflow-hidden">
              <canvas
                ref={certificateCanvasRef}
                className="max-h-[360px] max-w-full rounded-lg object-contain shadow-md"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCertificateOpen(false)}
                className="px-4 py-2 text-xs font-sans-ui font-semibold border border-[#E8E2D5] rounded-xl text-[#5E6D82]"
              >
                Fechar
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="px-5 py-2.5 text-xs font-sans-ui font-bold rounded-xl bg-[#C99700] hover:bg-[#A07800] text-white flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Imagem do Certificado</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
