import React from 'react';
import { COLORS } from '../constants/config';
import { DotData } from '../types/dot';

interface DotProps {
  dot: DotData;
  currentYear: number;
  onHover: (dot: DotData | null) => void;
  onClick: () => void;
}

export function Dot({ dot, currentYear, onHover, onClick }: DotProps) {
  const { x, y, year, isHighlighted } = dot;

  const color = year === currentYear ? COLORS.CURRENT_YEAR : COLORS.DEFAULT;
  
  return (
    <div
      className="absolute w-4 h-4 rounded-full transition-colors duration-200 cursor-pointer hover:scale-150"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: color,
        outline: isHighlighted ? `2px solid ${COLORS.HIGHLIGHTED}` : 'none',
      }}
      onMouseEnter={() => onHover(dot)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    />
  );
}