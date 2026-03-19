"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

const SLIDES = [
  { img: "/images/dirigente.png", pos: "center 15%" },
  { img: "/images/gira.png", pos: "center center" },
  { img: "/images/altar.png", pos: "center center" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.carousel}>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.img}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
            style={{ 
              backgroundImage: `url(${slide.img}), url('https://images.unsplash.com/photo-1549646401-49e0bceabe25?q=80&w=1920&auto=format&fit=crop')`,
              backgroundPosition: slide.pos 
            }}
          />
        ))}
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>Centro de Umbanda Vovô Congo Cambinda da África</h1>
        <p className={styles.subtitle}>Amor, Fé e Caridade guiando nossos caminhos</p>
        
        <div className={styles.actions}>
          <a href="/login" className={styles.btnPrimary}>Conheça o Centro</a>
        </div>
      </div>
    </section>
  );
}
