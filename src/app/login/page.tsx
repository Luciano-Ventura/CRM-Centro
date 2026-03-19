'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import styles from './Login.module.css'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    const res = await login(formData)
    if (res?.error) {
      setError("Email ou senha inválidos.")
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Acessar Conta</h1>
        
        <form action={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input type="password" id="password" name="password" className={styles.input} required />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className={styles.footer}>
          Não tem conta? <Link href="/register" className={styles.link}>Cadastre-se</Link><br/><br/>
          <Link href="/" className={styles.link}>Voltar para o Início</Link>
        </div>
      </div>
    </div>
  )
}
