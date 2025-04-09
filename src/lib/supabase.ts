import { createClient } from '@supabase/supabase-js';

// Verificar se estamos em ambiente de desenvolvimento
const isDevelopment = process.env.NODE_ENV === 'development';

// Em desenvolvimento, usar valores padrão se as variáveis de ambiente não estiverem definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 
  (isDevelopment ? 'https://exemplo.supabase.co' : '');
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  (isDevelopment ? 'chave-anonima-de-exemplo' : '');

// Criar cliente com tratamento de erros para ambiente de desenvolvimento
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
  }
}); 