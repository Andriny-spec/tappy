"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack, X } from 'lucide-react';
import { Course } from './course-card';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  course: Course;
  onClose: () => void;
  onComplete: () => void;
  onProgressUpdate: (progress: number) => void;
}

export function VideoPlayer({ course, onClose, onComplete, onProgressUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(course.progress || 0);
  const [isBuffering, setIsBuffering] = useState(false);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Função para formatar tempo (segundos para mm:ss)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Reproduzir/pausar o vídeo
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Ativar/desativar o áudio
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Entrar/sair do modo tela cheia
  const toggleFullScreen = () => {
    if (!playerContainerRef.current) return;
    
    if (!isFullScreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Avançar 10 segundos
  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += 10;
  };

  // Retroceder 10 segundos
  const skipBackward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime -= 10;
  };

  // Atualizar a barra de progresso
  const updateProgressBar = () => {
    if (!videoRef.current || !progressBarRef.current) return;
    
    const progressPercent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
    setProgress(progressPercent);
    
    // Atualizar o progresso a cada 10% (para não sobrecarregar com muitas atualizações)
    if (Math.floor(progressPercent) % 10 === 0) {
      onProgressUpdate(progressPercent);
    }
    
    // Verificar se o vídeo foi concluído
    if (progressPercent >= 95) {
      onComplete();
    }
  };

  // Atualizar o tempo do vídeo ao clicar na barra de progresso
  const setVideoProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    
    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const seekPosition = (e.clientX - progressBarRect.left) / progressBarRect.width;
    videoRef.current.currentTime = seekPosition * videoRef.current.duration;
  };

  // Controlar mostrar/ocultar os controles automaticamente
  const handleShowControls = () => {
    setShowControls(true);
    
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Event handlers para o vídeo
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = updateProgressBar;
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    
    // Adicionar os event listeners
    videoElement.addEventListener('play', onPlay);
    videoElement.addEventListener('pause', onPause);
    videoElement.addEventListener('timeupdate', onTimeUpdate);
    videoElement.addEventListener('waiting', onWaiting);
    videoElement.addEventListener('canplay', onCanPlay);
    
    // Listener para modo tela cheia
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    // Limpar tudo no unmount
    return () => {
      videoElement.removeEventListener('play', onPlay);
      videoElement.removeEventListener('pause', onPause);
      videoElement.removeEventListener('timeupdate', onTimeUpdate);
      videoElement.removeEventListener('waiting', onWaiting);
      videoElement.removeEventListener('canplay', onCanPlay);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [onComplete, onProgressUpdate]);
  
  // Iniciar com posição salva no progress
  useEffect(() => {
    if (videoRef.current && course.progress) {
      const timeToStart = (course.progress / 100) * videoRef.current.duration;
      if (!isNaN(timeToStart) && isFinite(timeToStart)) {
        videoRef.current.currentTime = timeToStart;
      }
    }
  }, [course.progress, duration]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Botão de fechar no canto superior direito */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 z-10 bg-black/40 border-gray-700 hover:bg-black/60 text-white rounded-full"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </Button>
      
      {/* Container do player */}
      <div 
        ref={playerContainerRef}
        className="relative max-w-5xl w-full max-h-[80vh] rounded-xl overflow-hidden shadow-2xl bg-black"
        onMouseMove={handleShowControls}
      >
        {/* Overlay enquanto buffering */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <div className="w-12 h-12 rounded-full border-4 border-tappyGreen/80 border-t-transparent animate-spin" />
          </div>
        )}
        
        {/* Vídeo */}
        <video
          ref={videoRef}
          className="w-full h-full"
          src={course.videoUrl}
          poster={course.thumbnail}
          onClick={togglePlay}
          onDoubleClick={toggleFullScreen}
        />
        
        {/* Gradiente inferior para controles */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Controles */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Título do curso */}
          <h3 className="text-white text-lg font-medium mb-4 line-clamp-1">{course.title}</h3>
          
          {/* Barra de progresso */}
          <div 
            ref={progressBarRef}
            className="w-full h-1.5 bg-gray-600 rounded-full cursor-pointer mb-3 relative overflow-hidden"
            onClick={setVideoProgress}
          >
            {/* Progresso já assistido */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-tappyGreen rounded-full"
              style={{ width: `${progress}%` }}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            
            {/* Bolinha indicadora de posição atual */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm pointer-events-none"
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              initial={false}
              animate={{ left: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Botões de controle e tempo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button 
                onClick={togglePlay}
                className="text-white hover:text-tappyGreen transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              
              {/* Skip -10s */}
              <button 
                onClick={skipBackward}
                className="text-white hover:text-tappyGreen transition-colors"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              
              {/* Skip +10s */}
              <button 
                onClick={skipForward}
                className="text-white hover:text-tappyGreen transition-colors"
              >
                <SkipForward className="h-5 w-5" />
              </button>
              
              {/* Volume */}
              <button 
                onClick={toggleMute}
                className="text-white hover:text-tappyGreen transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              
              {/* Tempo */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            {/* Botão tela cheia */}
            <button 
              onClick={toggleFullScreen}
              className="text-white hover:text-tappyGreen transition-colors"
            >
              {isFullScreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
