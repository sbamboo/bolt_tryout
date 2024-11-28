import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useMenuPosition(position: Position) {
  const [menuStyle, setMenuStyle] = useState({
    left: position.x,
    top: position.y,
    transform: 'translate(-50%, -100%)',
  });

  useEffect(() => {
    const updatePosition = () => {
      const menuWidth = 384; // max-w-md = 28rem = 384px
      const menuHeight = 400; // approximate max height
      const padding = 16;

      let left = position.x;
      let top = position.y - menuHeight - padding;
      
      // Adjust horizontal position if menu would go off screen
      if (left + menuWidth / 2 > window.innerWidth) {
        left = window.innerWidth - menuWidth / 2 - padding;
      } else if (left - menuWidth / 2 < 0) {
        left = menuWidth / 2 + padding;
      }

      // If menu would go off top of screen, show it below the dot instead
      if (top < padding) {
        top = position.y + padding;
        setMenuStyle({
          left,
          top,
          transform: 'translate(-50%, 0)',
        });
      } else {
        setMenuStyle({
          left,
          top: position.y,
          transform: 'translate(-50%, -100%)',
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [position]);

  return menuStyle;
}