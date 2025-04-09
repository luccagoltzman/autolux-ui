import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Banner Principal */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Estética Automotiva Premium</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Transforme seu veículo com nossos serviços de estética automotiva de alta qualidade
          </p>
          <Link
            href="/servicos"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-8 rounded-full transition-colors"
          >
            Ver Serviços
          </Link>
        </div>
      </section>

      {/* Destaques de Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Lavagem Premium</h3>
                <p className="text-gray-600 mb-4">
                  Limpeza completa interna e externa com produtos de alta qualidade.
                </p>
                <Link
                  href="/servicos#lavagem"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Polimento</h3>
                <p className="text-gray-600 mb-4">
                  Restaure o brilho da pintura do seu veículo e elimine riscos e imperfeições.
                </p>
                <Link
                  href="/servicos#polimento"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Proteção de Pintura</h3>
                <p className="text-gray-600 mb-4">
                  Vitrificação e ceramização para proteção duradoura da pintura.
                </p>
                <Link
                  href="/servicos#protecao"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/servicos"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Ver Todos os Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* Por que nos escolher */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por Que Nos Escolher?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Profissionais Experientes</h3>
              <p className="text-gray-600">
                Nossa equipe é treinada e especializada em estética automotiva.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">★</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Produtos Premium</h3>
              <p className="text-gray-600">
                Utilizamos apenas produtos de alta qualidade nas nossas aplicações.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">⏱</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Agendamento Fácil</h3>
              <p className="text-gray-600">
                Marque seu horário online e receba confirmação imediata.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">♥</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Satisfação Garantida</h3>
              <p className="text-gray-600">
                Compromisso com a qualidade e satisfação dos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Nossos Clientes Dizem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Serviço impecável! Meu carro ficou como novo. Recomendo a todos que buscam qualidade."
              </p>
              <p className="font-bold">Carlos Silva</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Atendimento excelente e resultado surpreendente. O polimento removeu todos os riscos da pintura."
              </p>
              <p className="font-bold">Ana Oliveira</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Fiz a vitrificação há 6 meses e a pintura continua protegida e brilhando. Vale cada centavo!"
              </p>
              <p className="font-bold">Marcos Pereira</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar seu veículo?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agende agora mesmo seu horário e descubra a diferença de um serviço premium.
          </p>
          <Link
            href="/agendamento"
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-colors inline-block"
          >
            Agendar Agora
          </Link>
        </div>
      </section>
    </>
  );
}
