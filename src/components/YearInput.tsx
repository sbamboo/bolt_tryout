import React, { useState } from 'react';
import { MAX_YEAR, MIN_YEAR } from '../constants/config';

interface YearInputProps {
  onCreateDot: (year: number) => void;
}

export function YearInput({ onCreateDot }: YearInputProps) {
  const [year, setYear] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const yearNum = parseInt(year);
    if (yearNum >= MIN_YEAR && yearNum <= MAX_YEAR) {
      onCreateDot(yearNum);
      setYear('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="absolute top-4 left-4 flex gap-2 bg-white p-4 rounded-lg shadow-lg">
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Enter year"
        min={MIN_YEAR}
        max={MAX_YEAR}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create
      </button>
    </form>
  );
}