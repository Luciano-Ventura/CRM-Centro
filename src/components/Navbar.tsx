'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
/* eslint-disable @next/next/no-img-element */

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/images/logo.png" alt="Logo CUVCCA" className={styles.logoImage} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span>C.U.V.C.C.A</span>
        </Link>
        
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${styles.navContainer} ${isOpen ? styles.navContainerOpen : ''}`}>
          <ul className={styles.navLinks}>
            <li><Link href="#inicio" className={styles.navLink} onClick={() => setIsOpen(false)}>Início</Link></li>
            <li><Link href="#sobre" className={styles.navLink} onClick={() => setIsOpen(false)}>Sobre Nós</Link></li>
            <li><Link href="#giras" className={styles.navLink} onClick={() => setIsOpen(false)}>Giras</Link></li>
            <li><Link href="#faca-parte" className={styles.navLink} onClick={() => setIsOpen(false)}>Faça Parte</Link></li>
            <li><Link href="#contato" className={styles.navLink} onClick={() => setIsOpen(false)}>Contato</Link></li>
          </ul>

          <div className={styles.actions}>
            <Link href="/login" className={styles.btnOutline} onClick={() => setIsOpen(false)}>Entrar</Link>
            <Link href="/register" className={styles.btnPrimary} onClick={() => setIsOpen(false)}>Cadastrar</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
