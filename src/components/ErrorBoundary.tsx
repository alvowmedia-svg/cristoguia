import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro Capturado no Componente:', error, errorInfo);
    try {
      localStorage.removeItem('cristoguia_quiz_state');
      localStorage.removeItem('cristoguia_wordsearch_state');
    } catch(e) {}
  }

  public handleReset = () => {
    try {
      localStorage.removeItem('cristoguia_quiz_state');
      localStorage.removeItem('cristoguia_wordsearch_state');
    } catch(e) {}
    this.setState({ hasError: false });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white border-2 border-rose-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1B365D] mb-3">
            Ops! Houve um pequeno imprevisto.
          </h3>
          <p className="font-sans-ui text-sm text-[#5E6D82] mb-8 leading-relaxed max-w-md mx-auto">
            Encontramos um erro ao carregar este jogo (provavelmente um dado salvo corrompido no seu navegador). Clique abaixo para reiniciar e continuar brincando.
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 text-sm font-sans-ui font-bold rounded-xl bg-[#1B365D] hover:bg-[#254A80] text-white shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar Jogo</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
