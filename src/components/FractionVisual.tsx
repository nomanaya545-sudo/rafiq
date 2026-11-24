import type { KeyboardEvent } from 'react';

export type FractionShape = 'circle' | 'bar' | 'grid';

interface FractionVisualProps {
  shape: FractionShape;
  totalParts: number;
  shadedSet: boolean[];
  interactive?: boolean;
  onTogglePart?: (index: number) => void;
  size?: 'md' | 'lg';
}

function getGridDimensions(total: number): { cols: number; rows: number } {
  if (total === 12) return { cols: 4, rows: 3 };
  if (total === 10) return { cols: 5, rows: 2 };
  if (total === 9) return { cols: 3, rows: 3 };
  if (total === 8) return { cols: 4, rows: 2 };
  if (total === 6) return { cols: 3, rows: 2 };
  if (total === 4) return { cols: 2, rows: 2 };
  return { cols: total, rows: 1 };
}

export function FractionVisual({
  shape,
  totalParts,
  shadedSet,
  interactive = false,
  onTogglePart,
  size = 'lg',
}: FractionVisualProps) {
  const handleKeyDown = (e: KeyboardEvent<SVGElement>, index: number) => {
    if (!interactive || !onTogglePart) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTogglePart(index);
    }
  };

  if (shape === 'circle') {
    const cx = 130;
    const cy = 130;
    const r = 108;
    const maxWidthClass = size === 'lg' ? 'max-w-[270px] sm:max-w-[300px]' : 'max-w-[220px]';

    return (
      <svg
        viewBox="0 0 260 260"
        className={`w-full ${maxWidthClass} h-auto mx-auto select-none`}
        role="img"
        aria-label={`دائرة مقسمة إلى ${totalParts} أجزاء متساوية`}
      >
        {Array.from({ length: totalParts }).map((_, idx) => {
          const isShaded = Boolean(shadedSet[idx]);
          const startAngle = -Math.PI / 2 + (idx * 2 * Math.PI) / totalParts;
          const endAngle = -Math.PI / 2 + ((idx + 1) * 2 * Math.PI) / totalParts;
          const x1 = cx + r * Math.cos(startAngle);
          const y1 = cy + r * Math.sin(startAngle);
          const x2 = cx + r * Math.cos(endAngle);
          const y2 = cy + r * Math.sin(endAngle);
          const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

          const pathData =
            totalParts === 1
              ? ''
              : `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

          const fill = isShaded ? '#0D9488' : '#E2E8F0';
          const hoverClass = interactive
            ? isShaded
              ? 'hover:fill-teal-700 cursor-pointer'
              : 'hover:fill-slate-300 cursor-pointer'
            : '';

          return totalParts === 1 ? (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={r}
              fill={fill}
              stroke="#FFFFFF"
              strokeWidth={3}
              onClick={() => interactive && onTogglePart?.(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              tabIndex={interactive ? 0 : undefined}
              role={interactive ? 'button' : undefined}
              aria-pressed={interactive ? isShaded : undefined}
              aria-label={`الجزء ${idx + 1}: ${isShaded ? 'مظلل' : 'غير مظلل'}`}
              className={`transition-colors duration-150 focus:outline-none ${hoverClass}`}
            />
          ) : (
            <path
              key={idx}
              d={pathData}
              fill={fill}
              stroke="#FFFFFF"
              strokeWidth={3}
              strokeLinejoin="round"
              onClick={() => interactive && onTogglePart?.(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              tabIndex={interactive ? 0 : undefined}
              role={interactive ? 'button' : undefined}
              aria-pressed={interactive ? isShaded : undefined}
              aria-label={`الجزء ${idx + 1}: ${isShaded ? 'مظلل' : 'غير مظلل'}`}
              className={`transition-colors duration-150 focus:outline-none ${hoverClass}`}
            />
          );
        })}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#94A3B8"
          strokeWidth={2}
          pointerEvents="none"
        />
      </svg>
    );
  }

  if (shape === 'bar') {
    const width = 360;
    const height = 96;
    const padding = 8;
    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2;
    const segmentWidth = innerWidth / totalParts;
    const maxWidthClass = size === 'lg' ? 'max-w-[400px]' : 'max-w-[340px]';

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full ${maxWidthClass} h-auto mx-auto select-none`}
        role="img"
        aria-label={`شريط مستطيل مقسم إلى ${totalParts} أجزاء متساوية`}
      >
        <rect
          x={padding}
          y={padding}
          width={innerWidth}
          height={innerHeight}
          rx={10}
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth={2}
        />
        {Array.from({ length: totalParts }).map((_, idx) => {
          const isShaded = Boolean(shadedSet[idx]);
          const x = padding + idx * segmentWidth;
          const fill = isShaded ? '#0D9488' : '#F1F5F9';
          const hoverClass = interactive
            ? isShaded
              ? 'hover:fill-teal-700 cursor-pointer'
              : 'hover:fill-slate-200 cursor-pointer'
            : '';

          return (
            <rect
              key={idx}
              x={x + 1.5}
              y={padding + 1.5}
              width={Math.max(segmentWidth - 3, 4)}
              height={innerHeight - 3}
              rx={idx === 0 || idx === totalParts - 1 ? 6 : 2}
              fill={fill}
              stroke="#94A3B8"
              strokeWidth={1.25}
              onClick={() => interactive && onTogglePart?.(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              tabIndex={interactive ? 0 : undefined}
              role={interactive ? 'button' : undefined}
              aria-pressed={interactive ? isShaded : undefined}
              aria-label={`الجزء ${idx + 1}: ${isShaded ? 'مظلل' : 'غير مظلل'}`}
              className={`transition-colors duration-150 focus:outline-none ${hoverClass}`}
            />
          );
        })}
      </svg>
    );
  }

  // Grid shape
  const { cols, rows } = getGridDimensions(totalParts);
  const cellSize = 56;
  const gap = 6;
  const padding = 10;
  const svgWidth = cols * cellSize + (cols - 1) * gap + padding * 2;
  const svgHeight = rows * cellSize + (rows - 1) * gap + padding * 2;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full max-w-[300px] h-auto mx-auto select-none"
      role="img"
      aria-label={`شبكة مقسمة إلى ${totalParts} مربعاً متساوياً`}
    >
      {Array.from({ length: totalParts }).map((_, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = padding + col * (cellSize + gap);
        const y = padding + row * (cellSize + gap);
        const isShaded = Boolean(shadedSet[idx]);
        const fill = isShaded ? '#0D9488' : '#E2E8F0';
        const hoverClass = interactive
          ? isShaded
            ? 'hover:fill-teal-700 cursor-pointer'
            : 'hover:fill-slate-300 cursor-pointer'
          : '';

        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            rx={8}
            fill={fill}
            stroke={isShaded ? '#0F766E' : '#94A3B8'}
            strokeWidth={1.5}
            onClick={() => interactive && onTogglePart?.(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            tabIndex={interactive ? 0 : undefined}
            role={interactive ? 'button' : undefined}
            aria-pressed={interactive ? isShaded : undefined}
            aria-label={`المربع ${idx + 1}: ${isShaded ? 'مظلل' : 'غير مظلل'}`}
            className={`transition-colors duration-150 focus:outline-none ${hoverClass}`}
          />
        );
      })}
    </svg>
  );
}
