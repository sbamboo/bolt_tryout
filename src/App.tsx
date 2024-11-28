import React, { useState, useEffect } from 'react';
import { DOT_AMOUNT } from './constants/config';
import { DotData } from './types/dot';
import { View } from './types/views';
import { getRandomPosition, getRandomYear } from './utils/dotUtils';
import { YearInput } from './components/YearInput';
import { Dot } from './components/Dot';
import { HoverLabel } from './components/HoverLabel';
import { YearView } from './components/YearView';

function App() {
  const [dots, setDots] = useState<DotData[]>([]);
  const [hoveredDot, setHoveredDot] = useState<DotData | null>(null);
  const [view, setView] = useState<View>('years');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const initialDots: DotData[] = Array.from({ length: DOT_AMOUNT }, () => ({
      x: getRandomPosition(window.innerWidth - 32),
      y: getRandomPosition(window.innerHeight - 32),
      year: getRandomYear(),
      vx: 0,
      vy: 0,
    }));
    setDots(initialDots);
  }, []);

  const handleCreateDot = (year: number) => {
    const existingDot = dots.find(dot => dot.year === year);
    
    if (existingDot) {
      setDots(dots.map(dot => 
        dot.year === year 
          ? { ...dot, isHighlighted: true }
          : dot
      ));
      
      setTimeout(() => {
        setDots(dots.map(dot => 
          dot.year === year 
            ? { ...dot, isHighlighted: false }
            : dot
        ));
      }, 2000);
    } else {
      const newDot: DotData = {
        x: getRandomPosition(window.innerWidth - 32),
        y: getRandomPosition(window.innerHeight - 32),
        year,
        vx: 0,
        vy: 0,
      };
      setDots([...dots, newDot]);
    }
  };

  const handleDotClick = (dot: DotData) => {
    setSelectedYear(dot.year);
    setView('year');
    setHoveredDot(null); // Reset hover state when changing views
  };

  if (view === 'year' && selectedYear) {
    return (
      <YearView
        year={selectedYear}
        onWeekSelect={() => {}}
        onBack={() => {
          setView('years');
          setSelectedYear(null);
          setHoveredDot(null); // Reset hover state when returning to years view
          setDots(dots.map(dot => ({ ...dot, isHovered: false })));
        }}
      />
    );
  }

  return (
    <div className="relative w-screen h-screen bg-gray-100 overflow-hidden">
      <div className="relative z-20">
        <YearInput onCreateDot={handleCreateDot} />
      </div>
      
      <div className="relative z-10">
        {dots.map((dot, index) => (
          <Dot 
            key={index} 
            dot={dot} 
            currentYear={new Date().getFullYear()}
            onHover={setHoveredDot}
            onClick={() => handleDotClick(dot)}
          />
        ))}
      </div>

      {hoveredDot && (
        <div className="relative z-20">
          <HoverLabel dot={hoveredDot} />
        </div>
      )}
    </div>
  );
}

export default App;