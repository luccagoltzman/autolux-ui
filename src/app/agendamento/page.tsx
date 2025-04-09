'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Agendamento() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    data: '',
    horario: '',
    veiculo: '',
    mensagem: '',
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');

    try {
      // Verificar se os campos obrigatórios estão preenchidos
      if (!formData.nome || !formData.telefone || !formData.data || !formData.horario) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }

      // Tentar inserir dados no Supabase (com tratamento de erro para ambiente de desenvolvimento)
      try {
        const { error } = await supabase
          .from('agendamentos')
          .insert([
            {
              nome: formData.nome,
              telefone: formData.telefone,
              email: formData.email || null,
              data_agendamento: formData.data,
              horario: formData.horario,
              veiculo: formData.veiculo || null,
              mensagem: formData.mensagem || null,
              status: 'pendente'
            }
          ]);
        
        if (error) {
          console.error('Erro ao inserir no Supabase:', error);
          // Em ambiente de desenvolvimento, continuamos mesmo com erro do Supabase
          if (process.env.NODE_ENV !== 'development') {
            throw error;
          }
        }
      } catch (supabaseError) {
        console.error('Erro ao acessar Supabase:', supabaseError);
        // Em ambiente de desenvolvimento, continuamos mesmo com erro do Supabase
        if (process.env.NODE_ENV !== 'development') {
          throw supabaseError;
        }
      }

      // Construir mensagem do WhatsApp
      let mensagemWhatsApp = `Olá, gostaria de agendar um horário na GARRA Auto Center.\n\n`;
      mensagemWhatsApp += `Nome: ${formData.nome}\n`;
      mensagemWhatsApp += `Telefone: ${formData.telefone}\n`;
      mensagemWhatsApp += `Data: ${formData.data}\n`;
      mensagemWhatsApp += `Horário: ${formData.horario}\n`;
      
      if (formData.veiculo) {
        mensagemWhatsApp += `Veículo: ${formData.veiculo}\n`;
      }
      
      if (formData.mensagem) {
        mensagemWhatsApp += `\nMensagem adicional: ${formData.mensagem}`;
      }

      // Redirecionar para o WhatsApp
      window.open(
        `https://wa.me/5599999999999?text=${encodeURIComponent(mensagemWhatsApp)}`,
        '_blank'
      );

      setSucesso(true);
      
      // Limpar formulário
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        data: '',
        horario: '',
        veiculo: '',
        mensagem: '',
      });

    } catch (error: any) {
      setErro(error.message || 'Ocorreu um erro ao processar seu agendamento. Por favor, tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const horarios = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Agende seu Atendimento</h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-red-600 text-white p-6">
          <h2 className="text-xl font-bold">Preencha o formulário abaixo</h2>
          <p className="mt-2">Encontre o melhor horário para cuidar do seu veículo</p>
        </div>
        
        {sucesso ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">✓</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Agendamento Enviado!</h3>
            <p className="text-gray-600 mb-6">
              Sua solicitação foi enviada com sucesso. Em breve entraremos em contato para confirmar seu horário.
            </p>
            <button
              onClick={() => setSucesso(false)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full transition-colors"
            >
              Fazer Novo Agendamento
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {erro}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telefone">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="(99) 99999-9999"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                E-mail (opcional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="exemplo@email.com"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="data">
                  Data Preferida *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="horario">
                  Horário Preferido *
                </label>
                <div className="relative">
                  <select
                    id="horario"
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {horarios.map(horario => (
                      <option key={horario} value={horario}>
                        {horario}
                      </option>
                    ))}
                  </select>
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="veiculo">
                Veículo (opcional)
              </label>
              <input
                type="text"
                id="veiculo"
                name="veiculo"
                value={formData.veiculo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Marca, modelo e ano do veículo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mensagem">
                Mensagem Adicional (opcional)
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Informe aqui serviços específicos que deseja ou qualquer outra informação importante"
              ></textarea>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={enviando}
                className={`w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full flex justify-center items-center transition-colors ${
                  enviando ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {enviando ? (
                  <span>Processando...</span>
                ) : (
                  <>
                    <span className="mr-2">Agendar Atendimento</span>
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Ao agendar, você será redirecionado para o WhatsApp para confirmar seu horário.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 