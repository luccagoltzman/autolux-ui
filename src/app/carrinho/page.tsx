'use client';

import { useCarrinhoStore } from '@/store/carrinhoStore';
import Link from 'next/link';
import { Trash2, ArrowRight, ShoppingCart, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/Button';

export default function Carrinho() {
  const { itens, removerDoCarrinho, limparCarrinho, totalCarrinho } = useCarrinhoStore();
  const [inputNome, setInputNome] = useState('');
  const [inputTelefone, setInputTelefone] = useState('');
  const [inputData, setInputData] = useState('');

  // Formatação de preços
  const formatarPreco = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Construir mensagem do WhatsApp
  const construirMensagemWhatsApp = () => {
    let mensagem = 'Olá, gostaria de agendar os seguintes serviços na GARRA Auto Center:\n\n';
    
    itens.forEach(item => {
      mensagem += `- ${item.nome} - ${formatarPreco(item.preco)}\n`;
    });
    
    mensagem += `\nTotal: ${formatarPreco(totalCarrinho())}\n\n`;
    mensagem += `Nome: ${inputNome}\n`;
    mensagem += `Telefone: ${inputTelefone}\n`;
    
    if (inputData) {
      mensagem += `Preferência de data: ${inputData}`;
    }
    
    return encodeURIComponent(mensagem);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner principal */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/carrinho-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block bg-red-600/30 text-red-400 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Carrinho de Serviços
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Seu <span className="text-red-500">Carrinho</span> de Serviços
            </h1>
            <p className="text-lg text-gray-100 max-w-xl mx-auto">
              Revise os serviços selecionados e agende seu atendimento com facilidade.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16">
        {itens.length === 0 ? (
          <AnimatedSection 
            className="bg-white rounded-2xl shadow-lg p-16 text-center"
            direction="up"
            delay={0.2}
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-50 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <ShoppingCart className="h-8 w-8 text-red-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Seu carrinho está vazio</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
              Adicione serviços ao seu carrinho para continuar com o agendamento.
            </p>
            <Button
              href="/servicos"
              variant="primary"
              size="lg"
              icon={<ShoppingCart className="h-5 w-5" />}
              iconPosition="left"
            >
              Ver Serviços Disponíveis
            </Button>
          </AnimatedSection>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de itens no carrinho */}
            <div className="lg:w-2/3">
              <AnimatedSection 
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                direction="left"
                delay={0.2}
              >
                <div className="p-6 border-b bg-gradient-to-r from-red-700 to-red-600 text-white">
                  <h2 className="text-xl font-bold">Serviços Selecionados</h2>
                </div>
                
                <div>
                  {itens.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="p-6 border-b flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <div>
                        <h3 className="font-bold text-lg">{item.nome}</h3>
                        <p className="text-gray-600 font-medium">{item.descricao}</p>
                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-red-500" />
                          Duração: {item.duracao}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-red-600">{formatarPreco(item.preco)}</span>
                        <motion.button
                          onClick={() => removerDoCarrinho(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                          aria-label="Remover item"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Button
                    onClick={limparCarrinho}
                    variant="ghost"
                    className="text-red-600"
                    icon={<Trash2 className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Limpar Carrinho
                  </Button>
                  <div className="text-xl font-bold">
                    Total: <span className="text-red-600">{formatarPreco(totalCarrinho())}</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Formulário de agendamento */}
            <div className="lg:w-1/3">
              <AnimatedSection 
                className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24"
                direction="right"
                delay={0.4}
              >
                <div className="p-6 border-b bg-gradient-to-r from-red-700 to-red-600 text-white">
                  <h2 className="text-xl font-bold">Dados para Agendamento</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="nome"
                        value={inputNome}
                        onChange={(e) => setInputNome(e.target.value)}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Seu nome completo"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telefone">
                      WhatsApp
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="telefone"
                        value={inputTelefone}
                        onChange={(e) => setInputTelefone(e.target.value)}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="(99) 99999-9999"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="data">
                      Preferência de Data e Horário (opcional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="data"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Ex: 25/05 entre 14h e 17h"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Link
                      href={`https://wa.me/5599984401896?text=${construirMensagemWhatsApp()}`}
                      target="_blank"
                      className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-medium flex justify-center items-center transition-colors shadow-md hover:shadow-lg ${
                        !inputNome || !inputTelefone ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-700 hover:to-red-800'
                      }`}
                      onClick={(e) => {
                        if (!inputNome || !inputTelefone) {
                          e.preventDefault();
                          alert('Por favor, preencha seu nome e telefone para prosseguir.');
                        }
                      }}
                    >
                      <span className="mr-2">Finalizar via WhatsApp</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <p className="text-sm text-gray-600 mt-3 text-center font-medium">
                      Ao enviar, você será redirecionado para o WhatsApp para finalizar seu agendamento.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        )}
        
        {/* Seção CTA */}
        {itens.length > 0 && (
          <AnimatedSection
            className="bg-gray-900 rounded-2xl shadow-xl p-10 mt-16 text-white text-center"
            direction="up"
            delay={0.5}
          >
            <h2 className="text-2xl font-bold mb-4">Deseja adicionar mais serviços?</h2>
            <p className="mb-6 text-gray-100 max-w-2xl mx-auto">
              Explore nossa gama completa de serviços e encontre a solução perfeita para seu veículo.
            </p>
            <Button
              href="/servicos"
              variant="primary"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Ver Mais Serviços
            </Button>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
} 