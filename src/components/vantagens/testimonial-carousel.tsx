"use client";

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Desde que implementamos o Tappy Whats, a eficiência do nosso atendimento aumentou em 70%. Conseguimos atender mais clientes em menos tempo e com maior qualidade.",
    name: "Ana Carolina Silva",
    role: "Gerente de Atendimento",
    company: "Grupo Empresarial XYZ",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5
  },
  {
    id: 2,
    quote: "A integração do Tappy Imob com nossos sistemas trouxe um ROI impressionante já no primeiro mês. Automatizamos processos que antes eram manuais e ganhamos tempo e precisão.",
    name: "Marcos Oliveira",
    role: "CEO",
    company: "Imobiliária Futuro",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5
  },
  {
    id: 3,
    quote: "O Tappy Link revolucionou nossa forma de fazer networking. A capacidade de compartilhar perfis profissionais com um toque simplificou muito nossas conexões em eventos.",
    name: "Patrícia Mendes",
    role: "Diretora de Marketing",
    company: "Innova Tech",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4
  },
  {
    id: 4,
    quote: "O suporte técnico da Tappy é excepcional. Sempre que precisamos, recebemos atendimento rápido e eficiente. Isso faz toda a diferença para nossa operação.",
    name: "Ricardo Torres",
    role: "CTO",
    company: "Retail Solutions",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5
  },
  {
    id: 5,
    quote: "Nossa produtividade aumentou significativamente após a implementação das soluções Tappy. A automação nos permitiu focar no que realmente importa: nossos clientes.",
    name: "Juliana Costa",
    role: "Supervisora de Vendas",
    company: "Megastore Brasil",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5
  }
];

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
};

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;

    let intervalId: NodeJS.Timeout;
    
    const autoplay = () => {
      intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    };

    autoplay();

    // Pause on user interaction
    emblaApi.on('pointerDown', () => clearInterval(intervalId));
    emblaApi.on('pointerUp', autoplay);

    return () => {
      clearInterval(intervalId);
      emblaApi.off('pointerDown', () => clearInterval(intervalId));
      emblaApi.off('pointerUp', autoplay);
    };
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-tappyGreen/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            O que nossos{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
              clientes
            </span>{" "}
            dizem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é o maior indicador do sucesso das nossas soluções
          </p>
        </motion.div>
        
        <div className="relative overflow-hidden">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="relative flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 min-w-0 px-4"
                >
                  <motion.div 
                    className="p-6 md:p-8 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 h-full flex flex-col"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ 
                      boxShadow: '0 0 30px rgba(3, 252, 174, 0.15)',
                      borderColor: 'rgba(3, 252, 174, 0.3)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Quote Icon */}
                    <div className="text-tappyGreen mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    {/* Quote */}
                    <p className="text-gray-200 flex-grow mb-6">{testimonial.quote}</p>
                    
                    {/* Rating */}
                    <div className="mb-6">
                      <Stars rating={testimonial.rating} />
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border border-white/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              className="p-2 rounded-full bg-gray-800 hover:bg-tappyGreen/80 transition-colors text-white"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === selectedIndex ? 'bg-tappyGreen' : 'bg-gray-600'
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              className="p-2 rounded-full bg-gray-800 hover:bg-tappyGreen/80 transition-colors text-white"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
