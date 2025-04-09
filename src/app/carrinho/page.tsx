'use client';

import { useCarrinhoStore } from '@/store/carrinhoStore';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

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
    let mensagem = 'Olá, gostaria de agendar os seguintes serviços:\n\n';
    
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Seu Carrinho</h1>
      
      {itens.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-6">Seu carrinho está vazio.</p>
          <Link
            href="/servicos"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full inline-flex items-center transition-colors"
          >
            Ver Serviços
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de itens no carrinho */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Serviços Selecionados</h2>
              </div>
              
              <div>
                {itens.map((item, index) => (
                  <div key={index} className="p-6 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{item.nome}</h3>
                      <p className="text-gray-600">{item.descricao}</p>
                      <p className="text-sm text-gray-500 mt-1">Duração: {item.duracao}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-blue-600">{formatarPreco(item.preco)}</span>
                      <button
                        onClick={() => removerDoCarrinho(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50 flex justify-between items-center">
                <button
                  onClick={limparCarrinho}
                  className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                >
                  Limpar Carrinho
                </button>
                <div className="text-xl font-bold">
                  Total: {formatarPreco(totalCarrinho())}
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulário de agendamento */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Dados para Agendamento</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={inputNome}
                    onChange={(e) => setInputNome(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telefone">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    value={inputTelefone}
                    onChange={(e) => setInputTelefone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(99) 99999-9999"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="data">
                    Preferência de Data e Horário (opcional)
                  </label>
                  <input
                    type="text"
                    id="data"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 25/05 entre 14h e 17h"
                  />
                </div>
                
                <div className="pt-4">
                  <a
                    href={`https://wa.me/5599999999999?text=${construirMensagemWhatsApp()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full flex justify-center items-center transition-colors ${
                      !inputNome || !inputTelefone ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={(e) => {
                      if (!inputNome || !inputTelefone) {
                        e.preventDefault();
                        alert('Por favor, preencha seu nome e telefone para prosseguir.');
                      }
                    }}
                  >
                    <span className="mr-2">Enviar via WhatsApp</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Ao enviar, você será redirecionado para o WhatsApp para finalizar seu agendamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 