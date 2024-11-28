import React from 'react';

interface WeekDotProps {
  week: number;
  x: number;
  y: number;
  onClick: () => void;
  onHover: (week: number | null) => void;
  isSelected?: boolean;
}

export function WeekDot({ week, x, y, onClick, onHover, isSelected }: WeekDotProps) {
  return (
    <div
      className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
        isSelected ? 'bg-blue-800 scale-150' : 'bg-blue-600 hover:scale-150'
      }`}
      style={{ left: x, top: y }}
      onClick={onClick}
      onMouseEnter={() => onHover(week)}
      onMouseLeave={() => onHover(null)}
    />
  );
}