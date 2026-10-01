import React from 'react';

interface CristoGuiaLogoProps {
  className?: string;
  size?: number; // Tamanho em px (padrão: 36)
  variant?: 'icon-only' | 'horizontal' | 'full';
  color?: string; // Cor canônica da marca (padrão: #2A1A10)
}

/**
 * Logomarca Oficial do Portal Cristo Guia
 * Vetorização fiel da arte oficial enviada (SEM FUNDO.png):
 * - Cruz Pattée com braços alargados
 * - Halo com raios solares
 * - Cristo abençoando com a mão direita e manto drapeado
 * - Tipografia solene clássica: CRISTO GUIA
 */
export const CristoGuiaLogo: React.FC<CristoGuiaLogoProps> = ({
  className = '',
  size = 36,
  variant = 'icon-only',
  color = '#2A1A10'
}) => {
  // Emblema Sagrado (Cristo, Cruz e Halo)
  const emblemContent = (
    <>
      {/* 1. BRAÇOS DA CRUZ DE FUNDO */}
      <g fill={color}>
        {/* Braço Superior */}
        <path d="M174 44 C190 42 210 42 226 44 C225 68 218 90 200 96 C182 90 175 68 174 44 Z" />
        {/* Braço Esquerdo */}
        <path d="M120 98 C124 112 124 128 120 142 C142 139 162 134 168 120 C162 106 142 101 120 98 Z" />
        {/* Braço Direito */}
        <path d="M280 98 C276 112 276 128 280 142 C258 139 238 134 232 120 C238 106 258 101 280 98 Z" />
        {/* Base Inferior */}
        <path d="M174 228 H226 L230 248 H170 L174 228 Z" />
      </g>

      {/* 2. HALO / NIMBO CIRCULAR COM RAIOS */}
      <circle cx="200" cy="120" r="44" fill="#FFFFFF" stroke={color} strokeWidth="4" />
      <g stroke={color} strokeWidth="3" strokeLinecap="round">
        <line x1="200" y1="83" x2="200" y2="92" />
        <line x1="218" y1="86" x2="213" y2="95" />
        <line x1="233" y1="96" x2="225" y2="103" />
        <line x1="238" y1="111" x2="229" y2="114" />
        <line x1="239" y1="126" x2="230" y2="126" />
        <line x1="233" y1="140" x2="225" y2="136" />
        <line x1="182" y1="86" x2="187" y2="95" />
        <line x1="167" y1="96" x2="175" y2="103" />
        <line x1="162" y1="111" x2="171" y2="114" />
        <line x1="161" y1="126" x2="170" y2="126" />
        <line x1="167" y1="140" x2="175" y2="136" />
      </g>

      {/* 3. CRISTO - CABELO E SILHUETA */}
      <path
        d="M200 95 C182 95 174 106 174 125 C174 140 178 152 182 158 C184 150 185 142 186 136 C187 126 190 114 196 108 C198 106 202 106 204 108 C210 114 213 126 214 136 C215 142 216 150 218 158 C222 152 226 140 226 125 C226 106 218 95 200 95 Z"
        fill={color}
      />
      {/* Rosto Claro */}
      <path
        d="M186 116 C186 132 192 144 200 144 C208 144 214 132 214 116 C214 110 209 108 200 108 C191 108 186 110 186 116 Z"
        fill="#FFFFFF"
      />
      {/* Feições Serenas */}
      <path d="M190 118 C193 116 196 117 198 119" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M210 118 C207 116 204 117 202 119" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M191 122 C193 124 196 124 197 122" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M209 122 C207 124 204 124 203 122" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M200 119 V128 L197 130" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M192 133 C196 131 200 133 200 133 C200 133 204 131 208 133 C209 135 206 138 203 138 C200 138 200 136 200 136 C200 136 200 138 197 138 C194 138 191 135 192 133 Z"
        fill={color}
      />
      <path
        d="M190 136 C188 142 193 154 200 154 C207 154 212 142 210 136 C206 140 204 141 200 141 C196 141 194 140 190 136 Z"
        fill={color}
      />

      {/* 4. MÃO DIREITA ERGUIDA EM BÊNÇÃO */}
      <g fill="#FFFFFF" stroke={color} strokeWidth="2.2" strokeLinejoin="round">
        <path d="M168 135 C168 130 170 128 172 128 C174 128 175 130 175 135 V146 H173 Z" />
        <path d="M172 128 C172 124 174 122 176 122 C178 122 179 124 179 128 V145 H177 Z" />
        <path d="M176 122 C176 119 178 118 180 118 C182 118 183 119 183 124 V144 H181 Z" />
        <path d="M180 118 C180 116 182 115 184 115 C186 115 187 116 187 120 V143 H185 Z" />
        <path d="M187 132 C189 133 191 135 190 138 C189 141 187 143 185 145 L183 140 Z" />
        <path d="M168 136 C167 146 170 158 174 163 C178 161 185 152 186 144 C186 140 184 136 168 136 Z" fill="#FFFFFF" />
      </g>
      <path d="M170 154 C174 155 178 153 182 149" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* 5. TÚNICA E MANTO DIAGONAL */}
      <path
        d="M174 163 C178 158 186 154 193 153 C196 156 204 156 207 153 C214 154 222 158 226 163 L236 188 C225 193 210 196 200 196 C190 196 175 193 164 188 Z"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="2.8"
      />
      <path d="M225 163 C218 170 205 180 186 194" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M229 173 C222 180 210 188 193 198" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M233 183 C226 189 216 196 203 201" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M193 156 C195 162 205 162 207 156" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M236 188 L232 173 C230 166 228 160 225 158 L227 173 Z" fill={color} />
      <path d="M164 188 L168 173 C170 166 172 160 175 158 L173 173 Z" fill={color} />
      <path d="M174 200 C185 204 215 204 226 200 L226 228 H174 L174 200 Z" fill={color} />
    </>
  );

  // Variante 1: Ícone apenas (perfeito para cabeçalho e botões)
  if (variant === 'icon-only') {
    return (
      <svg
        viewBox="110 38 180 215"
        width={size}
        height={size}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 block ${className}`}
        aria-label="Emblema Cristo Guia"
      >
        {emblemContent}
      </svg>
    );
  }

  // Variante 2: Horizontal (Emblema + CRISTO GUIA ao lado)
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
        <svg
          viewBox="110 38 180 215"
          width={size}
          height={size}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            maxWidth: `${size}px`,
            maxHeight: `${size}px`
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 block"
          aria-hidden="true"
        >
          {emblemContent}
        </svg>

        <div className="flex flex-col leading-none">
          <span
            className="font-cinzel text-lg sm:text-xl font-black tracking-[0.08em]"
            style={{ color }}
          >
            CRISTO
          </span>
          <span
            className="font-cinzel text-lg sm:text-xl font-black tracking-[0.14em] -mt-0.5"
            style={{ color }}
          >
            GUIA
          </span>
        </div>
      </div>
    );
  }

  // Variante 3: Full (Arte Completa Exata como na imagem SEM FUNDO.png)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <svg
        viewBox="0 0 400 360"
        width={size}
        height={Math.round(size * 0.9)}
        style={{
          width: `${size}px`,
          height: `${Math.round(size * 0.9)}px`,
          maxWidth: `${size}px`
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 block"
        aria-label="Logomarca Cristo Guia Completa"
      >
        {emblemContent}
        {/* Tipografia Oficial */}
        <g fill={color} textAnchor="middle" fontWeight="900">
          <text
            x="200"
            y="292"
            fontFamily="'Cinzel', 'Georgia', serif"
            fontSize="44"
            letterSpacing="4"
          >
            CRISTO
          </text>
          <text
            x="200"
            y="342"
            fontFamily="'Cinzel', 'Georgia', serif"
            fontSize="44"
            letterSpacing="6"
          >
            GUIA
          </text>
        </g>
      </svg>
    </div>
  );
};
