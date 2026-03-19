import styles from "./Schedules.module.css";

const SCHEDULES = [
  { day: "Segunda-feira, 20h00", type: "Gira de Desenvolvimento / Esquerda (Exus e Pombagiras)" },
  { day: "Quarta-feira, 20h00", type: "Gira de Caboclos e Boiadeiros" },
  { day: "Sábado, 18h00", type: "Gira de Pretos Velhos e Crianças" },
];

export default function Schedules() {
  return (
    <section id="giras" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Giras e Atendimentos</h2>
        <div className={styles.list}>
          {SCHEDULES.map((sched, idx) => (
            <div key={idx} className={styles.item}>
              <div className={styles.details}>
                <span className={styles.day}>{sched.day}</span>
                <span className={styles.type}>{sched.type}</span>
              </div>
              <button className={styles.btnAction}>Agendar Consulta</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
