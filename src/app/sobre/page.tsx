'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Calendar, Award, ThumbsUp, BarChart, Check } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';
import AnimatedSection from '@/components/AnimatedSection';

export default function SobreNos() {
  const valores = [
    {
      icon: <Award className="w-10 h-10 text-red-500" />,
      titulo: "Excelência",
      descricao: "Buscamos a perfeição em cada detalhe do nosso trabalho, sempre com o compromisso de superar as expectativas dos nossos clientes."
    },
    {
      icon: <ThumbsUp className="w-10 h-10 text-red-500" />,
      titulo: "Confiança",
      descricao: "Construímos relacionamentos duradouros baseados na transparência e honestidade em todos os nossos serviços."
    },
    {
      icon: <Users className="w-10 h-10 text-red-500" />,
      titulo: "Respeito",
      descricao: "Valorizamos cada cliente e colaborador, tratando a todos com respeito e dignidade, independentemente da situação."
    }
  ];
  
  const metricas = [
    { numero: "5+", texto: "Anos de Experiência" },
    { numero: "3000+", texto: "Clientes Satisfeitos" },
    { numero: "10000+", texto: "Veículos Atendidos" },
    { numero: "12", texto: "Especialistas" }
  ];
  
  const diferenciais = [
    "Equipe altamente qualificada",
    "Uso de produtos premium e ecológicos",
    "Atendimento personalizado",
    "Garantia em todos os serviços",
    "Agendamento flexível",
    "Instalações modernas"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner principal */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/sobre-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block bg-red-600/30 text-red-400 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Conheça Nossa História
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sobre a <span className="text-red-500">GARRA</span> Auto Center
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Mais do que uma empresa de estética automotiva, somos apaixonados por transformar veículos.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16">
        {/* Seção Nossa História */}
        <AnimatedSection 
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16"
          direction="up"
          delay={0.2}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 flex flex-col justify-center">
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Nossa História</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Excelência em estética automotiva desde 2018</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fundada com a paixão por carros e a missão de proporcionar cuidados de altíssima qualidade para veículos, a GARRA Auto Center nasceu do sonho de um jovem empreendedor apaixonado pelo universo automotivo.
                </p>
                <p>
                  Com início modesto em 2018, nossa trajetória foi construída com dedicação, aprendizado constante e compromisso inabalável com a satisfação dos clientes. O que começou com serviços básicos de lavagem, rapidamente evoluiu para uma gama completa de tratamentos estéticos automotivos de alto padrão.
                </p>
                <p>
                  Hoje, orgulhamo-nos de ter nos tornado referência em estética automotiva, transformando não apenas a aparência dos veículos, mas proporcionando experiências memoráveis para nossos clientes.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] md:h-auto overflow-hidden md:order-last">
              <div className="absolute inset-0 bg-black/30 z-10 md:hidden"></div>
              <Image 
                src="/images/historia.jpg" 
                alt="História da GARRA Auto Center"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-red-600 p-6 z-10 hidden md:block">
                <div className="text-white font-bold text-4xl">5+</div>
                <div className="text-white text-sm">Anos de experiência</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Seção Valores */}
        <AnimatedSection
          className="mb-16"
          direction="up"
          delay={0.3}
        >
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/10 text-red-600 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Nossos Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Princípios que nos <span className="text-red-600">orientam</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estes valores fundamentais nos guiam em todas as nossas ações e decisões, formando a base da cultura da nossa empresa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-600"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  {valor.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{valor.titulo}</h3>
                <p className="text-gray-600">{valor.descricao}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Seção Métricas */}
        <AnimatedSection
          className="relative py-16 mb-16 rounded-2xl overflow-hidden"
          direction="up"
          delay={0.4}
          threshold={0.2}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900"></div>
          <div className="absolute inset-0 opacity-10 bg-pattern-dots"></div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metricas.map((metrica, index) => (
                <motion.div
                  key={index}
                  className="text-center text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-3">{metrica.numero}</div>
                  <div className="text-sm md:text-base opacity-80">{metrica.texto}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* Seção Nossa Equipe */}
        <AnimatedSection
          className="mb-16"
          direction="up"
          delay={0.5}
        >
          <div className="text-center mb-12">
            <span className="inline-block bg-red-600/10 text-red-600 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Nossa Equipe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conheça nossos <span className="text-red-600">especialistas</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Com formação técnica e constante aperfeiçoamento, nossa equipe é composta por verdadeiros apaixonados pelo mundo automotivo.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg group"
                whileHover={{ y: -5 }}
              >
                <div className="h-80 relative overflow-hidden">
                  <Image 
                    src={`/images/team-${index + 1}.jpg`}
                    alt={`Membro da equipe ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform">
                    <h4 className="font-bold text-lg">{["João Silva", "Maria Oliveira", "Carlos Santos", "Ana Pereira"][index]}</h4>
                    <p className="text-sm opacity-90">{["Especialista em Polimento", "Ceramização", "Higienização", "Revitalização"][index]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Seção Por que nos escolher */}
        <AnimatedSection
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16"
          direction="up"
          delay={0.6}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 flex flex-col justify-center md:order-last">
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Nossos Diferenciais</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Por que escolher a GARRA Auto Center?</h2>
              
              <div className="space-y-4">
                {diferenciais.map((diferencial, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-red-100 rounded-full p-1 mr-3">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <span className="text-gray-700">{diferencial}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  href="/servicos"
                  variant="primary"
                >
                  Nossos Serviços
                </Button>
                <Button
                  href="/agendamento"
                  variant="outline"
                >
                  Agendar Visita
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-auto">
              <Image 
                src="/images/diferenciais.jpg" 
                alt="Diferenciais da GARRA Auto Center"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimatedSection>
        
        {/* Seção CTA */}
        <AnimatedSection
          className="bg-gradient-to-r from-red-700 to-red-500 rounded-2xl overflow-hidden shadow-xl"
          direction="up"
          delay={0.7}
        >
          <div className="p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar seu veículo?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Agende agora mesmo e descubra a diferença de um atendimento premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/agendamento"
                variant="primary"
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                Agendar Agora
              </Button>
              <Button
                href="/contato"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
} 