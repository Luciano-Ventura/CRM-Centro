'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  // Simula um tempo de carregamento para ter o feedback visual do frontend
  await new Promise(resolve => setTimeout(resolve, 800))

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (email === 'erro@teste.com' || password === 'errada') {
    return { error: 'E-mail ou senha inválidos' }
  }

  // Seta uma sessão fake no cookie para simular login
  const cookieStore = await cookies()
  cookieStore.set('mock_session', 'membro', { path: '/' })

  revalidatePath('/')
  redirect('/')
}

export async function signup(formData: FormData): Promise<{ error: string } | void> {
  await new Promise(resolve => setTimeout(resolve, 800))

  const cookieStore = await cookies()
  cookieStore.set('mock_session', 'membro', { path: '/' })

  revalidatePath('/')
  redirect('/')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('mock_session')
  
  revalidatePath('/')
  redirect('/')
}
