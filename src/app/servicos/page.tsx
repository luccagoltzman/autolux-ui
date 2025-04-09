'use client';

import { useState, useRef } from 'react';
import { useCarrinhoStore, Servico } from '@/store/carrinhoStore';
import Link from 'next/link';
import { ShoppingCart, Filter, Tag, Clock, Search } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/Button';
import AnimatedSection from '@/components/AnimatedSection';

// Mock de dados para os serviços com imagens
const servicos: (Servico & { imagem?: string })[] = [
  {
    id: 1,
    nome: 'Lavagem Premium',
    descricao: 'Limpeza completa interna e externa com produtos de alta qualidade.',
    duracao: '2 horas',
    preco: 80,
    categoria: 'lavagem',
    imagem: '/images/servicos/lavagem.jpg',
  },
  {
    id: 2,
    nome: 'Polimento',
    descricao: 'Restauração do brilho da pintura e remoção de pequenos riscos.',
    duracao: '4 horas',
    preco: 250,
    categoria: 'polimento',
    imagem: '/images/servicos/polimento.jpg',
  },
  {
    id: 3,
    nome: 'Vitrificação de Pintura',
    descricao: 'Proteção da pintura com duração de 6 a 12 meses.',
    duracao: '6 horas',
    preco: 500,
    categoria: 'protecao',
    imagem: '/images/servicos/vitrificacao.jpg',
  },
  {
    id: 4,
    nome: 'Ceramização',
    descricao: 'Proteção cerâmica de longa duração para pintura (2 a 5 anos).',
    duracao: '8 horas',
    preco: 1200,
    categoria: 'protecao',
    imagem: '/images/servicos/ceramica.jpg',
  },
  {
    id: 5,
    nome: 'Higienização Interna',
    descricao: 'Limpeza profunda de estofados, carpetes e plásticos internos.',
    duracao: '3 horas',
    preco: 180,
    categoria: 'interna',
    imagem: '/images/servicos/higienizacao.jpg',
  },
  {
    id: 6,
    nome: 'Limpeza de Motor',
    descricao: 'Limpeza e hidratação dos componentes do compartimento do motor.',
    duracao: '1 hora',
    preco: 120,
    categoria: 'motor',
    imagem: '/images/servicos/motor.jpg',
  },
  {
    id: 7,
    nome: 'Revitalização de Plásticos',
    descricao: 'Restauração da cor e brilho dos plásticos externos.',
    duracao: '2 horas',
    preco: 150,
    categoria: 'externa',
    imagem: '/images/servicos/plasticos.jpg',
  },
  {
    id: 8,
    nome: 'Limpeza de Couro',
    descricao: 'Limpeza, hidratação e proteção dos revestimentos em couro.',
    duracao: '2 horas',
    preco: 200,
    categoria: 'interna',
    imagem: '/images/servicos/couro.jpg',
  },
  {
    id: 9,
    nome: 'Enceramento',
    descricao: 'Aplicação de cera de carnaúba para brilho e proteção imediata.',
    duracao: '1 hora',
    preco: 100,
    categoria: 'protecao',
    imagem: '/images/servicos/enceramento.jpg',
  },
];

// Categorias para filtros
const categorias = [
  { id: 'todos', nome: 'Todos', icon: <Filter className="w-4 h-4" /> },
  { id: 'lavagem', nome: 'Lavagem', icon: <Tag className="w-4 h-4" /> },
  { id: 'polimento', nome: 'Polimento', icon: <Tag className="w-4 h-4" /> },
  { id: 'protecao', nome: 'Proteção de Pintura', icon: <Tag className="w-4 h-4" /> },
  { id: 'interna', nome: 'Estética Interna', icon: <Tag className="w-4 h-4" /> },
  { id: 'externa', nome: 'Estética Externa', icon: <Tag className="w-4 h-4" /> },
  { id: 'motor', nome: 'Motor', icon: <Tag className="w-4 h-4" /> },
];

