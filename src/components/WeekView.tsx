import React, { useEffect, useState } from 'react';
import { WeekDish } from '../types/views';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface WeekViewProps {
  year: number;
  week: number;
  onBack: () => void;
}

export function WeekView({ year, week, onBack }: WeekViewProps) {
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
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Week {week} of year {year}:</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back
          </button>
        </div>

        {loading && <p className="text-gray-600">Loading menu...</p>}
        
        {error && <p className="text-red-600">{error}</p>}
        
        {dishes?.error && <p className="text-red-600">{dishes.error}</p>}
        
        {dishes?.weeksdishes && (
          <div className="space-y-4">
            {dishes.weeksdishes.map((dish, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">{WEEKDAYS[index]}:</span> {dish}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}