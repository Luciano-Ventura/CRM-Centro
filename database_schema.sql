-- Criar tabela de perfis/usuarios
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    role TEXT NOT NULL DEFAULT 'visitante',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Usuários podem ver seus próprios dados."
    ON public.usuarios FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Apenas admin pode atualizar roles."
    ON public.usuarios FOR UPDATE
    USING (auth.uid() IN (SELECT id FROM public.usuarios WHERE role = 'admin'));

-- Criar a função (Trigger) para criar usuário na tabela public.usuarios após se registrar no auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.usuarios (id, nome, email, telefone)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'nome', 
    new.email, 
    new.raw_user_meta_data->>'telefone'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar o gatilho (Trigger) na tabela externa do Auth
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
