'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCarrinhoStore } from '@/store/carrinhoStore';

export default function Header() {
  const itens = useCarrinhoStore((state) => state.itens);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AutoLux
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Início
          </Link>
          <Link href="/servicos" className="text-gray-600 hover:text-blue-600 transition-colors">
            Serviços
          </Link>
          <Link href="/agendamento" className="text-gray-600 hover:text-blue-600 transition-colors">
            Agendamento
          </Link>
        </nav>

        <Link href="/carrinho" className="relative">
          <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
          {itens.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itens.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
} 