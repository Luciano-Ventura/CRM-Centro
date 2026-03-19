'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import styles from './Register.module.css'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.")
      setLoading(false)
      return
    }

    const res = await signup(formData)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Criar Conta</h1>
        
        <form action={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome" className={styles.label}>Nome completo</label>
            <input type="text" id="nome" name="nome" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telefone" className={styles.label}>Telefone (opcional)</label>
            <input type="tel" id="telefone" name="telefone" className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input type="password" id="password" name="password" className={styles.input} required minLength={6} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar senha</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className={styles.input} required minLength={6} />
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="declaration" name="declaration" className={styles.checkbox} required />
            <label htmlFor="declaration" className={styles.checkboxLabel}>
              Declaro que sou membro ou estou autorizado a participar do centro.
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className={styles.footer}>
          Já tem conta? <Link href="/login" className={styles.link}>Entrar</Link><br/><br/>
          <Link href="/" className={styles.link}>Voltar para o Início</Link>
        </div>
      </div>
    </div>
  )
}
