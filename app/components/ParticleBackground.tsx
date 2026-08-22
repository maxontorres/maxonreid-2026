'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { routing } from '@/routing';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  offsetX: number;
  offsetY: number;
  offsetVX: number;
  offsetVY: number;
}

const MIN_PARTICLES = 45;
const MAX_PARTICLES = 110;
const MIN_PARTICLES_MOBILE = 18;
const MAX_PARTICLES_MOBILE = 40;
const DENSITY_DIVISOR = 16000; // one particle per ~16000px^2 of viewport
const MOBILE_BREAKPOINT = 768;
const EDGE_MARGIN = 20;
const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 0.2;
const CLICK_RADIUS = 150;
const CLICK_STRENGTH = 1.6;
const SPRING_K = 0.02;
const DAMPING = 0.9;
const LINK_DISTANCE = 140;
const LINK_MAX_ALPHA = 0.16;
const CURSOR_LINK_DISTANCE = 180;
const CURSOR_LINK_MAX_ALPHA = 0.28;

const PARTICLE_COLORS: Array<{ rgb: string; weight: number }> = [
  { rgb: '98, 141, 255', weight: 0.45 }, // electric
  { rgb: '103, 93, 255', weight: 0.3 }, // violet
  { rgb: '183, 215, 255', weight: 0.25 }, // ice
];

function pickColor(): { rgb: string; color: string } {
  const roll = Math.random();
  let cumulative = 0;
  for (const { rgb, weight } of PARTICLE_COLORS) {
    cumulative += weight;
    if (roll <= cumulative) {
      const alpha = 0.15 + Math.random() * 0.3;
      return { rgb, color: `rgba(${rgb}, ${alpha.toFixed(2)})` };
    }
  }
  const fallback = PARTICLE_COLORS[PARTICLE_COLORS.length - 1];
  return { rgb: fallback.rgb, color: `rgba(${fallback.rgb}, 0.3)` };
}

function createParticle(width: number, height: number): Particle {
  const { color } = pickColor();
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
    radius: 1 + Math.random() * 1.5,
    color,
    offsetX: 0,
    offsetY: 0,
    offsetVX: 0,
    offsetVY: 0,
  };
}

function particleCountFor(width: number, height: number): number {
  const isMobile = width < MOBILE_BREAKPOINT || window.matchMedia('(pointer: coarse)').matches;
  const min = isMobile ? MIN_PARTICLES_MOBILE : MIN_PARTICLES;
  const max = isMobile ? MAX_PARTICLES_MOBILE : MAX_PARTICLES;
  const scaled = Math.round((width * height) / DENSITY_DIVISOR);
  return Math.min(max, Math.max(min, scaled));
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  // Homepage runs the 3D ConstellationScene instead — never stack two ambient
  // background effects on the same page. `next/navigation`'s usePathname (not
  // next-intl's) is required here since this component renders outside
  // NextIntlClientProvider, so the locale prefix must be stripped manually.
  const isHomepage =
    pathname === '/' ||
    routing.locales.some((locale) => pathname === `/${locale}` || pathname === `/${locale}/`);

  useEffect(() => {
    if (isHomepage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cssWidth = 0;
    let cssHeight = 0;
    let particles: Particle[] = [];
    let rafId: number | null = null;
    const mouse = { x: 0, y: 0, active: false };

    const resizeCanvas = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    const targetCount = particleCountFor(cssWidth, cssHeight);
    particles = Array.from({ length: targetCount }, () => createParticle(cssWidth, cssHeight));

    const applyForce = (px: number, py: number, radius: number, strength: number, particle: Particle) => {
      const dx = particle.x + particle.offsetX - px;
      const dy = particle.y + particle.offsetY - py;
      const dist = Math.hypot(dx, dy);
      if (dist < radius && dist > 0.01) {
        const falloff = 1 - dist / radius;
        const force = falloff * falloff * strength;
        particle.offsetVX += (dx / dist) * force;
        particle.offsetVY += (dy / dist) * force;
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -EDGE_MARGIN) p.x = cssWidth + EDGE_MARGIN;
        if (p.x > cssWidth + EDGE_MARGIN) p.x = -EDGE_MARGIN;
        if (p.y < -EDGE_MARGIN) p.y = cssHeight + EDGE_MARGIN;
        if (p.y > cssHeight + EDGE_MARGIN) p.y = -EDGE_MARGIN;

        if (mouse.active) {
          applyForce(mouse.x, mouse.y, REPEL_RADIUS, REPEL_STRENGTH, p);
        }

        p.offsetVX += -p.offsetX * SPRING_K;
        p.offsetVY += -p.offsetY * SPRING_K;
        p.offsetVX *= DAMPING;
        p.offsetVY *= DAMPING;
        p.offsetX += p.offsetVX;
        p.offsetY += p.offsetVY;
      }

      // Connect nearby particles with faint lines (network/map effect)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + a.offsetX;
        const ay = a.y + a.offsetY;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x + b.offsetX;
          const by = b.y + b.offsetY;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * LINK_MAX_ALPHA;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(120, 160, 255, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const distToMouse = Math.hypot(ax - mouse.x, ay - mouse.y);
          if (distToMouse < CURSOR_LINK_DISTANCE) {
            const alpha = (1 - distToMouse / CURSOR_LINK_DISTANCE) * CURSOR_LINK_MAX_ALPHA;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(183, 215, 255, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(ax, ay);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x + p.offsetX, p.y + p.offsetY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      for (const p of particles) {
        applyForce(e.clientX, e.clientY, CLICK_RADIUS, CLICK_STRENGTH, p);
      }
    };

    const handleResize = () => {
      resizeCanvas();
      const targetCount = particleCountFor(cssWidth, cssHeight);
      if (targetCount > particles.length) {
        particles.push(
          ...Array.from({ length: targetCount - particles.length }, () => createParticle(cssWidth, cssHeight))
        );
      } else if (targetCount < particles.length) {
        particles.length = targetCount;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibility);

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isHomepage]);

  if (isHomepage) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
