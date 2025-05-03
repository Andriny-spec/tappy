"use client";

import { useRef, useEffect } from 'react';
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

const colors = ['#00FF00', '#FFFFFF', '#00D000', '#00A000', '#AAFFAA'];

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas para tela inteira
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Inicializar partículas
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(Math.max(window.innerWidth, window.innerHeight) / 5, 150);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.2
        });
      }
    };

    // Atualizar mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Animação principal
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar e atualizar cada partícula
      particlesRef.current.forEach((particle, index) => {
        // Verificar distância do mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Efeito de repulsão se o mouse estiver próximo
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          
          particle.x -= directionX * force * 5;
          particle.y -= directionY * force * 5;
        }
        
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Ajustar velocidade aleatoriamente para criar movimento mais natural
        if (Math.random() < 0.05) {
          particle.speedX += (Math.random() - 0.5) * 0.2;
          particle.speedY += (Math.random() - 0.5) * 0.2;
          
          // Limitar velocidade máxima
          const maxSpeed = 1.5;
          particle.speedX = Math.max(Math.min(particle.speedX, maxSpeed), -maxSpeed);
          particle.speedY = Math.max(Math.min(particle.speedY, maxSpeed), -maxSpeed);
        }
        
        // Limites da tela
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Desenhar linhas entre partículas próximas
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Configuração inicial
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();

    // Limpeza
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </motion.div>
  );
}
