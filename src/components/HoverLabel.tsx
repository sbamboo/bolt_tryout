import React from 'react';
import { DotData } from '../types/dot';

interface HoverLabelProps {
  dot: DotData;
}

export function HoverLabel({ dot }: HoverLabelProps) {
  const { x, y, year } = dot;
  
  return (
    <div
      className="absolute px-3 py-1 bg-black text-white rounded-md text-sm pointer-events-none"
      style={{
        transform: `translate(${x}px, ${y - 24}px)`,
        zIndex: 30,
      }}
    >
      Year {year}
    </div>
  );
}