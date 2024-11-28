import React, { useEffect, useState } from 'react';
import { WeekDish } from '../types/views';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface WeekMenuProps {
  year: number;
  week: number;
  onClose: () => void;
}

export function WeekMenu({ year, week, onClose }: WeekMenuProps) {
  const [dishes, setDishes] = useState<WeekDish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(
          `https://api.ntigskovde.se/vblo/foodmenu/index.php?week=${week - 1}&year=${year}`
        );
        const data: WeekDish = await response.json();
        setDishes(data);
      } catch (err) {
        setError('Failed to fetch menu data');
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [week, year]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-xl p-4 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Week {week} of year {year}:</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {loading && <p className="text-gray-600">Loading menu...</p>}
        
        {error && <p className="text-red-600">{error}</p>}
        
        {dishes?.error && <p className="text-red-600">{dishes.error}</p>}
        
        {dishes?.weeksdishes && (
          <div className="space-y-2">
            {dishes.weeksdishes.map((dish, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded">
                <span className="font-semibold">{WEEKDAYS[index]}:</span> {dish}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}