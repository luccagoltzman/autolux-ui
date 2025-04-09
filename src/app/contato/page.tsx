'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Youtube, Calendar } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';
import AnimatedSection from '@/components/AnimatedSection';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });
  
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setEnviando(true);
    setErro('');
    
    try {
      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Resetar formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
      });
      
      setEnviado(true);
      setTimeout(() => setEnviado(false), 5000);
    } catch (error) {
      setErro('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const infoContato = [
    {
      icon: <MapPin className="h-6 w-6 text-red-500" />,
      titulo: 'Endereço',
      detalhes: 'R. Dois, 75, Balsas - MA, 65800-000',
      acao: 'Ver no mapa',
      link: 'https://www.google.com/maps/place/R.+Dois,+75+-+Balsas,+MA,+65800-000/@-7.4982164,-46.0388681,17z/'
    },
    {
      icon: <Phone className="h-6 w-6 text-red-500" />,
      titulo: 'Telefone',
      detalhes: '(99) 98440-1896',
      acao: 'Ligar agora',
      link: 'tel:99984401896'
    },
    {
      icon: <Mail className="h-6 w-6 text-red-500" />,
      titulo: 'Email',
      detalhes: 'garra.autocenterr@gmail.com',
      acao: 'Enviar email',
      link: 'mailto:garra.autocenterr@gmail.com'
    },
    {
      icon: <Clock className="h-6 w-6 text-red-500" />,
      titulo: 'Horário de Funcionamento',
      detalhes: 'Seg-Sab: 8h-18h',
      acao: 'Agendar visita',
      link: '/agendamento'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Principal */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/contato-banner.jpg')",
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
              Entre em Contato
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fale com a <span className="text-red-500">GARRA</span> Auto Center
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Estamos prontos para atender você e seu veículo com excelência.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16">
        {/* Informações de contato */}
        <AnimatedSection className="mb-16" direction="up" delay={0.2}>
          <div className="text-center mb-10">
            <span className="inline-block bg-red-600/10 text-red-600 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Nossos Canais
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como <span className="text-red-600">falar conosco</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha a forma mais conveniente para entrar em contato. Estamos prontos para atender você!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoContato.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="bg-red-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{info.titulo}</h3>
                <p className="text-gray-600 mb-4">{info.detalhes}</p>
                <Link 
                  href={info.link}
                  className="text-red-600 font-medium flex items-center hover:text-red-700"
                >
                  {info.acao}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Formulário de contato e mapa */}
        <AnimatedSection 
          className="grid md:grid-cols-2 gap-8 mb-16 bg-white rounded-2xl shadow-lg overflow-hidden"
          direction="up"
          delay={0.4}
        >
          {/* Formulário */}
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Envie sua mensagem</h3>
              <p className="text-gray-600">
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Orçamento">Orçamento</option>
                    <option value="Agendamento">Agendamento</option>
                    <option value="Dúvidas">Dúvidas</option>
                    <option value="Reclamação">Reclamação</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  ></textarea>
                </div>
                
                {erro && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {erro}
                  </div>
                )}
                
                {enviado && (
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={enviando}
                  className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium transition-colors 
                    ${enviando ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {enviando ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Mapa */}
          <div className="relative h-[500px] md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8561256323907!2d-46.03886812394566!3d-7.498216374263626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92d1f723ad33717%3A0x4c77ccc40d429cc1!2sR.%20Dois%2C%2075%20-%20Balsas%2C%20MA%2C%2065800-000!5e0!3m2!1spt-BR!2sbr!4v1712684958784!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Atendimento */}
        <AnimatedSection 
          className="mb-16"
          direction="up"
          delay={0.5}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-10 flex flex-col justify-center">
                <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Atendimento Premium</span>
                <h3 className="text-3xl font-bold mt-2 mb-6">Experimente um atendimento diferenciado</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Na GARRA Auto Center, acreditamos que o seu veículo merece o melhor cuidado possível, e você merece uma experiência excepcional.
                  </p>
                  <p>
                    Nossa equipe está pronta para atender todas as suas necessidades, esclarecer dúvidas e oferecer o melhor serviço de estética automotiva da região.
                  </p>
                  <p>
                    Entre em contato conosco ou visite nossa unidade para conhecer nossas instalações e serviços.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary"
                    href="/agendamento"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Visita
                  </Button>
                  <Link 
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-red-600 text-red-600 font-medium hover:bg-red-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] md:h-auto">
                <Image 
                  src="/images/atendimento.jpg" 
                  alt="Atendimento GARRA Auto Center"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Redes Sociais */}
        <AnimatedSection 
          className="text-center"
          direction="up"
          delay={0.6}
        >
          <div className="mb-8">
            <span className="inline-block bg-red-600/10 text-red-600 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Siga Nossas Redes
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Acompanhe nosso trabalho nas <span className="text-red-600">redes sociais</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fique por dentro das novidades, promoções e veja o resultado do nosso trabalho.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="https://www.instagram.com/garra.autocenterr/" target="_blank" className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white">
              <Instagram className="w-8 h-8" />
            </Link>
            <Link href="https://facebook.com" target="_blank" className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-blue-600 hover:text-white">
              <Facebook className="w-8 h-8" />
            </Link>
            <Link href="https://youtube.com" target="_blank" className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-red-600 hover:text-white">
              <Youtube className="w-8 h-8" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
} 