export default function Servicos() {
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [pesquisa, setPesquisa] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { adicionarAoCarrinho, itens } = useCarrinhoStore();
  
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const servicosFiltrados = servicos.filter(servico => {
    const matchCategoria = filtroCategoria === 'todos' || servico.categoria === filtroCategoria;
    const matchPesquisa = pesquisa === '' || 
      servico.nome.toLowerCase().includes(pesquisa.toLowerCase()) || 
      servico.descricao.toLowerCase().includes(pesquisa.toLowerCase());
    
    return matchCategoria && matchPesquisa;
  });

  const addToCartWithAnimation = (servico: Servico) => {
    adicionarAoCarrinho(servico);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner principal */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/servicos-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white container mx-auto px-4 text-center">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block bg-red-600/30 text-red-400 text-sm font-medium py-1 px-3 rounded-full mb-3">
              Serviços Premium
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos <span className="text-red-500">Serviços</span> de Estética Automotiva
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Encontre o serviço ideal para transformar o visual do seu veículo com nossa linha completa de soluções.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16">
        {/* Barra de pesquisa e filtros */}
        <AnimatedSection 
          className="mb-12 bg-white rounded-xl shadow-lg p-6 sticky top-24 z-30"
          direction="down"
          threshold={0.7}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar serviços..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 transition-colors"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              variant="ghost"
              icon={<Filter className="h-5 w-5" />}
              iconPosition="left"
            >
              Filtros
            </Button>
          </div>
          
          {/* Filtros expandidos */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">Filtrar por categoria:</p>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map(categoria => (
                      <motion.button
                        key={categoria.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                          filtroCategoria === categoria.id
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setFiltroCategoria(categoria.id)}
                      >
                        {categoria.icon}
                        {categoria.nome}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedSection>
        
        {/* Resultados */}
        <AnimatedSection
          className="mt-8 text-center mb-8"
          direction="up"
          delay={0.2}
        >
          <h2 className="text-2xl font-bold mb-2">
            {servicosFiltrados.length === 0 
              ? "Nenhum serviço encontrado" 
              : servicosFiltrados.length === 1 
                ? "1 serviço encontrado" 
                : `${servicosFiltrados.length} serviços encontrados`
            }
          </h2>
          <p className="text-gray-600">
            {filtroCategoria !== 'todos' && `Categoria: ${categorias.find(c => c.id === filtroCategoria)?.nome}`}
          </p>
        </AnimatedSection>
        
        {/* Lista de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {servicosFiltrados.map((servico, index) => (
              <motion.div
                key={servico.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-56 relative overflow-hidden">
                  {servico.imagem ? (
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url('${servico.imagem}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <div className="h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">Imagem Indisponível</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <motion.div
                    className="absolute bottom-4 left-4 z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block bg-red-600/80 text-white text-xs font-medium py-1 px-3 rounded-full backdrop-blur-sm">
                      {categorias.find(c => c.id === servico.categoria)?.nome}
                    </span>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{servico.nome}</h3>
                    <div className="bg-red-600/10 text-red-600 font-bold py-1 px-3 rounded-full text-sm">
                      R$ {servico.preco}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{servico.descricao}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{servico.duracao}</span>
                    </div>
                    
                    <motion.button
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-full flex items-center transition-all hover:shadow-md hover:shadow-red-600/20"
                      onClick={() => addToCartWithAnimation(servico)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Mensagem de "Nenhum resultado" */}
        {servicosFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Search className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Nenhum serviço encontrado</h3>
            <p className="text-gray-500 mb-6">Tente ajustar os filtros ou termos de pesquisa</p>
            <Button onClick={() => {setFiltroCategoria('todos'); setPesquisa('')}}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
      
      {/* Seção CTA */}
      <AnimatedSection
        className="bg-gradient-to-r from-red-700 to-red-500 py-16 relative overflow-hidden"
        threshold={0.3}
        direction="up"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ainda não encontrou o que procura?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
            Entre em contato conosco para uma avaliação personalizada do seu veículo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/agendamento"
              variant="primary"
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
              icon={<Clock className="h-5 w-5" />}
              iconPosition="left"
            >
              Agendar Avaliação
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
      
      {/* Carrinho flutuante */}
      <AnimatePresence>
        {itens.length > 0 && (
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Link
              href="/carrinho"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg flex items-center hover:shadow-xl hover:shadow-red-600/20 transition-all"
            >
              <ShoppingCart className="h-6 w-6 mr-2" />
              <span className="font-bold">{itens.length}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 