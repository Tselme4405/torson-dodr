"use client";

import { useEffect, useRef } from "react";

type Firework = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  hue: number;
};

export default function FireworksCanvas({
  intensity = 0.7, // 0..1 (ихсэх тусам илүү олон)
}: {
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;

    const rockets: Rocket[] = [];
    const sparks: Firework[] = [];

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const launchRocket = (x?: number) => {
      const hue = Math.floor(rand(0, 360));

      // screen-ийн дагуу жигд тараалт
      const startX = x ?? rand(w * 0.08, w * 0.92);

      rockets.push({
        x: startX,
        y: h + 10,
        vx: rand(-1.2, 1.2),
        vy: rand(-12.5, -16.5), // илүү хүчтэй дээш
        targetY: rand(h * 0.08, h * 0.55), // дунд+дээш хүртэл дэлбэрнэ // илүү ДЭЭД хэсэгт дэлбэрнэ
        hue,
      });
    };

    const explode = (x: number, y: number, hue: number) => {
      const count = Math.floor(rand(110, 180) * (0.9 + intensity));
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + rand(-0.08, 0.08);
        const speed = rand(1.6, 5.2);
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 0,
          maxLife: Math.floor(rand(45, 85)),
          size: rand(1.2, 2.6),
          hue: (hue + rand(-25, 25) + 360) % 360,
        });
      }
    };
    const base = 0.28 + intensity * 0.32;
    const multi = 2 + Math.floor(intensity * 4); // 2..6 rockets

    if (Math.random() < base) {
      for (let n = 0; n < multi; n++) {
        // x-ийг жигд тараана
        launchRocket(rand(w * 0.06, w * 0.94));
      }
    }

    // --- Airburst: already-in-the-sky fireworks (deed heseg deer) ---
    if (Math.random() < 0.1 * (0.7 + intensity)) {
      const x = rand(w * 0.06, w * 0.94);
      const y = rand(h * 0.05, h * 0.28); // top zone
      explode(x, y, Math.floor(rand(0, 360)));
    }
    const drawRocket = (r: Rocket) => {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${r.hue}, 90%, 70%, 0.9)`;
      ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // trail
      ctx.beginPath();
      ctx.strokeStyle = `hsla(${r.hue}, 90%, 70%, 0.18)`;
      ctx.lineWidth = 2;
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x - r.vx * 6, r.y - r.vy * 6);
      ctx.stroke();
    };

    const drawSpark = (p: Firework) => {
      const t = p.life / p.maxLife;
      const alpha = Math.max(0, 1 - t);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, ${alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      // fade background for motion trail
      ctx.fillStyle = "rgba(240, 249, 255, 0.14)"; // цайвар sky шиг
      ctx.fillRect(0, 0, w, h);

      // auto rockets
      const base = 0.08 + intensity * 0.08; // бага магадлал
      const multi = 1; // нэг удаад 1 rocket л

      if (Math.random() < base) {
        launchRocket();
      }
      // update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.18; // gravity

        drawRocket(r);

        if (r.y <= r.targetY || r.vy > -2) {
          explode(r.x, r.y, r.hue);
          rockets.splice(i, 1);
        }
      }

      // update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07; // gravity
        p.vx *= 0.985; // drag
        p.vy *= 0.985;

        p.life += 1;
        drawSpark(p);

        if (p.life >= p.maxLife) sparks.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onClick = (e: MouseEvent) => {
      // click үед rocket launch (солиотой мэдрэмж)
      for (let k = 0; k < 6 + Math.floor(intensity * 6); k++) {
        launchRocket(e.clientX + rand(-80, 80));
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);

    // start
    ctx.fillStyle = "rgba(240, 249, 255, 1)";
    ctx.fillRect(0, 0, w, h);
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none", // контент дээр дарж болохоор
      }}
    />
  );
}
