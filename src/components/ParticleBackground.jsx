import { useEffect, useRef } from "react";

export default function ParticleBackground({
  color = "#5eead4",
  count = 120,
  bgColor = "#0d0d10",
  interactive = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    function hexToRgb(hex) {
      const clean = hex.replace("#", "");
      const bigint = parseInt(clean.length === 3
        ? clean.split("").map(c => c + c).join("")
        : clean, 16);
      return `${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255}`;
    }
    const rgb = hexToRgb(color);
    const col = (a) => `rgba(${rgb},${a})`;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor(init = false) { this.reset(init); }

      reset(init) {
        this.x    = Math.random() * W;
        this.y    = init ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
        this.size = Math.random() * 1.6 + 0.4;
        this.base = this.size;
        this.vx   = (Math.random() - 0.5) * 0.35;
        this.vy   = (Math.random() - 0.5) * 0.35;
        this.op   = Math.random() * 0.5 + 0.15;
        this.life = 0;
        this.max  = Math.random() * 400 + 200;
      }

      update() {
        this.life++;
        if (this.life > this.max) { this.reset(false); return; }

        this.x += this.vx;
        this.y += this.vy;

        if (interactive) {
          const dx   = mouse.x - this.x;
          const dy   = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const R    = 90;
          if (dist < R) {
            const angle = Math.atan2(dy, dx);
            const push  = (R - dist) / R;
            this.x -= Math.cos(angle) * push * 2;
            this.y -= Math.sin(angle) * push * 2;
            this.size = this.base + push * 2.5;
          } else {
            this.size += (this.base - this.size) * 0.1;
          }
        }

        if (this.x < 0) this.x = W;
        if (this.x > W) this.x = 0;
        if (this.y < 0) this.y = H;
        if (this.y > H) this.y = 0;

        const fi = Math.min(this.life / 60, 1);
        const fo = Math.min((this.max - this.life) / 60, 1);
        this.cur = this.op * Math.min(fi, fo);
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = col(this.cur);
        ctx.fill();
      }
    }

    function drawLines() {
      const MAX = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = col((1 - dist / MAX) * 0.15);
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function drawGlow() {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      g.addColorStop(0,   col(0.07));
      g.addColorStop(0.5, col(0.02));
      g.addColorStop(1,   col(0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function loop() {
      ctx.fillStyle = bgColor + "2e";
      ctx.fillRect(0, 0, W, H);
      if (interactive) drawGlow();
      drawLines();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }

    function init() {
      resize();
      particles = Array.from({ length: count }, (_, i) =>
        new Particle(true)
      );
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);
      loop();
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { resize(); };

    init();
    window.addEventListener("resize", onResize);
    if (interactive) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [color, count, bgColor, interactive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
      }}
    />
  );
}
