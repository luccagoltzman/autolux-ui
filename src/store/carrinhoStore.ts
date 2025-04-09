import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Servico = {
  id: number;
  nome: string;
  descricao: string;
  duracao: string;
  preco: number;
  categoria: string;
  imagem?: string;
};

type CarrinhoStore = {
  itens: Servico[];
  adicionarAoCarrinho: (servico: Servico) => void;
  removerDoCarrinho: (id: number) => void;
  limparCarrinho: () => void;
  totalCarrinho: () => number;
};

export const useCarrinhoStore = create<CarrinhoStore>()(
  persist(
    (set, get) => ({
      itens: [],
      adicionarAoCarrinho: (servico) => {
        set((state) => ({
          itens: [...state.itens, servico],
        }));
      },
      removerDoCarrinho: (id) => {
        set((state) => ({
          itens: state.itens.filter((item, index) => index !== id),
        }));
      },
      limparCarrinho: () => set({ itens: [] }),
      totalCarrinho: () => {
        const { itens } = get();
        return itens.reduce((total, item) => total + item.preco, 0);
      },
    }),
    {
      name: 'carrinho-storage',
    }
  )
); 