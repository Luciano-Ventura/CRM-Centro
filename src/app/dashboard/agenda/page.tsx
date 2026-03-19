'use client'

import { useState } from 'react'
import styles from './Agenda.module.css'

interface Evento {
  id: number
  nome: string
  tipo: string
  data: string
  hora: string
  limite: number
  confirmados: number
  status: string
  presentes: string[]
  usuarioJaMarcou: boolean
}

const INITIAL_EVENTS: Evento[] = [
  { id: 1, nome: "Gira de Pretos Velhos", tipo: "Preto Velho", data: "24/03/2026", hora: "18:00", limite: 50, confirmados: 3, status: "ativo", presentes: ["João Silva", "Maria Oliveira", "Roberto Carlos"], usuarioJaMarcou: false },
  { id: 2, nome: "Gira de Caboclos", tipo: "Caboclo", data: "28/03/2026", hora: "20:00", limite: 50, confirmados: 2, status: "ativo", presentes: ["Ana Costa", "Pedro Santos"], usuarioJaMarcou: false },
  { id: 3, nome: "Gira de Exu", tipo: "Esquerda", data: "02/04/2026", hora: "23:00", limite: 30, confirmados: 30, status: "lotado", presentes: ["Usuário Genérico", "Usuário Aleatório", "..."], usuarioJaMarcou: true },
]

export default function AgendaPage() {
  const [events, setEvents] = useState<Evento[]>(INITIAL_EVENTS)
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formData, setFormData] = useState({ nome: '', tipo: 'Preto Velho', data: '', hora: '', limite: 50 })
  
  const [viewingEvent, setViewingEvent] = useState<Evento | null>(null)

  const handlePresence = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Previne abrir o modal do card inteiro
    
    setEvents(prev => prev.map(ev => {
      if (ev.id === id && !ev.usuarioJaMarcou && ev.confirmados < ev.limite) {
        return { 
          ...ev, 
          usuarioJaMarcou: true,
          confirmados: ev.confirmados + 1, 
          presentes: [...ev.presentes, "Você (Usuário Mock)"],
          status: ev.confirmados + 1 >= ev.limite ? 'lotado' : 'ativo' 
        }
      }
      return ev
    }))
  }

  const handleCreate = () => {
    const newEvent: Evento = {
      id: Date.now(),
      nome: formData.nome,
      tipo: formData.tipo,
      data: formData.data || '00/00/0000',
      hora: formData.hora || '00:00',
      limite: Number(formData.limite),
      confirmados: 0,
      status: "ativo",
      presentes: [],
      usuarioJaMarcou: false
    }
    setEvents(prev => [...prev, newEvent])
    setIsAddModalOpen(false)
    setFormData({ nome: '', tipo: 'Preto Velho', data: '', hora: '', limite: 50 })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Giras e Eventos</h1>
        <button className={styles.btnCreate} onClick={() => setIsAddModalOpen(true)}>+ Novo Evento</button>
      </div>

      <div className={styles.grid}>
        {events.map(ev => {
          const isFull = ev.confirmados >= ev.limite
          return (
            <div key={ev.id} className={styles.card} onClick={() => setViewingEvent(ev)} style={{ cursor: 'pointer' }}>
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
                disabled={isFull || ev.usuarioJaMarcou}
                onClick={(e) => handlePresence(ev.id, e)}
              >
                {ev.usuarioJaMarcou ? '✅ Presença Confirmada' : isFull ? 'Vagas Esgotadas' : 'Marcar Presença'}
              </button>
            </div>
          )
        })}
      </div>

      {isAddModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Novo Evento</h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome da Gira</label>
              <input type="text" className={styles.input} value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Ex: Gira de Baianos" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Linha / Tipo</label>
              <select className={styles.select} value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                <option value="Preto Velho">Preto Velho</option>
                <option value="Caboclo">Caboclo</option>
                <option value="Exu">Exu</option>
                <option value="Pomba Gira">Pomba Gira</option>
                <option value="Baiano">Baiano</option>
                <option value="Boiadeiro">Boiadeiro</option>
                <option value="Marinheiro">Marinheiro</option>
                <option value="Criança">Criança / Erê</option>
              </select>
            </div>
            
            <div className={styles.formGroup} style={{flexDirection: 'row', gap: '1rem'}}>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label className={styles.label}>Data</label>
                <input type="text" className={styles.input} value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} placeholder="DD/MM/AAAA" />
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label className={styles.label}>Horário</label>
                <input type="time" className={styles.input} value={formData.hora} onChange={e => setFormData({...formData, hora: e.target.value})} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Limite de Vagas</label>
              <input type="number" className={styles.input} value={formData.limite} onChange={e => setFormData({...formData, limite: Number(e.target.value)})} min="1" max="500" />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
              <button className={styles.btnSave} onClick={handleCreate}>Criar Evento</button>
            </div>
          </div>
        </div>
      )}

      {viewingEvent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Detalhes do Evento</h2>
            
            <div style={{ lineHeight: '1.6' }}>
              <strong>Nome:</strong> {viewingEvent.nome}<br/>
              <strong>Linha:</strong> {viewingEvent.tipo}<br/>
              <strong>Data e Hora:</strong> {viewingEvent.data} às {viewingEvent.hora}<br/>
              <strong>Limites:</strong> {viewingEvent.confirmados} / {viewingEvent.limite} vagas preenchidas
            </div>

            <h3 style={{ marginTop: '1rem', color: 'var(--color-primary-dark)', fontSize: '1.1rem', fontWeight: 700 }}>Lista de Presença:</h3>
            <div className={styles.participantList}>
              {viewingEvent.presentes.length > 0 ? viewingEvent.presentes.map((p, i) => (
                <div key={i} className={styles.participantItem}>👤 {p}</div>
              )) : (
                <div style={{ color: '#888', fontStyle: 'italic', padding: '0.5rem' }}>Ninguém confirmou presença ainda.</div>
              )}
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setViewingEvent(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
