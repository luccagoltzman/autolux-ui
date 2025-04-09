'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  price?: string;
  duration?: string;
  category?: string;
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  imageUrl,
  link,
  price,
  duration,
  category,
  index = 0
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative h-full overflow-hidden rounded-2xl group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Fundo do card com efeito de zoom suave */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="relative w-full h-full"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            quality={90}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
      </div>
      
      {/* Overlay gradiente */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"
        animate={{ 
          opacity: isHovered ? 0.9 : 0.7,
          background: isHovered 
            ? 'linear-gradient(to top, rgba(0,0,0,1), rgba(220,38,38,0.7), rgba(0,0,0,0))' 
            : 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6), rgba(0,0,0,0))'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Badge de categoria */}
      {category && (
        <div className="absolute top-4 left-4 z-20">
          <motion.span 
            className="inline-block bg-red-600/80 text-white text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {category}
          </motion.span>
        </div>
      )}
      
      {/* Conteúdo do card */}
      <motion.div 
        className="relative z-20 flex flex-col h-full p-6 justify-end"
        style={{ minHeight: '280px' }}
      >
        <motion.h3 
          className="text-xl font-bold text-white mb-2"
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0.7, height: isHovered ? 'auto' : '0px' }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden ${!isHovered ? 'mb-0' : 'mb-4'}`}
        >
          <p className="text-gray-200 text-sm">{description}</p>
        </motion.div>
        
        {/* Detalhes do serviço */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-4">
            {price && (
              <motion.div 
                className="flex items-center text-white"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-medium">A partir de</span>
                <span className="text-lg font-bold ml-1">{price}</span>
              </motion.div>
            )}
            
            {duration && (
              <div className="flex items-center text-gray-300 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration}
              </div>
            )}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href={link} aria-label={`Saiba mais sobre ${title}`}>
              <motion.div 
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg"
                animate={{ 
                  backgroundColor: isHovered ? '#ef4444' : '#991b1b',
                  boxShadow: isHovered ? '0 0 15px rgba(239,68,68,0.5)' : 'none'
                }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </div>
        
        {/* Botão de "Saiba mais" escondido que aparece no hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          <Link href={link} className="z-30">
            <motion.button
              className="bg-white/90 backdrop-blur text-red-600 font-medium py-2 px-4 rounded-full hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Saiba mais
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 