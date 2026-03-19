import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contato" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>Centro de Umbanda Vovô Congo Cambinda da África</h3>
          <p>"Amor, Fé e Caridade"</p>
        </div>
        
        <div className={styles.links}>
          <h4>Links Rápidos</h4>
          <ul>
            <li><Link href="#inicio">Início</Link></li>
            <li><Link href="#sobre">Sobre Nós</Link></li>
            <li><Link href="#giras">Giras e Atendimentos</Link></li>
            <li><Link href="#faca-parte">Faça Parte</Link></li>
          </ul>
        </div>
        
        <div className={styles.contact}>
          <h4>Contato</h4>
          <p>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            R. Manoel Medeiros Borges, 1151 - Areias, São José - SC
          </p>
          <p>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            (11) 99999-9999
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} Centro de Umbanda Vovô Congo Cambinda da África. Todos os direitos reservados.
      </div>
    </footer>
  );
}
