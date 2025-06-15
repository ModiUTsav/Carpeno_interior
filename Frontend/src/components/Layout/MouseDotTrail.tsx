// src/components/InteractiveDotGrid.jsx
import  { useState, useEffect, useRef, useCallback } from 'react';

const DOT_SIZE_NORMAL = 1; // pixels
const DOT_SIZE_ACTIVE = 15; // pixels, when mouse is near
const ACTIVATION_RADIUS = 90; // pixels, radius around mouse to activate dots
const GRID_SPACING = 20; // pixels, spacing between dots

// Helper to get distance between two points
const getDistance = (x1:any, y1:any, x2:any, y2:any) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

const InteractiveDotGrid = () => {
  // Mouse position relative to the container
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the grid's own container div
  type Dot = { id: string; x: number; y: number };
  const [dots, setDots] = useState<Dot[]>([]);

  // Generate dots and handle resize
  useEffect(() => {
    const generateDots = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      const newDots = [];

      const numCols = Math.ceil(containerWidth / GRID_SPACING);
      const numRows = Math.ceil(containerHeight / GRID_SPACING);

      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          newDots.push({
            id: `dot-${r}-${c}`,
            x: c * GRID_SPACING + GRID_SPACING / 2,
            y: r * GRID_SPACING + GRID_SPACING / 2,
          });
        }
      }
      setDots(newDots);
    };

    generateDots(); // Generate dots initially

    const handleResize = () => generateDots();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update mouse position on move
  const handleMouseMove = useCallback((e:any) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      // These classes make the grid fill its parent and correctly position dots
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {dots.map(dot => {
        const distance = getDistance(mousePosition.x, mousePosition.y, dot.x, dot.y);
        const isActive = distance < ACTIVATION_RADIUS;

        let currentSize = DOT_SIZE_NORMAL;
        let opacity = 0.3;

        if (isActive) {
          const proximityFactor = 1 - (distance / ACTIVATION_RADIUS);
          currentSize = DOT_SIZE_NORMAL + (DOT_SIZE_ACTIVE - DOT_SIZE_NORMAL) * proximityFactor;
          opacity = 0.3 + 0.7 * proximityFactor;
        }

        return (
          <div
            key={dot.id}
            className="absolute bg-gray-400 rounded-full transition-all duration-100 ease-in-out"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: `${currentSize}px`,
              height: `${currentSize}px`,
              opacity: opacity,
              transform: `translate(-40%, -40%)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default InteractiveDotGrid;