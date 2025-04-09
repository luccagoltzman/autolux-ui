'use client';

import { useState, useRef } from 'react';
import { Calendar, Clock, Send, Car, Check, Mail, Phone, User, MessageSquare, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Button from '@/components/Button';
import AnimatedSection from '@/components/AnimatedSection';

export default function Agendamento() {
  const [formStep, setFormStep] = useState(1);
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
  
  const formRef = useRef(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const nextStep = () => {
    // Validar campos da primeira etapa
    if (formStep === 1) {
      if (!formData.nome || !formData.telefone) {
        setErro('Por favor, preencha seu nome e telefone para continuar.');
        return;
      }
      setErro('');
    }
    setFormStep(formStep + 1);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
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
        `https://wa.me/5599984401896?text=${encodeURIComponent(mensagemWhatsApp)}`,
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
      setFormStep(1);

    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Ocorreu um erro ao processar seu agendamento. Por favor, tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const horarios = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  // Benefícios do agendamento
  const beneficios = [
    {
      icon: <Clock className="h-8 w-8 text-red-500" />,
      titulo: "Economia de Tempo",
      descricao: "Seu veículo será atendido na hora marcada, sem esperas desnecessárias."
    },
    {
      icon: <Check className="h-8 w-8 text-red-500" />,
      titulo: "Atendimento Personalizado",
      descricao: "Preparamos tudo com antecedência para melhor atender suas necessidades."
    },
    {
      icon: <Car className="h-8 w-8 text-red-500" />,
      titulo: "Avaliação Detalhada",
      descricao: "Seu veículo receberá uma avaliação completa antes do início dos serviços."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Banner principal */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/agendamento-banner.jpg')",
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
              Agendamento
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Agende seu <span className="text-red-500">Atendimento</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Economize tempo e garanta o melhor cuidado para seu veículo com nosso sistema de agendamento.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Coluna do formulário */}
          <div className="flex-1 w-full">
            <AnimatedSection
              direction="up"
              delay={0.2}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10"
            >
              <div ref={formRef} className="w-full">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
                  <h2 className="text-2xl font-bold">Preencha o formulário</h2>
                  <p className="mt-2 text-white/80">Encontre o melhor horário para cuidar do seu veículo</p>
                  
                  {/* Indicador de etapas */}
                  <div className="mt-6 flex items-center">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${formStep === 1 ? 'bg-white text-red-600' : 'bg-white/30 text-white'}`}
                      animate={{ scale: formStep === 1 ? 1.1 : 1 }}
                    >
                      1
                    </motion.div>
                    <div className={`h-1 w-10 mx-1 ${formStep > 1 ? 'bg-white' : 'bg-white/30'}`}></div>
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${formStep === 2 ? 'bg-white text-red-600' : 'bg-white/30 text-white'}`}
                      animate={{ scale: formStep === 2 ? 1.1 : 1 }}
                    >
                      2
                    </motion.div>
                    <div className={`h-1 w-10 mx-1 ${formStep > 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${formStep === 3 ? 'bg-white text-red-600' : 'bg-white/30 text-white'}`}
                      animate={{ scale: formStep === 3 ? 1.1 : 1 }}
                    >
                      3
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                {sucesso ? (
                  <motion.div
                    key="sucesso"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8 text-center"
                  >
                    <motion.div 
                      className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <Check className="h-10 w-10 text-red-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">Agendamento Enviado!</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Sua solicitação foi enviada com sucesso. Em breve entraremos em contato para confirmar seu horário.
                    </p>
                    <Button
                      onClick={() => setSucesso(false)}
                      variant="primary"
                      size="lg"
                    >
                      Fazer Novo Agendamento
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8">
                    {erro && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6"
                      >
                        {erro}
                      </motion.div>
                    )}
                    
                    <AnimatePresence mode="wait">
                      {formStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h3>
                          
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">
                              Nome Completo *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                placeholder="Seu nome completo"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telefone">
                              WhatsApp *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                id="telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                placeholder="(99) 99999-9999"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                              E-mail (opcional)
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                placeholder="exemplo@email.com"
                              />
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <Button 
                              type="button" 
                              onClick={nextStep}
                              icon={<ChevronRight className="h-5 w-5" />}
                              fullWidth
                            >
                              Próximo Passo
                            </Button>
                          </div>
                        </motion.div>
                      )}
                      
                      {formStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quando deseja ser atendido?</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="data">
                                Data Preferida *
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  type="date"
                                  id="data"
                                  name="data"
                                  value={formData.data}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="relative">
                              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="horario">
                                Horário Preferido *
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Clock className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                  id="horario"
                                  name="horario"
                                  value={formData.horario}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors appearance-none"
                                  required
                                >
                                  <option value="">Selecione um horário</option>
                                  {horarios.map(horario => (
                                    <option key={horario} value={horario}>
                                      {horario}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="veiculo">
                              Veículo (opcional)
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Car className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="veiculo"
                                name="veiculo"
                                value={formData.veiculo}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                placeholder="Ex: Honda Civic 2020"
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                              type="button" 
                              onClick={prevStep}
                              variant="outline"
                              className="flex-1"
                            >
                              Voltar
                            </Button>
                            <Button 
                              type="button" 
                              onClick={nextStep}
                              className="flex-1"
                              icon={<ChevronRight className="h-5 w-5" />}
                            >
                              Próximo Passo
                            </Button>
                          </div>
                        </motion.div>
                      )}
                      
                      {formStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Adicionais</h3>
                          
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mensagem">
                              Mensagem (opcional)
                            </label>
                            <div className="relative">
                              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                <MessageSquare className="h-5 w-5 text-gray-400" />
                              </div>
                              <textarea
                                id="mensagem"
                                name="mensagem"
                                value={formData.mensagem}
                                onChange={handleChange}
                                rows={5}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                placeholder="Descreva o serviço desejado ou forneça informações adicionais"
                              ></textarea>
                            </div>
                          </div>
                          
                          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Clock className="h-4 w-4" /> Horário de Funcionamento
                            </h4>
                            <p className="mt-1 text-sm">
                              Segunda a Sexta: 08:00 às 18:00 • Sábado: 08:00 às 12:00
                            </p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                              type="button" 
                              onClick={prevStep}
                              variant="outline"
                              className="flex-1"
                            >
                              Voltar
                            </Button>
                            <Button 
                              type="submit"
                              className="flex-1"
                              loading={enviando}
                              icon={<Send className="h-5 w-5" />}
                            >
                              {enviando ? 'Enviando...' : 'Finalizar Agendamento'}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                )}
              </AnimatePresence>
            </AnimatedSection>
          </div>
          
          {/* Coluna de informações e benefícios */}
          <div className="lg:w-1/3 w-full">
            <AnimatedSection
              direction="right"
              delay={0.4}
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
            >
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Por que agendar?</h3>
              </div>
              <div className="p-6 space-y-6">
                {beneficios.map((beneficio, index) => (
                  <motion.div 
                    key={index}
                    className="flex gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                      {beneficio.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{beneficio.titulo}</h4>
                      <p className="text-sm text-gray-600 mt-1">{beneficio.descricao}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection
              direction="right"
              delay={0.6}
              className="bg-gradient-to-br from-red-700 to-red-800 rounded-2xl shadow-lg overflow-hidden text-white relative"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-4">Precisa de atendimento urgente?</h3>
                <p className="text-white/80 mb-6">
                  Entre em contato diretamente pelo nosso canal de WhatsApp para atendimento imediato.
                </p>
                <Button
                  href="https://wa.me/5599984401896"
                  variant="primary"
                  external={true}
                  className="bg-white text-red-600 hover:bg-gray-100 w-full"
                  icon={<Phone className="h-5 w-5" />}
                >
                  Falar via WhatsApp
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
} 