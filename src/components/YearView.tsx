import React, { useState } from 'react';
import { WeekDot } from './WeekDot';
import { WeekMenu } from './WeekMenu';
import { YearDot } from './YearDot';

interface YearViewProps {
  year: number;
  onWeekSelect: (week: number) => void;
  onBack: () => void;
}

export function YearView({ year, onWeekSelect, onBack }: YearViewProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
  
  const getWeekPosition = (week: number) => {
    const angle = (week / 52) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  };

  const handleWeekClick = (week: number) => {
    setSelectedWeek(week === selectedWeek ? null : week);
  };

  return (
    <div className="fixed inset-0 bg-gray-100">
      {/* Center year dot */}
      <YearDot year={year} />

      {/* Week dots */}
      {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => {
        const { x, y } = getWeekPosition(week);
        return (
          <WeekDot
            key={week}
            week={week}
            x={x}
            y={y}
            onClick={() => handleWeekClick(week)}
            onHover={setHoveredWeek}
            isSelected={week === selectedWeek}
          />
        );
      })}

      {/* Hover label */}
      {hoveredWeek && !selectedWeek && (
        <div
          className="absolute px-3 py-1 bg-black text-white rounded-md text-sm pointer-events-none z-30"
          style={{
            left: getWeekPosition(hoveredWeek).x,
            top: getWeekPosition(hoveredWeek).y - 24,
            transform: 'translate(-50%, -100%)',
          }}
        >
          Week {hoveredWeek}
        </div>
      )}

      {/* Week Menu */}
      {selectedWeek && (
        <WeekMenu
          year={year}
          week={selectedWeek}
          onClose={() => setSelectedWeek(null)}
        />
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Back to Years
      </button>
    </div>
  );
}