"use client";

import styles from "./AboutUs.module.css";
/* eslint-disable @next/next/no-img-element */

export default function AboutUs() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Sobre o Nosso Centro</h2>
          <p className={styles.text}>
            Nossa missão espiritual é acolher a todos os que buscam orientação, conforto e evolução através da 
            <span className={styles.highlight}> Umbanda Sagrada</span>.
          </p>
          <p className={styles.text}>
            Guiados pela luz de nossos guias e orixás, nossos pilares fundamentais são o <strong>Amor</strong> para curar,
            a <strong>Fé</strong> para sustentar e a <strong>Caridade</strong> para servir ao próximo sem distinção.
          </p>
          <p className={styles.text}>
            Trabalhamos com diversas linhas de entidades de luz, sempre respeitando a tradição e os ensinamentos 
            do nosso mentor, Vovô Congo Cambinda da África.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img 
            src="/images/logo.png" 
            alt="Centro de Umbanda" 
            className={styles.image} 
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'; }}
          />
        </div>
      </div>
    </section>
  );
}
