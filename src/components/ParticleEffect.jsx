import { useMemo, useRef, useEffect } from 'react';

const seededRandom = (seed) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ParticleEffect = ({ particleCount = 30, color = "rgba(95, 168, 222, 0.4)", connectionDistance = 120 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 12345.6789;
      const size = seededRandom(seed + 1) * 3 + 1;
      const x = seededRandom(seed + 2) * 100;
      const y = seededRandom(seed + 3) * 100;
      const vx = (seededRandom(seed + 4) - 0.5) * 0.15;
      const vy = (seededRandom(seed + 5) - 0.5) * 0.15;

      return {
        key: i,
        size,
        x,
        y,
        vx,
        vy,
      };
    });
  }, [particleCount]);

  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        const padding = p.size / 2;
        const px = (p.x / 100) * width;
        const py = (p.y / 100) * height;
        const paddingPx = (padding / 100) * Math.min(width, height);

        if (px <= paddingPx) {
          p.x = (paddingPx / width) * 100;
          p.vx = Math.abs(p.vx);
        } else if (px >= width - paddingPx) {
          p.x = ((width - paddingPx) / width) * 100;
          p.vx = -Math.abs(p.vx);
        }

        if (py <= paddingPx) {
          p.y = (paddingPx / height) * 100;
          p.vy = Math.abs(p.vy);
        } else if (py >= height - paddingPx) {
          p.y = ((height - paddingPx) / height) * 100;
          p.vy = -Math.abs(p.vy);
        }
      });

      const connDistPx = (connectionDistance / 100) * Math.min(width, height);
      const connDistSq = connDistPx * connDistPx;

      ctx.strokeStyle = color.replace(/[\d.]+\)$/, '0.15)');
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        const x1 = (p1.x / 100) * width;
        const y1 = (p1.y / 100) * height;

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const x2 = (p2.x / 100) * width;
          const y2 = (p2.y / 100) * height;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const distSq = dx * dx + dy * dy;

          if (distSq < connDistSq) {
            const opacity = 1 - distSq / connDistSq;
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      const particleColor = color.replace(/[\d.]+\)$/, '0.7)');

      particlesRef.current.forEach((p) => {
        const px = (p.x / 100) * width;
        const py = (p.y / 100) * height;
        const radius = p.size;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [color, connectionDistance]);

  return (
    <div className="particle-container" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ParticleEffect;