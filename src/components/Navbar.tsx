"use client";

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Vovô Congo
        </Link>
        
        {/* Hamburger Icon */}
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          <Link href="#inicio" className={styles.link} onClick={() => setIsOpen(false)}>Início</Link>
          <Link href="#sobre" className={styles.link} onClick={() => setIsOpen(false)}>Sobre Nós</Link>
          <Link href="#giras" className={styles.link} onClick={() => setIsOpen(false)}>Giras</Link>
          <Link href="#fazer-parte" className={styles.link} onClick={() => setIsOpen(false)}>Faça Parte</Link>
          <Link href="#contato" className={styles.link} onClick={() => setIsOpen(false)}>Contato</Link>
          
          <div className={styles.authButtons}>
            <Link href="/login" className={styles.btnOutline} onClick={() => setIsOpen(false)}>Entrar</Link>
            <Link href="/register" className={styles.btnPrimary} onClick={() => setIsOpen(false)}>Cadastrar</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
