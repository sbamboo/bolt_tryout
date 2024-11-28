import { MAX_YEAR, MIN_YEAR } from '../constants/config';

export const getRandomPosition = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const getRandomYear = (): number => {
  return Math.floor(Math.random() * (MAX_YEAR - MIN_YEAR + 1)) + MIN_YEAR;
};

export const isValidYear = (year: number): boolean => {
  return !isNaN(year) && year >= MIN_YEAR && year <= MAX_YEAR;
};