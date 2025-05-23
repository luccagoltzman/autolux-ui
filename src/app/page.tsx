'use client';

import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import ServiceCard from "@/components/ServiceCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Dados dos serviços
const servicos = [
  {
    id: 1,
    title: "Lavagem Premium",
    description: "Limpeza completa interna e externa com produtos de alta qualidade.",
    imageUrl: "/images/banner-temp.svg",
    link: "/servicos#lavagem",
    price: "R$ 120",
    duration: "2h",
    category: "Limpeza"
  },
  {
    id: 2,
    title: "Polimento",
    description: "Restaure o brilho da pintura do seu veículo e elimine riscos e imperfeições.",
    imageUrl: "/images/banner-temp.svg",
    link: "/servicos#polimento",
    price: "R$ 350",
    duration: "4h",
    category: "Detalhamento"
  },
  {
    id: 3,
    title: "Proteção de Pintura",
    description: "Vitrificação e ceramização para proteção duradoura da pintura do seu veículo.",
    imageUrl: "/images/banner-temp.svg",
    link: "/servicos#protecao",
    price: "R$ 900",
    duration: "8h",
    category: "Proteção"
  }
];

// Dados dos diferenciais
const diferenciais = [
  {
    icon: "✓",
    title: "Profissionais Experientes",
    description: "Nossa equipe é treinada e especializada em estética automotiva."
  },
  {
    icon: "★",
    title: "Produtos Premium",
    description: "Utilizamos apenas produtos de alta qualidade nas nossas aplicações."
  },
  {
    icon: "⏱",
    title: "Agendamento Fácil",
    description: "Marque seu horário online e receba confirmação imediata."
  },
  {
    icon: "♥",
    title: "Satisfação Garantida",
    description: "Compromisso com a qualidade e satisfação dos clientes."
  }
];

export default function Home() {
  // Refs para animações baseadas em scroll
  const servicosRef = useRef(null);
  const diferenciaisRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Verificação de visibilidade dos elementos
  const servicosInView = useInView(servicosRef, { once: false, amount: 0.2 });
  const diferenciaisInView = useInView(diferenciaisRef, { once: false, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.5 });
  
  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <>
      {/* Banner Principal */}
      <HeroBanner />
      
      {/* Serviços */}
      <motion.section 
        className="py-20 bg-gray-50"
        ref={servicosRef}
        initial="hidden"
        animate={servicosInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-xl mx-auto text-center mb-12"
            variants={itemVariants}
          >
            <span className="inline-block bg-red-600/10 text-red-600 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Nossos Serviços
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforme seu veículo com nossos <span className="text-red-600">serviços premium</span>
            </h2>
            <p className="text-gray-800">
              Oferecemos uma linha completa de serviços de estética automotiva para manter seu veículo sempre impecável.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicos.map((servico, index) => (
              <ServiceCard
                key={servico.id}
                title={servico.title}
                description={servico.description}
                imageUrl={servico.imageUrl}
                link={servico.link}
                price={servico.price}
                duration={servico.duration}
                category={servico.category}
                index={index}
              />
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <Link
              href="/servicos"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:from-red-700 hover:to-red-800 inline-flex items-center group"
            >
              Ver Todos os Serviços
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Por que nos escolher */}
      <motion.section 
        className="py-20 relative"
        ref={diferenciaisRef}
        initial="hidden"
        animate={diferenciaisInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Background com efeito parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-fixed z-0"
            style={{ 
              backgroundImage: "url('/images/bg-diferenciais.jpg')",
              backgroundPosition: "center"
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-white">
          <motion.div 
            className="max-w-xl mx-auto text-center mb-12"
            variants={itemVariants}
          >
            <span className="inline-block bg-red-600/30 text-red-400 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Por Que Nos Escolher
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nos <span className="text-red-500">diferencia</span>
            </h2>
            <p className="text-gray-300">
              Nossa equipe e processos são pensados para oferecer a melhor experiência ao seu veículo.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((diferencial, index) => (
              <motion.div 
                key={index}
                className="relative p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-600/20">
                  <span className="text-2xl text-white">{diferencial.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{diferencial.title}</h3>
                <p className="text-gray-300 text-center">
                  {diferencial.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Depoimentos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="inline-block bg-red-600/10 text-red-600 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos <span className="text-red-600">clientes dizem</span>
            </h2>
            <p className="text-gray-800">
              A satisfação dos nossos clientes é o nosso maior orgulho. Confira alguns depoimentos.
            </p>
          </div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-red-700 to-red-500 relative overflow-hidden"
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated circles */}
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full border border-white/20"
              style={{
                width: `${(index + 1) * 100}px`,
                height: `${(index + 1) * 100}px`,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                opacity: 0.3 - index * 0.05,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            variants={itemVariants}
          >
            Pronto para transformar seu veículo?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto text-white opacity-90"
            variants={itemVariants}
          >
            Agende agora mesmo seu horário e descubra a diferença de um serviço premium.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/agendamento"
              className="bg-white text-red-600 hover:bg-gray-100 font-medium py-4 px-10 rounded-full transition-colors inline-flex items-center shadow-xl shadow-red-700/20 group"
            >
              Agendar Agora
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
