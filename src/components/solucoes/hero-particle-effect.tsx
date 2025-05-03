"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export const HeroParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });

  const colors = ['#03fcae', '#03fc94', '#03fcb1', '#ffffff']; // Tappy greens and white

  const initParticles = (width: number, height: number) => {
    particles.current = [];
    const particleCount = Math.min(Math.floor((width * height) / 10000), 100);
    
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Draw particles
    particles.current.forEach((particle) => {
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw connections
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = '#03fcae';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const dx = particles.current[i].x - particles.current[j].x;
        const dy = particles.current[i].y - particles.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.globalAlpha = 0.2 * (1 - distance / 150);
          ctx.beginPath();
          ctx.moveTo(particles.current[i].x, particles.current[i].y);
          ctx.lineTo(particles.current[j].x, particles.current[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const updateParticles = (width: number, height: number) => {
    particles.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Mouse interaction - particles move away from mouse
      const dx = particle.x - mousePosition.current.x;
      const dy = particle.y - mousePosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 1000;
        particle.speedX += dx * force;
        particle.speedY += dy * force;
      }

      // Boundaries check with bounce
      if (particle.x < 0 || particle.x > width) {
        particle.speedX *= -1;
        particle.x = particle.x < 0 ? 0 : width;
      }
      
      if (particle.y < 0 || particle.y > height) {
        particle.speedY *= -1;
        particle.y = particle.y < 0 ? 0 : height;
      }

      // Gradually slow down
      particle.speedX *= 0.99;
      particle.speedY *= 0.99;
    });
  };

  const handleResize = () => {
    if (!containerRef.current || !canvasRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    
    initParticles(width, height);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mousePosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    handleResize();
    window.addEventListener('resize', handleResize);
    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!canvasRef.current || !ctx) return;
      
      const { width, height } = canvasRef.current;
      
      updateParticles(width, height);
      drawParticles(ctx, width, height);
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
