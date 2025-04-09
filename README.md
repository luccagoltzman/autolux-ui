# AutoLux UI

Ponte direta e simplificada entre o cliente e o atendimento da estética automotiva, com uma interface moderna, responsiva e funcional.

## Sobre o Projeto

AutoLux UI é um site para uma estética automotiva, construído com Next.js, Tailwind CSS e Supabase. O objetivo principal é divulgar os serviços oferecidos, permitir que os clientes montem um "carrinho de serviços" personalizado e facilitar o agendamento via WhatsApp.

## Estrutura do Projeto

- **Home (Landing Page)**: Apresentação da empresa, destaques de serviços, avaliações e seção de diferenciais.
- **Serviços**: Listagem dos serviços oferecidos, com filtros por categoria e opção de adicionar ao carrinho.
- **Carrinho**: Visualização dos serviços selecionados, cálculo do total e formulário para envio via WhatsApp.
- **Agendamento**: Formulário para agendamento de horário, com integração ao Supabase para armazenamento dos dados.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/): Framework React para renderização no lado do servidor.
- [TypeScript](https://www.typescriptlang.org/): Linguagem de programação com tipagem estática.
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS para estilização rápida e responsiva.
- [Supabase](https://supabase.io/): Backend como serviço para armazenamento de dados.
- [Zustand](https://github.com/pmndrs/zustand): Gerenciamento de estado global.

## Instalação e Uso

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:
# NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
# NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar em modo de produção
npm start
```

## Autor

AutoLux - Lucca Goltzman

## Licença

Este projeto está licenciado sob a Licença MIT.
