'use client'

import { useState } from 'react'
import styles from './Agenda.module.css'

const INITIAL_EVENTS = [
  { id: 1, nome: "Gira de Pretos Velhos", tipo: "Preto Velho", data: "24/03/2026", hora: "18:00", limite: 50, confirmados: 45, status: "ativo" },
  { id: 2, nome: "Gira de Caboclos", tipo: "Caboclo", data: "28/03/2026", hora: "20:00", limite: 50, confirmados: 20, status: "ativo" },
  { id: 3, nome: "Gira de Exu", tipo: "Esquerda", data: "02/04/2026", hora: "23:00", limite: 30, confirmados: 30, status: "lotado" },
]

export default function AgendaPage() {
  const [events, setEvents] = useState(INITIAL_EVENTS)

  const handlePresence = (id: number) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id && e.confirmados < e.limite) {
        return { ...e, confirmados: e.confirmados + 1, status: e.confirmados + 1 >= e.limite ? 'lotado' : 'ativo' }
      }
      return e
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Giras e Eventos</h1>
        <button className={styles.btnCreate}>+ Novo Evento</button>
      </div>

      <div className={styles.grid}>
        {events.map(ev => {
          const isFull = ev.confirmados >= ev.limite
          return (
            <div key={ev.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>{ev.nome}</div>
                <div className={styles.cardType}>Linha: {ev.tipo}</div>
              </div>
              
              <div className={styles.infoRow}>
                <span>📅 {ev.data}</span>
                <span>⏰ {ev.hora}</span>
              </div>
              
              <div className={`${styles.vagas} ${isFull ? styles.vagasLotado : styles.vagasOk}`}>
                {ev.confirmados} / {ev.limite} Confirmados
                {isFull && " (LOTAÇÃO MÁXIMA)"}
              </div>

              <button 
                className={styles.btnPresence} 
                disabled={isFull}
                onClick={() => handlePresence(ev.id)}
              >
                {isFull ? 'Vagas Esgotadas' : 'Marcar Presença'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
