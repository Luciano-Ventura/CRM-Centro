import styles from "./JoinUs.module.css";

export default function JoinUs() {
  return (
    <section id="faca-parte" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Venha Fazer Parte da Nossa Corrente</h2>
        <p className={styles.text}>
          Se você sente o chamado da espiritualidade e deseja caminhar na luz da Umbanda Sagrada, 
          estamos de braços abertos para recebê-lo em nossa família.
        </p>
        
        <ul className={styles.benefits}>
          <li className={styles.benefitItem}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
            Desenvolvimento Espiritual
          </li>
          <li className={styles.benefitItem}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
            Aprendizado Constante
          </li>
          <li className={styles.benefitItem}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
            Trabalho de Caridade
          </li>
        </ul>

        <button className={styles.btnPrimary}>Quero me cadastrar</button>
      </div>
    </section>
  );
}
