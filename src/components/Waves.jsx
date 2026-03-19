import { useEffect, useRef } from 'react';

export default function Waves({
  lineColor = "#5227FF",
  backgroundColor = "transparent",
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 12,
  yGap = 36,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let points = [];
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points = [];
      const cols = Math.ceil(canvas.width / xGap) + 1;
      const rows = Math.ceil(canvas.height / yGap) + 1;
      
      for (let i = 0; i < cols; i++) {
        points[i] = [];
        for (let j = 0; j < rows; j++) {
          points[i][j] = {
            x: i * xGap,
            y: j * yGap,
            baseX: i * xGap,
            baseY: j * yGap,
            vx: 0,
            vy: 0,
            targetX: 0,
            targetY: 0,
          };
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
          const point = points[i][j];
          
          const dx = mouseX - point.baseX;
          const dy = mouseY - point.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxCursorMove) {
            const force = (maxCursorMove - distance) / maxCursorMove;
            point.targetX = (dx / distance) * force * waveAmpX;
            point.targetY = (dy / distance) * force * waveAmpY;
          } else {
            point.targetX = 0;
            point.targetY = 0;
          }

          point.vx += (point.targetX - point.x) * tension;
          point.vy += (point.targetY - point.y) * tension;
          point.vx *= friction;
          point.vy *= friction;
          point.x += point.vx;
          point.y += point.vy;

          point.x += Math.sin(Date.now() * waveSpeedX + i * 0.1) * waveAmpX * 0.1;
          point.y += Math.cos(Date.now() * waveSpeedY + j * 0.1) * waveAmpY * 0.1;

          ctx.beginPath();
          ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = lineColor;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const smoothMouse = () => {
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;
      requestAnimationFrame(smoothMouse);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    draw();
    smoothMouse();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}

