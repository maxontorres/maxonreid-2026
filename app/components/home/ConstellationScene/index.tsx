'use client';

import { useEffect, useRef } from 'react';
import { ConstellationEngine } from './engine';

export default function ConstellationScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new ConstellationEngine(canvas);

    return () => engine.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
