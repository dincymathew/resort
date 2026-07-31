import React, { useEffect, useRef } from 'react';

interface SnowfallEffectProps {
  active: boolean;
  intensity?: 'light' | 'moderate' | 'heavy';
}

export const SnowfallEffect: React.FC<SnowfallEffectProps> = ({ active, intensity = 'moderate' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle count based on intensity
    const particleCount = intensity === 'light' ? 40 : intensity === 'heavy' ? 120 : 75;

    interface Flake {
      x: number;
      y: number;
      radius: number;
      density: number;
      opacity: number;
      speedY: number;
      speedX: number;
      swing: number;
    }

    const flakes: Flake[] = [];
    for (let i = 0; i < particleCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        density: Math.random() * particleCount,
        opacity: Math.random() * 0.7 + 0.3,
        speedY: Math.random() * 1.2 + 0.5,
        speedX: Math.random() * 0.6 - 0.3,
        swing: Math.random() * Math.PI * 2,
      });
    }

    // Floating Mist Fog patches
    interface FogPatch {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
    }

    const fogPatches: FogPatch[] = [
      { x: width * 0.2, y: height * 0.4, radius: 250, opacity: 0.12, speed: 0.2 },
      { x: width * 0.7, y: height * 0.6, radius: 300, opacity: 0.15, speed: -0.15 },
      { x: width * 0.5, y: height * 0.2, radius: 200, opacity: 0.1, speed: 0.25 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw misty fog clouds
      fogPatches.forEach((fog) => {
        fog.x += fog.speed;
        if (fog.x - fog.radius > width) fog.x = -fog.radius;
        if (fog.x + fog.radius < 0) fog.x = width + fog.radius;

        const gradient = ctx.createRadialGradient(fog.x, fog.y, 10, fog.x, fog.y, fog.radius);
        gradient.addColorStop(0, `rgba(235, 245, 240, ${fog.opacity})`);
        gradient.addColorStop(0.6, `rgba(220, 235, 230, ${fog.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(220, 235, 230, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(fog.x, fog.y, fog.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw snowflakes / frost crystals
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        ctx.save();
        ctx.globalAlpha = f.opacity;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.restore();

        // Update positions
        f.swing += 0.02;
        f.y += f.speedY;
        f.x += Math.sin(f.swing) * 0.5 + f.speedX;

        // Reset if snowflake falls below screen
        if (f.y > height) {
          flakes[i] = {
            x: Math.random() * width,
            y: -10,
            radius: f.radius,
            density: f.density,
            opacity: Math.random() * 0.7 + 0.3,
            speedY: Math.random() * 1.2 + 0.5,
            speedX: Math.random() * 0.6 - 0.3,
            swing: Math.random() * Math.PI * 2,
          };
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, intensity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
