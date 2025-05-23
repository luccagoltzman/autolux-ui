'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
}

export default function HeroBanner({
  title = "GARRA <span>Auto Center</span>",
  subtitle = "Transforme seu veículo com nossos serviços de estética automotiva de alta qualidade",
  buttonText = "Ver Serviços",
  buttonLink = "/servicos",
  imageUrl = "/images/banner-temp.svg"
}: HeroBannerProps) {
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [parallaxImages] = useState([
    { url: '/images/banner-temp.svg', speed: -20 },
    { url: '/images/banner-temp.svg', speed: -10 },
  ]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Normalize mouse position relative to center of screen
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleWords = title.split(' ');
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 z-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Parallax Effect */}
          {parallaxImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{ 
                backgroundImage: `url('${image.url}')`,
                zIndex: 10 + index
              }}
              animate={{
                x: mousePosition.x * image.speed,
                y: mousePosition.y * image.speed
              }}
              transition={{ type: 'spring', damping: 15 }}
            />
          ))}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
          
          {/* Animated Light Effect */}
          <motion.div
            className="absolute z-30 w-full h-full opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.3) 0%, transparent 70%)',
              mixBlendMode: 'overlay'
            }}
            animate={{
              x: mousePosition.x * 50,
              y: mousePosition.y * 50
            }}
            transition={{ type: 'spring', damping: 15 }}
          />
        </div>
      </div>
      
      {/* Particles Effect (optional) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          // Usando valores determinísticos baseados no índice
          const left = ((i * 13) % 100);
          const top = ((i * 17) % 100);
          const scale = 1 + ((i * 7) % 3);
          const duration = 3 + ((i * 11) % 3);
          const delay = (i * 0.2) % 5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
                scale: [0, scale, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay
              }}
            />
          );
        })}
      </div>
      
      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2, duration: 0.8 }}
                className="inline-block mr-4"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={buttonLink}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-medium py-4 px-10 rounded-full transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:from-red-700 hover:to-red-800 inline-flex items-center group"
          >
            {buttonText}
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
      >
        <svg className="w-6 h-12 text-white" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="46" rx="11" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="currentColor">
            <animate
              attributeName="cy"
              values="12;24;12"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </motion.div>
    </section>
  );
} 