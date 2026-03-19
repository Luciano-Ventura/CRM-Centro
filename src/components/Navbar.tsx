"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
/* eslint-disable @next/next/no-img-element */

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <img src="/images/logo.png" alt="Logo CUVCCA" className={styles.logoImage} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <span>C.U.V.C.C.A</span>
      </Link>
      
      <ul className={styles.navLinks}>
        <li><Link href="#inicio" className={styles.navLink}>Início</Link></li>
        <li><Link href="#sobre" className={styles.navLink}>Sobre Nós</Link></li>
        <li><Link href="#giras" className={styles.navLink}>Giras</Link></li>
        <li><Link href="#faca-parte" className={styles.navLink}>Faça Parte</Link></li>
        <li><Link href="#contato" className={styles.navLink}>Contato</Link></li>
      </ul>

      <div className={styles.actions}>
        <button className={styles.btnOutline}>Entrar</button>
        <button className={styles.btnPrimary}>Cadastrar</button>
      </div>
    </nav>
  );
}
