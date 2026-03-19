"use client";

import styles from "./Gallery.module.css";
/* eslint-disable @next/next/no-img-element */

const MOCK_IMAGES = [
  "/images/altar.png",
  "/images/gira.png",
  "/images/dirigente.png",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1549646401-49e0bceabe25?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1628198758838-89c565d3ec62?auto=format&fit=crop&q=80&w=600",
];

export default function Gallery() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Nossa Casa</h2>
      <div className={styles.grid}>
        {MOCK_IMAGES.map((img, idx) => (
          <div key={idx} className={styles.imageWrapper}>
            <img 
              src={img} 
              alt={`Galeria ${idx + 1}`} 
              className={styles.image} 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1549646401-49e0bceabe25?auto=format&fit=crop&q=80&w=600'; }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
