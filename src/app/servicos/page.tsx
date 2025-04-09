'use client';

import { useState } from 'react';
import { useCarrinhoStore, Servico } from '@/store/carrinhoStore';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

// Mock de dados para os serviços
const servicos: Servico[] = [
  {
    id: 1,
    nome: 'Lavagem Premium',
    descricao: 'Limpeza completa interna e externa com produtos de alta qualidade.',
    duracao: '2 horas',
    preco: 80,
    categoria: 'lavagem',
  },
  {
    id: 2,
    nome: 'Polimento',
    descricao: 'Restauração do brilho da pintura e remoção de pequenos riscos.',
    duracao: '4 horas',
    preco: 250,
    categoria: 'polimento',
  },
  {
    id: 3,
    nome: 'Vitrificação de Pintura',
    descricao: 'Proteção da pintura com duração de 6 a 12 meses.',
    duracao: '6 horas',
    preco: 500,
    categoria: 'protecao',
  },
  {
    id: 4,
    nome: 'Ceramização',
    descricao: 'Proteção cerâmica de longa duração para pintura (2 a 5 anos).',
    duracao: '8 horas',
    preco: 1200,
    categoria: 'protecao',
  },
  {
    id: 5,
    nome: 'Higienização Interna',
    descricao: 'Limpeza profunda de estofados, carpetes e plásticos internos.',
    duracao: '3 horas',
    preco: 180,
    categoria: 'interna',
  },
  {
    id: 6,
    nome: 'Limpeza de Motor',
    descricao: 'Limpeza e hidratação dos componentes do compartimento do motor.',
    duracao: '1 hora',
    preco: 120,
    categoria: 'motor',
  },
  {
    id: 7,
    nome: 'Revitalização de Plásticos',
    descricao: 'Restauração da cor e brilho dos plásticos externos.',
    duracao: '2 horas',
    preco: 150,
    categoria: 'externa',
  },
  {
    id: 8,
    nome: 'Limpeza de Couro',
    descricao: 'Limpeza, hidratação e proteção dos revestimentos em couro.',
    duracao: '2 horas',
    preco: 200,
    categoria: 'interna',
  },
  {
    id: 9,
    nome: 'Enceramento',
    descricao: 'Aplicação de cera de carnaúba para brilho e proteção imediata.',
    duracao: '1 hora',
    preco: 100,
    categoria: 'protecao',
  },
];

// Categorias para filtros
const categorias = [
  { id: 'todos', nome: 'Todos' },
  { id: 'lavagem', nome: 'Lavagem' },
  { id: 'polimento', nome: 'Polimento' },
  { id: 'protecao', nome: 'Proteção de Pintura' },
  { id: 'interna', nome: 'Estética Interna' },
  { id: 'externa', nome: 'Estética Externa' },
  { id: 'motor', nome: 'Motor' },
];

export default function Servicos() {
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const { adicionarAoCarrinho, itens } = useCarrinhoStore();

  const servicosFiltrados = filtroCategoria === 'todos'
    ? servicos
    : servicos.filter(servico => servico.categoria === filtroCategoria);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Nossos Serviços</h1>
      
      {/* Filtros de categorias */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categorias.map(categoria => (
          <button
            key={categoria.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filtroCategoria === categoria.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFiltroCategoria(categoria.id)}
          >
            {categoria.nome}
          </button>
        ))}
      </div>
      
      {/* Lista de serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicosFiltrados.map(servico => (
          <div
            key={servico.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="h-40 bg-gray-300"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{servico.nome}</h3>
                <span className="text-blue-600 font-bold">R$ {servico.preco}</span>
              </div>
              <p className="text-gray-600 mb-4">{servico.descricao}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Duração: {servico.duracao}</span>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center transition-colors"
                  onClick={() => adicionarAoCarrinho(servico)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Carrinho flutuante */}
      {itens.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <Link
            href="/carrinho"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center transition-colors"
          >
            <ShoppingCart className="h-6 w-6 mr-2" />
            <span className="font-bold">{itens.length}</span>
          </Link>
        </div>
      )}
    </div>
  );
} 