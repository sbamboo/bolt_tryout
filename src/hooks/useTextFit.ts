import { useState, useEffect, useCallback } from 'react';

interface TextFitOptions {
  maxFontSize?: number;
  minFontSize?: number;
  step?: number;
}

export function useTextFit(text: string, containerRef: React.RefObject<HTMLElement>, options: TextFitOptions = {}) {
  const [fontSize, setFontSize] = useState(options.maxFontSize || 16);
  
  const calculateFit = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const maxSize = options.maxFontSize || 16;
    const minSize = options.minFontSize || 8;
    const step = options.step || 0.5;

    let currentSize = maxSize;
    container.style.fontSize = `${currentSize}px`;

    while (
      currentSize > minSize && 
      (container.scrollWidth > container.offsetWidth || 
       container.scrollHeight > container.offsetHeight)
    ) {
      currentSize -= step;
      container.style.fontSize = `${currentSize}px`;
    }

    setFontSize(currentSize);
  }, [text, options.maxFontSize, options.minFontSize, options.step]);

  useEffect(() => {
    calculateFit();
    const handleResize = () => calculateFit();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateFit]);

  return fontSize;
}