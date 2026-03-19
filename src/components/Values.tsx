import styles from "./Values.module.css";

const VALUES = [
  {
    title: "Amor",
    desc: "O princípio de tudo. Acolhemos a cada irmão que chega à nossa casa com coração aberto, empatia e sem julgamentos.",
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    ),
  },
  {
    title: "Fé",
    desc: "A força que nos move e sustenta. Cremos na sabedoria dos Orixás e Guias como bússolas para nossa caminhada terrena.",
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 3v19M5 10h14"></path>
      </svg>
    ),
  },
  {
    title: "Caridade",
    desc: "A prática do bem. O nosso trabalho é doado de forma gratuita para auxiliar na evolução e cura espiritual de todos.",
    icon: (
      <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
      </svg>
    ),
  }
];

export default function Values() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Valores Espirituais</h2>
      <div className={styles.grid}>
        {VALUES.map((val, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.iconWrapper}>{val.icon}</div>
            <h3 className={styles.cardTitle}>{val.title}</h3>
            <p className={styles.cardDesc}>{val.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
