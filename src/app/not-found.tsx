import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-xl mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        href="/" 
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
      >
        Voltar à página inicial
      </Link>
    </div>
  );
} 