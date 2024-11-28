import React, { useRef } from 'react';
import { useTextFit } from '../hooks/useTextFit';

interface YearDotProps {
  year: number;
}

export function YearDot({ year }: YearDotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  useTextFit(`Year ${year}`, textRef, {
    maxFontSize: 16,
    minFontSize: 8,
    step: 0.5
  });

  return (
    <div 
      ref={containerRef}
      className="absolute w-12 h-12 rounded-full bg-blue-800 cursor-pointer flex items-center justify-center overflow-hidden"
      style={{ 
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <span 
        ref={textRef}
        className="text-white font-bold text-center w-full px-1"
      >
        Year {year}
      </span>
    </div>
  );
}