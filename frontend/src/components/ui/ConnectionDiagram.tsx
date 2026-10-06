interface ConnectionDiagramProps {
  variant?: 'wide' | 'stacked';
  className?: string;
}

const WIDE_LABEL = 'Diagrama de flujo: Cliente a la izquierda, nodo central SSCM, Proveedor a la derecha';
const STACKED_LABEL = 'Diagrama: Cliente arriba, SSCM en el centro, Proveedor abajo';

export function ConnectionDiagram({ variant = 'wide', className = '' }: ConnectionDiagramProps) {
  if (variant === 'stacked') {
    return (
      <svg
        viewBox="0 0 460 770"
        className={`mx-auto h-auto w-full max-w-[460px] ${className}`}
        role="img"
        aria-label={STACKED_LABEL}
      >
        <defs>
          <marker id="arrowhead-stacked" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
            <polygon points="0 0, 14 5, 0 10" fill="currentColor" />
          </marker>
        </defs>

        {/* Líneas conectoras verticales */}
        <line
          x1="230"
          y1="180"
          x2="230"
          y2="250"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 6"
          markerEnd="url(#arrowhead-stacked)"
          className="text-border"
        />
        <line
          x1="230"
          y1="490"
          x2="230"
          y2="560"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 6"
          markerEnd="url(#arrowhead-stacked)"
          className="text-border"
        />

        {/* Tarjeta Cliente */}
        <rect x="90" y="50" width="280" height="130" rx="12" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" className="text-border shadow-sm" />
        <text x="230" y="95" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="600" className="text-heading">
          Cliente
        </text>
        <text x="230" y="135" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="500" className="text-muted">
          Define la necesidad inicial
        </text>

        {/* Tarjeta Central SSCM */}
        <rect x="70" y="250" width="320" height="240" rx="16" fill="var(--color-brand)" stroke="none" />
        <text x="230" y="305" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontSize="26" fontWeight="700" letterSpacing="1">
          SSCM
        </text>
        <text x="230" y="345" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="500">
          Orquestador de abastecimiento
        </text>
        <line x1="110" y1="375" x2="350" y2="375" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="230" y="420" textAnchor="middle" fill="#60A5FA" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.5">
          Diagnóstica · Analiza · Selecciona · Conecta
        </text>

        {/* Tarjeta Proveedor */}
        <rect x="90" y="560" width="280" height="130" rx="12" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" className="text-border shadow-sm" />
        <text x="230" y="605" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="600" className="text-heading">
          Proveedor Global
        </text>
        <text x="230" y="645" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="500" className="text-muted">
          Entrega la solución final
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1400 320"
      className={`h-auto w-full max-w-none ${className}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={WIDE_LABEL}
    >
      <defs>
        <marker id="arrowhead-wide" markerWidth="14" markerHeight="10" refX="12" refY="5" orient="auto">
          <polygon points="0 0, 14 5, 0 10" fill="currentColor" />
        </marker>
        <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.04" />
        </filter>
      </defs>
      
      {/* Línea conector Izquierda -> Centro */}
      <line
        x1="390"
        y1="160"
        x2="480"
        y2="160"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="8 6"
        markerEnd="url(#arrowhead-wide)"
        className="text-border"
      />
      
      {/* Línea conector Centro -> Derecha */}
      <line
        x1="920"
        y1="160"
        x2="1010"
        y2="160"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="8 6"
        markerEnd="url(#arrowhead-wide)"
        className="text-border"
      />
      
      {/* Tarjeta Cliente (Izquierda) */}
      <g filter="url(#subtle-shadow)">
        <rect x="90" y="90" width="300" height="140" rx="12" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" className="text-border" />
      </g>
      <text x="240" y="142" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="600" className="text-heading">
        Cliente
      </text>
      <text x="240" y="182" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="500" className="text-muted">
        Define la necesidad comercial
      </text>

      {/* Tarjeta Central SSCM (Ancha y Destacada) */}
      <g filter="url(#subtle-shadow)">
        <rect x="480" y="60" width="440" height="200" rx="16" fill="var(--color-brand)" stroke="none" />
      </g>
      <text x="700" y="125" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontSize="30" fontWeight="700" letterSpacing="1">
        SSCM
      </text>
      <text x="700" y="160" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="500">
        Smart Supply Chain Management
      </text>
      <line x1="530" y1="185" x2="870" y2="185" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="700" y="225" textAnchor="middle" fill="#60A5FA" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" letterSpacing="0.5">
        Diagnostica · Analiza · Selecciona · Conecta
      </text>

      {/* Tarjeta Proveedor (Derecha) */}
      <g filter="url(#subtle-shadow)">
        <rect x="1010" y="90" width="300" height="140" rx="12" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" className="text-border" />
      </g>
      <text x="1160" y="142" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="600" className="text-heading">
        Proveedor Global
      </text>
      <text x="1160" y="182" textAnchor="middle" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="500" className="text-muted">
        Entrega la solución óptima
      </text>
    </svg>
  );
}